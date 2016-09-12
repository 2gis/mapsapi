## Асинхронные запросы (AJAX)

{toc}

### DG.ajax

Функция DG.ajax позволяет отправлять кросс-доменные AJAX запросы.

    var promise = DG.ajax('http://www.geonames.org/postalCodeLookupJSON', {
        type: 'get',
        data: {
            postalcode: 10504,
            country: 'US'
        },
        success: function(data) {
            console.log('success', data);
        },
        error: function(error) {
            console.log('error', error);
        }
    });

    // для отмены запроса:
    // promise.abort();

#### Методы

<table>
    <thead>
        <tr>
            <th>Вызов</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>DG.ajax</b>(
                <nobr>&lt;String&gt; <i>url</i>,</nobr>
                <nobr>&lt;<a href="#опции">Ajax options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>Promise</code></td>
            <td>Отправляет запрос на сервер и возвращает объект Promise с методом abort, с помощью
                которого можно прервать отправку запроса. В качестве входящих параметров принимает URL,
                на который будет отправлен запрос и необязательный объект опций.</td>
        </tr>
    </tbody>
</table>

#### Опции

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>Значение<br>по умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>data</b></code></td>
            <td><code>Object</code></td>
            <td><code>null</code></td>
            <td>Данные, которые будут переданы на сервер.</td>
        </tr>
        <tr>
            <td><code><b>type</b></code></td>
            <td><code>String</code></td>
            <td><code>get</code></td>
            <td>Тип запроса ('get', 'post' или 'jsonp').</td>
        </tr>
        <tr>
            <td><code><b>success</b></code></td>
            <td><code>Function</code></td>
            <td><code>null</code></td>
            <td>Функция, которая срабатывает в случае успешного ответа сервера.
                В качестве параметра принимает полученные данные.</td>
        </tr>
        <tr>
            <td><code><b>error</b></code></td>
            <td><code>Function</code></td>
            <td><code>null</code></td>
            <td>Функция, которая срабатывает при возникновении ошибки.
                В качестве параметра принимает информацию об ошибке.</td>
        </tr>
        <tr>
            <td><code><b>url</b></code></td>
            <td><code>String</code></td>
            <td><code>null</code></td>
            <td>URL, на который будет отправлен запрос.</td>
        </tr>
        <tr>
            <td><code><b>timeout</b></code></td>
            <td><code>Number</code></td>
            <td><code>null</code></td>
            <td>Время ожидания запроса (в миллисекундах).</td>
        </tr>
    </tbody>
</table>
