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
            <table>
                <tr>
                    <th>Тип</th>
                    <th>Описание</th>
                </tr>
                <tr>
                    <td>Object</td>
                    <td>
                        Литеральный объект со следующей структурой:
                        <table>
                            <tr>
                                <th>Свойство</th>
                                <th>Тип</th>
                                <th>Описание</th>
                            </tr>
                            <tr>
                                <td>url</td>
                                <td>String</td>
                                <td>URL запрашиваемой страницы</td>
                            </tr>
                            <tr>
                                <td>data</td>
                                <td>Object</td>
                                <td>Передаваемые данные</td>
                            </tr>
                            <tr>
                                <td>timeout</td>
                                <td>Number</td>
                                <td>Время таймаута в миллисекундах</td>
                            </tr>
                            <tr>
                                <td>success</td>
                                <td>Function</td>
                                <td>Срабатывает, если ошибок не возникло. В качестве аргумента передает полученные данные</td>
                            </tr>
                            <tr>
                                <td>error</td>
                                <td>Function</td>
                                <td>Срабатывает, если произошла ошибка. В качестве аргумента передает информацию о ошибке</td>
                            </tr>
                            <tr>
                                <td>beforeSend</td>
                                <td>Function</td>
                                <td>Срабатывает перед отправкой запроса</td>
                            </tr>
                            <tr>
                                <td>complete</td>
                                <td>Function</td>
                                <td>Срабатывает по окончанию отправки запроса</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
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
