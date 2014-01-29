Плагин отправки HTTP (AJAX) запросов
====================================

Данный плагин позволяет отправлять кросс-доменные HTTP (AJAX) запросы.

# API
## Функция DG.ajax

<table>
    <tr>
        <th>Параметры</th>
        <th>Возвращаемый тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>
            <table>
                <tr>
                    <th>Тип</th>
                    <th>Описание</th>
                </tr>
                <tr>
                    <td>Object</td>
                    <td>
                        Литеральный объект со следующей структурой:
                        <ul>
                            <li>url - URL запрашиваемой страницы;</li>
                            <li>data - передаваемые данные;</li>
                            <li>type - метод запроса ('get' или 'post'), либо 'jsonp'</li>
                            <li>timeout - время таймаута в миллисекундах;</li>
                            <li>progress - функция, которая срабатывает перед отправкой запроса (jsonp, xhr) или во время выполнения запроса (xhr2);</li>
                            <li>success - функция, которая срабатывает если ошибок не возникло. В качестве параметра принимает полученные данные;</li>
                            <li>error - функция, которая срабатывает если произошла ошибка. В качестве параметра принимает информацию об ошибке;</li>
                            <li>complete - функция, которая срабатывает по окончанию отправки запроса (после выполнения функции success или error).</li>
                        </ul>
                    </td>
                </tr>
            </table>
        </td>
        <td>Promise</td>
        <td>Отправляет кросс-доменный AJAX запрос и возвращает объект Promise с методом abort, с помощью которого можно прервать отправку запроса.</td>
    </tr>
</table>

## Примеры
Базовое использование:

    DG.ajax('http://catalog.api.2gis.ru/2.0/search', {
        type: 'get',
        data: {
            key: 'ruxlih0718',
            type: 'filial',
            house: 141373143572328,
            page: 1
        },
        success: function(data) {
            console.log('success', data);
        },
        error: function(error) {
            console.log('error', error);
        },
        progress: function() {
            console.log('beforeSend');
        }
    }).then(
        function(data) { console.log('resolve', data) },
        function(error) { console.log('reject', error) },
        function(data) { console.log('progress', data) }
    );

Отмена запроса:

    var requestPromise = DG.ajax('http://catalog.api.2gis.ru/2.0/search', {
        type: 'get',
        data: {
            key: 'ruxlih0718',
            type: 'filial',
            house: 141373143572328,
            page: 1
        },
        success: function(data) {
            console.log('success', data);
        },
        error: function(error) {
            console.log('error', error);
        },
        progress: function() {
            console.log('beforeSend');
        }
    });

    requestPromise.abort();
