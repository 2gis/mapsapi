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
        <td>GeoJSON ID объекта (если задан).</td>
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

    MyClass.include(MyMixin);

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

Если вы разрабатываете плагин к API, тогда велика вероятность, что вам понадобится выполнить дополнительные действия при инициализациии объектов существующих классов (например, при инициализации объекта `L.Polyline`). Для подобного рода задач имеется метод `addInitHook`:

    MyClass.addInitHook(function () {
        // ... выполнить дополнительные действия при вызове конструктора
        // например, добавить обработчики событий, установить значения свойств и т.п.
    });

Также можно использовать сокращенную запись, если необходимо вызвать лишь один метод при инициализации:

    MyClass.addInitHook('methodName', arg1, arg2, …);

## L.Browser

Объект со свойствами, необходимыми для определения браузера/фичи.

    if (L.Browser.ie6) {
        alert('Вам срочно нужно обновить свой браузер!');
    }

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>ie</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для всех версий Internet Explorer.</td>
    </tr>
    <tr>
        <td><code><b>ie6</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для Internet Explorer 6.</td>
    </tr>
    <tr>
        <td><code><b>ie7</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для Internet Explorer 7.</td>
    </tr>
    <tr>
        <td><code><b>webkit</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для браузеров на основе WebKit, таких как Chrome и Safari (включая мобильные версии).</td>
    </tr>
    <tr>
        <td><code><b>webkit3d</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для браузеров на основе WebKit, поддерживающих CSS 3D трансформации.</td>
    </tr>
    <tr>
        <td><code><b>android</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для мобильных браузеров на Android устройствах.</td>
    </tr>
    <tr>
        <td><code><b>android23</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для мобильных браузеров на старых версиях Android устройств (2 и 3).</td>
    </tr>
    <tr>
        <td><code><b>mobile</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для браузеров, работающих на современных мобильных устройствах (включая iOS Safari и различные Android устройства).</td>
    </tr>
    <tr>
        <td><code><b>mobileWebkit</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для мобильных браузеров на основе WebKit.</td>
    </tr>
    <tr>
        <td><code><b>mobileOpera</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для мобильной версии Opera.</td>
    </tr>
    <tr>
        <td><code><b>touch</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для всех браузеров, работающих на тач-устройствах.</td>
    </tr>
    <tr>
        <td><code><b>msTouch</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для браузеров с тач-моделью от Microsoft (например, IE10).</td>
    </tr>
    <tr>
        <td><code><b>retina</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для устройств с Retina экранами.</td>
    </tr>
</table>

## L.Util

Служебные функции.

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>extend</b>(
            <nobr>&lt;Object&gt; <i>dest</i></nobr>,
            <nobr>&lt;Object&gt; <i>src?..</i> )</nobr>
        </code></td>

        <td><code>Object</code></td>
        <td>Сливает свойства объекта <code>src</code> (или нескольких объектов) в свойства объекта <code>dest</code> и возвращает последний. Также имеется псевдоним <code>L.extend</code>.</td>
    </tr>
    <tr>
        <td><code><b>bind</b>(
            <nobr>&lt;Function&gt; <i>fn</i></nobr>,
            <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
        </code></td>

        <td><code>Function</code></td>
        <td>Возвращает функцию, которая выполняет функцию <code>fn</code> с определенным объектом контекста <code>obj</code> (так, чтобы ключевое слово <code>this</code> внутри функции указывало на <code>obj</code>). Также имеется псевдоним <code>L.bind</code>.</td>
    </tr>
    <!-- TODO Commented out for the time being:
    https://github.com/Leaflet/Leaflet/pull/793#discussion_r1134904
    <tr>
        <td><code><b>requestAnimFrame</b>()</code></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td><code><b>cancelAnimFrame</b>()</code></td>
        <td></td>
        <td></td>
    </tr>
    -->
    <tr>
        <td><code><b>limitExecByInterval</b>(
            <nobr>&lt;Function&gt; <i>fn</i></nobr>,
            <nobr>&lt;Number&gt; <i>time</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>Function</code></td>
        <td>Возвращает обертку над функцией <code>fn</code>, которая гарантирует, что функция не будет вызвана чаще, чем раз в указанный интервал времени <code>time</code> (например, используется при запросах к тайлам во время перетаскивания карты), опционально можно передать контекст (<code>context</code>), в котором будет вызываться функция.</td>
    </tr>
    <tr>
        <td><code><b>formatNum</b>(
            <nobr>&lt;Number&gt; <i>num</i></nobr>,
            <nobr>&lt;Number&gt; <i>digits</i> )</nobr>
        </code></td>

        <td><code>Number</code></td>
        <td>Возвращает число <code>num</code> округленное до <code>digits</code> знаков.</td>
    </tr>
    <tr>
        <td><code><b>splitWords</b>(
            <nobr>&lt;String&gt; <i>str</i> )</nobr>
        </code></td>

        <td><code>String[]</code></td>
        <td>Обрезает и разделяет строку на части, используя в качестве разделителя пробел, возвращает массив с этими частями.</code></td>
    </tr>
    <tr>
        <td><code><b>setOptions</b>(
            <nobr>&lt;Object&gt; <i>obj</i></nobr>,
            <nobr>&lt;Object&gt; <i>options</i> )</nobr>
        </code></td>

        <td><code>Object</code></td>
        <td>Сливает опции свойства со свойством <code>options</code> объекта <code>obj</code>, возвращает результирующий объект. См. <a href="#class-options">Опции класса</a>. Также имеется псевдоним <code>L.setOptions</code>.</td>
    </tr>
    <tr>
        <td><code><b>getParamString</b>(
            <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
        </code></td>

        <td><code>String</code></td>
        <td>Преобразует объект в строку URL-а, например, <nobr><code>{a: "foo", b: "bar"}</code></nobr> будет преобразован в <code><span class="string">'?a=foo&amp;b=bar'</span></code>.</td>
    </tr>
    <tr>
        <td><code><b>template</b>(
            <nobr>&lt;String&gt; <i>str</i>, &lt;Object&gt; <i>data</i> )</nobr>
        </code></td>

        <td><code>String</code></td>
        <td>Простая функция-шаблонизатор, создает строку применяя значения из объекта <code>data</code> в формате <code>{a: 'foo', b: 'bar', &hellip;}</code> к строке шаблона в формате <code>'Hello {a}, {b}'</code> &mdash; в этом примере будет возвращена строка <code>'Hello foo, bar'</code>.</td>
    </tr>
    <tr>
        <td><code><b>isArray</b>(
            <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если переданный объект является массивом.</td>
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
        <td><code><b>emptyImageUrl</b></code></td>
        <td><code>String</code></td>
        <td>URI, содержащий пустое GIF изображение, закодированное в base64. Используется для освобождения памяти неиспользуемых картинок в мобильных WebKit браузерах (память освобождается установкой свойства <code>src</code> в данное значение).</td>
    </tr>
</table>

## L.LineUtil

Набор методов для обработки точек ломаных.

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>simplify</b>(
            <nobr>&lt;<a href="#point">Point</a>[]&gt; <i>points</i></nobr>,
            <nobr>&lt;Number&gt; <i>tolerance</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a>[]</code></td>

        <td>Уменьшает количество точек в ломаной и возвращает новую упрощенную ломаную. Позволяет увеличить производительность обработки/отображения ломаных на карте. Параметр <code>tolerance</code> влияет на величину упрощения (чем меньше значение, тем лучше качество геометрии и ниже производительность).</td>
    </tr>
    <tr>
        <td><code><b>pointToSegmentDistance</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p1</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p2</i> )</nobr>
        </code></td>

        <td><code>Number</code></td>

        <td>Возвращает расстояние между точкой <code>p</code> и сегментом между точками <code>p1</code> и <code>p2</code>.
    </tr>
    <tr>
        <td><code><b>closestPointOnSegment</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p1</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p2</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>

        <td>Возвращает ближайшую точку на сегменте <code>p1</code> - <code>p2</code> до точки <code>p</code>.</td>
    </tr>
    <tr>
        <td><code><b>clipSegment</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>a</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>b</i></nobr>,
            <nobr>&lt;<a href="#bounds">Bounds</a>&gt; <i>bounds</i> )</nobr>
        </code></td>

        <td><code>-</code></td>

        <td>Обрезает сегмент <code>a</code> - <code>b</code> по прямоугольной области (модифицируются непосредственно точки сегмента).</td>
    </tr>
</table>

## L.PolyUtil

Набор методов для обработки точек многоугольников.

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>clipPolygon</b>(
            <nobr>&lt;<a href="#point">Point</a>[]&gt; <i>points</i></nobr>,
            <nobr>&lt;<a href="#bounds">Bounds</a>&gt; <i>bounds</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a>[]</code></td>

        <td>Обрезает многоугольник по прямоугольной области.</td>
    </tr>
</table>

## L.DomEvent

Служебные методы для работы с DOM событиями.

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>addListener</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>type</i></nobr>,
            <nobr>&lt;Function&gt; <i>fn</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Подписывает обработчик <code>fn</code> на DOM событие определенного типа. Ключевое слово <code>this</code> внутри обработчика будет указывать на <code>context</code>, или на элемент на котором произошло событие, если контекст не указан.</td>
    </tr>
    <tr>
        <td><code><b>removeListener</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>type</i></nobr>,
            <nobr>&lt;Function&gt; <i>fn</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Отписывает ранее подписанный обработчик.</td>
    </tr>
    <tr>
        <td><code><b>stopPropagation</b>(
            <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Останавливает всплытие события к родительским элементам. Используется внутри функции-обработчика:
            <code>L.DomEvent.addListener(div, 'click', function (e) {
                L.DomEvent.stopPropagation(e);
            });</code>
        </td>
    </tr>
    <tr>
        <td><code><b>preventDefault</b>(
            <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Предотвращает поведение DOM элемента по умолчанию (например, переход по ссылке указанной в свойстве <code>href</code> элемента <code>a</code>). Используется внутри функции-обработчика.</td>
    </tr>
    <tr>
        <td><code><b>stop</b>(
            <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Вызывает одновременно <code>stopPropagation</code> и <code>preventDefault</code>.</td>
    </tr>
    <tr>
        <td><code><b>disableClickPropagation</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Добавляет <code>stopPropagation</code> к DOM элементу для событий <code>'click'</code>, <code>'doubleclick'</code>, <code>'mousedown'</code> и <code>'touchstart'</code>.</td>
    </tr>
    <tr>
        <td><code><b>getMousePosition</b>(
            <nobr>&lt;DOMEvent&gt; <i>e</i></nobr>,
            <nobr>&lt;HTMLElement&gt; <i>container?</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает позицию мышки из DOM события относительно контейнера или относительно всей страницы, если контейнер не указан.</td>
    </tr>
    <tr>
        <td><code><b>getWheelDelta</b>(
            <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
        </code></td>

        <td><code>Number</code></td>
        <td>Возвращает дельту колесика мышки из DOM события <code>mousewheel</code>.</td>
    </tr>
</table>

## L.DomUtil

Служебные методы для работы с DOM деревом.

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>get</b>(
            <nobr>&lt;String or HTMLElement&gt; <i>id</i> )</nobr>
        </code></td>

        <td><code>HTMLElement</code></td>
        <td>Возвращает элемент по его id, если параметром была передана строка, либо возвразщает тот же элемент, если он был передан в качестве параметра.</td>
    </tr>
    <tr>
        <td><code><b>getStyle</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>style</i> )</nobr>
        </code></td>

        <td><code>String</code></td>
        <td>Возвращает значение стиля элемента, включая рассчитанные значения или значения указанные с помощью CSS.</td>
    </tr>
    <tr>
        <td><code><b>getViewportOffset</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
        </code></td>

        <td><a href="#point"><code>Point</code></a></td>
        <td>Возвращает смещение элемента относительно области просмотра (viewport-а).</td>
    </tr>
    <tr>
        <td><code><b>create</b>(
            <nobr>&lt;String&gt; <i>tagName</i></nobr>,
            <nobr>&lt;String&gt; <i>className</i></nobr>,
            <nobr>&lt;HTMLElement&gt; <i>container?</i> )</nobr>
        </code></td>

        <td><code>HTMLElement</code></td>

        <td>Создает элемент <code>tagName</code>, устанавливает ему значение класса <code>className</code> и опционально добавляет его в элемент <code>container</code>.</td>
    </tr>
    <tr>
        <td><code><b>disableTextSelection</b>()</code></td>
        <td>-</td>
        <td>Отключает возможность выделения текста, например во время перетаскивания.</td>
    </tr>
    <tr>
        <td><code><b>enableTextSelection</b>()</code></td>
        <td>-</td>
        <td>Включает позможность выделения текста.</td>
    </tr>
    <tr>
        <td><code><b>hasClass</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>name</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>

        <td>Возвращает <code>true</code>, если элемент содержит класс <code>name</code>.</td>
    </tr>
    <tr>
        <td><code><b>addClass</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>name</i> )</nobr>
        </code></td>

        <td>-</td>

        <td>Добавляет класс <code>name</code> к элементу.</td>
    </tr>
    <tr>
        <td><code><b>removeClass</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>name</i> )</nobr>
        </code></td>

        <td>-</td>

        <td>Удаляет класс <code>name</code> из элемента.</td>
    </tr>
    <tr>
        <td><code><b>setOpacity</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;Number&gt; <i>value</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Устанавливает прозрачность элемента (включая поддержку старых IE). Значение должно быть от <code>0</code> до <code>1</code>.</td>
    </tr>
    <tr>
        <td><code><b>testProp</b>(
            <nobr>&lt;String[]&gt; <i>props</i> )</nobr>
        </code></td>

        <td><code>String</code> or <code><span class="literal">false</span></code></td>
        <td>Обходит массив названий стилей и возвращает первое имя, которое является корректным для текущего браузера. Если такого нет, тогда будет возвращено <code>false</code>. Удобно для стилей с префиксами производителей браузеров, например <code>transform</code>.</td>
    </tr>
    <tr>
        <td><code><b>getTranslateString</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>

        <td><code>String</code></td>
        <td>Возвращает CSS строку трансформации для смещения элемента. Использует 3D трансформацию для браузеров на основе WebKit с поддержкой аппаратного ускорения и 2D для других браузеров.</td>
    </tr>
    <tr>
        <td><code><b>getScaleString</b>(
            <nobr>&lt;Number&gt; <i>scale</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>origin</i> )</nobr>
        </code></td>

        <td><code>String</code></td>
        <td>Возвращает CSS строку трансформации для масштабирования элемента.</td>
    </tr>
    <tr>
        <td><code><b>setPosition</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i></nobr>,
            <nobr>&lt;Boolean&gt; <i>disable3D?</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Устанавливает позицию элемента в координаты <code>point</code>, используя CSS translate или свойства <code>top</code> и <code>left</code>, в зависимости от браузера. Принудительно использует позиционирование с помощью <code>top</code> и <code>left</code>, если <code>disable3D</code> установлено в <code>true</code>.</td>
    </tr>
    <tr>
        <td><code><b>getPosition</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
        </code></td>

        <td><a href="#point">Point</a></td>
        <td>Возвращает координаты элемента, который ранее был спозиционирован с помощью метода <code>setPosition</code>.</td>
    </tr>
</table>

### Properties

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>TRANSITION</b></nobr>
        </code></td>
        <td><code>String</code></td>
        <td>Название CSS свойства transition с учетом префикса производителя браузера (например, <code>'webkitTransition'</code> для WebKit).</td>
    </tr>
    <tr>
        <td><code><b>TRANSFORM</b></nobr>
        </code></td>
        <td><code>String</code></td>
        <td>Название CSS свойства transform с учетом префикса производителя браузера.</td>
    </tr>
</table>

## L.PosAnimation

Используется для плавного перемещения элементов, использует CSS3 Transitions для современных браузеров и таймер для IE6-9\.

    var fx = new L.PosAnimation();
    fx.run(el, [300, 500], 0.5);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.PosAnimation</b>()</code></td>

        <td>
            <code>new L.PosAnimation()</code>
        </td>

        <td>Создает объект PosAnimation.</td>
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
        <td><code><b>run</b>(
            <nobr>&lt;HTMLElement&gt; <i>element</i>,</nobr>
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>newPos</i></nobr>,
            <nobr>&lt;Number&gt; <i>duration?</i></nobr>,
            <nobr>&lt;Number&gt; <i>easeLinearity?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Запускает анимацию переданного элемента, смещая его в новую позицию, опционально задается продолжительность в секундах (по умолчанию <code>0.25</code>) и функция затухания (третий аргумент <a href="http://cubic-bezier.com/#0,0,.5,1">кубической кривой Безье</a>, по умолчанию <code>0.5</code>)</td>
    </tr>
</table>

### События

Вы можете подписаться на следующие события используя [эти методы][39].

<table>
    <tr>
        <th>Событие</th>
        <th>Данные</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>start</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает во время старта анимации.</td>
    </tr>
    <tr>
        <td><code><b>step</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает в процессе анимации.</td>
    </tr>
    <tr>
        <td><code><b>end</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает во время окончания анимации.</td>
    </tr>
</table>

## L.Draggable

Класс, с помощью которого можно сделать DOM элемент перетаскиваемым (включая поддержку тач-устройств).

    var draggable = new L.Draggable(elementToDrag);
    draggable.enable();

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Draggable</b>(
            <nobr>&lt;HTMLElement&gt; <i>element</i>,</nobr>
            <nobr>&lt;HTMLElement&gt; <i>dragHandle?</i> )</nobr>
        </code></td>

        <td>
            <code>new L.Draggable(&hellip;)</code><!--<br />
            <code>L.draggable(<span class="comment">&hellip;</span>)</code>-->
        </td>

        <td>Создает объект, с помощью которого можно двигать элемент <code>element</code> во время перетаскивания элемента <code>dragHandle</code> (по умолчанию <code>dragHandle</code> является тем же элементом, что и <code>element</code>).</td>
    </tr>
</table>

### События

Вы можете подписаться на следующие события используя [эти методы][39].

<table>
    <tr>
        <th>Событие</th>
        <th>Данные</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>dragstart</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает в момент начала перетаскивания.</td>
    </tr>
    <tr>
        <td><code><b>predrag</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает в процессе перетаскивания <i>перед</i> каждым обновлением позиции элемента.</td>
    </tr>
    <tr>
        <td><code><b>drag</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает в процессе перетаскивания.</td>
    </tr>
    <tr>
        <td><code><b>dragend</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает в момент окончания перетаскивания.</td>
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
        <td><code><b>enable</b>()</code></td>
        <td><code>-</code></td>
        <td>Включает возможность перетаскивания.</td>
    </tr>
    <tr>
        <td><code><b>disable</b>()</code></td>
        <td><code>-</code></td>
        <td>Отключает возможность перетаскивания.</td>
    </tr>
</table>

## IHandler

Интерфейс, который реализуется [обработчиками взаимодействия][114].

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>enable</b>()</code></td>
        <td>-</td>
        <td>Включает обработчик</td>
    </tr>
    <tr>
        <td><code><b>disable</b>()</code></td>
        <td>-</td>
        <td>Отключает обработчик.</td>
    </tr>
    <tr>
        <td><code><b>enabled</b>()</code></td>
        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code> если обработчик включен.</td>
    </tr>
</table>

## ILayer

Описывает объект, который привязан к определенному местоположению (или набору местоположений) на карте. Реализуется такими объектами, как [тайловые слои][13], [маркеры][11], [балуны][12], [растровые слои][16], [векторные слои][17] и [группы слоев][25].

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>onAdd</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Должен содержать код, который создает DOM элементы слоя, добавляет их на <a href="#map-panes">панели карты</a> и подписывает обработчики на все необходимые события карты. Вызывается при <code>map.addLayer(layer)</code>.</td>
    </tr>
    <tr>
        <td><code><b>onRemove</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Должен содержать код очистки, который удаляет элементы слоя и отписывает ранее добавленные обработчики событий. Вызывется при <code>map.removeLayer(layer)</code>.</td>
    </tr>
</table>

### Реализация пользовательских слоев

Наиболее важными вещами при разработке пользовательских слоев являются событие [viewreset][115] и метод [latLngToLayerPoint][116] карты. `viewreset` возникает когда карта должна спозиционировать свои слои (например, при изменении масштаба), а `latLngToLayerPoint` используется для получения новых координат слоя.

Еще одним событием, которое часто используется при разработке слоев является [moveend][117], оно возникает после любых движений карты (перемещение, изменение масштаба и т.п.).

Еще одна важная особенность, которую необходимо знать &mdash; для всех DOM элементов, которые должны быть скрыты во время анимации изменения масштаба карты необходимо добавить класс `leaflet-zoom-hide`.

### Custom Layer Example

Пример реализации пользовательского слоя:

    var MyCustomLayer = L.Class.extend({

        initialize: function (latlng) {
            // сохраняет позицию или другие опции конструктора
            this._latlng = latlng;
        },

        onAdd: function (map) {
            this._map = map;

            // создает DOM элемент и добавляет его на панели карты
            this._el = L.DomUtil.create('div', 'my-custom-layer leaflet-zoom-hide');
            map.getPanes().overlayPane.appendChild(this._el);

            // подписка на событие viewreset для обновления позиции слоя
            map.on('viewreset', this._reset, this);
            this._reset();
        },

        onRemove: function (map) {
            // удаляет DOM элементы слоя и отписывает обработчики событий
            map.getPanes().overlayPane.removeChild(this._el);
            map.off('viewreset', this._reset, this);
        },

        _reset: function () {
            // обновляет позицию слоя
            var pos = this._map.latLngToLayerPoint(this._latlng);
            L.DomUtil.setPosition(this._el, pos);
        }
    });

    map.addLayer(new MyCustomLayer(latlng));


## IControl

Графические элементы управления, которые располагаются в одном из углов карты. Реализуется элементами [zoom][35], [attribution][36], [scale][38] и [layers][37].

### Методы

Каждый элемент управления API должен наследоваться от класса [Control][34] и иметь следующие методы:

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращет</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>onAdd</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code>HTMLElement</code></td>
        <td>Должен содержать код, который создает DOM элементы, подписывает обработчики на все необходимые события карты и возвращает элемент содержащий содержимое элемента управления. Вызывается при <code>map.addControl(control)</code> или <code>control.addTo(map)</code>.</td>
    </tr>
    <tr>
        <td><code><b>onRemove</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Опционально, должен содержать код очистки (например, отписывать обработчики событий). Вызывается при <code>map.removeControl(control)</code> или <code>control.removeFrom(map)</code>. DOM контейнер элемента управления удаляется автоматически.</td>
    </tr>
</table>

### Пример реализации элемента управления

    var MyControl = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function (map) {
            // создает контейнер элемента управления с определенным именем класса
            var container = L.DomUtil.create('div', 'my-custom-control');

            // ... инициализирует другие DOM элементы, добавляет обработчики событий и т.п.

            return container;
        }
    });

    map.addControl(new MyControl());


Если вы задаете собственный конструктор элемента управления, тогда необходимо корректно обработать опции:

    var MyControl = L.Control.extend({
        initialize: function (foo, options) {
            // ...
            L.Util.setOptions(this, options);
        },
        // ...
    });

Это позволит передавать такие опции, как, например, `position` при создании объекта элемента управления:

    map.addControl(new MyControl('bar', {position: 'bottomleft'}));

## IProjection

Объект с методами для проецирования географических координат земной поверхности в плоские координаты (и обратно). См. [Картографическая проекция][118].

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>project</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Проецирует географические координаты в точку на плоскости.</td>
    </tr>
    <tr>
        <td><code><b>unproject</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>

        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Метод обратный методу <code>project</code>. Проецирует точку на плоскости в географические координаты.</td>
    </tr>
</table>

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