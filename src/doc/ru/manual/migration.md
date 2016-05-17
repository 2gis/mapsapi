## Руководство по переходу на API 2.0

{toc}

### Описание

Раздел содержит примеры кода основных возможностей, которые помогут вам прейти с API карт версии 1.0 на API карт версии 2.0.

### Подключение API

<table>
    <thead>
        <tr>
            <td><a href="/doc/maps/1.0/manual/map/#toc-load">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/loading">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>&lt;script src="http://maps.api.2gis.ru/1.0"&gt;&lt;/script&gt;

DG.autoload(function() {
    // инициализация карты
    ...
});</code></pre>
            </td>
            <td>
<pre><code>&lt;script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full"&gt;&lt;/script&gt;

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
            <td><a href="/doc/maps/1.0/manual/map/#toc-init">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/map#пример-использования">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>var map = new DG.Map('map');
<nobr>var center = new DG.GeoPoint(82.89, 55.98);</nobr>
map.setCenter(center, 13);</code></pre>
            </td>
            <td>
<pre><code>var map = DG.map('map', {
    <nobr>'center': [54.98, 82.89],</nobr>
    'zoom': 13
});</pre></code>
            </td>
        </tr>
    </tbody>
</table>

### Отображение маркера

Добавление на карту маркера с картинкой по умолчанию:
<table>
    <thead>
        <tr>
            <td><a href="/doc/maps/1.0/manual/markers/#toc-base">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/markers/#класс-dgmarker">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code><nobr>var position = new DG.GeoPoint(82.89, 54.98);</nobr>
var marker = new DG.Markers.Common({
    geoPoint: position
});
map.markers.add(marker);</code></pre>
            </td>
            <td>
<pre><code><nobr>DG.marker([54.98, 82.89]).addTo(map);</nobr></code></pre>
            </td>
        </tr>
    </tbody>
</table>

Добавление на карту маркера с адаптивной пользовательской картинкой:
<table>
    <thead>
        <tr>
            <td><a href="/doc/maps/1.0/manual/utils/#fun-getAdaptiveAcon">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/markers#класс-dgicon">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code><nobr>var position = new DG.GeoPoint(82.89, 54.98);</nobr>
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
map.markers.add(marker);</code></pre>
            </td>
            <td>
<pre><code>var myIcon = DG.icon({
    iconUrl: 'my-icon.png',
    <nobr>iconRetinaUrl: 'my-icon@2x.png',</nobr>
    iconSize: [24, 24],
    iconAnchor: [-12, -12]
});
DG.marker([54.98, 82.89], {
    icon: myIcon
}).addTo(map);</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Отображение группы маркеров

<table>
    <thead>
        <tr>
            <td><a href="/doc/maps/1.0/manual/markers/#toc-dgmarkersgroup">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/groups#класс-dglayergroup">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code><nobr>map.markers.createGroup('myGroup');</nobr>
map.markers.add(marker1, 'myGroup');
map.markers.add(marker2, 'myGroup');
map.markers.add(marker3, 'myGroup');</code></pre>
            </td>
            <td>
<pre><code><nobr>DG.layerGroup([marker1, marker2])</nobr>
.addLayer(marker3).addTo(map);</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Отображение маркера с привязанным балуном

<table>
    <thead>
        <tr>
            <td><a href="/doc/maps/1.0/manual/markers/#toc-dgmarkersballoon">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/markers#marker-bindpopup">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code><nobr>var position = new DG.GeoPoint(82.89, 54.98);</nobr>
var marker = new DG.Markers.MarkerWithBalloon({
    geoPoint: position,
    balloonOptions: {
        contentHtml: 'Я бабочка!'
    }
});
map.markers.add(marker);</code></pre>
            </td>
            <td>
<pre><code>DG.marker([54.98, 82.89])
<nobr>.addTo(map).bindPopup('Я бабочка!');</nobr></code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Отображение балуна

<table>
    <thead>
        <tr>
            <td><a href="/doc/maps/1.0/manual/balloons/#balloon-intro">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/popups#описание">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code><nobr>var position = new DG.GeoPoint(82.89, 54.98);</nobr>
var myBalloon = new DG.Balloons.Common({ 
    geoPoint: position,
    contentHtml: 'Привет!'
});
map.balloons.add(myBalloon);</code></pre>
            </td>
            <td>
<pre><code>DG.popup()
.setLatLng([54.98, 82.89])
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
            <td><a href="/doc/maps/1.0/manual/controls/#toc-intro">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/controls#описание">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>var myControl = new MyControl();
var positionOffset = new DG.Point(0, 0);
var position = new DG.ControlPosition(DG.ControlPosition.TOP_RIGHT, positionOffset);
map.controls.add(myControl, null, position);</code></pre>
            </td>
            <td>
<pre><code><nobr>DG.control({ position: 'topright' })</nobr>
.addTo(map)</code></pre>
            </td>
        </tr>
    </tbody>
</table>


### Подписка на события

<table>
    <thead>
        <tr>
            <td><a href="/doc/maps/1.0/manual/events/#toc-intro">Версия 1.0</a></td>
            <td><a href="/doc/maps/manual/events#описание">Версия 2.0</a></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code><nobr>var callback = function(e) {</nobr>
    console.log(e.getPoint());
};
map.addEventListener(map.getContainerId(), 'DgClick', callback);</code></pre>
            </td>
            <td>
<pre><code><nobr>map.on('click', function(e) {</nobr>
    console.log(e.latlng);
});</code></pre>
            </td>
        </tr>
    </tbody>
</table>
