---
title: Animation on scroll using intersection observer
description: When I was designing my portfolio page, I want to bring little life to the page by adding some animation when some elements are visible in the timeline, there are several libraries that could be used to achieve it like AOC, ScrollReveal, etc. But I want something that is native so I can customize it to my choice. Then I came across the Javascript inbuilt functionality “Intersection Observer API” which could easily achieve my requirement and it is quite a useful API to use in some of my future requirements. Let’s dive into this API.
publishedDate: 2020-06-03
category: Front End
---

When I was designing my portfolio page, I want to bring little life to the page by adding some animation when some elements are visible in the timeline, there are several libraries that could be used to achieve it like [AOC](https://michalsnik.github.io/aos/), [ScrollReveal](https://scrollrevealjs.org/), etc. But I want something that is native so I can customize it to my choice. Then I came across the Javascript inbuilt functionality “Intersection Observer API” which could easily achieve my requirement and it is quite a useful API to use in some of my future requirements. Let’s dive into this API.

## What is Intersection Observer?
Intersection Observer observes when the target element intersects with the page viewport (aka the browser window) or one of its ancestor elements. Some of the use cases are as below.

- Animate an element when it is visible
- Infinite scrolling website where content is loaded as you scroll
- Lazy loading the images only when user scrolls to that location

## How to use Intersection Observer?

### Step 1

Define the observer by creating an instance of IntersectionObserver. It accepts two parameters.

1) Call back function – This function is executed once the observer notices an intersection
2) Options – It is an object with information to define the intersection

```js
let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2
};

let observer = new IntersectionObserver(
  function (entries, observer) {
     handleIntersect(entries, observer); // create this function to execute
  }, 
  options
);
```

The options object accepts the following properties to configure intersection (i.e. when the call back function needs to be called).

- `root` – Defines the observing location, the default value is null which means the viewport otherwise must pass ancestor of the target example document.querySelector('#scrollArea'))
- `rootMargin` – The value format is similar to CSS margin property, it defines the margin around the root so that the call back is triggered only when the target passes the rootMargin. Its default value is 0px.
- `thresholds` – It is a value between 0.0 to 1, which indicates at what threshold (or proportion) of an object within the above-specified boundaries the callback function needs to be invoked. We could specify a single value or an array of values.

The callback function is invoked when the target meets a threshold specified by the options object within the boundary. The callback method has the following properties.

`entries` – it is an object containing various details of intersection changes. There are many properties to this object, some of the most useful once are as below.

- `isInterseting` – boolean property is true if the target element is inside the boundaries
- `intersectionRatio` – A value between 0.0 to 1.0 tells you how much of the target element is currently visible
- `target` – this property provides the target element upon which you like to modify
- `time` – as the name suggests it provides time in milliseconds at which target element experienced the intersection change

`entries` – it is the Intersection observer object that we created, and following are the main useful methods.

- `observe()` – to start watching a specified target element
- `unobserve()` – to stop watching a specified target element
- `disconnect()` – to stop watching all of its target elements

### Step 2

Select one or more target DOM elements and start watching it by calling observe method.

For observing single element use querySelector as below

```js
let targetElements = document.querySelectorAll("#target-element");
observer.observe(targetElement);
```

For observing multiple elements use querySelectorAll and loop through the selection to observe.

```js
let targetElements = document.querySelectorAll(".target-elements");

targetElements.forEach((targetElement) => {
  observer.observe(targetElement);
});
```

## Example

In this example, we will animate some text when it is positioned approximately at the center. Below is simple HTML content within HTML body

```html
<body>
    <div class="box"><p>Hello</p></div>
    <div class="box"><p>World</p></div>
    <div class="box"><p>!</p></div>
    <div class="box"><p>Welcome</p></div>
    <div class="box"><p>To</p></div>
    <div class="box"><p>JeminPro<br/>.com</p></div>
</body>
```

In the JavaScript we are creating IntersectionObserver instance on box class element to trigger at 50% of its visibility inside 100px of viewport margin, when triggered we are adding the class bounce-me

```js
const myDemo = (function () {
  const init = function () {
    createObserver();
  };

  const createObserver = function () {
    let options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.5
    };

    let observer = new IntersectionObserver(
      function (entries, observer) {
          handleIntersect(entries, observer); 
        }, 
      options);
    
    let targetElements = document.querySelectorAll(".box");

    targetElements.forEach((targetElement) => {
      observer.observe(targetElement);
    });
  };

  const handleIntersect = function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.children[0].classList.add("bounce-me");
        observer.unobserve(entry.target);
      }
    });
  };

  return {
    init: init
  };
})();

myDemo.init();
```

Below is the code pen demo for it

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="XWXrQvJ" data-user="jemin" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/jemin/pen/XWXrQvJ">
  Intersection Observer API</a> by Jemin Pathazhapurakkal (<a href="https://codepen.io/jemin">@jemin</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>