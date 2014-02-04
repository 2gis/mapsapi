## Руководство по переходу на API 2.0

{toc}

Документ содержит примеры кода для выполнения основных операций с первой версией АПИ в сравнении со второй.

### Подключение API

Работа с картой возможна только после того, как в браузер будет загружен код API карт. Есть несколько способов его загрузки. В примере демонстрируем простой способ.

#### Простой спобоб

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>&lt;script type=&quot;text/javascript&quot; src="http://maps.api.2gis.ru/1.0" &gt;&lt;/script&gt;

// Создаем обработчик загрузки страницы:
DG.autoload(function() {
    // Инициализация карты
    ...
});</code></pre>
            </td>
            <td>
<pre><code>&lt;script src=&quot;http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id=&quot;dgLoader&quot;&gt;&lt;/script&gt;

//Атрибут data-id="dgLoader" обязательный.
DG.then(function() {
    // Инициализация карты
    ...
});</code></pre>
            </td>
        </tr>
    </tbody>
</table>

#### Загрузка по требованию

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>&lt;script type=&quot;text/javascript&quot; src="http://maps.api.2gis.ru/1.0" &gt;&lt;/script&gt;

//Затем в нужный момент времени (например, при нажатии на кнопку)
$(DG.load(function(){
    // Инициализация карты
    ...
}));</code></pre>
            </td>
            <td>
<pre><code>&lt;script src=&quot;http://maps.api.2gis.ru/2.0/loader.js?pkg=full" data-id=&quot;dgLoader&quot;&gt;&lt;/script&gt;

//Теперь карта доступна в любой момент через функцию DG.then:
DG.then(function() {
    // Инициализация карты
    ...
});</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Инициализация карты

Для отображения созданной карты необходимо выполнять следующие действия:

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>DG.autoload(function() {
    var myMap = new DG.Map('myMapId');
    myMap.setCenter(new DG.GeoPoint(82.89,55.98), 13);
});

// Дальше карту можно рендерить.
&lt;div id=&quot;myMapId&quot; style=&quot;width:500px; height:400px&quot;&gt;&lt;/div&gt;
</code></pre>
            </td>
            <td>
<pre><code>var map;
DG.then(function () {
    map = DG.map('map', {
        "center": [54.98, 82.89],
        "zoom": 13
    });
});

&lt;div id=&quot;map&quot; style=&quot;width:500px; height:400px&quot;&gt;&lt;/div&gt;</code></pre>
            </pre>
            </td>
        </tr>
    </tbody>
</table>

### Работа с маркерами

Маркер представляет собой маленькую картинку, которая связана с определенным местом на карте. Создание и отображение маркера на карте:

#### Добавление обычного маркера

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>// Создаем маркер:
var marker = new DG.Markers.Common({geoPoint: new DG.GeoPoint(82.89,54.98) });
// Добавим маркер на карту:
myMap.markers.add(marker);
</code></pre>
            </td>
            <td>
<pre><code>// Создаем и сразу добавляем на карту:
DG.marker([54.98, 82.89]).addTo(map);
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
    //картинка маркера
    iconUrl: 'my-icon.png',
    //картинка для широкоформатных экранов
    iconRetinaUrl: 'my-icon@2x.png',
    //раземр иконки
    iconSize: [38, 95],
    //Координаты "ножки" иконки
    iconAnchor: [22, 94],
    //координаты открытия балуна
    popupAnchor: [-3, -76],
    //картнинка тени маркера
    shadowUrl: 'my-icon-shadow.png',
    //картинка тени для широкоформатных
    shadowRetinaUrl: 'my-icon-shadow@2x.png',
    //размер тени
    shadowSize: [68, 95],
    //координаты тени
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

Группирование даёт возможность производить операции сразу над несколькими объектами. Пример и использования для маркеров:

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
<pre><code>//Добавляем маркера двумя способами
DG.layerGroup([marker1, marker2])
    .addLayer(marker3)
    .addTo(map);
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Маркер с балуном

Создадим маркер с балуном, наполним текстом:

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>// Создаем маркер с балуном
var markerWithBaloon = new DG.Markers.MarkerWithBalloon({
    // Местоположение маркера:
    geoPoint: new DG.GeoPoint(82.89, 54.98),
    // Наполняем текстом
    balloonOptions: {
        contentHtml: 'Теперь я бабочка!'
    }
});
// Добавляем на карту
myMap.markers.add(markerWithBaloon);
</code></pre>
            </td>
            <td>
<pre><code>DG.marker([54.98, 82.89]).addTo(map).bindPopup('Теперь я бабочка!');
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Добавление балуна

Балун — это всплывающее окно, в котором можно отобразить произвольный HTML-код. Балун связан с определенным местом на карте.

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>// Создаем балун: 
var myBalloon = new DG.Balloons.Common({ 
    // Местоположение балуна: 
    geoPoint: new DG.GeoPoint(82.89, 54.98),
    // Текст балуна: 
    contentHtml: '<p>Привет!<br />Хорошего настроения :)</p>'
 }); 
</code></pre>
            </td>
            <td>
<pre><code>var popup = DG.popup()
    .setLatLng([54.98, 82.89])
    .setContent('<p>Привет!<br />Хорошего настроения :)</p>');
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

### Работа с элементами управления

Элементы управления — это компоненты пользовательского интерфейса, с помощью которых пользователь может взаимодействовать с картой.

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
<pre><code>// Добавим элемент определения геолокации
DG.control.location().addTo(map);
// Добавим элемент включения линейки
DG.control.ruler().addTo(map);
// А теперь их удалим
DG.control.location().removeFrom(map);
DG.control.ruler().removeFrom(map);
</code></pre>
            </td>
        </tr>
    </tbody>
</table>


### События

Для демонстрации напишем обработчик события мыши click для первого и второго АПИ: 

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>// Хранилище observer-ов:
var observers = [];

// Создаем обработчик
var firstCallback = function(evt){
    alert('Текущуя позиция: ' + evt.getPoint());
};

//Вешаем обработчик на click
observers[0] = myMap.addEventListener(myMap.getContainerId(), 'DgClick', firstCallback);
</code></pre>
            </td>
            <td>
<pre><code>map.on('click', function(e) {
    alert('Текущуя позиция: ' + e.latlng);
});
</code></pre>
            </td>
        </tr>
    </tbody>
</table>

###  Использование геокодера

В картографическое API встроена возможность геокодирования, с помощью которой можно выполнять поиск городов, населённых пунктов, районов, улиц, жилмассивов, домов и других геообъектов по названию или координатам. Дальше сравним ипользование в первом и втором АПИ:

<table>
    <thead>
        <tr><td><a href="">Версия 1.0</a></td><td><a href="">Версия 2.0</a></td></tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre><code>DG.Geocoder.get('Пиво', {
    limit: 100,
    success: function(response) {
        for (var i = 0; i < response.length; i++) {
            console.log('Ищи пиво тут: ' + response[i]._name);
        }
    },
    failure: function (code, message) {
        alert(code + ' ' + message);
    }
});
</code></pre>
            </td>
            <td>
<pre><code>var promise = DG.ajax('http://catalog.api.2gis.ru/2.0/search', {
    type: 'get',
    data: {
        key: '1',
        type: 'geo',
        what: 'Пиво',
        page: 1
    },
    success: function(data) {
        for (var i = 0; i < data.result.data.length; i++) {
            console.log('Ищи пиво тут: ' + data.result.data[i].name);
        };
    },
    error: function(error) {
        console.log('error', error);
    },
    progress: function() {
        console.log('beforeSend');
    }
});
</code></pre>
            </td>
        </tr>
    </tbody>
</table>


