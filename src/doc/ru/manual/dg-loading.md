## Подключение API

{toc}

### Описание

Работа с картой возможна только после того, как в браузер будет загружен код API карт.
Есть несколько способов его загрузки.

### Простой способ

Сперва подключим API карт, поместив в секцию <code>head</code> HTML-страницы следующий код:

    <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full"></script>

Затем воспользуемся функцией <code>DG.then</code>, в которую поместим код инициализации карты:

    DG.then(function() {
        map = DG.map('map', {
            'center': [54.98, 82.89],
            'zoom': 13
        });
    });

Внутри себя эта функция добавляет обработчик события загрузки страницы. Именно такой способ
рассматривался в разделе [«Быстрый старт»](/doc/maps/ru/quickstart).

### npm

API карт можно подключить через npm:

    $ npm i 2gis-maps

После установки пакета подключим его через <code>require</code>:

    var DG = require('2gis-maps');
    var map = DG.map('map', {
        'center': [54.98, 82.89],
        'zoom': 13
    });

Обратите внимание, что при использовании npm-пакета использовать <code>DG.then</code> не нужно.

### Загрузка по требованию

Вы можете загрузить API карт именно в тот момент, когда карта станет нужна. Для этого в URL
подключения API необходимо добавить параметр <code>lazy=true</code>:

    <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full&lazy=true"></script>

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
        <tr id="loading-pkg">
            <td><code>pkg</code></td>
            <td><code>full</code></td>
            <td>Пакет загружаемых модулей. На данный момент поддерживается 2 пакета:
                <code>full</code> — все модули API; <code>basic</code> — базовая функциональность
                (попапы, маркеры, векторные объекты).</td>
        </tr>
        <tr>
            <td><code>skin</code></td>
            <td><code>dark</code></td>
            <td>Тема управляющих элементов (светлая или темная). Принимает значение
                <code>light</code> или <code>dark</code>.</td>
        </tr>
        <tr>
            <td><code>lazy</code></td>
            <td><code>false</code></td>
            <td>Если указать значение <code>true</code>, тогда API карт загрузится отложенно,
                при первом вызове <code>DG.then</code>.</td>
        </tr>
    </tbody>
</table>

### Функция DG.then

Как было описано ранее, функция <code>DG.then</code> отвечает за отслеживание момента загрузки API карт
и добавление обработчиков этого действия. Параметры функции:

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
            <td>Регистрирует обработчики загрузки API. Пареметры: <code>resolve</code> — функция,
                срабатывающая при успешной загрузке API карт, <code>reject</code> — функция,
                срабатывающая в случае ошибки сервера.</td>
        </tr>
    </tbody>
</table>

Вызов функции <code>DG.then</code> в любой момент после загрузки API мгновенно выполнит обработчик.
