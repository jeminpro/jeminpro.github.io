---
title: JS Test 2
lang: JavaScript
description: Bla bla bal
publishedDate: '2024-09-04'
---



```js
const myModule = (function () {
	let init = function () {
		hookEvents();
	}

	const hookEvents = function () {
    console.log('Hook all events');
  }

  const publicMethod = function () {
    console.log('Accessible outside');
  }

	const privateMethod = function () {
    console.log('Intended to be called internaly');
  }

  return {
    init : init ,
    publicMethod : publicMethod 
  }
})(); // our IIFE function (surrounded with parens) is invoked here

myModule.init();
```