## Базовые типы данных

В данном разделе описаны классы базовых типов данных, которые часто встречаются на страницах руководства API карт
и которые необходимы для работы с многими объектами карты.

{toc}

### DG.LatLng

Географическая точка с определенной широтой и долготой.

    var latlng = DG.latLng(54.98, 82.89);

Все методы, которые принимают объекты LatLng, также принимают широту и долготу в виде простого массива или объекта
(если не указано иное), то есть данные записи эквивалентны:

    map.panTo([54.98, 82.89]);
    map.panTo({lon: 82.89, lat: 54.98});
    map.panTo({lat: 54.98, lng: 82.89});
    map.panTo(DG.latLng(54.98, 82.89));

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="latlng-l-latlng">
            <td><code><b>DG.latLng</b>(
                <nobr>&lt;Number&gt; <i>latitude</i>,</nobr>
                <nobr>&lt;Number&gt; <i>longitude</i>,</nobr>
                <nobr>&lt;Number&gt; <i>altitude?</i> )</nobr>
            </code></td>
            <td>Создает объект, представляющий географическую точку с определенной широтой и долготой
                (и опционально высотой).</td>
        </tr>
        <tr>
            <td><code><b>DG.latLng</b>(
                <nobr>&lt;Array&gt; <i>coords</i> )</nobr>
            </code></td>
            <td>Ожидает массив вида <code>[Number, Number]</code> или <code>[Number, Number, Number]</code>
                в качестве аргумента.</td>
        </tr>
        <tr>
            <td><code><b>DG.latLng</b>(
                <nobr>&lt;Object&gt; <i>coords</i> )</nobr>
            </code></td>
            <td>Ожидает объект вида <code>{lat: Number, lng: Number}</code> или
                <code>{lat: Number, lng: Number, alt: Number}</code> в качестве аргумента.</td>
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
        <tr id="latlng-equals">
            <td><code><b>equals</b>(
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>otherLatLng</i>,</nobr>
                <nobr>&lt;Number&gt; <i>maxMargin?</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если переданная широта и долгота находится в той же позиции
                (с небольшой погрешностью). Погрешность, используемую по умолчанию, можно изменить
                передав аргумент <code>maxMargin</code>.</td>
        </tr>
        <tr id="latlng-tostring">
            <td><code><b>toString</b>()</code></td>

            <td><code>String</code></td>
            <td>Возвращает строковое представление позиции (удобно при отладке).</td>
        </tr>
        <tr id="latlng-distanceto">
            <td><code><b>distanceTo</b>(
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>otherLatLng</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает расстояние (в метрах) до переданной широты и долготы, рассчитанное по
                <a target="_blank" href="http://en.wikipedia.org/wiki/Haversine_formula">формуле Haversine</a>.</td>
        </tr>
        <tr id="latlng-wrap">
            <td><code><b>wrap</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td><p>Возвращает новый объект <a href="#dglatlng"><code>LatLng</code></a>, в котором долгота нормализуется
                в диапазон от -180 до 180 градусов.</td>
        </tr>
        <tr id="latlng-tobounds">
            <td><code><b>toBounds</b>(
                <nobr>&lt;Number&gt; <i>sizeInMeters</i> )</nobr>
            </code></td>

            <td><code><a href="#dglatlngbounds">LatLngBounds</a></code></td>
            <td><p>Возвращает новый объект, <a href="#dglatlngbounds"><code>LatLngBounds</code></a> в котором
                каждая из границ отстоит от указанной точки на <code>sizeInMeters</code> метров.</td>
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
        <tr id="latlng-lat">
            <td><code><b>lat</b></code></td>
            <td><code>Number</code></td>
            <td>Широта в градусах.</td>
        </tr>
        <tr id="latlng-lng">
            <td><code><b>lng</b></code></td>
            <td><code>Number</code></td>
            <td>Долгота в градусах.</td>
        </tr>
        <tr id="latlng-alt">
            <td><code><b>alt</b></code></td>
            <td><code>Number</code></td>
            <td>Высота в метрах (опционально).</td>
        </tr>
    </tbody>
</table>

### DG.LatLngBounds

Описывает прямоугольную географическую область на карте.

    var southWest = DG.latLng(54.9801, 82.8974),
        northEast = DG.latLng(54.9901, 82.9074),
        bounds = DG.latLngBounds(southWest, northEast);

Все методы, которые принимают объекты LatLngBounds также принимают их в виде простого массива
(если не указано иное), то есть границы могут быть указаны, как в этом примере:

    map.fitBounds([
        [54.9801, 82.8974],
        [54.9901, 82.9074]
    ]);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="latlngbounds-l-latlngbounds">
            <td><code><b>DG.latLngBounds</b>(
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>southWest</i>,</nobr>
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>northEast</i> )</nobr>
            </code></td>
            <td>Создает объект <a href="#dglatlngbounds"><code>LatLngBounds</code></a>, определяя юго-западный и северо-восточный углы прямоугольника.</td>
        </tr>
        <tr>
            <td><code><b>DG.latLngBounds</b>(
                <nobr>&lt;LatLng[]&gt; <i>latlngs</i>)</nobr>
            </code></td>
            <td>Создает объект <a href="#dglatlngbounds"><code>LatLngBounds</code></a> на основе географических точек,
                которые находятся внутри описываемой области. Удобно использовать, если необходимо подстроить центр
                и масштаб карты с помощью метода <a href="/doc/maps/ru/manual/map#map-fitbounds">fitBounds</a>.</td>
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
        <tr id="latlngbounds-extend">
            <td><code><b>extend</b>(
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Расширяет область таким образом, чтобы в них входила переданная точка.</td>
        </tr>
        <tr>
            <td><code><b>extend</b>(
                <nobr>&lt;<a href="#dglatlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Расширяет область таким образом, чтобы в них входили переданные границы другой области.</td>
        </tr>
        <tr id="latlngbounds-pad">
            <td><code><b>pad</b>(
                <nobr>&lt;Number&gt; <i>bufferRatio</i> )</nobr>
            </code></td>

            <td><code><a href="#dglatlngbounds">LatLngBounds</a></code></td>
            <td>Возвращает бо́льшую область, увеличенную на заданный процент в каждом из направлений.</td>
        </tr>
        <tr id="latlngbounds-getcenter">
            <td><code><b>getCenter</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td>Возвращает центральную точку области.</td>
        </tr>
        <tr id="latlngbounds-getsouthwest">
            <td><code><b>getSouthWest</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td>Возвращает крайнюю юго-западную точку области.</td>
        </tr>
        <tr id="latlngbounds-getnortheast">
            <td><code><b>getNorthEast</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td>Возвращает крайнюю северо-восточную точку области.</td>
        </tr>
        <tr id="latlngbounds-getnorthwest">
            <td><code><b>getNorthWest</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td>Возвращает крайнюю северо-западную точку области.</td>
        </tr>
        <tr id="latlngbounds-getsoutheast">
            <td><code><b>getSouthEast</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td>Возвращает крайнюю юго-восточную точку области.</td>
        </tr>
        <tr id="latlngbounds-getwest">
            <td><code><b>getWest</b>()</code></td>

            <td><code>Number</code></td>
            <td>Возвращает западную границу (долготу) области.</td>
        </tr>
        <tr id="latlngbounds-getsouth">
            <td><code><b>getSouth</b>()</code></td>

            <td><code>Number</code></td>
            <td>Возвращает южную границу (широту) области.</td>
        </tr>
        <tr id="latlngbounds-geteast">
            <td><code><b>getEast</b>()</code></td>

            <td><code>Number</code></td>
            <td>Возвращает восточную границу (долготу) области.</td>
        </tr>
        <tr id="latlngbounds-getnorth">
            <td><code><b>getNorth</b>()</code></td>

            <td><code>Number</code></td>
            <td>Возвращает северную границу (широту) области.</td>
        </tr>
        <tr id="latlngbounds-contains">
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#dglatlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если область содержит переданные границы.</td>
        </tr>
        <tr id="latlngbounds-contains">
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
             </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если область содержит переданную точку.</td>
        </tr>
        <tr id="latlngbounds-intersects">
            <td><code><b>intersects</b>(
                <nobr>&lt;<a href="#dglatlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если границы области пересекают переданные границы хотя бы в одной точке.</td>
        </tr>
        <tr id="latlngbounds-overlaps">
            <td><code><b>overlaps</b>(
                <nobr>&lt;<a href="#dgbounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если границы области перекрывают переданные границы в некотором пространстве.</td>
        </tr>
        <tr id="latlngbounds-tobboxstring">
            <td><code><b>toBBoxString</b>()</code></td>

            <td><code>String</code></td>
            <td>Возвращает строку с координатами границ в формате <code>&#39;southwest_lng,southwest_lat,northeast_lng,northeast_lat&#39;</code>.
                Удобно использовать для отправки запросов к веб-сервисам, возвращающим геоданные.</td>
        </tr>
        <tr id="latlngbounds-equals">
            <td><code><b>equals</b>(
                <nobr>&lt;<a href="#dglatlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если координаты текущей прямоугольной области эквивалентны переданным
                (с небольшой погрешностью).</td>
        </tr>
        <tr id="latlngbounds-isvalid">
            <td><code><b>isValid</b>()</code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если свойства объекта (данные границ) инициализированы должным образом.</td>
        </tr>
    </tbody>
</table>

### DG.Point

Точка с пиксельными координатами x и y.

    var point = DG.point(200, 300);

Все методы, которые принимают объекты <a href="#dgpoint"><code>Point</code></a>, также принимают
координаты в виде простого массива (если не указано иное), то есть данные записи эквивалентны:

    map.panBy([200, 300]);
    map.panBy(DG.point(200, 300));

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="point-l-point">
            <td><code><b>DG.point</b>(
                <nobr>&lt;Number&gt; <i>x</i>,</nobr>
                <nobr>&lt;Number&gt; <i>y</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
            </code></td>
            <td>Создает объект Point с заданными координатами <code>x</code> и <code>y</code>, при необходимости
                округляя значения (если <code>round</code> установлен в <code>true</code>).</td>
        </tr>
        <tr id="point-l-point">
            <td><code><b>DG.point</b>(
                <nobr>&lt;Number[]&gt; <i>coords</i>)</nobr>
            </code></td>
            <td>Ожидает массив вида <code>[x, y]</code>.</td>
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
        <tr id="point-clone">
            <td><code><b>clone</b>()</nobr></code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает копию оригинального объекта.</td>
        </tr>
        <tr id="point-add">
            <td><code><b>add</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает результат сложения координат заданной точки и текущей.</td>
        </tr>
        <tr id="point-subtract">
            <td><code><b>subtract</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает результат вычитания координат заданной точки из текущей.</td>
        </tr>
        <tr id="point-divideby">
            <td><code><b>divideBy</b>(
                <nobr>&lt;Number&gt; <i>num</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает результат деления координат текущей точки на произвольное число.</td>
        </tr>
        <tr id="point-multiplyby">
            <td><code><b>multiplyBy</b>(
                <nobr>&lt;Number&gt; <i>num</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает результат умножения координат текущей точки на произвольное число.</td>
        </tr>
        <tr id="point-scaleby">
            <td><code><b>scaleBy</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>scale</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает новую точку, каждая координата которой получена умножением на соответствующую координату
                <code>scale</code>. В терминах линейной алгебры, данная операция производит умножение на
                <a href="https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation">матрицу масштабирования</a>,
                заданную <code>scale</code>.</td>
        </tr>
        <tr id="point-unscaleby">
            <td><code><b>unscaleBy</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>scale</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Обратная операция, относительно <code>scaleBy</code>.</td>
        </tr>
        <tr id="point-round">
            <td><code><b>round</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает копию оригинального объекта с округленными координатами.</td>
        </tr>
        <tr id="point-floor">
            <td><code><b>floor</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает копию оригинального объекта с координатами, округленными вниз.</td>
        </tr>
        <tr id="point-ceil">
            <td><code><b>ceil</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает копию оригинального объекта с координатами, округленными вверх.</td>
        </tr>
        <tr id="point-distanceto">
            <td><code><b>distanceTo</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает декартово расстояние между текущй и заданной точками.</td>
        </tr>
        <tr id="point-equals">
            <td><code><b>equals</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если заданная точка имеет аналогичные координаты.</td>
        </tr>
        <tr id="point-contains">
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если обе координаты заданной точки меньше (в абсолютных величинах) координат
                текущей точки.</td>
        </tr>
        <tr id="point-tostring">
            <td><code><b>toString</b>()</code></td>

            <td><code>String</code></td>
            <td>Возвращает строковое представление точки (удобно для отладки).</td>
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

### DG.Bounds

Описывает прямоугольную область на карте в пиксельных координатах.

    var p1 = DG.point(10, 10),
        p2 = DG.point(40, 60),
        bounds = DG.bounds(p1, p2);

Все методы, которые принимают объекты <a href="#dgpoint"><code>Point</code></a> также принимают их в виде простого массива
(если не указано иное), то есть границы могут быть указаны, как в этом примере:

    otherBounds.intersects([[10, 10], [40, 60]]);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="bounds-l-bounds">
            <td><code><b>DG.bounds</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>topLeft</i>,</nobr>
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>bottomRight</i> )</nobr>
            </code></td>
            <td>Создает объект Bounds на основе переданных координат (обычно, координат левого-верхнего и правого-нижнего углов).</td>
        </tr>
        <tr id="bounds-l-bounds">
            <td><code><b>DG.bounds</b>(
                <nobr>&lt;Point[]&gt; <i>points</i> )</nobr>
            </code></td>
            <td>Создает объект Bounds на основе массива координат переданных точек.</td>
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
        <tr id="bounds-extend">
            <td><code><b>extend</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Расширяет область таким образом, чтобы в нее входила переданная точка.</td>
        </tr>
        <tr id="bounds-getcenter">
            <td><code><b>getCenter</b>(
                <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает центральную точку области.</td>
        </tr>
        <tr id="bounds-getbottomleft">
            <td><code><b>getBottomLeft</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает координаты левого-нижнего угла области.</td>
        </tr>
        <tr id="bounds-gettopright">
            <td><code><b>getTopRight</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает координаты правого-верхнего угла области.</td>
        </tr>
        <tr id="bounds-getsize">
            <td><code><b>getSize</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Возвращает размер области.</td>
        </tr>
        <tr id="bounds-contains">
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#dgbounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если область содержит переданные границы.</td>
        </tr>
        <tr id="bounds-contains">
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если область содержит переданную точку.</td>
        </tr>
        <tr id="bounds-intersects">
            <td><code><b>intersects</b>(
                <nobr>&lt;<a href="#dgbounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если границы области пересекают переданные границы хотя бы в одной точке.</td>
        </tr>
        <tr id="bounds-overlaps">
            <td><code><b>overlaps</b>(
                <nobr>&lt;<a href="#dgbounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если границы области перекрывают переданные границы в некотором пространстве.</td>
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
        <tr id="bounds-min">
            <td><code><b>min</b></code></td>
            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Левый верхний угол прямоугольной области.</td>
        </tr>
        <tr id="bounds-max">
            <td><code><b>max</b></code></td>
            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Правый нижний угол прямоугольной области.</td>
        </tr>
	</tbody>
</table>
