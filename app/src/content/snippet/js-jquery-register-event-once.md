---
title: Register jquery eventy once
category: JavaScript
description: When code is run multiple times and only wants to register an event once using jQuery
publishedDate: '2024-09-04'
---



```js
function myAction() { ... }; // defined somewhere

// Then, inside your code that may be run more than once:
$(element).off('eventName', myAction).on('eventName', myAction);
//$('input').off('keypress').on('keypress', myAction);
```

