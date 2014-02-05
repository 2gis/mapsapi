## Класс DG.GeoJSON

{toc}

### Описание

Считывает данные в формате <a href="http://geojson.org/geojson-spec.html" target="_blank">GeoJSON</a> и отображает их на карте. Расширяет [FeatureGroup](/doc/2.0/maps/manual/groups#класс-dgfeaturegroup).

### Пример использования

Считывает GeoJSON данные, которые находятся в переменной `data` и отображает их на карте:

    var data = {
        "type": "Feature",
        "properties": {
            "address": "г. Новосибирск, пл. Карла Маркса, 7"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [82.8974, 54.9801]
        }
    };

    DG.geoJson(data, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.address);
        }
    }).addTo(map);

С помощью функции `onEachFeature` вы можете связать GeoJSON данные с соответствующими объектами на карте.

### Конструктор
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
            <td><code><b>DG.GeoJSON</b>(
                <nobr>&lt;Object&gt; <i>geojson?</i></nobr>,
                <nobr>&lt;<a href="#опции">GeoJSON options</a>&gt; <i>options?</i> )</nobr>
            </code></td>

            <td>
                <code>DG.geoJson(&hellip;)</code>
            </td>

            <td>Создает GeoJSON слой. Опционально принимает объект в формате GeoJSON для отображения данных на карте (или же можно добавить данные позже, используя метод <code>addData</code>) и объект опций.</td>
        </tr>
    </tbody>
</table>

### Опции
<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="geojson-pointtolayer">
            <td><code><b>pointToLayer</b>(
                <nobr>&lt;GeoJSON&gt; <i>featureData</i></nobr>,
                <nobr>&lt;<a href="/doc/2.0/maps/manual/base-classes#класс-dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>
            <td>Используется для создания GeoJSON точек (если не указана, тогда будут созданы обычные маркеры).</td>
        </tr>
        <tr id="geojson-style">
            <td><code><b>style</b>(
                <nobr>&lt;GeoJSON&gt; <i>featureData</i> )</nobr>
            </code></td>
            <td>Используется для получения стиля векторных слоев, созданных для GeoJSON объектов.</td>
        </tr>
        <tr id="geojson-oneachfeature">
            <td><code><b>onEachFeature</b>(
                <nobr>&lt;GeoJSON&gt; <i>featureData</i></nobr>,
                <nobr>&lt;<a href="/doc/2.0/maps/manual/interfaces#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
            </code></td>
            <td>Вызывается при создании каждого объекта.</td>
        </tr>
        <tr id="geojson-filter">
            <td><code><b>filter</b>(
                <nobr>&lt;GeoJSON&gt; <i>featureData</i></nobr>,
                <nobr>&lt;<a href="/doc/2.0/maps/manual/interfaces#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
            </code></td>
            <td>Функция, которая определяет отображать объект или нет.</td>
        </tr>
        <tr id="geojson-coordstolatlng">
            <td><code><b>coordsToLatLng</b>(
                <nobr>&lt;Array&gt; <i>coords</i></nobr> )</nobr>
            </code></td>
            <td>Функция, которая будет использоваться для преобразования GeoJSON координат в <a href="/doc/2.0/maps/manual/base-classes#класс-dglatlng">LatLng</a> (если не задана, тогда координаты будут формироваться согласно стандарту <a href="http://ru.wikipedia.org/wiki/WGS_84" target="_blank">WGS84</a>).</td>
        </tr>
    </tbody>
</table>

<p>Также принимает все <a href="/doc/2.0/maps/manual/geometries#опции">опции класса Path</a>, которые используются для ломаных и многоугольников.</p>

### Методы
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
            <td><code><b>addData</b>(
                <nobr>&lt;GeoJSON&gt; <i>data</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Добавляет GeoJSON объект на слой.</td>
        </tr>
        <tr id="geojson-setstyle">
            <td><code><b>setStyle</b>(
                <nobr>&lt;Function&gt; <i><a href="#geojson-style">style</a></i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Заменяет стиль векторных GeoJSON слоев переданной функцией.</td>
        </tr>
        <tr id="geojson-resetstyle">
            <td><code><b>resetStyle</b>(
                <nobr>&lt;<a href="/doc/2.0/maps/manual/geometries#класс-dgpath">Path</a>&gt; <i>layer</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Сбрасывает стиль векторного слоя на GeoJSON стиль по умолчанию, полезно для сброса стилей после событий hover.</td>
        </tr>
    </tbody>
</table>

### Статические методы
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
            <td><code><b>geometryToLayer</b>(
                <nobr>&lt;GeoJSON&gt; <i>featureData</i></nobr>,
                <nobr>&lt;<a href="#geojson-pointtolayer">Function</a>&gt; <i>pointToLayer?</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/2.0/maps/manual/interfaces#ilayer">ILayer</a></code></td>
            <td>Создает слой на основе переданного GeoJSON объекта.</td>
        </tr>
        <tr>
            <td><code><b>coordsToLatlng</b>(
                <nobr>&lt;Array&gt; <i>coords</i></nobr>,
                <nobr>&lt;Boolean&gt; <i>reverse?</i> )</nobr>
            </code></td>
            <td><code><a href="/doc/2.0/maps/manual/base-classes#класс-dglatlng">LatLng</a></code></td>
            <td>Создает объект <a href="/doc/2.0/maps/manual/base-classes#класс-dglatlng">LatLng</a> по переданному массиву из двух чисел (широта, долгота), используется для GeoJSON точек. Если опция <code>reverse</code> установлена в <code>true</code>, тогда числа будут восприняты как (долгота, широта).</td>
        </tr>
        <tr>
            <td><code><b>coordsToLatlngs</b>(
                <nobr>&lt;Array&gt; <i>coords</i></nobr>,
                <nobr>&lt;Number&gt; <i>levelsDeep?</i></nobr>,
                <nobr>&lt;Boolean&gt; <i>reverse?</i> )</nobr>
            </code></td>
            <td><code>Array</code></td>
            <td>Создает многомерный массив объектов <a href="/doc/2.0/maps/manual/base-classes#класс-dglatlng">LatLng</a> из массива GeoJSON координат. <code>levelsDeep</code> определяет уровень вложенности (0 &mdash; массив точек, 1 &mdash; массив массивов точек и т.д, по умолчанию 0). Если опция <code>reverse</code> установлена в <code>true</code>, тогда числа будут восприняты как (долгота, широта).</td>
        </tr>
    </tbody>
</table>