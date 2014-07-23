## DG.Wkt

{toc}

### Описание

Используется для получения геометрий API карт на основе их описания в <a target="_blank" href="http://en.wikipedia.org/wiki/Well-known_text">WKT-формате</a>.

### Пример использования 

Считывает описание многоугольника в WKT-формате и отображает его на карте:

    var polygonComponents = 'POLYGON((82.91699 55.042136, 82.917522 55.040187, 82.918063 55.040235, 82.917540 55.042184,82.91699 55.042136))';
    DG.Wkt.geoJsonLayer(polygonComponents).addTo(map);

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
            <td><code><b>DG.Wkt.toGeoJSON</b>(
                <nobr>&lt;String&gt; <i>wkt</i>)</nobr>
            </code></td>
            <td><code>geoJSON</code></td>
            <td>Считывает строку в WKT-формате и проверяет ее корректность. Возвращает <a href="http://geojson.org/geojson-spec.html" target="_blank">GeoJSON</a>.</td>
        </tr>
        <tr>
            <td><code><b>DG.Wkt.toLatLngs</b>(
                <nobr>&lt;String | Array&gt; <i>wkt</i>)</nobr>
            </code></td>
            <td><code>Array</code></td>
            <td>Считывает строку в WKT-формате и возвращает массив точек геометрии в формате <a href="/doc/maps/manual/base-classes/#класс-dglatlng">LatLng</a> (ее внутреннее представление). Может принимать массив WKT строк.</td>
        </tr>
        <tr>
            <td><code><b>DG.Wkt.geoJsonLayer</b>(
                <nobr>&lt;String&gt; <i>wkt</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/manual/geojson/#опции">GeoJSON options</a>&gt; <i>options?</i>)</nobr></code></td>
            <td><code>Object</code></td>
            <td>
            Создает GeoJSON слой. Принимает строку в WKT-формате для отображения данных на карте и объект опций. Формирует геометрию API карт на основе данных, считанных методом DG.Wkt.toGeoJSON. Этот метод поддерживает все опции конструктора класса <a href="/doc/maps/manual/geojson/#класс-dggeojson">DG.GeoJSON</a>. Например, можно передать параметр <code>DG.Wkt.geoJsonLayer(polygonComponents, {clickable:false})</code>, чтобы сделать геометрию некликабельной.</td>
        </tr>
    </tbody>
</table>