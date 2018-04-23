/* global it, describe, document */

require('es6-promise').polyfill()
require('intersection-observer')
var assert = require('assert')
var asyncGBCR = require('./dist/async-rect.cjs.js')

function setStyle (el, obj) {
  for (var key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      el.style[key] = obj[key]
    }
  }
}

describe('test suite', function () {
  it('measures one element', function () {
    var el = document.createElement('div')
    setStyle(el, {
      width: '100px',
      height: '50px',
      position: 'absolute',
      left: '0',
      top: '0'
    })
    document.body.appendChild(el)
    return asyncGBCR(el).then(function (rect) {
      assert.equal(rect.width, 100)
      assert.equal(rect.height, 50)
      assert.equal(rect.top, 0)
      assert.equal(rect.left, 0)
    })
  })

  it('measures the same element twice', function () {
    var el = document.createElement('div')
    setStyle(el, {
      width: '100px',
      height: '50px',
      position: 'absolute',
      left: '0',
      top: '0'
    })
    document.body.appendChild(el)
    return asyncGBCR(el).then(function (rect) {
      assert.equal(rect.width, 100)
      assert.equal(rect.height, 50)
      assert.equal(rect.top, 0)
      assert.equal(rect.left, 0)

      return asyncGBCR(el).then(function (rect) {
        assert.equal(rect.width, 100)
        assert.equal(rect.height, 50)
        assert.equal(rect.top, 0)
        assert.equal(rect.left, 0)
      })
    })
  })

  it('errors on null element', function () {
    return asyncGBCR(null).then(function () {
      throw new Error('expected error here')
    }, function (err) {
      assert(err)
    })
  })
})
