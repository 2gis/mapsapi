## Подключение API

Работа с картой возможна только после того, как будет загружена библиотека. Есть несколько способов это сделать. Начнем с простого.

### Простой способ

Сперва подключим API карт, поместив в секцию head HTML-страницы следующий код:

    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id="dgLoader"></script>

Атрибут `data-id="dgLoader"` обязательный.

Затем воспользуемся функцией DG.then, в которую поместим код инициализации карты:

    DG.then(function() {
        map = DG.map('map', {
            'center': [54.98, 82.89],
            'zoom': 13
        });
    });

Внутри себя эта функция добавляет обработчик события загрузки страницы. Именно такой способ рассматривался в разделе «Быстрый старт».

### Загрузка по требованию

Вы можете загрузить API карт именно в тот момент, когда карта станет нужна. Для этого в URL подключения API необходимо добавить параметр `lazy=true`:

    <script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full&lazy=true" data-id="dgLoader"></script>

Затем в нужный момент времени (например, при нажатии на кнопку) необходимо вызвать функцию DG.then:

    DG.then(function() {
        map = DG.map('map', {
            'center': [54.98, 82.89],
            'zoom': 13
        });
    });

### Опции подключения

Ниже описаны все опции, которые может принимать URL загрузки API карт:

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>pkg</code></td>
            <td><code>full</code></td>
            <td>Пакет загружаемых модулей. На данный момент поддерживается 2 пакета: `full` - все модули API, `light` - базовая функциональность (балуны, маркера, геометрии).</td>
        </tr>
        <!--<tr>
            <td><code>mod</code></td>
            <td><code>null</code></td>
            <td>Перечень конкретных модулей для загрузки (через запятую). Если задать этот параметр, тогда параметр pkg будет проигнорирован.</td>
        </tr>-->
        <tr>
            <td><code>skin</code></td>
            <td><code>light</code></td>
            <td>Тема карты (светлая или темная). Принимает значение `light` или `dark`.</td>
        </tr>
        <tr>
            <td><code>mode</code></td>
            <td><code>null</code></td>
            <td>Если указать значение `debug`, тогда загрузится несжатый JavaScript код API (удобно при отладке приложений).</td>
        </tr>
        <tr>
            <td><code>lazy</code></td>
            <td><code>false</code></td>
            <td>Если указать значение `true`, тогда API карт загрузится отложено, при первом вызове `DG.then`.</td>
        </tr>
    </tbody>
</table>

### Функция DG.then

Как было описано ранее, функция `DG.then` отвечает за отслеживание момента загрузки API карт и добавление обработчиков этого действия. Параметры функции:

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
            <td><code>DG.then</b>(
                <nobr>&lt;Function&gt; <i>resolve</i>,</nobr>
                <nobr>&lt;Function&gt; <i>reject</i></nobr>&nbsp;)
            </code></td>
            <td><code>Promise</code></td>
            <td>Регистрирует обработчики загрузки API. Пареметры: resolve - сработает при успешной загрузке API карт, reject - в случае ошибки сервера.</td>
        </tr>
    </tbody>
</table>

Вызов функции `DG.then` в любой момент после загрузки API мгновенно выполнит обработчик.

## Подключение сторонних модулей

API карт совместим с большинством модулей библиотеки Leaflet, также вы можете разработать и подключить <a href="https://github.com/2gis/maps-api-2.0/blob/master/CONTRIBUTING.md#%D0%9A%D0%B0%D0%BA-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D1%82%D1%8C-%D1%81%D0%BE%D0%B1%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D1%8C" target="_blank">собственный модуль</a>. Для подключения модулей используется функция `DG.plugin`. Ниже мы рассмотрим несколько примеров ее использования.

Использование функции `DG.plugin` в случае, когда модуль должен быть загружен до начала инициализации карты:

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

Если модуль не нужен на начальном этапе работы с картой, тогда можно использовать его отложенную загрузку и инициализацию (например, при клике на кнопку):

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

### Функция DG.plugin

Функция `DG.plugin` отвечает за загрузку модулей, которые не входят в базовые пакеты API карт и расположены на сторонних серверах. Параметры функции:

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