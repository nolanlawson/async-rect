/* global IntersectionObserver */

var hasBoundingRectBug

// Get the bounding client rect from an IntersectionObserver entry.
// This is to work around a bug in Chrome: https://crbug.com/737228
// Also Edge: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14141398/
function getRectFromEntry (entry) {
  if (typeof hasBoundingRectBug !== 'boolean') {
    const rectA = entry.target.getBoundingClientRect()
    const rectB = entry.boundingClientRect
    hasBoundingRectBug = !(
      rectA.height === rectB.height &&
      rectA.top === rectB.top &&
      rectA.width === rectB.width &&
      rectA.bottom === rectB.bottom &&
      rectA.left === rectB.left &&
      rectA.right === rectB.right
    )
  }
  return hasBoundingRectBug ? entry.target.getBoundingClientRect() : entry.boundingClientRect
}

export default function asyncGetBoundingClientRect (element) {
  return new Promise(function (resolve) {
    if (!element) {
      throw new Error('Element is null or undefined')
    }

    var observer = new IntersectionObserver(function (entries) {
      observer.disconnect()
      resolve(getRectFromEntry(entries[0]))
    })
    observer.observe(element)
  })
}
