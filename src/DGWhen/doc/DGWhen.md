## when()

```js
when(promiseOrValue, onFulfilled, onRejected, onProgress)
```
Мы имеем возможность отслеживать promise или непосредственно значение переменной.
Observe a promise or immediate value.

Если `promiseOrValue` представляет собой значение переменной, то `onFulfilled` будет выполнена с этим значением, и по умолчанию вернёт promise.
If `promiseOrValue` is a value, arranges for `onFulfilled` to be called with that value, and returns a promise for the result.

Если в `promiseOrValue` передан promise, то:
If `promiseOrValue` is a promise, arranges for

* `onFulfilled` будет вызван с значением которое вернёт `promiseOrValue` после того как он отработает, или
* `onRejected` будет вызван когда `promiseOrValue` получит статус rejected.
* `onProgress` будет вызван любым обновлением в `promiseOrValue`.

* `onFulfilled` to be called with the value after `promiseOrValue` is fulfilled, or
* `onRejected` to be called with the rejection reason after `promiseOrValue` is rejected.
* `onProgress` to be called with any progress updates issued by `promiseOrValue`.

`when()` возвращает полностью отработаный [promise](#promise) который передаёт своё значение в обработчик `onFulfilled` или `onRejected`, в зависимости от ответа, или же выдаст ошибку, если её раньше не было.
`when()` returns a [trusted promise](#promise) that will fulfill with the return value of either `onFulfilled` or `onRejected`, whichever is called, or will reject with the thrown exception if either throws.

Так же, это гарантирует что обработчики зарегистированые в `when()` имеют следующие свойства:
Additionally, it makes the following guarantees about handlers registered in the same call to `when()`:

1. Только один из обработчиков будет выполнен (`onFulfilled` или `onRejected`).
1. `onFulfilled` и `onRejected` никогда не будут вызваны больше одного раза.
1. `onProgress` возможно будет вызван несколько раз.

1. Only one of `onFulfilled` or `onRejected` will be called, never both.
1. `onFulfilled` and `onRejected` will never be called more than once.
1. `onProgress` may be called multiple times.

```js
// Вовращает promise для определения результата onFulfilled или onRejected
// в зависимости от ответа promiseOrValue
// Returns a promise for the result of onFulfilled or onRejected depending
// on the promiseOrValue's outcome
var promise = when(promiseOrValue, onFulfilled, onRejected);

// Всегда возвращает безопасный promise, то есть это даёт гарантию что его можно вызвать по цепочке:
// Always returns a trusted promise, so it is guaranteed to be chainable:
when(promiseOrValue, onFulfilled, onRejected, onProgress)
	.then(anotherOnFulfilled, anotherOnRejected, anotherOnProgress);

// Все параметры, кроме первого, не обязательные
// Например, вы можете указать только onFulfilled обработчик 
// All parameters except the first are optional
// For example, you can register only an onFulfilled handler
when(promiseOrValue, onFulfilled);
```
`when()` может сделить за promise которые предоставляют из себя любой обьект с методом `.then()`, тоесть даже promise которые не соотвествуют спецификации Promises/A, например jQuery's Deferred. Он будет превращать такие promise в Promises/A.
`when()` can observe any promise that provides a *thenable* promise--any object that provides a `.then()` method, even promises that aren't fully Promises/A compliant, such as jQuery's Deferred.  It will assimilate such promises and make them behave like Promises/A.

Другими словами, `when()` будет всегда возвращать безопасный promise, который полностью соответсвует спецификации Promises/A а так же имеет [разширеное promise API](#extended-promise-api).
In either case, `when()` will *always* return a trusted when.js promise, which will be fully Promises/A compliant and also have the [extended promise API](#extended-promise-api).

### Смотрите так же
* [Здесь мы можете прочитать более подробно про when()](https://github.com/cujojs/when/wiki/when)
### See Also
* [Read more about when() here](https://github.com/cujojs/when/wiki/when)

## Promise

Promise представляет собой конечный результат, либо успешного выполнения (и возвращает полученое значение), либо отказа (и возвращает причину отклонения). Так же promise предоставляет интерфейс для вызова функции с его результатом (значение, или причина отказа) и создаёт новый promise для результата.
The promise represents the *eventual outcome*, which is either fulfillment (success) and an associated value, or rejection (failure) and an associated *reason*. The promise provides mechanisms for arranging to call a function on its value or reason, and produces a new promise for the result.

```js
// Создаём отложеный promise
// Get a deferred promise
var deferred = when.defer();
var promise = deferred.promise;

// Решенный promise
// Or a resolved promise
var promise = when.resolve(promiseOrValue);

// Отклонённый promise
// Or a rejected promise
var promise = when.reject(reason);
```

## Main Promise API

```js
// then()
// Main promise API
var newPromise = promise.then(onFulfilled, onRejected, onProgress);
```

arranges for

* `onFulfilled` to be called with the value after `promise` is fulfilled, or
* `onRejected` to be called with the rejection reason after `promise` is rejected.
* `onProgress` to be called with any progress updates issued by `promise`.

Returns a trusted promise that will fulfill with the return value of either `onFulfilled` or `onRejected`, whichever is called, or will reject with the thrown exception if either throws.

A promise makes the following guarantees about handlers registered in the same call to `.then()`:

1. Only one of `onFulfilled` or `onRejected` will be called, never both.
1. `onFulfilled` and `onRejected` will never be called more than once.
1. `onProgress` may be called multiple times.

## Extended Promise API

Convenience methods that are not part of Promises/A+.  These are simply shortcuts for using `.then()`.

### otherwise()

```js
promise.otherwise(onRejected);
```

Arranges to call `onRejected` on the promise's rejection reason if it is rejected.  It's a shortcut for:

```js
promise.then(undefined, onRejected);
```

### ensure()

```js
promise.ensure(onFulfilledOrRejected);
```

Ensure allows you to execute "cleanup" type tasks in a promise chain.  It arranges for `onFulfilledOrRejected` to be called, *with no arguments*, when promise is either fulfilled or rejected.  `onFulfilledOrRejected` cannot modify `promise`'s fulfillment value, but may signal a new or additional error by throwing an exception or returning a rejected promise.

`promise.ensure` should be used instead of `promise.always`.  It is safer in that it *cannot* transform a failure into a success by accident (which `always` could do simply by returning successfully!).

When combined with `promise.otherwise`, `promise.ensure` allows you to write code that is similar to the familar synchronous `catch`/`finally` pair.  Consider the following synchronous code:

```js
try {
  return doSomething(x);
} catch(e) {
	return handleError(e);
} finally {
	cleanup();
}
```

Using `promise.ensure`, similar asynchronous code (with `doSomething()` that returns a promise) can be written:

```js
return doSomething()
	.otherwise(handleError)
	.ensure(cleanup);
```

### yield()

```js
originalPromise.yield(promiseOrValue);
```

Returns a new promise:

1. If `originalPromise` is rejected, the returned promise will be rejected with the same reason
2. If `originalPromise` is fulfilled, then it "yields" the resolution of the returned promise to promiseOrValue, namely:
    1. If `promiseOrValue` is a value, the returned promise will be fulfilled with `promiseOrValue`
    2. If `promiseOrValue` is a promise, the returned promise will be:
	    - fulfilled with the fulfillment value of `promiseOrValue`, or
	    - rejected with the rejection reason of `promiseOrValue`

In other words, it's much like:

```js
originalPromise.then(function() {
	return promiseOrValue;
});
```

### tap()

```js
promise.tap(onFulfilledSideEffect);
```

Executes a function as a side effect when `promise` fulfills.

Returns a new promise:

1. If `promise` fulfills, `onFulfilledSideEffect` is executed:
	- If `onFulfilledSideEffect` returns successfully, the promise returned by `tap` fulfills with `promise`'s original fulfillment value.  That is, `onfulfilledSideEffect`'s result is discarded.
	- If `onFulfilledSideEffect` throws or returns a rejected promise, the promise returned by `tap` rejects with the same reason.
2. If `promise` rejects, `onFulfilledSideEffect` is *not* executed, and the promise returned by `tap` rejects with `promise`'s rejection reason.

These are equivalent:

```js
// Using only .then()
promise.then(function(x) {
	doSideEffectsHere(x);
	return x;
});

// Using .tap()
promise.tap(doSideEffectsHere);
```

### spread()

```js
promise.spread(variadicOnFulfilled);
```

Arranges to call `variadicOnFulfilled` with promise's values, which is assumed to be an array, as its argument list, e.g. `variadicOnFulfilled.spread(undefined, array)`.  It's a shortcut for either of the following:

```js
// Wrapping variadicOnFulfilled
promise.then(function(array) {
	return variadicOnFulfilled.apply(undefined, array);
});

// Or using when/apply
promise.then(apply(variadicOnFulfilled));
```

### inspect()

```js
var status = promise.inspect();
```

Returns a snapshot descriptor of the current state of `promise`.  This descriptor is *not live* and will not update when `promise`'s state changes.  The descriptor is an object with the following properties.  When promise is:

* pending: `{ state: 'pending' }`
* fulfilled: `{ state: 'fulfilled', value: <promise's fulfillment value> }`
* rejected: `{ state: 'rejected', reason: <promise's rejection reason> }`

While there are use cases where synchronously inspecting a promise's state can be helpful, the use of `inspect` is discouraged.  It is almost always preferable to simply use `when()` or `promise.then` to be notified when the promise fulfills or rejects.

#### See also:
* [when.settle()](#whenall) - settling an Array of promises

### always()

**DEPRECATED:** Will be removed in an upcoming version

```js
promise.always(onFulfilledOrRejected [, onProgress]);
```

Arranges to call `onFulfilledOrRejected` on either the promise's value if it is fulfilled, or on it's rejection reason if it is rejected.  It's a shortcut for:

```js
promise.then(onFulfilledOrRejected, onFulfilledOrRejected [, onProgress]);
```