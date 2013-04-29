Плагин отправки HTTP (AJAX) запросов
====================================

Данный плагин позволяет отправлять кросс-доменные HTTP (AJAX) запросы

# API
## Функция L.DG.Jsonp

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
                            <li>url - URL запрашиваемой страницы</li>
                            <li>data - передаваемые данные</li>
                            <li>timeout - время таймаута в миллисекундах</li>
                            <li>success - функция, которая срабатывает если ошибок не возникло. В качестве аргумента принимает полученные данные</li>
                            <li>error - функция, которая срабатывает если произошла ошибка. В качестве аргумента передает информацию об ошибке</li>
                            <li>beforeSend - функция, которая срабатывает перед отправкой запроса</li>
                            <li>complete - функция, которая срабатывает по окончанию отправки запроса</li>
                        </ul>
                    </td>
                </tr>
            </table>
        </td>
        <td>Object</td>
        <td>Отправляет кросс-доменный AJAX запрос и возвращает объект с методом cancel, с помощью которого можно остановить отправку запроса</td>
    </tr>
</table>

## Примеры
Базовое использование:

    L.DG.Jsonp({
        url: 'http://catalog.api.2gis.ru/project/list',
        data: {
            output: 'jsonp',
            key: '123456',
            version: 1.3,
            lang: 'ru'
        },
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        },
        beforeSend: function() {
            console.log('beforeSend');
        },
        complete: function() {
            console.log('complete');
        }
    });

Отмена запроса:

    var jsonp = L.DG.Jsonp({
        url: 'http://catalog.api.2gis.ru/project/list',
        data: {
            output: 'jsonp',
            key: '123456',
            version: 1.3,
            lang: 'ru'
        },
        success: function(data) {
            console.log(data);
        }
    });

    jsonp.cancel():
