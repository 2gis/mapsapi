2GIS JSONP plugin
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
            * url        String URL запрашиваемой страницы
            * data       Object Передаваемые данные
            * timeout    Number Время таймаута в миллисекундах
            * success    Function Срабатывает, если ошибок не возникло. В качестве аргумента передает полученные данные
            * error      Function Срабатывает, если произошла ошибка. В качестве аргумента передает информацию о ошибке
            * beforeSend Function Срабатывает перед отправкой запроса
            * complete   Function Срабатывает по окончанию отправки запроса
        </td>
        <td>Object</td>
        <td>Отправляет кросс-доменный AJAX запрос и возвращает объект с методом cancel, с помощью которого можно остановить отправку запроса</td>
    </tr>
</table>

## Примеры
### Базовое использование:

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

### Отмена запроса:

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
