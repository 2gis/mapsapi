## Внешние модули

Кроме возможности подключить один из <a href="/doc/maps/ru/manual/dg-loading#loading-pkg">пакетов</a> модулей 2ГИС,
вы можете загружать модули других разработчиков со сторонних серверов. API карт совместим с большинством
<a target="_blank" href="http://leafletjs.com/plugins.html">модулей библиотеки</a> Leaflet.
Также вы можете разработать и подключить
<a href="https://github.com/2gis/maps-api-2.0/blob/master/CONTRIBUTING.md#%D0%9A%D0%B0%D0%BA-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D1%81%D0%BE%D0%B1%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C" target="_blank">собственный модуль</a>.

{toc}

### Подключение

Для подключения внешних модулей используется функция <code>DG.plugin</code>.
Ниже мы рассмотрим несколько примеров ее использования.

Использование функции <code>DG.plugin</code> в случае, когда модуль должен быть
загружен до начала инициализации карты:

    // загрузка кода API карт
    DG.then(function() {
        // загрузка кода модуля
        return DG.plugin('https://raw.github.com/mlevans/leaflet-hash/master/leaflet-hash.js');
    })
    .then(function() {
        // инициализация карты
        var map = DG.map('map', {
            'center': [54.98, 82.89],
            'zoom': 13
        });
        // инициализация модуля
        L.hash(map);
    });

Если модуль не нужен на начальном этапе работы с картой, тогда можно использовать его отложенную
загрузку и инициализацию (например, при клике на кнопку):

    // загрузка кода API карт
    DG.then(function() {
        // инициализация карты
        map = DG.map('map', {
            'center': [54.98, 82.89],
            'zoom': 13
        });
    });

    // код, который может быть вызван по требованию
    DG.then(function() {
        // загрузка кода модуля
        return DG.plugin('https://raw.github.com/mlevans/leaflet-hash/master/leaflet-hash.js');
    }).then(function () {
        // инициализация модуля
        L.hash(map);
    });

### DG.plugin

Отвечает за загрузку внешних модулей. Параметры функции:

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
            <td><code>DG.plugin</b>(
                <nobr>&lt;String&gt; <i>url</i>&nbsp;|&nbsp;</nobr>
                <nobr>&lt;Array&gt; <i>[&lt;String&gt; url, &lt;String&gt; url, ...]</i></nobr>&nbsp;)
            </code></td>
            <td><code>Promise</code></td>
            <td>Загружает модули. В качестве параметров должны быть указкны прямые ссылки на js и css файлы.</td>
        </tr>
    </tbody>
</table>
