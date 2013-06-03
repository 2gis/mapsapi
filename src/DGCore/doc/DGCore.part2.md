## L.LatLng

Географическая точка с определенной широтой и долготой.

    var latlng = new L.LatLng(50.5, 30.5);

Все методы, которые принимают объекты LatLng также принимают широту и долготу в виде простого массива, то есть данные записи эквивалентны:

    map.panTo([50, 30]);
    map.panTo(L.latLng(50, 30));

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>
            <code><b>L.LatLng</b>(
            &lt;Number&gt; <i>latitude</i>,
            &lt;Number&gt; <i>longitude</i> )</code>
        </td>
        <td>
            <code>L.latLng(…)</code>
            <code>L.latLng([…]</code>
        </td>
        <td>Создает объект, представляющий географическую точку с определенной широтой и долготой.</td>
    </tr>
</table>

### Свойства

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>lat</b></code></td>
        <td><code>Number</code></td>
        <td>Широта в градусах.</td>
    </tr>
    <tr>
        <td><code><b>lng</b></code></td>
        <td><code>Number</code></td>
        <td>Долгота в градусах.</td>
    </tr>
</table>

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>distanceTo</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>otherLatlng</i> )</nobr>
        </code></td>

        <td><code>Number</code></td>
        <td>Возвращает расстояние (в метрах) до данной широты и долготы, рассчитывается по формуле Haversine. См. <a href="http://en.wikipedia.org/wiki/Haversine_formula">описание в wikipedia</a></td>
    </tr>
    <tr>
        <td><code><b>equals</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>otherLatlng</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если данная широта и долгота находится в той же позиции (с небольшой погрешностью).</td>
    </tr>
    <tr>
        <td><code><b>toString</b>()</code></td>
        <td><code>String</code></td>
        <td>Возвращает строковое представление точки (для отладки).</td>
    </tr>
</table>

### Константы

<table>
    <tr>
        <th>Константа</th>
        <th>Тип</th>
        <th>Значение</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>DEG_TO_RAD</b></code></td>
        <td><code>Number</code></td>
        <td><code>Math.PI / 180</code></td>
        <td>Коэффициент для конвертирования градусов в радианы.</td>
    </tr>
    <tr>
        <td><code><b>RAD_TO_DEG</b></code></td>
        <td><code>Number</code></td>
        <td><code>180 / Math.PI</code></td>
        <td>Коэффициент для конвертирования радиан в градусы.</td>
    </tr>
    <tr>
        <td><code><b>MAX_MARGIN</b></code></td>
        <td><code>Number</code></td>
        <td><code>1.0E-9</code></td>
        <td>Максимальная погрешность для проверки равенства.</td>
    </tr>
</table>

## L.LatLngBounds

Прямоугольная географическая область на карте.

    var southWest = L.latLng(40.712, -74.227),
        northEast = L.latLng(40.774, -74.125),
        bounds = L.latLngBounds(southWest, northEast);

Все методы, которые принимают объекты LatLngBounds также принимают их в виде простого массива, то есть границы могут быть указаны как в этом примере:

    map.fitBounds([
        [40.712, -74.227],
        [40.774, -74.125]
    ]);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>
            <code><b>L.LatLngBounds</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>southWest</i></nobr>,
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>northEast</i></nobr> )</code>
        </td>

        <td>
            <code>L.latLngBounds(&hellip;)</code><br />
            <code>L.latLngBounds([&hellip;])</code>
        </td>

        <td>Создает объект LatLngBounds с определенными юго-западным и северо-восточным углами прямоугольника.</td>
    </tr>
    <tr>
        <td><code><b>L.LatLngBounds</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>[]&gt; <i>latlng</i> )</nobr>
        </code></td>
        <td>
            <code>L.latLngBounds(&hellip;)</code>
        </td>
        <td>Создает объект LatLngBounds на основе географических точек, которые находятся внутри. Удобно использовать, если необходимо подстроить центр и масштаб карты с помощью метода <a href="#map-fitbounds">fitBounds</a>.</td>
    </tr>
</table>

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>extend</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>|<a href="#latlngbounds">LatLngBounds</a>&gt; <i>latlng</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Расширяет границы таким образом, чтобы в них входила переданная точка или другие границы.</td>
    </tr>
    <tr>
        <td><code><b>getSouthWest</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает юго-западную точку границ.</td>
    </tr>
    <tr>
        <td><code><b>getNorthEast</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает северо-восточную точку границ.</td>
    </tr>
    <tr>
        <td><code><b>getNorthWest</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает северо-западную точку границ.</td>
    </tr>
    <tr>
        <td><code><b>getSouthEast</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает юго-восточную точку границ.</td>
    </tr>
    <tr>
        <td><code><b>getWest</b>()</code></td>
        <td><code>Number</code></td>
        <td>Возвращает западную долготу границ.</td>
    </tr>
    <tr>
        <td><code><b>getSouth</b>()</code></td>
        <td><code>Number</code></td>
        <td>Возвращает южную широту границ.</td>
    </tr>
    <tr>
        <td><code><b>getEast</b>()</code></td>
        <td><code>Number</code></td>
        <td>Возвращает восточную долготу границ.</td>
    </tr>
    <tr>
        <td><code><b>getNorth</b>()</code></td>
        <td><code>Number</code></td>
        <td>Возвращает северную широту границ.</td>
    </tr>
    <tr>
        <td><code><b>getCenter</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает центральную точку прямоугольной области.</td>
    </tr>
    <tr>
        <td><code><b>contains</b>(
            <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если текущий прямоугольник содержит внутри себя переданный прямоугольник.</td>
    </tr>
    <tr>
        <td><code><b>contains</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если прямоугольник содержит внутри себя переданную точку.</td>
    </tr>
    <tr>
        <td><code><b>intersects</b>(
            <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если текущий прямоугольник пересекается с переданным прямоугольником.</td>
    </tr>
    <tr>
        <td><code><b>equals</b>(
            <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если текущий прямоугольник эквивалентен (с небольшой погрешностью) переданному прямоугольнику.</td>
    </tr>
    <tr>
        <td><code><b>toBBoxString</b>()</code></td>
        <td><code>String</code></td>
        <td>
Возвращает строку с координатами границ в формате <code>'southwest_lng,southwest_lat,northeast_lng,northeast_lat'</code>. Удобно использовать для отправки запросов к веб-сервисам, возвращающим геоданные.</td>
    </tr>
    <tr>
        <td><code><b>pad</b>(
            <nobr>&lt;Number&gt; <i>bufferRatio</i> )</nobr>
        </code></td>
        <td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
        <td>Возвращает большие границы, созданные путем расширения текущих границ на заданный процент в каждом направлении.</td>
    </tr>
    <tr>
        <td><code><b>isValid</b>()</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если если свойства границ инициализированы.</td>
    </tr>
</table>

## L.Point

Точка с пиксельными координатами x и y.

    var point = new L.Point(200, 300);

Все методы, которые принимают объекты Point также принимают координаты в виде простого массива, то есть данные записи эквивалентны:

    map.panBy([200, 300]);
    map.panBy(L.point(200, 300));

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Point</b>(
            <nobr>&lt;Number&gt; <i>x</i>, &lt;Number&gt; <i>y</i></nobr>,
            <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
        </code></td>

        <td>
            <code>L.point(&hellip;)</code><br />
            <code>L.point([&hellip;])</code>
        </td>

        <td>Создает объект Point с координатами <code>x</code> и <code>y</code>. Если опциональный параметр <code>round</code> передан со значением <code>true</code>, тогда координаты будут округлены.</td>
    </tr>
</table>


### Свойства

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>x</b></code></td>
        <td><code>Number</code></td>
        <td>Координата x.</td>
    </tr>
    <tr>
        <td><code><b>y</b></code></td>
        <td><code>Number</code></td>
        <td>Координата y.</td>
    </tr>
</table>

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>add</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>otherPoint</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает результат сложения текущей и переданной точек.</td>
    </tr>
    <tr>
        <td><code><b>subtract</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>otherPoint</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает результат вычитания переданной точки из текущей.</td>
    </tr>
    <tr>
        <td><code><b>multiplyBy</b>(
            <nobr>&lt;Number&gt; <i>number</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает результат умножения текущей точки на переданное число.</td>
    </tr>
    <tr>
        <td><code><b>divideBy</b>(
            <nobr>&lt;Number&gt; <i>number</i></nobr>,
            <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает результат деления текущей точки на переданное число. Если опциональный параметр <code>round</code> передан со значением <code>true</code>, тогда результат будет округлен.</td>
    </tr>
    <tr>
        <td><code><b>distanceTo</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>otherPoint</i> )</nobr>
        </code></td>

        <td><code>Number</code></td>
        <td>Возвращает расстояние между текущей и переданной точками.</td>
    </tr>
    <tr>
        <td><code><b>clone</b>()</code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает копию текущей точки.</td>
    </tr>
    <tr>
        <td><code><b>round</b>()</code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает копию текущей точки с округленными координатами.</td>
    </tr>
    <tr>
        <td><code><b>equals</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>otherPoint</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если переданная точка имеет такие же координаты, как и текущая.</td>
    </tr>
    <tr>
        <td><code><b>toString</b>()</code></td>
        <td><code>String</code></td>
        <td>Возвращает строковое представление точки (для отладки).</td>
    </tr>
</table>

## L.Bounds

Ппрямоугольная область на карте в пиксельных координатах.

    var p1 = L.point(10, 10),
        p2 = L.point(40, 60),
        bounds = L.bounds(p1, p2);

Все методы, которые принимают объекты Bounds также принимают их в виде простого массива, то есть границы могут быть указаны как в этом примере:

    otherBounds.intersects([[10, 10], [40, 60]]);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Bounds</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>topLeft</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>bottomRight</i> )</nobr>
        </code></td>

        <td>
            <code>L.bounds(&hellip;)</code><br />
            <code>L.bounds([&hellip;])</code>
        </td>

        <td>Создает объект Bounds на основе левого верхнего и правого нижнего углов.</td>
    </tr>
    <tr>
        <td><code><b>L.Bounds</b>(
            <nobr>&lt;<a href="#point">Point</a>[]&gt; <i>points</i> )</nobr>
        </code></td>

        <td>
            <code>L.bounds(&hellip;)</code>
        </td>

        <td>Создает объект Bounds на основе точек, которые будут в него входить.</td>
    </tr>
</table>

### Свойства

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>min</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Левый верхний угол прямоугольника.</td>
    </tr>
    <tr>
        <td><code><b>max</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Правый нижний угол прямоугольника.</td>
    </tr>
</table>

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>extend</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Расширяет границы таким образом, чтобы в них входила переданная точка.</td>
    </tr>
    <tr>
        <td><code><b>getCenter</b>()</code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает центральную точку прямоугольной области.</td>
    </tr>
    <tr>
        <td><code><b>contains</b>(
            <nobr>&lt;<a href="#bounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если текущий прямоугольник содержит внутри себя переданный прямоугольник.</td>
    </tr>
    <tr>
        <td><code><b>contains</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если прямоугольник содержит внутри себя переданную точку.</td>
    </tr>
    <tr>
        <td><code><b>intersects</b>(
            <nobr>&lt;<a href="#bounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если текущий прямоугольник пересекается с переданным прямоугольником.</td>
    </tr>
    <tr>
        <td><code><b>isValid</b>()</code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если если свойства границ инициализированы.</td>
    </tr>
    <tr>
        <td><code><b>getSize</b>()</code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает размер прямоугольника.</td>
    </tr>
</table>

## L.Icon

Иконка маркера.

    var myIcon = L.icon({
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

    L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Icon</b>(
            <nobr>&lt;<a href="#icon-options">Icon options</a>&gt; <i>options</i> )</nobr>
        </code></td>

        <td>
            <code>L.icon(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает объект иконки с переданными опциями.</td>
    </tr>
</table>

### Опции

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>iconUrl</b></code></td>
        <td><code>String</code>
        <td>(обязательная) URL к изображению иконки (абсолютный или относительный).</td>
    </tr>
    <tr>
        <td><code><b>iconRetinaUrl</b></code></td>
        <td><code>String</code>
        <td>URL к изображению иконки для устройств с Retina экраном (абсолютный или относительный).</td>
    </tr>
    <tr>
        <td><code><b>iconSize</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Размер изображения иконки в пикселях.</td>
    </tr>
    <tr>
        <td><code><b>iconAnchor</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Координаты "ножки" иконки (относительно ее левого верхнего угла).
            Иконка будет установлена ​​так, чтобы эта точка соответствовала в географическому положению маркера. По умолчанию "ножка" располагается по центру иконки.</td>
    </tr>
    <tr>
        <td><code><b>shadowUrl</b></code></td>
        <td><code>String</code>
        <td>URL к изображению тени иконки. Если не указан, тогда тень будет отсутствовать.</td>
    </tr>
    <tr>
        <td><code><b>shadowRetinaUrl</b></code></td>
        <td><code>String</code>
        <td>URL к изображению тени иконки для устройств с Retina экраном. Если не указан, тогда тень будет отсутствовать.</td>
    </tr>
    <tr>
        <td><code><b>shadowSize</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Размер изображения тени в пикселях.</td>
    </tr>
    <tr>
        <td><code><b>shadowAnchor</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Координаты "ножки" тени (относительно ее левого верхнего угла). Значение по умолчанию такое же, как у <code>iconAnchor</code>.</td>
    </tr>
    <tr>
        <td><code><b>popupAnchor</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Координаты точки, из которой будет открываться балун (относительно <code>iconAnchor</code>).</td>
    </tr>
    <tr>
        <td><code><b>className</b></code></td>
        <td><code>String</code>
        <td>Значение класса, которое будет присвоено изображениям иконки и тени. По умолчанию пустое.</td>
    </tr>
</table>

## L.DivIcon

Простая иконка для маркеров, которые используют простой элемент `div` вместо изображения.

    var myIcon = L.divIcon({className: 'my-div-icon'});
    // вы можете установить стиль класса .my-div-icon в CSS

    L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

По умолчанию установлен класс `'leaflet-div-icon'`, который стилизирован как маленький белый квадрат с тенью. 

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.DivIcon</b>(
            <nobr>&lt;<a href="#divicon-options">DivIcon options</a>&gt; <i>options</i> )</nobr>
        </code></td>

        <td>
            <code>L.divIcon(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает объект <code>L.DivIcon</code> с переданными опциями.</td>
    </tr>
</table>

### Опции

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>iconSize</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Размер иконки в пикселях. Также может быть установлен с помощью CSS.</td>
    </tr>
    <tr>
        <td><code><b>iconAnchor</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Координаты "ножки" иконки (относительно ее левого верхнего угла). Иконка будет установлена ​​так, чтобы эта точка соответствовала в географическому положению маркера. По умолчанию "ножка" располагается по центру иконки, если указан ее размер.</td>
    </tr>
    <tr>
        <td><code><b>className</b></code></td>
        <td><code>String</code>
        <td>Значение класса, которое будет присвоено иконке. По умолчанию <code>'leaflet-div-icon'</code>.
    </tr>
    <tr>
        <td><code><b>html</b></code></td>
        <td><code>String</code>
        <td>HTML код, который будет установлен как содержимое иконки. По умолчанию пустой.</td>
    </tr>
</table>

## L.Control

Базовый класс для всех элементов управления. Реализует интерфейс [IControl][53]. Элементы на карту добавляются следующим образом:

    control.addTo(map);
    // то же самое, что
    map.addControl(control);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Control</b>(
            <nobr>&lt;<a href="#control-options">Control options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td>
            <code>L.control(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает элемент управления с переданными опциями.</td>
    </tr>
</table>

### Опции

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>position</b></code></td>
        <td><code>String</code></td>
        <td><code>'topright'</td>
        <td>Расположение элемента управления (один из углов карты). См. <a href="#control-positions">позиции элементов управления</a>.</td>
    </tr>
</table>

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>setPosition</b>(
            <nobr>&lt;String&gt; <i>position</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Устанавливает позицию элемента управления См. <a href="#control-positions">позиции элементов управления</a>.</td>
    </tr>
    <tr>
        <td><code><b>getPosition</b>()</code></td>
        <td><code>String</code></td>
        <td>Возвращает текущую позицию элемента управления.</td>
    </tr>
    <tr>
        <td><code><b>addTo</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Добавляет элемент управления на карту.</td>
    </tr>
    <tr>
        <td><code><b>removeFrom</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Удаляет элемент управления с карты.</td>
    </tr>
</table>

### Позиции элементов управления

Позиции элементов управления (углы карты, в которых располагаются элементы) устанавливаются с помощью строк. Отступы между границами карты и элементами управления можно установить с помощью CSS.

<table>
    <tr>
        <th>Позиция</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code>'topleft'</code></td>
        <td>Верхний левый угол карты.</td>
    </tr>
    <tr>
        <td><code>'topright'</code></td>
        <td>Верхний правый угол карты.</td>
    </tr>
    <tr>
        <td><code>'bottomleft'</code></td>
        <td>Нижний левый угол карты.</td>
    </tr>
    <tr>
        <td><code>'bottomright'</code></td>
        <td>Нижний правый угол карты.</td>
    </tr>
</table>

## L.Control.Attribution

Позволяет показать атрибутику в небольшом текстовом контейнере на карте. Расширяет [Control][34].

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Control.Attribution</b>(
            <nobr>&lt;<a href="#control-attribution-options">Control.Attribution options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td>
            <code>L.control.attribution(&hellip;)</code>
        </td>

        <td>Создает элемент атрибутики.</td>
    </tr>
</table>

### Опции

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>position</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">'bottomright'</span></td>
        <td>Расположение элемента управления (один из углов карты). См. <a href="#control-positions">позиции элементов управления</a>.</td>
    </tr>
    <tr>
        <td><code><b>prefix</b></code></td>
        <td><code>String</code></td>
        <td><code>'Leaflet'</td>
        <td>Текст, который будет показан перед атрибутикой. Для отключения необходимо указать <code>false</code>.</td>
    </tr>
</table>

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>setPrefix</b>(
            <nobr>&lt;String&gt; <i>prefix</i> )</nobr>
        </code></td>
        <td><code>this</code></td>
        <td>Устанавливает текст перед атрибутикой.</td>
    </tr>
    <tr>
        <td><code><b>addAttribution</b>(
            <nobr>&lt;String&gt; <i>text</i> )</nobr>
        </code></td>
        <td><code>this</code></td>
        <td>Добавляет текст атрибутики (например, <code>'Картографические данные &amp;copy; 2GIS'</code>).</td>
    </tr>
    <tr>
        <td><code><b>removeAttribution</b>(
            <nobr>&lt;String&gt; <i>text</i> )</nobr>
        </code></td>
        <td><code>this</code></td>
        <td>Удаляет текст атрибутики.</td>
    </tr>
</table>

## L.Control.Scale

Показывает масштаб карты в метрической (метры, километры) и английской (мили, футы) системах измерений. Реализует интерфейс [IControl][53].

    L.control.scale().addTo(map);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Control.Scale</b>(
            <nobr>&lt;<a href="#control-scale-options">Control.Scale options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td>
            <code>L.control.scale(&hellip;)</code>
        </td>

        <td>Создает индикатор масштаба с переданными опциями.</td>
    </tr>
</table>

### Опции

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>position</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">'bottomleft'</span></td>
        <td>Расположение элемента управления (один из углов карты). См. <a href="#control-positions">позиции элементов управления</a>.</td>
    </tr>
    <tr>
        <td><code><b>maxWidth</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">100</span></code></td>
        <td>Максимальная ширина элемента в пикселях.</td>
    </tr>
    <tr>
        <td><code><b>metric</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code></td>
        <td>Включает или отключает метрическую систему измерений (метры, километры).</td>
    </tr>
    <tr>
        <td><code><b>imperial</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code></td>
        <td>Включает или отключает английскую систему измерений (мили, футы).</td>
    </tr>
    <tr>
        <td><code><b>updateWhenIdle</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если <code>true</code>, тогда элемент обновляется при событии <code>moveend</code>, иначе всегда будет отображена актуальная информация (обновляется при событии <code>move</code>).</td>
    </tr>
</table>

## Методы событий

Набор методов, позволяющих работать с событиями. События позволяют выполнить какое-либо действие в тот момент, когда что-то происходит с объектом (например, когда пользователь кликает по карте).

### Пример

    map.on('click', function(e) {
        alert(e.latlng);
    });

Управлять событиями можно с помощью ссылок на обработчики, например, если необходимо добавить и затем удалить обработчик, определите его как функцию:

    function onClick(e) { ... }

    map.on('click', onClick);
    map.off('click', onClick);

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>addEventListener</b>(
            <nobr>&lt;String&gt; <i>type</i></nobr>,
            <nobr>&lt;Function&gt; <i>fn</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Подписывает обработчик (<code>fn</code>) на определенный тип события. Опционально вы можете указать контекст обработчика (объект, на который будет указывать <code>this</code>). Также вы можете подписаться на несколько типов событий, указав их через пробел (например, <code>'click dblclick'</code>).</td>
    </tr>
    <tr>
        <td><code><b>addEventListener</b>(
            <nobr>&lt;Object&gt; <i>eventMap</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Подписывает несколько обработчиков на определенные типы событий, например <code>{click: onClick, mousemove: onMouseMove}</code></td>
    </tr>
    <tr>
        <td><code><b>removeEventListener</b>(
            <nobr>&lt;String&gt; <i>type</i></nobr>,
            <nobr>&lt;Function&gt; <i>fn?</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Отписывает ранее подписанный обработчик. Если обработчик не указан, тогда от определенного типа событий будут отписаны все обработчики.</td>
    </tr>
    <tr>
        <td><code><b>removeEventListener</b>(
            <nobr>&lt;Object&gt; <i>eventMap</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Отписывает несколько обработчиков от определенных событий.</code></td>
    </tr>
    <tr>
        <td><code><b>hasEventListeners</b>(
            <nobr>&lt;String&gt; <i>type</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращет <code>true</code>, если у переданного типа события есть подписчики.</td>
    </tr>
    <tr>
        <td><code><b>fireEvent</b>(
            <nobr>&lt;String&gt; <i>type</i></nobr>,
            <nobr>&lt;Object&gt; <i>data?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Инициирует событие определенного типа. Опционально можно передать объект с данными события, тогда этот объект будет передан первым параметром в функцию-обработчик.</td>
    </tr>
    <tr>
        <td><code><b>on</b>( &hellip; )</code></td>
        <td><code>this</code></td>
        <td>Псевдоним <code>addEventListener</code>.</td>
    </tr>
    <tr>
        <td><code><b>off</b>( &hellip; )</code></td>
        <td><code>this</code></td>
        <td>Псевдоним <code>removeEventListener</code>.</td>
    </tr>
    <tr>
        <td><code><b>fire</b>( &hellip; )</code></td>
        <td><code>this</code></td>
        <td>Псевдоним <code>fireEvent</code>.</td>
    </tr>
</table>

## Объекты событий

Каждый объект события &mdash; это объект с данными о событии, передаваемый параметром в функцию-обработчик, подписанную на это событие при возникновении последнего. Например:

    map.on('click', function(e) {
        alert(e.latlng); // e является объектом события (в данном случае MouseEvent)
    });

### Event

Базовый объект события. Все объекты событий содержат такие же свойства, как и этот объект.

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>type</b></code></td>
        <td><code>String</code></td>
        <td>Тип события (например, <code>'click'</code>).</td>
    </tr>
    <tr>
        <td><code><b>target</b></code></td>
        <td><code>Object</code></td>
        <td>Объект, который инициировал событие.</td>
    </tr>
</table>

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>latlng</b></code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Географическая точка, в которой было инициировано событие мышки.</td>
    </tr>
    <tr>
        <td><code><b>layerPoint</b></code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Пиксельные координаты, в которых было инициировано событие мышки, относительно слоя карты.</td>
    </tr>
    <tr>
        <td><code><b>containerPoint</b></code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Пиксельные координаты, в которых было инициировано событие мышки относительно контейнера карты.</td>
    </tr>
    <tr>
        <td><code><b>originalEvent</b></code></td>
        <td><code>DOMMouseEvent</code></td>
        <td>Оригинальное браузерное событие мышки.</td>
    </tr>
</table>

### LocationEvent

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>latlng</b></code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Географическое положение пользователя.</td>
    </tr>
    <tr>
        <td><code><b>bounds</b></code></td>
        <td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
        <td>Географические границы, в которых находится пользователь (в соответствии с точностью местоположения).</td>
    </tr>
    <tr>
        <td><code><b>accuracy</b></code></td>
        <td><code>Number</code></td>
        <td>Точность местоположения в метрах.</td>
    </tr>
</table>

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>message</b></code></td>
        <td><code>String</code></td>
        <td>Сообщение об ошибке.</td>
    </tr>
    <tr>
        <td><code><b>code</b></code></td>
        <td><code>Number</code></td>
        <td>Код ошибки (если имеется).</td>
    </tr>
</table>

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>layer</b></code></td>
        <td><code><a href="#ilayer">ILayer</a></code></td>
        <td>Слой, который был добавлен или удален.</td>
    </tr>
</table>

### TileEvent

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>tile</b></code></td>
        <td><code>HTMLElement</code></td>
        <td>Элемент тайла (изображение).</td>
    </tr>
    <tr>
        <td><code><b>url</b></code></td>
        <td><code>String</code></td>
        <td>URL тайла.</td>
    </tr>
</table>

### GeoJSON event

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>layer</b></code></td>
        <td><code><a href="#ilayer">ILayer</a></code></td>
        <td>Слой GeoJSON объекта добавленного на карту.</td>
    </tr>
    <tr>
        <td><code><b>properties</b></code></td>
        <td><code>Object</code></td>
        <td>Свойства GeoJSON объекта.</td>
    </tr>
    <tr>
        <td><code><b>geometryType</b></code></td>
        <td><code>String</code></td>
        <td>Тип геометрии GeoJSON объекта.</td>
    </tr>
    <tr>
        <td><code><b>id</b></code></td>
        <td><code>String</code></td>
        <td>GeoJSON ID объекта (если имеется).</td>
    </tr>
</table>

### Popup event

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>popup</b></code></td>
        <td><code><a href="#popup">Popup</a></code></td>
        <td>Балун, который был открыт или закрыт.</td>
    </tr>
</table>

## L.Class

`L.Class` предоставляет возможность использовать ООП подход в разработке функционала API, используется для реализации большинства классов из данной документации.

Кроме реализации простой классической модели наследования имеются несколько свойств для удобной организации кода, такие как `options`, `includes` и `statics`.

    var MyClass = L.Class.extend({
        initialize: function (greeter) {
            this.greeter = greeter;
            // конструктор класса
        },

        greet: function (name) {
            alert(this.greeter + ', ' + name)
        }
    });

    // создает объект класса MyClass и передает "Hello" в конструктор
    var a = new MyClass("Hello");

    // вызывает метод greet, который показывает всплывающее окно с текстом "Hello, World"
    a.greet("World");


### Наследование

Для определения новых классов используется конструкция `L.Class.extend`, также метод `extend` можно использовать в любом классе, который наследуется от `L.Class`:

    var MyChildClass = MyClass.extend({
        // ... новые свойства и методы
    });

Данный код создаст класс, который наследует все методы и свойства родительского класса (через цепочку прототипов), также возможно добавление или переопределение родительских методов и свойств. Кроме того, корректно обрабатывается оператор `instanceof`:

    var a = new MyChildClass();
    a instanceof MyChildClass; // true
    a instanceof MyClass; // true

Вы можете вызывать родительские методы (включая конструктор) из потомков (так, как вы бы делали это с помощью вызова `super` в других языках программирования) с помощью JavaScript функций `call` или `apply`:

    var MyChildClass = MyClass.extend({
        initialize: function () {
            MyClass.prototype.initialize.call("Yo");
        },

        greet: function (name) {
            MyClass.prototype.greet.call(this, 'bro ' + name + '!');
        }
    });

    var a = new MyChildClass();
    a.greet('Jason'); // выведет "Yo, bro Jason!"

### Опции

`options` &mdash; это специальное свойство, которое в отличии от других объектов передаваемых через `extend` будет слито с аналогичным свойством родителея, вместо полного переопределения, это позволяет управлять конфигурацией объектов и значениями по умолчанию:

    var MyClass = L.Class.extend({
        options: {
            myOption1: 'foo',
            myOption2: 'bar'
        }
    });

    var MyChildClass = L.Class.extend({
        options: {
            myOption1: 'baz',
            myOption3: 5
        }
    });

    var a = new MyChildClass();
    a.options.myOption1; // 'baz'
    a.options.myOption2; // 'bar'
    a.options.myOption3; // 5

Также имеется метод `L.Util.setOptions`, который позволяет сливать опции переданные в конструктор с изначально заданными опциями:

    var MyClass = L.Class.extend({
        options: {
            foo: 'bar',
            bla: 5
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
            ...
        }
    });

    var a = new MyClass({bla: 10});
    a.options; // {foo: 'bar', bla: 10}

### Включения

`includes` &mdash; это специальное свойство, которое подмешивает объекты в класс (такие объекты называются mixin-ами). Хорошим примером является `L.Mixin.Events`, который подмешивает [методы событий][39], такие как `on`, `off` и `fire` в класс.

     var MyMixin = {
        foo: function () { ... },
        bar: 5
    };

    var MyClass = L.Class.extend({
        includes: MyMixin
    });

    var a = new MyClass();
    a.foo();

Также вы можете подмешивать объекты в процессе выполнения программы с помощью метода `include`:

    **MyClass.include**(MyMixin);

### Статика

`statics` &mdash; это свойство, в котором описываются статические элементы класса, удобно использовать для определения констант:

    var MyClass = L.Class.extend({
        statics: {
            FOO: 'bar',
            BLA: 5
        }
    });

    MyClass.FOO; // 'bar'

### Фабрики классов

Для создания новых объектов классов используются фабричные методы, которые имеют такое же название, как и у класса, но начинаются с нижнего регистра. Это аналог ключевого слова `new`, то есть, данные строки кода эквивалентны:

    new L.Map('map');
    L.map('map');

Реализовать фабричный метод в ваших собственных классах довольно просто, например:

    L.map = function (id, options) {
        return new L.Map(id, options);
    };

### Хуки конструктора

Если вы разработчик плагинов, тогда велика вероятность, что вам понадобится выполнить дополнительные действия при инициализациии объектов существующих классов (например, при инициализации объекта `L.Polyline`). Для подобного рода задач имеется метод `addInitHook`:

    MyClass.addInitHook(function () {
        // ... выполнить дополнительные действия при вызове конструктора
        // например, добавить обработчики событий, установить значения свойств и т.п.
    });

Также можно использовать сокращенную запись, если необходимо вызвать лишь один метод при инициализации:

    MyClass.addInitHook('methodName', arg1, arg2, …);

## L.Browser

A namespace with properties for browser/feature detection used by Leaflet internally.

    if (L.Browser.ie6) {
        alert('Upgrade your browser, dude!');
    }

property
type
description

`**ie**`
`Boolean`
`true` for all Internet Explorer versions.

`**ie6**`
`Boolean`
`true` for Internet Explorer 6\.

`**ie7**`
`Boolean`
`true` for Internet Explorer 7\.

`**webkit**`
`Boolean`
`true` for webkit-based browsers like Chrome and Safari (including mobile versions).

`**webkit3d**`
`Boolean`
`true` for webkit-based browsers that support CSS 3D transformations.

`**android**`
`Boolean`
`true` for Android mobile browser.

`**android23**`
`Boolean`
`true` for old Android stock browsers (2 and 3).

`**mobile**`
`Boolean`
`true` for modern mobile browsers (including iOS Safari and different Android browsers).

`**mobileWebkit**`
`Boolean`
`true` for mobile webkit-based browsers.

`**mobileOpera**`
`Boolean`
`true` for mobile Opera.

`**touch**`
`Boolean`
`true` for all browsers on touch devices.

`**msTouch**`
`Boolean`
`true` for browsers with Microsoft touch model (e.g. IE10).

`**retina**`
`Boolean`
`true` for devices with Retina screens.

## L.Util

Various utility functions, used by Leaflet internally.

### Methods
Method
Returns
Description

`**extend**(
            <Object> _dest_,
            <Object> _src?.._ )
`
`Object`
Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter. Has an `L.extend` shortcut.

`**bind**(
            <Function> _fn_,
            <Object> _obj_ )
`
`Function`
Returns a function which executes function `fn` with the given scope `obj` (so that `this` keyword refers to `obj` inside the function code). Has an `L.bind` shortcut.

`**stamp**( <Object> _obj_ )`
`String`
Applies a unique key to the object and returns that key. Has an `L.stamp` shortcut.

`**limitExecByInterval**(
            <Function> _fn_,
            <Number> _time_,
            <Object> _context?_ )
`
`Function`
Returns a wrapper around the function `fn` that makes sure it's called not more often than a certain time interval `time`, but as fast as possible otherwise (for example, it is used for checking and requesting new tiles while dragging the map), optionally passing the scope (`context`) in which the function will be called.

`**falseFn**()`
`Function`
Returns a function which always returns `false`.

`**formatNum**(
            <Number> _num_,
            <Number> _digits_ )
`
`Number`
Returns the number `num` rounded to `digits` decimals.

`**splitWords**(
            <String> _str_ )
`
`String[]`
Trims and splits the string on whitespace and returns the array of parts.

`**setOptions**(
            <Object> _obj_,
            <Object> _options_ )
`
`Object`
Merges the given properties to the `options` of the `obj` object, returning the resulting options. See [Class options][111]. Has an `L.setOptions` shortcut.

`**getParamString**(
            <Object> _obj_ )
`
`String`
Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}` translates to `'?a=foo&b=bar'`.

`**template**(
            <String> _str_, <Object> _data_ )
`
`String`
Simple templating facility, creates a string by applying the values of the `data` object of a form `{a: 'foo', b: 'bar', …}` to a template string of the form `'Hello {a}, {b}'` --- in this example you will get `'Hello foo, bar'`.

`**isArray**(
            <Object> _obj_ )
`
`Boolean`
Returns `true` if the given object is an array.

### Properties
Property
Type
Description

`**emptyImageUrl**`
`String`
Data URI string containing a base64-encoded empty GIF image. Used as a hack to free memory from unused images on WebKit-powered mobile devices (by setting image `src` to this string).

## L.Transformation

Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d` for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing the reverse. Used by Leaflet in its projections code.

    var transformation = new L.Transformation(2, 5, -1, 10),
        p = new L.Point(1, 2),
        p2 = transformation.transform(p), // new L.Point(7, 8)
        p3 = transformation.untransform(p2); // new L.Point(1, 2)


### Constructor
Constructor
Usage
Description

`**L.Transformation**(
            <Number> _a_,
            <Number> _b_,
            <Number> _c_,
            <Number> _d_ )
`
`new L.Transformation(…)`
Creates a transformation object with the given coefficients.

### Methods
Method
Returns
Description

`**transform**(
            <[Point][30]> _point_,
            <Number> _scale?_ )
`
`[Point][30]`
Returns a transformed point, optionally multiplied by the given scale. Only accepts real `L.Point` instances, not arrays.

`**untransform**(
            <[Point][30]> _point_,
            <Number> _scale?_ )
`
`[Point][30]`
Returns the reverse transformation of the given point, optionally divided by the given scale. Only accepts real `L.Point` instances, not arrays.

## L.LineUtil

Various utility functions for polyine points processing, used by Leaflet internally to make polylines lightning-fast.

### Methods
Method
Returns
Description

`**simplify**(
            <[Point][30][]> _points_,
            <Number> _tolerance_ )
`
`[Point][30][]`
Dramatically reduces the number of points in a polyline while retaining its shape and returns a new array of simplified points. Used for a huge performance boost when processing/displaying Leaflet polylines for each zoom level and also reducing visual noise. `tolerance` affects the amount of simplification (lesser value means higher quality but slower and with more points). Also released as a separated micro-library [Simplify.js][112].

`**pointToSegmentDistance**(
            <[Point][30]> _p_,
            <[Point][30]> _p1_,
            <[Point][30]> _p2_ )
`
`Number`
Returns the distance between point `p` and segment `p1` to `p2`.

`**closestPointOnSegment**(
            <[Point][30]> _p_,
            <[Point][30]> _p1_,
            <[Point][30]> _p2_ )
`
`Number`
Returns the closest point from a point `p` on a segment `p1` to `p2`.

`**clipSegment**(
            <[Point][30]> _a_,
            <[Point][30]> _b_,
            <[Bounds][31]> _bounds_ )
`
`-`
Clips the segment `a` to `b` by rectangular bounds (modifying the segment points directly!). Used by Leaflet to only show polyline points that are on the screen or near, increasing performance.

## L.PolyUtil

Various utility functions for polygon geometries.

### Methods
Method
Returns
Description

`**clipPolygon**(
            <[Point][30][]> _points_,
            <[Bounds][31]> _bounds_ )
`
`[Point][30][]`
Clips the polygon geometry defined by the given points by rectangular bounds. Used by Leaflet to only show polygon points that are on the screen or near, increasing performance. Note that polygon points needs different algorithm for clipping than polyline, so there's a seperate method for it.

## L.DomEvent

Utility functions to work with the DOM events, used by Leaflet internally.

### Methods
Method
Returns
Description

`**addListener**(
            <HTMLElement> _el_,
            <String> _type_,
            <Function> _fn_,
            <Object> _context?_ )
`
`this`
Adds a listener `fn` to the element's DOM event of the specified type. `this` keyword inside the listener will point to `context`, or to the element if not specified.

`**removeListener**(
            <HTMLElement> _el_,
            <String> _type_,
            <Function> _fn_ )
`
`this`
Removes an event listener from the element.

`**stopPropagation**(
            <DOMEvent> _e_ )
`
`this`
Stop the given event from propagation to parent elements. Used inside the listener functions:

    L.DomEvent.addListener(div, 'click', function (e) {
        L.DomEvent.stopPropagation(e);
    });

`**preventDefault**(
            <DOMEvent> _e_ )
`
`this`
Prevents the default action of the event from happening (such as following a link in the `href` of the `a` element, or doing a `POST` request with page reload when `form` is submitted). Use it inside listener functions.

`**stop**(
            <DOMEvent> _e_ )
`
`this`
Does `stopPropagation` and `preventDefault` at the same time.

`**disableClickPropagation**(
            <HTMLElement> _el_ )
`
`this`
Adds `stopPropagation` to the element's `'click'`, `'doubleclick'`, `'mousedown'` and `'touchstart'` events.

`**getMousePosition**(
            <DOMEvent> _e_,
            <HTMLElement> _container?_ )
`
`[Point][30]`
Gets normalized mouse position from a DOM event relative to the container or to the whole page if not specified.

`**getWheelDelta**(
            <DOMEvent> _e_ )
`
`Number`
Gets normalized wheel delta from a `mousewheel` DOM event.

## L.DomUtil

Utility functions to work with the DOM tree, used by Leaflet internally.

### Methods
Method
Returns
Description

`**get**(
            <String or HTMLElement> _id_ )
`
`HTMLElement`
Returns an element with the given id if a string was passed, or just returns the element if it was passed directly.

`**getStyle**(
            <HTMLElement> _el_,
            <String> _style_ )
`
`String`
Returns the value for a certain style attribute on an element, including computed values or values set through CSS.

`**getViewportOffset**(
            <HTMLElement> _el_ )
`
[`Point`][30]
Returns the offset to the viewport for the requested element.

`**create**(
            <String> _tagName_,
            <String> _className_,
            <HTMLElement> _container?_ )
`
`HTMLElement`
Creates an element with `tagName`, sets the `className`, and optionally appends it to `container` element.

`**disableTextSelection**()`
-
Makes sure text cannot be selected, for example during dragging.

`**enableTextSelection**()`
-
Makes text selection possible again.

`**hasClass**(
            <HTMLElement> _el_,
            <String> _name_ )
`
`Boolean`
Returns `true` if the element class attribute contains `name`.

`**addClass**(
            <HTMLElement> _el_,
            <String> _name_ )
`
-
Adds `name` to the element's class attribute.

`**removeClass**(
            <HTMLElement> _el_,
            <String> _name_ )
`
-
Removes `name` from the element's class attribute.

`**setOpacity**(
            <HTMLElement> _el_,
            <Number> _value_ )
`
-
Set the opacity of an element (including old IE support). Value must be from `0` to `1`.

`**testProp**(
            <String[]> _props_ )
`
`String` or `false`
Goes through the array of style names and returns the first name that is a valid style name for an element. If no such name is found, it returns `false`. Useful for vendor-prefixed styles like `transform`.

`**getTranslateString**(
            <[Point][30]> _point_ )
`
`String`
Returns a CSS transform string to move an element by the offset provided in the given point. Uses 3D translate on WebKit for hardware-accelerated transforms and 2D on other browsers.

`**getScaleString**(
            <Number> _scale_,
            <[Point][30]> _origin_ )
`
`String`
Returns a CSS transform string to scale an element (with the given scale origin).

`**setPosition**(
            <HTMLElement> _el_,
            <[Point][30]> _point_,
            <Boolean> _disable3D?_ )
`
-
Sets the position of an element to coordinates specified by `point`, using CSS translate or top/left positioning depending on the browser (used by Leaflet internally to position its layers). Forces top/left positioning if `disable3D` is `true`.

`**getPosition**(
            <HTMLElement> _el_ )
`
[Point][30]
Returns the coordinates of an element previously positioned with `setPosition`.

### Properties
Property
Type
Description

`**TRANSITION**
`
`String`
Vendor-prefixed transition style name (e.g. `'webkitTransition'` for WebKit).

`**TRANSFORM**
`
`String`
Vendor-prefixed transform style name.

## L.PosAnimation

Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9\.

    var fx = new L.PosAnimation();
    fx.run(el, [300, 500], 0.5);

### Constructor
Constructor
Usage
Description

`**L.PosAnimation**()`
`new L.PosAnimation()`
Creates a PosAnimation object.

### Methods
Method
Returns
Description

`**run**(
            <HTMLElement> _element_,
<[Point][30]> _newPos_,
            <Number> _duration?_,
            <Number> _easeLinearity?_ )
`
`this`
Run an animation of a given element to a new position, optionally setting duration in seconds (`0.25` by default) and easing linearity factor (3rd argument of the [cubic bezier curve][113], `0.5` by default)

### Events

You can subscribe to the following events using [these methods][39].
Event
Data
Description

`**start**`
`[Event][62]`
Fired when the animation starts.

`**step**`
`[Event][62]`
Fired continuously during the animation.

`**end**`
`[Event][62]`
Fired when the animation ends.

## L.Draggable

A class for making DOM elements draggable (including touch support). Used internally for map and marker dragging.

    var draggable = new L.Draggable(elementToDrag);
    draggable.enable();


### Constructor
Constructor
Usage
Description

`**L.Draggable**(
            <HTMLElement> _element_,
<HTMLElement> _dragHandle?_ )
`
`new L.Draggable(…)`
Creates a Draggable object for moving the given element when you start dragging the `dragHandle` element (equals the element itself by default).

### Events

You can subscribe to the following events using [these methods][39].
Event
Data
Description

`**dragstart**`
`[Event][62]`
Fired when the dragging starts.

`**predrag**`
`[Event][62]`
Fired continuously during dragging _before_ each corresponding update of the element position.

`**drag**`
`[Event][62]`
Fired continuously during dragging.

`**dragend**`
`[Event][62]`
Fired when the dragging ends.

### Methods
Method
Returns
Description

`**enable**()`
`-`
Enables the dragging ability.

`**disable**()`
`-`
Disables the dragging ability.

## IHandler

An interface implemented by [interaction handlers][114].
Method
Returns
Description

`**enable**()`
-
Enables the handler.

`**disable**()`
-
Disables the handler.

`**enabled**()`
`Boolean`
Returns `true` if the handler is enabled.

## ILayer

Represents an object attached to a particular location (or a set of locations) on a map. Implemented by [tile layers][13], [markers][11], [popups][12], [image overlays][16], [vector layers][17] and [layer groups][25].

### Methods
Method
Returns
Description

`**onAdd**(
            <[Map][76]> _map_ )
`
-
Should contain code that creates DOM elements for the overlay, adds them to [map panes][10] where they should belong and puts listeners on relevant map events. Called on `map.addLayer(layer)`.

`**onRemove**(
            <[Map][76]> _map_ )
`
-
Should contain all clean up code that removes the overlay's elements from the DOM and removes listeners previously added in `onAdd`. Called on `map.removeLayer(layer)`.

### Implementing Custom Layers

The most important things know about when implementing custom layers are Map [viewreset][115] event and [latLngToLayerPoint][116] method. `viewreset` is fired when the map needs to reposition its layers (e.g. on zoom), and `latLngToLayerPoint` is used to get coordinates for the layer's new position.

Another event often used in layer implementations is [moveend][117] which fires after any movement of the map (panning, zooming, etc.).

Another thing to note is that you'll usually need to add `leaflet-zoom-hide` class to the DOM elements you create for the layer so that it hides during zoom animation. Implementing zoom animation for custom layers is a complex topic and will be documented separately in future, but meanwhile you can take a look at how it's done for Leaflet layers (e.g. `ImageOverlay`) in the source.

### Custom Layer Example

Here's how a custom layer implementation usually looks:

    var MyCustomLayer = L.Class.extend({

        initialize: function (latlng) {
            // save position of the layer or any options from the constructor
            this._latlng = latlng;
        },

        onAdd: function (map) {
            this._map = map;

            // create a DOM element and put it into one of the map panes
            this._el = L.DomUtil.create('div', 'my-custom-layer leaflet-zoom-hide');
            map.getPanes().overlayPane.appendChild(this._el);

            // add a viewreset event listener for updating layer's position, do the latter
            map.on('viewreset', this._reset, this);
            this._reset();
        },

        onRemove: function (map) {
            // remove layer's DOM elements and listeners
            map.getPanes().overlayPane.removeChild(this._el);
            map.off('viewreset', this._reset, this);
        },

        _reset: function () {
            // update layer's position
            var pos = this._map.latLngToLayerPoint(this._latlng);
            L.DomUtil.setPosition(this._el, pos);
        }
    });

    map.addLayer(new MyCustomLayer(latlng));


## IControl

Represents a UI element in one of the corners of the map. Implemented by [zoom][35], [attribution][36], [scale][38] and [layers][37] controls.

### Methods

Every control in Leaflet should extend from [Control][34] class and additionally have the following methods:
Method
Returns
Description

`**onAdd**(
            <[Map][76]> _map_ )
`
`HTMLElement`
Should contain code that creates all the neccessary DOM elements for the control, adds listeners on relevant map events, and returns the element containing the control. Called on `map.addControl(control)` or `control.addTo(map)`.

`**onRemove**(
            <[Map][76]> _map_ )
`
-
Optional, should contain all clean up code (e.g. removes control's event listeners). Called on `map.removeControl(control)` or `control.removeFrom(map)`. The control's DOM container is removed automatically.

### Custom Control Example

    var MyControl = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function (map) {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'my-custom-control');

            // ... initialize other DOM elements, add listeners, etc.

            return container;
        }
    });

    map.addControl(new MyControl());


If specify your own constructor for the control, you'll also probably want to process options properly:

    var MyControl = L.Control.extend({
        initialize: function (foo, options) {
            // ...
            L.Util.setOptions(this, options);
        },
        // ...
    });

This will allow you to pass options like `position` when creating the control instances:

    map.addControl(new MyControl('bar', {position: 'bottomleft'}));

## IProjection

An object with methods for projecting geographical coordinates of the world onto a flat surface (and back). See [Map projection][118].

### Methods
Method
Returns
Description

`**project**(
            <[LatLng][28]> _latlng_ )
`
`[Point][30]`
Projects geographical coordinates into a 2D point.

`**unproject**(
            <[Point][30]> _point_ )
`
`[LatLng][28]`
The inverse of `project`. Projects a 2D point into geographical location.

### Defined Projections

Leaflet comes with a set of already defined projections out of the box:
Projection
Description

`**L.Projection.SphericalMercator**`
Spherical Mercator projection --- the most common projection for online maps, used by almost all free and commercial tile providers. Assumes that Earth is a sphere. Used by the `EPSG:3857` CRS.

`**L.Projection.Mercator**`
Elliptical Mercator projection --- more complex than Spherical Mercator. Takes into account that Earth is a geoid, not a perfect sphere. Used by the `EPSG:3395` CRS.

`**L.Projection.LonLat**`
Equirectangular, or Plate Carree projection --- the most simple projection, mostly used by GIS enthusiasts. Directly maps `x` as longitude, and `y` as latitude. Also suitable for flat worlds, e.g. game maps. Used by the `EPSG:3395` and `Simple` CRS.

## ICRS

Defines coordinate reference systems for projecting geographical points into pixel (screen) coordinates and back (and to coordinates in other units for WMS services). See [Spatial reference system][119].

### Methods
Method
Returns
Description

`**latLngToPoint**(
            <[LatLng][28]> _latlng_,
            <Number> _zoom_ )
`
`[Point][30]`
Projects geographical coordinates on a given zoom into pixel coordinates.

`**pointToLatLng**(
            <[Point][30]> _point_,
            <Number> _zoom_ )
`
`[LatLng][28]`
The inverse of `latLngToPoint`. Projects pixel coordinates on a given zoom into geographical coordinates.

`**project**(
            <[LatLng][28]> _latlng_ )
`
`[Point][30]`
Projects geographical coordinates into coordinates in units accepted for this CRS (e.g. meters for `EPSG:3857`, for passing it to WMS services).

`**scale**(
            <Number> _zoom_ )
`
`Number`
Returns the scale used when transforming projected coordinates into pixel coordinates for a particular zoom. For example, it returns `256 * 2^zoom` for Mercator-based CRS.

### Properties
Property
Type
Description

`**projection**`
`[IProjection][54]`
Projection that this CRS uses.

`**transformation**`
`[Transformation][44]`
Transformation that this CRS uses to turn projected coordinates into screen coordinates for a particular tile service.

`**code**`
`String`
Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`).

### Defined CRS

Leaflet comes with a set of already defined CRS to use out of the box:
Projection
Description

`**L.CRS.EPSG3857**`
The most common CRS for online maps, used by almost all free and commercial tile providers. Uses Spherical Mercator projection. Set in by default in Map's `crs` option.

`**L.CRS.EPSG4326**`
A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.

`**L.CRS.EPSG3395**`
Rarely used by some commercial tile providers. Uses Elliptical Mercator projection.

`**L.CRS.Simple**`
A simple CRS that maps longitude and latitude into `x` and `y` directly. May be used for maps of flat surfaces (e.g. game maps). Note that the `y` axis should still be inverted (going from bottom to top).

If you want to use some obscure CRS not listed here, take a look at the [Proj4Leaflet][120] plugin.

## Global Switches

Global switches are created for rare cases and generally make Leaflet to not detect a particular browser feature even if it's there. You need to set the switch as a global variable to `true` _before_ including Leaflet on the page, like this:

    <script>L_PREFER_CANVAS = true;</script>
    <script src="leaflet.js"></script>

Switch
Description

`**L_PREFER_CANVAS**`
Forces Leaflet to use the Canvas back-end (if available) for vector layers instead of SVG. This can increase performance considerably in some cases (e.g. many thousands of circle markers on the map).

`**L_NO_TOUCH**`
Forces Leaflet to not use touch events even if it detects them.

`**L_DISABLE_3D**`
Forces Leaflet to not use hardware-accelerated CSS 3D transforms for positioning (which may cause glitches in some rare environments) even if they're supported.

## L.noConflict()

This method restores the L global variale to the original value it had before Leaflet inclusion, and returns the real Leaflet namespace so you can put it elsewhere, like this:

    // L points to some other library
    ...
    // you include Leaflet, it replaces the L variable to Leaflet namespace

    var Leaflet = L.noConflict();
    // now L points to that other library again, and you can use Leaflet.Map etc.

## L.version

A constant that represents the Leaflet version in use.

    L.version // returns "0.5" (or whatever version is currently in use)



[0]: #map-usage
[1]: #map-constructor
[2]: #map-options
[3]: #map-events
[4]: #map-set-methods
[5]: #map-get-methods
[6]: #map-stuff-methods
[7]: #map-conversion-methods
[8]: #map-misc-methods
[9]: #map-properties
[10]: #map-panes
[11]: #marker
[12]: #popup
[13]: #tilelayer
[14]: #tilelayer-wms
[15]: #tilelayer-canvas
[16]: #imageoverlay
[17]: #path
[18]: #polyline
[19]: #multipolyline
[20]: #polygon
[21]: #multipolygon
[22]: #rectangle
[23]: #circle
[24]: #circlemarker
[25]: #layergroup
[26]: #featuregroup
[27]: #geojson
[28]: #latlng
[29]: #latlngbounds
[30]: #point
[31]: #bounds
[32]: #icon
[33]: #divicon
[34]: #control
[35]: #control-zoom
[36]: #control-attribution
[37]: #control-layers
[38]: #control-scale
[39]: #events
[40]: #event-objects
[41]: #class
[42]: #browser
[43]: #util
[44]: #transformation
[45]: #lineutil
[46]: #polyutil
[47]: #domevent
[48]: #domutil
[49]: #posanimation
[50]: #draggable
[51]: #ihandler
[52]: #ilayer
[53]: #icontrol
[54]: #iprojection
[55]: #icrs
[56]: #global
[57]: #noconflict
[58]: #version
[59]: https://github.com/Leaflet/Leaflet/zipball/gh-pages-master
[60]: #map-setmaxbounds
[61]: #mouse-event
[62]: #event
[63]: #layer-event
[64]: #location-event
[65]: #map-locate
[66]: #error-event
[67]: map-locate
[68]: #popup-event
[69]: #map-maxbounds
[70]: #map-locate-options
[71]: https://en.wikipedia.org/wiki/W3C_Geolocation_API
[72]: #map-openpopup
[73]: http://dev.w3.org/geo/api/spec-source.html#high-accuracy
[74]: #map-getpanes
[75]: #marker-options
[76]: #map
[77]: #marker-zindexoffset
[78]: #popup-options
[79]: #marker-openpopup
[80]: #marker-bindpopup
[81]: #map-addlayer
[82]: #url-template
[83]: #tilelayer-options
[84]: #tile-event
[85]: #tilelayer-wms-options
[86]: #tilelayer-canvas-tiledrawn
[87]: #tilelayer-canvas-drawtile
[88]: #imageoverlay-options
[89]: https://developer.mozilla.org/en/SVG/Attribute/stroke-dasharray
[90]: #path-bindpopup
[91]: #path-options
[92]: #polyline-options
[93]: #path-methods
[94]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice
[95]: http://geojson.org/geojson-spec.html
[96]: #geojson-options
[97]: #geojson-style
[98]: #geojson-pointtolayer
[99]: http://en.wikipedia.org/wiki/Haversine_formula
[100]: #map-fitbounds
[101]: #icon-options
[102]: #divicon-options
[103]: #control-options
[104]: #control-positions
[105]: #control-zoom-options
[106]: #control-attribution-options
[107]: examples/layers-control.html
[108]: #control-layers-config
[109]: #control-layers-options
[110]: #control-scale-options
[111]: #class-options
[112]: http://mourner.github.com/simplify-js/
[113]: http://cubic-bezier.com/#0,0,.5,1
[114]: #map-interaction-handlers
[115]: #map-viewreset
[116]: #map-latlngtolayerpoint
[117]: #map-moveend
[118]: http://en.wikipedia.org/wiki/Map_projection
[119]: http://en.wikipedia.org/wiki/Coordinate_reference_system
[120]: https://github.com/kartena/Proj4Leaflet
