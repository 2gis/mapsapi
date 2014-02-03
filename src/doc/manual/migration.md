hint
подписаться на событие(click)
запрос к АПИ


## Руководство по переходу на API 2.0

{toc}

### Подключение API

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <pre><code>&lt;html&gt;
    &lt;head&gt;
        &lt;script src="http://maps.api.2gis.ru/1.0" &gt;&lt;/script&gt;
        &lt;script&gt;
            DG.autoload(function() {
                ...
            });
        &lt;/script&gt;
    &lt;/head&gt;
    ...
&lt;/html&gt;
                </code></pre>
            </td>
            <td>
                <pre><code>&lt;html&gt;
    &lt;head&gt;
        &lt;script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id="dgLoader"&gt;&lt;/script&gt;
        &lt;script&gt;
            DG.then(function() {
                ...
            });
        &lt;/script&gt;
    &lt;/head&gt;
    ...
&lt;/html&gt;
                </code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Создание карты

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>DG.autoload(function() {
    var myMap = new DG.Map('myMapId');
    myMap.setCenter(new DG.GeoPoint(82.89,55.98), 15);
    myMap.controls.add(new DG.Controls.Zoom());
});
</code></pre>
            </td>
            <td><pre><code>var map;
DG.then(function () {
    map = DG.map('map', {
        "center": [54.98, 82.89],
        "zoom": 13
    });
    DG.marker([54.98, 82.89]).addTo(map).bindPopup('Вы кликнули по мне!');
});
                    </code>
                </pre>
            </pre>
            </td>
        </tr>
    </tbody>
</table>

### Работа с маркерами

#### Добавление маркера

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>// Создаем маркер в Новосибирске с картинкой по умолчанию:
var marker = new DG.Markers.Common({geoPoint: new DG.GeoPoint(82.89,54.98) });
// Добавим маркер на карту:
myMap.markers.add(marker);
</code></pre>
            </td>
            <td><pre><code>DG.marker([54.98, 82.89]).addTo(map);
                    </code>
                </pre>
            </td>
        </tr>
    </tbody>
</table>

#### Добавление кастомного маркера

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>// Создаем маркер
var marker = new DG.Markers.Common({geoPoint: new DG.GeoPoint(82.89,54.98),
    // Путь к кастомной иконке
    icon: new DG.Icon('sample.png',
    // Размер иконки
    new DG.Size(30,30))
});

// Добавим маркер на карту:
myMap.markers.add(marker);
</code></pre>
            </td>
            <td>
<pre><code>// конфигурирование иконки маркера
var myIcon = DG.icon({
    iconUrl: 'my-icon.png',
    iconRetinaUrl: 'my-icon@2x.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowRetinaUrl: 'my-icon-shadow@2x.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

// Создание маркера и добавление его на карту
DG.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Группирование

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>// Создаем группу
myMap.markers.createGroup("myGroup");
// Добавляем в группу маркера
myMap.markers.add(marker1,"myGroup");
myMap.markers.add(marker2,"myGroup");
</code></pre>
            </td>
            <td>
<pre><code>DG.layerGroup([marker1, marker2])
    .addLayer(polyline)
    .addTo(map);
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Маркер с балуном

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>var markerWithBaloon = new DG.Markers.MarkerWithBalloon({
    // Местоположение маркера:
    geoPoint: new DG.GeoPoint(82.89, 54.98)
});
myMap.markers.add(markerWithBaloon);
</code></pre>
            </td>
            <td>
<pre><code>DG.marker([54.98, 82.89]).addTo(map).bindPopup('sample text');
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Добавление балуна

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>// Создаем балун в Новосибирске с текстом приветствия: 
var myBalloon = new DG.Balloons.Common({ 
    // Местоположение, на которое указывает балун: 
    geoPoint: new DG.GeoPoint(82.89, 54.98),
    // Текст внутри балуна: 
    contentHtml: 'Привет!<br/>Хорошего настроения :)'
 }); 
</code></pre>
            </td>
            <td>
<pre><code>var popup = DG.popup()
    .setLatLng([54.98, 82.89])
    .setContent('<p>Привет!<br />Я балун.</p>');
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Работа с элементами управления

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>// Добавляем элемент управления коэффициентом масштабирования:
var zoomControl = new DG.Controls.Zoom();
myMap.controls.add(zoomControl);
// Добавляем элемент управления коэффициентом масштабирования:
myMap.controls.remove(zoomControl);
</code></pre>
            </td>
            <td>
<pre><code>DG.control.location().addTo(map);
DG.control.ruler().addTo(map);
DG.control.location().removeFrom(map);
DG.control.ruler().removeFrom(map);
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

