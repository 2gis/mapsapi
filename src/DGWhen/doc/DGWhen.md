## L.DG.when

`L.DG.when()` может сделить за promise которые предоставляют из себя любой обьект с методом `.then()`, тоесть даже promise которые не соотвествуют спецификации Promises/A, например jQuery's Deferred. Он будет превращать такие promise в Promises/A.

Другими словами, `L.DG.when()` будет всегда возвращать безопасный promise, который полностью соответсвует спецификации Promises/A.

#### Смотрите так же
* [Здесь мы можете прочитать более подробно про when()](https://github.com/cujojs/when/wiki/when)

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.DG.when</b>(<a href="#promise-or-value">&lt;promiseOrValue&gt;</a> promiseOrValue, &lt;Callback&gt; onFulfilled?, &lt;Callback&gt; onRejected?, &lt;Callback&gt; onProgress?)</code></td>

        <td>
            <code>L.DG.when(&hellip;)</code>
        </td>

        <td>
            Мы имеем возможность отслеживать promise или непосредственно значение переменной.<br/>
            Если <code>promiseOrValue</code> представляет собой значение переменной, то <code>onFulfilled</code> будет выполнена с этим значением, и по умолчанию вернёт promise.<br/>
            Если в <code>promiseOrValue</code> передан promise, то:
            <ul>
                <li><code>onFulfilled</code> будет вызван с значением которое вернёт <code>promiseOrValue</code> после того как он отработает, или</li>
                <li><code>onRejected</code> будет вызван когда <code>promiseOrValue</code> получит статус rejected.</li>
                <li><code>onProgress</code> будет вызван любым обновлением в <code>promiseOrValue</code>.</li>
            </ul>
        </td>
    </tr>
</table>

### Методы

**Класс L.DG.When**

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>promise</b>(<a href="#promise-resolver">&lt;Resolver&gt;</a> resolver)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>Create a Promise, whose fate is determined by the supplied resolver function. The resolver function will be called synchronously, with 3 arguments:
        * `resolve(promiseOrValue)` - Primary function that seals the fate of the returned promise. Accepts either a non-promise value, or another promise.
            * When called with a non-promise value, fulfills `promise` with that value.
            * When called with another promise, e.g. `resolve(otherPromise)`, `promise`'s fate will be equivalent to that that of `otherPromise`.
        * `reject(reason)` - function that rejects `promise`.
        * `notify(update)` - function that issues progress events for `promise`.
        </td>
    </tr>
    <tr>
        <td><code><b>resolve</b>(<a href="#promise-or-value">&lt;promiseOrValue&gt;</a> promiseOrValue)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>
        Создаёт <code><a href="#promise">promise</a></code> с <code>resolved</code> статусом.
        Create a resolved promise for the supplied promiseOrValue. If promiseOrValue is a value, it will be the resolution value of the returned promise. Returns promiseOrValue if it's a trusted promise. If promiseOrValue is a foreign promise, returns a promise in the same state (resolved or rejected) and with the same value as promiseOrValue.</td>
    </tr>
    <tr>
        <td><code><b>reject</b>(<a href="#promise-or-value">&lt;promiseOrValue&gt;</a> promiseOrValue)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>
        Создаёт <code><a href="#promise">promise</a></code> с <code>rejected</code> статусом.
        Create a rejected promise for the supplied promiseOrValue. If promiseOrValue is a value, it will be the rejection value of the returned promise. If promiseOrValue is a promise, its completion value will be the rejected value of the returned promise.</td>
    </tr>
    <tr>
        <td><code><b>defer</b>()</code></td>
        <td><code>Deferred: {promise, <a href="#promise-resolver">resolver</a>}</code></td>
        <td>
        Создаёт обьект <code>{promise, <a href="#promise-resolver">resolver</a>}</code> который ещё называют <code>Deferred</code>.

        Create a {promise, resolver} pair, aka Deferred. In some scenarios it can be convenient to have access to both the promise and it's associated resolving functions, for example, to give each out to a separate party. In such cases it can be convenient to use when.defer().</td>
    </tr>
    <tr>
        <td><code><b>isPromiseLike</b>(&lt;Object&gt; anything)</code></td>
        <td><code>Boolean</code></td>
        <td>
            Возвращает <code>true</code> если у обьекта или функции <code>anything</code> есть метод <code>then()</code>.
        Return true if `anything` is an object or function with a `then` method.  It does not distinguish trusted when.js promises from other "thenables" (e.g. from some other promise implementation).</td>
    </tr>
    <!-- <tr>
        <td><code><b>join</b>(<a href="#promise-or-value">&lt;promiseOrValue&gt;</a> promiseOrValue1, <a href="#promise-or-value">&lt;promiseOrValue&gt;</a> promiseOrValue2, ...)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>Return a promise that will resolve only once all the inputs have resolved. The resolution value of the returned promise will be an array containing the resolution values of each of the inputs.<br/>
        If any of the input promises is rejected, the returned promise will be rejected with the reason from the first one that is rejected.</td>
    </tr>
    <tr>
        <td><code><b>all</b>(&lt;Array&gt; array)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>Return a promise that will resolve only once all the items in array have resolved. The resolution value of the returned promise will be an array containing the resolution values of each of the items in array.<br/>If any of the promises is rejected, the returned promise will be rejected with the rejection reason of the first promise that was rejected.</td>
    </tr>
    <tr>
        <td><code><b>map</b>(&lt;Array&gt; array, &lt;Function&gt; mapFunc)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
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
        <td><code><b>reduce</b>(&lt;Array&gt; array, &lt;Function&gt; reduceFunc, <a href="#promise-or-value">&lt;promiseOrValue&gt;</a> initialValue?)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
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
        <td><code><a href="#promise">Promise</a></code></td>
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
        <td><code><a href="#promise">Promise</a></code></td>
        <td>Where:

            * array is an Array *or a promise for an array*, which may contain promises and/or values.

            Initiates a competitive race that allows one winner, returning a promise that will resolve when any one of the items in `array` resolves.  The returned promise will only reject if *all* items in `array` are rejected.  The resolution value of the returned promise will be the fulfillment value of the winning promise.  The rejection value will be an array of all rejection reasons.</td>
    </tr>
    <tr>
        <td><code><b>some</b>(&lt;Array&gt; array, &lt;Number&gt; howMany)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>Where:

            * array is an Array *or a promise for an array*, which may contain promises and/or values.
            * howMany is the number of promises from array that must fulfill to end the race

            Initiates a competitive race that allows `howMany` winners, returning a promise that will resolve when `howMany` of the items in `array` resolve.  The returned promise will reject if it becomes impossible for `howMany` items to resolve--that is, when `(array.length - howMany) + 1` items reject.  The resolution value of the returned promise will be an array of `howMany` winning promise fulfillment values.  The rejection value will be an array of `(array.length - howMany) + 1` rejection reasons.
        </td>
    </tr> -->
</table>

##Вспомогательные обьекты

<table>
    <tr>
        <th>Имя</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr id="promise-or-value">
        <td><code><b>promiseOrValue</b></code></td>
        <td><code>Promise | anything</code></td>
        <td>Любое значение, либо безопасный <code><a href="#promise">promise</a></code> (обьект у которого есть метод <code>then()</code>)</td>
    </tr>
    <tr id="promise">
        <td><code><b>Promise</b></code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>Promise представляет собой конечный результат, либо успешного выполнения (и возвращает полученое значение), либо отказа (и возвращает причину отклонения). Так же promise предоставляет интерфейс для вызова функции с его результатом (значение, или причина отказа) и создаёт новый promise для результата.
        The promise represents the *eventual outcome*, which is either fulfillment (success) and an associated value, or rejection (failure) and an associated *reason*. The promise provides mechanisms for arranging to call a function on its value or reason, and produces a new promise for the result.</td>
    </tr>
    <tr id="promise-resolver">
        <td><code><b>resolver</b></code></td>
        <td><code><b>Function</b>(&lt;Callback&gt; resolve, &lt;Callback&gt; reject, &lt;Callback&gt; notify)</code></td>
        <td>Функция которая выполняет определённый набор действий (возможно асинхронных) и в конце своей работы вызывает либо <code>resolve</code> передавая в него результат работы, либо <code>reject</code> и передаёт в него причину отказа работы. Так же во время работы возможно использование <code>notify</code> для передачи в него текущего статуса выполнения работы.</td>
    </tr>
</table>