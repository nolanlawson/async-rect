DEPRECATION NOTICE
=====

This library was built on faulty assumptions. You are better off calling `getBoundingClientRect()` inside of `requestAnimationFrame()`, which has essentially the same effect while avoiding the cost of creating an IntersectionObserver, as [this benchmark](https://bl.ocks.org/nolanlawson/daa6100518e00f9354e04a6a6b09926e) demonstrates.

Original documentation follows.

async-rect [![Build Status](https://travis-ci.org/nolanlawson/async-rect.svg?branch=master)](https://travis-ci.org/nolanlawson/async-rect)
====

Asynchronous version of [getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect), built on top of [IntersectionObserver](https://www.w3.org/TR/intersection-observer/).

It works the same as `getBoundingClientRect()`, except you don't need to worry about [layout thrashing](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing) or forcing layouts/reflows, because this function asynchronously waits for the next browser layout pass instead of synchronously forcing layout.

This library also works around some [browser](https://bugs.chromium.org/p/chromium/issues/detail?id=737228) [bugs](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14141398/).

Usage
----

    npm install async-rect

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

This library requires both IntersectionObserver and Promises. If you need to support browsers without those features, please use the polyfills:

- [IntersectionObserver polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
- [es6-promise polyfill](https://github.com/stefanpenner/es6-promise)

This library is written in ES5, so it will work in older browsers assuming you have the polyfills.

Limitations
----

This library creates a new `IntersectionObserver` object and then `disconnect()`s it when it's done. As an optimization, you may want to re-use the same `IntersectionObserver` object and manage its lifecycle yourself. (Note though that re-using the same `IntersectionObserver` object will not work if you want to invoke the function twice on the same element.) You may also want to do this if you are interested in using a root element other than the viewport, or if you want to know the `rootBounds` as well, or if you have some other particular use case.

In those cases, the library is quite small, so feel free to fork as you see fit! 😊

Building
---

    npm run build

Testing
----

    npm test
