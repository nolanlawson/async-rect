async-rect
====

Asynchronous version of [getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect), built on top of [IntersectionObserver](https://www.w3.org/TR/intersection-observer/)

It works the same as `gBCR`, except you don't have to worry about [layout thrashing](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing) or forcing layouts/reflows, because this function asynchronously waits for the next browser layout pass, instead of synchronously forcing layout.

This library also works around some [browser](https://bugs.chromium.org/p/chromium/issues/detail?id=737228) [bugs](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14141398/).

Usage
----

Install:

    npm install async-rect

Use:

```js
import asyncGetBoundingClientRect from 'async-rect'

(async () => {
  let element = document.querySelector('#myElement')
  let rect = await asyncGetBoundingClientRect(element)
  console.log(rect)
  // { width: 100, height: 50, left: 0, top: 0, bottom: 50, right: 100 }
})()
```

Or use as a script tag:

```html
<script src="https://unpkg.com/async-rect/dist/async-rect.min.js"></script>
<script>
 asyncGetBoundingClientRect(element).then(/* ... */)
</script>
```

Requirements
----

This library requires both IntersectionObserver and Promises. If you need to support browsers without these features, please use the polyfills:

- [IntersectionObserver polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
- [es6-promise polyfill](https://github.com/stefanpenner/es6-promise)

This library is written in ES5, so it will work in older browsers assuming you have the polyfills.

Building
---

    npm run build

Testing
----

    npm test