## Векторные слои

В данном разделе рассматривается работа с векторными слоями, представляющие собой геометрические
объекты на карте: окружности, ломаные линии, многоугольники.

{toc}

### DG.Path

Абстрактный класс, содержащий базовые опции и константы векторных слоев (Polygon, Polyline, Circle).
Не используйте этот класс напрямую. Расширяет <a href="/doc/maps/ru/manual/base-classes#dglayer">Layer</a>.

#### Опции

<table id="dgpath-options">
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="path-stroke">
            <td><code><b>stroke</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Нужно ли рисовать границу фигуры. Установите значение в <code>false</code>,
                чтобы отключить границы многоугольников или окружностей.</td>
        </tr>
        <tr id="path-color">
            <td><code><b>color</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;#3388ff&#x27;</code></td>
            <td>Цвет границы.</td>
        </tr>
        <tr id="path-weight">
            <td><code><b>weight</b></code></td>
            <td><code>Number </code></td>
            <td><code>3</code></td>
            <td>Ширина границы в пикселях.</td>
        </tr>
        <tr id="path-opacity">
            <td><code><b>opacity</b></code></td>
            <td><code>Number </code></td>
            <td><code>1.0</code></td>
            <td>Прозрачность границы.</td>
        </tr>
        <tr id="path-linecap">
            <td><code><b>lineCap</b></code></td>
            <td><code>String</code></td>
            <td><code>&#x27;round&#x27;</code></td>
            <td>Строка, которая определяет вид границы,
                <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap">
                на концах ломаной</a>.</td>
        </tr>
        <tr id="path-linejoin">
            <td><code><b>lineJoin</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;round&#x27;</code></td>
            <td>Строка, которая определяет вид границы,
                <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin">
                на изгибах</a> ломаной.</td>
        </tr>
        <tr id="path-dasharray">
            <td><code><b>dashArray</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
            <td>Строка <a target="_blank" href="https://developer.mozilla.org/en/SVG/Attribute/stroke-dasharray">шаблона границы</a>.
                Не работает на canvas слоях (например, Android 2).</td>
        </tr>
        <tr id="path-dashoffset">
            <td><code><b>dashOffset</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
            <td>Строка, которая определяет
                <a href="https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset">расстояние,
                через которое начинается штриховка</a>. Не работает на canvas слоях (например, Android 2).</td>
        </tr>
        <tr id="path-fill">
            <td><code><b>fill</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>depends</code></td>
            <td>Заполнять ли фигуру цветом. Установите значение в <code>false</code>,
                чтобы отключить заполнение многоугольников или окружностей.</td>
        </tr>
        <tr id="path-fillcolor">
            <td><code><b>fillColor</b></code></td>
            <td><code>String </code></td>
            <td><code>*</code></td>
            <td>Цвет заливки. Цвет по умолчанию определяется опцией <a href="#path-color"><code>color</code></a>.</td>
        </tr>
        <tr id="path-fillopacity">
            <td><code><b>fillOpacity</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.2</code></td>
            <td>Прозрачность заливки.</td>
        </tr>
        <tr id="path-fillrule">
            <td><code><b>fillRule</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;evenodd&#x27;</code></td>
            <td>Строка, которая задает,
                <a href="https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule">как определяется
                внутренняя область фигуры</a>.</td>
        </tr>
        <tr id="path-interactive">
            <td><code><b>interactive</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Если <code>false</code>, векторный слой не будет генерировать события мыши и будет
                вести себя, как часть нижележащего слоя карты.</td>
        </tr>
        <tr id="path-renderer">
            <td><code><b>renderer</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#dgrenderer">Renderer</a></code></td>
            <td><code></code></td>
            <td>Использовать этот экземпляр <a href="/doc/maps/ru/manual/base-classes#dgrenderer"><code>Renderer</code></a>
                для данного векторного объекта. Переопределяет
                <a href="/doc/maps/ru/manual/map#map-renderer">renderer карты</a>, установленный по умолчанию.</td>
        </tr>
        <tr id="path-classname">
            <td><code><b>className</b></code></td>
            <td><code>string </code></td>
            <td><code>null</code></td>
            <td>Добавляет класс в соотвествующий атрибут элемента (только для SVG).</td>
        </tr>
    </tbody>
</table>

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Методы

<table id="dgpath-methods">
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="path-redraw">
            <td><code><b>redraw</b>()</code></td>
            <td><code>this</code></td>
            <td>Перерисовывает слой. Удобно при изменении его координат.</td>
        </tr>
        <tr id="path-setstyle">
            <td><code>
                <b>setStyle</b>(
                <nobr>&lt;<a href="#dgpath-options">Path options</a>&gt; <i>style</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Изменяет внешний вид объекта с помощью <a href="#dgpath-options">опций класса Path</a>.</td>
        </tr>
        <tr id="path-bringtofront">
            <td><code><b>bringToFront</b>()</code></td>
            <td><code>this</code></td>
            <td>Позиционирует слой поверх всех остальных.</td>
        </tr>
        <tr id="path-bringtoback">
            <td><code><b>bringToBack</b>()</code></td>
            <td><code>this</code></td>
            <td>Позиционирует слой под остальными.</td>
        </tr>
    </tbody>
</table>

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.Polyline

Класс для отрисовки ломаных линий на карте. Расширяет <a href="#dgpath">Path</a>.

#### Пример использования

    // создает ломаную красного цвета из массива точек LatLng
    var latlngs = [
        [-122.68, 45.51],
        [-122.43, 37.77],
        [-118.2, 34.04]
    ];
    var polyline = DG.polyline(latlngs, {color: 'red'}).addTo(map);
    // увеличиваем масштаб так, чтобы было видно всю ломаную
    map.fitBounds(polyline.getBounds());

Вы также можете передать многомерный массиив, который представляет собой фигуру MultiPolyline:

    // создает красную ломаную из массива массивов точек LatLng
    var latlngs = [
        [[-122.68, 45.51],
         [-122.43, 37.77],
         [-118.2, 34.04]],
        [[-73.91, 40.78],
         [-87.62, 41.83],
         [-96.72, 32.76]]
    ];

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Использование</th>
        </tr>
	</thead>
    <tbody>
        <tr id="polyline-dg-polyline">
            <td><code><b>DG.polyline</b>(
                <nobr>&lt;LatLng[]&gt; <i>latlngs</i></nobr>,
                <nobr>&lt;<a href="#dgpath-options">Path options</a>&gt; <i>options?</i>)</nobr>
            </code></td>
            <td>Создает объект ломаной по переданному массиву географических точек и необязательному объекту опций.
                Вы можете создать объект <a href="#dgpolyline"><code>Polyline</code></a>, состоящий из
                множества линий (так называемый <code>MultiPolyline</code>), передав массив массивов
                географических точек.</td>
        </tr>
    </tbody>
</table>

#### Опции

<table id="dgpolyline-options">
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="polyline-smoothfactor">
            <td><code><b>smoothFactor</b></code></td>
            <td><code>Number </code>
            <td><code>1.0</code></td>
            <td>Степень упрощения ломаной на каждом уровне масштаба. Большее значение означает более высокую
                производительность, но худшее качество, меньшее же значение &mdash; наоборот.</td>
        </tr>
        <tr id="polyline-noclip">
            <td><code><b>noClip</b></code></td>
            <td><code>Boolean: false</code>
            <td><code></code></td>
            <td>Отключает отсечение ломаной.</td>
        </tr>
    </tbody>
</table>

Опции, унаследованные от <a href="#dgpath-options">Path</a> <!-- TODO: include options -->

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапов, унаследованные <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Методы

<table id="dgpolyline-methods">
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="polyline-togeojson">
            <td><code><b>toGeoJSON</b>()</code></td>
            <td><code>Object</code></td>
            <td>Возвращает <a href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a>
                представление ломаной (GeoJSON LineString или <code>MultiLineString</code>).</td>
        </tr>
        <tr id="polyline-getlatlngs">
            <td><code><b>getLatLngs</b>()</code></td>
            <td><code>LatLng[]</code></td>
            <td>Возвращает массив точек объекта или массив массивов точек, в случае мультиломаной.</td>
        </tr>
        <tr id="polyline-setlatlngs">
            <td><code><b>setLatLngs</b>(<nobr>&lt;LatLng[]&gt; <i>latlngs</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Заменяет все точки ломаной данными из переданного массива.</td>
        </tr>
        <tr id="polyline-isempty">
            <td><code><b>isEmpty</b>()</code></td>
            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если у Polyline нет точек LatLngs.</td>
        </tr>
        <tr id="polyline-getcenter">
            <td><code><b>getCenter</b>()</code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Возвращает центр (<a href="http://en.wikipedia.org/wiki/Centroid">centroid</a>) ломаной.</td>
        </tr>
        <tr id="polyline-getbounds">
            <td><code><b>getBounds</b>()</code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlngbounds">LatLngBounds</a></code></td>
            <td>Возвращает границы ломаной.</td>
        </tr>
        <tr id="polyline-addlatlng">
            <td><code><b>addLatLng</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr>
                <nobr>&lt;LatLng[]&gt; <i>latlngs?</i></nobr>,
            </code></td>
            <td><code>this</code></td>
            <td>Добавляет точку в ломаную. По умолчанию, добавляет точку в первое звено
                списка ломаных в случае мультиломаной. Это поведение может быть переопределено передачей
                определенного звена, как массива элементов LatLng (к которому вы могли получить
                доступ ранее, с помощью метода <a href="#polyline-getlatlngs">getlatlngs</a>).</td>
        </tr>
    </tbody>
</table>

Методы, унаследованные от <a href="#dgpath-methods">Path</a> <!-- TODO: include methods -->

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.Polygon

Класс для отрисовки многоугольников на карте. Расширяет <a href="#dgpolyline">Polyline</a>.

Обратите внимание на то, что среди точек, которые передаются для создания многоугольника, не должно быть
дополнительной точки, совпадающей с первой - такие точки лучше предварительно отфильтровать.

#### Пример использования

    // создает красный многоугольник из массива точек LatLng
    var latlngs = [[-111.03, 41],[-111.04, 45],[-104.05, 45],[-104.05, 41]];
    var polygon = DG.polygon(latlngs, {color: 'red'}).addTo(map);

    // увеличивает масштаб карты до максимального значения, при котором виден весь многоугольник
    map.fitBounds(polygon.getBounds());

Возможно также создать многоугольник с дырами, передав массив массивов latlngs,
первый latlngs массив отвечает за внешние границы, остальные описывают области внутри.

    var latlngs = [
      [[-111.03, 41],[-111.04, 45],[-104.05, 45],[-104.05, 41]], // внешняя граница
      [[-108.58,37.29],[-108.58,40.71],[-102.50,40.71],[-102.50,37.29]] // дыра
    ];

Также, вы можете передать многомерный массив, который представляет собой мульти-многоугольник (MultiPolygon).

    var latlngs = [
      [ // первый многоугольник
        [[-111.03, 41],[-111.04, 45],[-104.05, 45],[-104.05, 41]], // внешняя граница
        [[-108.58,37.29],[-108.58,40.71],[-102.50,40.71],[-102.50,37.29]] // дыра
      ],
      [ // второй многоугольник
        [[-109.05, 37],[-109.03, 41],[-102.05, 41],[-102.04, 37],[-109.05, 38]]
      ]
    ];

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="polygon-dg-polygon">
            <td><code>
                <b>DG.polygon</b>(
                <nobr>&lt;LatLng[]&gt; <i>latlngs</i></nobr>,
                <nobr>&lt;Polyline options&gt; <i>options?</i>)</nobr>
            </code></td>
            <td></td>
        </tr>
    </tbody>
</table>


#### Опции

Опции, унаследованные от <a href="#dgpolyline-options">Polyline</a> <!-- TODO: include options -->

Опции, унаследованные от <a href="#dgpath-options">Path</a> <!-- TODO: include options -->

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапов, унаследованные <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Методы

<span id="#dgpolygon-methods"></span>

Методы, унаследованные от <a href="#dgpolyline-methods">Polyline</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="#dgpath-methods">Path</a> <!-- TODO: include methods -->

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.Rectangle

Класс для отрисовки прямоугольников на карте. Расширяет <a href="#dgpolygon">Polygon</a>.

#### Пример использования

    // создаем географические границы прямоугольника
    var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];

    // создаем оранжевый прямоугольник
    DG.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);

    // подстраиваем центр карты и масштаб так, чтобы прямоугольник было видно
    map.fitBounds(bounds);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="rectangle-dg-rectangle">
            <td><code>
                <b>DG.rectangle</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>latLngBounds</i></nobr>,
                <nobr>&lt;Polyline options&gt; <i>options?</i>)</nobr>
            </code></td>
            <td></td>
        </tr>
    </tbody>
</table>

#### Опции

Опции, унаследованные от <a href="#dgpolyline-options">Polyline</a> <!-- TODO: include options -->

Опции, унаследованные от <a href="#dgpath-options">Path</a> <!-- TODO: include options -->

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапов, унаследованные <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

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
        <tr id="rectangle-setbounds">
            <td><code><b>setBounds</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>latLngBounds</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Перерисовывает прямоугольник с новыми границами.</td>
        </tr>
    </tbody>
</table>


Методы, унаследованные от <a href="#dgpolygon-method">Polygon</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="#dgpath-methods">Path</a> <!-- TODO: include methods -->

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.Circle

Класс для отрисовки окружности на карте. Расширяет <a href="#dgpath">Path</a>. Это аппроксимация, которая начинает
отличаться от настоящей окружности ближе к полюсам (из-за искажений проекции).

#### Пример использование

    DG.circle([50.5, 30.5], 200).addTo(map);

#### Создние

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="circle-dg-circle">
            <td><code>
                <b>DG.circle</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;<a href="#dgpath-options">Path options</a>&gt; <i>options?</i>)</nobr>
            </code></td>
            <td>Создает объект круга по переданной географической точке и
                объекту опций, в котором содежится радиус круга.</td>
        </tr>
        <tr id="circle-dg-circle-2">
            <td><code><b>DG.circle</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                <nobr>&lt;Number&gt; <i>radius</i></nobr>,
                <nobr>&lt;<a href="#dgpath-options">Path options</a>&gt; <i>options?</i>)</nobr>
            </code></td>
            <td>Устаревший способ создания круга, только для совместимости со старым кодом.
                Не используйте его в своих новых приложениях и плагинах.</td>
        </tr>
    </tbody>
</table>

#### Опции

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="circle-radius">
            <td><code><b>radius</b></code></td>
            <td><code>Number</code>
            <td><code></code></td>
            <td>Радиус круга в метрах.</td>
        </tr>
    </tbody>
</table>

Опции, унаследованные от <a href="#dgpath-options">Path</a> <!-- TODO: include options -->

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапов, унаследованные <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

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
        <tr id="circle-setradius">
            <td><code>
                <b>setRadius</b>(
                <nobr>&lt;Number&gt; <i>radius</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Устанавливает радиус окружности в метрах</td>
        </tr>
        <tr id="circle-getradius">
            <td><code><b>getRadius</b>()</code></td>
            <td><code>Number</code></td>
            <td>Возвращает текущий радиус окружности в метрах</td>
        </tr>
        <tr id="circle-getbounds">
            <td><code><b>getBounds</b>()</code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlngbounds">LatLngBounds</a></code></td>
            <td>Возвращает <a href="/doc/maps/ru/manual/basic-types#dglatlngbounds"><code>LatLngBounds</code></a>
                объекта.</td>
        </tr>
    </tbody>
</table>

Методы, унаследованные от <a href="#dgcirclemarker-methods">CircleMarker</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="#dgpath-methods">Path</a> <!-- TODO: include methods -->

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.CircleMarker

Окружность фиксированного размера с радиусом указанным в пикселях. Расширяет <a href="#класс-dgpath">Path</a>.

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="circlemarker-dg-circlemarker">
            <td><code>
                <b>DG.circleMarker</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                <i>options</i>)</code></td>
            <td>Создает объект круглого маркера по переданной географической точке и необязательному объекту опций.</td>
        </tr>
    </tbody>
</table>

#### Опции

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="circlemarker-radius">
            <td><code><b>radius</b></code></td>
            <td><code>Number </code></td>
            <td><code>10</code></td>
            <td>Радиус маркера в пикселях</td>
        </tr>
    </tbody>
</table>

Опции, унаследованные от <a href="#dgpath-options">Path</a> <!-- TODO: include options -->

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Методы

<table id="dgcirclemarker-methods">
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="circlemarker-togeojson">
            <td><code><b>toGeoJSON</b>()</code></td>
            <td><code>Object</code></td>
            <td>Возвращает <a href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a> представление круглого маркера
                (GeoJSON Point).</td>
        </tr>
        <tr id="circlemarker-setlatlng">
            <td><code><b>setLatLng</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latLng</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Устанавливает географическую позицию круглого маркера.</td>
        </tr>
        <tr id="circlemarker-getlatlng">
            <td><code><b>getLatLng</b>()</code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Возвращает текущую географическую позицию круглого маркера.</td>
        </tr>
        <tr id="circlemarker-setradius">
            <td><code><b>setRadius</b>(<nobr>&lt;Number&gt; <i>radius</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Устанавливает радиус окружности, значение в пикселях.</td>
        </tr>
        <tr id="circlemarker-getradius">
            <td><code><b>getRadius</b>()</code></td>
            <td><code>Number</code></td>
            <td>Возвращает текущее значение радиуса окружности.</td>
        </tr>
    </tbody>
</table>

Методы, унаследованные от <a href="#dgpath-methods">Path</a> <!-- TODO: include methods -->

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.Svg

Данный класс позволяет отображать векторные слои с помощью <a href="https://developer.mozilla.org/docs/Web/SVG">SVG</a>.
Наследуется от <a href="/doc/maps/ru/manual/base-classes#dgrenderer">Renderer</a>.

Из-за <a href="http://caniuse.com/#search=svg">технических ограничений</a>, SVG доступен не во всех браузерах
(например, Android версий 2.x и 3.x не поддерживает SVG).

SVG не доступен в IE8, но в этом браузере есть поддержка устаревшей технологии
<a href="https://en.wikipedia.org/wiki/Vector_Markup_Language">VML</a>, и SVG renderer переключится на использование
VML, в случае работы под IE8. Поддержка VML в библиотеке существует только для обратной совместимости со старой версией
Internet Explorer.

#### Пример использования

Использование SVG по умолчанию для всех векторных объектов на карте:

    var map = DG.map("map", {
        renderer: DG.svg();
    });

Использование SVG rendrer с дополнительными отступами для определенных векторных объектов:

    var map = DG.map("map");
    var myRenderer = DG.svg({ padding: 0.5 });
    var line = DG.polyline( coordinates, { renderer: myRenderer } );
    var circle = DG.circle( center, { renderer: myRenderer } );

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="svg-dg-svg">
            <td><code><b>DG.svg</b>(<nobr>&lt;SVG options&gt; <i>options?</i>)</nobr></code></td>
            <td>Создает SVG renderer, используя указанные опции.</td>
        </tr>
    </tbody>
</table>

#### Опции

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgrenderer-options">Renderer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Методы

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

#### Функции

Есть несколько статических функций, которые могут быть вызваны без создания объекта DG.SVG:

<table>
    <thead>
        <tr>
            <th>Функция</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="svg-create">
            <td><code><b>create</b>(<nobr>&lt;String&gt; <i>name</i>)</nobr></code></td>
            <td><code>SVGElement</code></td>
            <td>Возвращает экземпляр <a href="https://developer.mozilla.org/docs/Web/API/SVGElement">SVGElement</a>,
                соответствуйщий имени класса, переданному как аргумент. Например, использование &#39;line&#39; вернет
                экземпляр <a href="https://developer.mozilla.org/docs/Web/API/SVGLineElement">SVGLineElement</a>.</td>
        </tr>
        <tr id="svg-pointstopath">
            <td><code>
                <b>pointsToPath</b>(
                <nobr>&lt;[]&gt; <i>rings</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>closed</i>)</nobr>
            </code></td>
            <td><code>String</code></td>
            <td>Генерирует строку SVG path для множества звеньев, каждое звено превращается
                в &quot;M..L..L..&quot;-инструкции </td>
        </tr>
    </tbody>
</table>

### DG.Canvas

Позволяет отрисовывать векторные слои с помощью <a href="https://developer.mozilla.org/docs/Web/API/Canvas_API">canvas</a>.
Наследуется от <a href="/doc/maps/ru/manual/base-classes#dgrenderer">Renderer</a>.
В виду <a href="http://caniuse.com/#search=canvas">технических ограничений</a>, Canvas доступен
не во всех браузерах (например, в IE8) и пересекающиеся объекты могут отображаться некорректно,
в некоторых крайних случаях.

#### Пример использована

Использование Canvas по умолчанию для всех векторных объектов на карте:

    var map = DG.map('map', {
        renderer: DG.canvas();
    });

Использование Canvas с дополнительными отступами, для определенных векторных объектов:

    var map = DG.map('map');
    var myRenderer = DG.canvas({ padding: 0.5 });
    var line = DG.polyline( coordinates, { renderer: myRenderer } );
    var circle = DG.circle( center, { renderer: myRenderer } );

#### Создание Canvas

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="canvas-dg-canvas">
            <td><code><b>DG.canvas</b>(<nobr>&lt;Canvas options&gt; <i>options?</i>)</nobr></code></td>
            <td>Создает Canvas renderer, используя переданные опции.</td>
        </tr>
    </tbody>
</table>

#### Опции

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgrenderer-options">Renderer</a> <!-- TODO: include options -->

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Методы

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->
