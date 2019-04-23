# Scrolling

Here are some useful libraries to control/monitor scrolling behaviour

## Intersection Observer

[IntersectionObserver](https://github.com/w3c/IntersectionObserver) can be used to understand movement of DOM elements relative to another element or the browser top level viewport. Changes are delivered asynchronously and are useful for understanding the visibility of elements, managing pre-loading of DOM and data, as well as deferred loading of "below the fold" page content.

```javascript
const onIntersect = entries => {
  if (entries[0].isIntersecting) {
    // It's on-screen
  } else {
    // It's off-screen
  }
}

if ('IntersectionObserver' in window) {
  this.observer = new window.IntersectionObserver(onIntersect, {
    threshold: 0
  })
  this.observer.observe($el)
}
```

Not all browsers support IntersectionObserver so you may need a [https://github.com/w3c/IntersectionObserver/tree/master/polyfill](polyfill).

```bash
yarn add intersection-observer
```

```javascript
import 'intersection-observer'
```