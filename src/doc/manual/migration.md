## Руководство по переходу на API 2.0

{toc}

### Описание

Раздел содержит примеры кода основных возможностей, которые помогут вам прейти с API карт 1.0 на API карт 2.0.

### Подключение API

<table>
    <thead>
        <tr>
            <td>
                <a href="http://api.2gis.ru/doc/maps/manual/map/#toc-load">Версия 1.0</a>
            </td>
            <td>
                <a href="/doc/maps/manual/loading">Версия 2.0</a>
            </td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>&lt;script src="http://maps.api.2gis.ru/1.0" &gt;&lt;/script&gt;

DG.autoload(function() {
    // инициализация карты
    ...
});</code></pre>
            </td>
            <td>
<pre><code>&lt;script src=&quot;http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id=&quot;dgLoader&quot;&gt;&lt;/script&gt;

DG.then(function() {
    // инициализация карты
    ...
});</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Инициализация карты

<table>
    <thead>
        <tr>
            <td><a href="http://api.2gis.ru/doc/maps/manual/map/#toc-init">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/map#пример-использования">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>
var map = new DG.Map('map');
var center = new DG.GeoPoint(82.89, 55.98);
map.setCenter(center, 13);
</code></pre>
            </td>
            <td>
<pre><code>
DG.map('map', {
    'center': [54.98, 82.89],
    'zoom': 13
});
</pre></code>
            </td>
        </tr>
    </tbody>
</table>

### Отображение маркера

Добавление на карту маркера с картинкой по умолчанию:
<table>
    <thead>
        <tr>
            <td><a href="http://api.2gis.ru/doc/maps/manual/markers/#toc-base">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/markers#класс-dgmarker">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>
<nobr>var position = new DG.GeoPoint(82.89, 54.98);</nobr>
var marker = new DG.Markers.Common({
    geoPoint: position
});
map.markers.add(marker);
</code></pre>
            </td>
            <td>
<pre><code>
<nobr>DG.marker([54.98, 82.89]).addTo(map);</nobr>
                    </code>
                </pre>
            </td>
        </tr>
    </tbody>
</table>

Добавление на карту маркера с адаптивной пользовательской картинкой:
<table>
    <thead>
        <tr>
            <td><a href="http://api.2gis.ru/doc/maps/manual/utils#fun-getAdaptiveAcon">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/markers#класс-dgicon">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>
<nobr>var position = new DG.GeoPoint(82.89, 54.98);</nobr>
var desktopParams = [
    'desktop-icon.png',
    24, 24,
    function() {
        return new DG.Point(-12, -12)
    }
];
var mobileParams = [
    '{density}-icon.png',
    34, 34,
    function() {
        return new DG.Point(-17, -17)
    }
];
var myIcon = DG.Utils.getAdaptiveIcon({
    desktop: desktopParams,
    mobile:  mobileParams
});
var marker = new DG.Markers.Common({
    geoPoint: position,
    icon: myIcon
});
map.markers.add(marker);
</code></pre>
            </td>
            <td>
<pre><code>
var myIcon = DG.icon({
    iconUrl: 'my-icon.png',
    iconRetinaUrl: 'my-icon@2x.png',
    iconSize: [24, 24],
    iconAnchor: [-12, -12]
});
DG.marker([50.505, 30.57], {
    icon: myIcon
}).addTo(map);
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Отображение группы маркеров

<table>
    <thead>
        <tr>
            <td><a href="http://api.2gis.ru/doc/maps/manual/markers/#toc-dgmarkersgroup">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/groups#класс-dglayergroup">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>
map.markers.createGroup('myGroup');
map.markers.add(marker1,&nbsp;'myGroup');
map.markers.add(marker2,&nbsp;'myGroup');
map.markers.add(marker3,&nbsp;'myGroup');
</code></pre>
            </td>
            <td>
<pre><code>
DG.layerGroup([marker1, marker2])
.addLayer(marker3).addTo(map);
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Отображение маркера с привязанным балуном

<table>
    <thead>
        <tr>
            <td><a href="http://api.2gis.ru/doc/maps/manual/markers/#toc-dgmarkersballoon">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/markers#marker-bindpopup">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>var position = new DG.GeoPoint(82.89, 54.98);
var marker = new DG.Markers.MarkerWithBalloon({
    geoPoint: position,
    balloonOptions: {
        contentHtml: 'Я бабочка!'
    }
});
map.markers.add(marker);
</code></pre>
            </td>
            <td>
<pre><code>DG.marker([54.98, 82.89])
<nobr>.addTo(map).bindPopup('Я бабочка!');</nobr>
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Отображение балуна

<table>
    <thead>
        <tr>
            <td><a href="http://api.2gis.ru/doc/maps/manual/balloons/#balloon-intro">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/popups#описание">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>var position = new DG.GeoPoint(82.89, 54.98);
var myBalloon = new DG.Balloons.Common({ 
    geoPoint: position,
    contentHtml: 'Привет!'
});
map.balloons.add(myBalloon);</code></pre>
            </td>
            <td>
<pre><code>DG.popup()
.setLatLng([54.98,&nbsp;82.89])
.setContent('Привет!')
.addTo(map);</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Отображение элемента управления

Отображение пользовательского элемента управления в правом верхнем углу карты:
<table>
    <thead>
        <tr>
            <td><a href="http://api.2gis.ru/doc/maps/manual/controls/#toc-intro">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/controls#описание">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>var myControl = new MyControl();
var positionOffset = new DG.Point(0, 0);
var position = new DG.ControlPosition(DG.ControlPosition.TOP_RIGHT, positionOffset);
map.controls.add(myControl, null, position);
</code></pre>
            </td>
            <td>
<pre><code>DG.control.myControl({ position: 'topright' }).addTo(map)</code></pre>
            </td>
        </tr>
    </tbody>
</table>


### Подписка на события

<table>
    <thead>
        <tr>
            <td><a href="http://api.2gis.ru/doc/maps/manual/events/#toc-intro">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/events#описание">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>var callback&nbsp;=&nbsp;function(e)&nbsp;{
    console.log(e.getPoint());
};
map.addEventListener(map.getContainerId(), 'DgClick', callback);
</code></pre>
            </td>
            <td>
<pre><code>map.on('click',&nbsp;function(e)&nbsp;{
    console.log(e.latlng);
});
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

###  Геокодирование

Используя функцию [DG.ajax](/doc/maps/manual/ajax#описание) вы можете отправить в [API справочника](http://api.2gis.ru/doc/firms/quickstart/) не только запрос на преобразование координат в адрес и наоборот, но и любой другой запрос, после чего обработать ответ необходимым способом:

<table>
    <thead>
        <tr><td><a href="http://api.2gis.ru/doc/maps/manual/geocoding/#toc-intro">Версия 1.0</a></td><td>Версия 2.0</td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>DG.Geocoder.get('Москва', {
    success: function(response) {
        console.log(response);
    },
    failure: function(code, message) {
        console.log(code, message);
    }
});
</code></pre>
            </td>
            <td>
<pre><code>DG.ajax('http://catalog.api.2gis.ru/2.0/search', {
    data: {
        key: '1', // ваш ключ
        type: 'geo',
        what: 'Москва'
    },
    success: function(data) {
        console.log(data);
    },
    error: function(error) {
        console.log(error);
    }
});
</code></pre>
            </td>
        </tr>
    </tbody>
</table>


