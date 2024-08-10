---
title: .NET Core consuming API
description: One of the common task in a web application is to call web API’s, it could be either external API’s or internal API’s i.e. Web tier calling the APP tier.
publishedDate: 2020-07-22
category: Back End
---

One of the common task in a web application is to call web API’s, it could be either external API’s or internal API’s i.e. Web tier calling the APP tier.

In this post we will go through how to consume WEB API in .NET Core using a demo TO DO application, the source code is hosted in GitHub at [CoreApiDemo](https://github.com/jeminpro/CoreApiDemo) repository.

## Demo Application Overview

It is a .NET Core 3.1 solution with two applications. API project *CoreApi.WebApi* which would normally run in APP tier and Web UI **project CoreApi.WebUi** which would normally run in Web tier. Additionally we have common classes in CoreApi.Common library project.

The demo application lists the TO DO items in a browser, in the WebUi project the html is in the razor pages i.e. Pages/Index.cshtml, its corresponding JavaScript file in wwwroot/js/toDoList.js will request the API’s within WebUi project which intern requests API’s in WebApi.

In the WebApi project the To do items are stored in memory using static class InMemoryTodoData (In real world application there would be a repository project connecting to a database). The Services folder contains the business logic and the Controllers exposes the methods via API’s.

Note that to run the application using visual studio make sure to start both WebApi and WebUi projects by right clicking on solution and selecting “Set Startup Projects”.

## HTTP requests using HttpClientFactory

HttpClientFactory is a default way of consuming API services in .NET Core, there are several consumption patterns as briefed in [Make HTTP requests using IHttpClientFactoryin ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/http-requests?view=aspnetcore-3.1). The recommended method is to use Typed clients pattern which provides a central location for accessing all API methods per client. Below is a CoreApiService class in Clients folder that has all the different methods that API service offers. Note that base url is read from appsettings.json in the constructor.

```csharp Title="CoreApiService.cs"
public class CoreApiService
{
	public HttpClient Client { get; }

	private readonly IConfiguration _configuration;

	public CoreApiService(
		IConfiguration configuration,
		HttpClient client)
	{
		Client = client;
		_configuration = configuration;

		var baseUrl = _configuration.GetValue<string>("CoretApiBaseUrl");
		client.BaseAddress = new Uri(baseUrl);
	}

	public async Task<List<TodoItem>> GetToDoItems()
	{
		var response = await Client.GetAsync("/api/todoitems");
		return await GetResponse<List<TodoItem>>(response);
	}

	public async Task<TodoItem> GetTodoItem(int id)
	{
		var response = await Client.GetAsync($"/api/todoitems{id}");
		return await GetResponse<TodoItem>(response);
	}

	public async Task<bool> UpdateTodoItem(int id, TodoItem todoItem)
	{
		var response = await Client.PutAsync($"/api/todoitems/{id}", ToJsonStringContent(todoItem));
		return response.IsSuccessStatusCode;
	}

	public async Task<TodoItem> CreateTodoItem(TodoItem todoItem)
	{
		var response = await Client.PostAsync("/api/todoitems", ToJsonStringContent(todoItem));
		return await GetResponse<TodoItem>(response);
	}

	public async Task<bool> DeleteTodoItem(int id)
	{
		var response = await Client.DeleteAsync($"/api/todoitems/{id}");

		return response.IsSuccessStatusCode;
	}

	private async Task<T> GetResponse<T>(HttpResponseMessage httpResponseMessage)
	{
		httpResponseMessage.EnsureSuccessStatusCode();

		using var responseStream = await httpResponseMessage.Content.ReadAsStreamAsync();

		var serializeOptions = new JsonSerializerOptions
		{
			PropertyNamingPolicy = JsonNamingPolicy.CamelCase
		};

		return await JsonSerializer.DeserializeAsync<T>(responseStream, serializeOptions);
	}

	private StringContent ToJsonStringContent(object obj)
	{
		return new StringContent(JsonSerializer.Serialize(obj), Encoding.UTF8, "application/json");
	}
}
```
The API client class is registered in startup as highlighted below.

```csharp
public void ConfigureServices(IServiceCollection services)
{
	services.AddRazorPages();

	// typed client api
	services.AddHttpClient<CoreApiService>();
}
```

And the methods are invoked from the controller i.e. TodoController.cs as below.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreApi.Common;
using CoreApi.WebUi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CoreApi.WebUi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : Controller
    {
        private readonly CoreApiService _coreApiService;

        public TodoController(
            CoreApiService coreApiService)
        {
            _coreApiService = coreApiService;
        }

        [HttpGet]
        public async Task<List<TodoItem>> GetToDoItems()
        {
            return await _coreApiService.GetToDoItems();
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> Create(TodoItem todoItem)
        {
            return await _coreApiService.CreateTodoItem(todoItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var isSuccess = await _coreApiService.DeleteTodoItem(id);

            if (isSuccess)
                return Ok();
            else
                return NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodoItem(int id, TodoItem todoItem)
        {
            var isSuccess = await _coreApiService.UpdateTodoItem(id, todoItem);

            if (isSuccess)
                return Ok();
            else
                return NotFound();
        }
    }
}
```

## Simplify further using extension methods System.Net.Http.HttpClient

To further simplify the API clients requests and avoid separate client service class implementation, add the nuget package “System.Net.Http.Json” to the WebUi project (or the project from where you want to consume API request) and register named client api in startup as below.

```csharp
public void ConfigureServices(IServiceCollection services)
{
	//named client api
	services.AddHttpClient("coreapi", c =>
	{
		var baseUrl = Configuration.GetValue<string>("CoretApiBaseUrl");
		c.BaseAddress = new Uri(baseUrl);
		// can configure headers etc
	});
}
```

The package “System.Net.Http.Json” offers extension methods for HttpClient for most common HTTP verbs such as Get, Post, Put. In cases where it currently doesn’t offer for some verbs such as Delete, Patch then use SendAsync method by generating HttpRequestMessage. Below is the code for TodoSimpleController.

```csharp
[ApiController]
[Route("[controller]")]
public class TodoSimpleController : Controller
{
	private HttpClient _client;

	public TodoSimpleController(
		IHttpClientFactory clientFactory)
	{
		_client = clientFactory.CreateClient("coreapi");
	}

	[HttpGet]
	public async Task<List<TodoItem>> GetToDoItems()
	{
		return await _client.GetFromJsonAsync<List<TodoItem>>("/api/todoitems");
	}

	[HttpPost]
	public async Task<ActionResult<TodoItem>> Create(TodoItem todoItem)
	{
		var result = await _client.PostAsJsonAsync<TodoItem>("/api/todoitems", todoItem);
		return Ok(result);
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteTodoItem(int id)
	{
		var request = new HttpRequestMessage(
			HttpMethod.Delete,
			$"/api/todoitems/{id}");

		var response = await _client.SendAsync(request);

		if (response.IsSuccessStatusCode)
			return Ok();
		else
			return NotFound();
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> UpdateTodoItem(int id, TodoItem todoItem)
	{
		var response = await _client.PutAsJsonAsync($"/api/todoitems/{id}", todoItem);

		if (response.IsSuccessStatusCode)
			return Ok();
		else
			return NotFound();
	}
}
```