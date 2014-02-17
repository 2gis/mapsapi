## Базовые классы

{toc}

### Описание

В данном разделе описаны базовые классы, которые часто встречаются на страницах руководства API карт и необходимы для работы с многими объектами карты.

### Класс DG.LatLng

Географическая точка с определенной широтой и долготой.

    var latlng = DG.latLng(54.98, 82.89);

Все методы, которые принимают объекты LatLng также принимают широту и долготу в виде простого массива или объекта, то есть данные записи эквивалентны:

    map.panTo(DG.latLng(54.98, 82.89));
    map.panTo([54.98, 82.89]);
    map.panTo({lng: 82.89, lat: 54.98});
    map.panTo({lat: 54.98, lng: 82.89});

#### Конструктор

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Использование</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code><b>DG.LatLng</b>(
                &lt;Number&gt; <i>latitude</i>,
                &lt;Number&gt; <i>longitude</i>,
                &lt;Number&gt; <i>altitude?</i> )</code>
            </td>
            <td>
                <code>DG.latLng(…)</code>
                <code>DG.latLng([…])</code>
            </td>
            <td>Создает объект, представляющий географическую точку с определенной широтой и долготой (и опционально высотой).</td>
        </tr>
    </tbody>
</table>

#### Свойства

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
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
    </tbody>
</table>

#### Методы

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>distanceTo</b>(
                <nobr>&lt;<a href="#класс-dglatlng">LatLng</a>&gt; <i>otherLatlng</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает расстояние (в метрах) до переданной широты и долготы, рассчитывается по формуле Haversine. См. <a target="_blank" href="http://en.wikipedia.org/wiki/Haversine_formula">описание в Wikipedia</a></td>
        </tr>
        <tr>
            <td><code><b>equals</b>(
                <nobr>&lt;<a href="#класс-dglatlng">LatLng</a>&gt; <i>otherLatlng</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если переданная широта и долгота находится в той же позиции (с небольшой погрешностью).</td>
        </tr>
        <tr>
            <td><code><b>toString</b>()</code></td>
            <td><code>String</code></td>
            <td>Возвращает строковое представление точки (для отладки).</td>
        </tr>
    </tbody>
</table>

#### Константы

<table>
    <thead>
        <tr>
            <th>Константа</th>
            <th>Тип</th>
            <th>Значение</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>DEG_TO_RAD</b></code></td>
            <td><code>Number</code></td>
            <td><code>Math.PI / 180</code></td>
            <td>Коэффициент для конвертации градусов в радианы.</td>
        </tr>
        <tr>
            <td><code><b>RAD_TO_DEG</b></code></td>
            <td><code>Number</code></td>
            <td><code>180 / Math.PI</code></td>
            <td>Коэффициент для конвертации радиан в градусы.</td>
        </tr>
        <tr>
            <td><code><b>MAX_MARGIN</b></code></td>
            <td><code>Number</code></td>
            <td><code>1.0E-9</code></td>
            <td>Максимальная погрешность для проверки равенства.</td>
        </tr>
    </tbody>
</table>

### Класс DG.LatLngBounds

Прямоугольная географическая область на карте.

    var southWest = DG.latLng(54.9801, 82.8974),
        northEast = DG.latLng(54.9901, 82.9074),
        bounds = DG.latLngBounds(southWest, northEast);

Все методы, которые принимают объекты LatLngBounds также принимают их в виде простого массива, то есть границы могут быть указаны как в этом примере:

    map.fitBounds([
        [54.9801, 82.8974],
        [54.9901, 82.9074]
    ]);

#### Конструктор

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Использование</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <code><b>DG.LatLngBounds</b>(
                <nobr>&lt;<a href="#класс-dglatlng">LatLng</a>&gt; <i>southWest</i></nobr>,
                <nobr>&lt;<a href="#класс-dglatlng">LatLng</a>&gt; <i>northEast</i> )</nobr></code>
            </td>

            <td>
                <code>DG.latLngBounds(&hellip;)</code><br />
                <code>DG.latLngBounds([&hellip;])</code>
            </td>

            <td>Создает объект LatLngBounds с определенными юго-западным и северо-восточным углами прямоугольника.</td>
        </tr>
        <tr>
            <td><code><b>DG.LatLngBounds</b>(
                <nobr>&lt;<a href="#класс-dglatlng">LatLng</a>[]&gt; <i>latlng</i> )</nobr>
            </code></td>
            <td>
                <code>DG.latLngBounds(&hellip;)</code>
            </td>
            <td>Создает объект LatLngBounds на основе географических точек, которые находятся внутри. Удобно использовать, если необходимо подстроить центр и масштаб карты с помощью метода <a href="/doc/2.0/maps/manual/map#map-fitbounds">fitBounds</a>.</td>
        </tr>
    </tbody>
</table>

#### Методы

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>extend</b>(
                <nobr>&lt;<a href="#класс-dglatlng">LatLng</a>&nbsp;|&nbsp;<a href="#класс-dglatlngbounds">LatLngBounds</a>&gt; <i>latlng</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Расширяет границы таким образом, чтобы в них входила переданная точка или другие границы.</td>
        </tr>
        <tr>
            <td><code><b>getSouthWest</b>()</code></td>
            <td><code><a href="#класс-dglatlng">LatLng</a></code></td>
            <td>Возвращает юго-западную точку границ.</td>
        </tr>
        <tr>
            <td><code><b>getNorthEast</b>()</code></td>
            <td><code><a href="#класс-dglatlng">LatLng</a></code></td>
            <td>Возвращает северо-восточную точку границ.</td>
        </tr>
        <tr>
            <td><code><b>getNorthWest</b>()</code></td>
            <td><code><a href="#класс-dglatlng">LatLng</a></code></td>
            <td>Возвращает северо-западную точку границ.</td>
        </tr>
        <tr>
            <td><code><b>getSouthEast</b>()</code></td>
            <td><code><a href="#класс-dglatlng">LatLng</a></code></td>
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
            <td><code><a href="#класс-dglatlng">LatLng</a></code></td>
            <td>Возвращает центральную точку прямоугольной области.</td>
        </tr>
        <tr>
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#класс-dglatlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если текущий прямоугольник содержит внутри себя переданный прямоугольник.</td>
        </tr>
        <tr>
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#класс-dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если прямоугольник содержит внутри себя переданную точку.</td>
        </tr>
        <tr>
            <td><code><b>intersects</b>(
                <nobr>&lt;<a href="#класс-dglatlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если текущий прямоугольник пересекается с переданным прямоугольником.</td>
        </tr>
        <tr>
            <td><code><b>equals</b>(
                <nobr>&lt;<a href="#класс-dglatlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
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
            <td><code><a href="#класс-dglatlngbounds">LatLngBounds</a></code></td>
            <td>Возвращает большие границы, созданные путем расширения текущих границ на заданный процент в каждом направлении.</td>
        </tr>
        <tr>
            <td><code><b>isValid</b>()</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если если свойства границ инициализированы.</td>
        </tr>
    </tbody>
</table>

### Класс DG.Point

Точка с пиксельными координатами x и y.

    var point = DG.point(200, 300);

Все методы, которые принимают объекты Point также принимают координаты в виде простого массива, то есть данные записи эквивалентны:

    map.panBy([200, 300]);
    map.panBy(DG.point(200, 300));

#### Конструктор

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Использование</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>DG.Point</b>(
                <nobr>&lt;Number&gt; <i>x</i>, &lt;Number&gt; <i>y</i></nobr>,
                <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
            </code></td>

            <td>
                <code>DG.point(&hellip;)</code><br />
                <code>DG.point([&hellip;])</code>
            </td>

            <td>Создает объект Point с координатами <code>x</code> и <code>y</code>. Если опциональный параметр <code>round</code> передан со значением <code>true</code>, тогда координаты будут округлены.</td>
        </tr>
    </tbody>
</table>

#### Свойства

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
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
    </tbody>
</table>

#### Методы

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>add</b>(
                <nobr>&lt;<a href="#класс-dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code><a href="#класс-dgpoint">Point</a></code></td>
            <td>Возвращает результат сложения текущей и переданной точек.</td>
        </tr>
        <tr>
            <td><code><b>subtract</b>(
                <nobr>&lt;<a href="#класс-dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code><a href="#класс-dgpoint">Point</a></code></td>
            <td>Возвращает результат вычитания переданной точки из текущей.</td>
        </tr>
        <tr>
            <td><code><b>multiplyBy</b>(
                <nobr>&lt;Number&gt; <i>number</i> )</nobr>
            </code></td>

            <td><code><a href="#класс-dgpoint">Point</a></code></td>
            <td>Возвращает результат умножения текущей точки на переданное число.</td>
        </tr>
        <tr>
            <td><code><b>divideBy</b>(
                <nobr>&lt;Number&gt; <i>number</i></nobr>,
                <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
            </code></td>

            <td><code><a href="#класс-dgpoint">Point</a></code></td>
            <td>Возвращает результат деления текущей точки на переданное число. Если опциональный параметр <code>round</code> передан со значением <code>true</code>, тогда результат будет округлен.</td>
        </tr>
        <tr>
            <td><code><b>distanceTo</b>(
                <nobr>&lt;<a href="#класс-dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает расстояние между текущей и переданной точками.</td>
        </tr>
        <tr>
            <td><code><b>clone</b>()</code></td>
            <td><code><a href="#класс-dgpoint">Point</a></code></td>
            <td>Возвращает копию текущей точки.</td>
        </tr>
        <tr>
            <td><code><b>round</b>()</code></td>
            <td><code><a href="#класс-dgpoint">Point</a></code></td>
            <td>Возвращает копию текущей точки с округленными координатами.</td>
        </tr>
        <tr>
            <td><code><b>floor</b>()</code></td>
            <td><code><a href="#класс-dgpoint">Point</a></code></td>
            <td>Возвращает копию текущей точки с округленными в меньшую сторону координатами.</td>
        </tr>
        <tr>
            <td><code><b>equals</b>(
                <nobr>&lt;<a href="#класс-dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если переданная точка имеет такие же координаты, как и текущая.</td>
        </tr>
        <tr>
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#класс-dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если обе координаты переданной точки меньше соотвествующих координат текущей точки.</td>
        </tr>
        <tr>
            <td><code><b>toString</b>()</code></td>
            <td><code>String</code></td>
            <td>Возвращает строковое представление точки (для отладки).</td>
        </tr>
    </tbody>
</table>

### Класс DG.Bounds

Прямоугольная область на карте в пиксельных координатах.

    var p1 = DG.point(10, 10),
        p2 = DG.point(40, 60),
        bounds = DG.bounds(p1, p2);

Все методы, которые принимают объекты Bounds также принимают их в виде простого массива, то есть границы могут быть указаны как в этом примере:

    otherBounds.intersects([[10, 10], [40, 60]]);

#### Конструктор

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Использование</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>DG.Bounds</b>(
                <nobr>&lt;<a href="#класс-dgpoint">Point</a>&gt; <i>topLeft</i></nobr>,
                <nobr>&lt;<a href="#класс-dgpoint">Point</a>&gt; <i>bottomRight</i> )</nobr>
            </code></td>

            <td>
                <code>DG.bounds(&hellip;)</code><br />
                <code>DG.bounds([&hellip;])</code>
            </td>

            <td>Создает объект Bounds на основе левого верхнего и правого нижнего углов.</td>
        </tr>
        <tr>
            <td><code><b>DG.Bounds</b>(
                <nobr>&lt;<a href="#класс-dgpoint">Point</a>[]&gt; <i>points</i> )</nobr>
            </code></td>

            <td>
                <code>DG.bounds(&hellip;)</code>
            </td>

            <td>Создает объект Bounds на основе точек, которые будут в него входить.</td>
        </tr>
    </tbody>
</table>

#### Свойства

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>min</b></code></td>
            <td><code><a href="#класс-dgpoint">Point</a></code>
            <td>Левый верхний угол прямоугольника.</td>
        </tr>
        <tr>
            <td><code><b>max</b></code></td>
            <td><code><a href="#класс-dgpoint">Point</a></code>
            <td>Правый нижний угол прямоугольника.</td>
        </tr>
    </tbody>
</table>

#### Методы

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>extend</b>(
                <nobr>&lt;<a href="#класс-dgpoint">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td>-</td>
            <td>Расширяет границы таким образом, чтобы в них входила переданная точка.</td>
        </tr>
        <tr>
            <td><code><b>getCenter</b>()</code></td>
            <td><code><a href="#класс-dgpoint">Point</a></code></td>
            <td>Возвращает центральную точку прямоугольной области.</td>
        </tr>
        <tr>
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#класс-dgbounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если текущий прямоугольник содержит внутри себя переданный прямоугольник.</td>
        </tr>
        <tr>
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#класс-dgpoint">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если прямоугольник содержит внутри себя переданную точку.</td>
        </tr>
        <tr>
            <td><code><b>intersects</b>(
                <nobr>&lt;<a href="#класс-dgbounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
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

            <td><code><a href="#класс-dgpoint">Point</a></code></td>
            <td>Возвращает размер прямоугольника.</td>
        </tr>
    </tbody>
</table>