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

## Методы

**Класс L.DG.When**

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>promise</b>(&lt;Function&gt; resolver)</code></td>
        <td><code>Promise</code></td>
        <td>Create a Promise, whose fate is determined by the supplied resolver function. The resolver function will be called synchronously, with 3 arguments:
        * `resolve(promiseOrValue)` - Primary function that seals the fate of the returned promise. Accepts either a non-promise value, or another promise.
			* When called with a non-promise value, fulfills `promise` with that value.
			* When called with another promise, e.g. `resolve(otherPromise)`, `promise`'s fate will be equivalent to that that of `otherPromise`.
		* `reject(reason)` - function that rejects `promise`.
		* `notify(update)` - function that issues progress events for `promise`.
		</td>
    </tr>
    <tr>
        <td><code><b>resolve</b>(&lt;promiseOrValue&gt; promiseOrValue)</code></td>
        <td><code>Promise</code></td>
        <td>Create a resolved promise for the supplied promiseOrValue. If promiseOrValue is a value, it will be the resolution value of the returned promise. Returns promiseOrValue if it's a trusted promise. If promiseOrValue is a foreign promise, returns a promise in the same state (resolved or rejected) and with the same value as promiseOrValue.</td>
    </tr>
    <tr>
        <td><code><b>reject</b>(&lt;promiseOrValue&gt; promiseOrValue)</code></td>
        <td><code>Promise</code></td>
        <td>Create a rejected promise for the supplied promiseOrValue. If promiseOrValue is a value, it will be the rejection value of the returned promise. If promiseOrValue is a promise, its completion value will be the rejected value of the returned promise.</td>
    </tr>
    <tr>
        <td><code><b>defer</b>()</code></td>
        <td><code>Deferred: {promise, resolver}</code></td>
        <td>Create a {promise, resolver} pair, aka Deferred. In some scenarios it can be convenient to have access to both the promise and it's associated resolving functions, for example, to give each out to a separate party. In such cases it can be convenient to use when.defer().</td>
    </tr>
    <tr>
        <td><code><b>join</b>(&lt;promiseOrValue1&gt; promiseOrValue1, &lt;promiseOrValue2&gt; promiseOrValue2, ...)</code></td>
        <td><code>Promise</code></td>
        <td>Return a promise that will resolve only once all the inputs have resolved. The resolution value of the returned promise will be an array containing the resolution values of each of the inputs.<br/>
		If any of the input promises is rejected, the returned promise will be rejected with the reason from the first one that is rejected.</td>
    </tr>
    <tr>
        <td><code><b>all</b>(&lt;Array&gt; array)</code></td>
        <td><code>Promise</code></td>
        <td>Return a promise that will resolve only once all the items in array have resolved. The resolution value of the returned promise will be an array containing the resolution values of each of the items in array.<br/>If any of the promises is rejected, the returned promise will be rejected with the rejection reason of the first promise that was rejected.</td>
    </tr>
    <tr>
        <td><code><b>map</b>(&lt;Array&gt; array?, &lt;Function&gt; mapFunc)</code></td>
        <td><code>Promise</code></td>
        <td>Where:

			* array is an Array *or a promise for an array*, which may contain promises and/or values.

			Traditional array map function, similar to `Array.prototype.map()`, but allows input to contain promises and/or values, and mapFunc may return either a value or a promise.

			If any of the promises is rejected, the returned promise will be rejected with the rejection reason of the first promise that was rejected.

			The map function should have the signature:

			```js
			mapFunc(item)
			```

			Where:

			* `item` is a fully resolved value</td>
    </tr>
    <tr>
        <td><code><b>reduce</b>(&lt;Array&gt; array, &lt;Function&gt; reduceFunc, &lt;promiseOrValue&gt; initialValue?)</code></td>
        <td><code>Promise</code></td>
        <td>Where:

			* array is an Array *or a promise for an array*, which may contain promises and/or values.

			Traditional array reduce function, similar to `Array.prototype.reduce()`, but input may contain promises and/or values, and reduceFunc may return either a value or a promise, *and* initialValue may be a promise for the starting value.

			The reduce function should have the signature:

			```js
			reduceFunc(currentResult, value, index, total)
			```
		</td>
    </tr>
    <tr>
        <td><code><b>settle</b>(&lt;Array&gt; array)</code></td>
        <td><code>Promise</code></td>
        <td>Where:

			* array is an Array *or a promise for an array*, which may contain promises and/or values.

			Returns a promise for an array containing the same number of elements as the input array.  Each element is a descriptor object describing of the outcome of the corresponding element in the input.  The returned promise will only reject if `array` itself is a rejected promise.  Otherwise, it will always fulfill with an array of descriptors.  This is in contrast to [when.all](#whenall), which will reject if any element of `array` rejects.

			If the corresponding input promise is:

			* fulfilled, the descriptor will be: `{ state: 'fulfilled', value: <fulfillmentValue> }`
			* rejected, the descriptor will be: `{ state: 'rejected', reason: <rejectionReason> }`
		</td>
    </tr>
    <tr>
        <td><code><b>any</b>(&lt;Array&gt; array)</code></td>
        <td><code>Promise</code></td>
        <td>Where:

			* array is an Array *or a promise for an array*, which may contain promises and/or values.

			Initiates a competitive race that allows one winner, returning a promise that will resolve when any one of the items in `array` resolves.  The returned promise will only reject if *all* items in `array` are rejected.  The resolution value of the returned promise will be the fulfillment value of the winning promise.  The rejection value will be an array of all rejection reasons.</td>
    </tr>
    <tr>
        <td><code><b>some</b>(&lt;Array&gt; array, &lt;Integer&gt; howMany)</code></td>
        <td><code>Promise</code></td>
        <td>Where:

			* array is an Array *or a promise for an array*, which may contain promises and/or values.
			* howMany is the number of promises from array that must fulfill to end the race

			Initiates a competitive race that allows `howMany` winners, returning a promise that will resolve when `howMany` of the items in `array` resolve.  The returned promise will reject if it becomes impossible for `howMany` items to resolve--that is, when `(array.length - howMany) + 1` items reject.  The resolution value of the returned promise will be an array of `howMany` winning promise fulfillment values.  The rejection value will be an array of `(array.length - howMany) + 1` rejection reasons.
		</td>
    </tr>
    <tr>
        <td><code><b>isPromiseLike</b>(&lt;Object&gt; anything)</code></td>
        <td><code>Boolean</code></td>
        <td>Return true if `anything` is an object or function with a `then` method.  It does not distinguish trusted when.js promises from other "thenables" (e.g. from some other promise implementation).</td>
    </tr>
</table>


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

