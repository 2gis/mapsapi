{toc}

## Подключение API

Чтобы быстро начать использовать API достаточно подключить наш загрузчик в `<head></head>`:

`<script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full&mode=debug&skin=dark&lazy=true" data-id="dgLoader"></script>`

* атрибут `data-id="dgLoader"` является обязательным.

### Опции

<table>
    <tr>
        <th>Опции</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>pkg</b></code></td>
        <td><code>full</code></td>
        <td>Загрузка пакета, содержащего набор определенных модулей (full - содержит в себе все доступные модули).</td>
    </tr>
    <tr>
        <td><code><b>mod</b></code></td>
        <td><code>null</code></td>
        <td>Указание конкретных модулей для загрузки. Если задать этот параметр, то параметр pkg будет проигнорирован.</td>
    </tr>
    <tr>
        <td><code><b>skin</b></code></td>
        <td><code>light</code></td>
        <td>Указать желаемый скин приложения, в базовой поставке доступны cкины light и dark.</td>
    </tr>
    <tr>
        <td><code><b>mode</b></code></td>
        <td><code>null</code></td>
        <td>Если указать значение debug, загрузится не минифицированная версия API.</td>
    </tr>
    <tr>
        <td><code><b>lazy</b></code></td>
        <td><code>false</code></td>
        <td>Если указать значение true, API загрузится отложено, при первом вызове L.DG.then.</td>
    </tr>
</table>

## L.DG.then

Интерфейс добавления обработчиков по событию загрузки API. Может вызываться в цепочке:

    L.DG.then(function () {
             map = new L.Map('map', {
                'center': new L.LatLng(54.980206086231, 82.898068362003),
                'zoom': 13,
                'dgGeoclicker': true
            });
        }, function () {console.log('rejected');})
        .then(function () {
            console.log('deferred handler');}
        })


### Интерфейс

<table>
    <tr>
        <th>Вызов</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.DG.then</b>(
            <nobr>&lt;Function&gt; <i>resolve</i>,</nobr>
            <nobr>&lt;Function&gt; <i>reject</i></nobr>)
        </code></td>
        <td><code>Promise</code></td>
        <td>Регистрирует обработчики для выполнения по завершению загрузки API, resolve - отрабатывают в случае успешной загрузки, reject - в случае, если сервер не отдал собранные js и css исходники.</td>
    </tr>
</table>

Т.к. в основе L.DG.then использованы Promise, вызов L.DG.then в любой момент после загрузки API, мгновенно выполнит обработчик.

## L.DG.plugin

Интерфейс для подключения плагинов, зависящих от API или Leaflet:

    L.DG.then(function () {
            //загрузка плагинов
            return L.DG.plugin('https://raw.github.com/mlevans/leaflet-hash/master/leaflet-hash.js');
        })
        .then(function () {
            //инициализация карты
            var map = new L.Map('map', {
                'center': new L.LatLng(54.980206086231, 82.898068362003),
                'zoom': 13,
                'dgGeoclicker': true
            });
            //инициализация плагина
            var hash = new L.Hash(map);
        })

Если плагин не является необходимым на начальном этапе работы с картой, удобно использовать его отложенную загрузку и инициализацию:

    L.DG.then(function () {
            //инициализация карты
            var map = new L.Map('map', {
                'center': new L.LatLng(54.980206086231, 82.898068362003),
                'zoom': 13,
                'dgGeoclicker': true
            });
        }).then(function () {
            //загрузка плагинов
            return L.DG.plugin('https://raw.github.com/mlevans/leaflet-hash/master/leaflet-hash.js');
        }).then(function () {
            //инициализация плагина
            var hash = new L.Hash(map);
        })

### Интерфейс

<table>
    <tr>
        <th>Вызов</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.DG.plugin</b>(
            <nobr>&lt;String&gt; <i>String Url</i>/</nobr>
            <nobr>&lt;Array&gt; <i>[String Url, String Url...]</i></nobr>)
        </code></td>
        <td><code>Promise</code></td>
        <td>Загружает и добавляет сторонние плагины в head секцию html-документа, принимает прямые ссылки на js и css файлы. Файлы должны быть указанны в правильном порядке.</td>
    </tr>
</table>