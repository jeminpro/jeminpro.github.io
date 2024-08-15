---
title: .NET Core create pdf using DinkToPdf
description: One of the most common requirements in a web application is to generate the PDF document either for an invoice, reporting, or any other purpose. As developers are familiar with HTML it would make sense to convert HTML to PDF instead of learning the framework specific language. The open-source solution for it is using the NuGet package DinkToPdf which is a .NET Core wrapper for wkhtmltopdf. As most often the PDF documents are generated in the backend service i.e. Web API, we will explore how to implement it in the most structured way. The source code for this demo is in the GitHub CorePdfDemo repository.
publishedDate: '2020-06-04'
category: Back End
---

One of the most common requirements in a web application is to generate the PDF document either for an invoice, reporting, or any other purpose. As developers are familiar with HTML it would make sense to convert HTML to PDF instead of learning the framework specific language. The open-source solution for it is using the NuGet package DinkToPdf which is a .NET Core wrapper for wkhtmltopdf. As most often the PDF documents are generated in the backend service i.e. Web API, we will explore how to implement it in the most structured way. The source code for this demo is in the GitHub CorePdfDemo repository.

In the Web API project add the “DinkToPDF” NuGet package. In the startup register the dependency with the following code.

```csharp
public void ConfigureServices(IServiceCollection services)
{    
    services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
}
```

In your service class where you want to create the PDF inject the IConverter in the constructor. In my demo project on DocumentService below is the constructor code.

```csharp
public class DocumentService : IDocumentService
{
	private readonly IConverter _converter;
	
	public DocumentService(
		IConverter converter)
	{
		_converter = converter;	
	}
}
```

Blow is the code for converting html string to a pdf document in byte array using DinkToPdf. Most of the configuration is self explanatory, change the values according to the needs.

```csharp
private byte[] GeneratePdf(string htmlContent)
{
	var globalSettings = new GlobalSettings
	{
		ColorMode = ColorMode.Color,
		Orientation = Orientation.Portrait,
		PaperSize = PaperKind.A4,
		Margins = new MarginSettings { Top = 18, Bottom = 18 },
	};

	var objectSettings = new ObjectSettings
	{
		PagesCount = true,
		HtmlContent = htmlContent,
		WebSettings = { DefaultEncoding = "utf-8" },
		HeaderSettings = { FontSize = 10, Right = "Page [page] of [toPage]", Line = true },
		FooterSettings = { FontSize = 8, Center = "PDF demo from JeminPro", Line = true },
	};

	var htmlToPdfDocument = new HtmlToPdfDocument()
	{
		GlobalSettings = globalSettings,
		Objects = { objectSettings },
	};

	return _converter.Convert(htmlToPdfDocument);
}
```

Call the above method after crating the html string as below.

```csharp
public byte[] GeneratePdfFromString()
{
	var htmlContent = $@"
	<!DOCTYPE html>
	<html lang=""en"">
	<head>
		<style>
		p{
			width: 80%;
		}
		</style>
	</head>
	<body>
		<h1>Some heading</h1>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	</body>
	</html>
	";

	return GeneratePdf(htmlContent);
}
```

Generating the html content in code is not very convenient. Wouldn’t it be nice to generate it using razor views similar to web pages, as you wished there is a way to do it.

Add the NuGet package “Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation” the Web Api project. In the startup register the dependency with the following code.

```csharp
public void ConfigureServices(IServiceCollection services)
{    
    services.AddMvc().AddControllersAsServices();
}
```

Add a helper class with a method that can take the razor page file path and the model object. Refer to my demo project code class RazorRendererHelper.

Create a folder in your project and add the razor view file i.e. “.cshtml” file. In my demo application I have created “InvoiceDetails.cshtml” razor view in the folder “Views/PdfTemplate”. Get the necessary data to create a model object and call the RenderPartialToString with the partialName (i.e. razor view location) and model object, it returns the html string which could be passed to DinkToPdf to generate the PDF document.

```csharp
public byte[] GeneratePdfFromRazorView()
{
	var invoiceViewModel = GetInvoiceModel();
	var partialName = "/Views/PdfTemplate/InvoiceDetails.cshtml";
	var htmlContent = _razorRendererHelper.RenderPartialToString(partialName, invoiceViewModel);
	
	return GeneratePdf(htmlContent);
}
```

Hope this is useful in your project, go through the source code to understand it better