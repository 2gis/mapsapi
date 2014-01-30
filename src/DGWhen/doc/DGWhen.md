## DG.when

`DG.when()` отслеживает состояние аргумента Promise, который представляет любой объект с методом `.then()`, даже тот, который не полностью соответствуют спецификации Promises/A, например jQuery's Deferred. Он превращает такие Promise-like-objects в Promises/A.

Другими словами, `DG.when()` всегда возвращает безопасный Promise, который полностью соответствует спецификации Promises/A.

#### Смотри так же
* [рабочая спецификация Promises/A](http://promises-aplus.github.io/promises-spec/)
* [Cujojs|when.js](https://github.com/cujojs/when)

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>DG.when</b>(<a href="#promise-or-value">&lt;promiseOrValue&gt;</a> promiseOrValue, &lt;Callback&gt; onFulfilled?, &lt;Callback&gt; onRejected?, &lt;Callback&gt; onProgress?)</code></td>

        <td>
            <code>DG.when(&hellip;)</code>
        </td>

        <td>
            Отслеживает promise или просто оборачивает переменную в новый promise.<br/>
            Если <code>promiseOrValue</code> - переменная, то <code>onFulfilled</code> будет сразу выполнена с этим значением, и по умолчанию вернёт promise.<br/>
            Если в <code>promiseOrValue</code> - это promise, то:
            <ul>
                <li><code>onFulfilled</code> будет вызван с значением которое вернёт <code>promiseOrValue</code> после того как он отработает, или</li>
                <li><code>onRejected</code> будет вызван когда <code>promiseOrValue</code> получит статус rejected.</li>
                <li><code>onProgress</code> будет вызван любым обновлением в <code>promiseOrValue</code>.</li>
            </ul>
        </td>
    </tr>
</table>

### Методы

**Объект DG.when**

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>promise</b>(<a href="#promise-resolver">&lt;Resolver&gt;</a> resolver)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>
        Создаёт <a href="#promise"><code>promise</code></a> с объектом поведения <a href="#promise-resolver"><code>Resolver</code></a>
        </td>
    </tr>
    <tr>
        <td><code><b>resolve</b>(<a href="#promise-or-value">&lt;promiseOrValue&gt;</a> promiseOrValue)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>
        Создаёт <code><a href="#promise">promise</a></code> с <code>resolved</code> статусом.
        </td>
    </tr>
    <tr>
        <td><code><b>reject</b>(<a href="#promise-or-value">&lt;promiseOrValue&gt;</a> promiseOrValue)</code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td>
        Создаёт <code><a href="#promise">promise</a></code> с <code>rejected</code> статусом.
        </td>
    </tr>
    <tr>
        <td><code><b>defer</b>()</code></td>
        <td><code>Deferred: {promise, <a href="#promise-resolver">resolver</a>}</code></td>
        <td>Создаёт объект <code>Deferred</code>. В некоторых случаях бывает удобно иметь доступ, через один объект, к <a href="#promise"><code>promise</code></a> и его <code>resolver</code></td>
    </tr>
    <tr>
        <td><code><b>isPromiseLike</b>(&lt;Object&gt; anything)</code></td>
        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code> если у объекта или функции <code>anything</code> есть метод <code>then()</code>.</td>
    </tr>
</table>

### Вспомогательные объекты

<table>
    <tr>
        <th>Имя</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr id="promise-or-value">
        <td><code><b>promiseOrValue</b></code></td>
        <td><code>Promise | anything</code></td>
        <td>Любое значение, либо безопасный <code><a href="#promise">promise</a></code> (объект у которого есть метод <code>then()</code>)</td>
    </tr>
    <tr id="promise">
        <td><code><b>Promise</b></code></td>
        <td><code><a href="#promise">Promise</a></code></td>
        <td><a href="#promise"><code>Promise</code></a> представляет собой конечный результат, который имеет условный статус <code>resolved</code> или <code>rejected</code>. В первом случае результатом <a href="#promise"><code>promise</code></a> будет полученное значение, а во втором причина <code>rejected'a</code>.
        Так же <a href="#promise"><code>promise</code></a> предоставляет интерфейс для вызова функции с его результатом (значение, или причина <code>rejected'a</code>) и создаёт новый <a href="#promise"><code>promise</code></a> для результата.</td>
    </tr>
    <tr id="promise-resolver">
        <td><code><b>resolver</b></code></td>
        <td><code><b>Function</b>(&lt;Callback&gt; resolve, &lt;Callback&gt; reject, &lt;Callback&gt; notify)</code></td>
        <td>Функция которая выполняет определённый набор действий (возможно асинхронных) и в конце своей работы вызывает либо <code>resolve</code> передавая в него результат работы, либо <code>reject</code> и передаёт в него причину отказа работы. Так же во время работы возможно использование <code>notify</code> для передачи в него текущего статуса выполнения работы.</td>
    </tr>
</table>
