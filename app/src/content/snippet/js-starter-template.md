---
title: Starter template with revealing module pattern
category: JavaScript
description: Revealing module pattern is a design pattern, which let you organise your javascript code in modules, and gives better code structure. It gives you power to create public/private variables/methods (using closure), and avoids polluting global scope
publishedDate: '2024-09-04'
---



```js
const myModule = (function () {
	let init = function () {
		hookEvents();
	}

	const hookEvents = () => {
    console.log('Hook all events');
  }

  const publicMethod = () => {
    console.log('Accessible outside');
  }

	const privateMethod = () => {
    console.log('Intended to be called internaly');
  }

  return {
    init : init ,
    publicMethod : publicMethod 
  }
})();

myModule.init();
```

