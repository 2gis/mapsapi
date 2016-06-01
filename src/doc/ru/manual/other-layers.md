### DG.LayerGroup

Используется для группировки нескольких слоев, чтобы обрабатывать их как один. При добавлении
группового слоя на карту, все другие слои, добавляемые и удаляемые из группы, также будут
добавлены или удалены с карты. Расширяет <a href="/doc/maps/ru/manual/base-classes#dglayer"><code>DG.Layer</code></a>.

    DG.layerGroup([marker1, marker2])
        .addLayer(polyline)
        .addTo(map);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="layergroup-l-layergroup">
            <td><code><b>DG.layerGroup</b>(
                <nobr>&lt;Layer[]&gt; <i>layers</i> )</nobr>
            </code></td>
            <td>Создает объект группы, принимает начальный набор слоев для группировки (опционально).</td>
        </tr>
    </tbody>
</table>

#### Свойства

#### События

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
        <tr id="layergroup-togeojson">
            <td><code><b>toGeoJSON</b>()</code></td>

            <td><code>Object</code></td>
            <td>Возвращает <a href="http://en.wikipedia.org/wiki/GeoJSON">
                <code>GeoJSON</code></a> объект, описывающий группу слоев, как <code>GeometryCollection</code>.</td>
        </tr>
        <tr id="layergroup-addlayer">
            <td><code><b>addLayer</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет указанный слой в группу.</td>
        </tr>
        <tr id="layergroup-removelayer">
            <td><code><b>removeLayer</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет указанный слой из группы.</td>
        </tr>
        <tr id="layergroup-removelayer">
            <td><code><b>removeLayer</b>(
                <nobr>&lt;Number&gt; <i>id</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет из группы слой, с указанным ID.</td>
        </tr>
        <tr id="layergroup-haslayer">
            <td><code><b>hasLayer</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если указанный слой уже добавлен в группу.</td>
        </tr>
        <tr id="layergroup-clearlayers">
            <td><code><b>clearLayers</b>()</code></td>

            <td><code>this</code></td>
            <td>Удаляет все слои из группы.</td>
        </tr>
        <tr id="layergroup-invoke">
            <td><code><b>invoke</b>(
                <nobr>&lt;string&gt; <i>methodName</i>, <i>…</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Вызывает метод <code>methodName</code> у каждого слоя из группы. Возможна передача
                дополнительных параметров. Пропускает слои, у которых не реализован <code>methodName</code>.</td>
        </tr>
        <tr id="layergroup-eachlayer">
            <td><code><b>eachLayer</b>(
                <nobr>&lt;Function&gt; <i>fn</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Итерационно обходит все слои группы. Возможна передача контекстного объекта в функцию итератор.
                <code class="lang-js">group.eachLayer(function (layer) {
                    layer.bindPopup(&#39;Hello&#39;);
                });</code></td>
        </tr>
        <tr id="layergroup-getlayer">
            <td><code><b>getLayer</b>(
                <nobr>&lt;Number&gt; <i>id</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/ru/manual/base-classes#dglayer">Layer</a></code></td>
            <td>Возвращает слой с указанным ID.</td>
        </tr>
        <tr id="layergroup-getlayers">
            <td><code><b>getLayers</b>()</code></td>

            <td><code>Layer[]</code></td>
            <td>Возвращает массив всех слоев группы.</td>
        </tr>
        <tr id="layergroup-setzindex">
            <td><code><b>setZIndex</b>(
                <nobr>&lt;Number&gt; <i>zIndex</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Вызывает метод <code>setZIndex</code> у каждого слоя из группы, передавая аргумент z-index.</td>
        </tr>
        <tr id="layergroup-getlayerid">
            <td><code><b>getLayerId</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Возвращает ID для указанного слоя.</td>
        </tr>
    </tbody>
</table>

### DG.FeatureGroup

Расширяет <a href="#dglayergroup"><code>DG.LayerGroup</code></a>, добавляя обработку событий мышки
(получаемых от членов группы) и общий метод bindPopup.

    DG.featureGroup([marker1, marker2, polyline])
        .bindPopup('Привет, Мир!')
        .on('click', function() { alert('Вы щелкнули по группе!'); })
        .addTo(map);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
	<tbody>
        <tr id="featuregroup-l-featuregroup">
            <td><code><b>DG.featureGroup</b>(
                <nobr>&lt;Layer[]&gt; <i>layers</i> )</nobr>
            </code></td>
            <td>Создает объект группы, принимает начальный набор слоев для группировки (опционально).</td>
        </tr>
    </tbody>
</table>

#### Свойства

#### События

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
        <tr id="featuregroup-setstyle">
            <td><code><b>setStyle</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/vector-layers#dgpath-options">Path options</a>&gt; <i>style</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Устанавливает указанные свойства векторного объекта для каждого слоя из группы, у которого реализован
                метод <code>setStyle</code>.</td>
        </tr>
        <tr id="featuregroup-bringtofront">
            <td><code><b>bringToFront</b>()</code></td>

            <td><code>this</code></td>
            <td>Позиционирует слой группы поверх остальных слоев.</td>
        </tr>
        <tr id="featuregroup-bringtoback">
            <td><code><b>bringToBack</b>()</code></td>

            <td><code>this</code></td>
            <td>Позиционирует слой группы под остальными слоями.</td>
        </tr>
        <tr id="featuregroup-getbounds">
            <td><code><b>getBounds</b>()</code></td>

            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlngbounds">LatLngBounds</a></code></td>
            <td>Возвращает прямоугольные границы LatLngBounds объекта Feature Group (для корректной работы метода,
                слои в группе должны возвращать подобную информацию о себе).</td>
        </tr>
    </tbody>
</table>

### DG.GeoJSON

Описывает объект GeoJSON или массив объектов GeoJSON. Позволяет корректно интерпретировать данные
GeoJSON и отобразить их на карте. Расширяет <a href="#dgfeaturegroup"><code>DG.FeatureGroup</code></a>.

    DG.geoJson(data, {
        style: function (feature) {
            return {color: feature.properties.color};
        }
    }).bindPopup(function (layer) {
        return layer.feature.properties.description;
    }).addTo(map);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
	<tbody>
        <tr id="geojson-l-geojson">
            <td><code><b>DG.geoJSON</b>(
                <nobr>&lt;Object&gt; <i>geojson?</i>,</nobr>
                <nobr>&lt;<a href='#geojson-option'>GeoJSON options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Создает слой GeoJSON. Опционально, принимает объект в формате
                <a href="http://geojson.org/geojson-spec.html">GeoJSON</a> (возможна передача этого объекта позже,
                 используя метод <code>addData</code>) и объект со <code>свойствами</code>.</td>
        </tr>
    </tbody>
</table>

#### Свойства

<table id="geojson-option">
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Значение<br>по умолчанию</th>
            <th>Описание</th>
        </tr>
	</thead>
	<tbody>
        <tr id="geojson-pointtolayer">
            <td><code><b>pointToLayer</b></code></td>
            <td><code>Function </code></td>
            <td><code>*</code></td>
            <td><code>Функция</code>, определяющая, как точки GeoJSON будут создавать слои API карт.
                API карт вызывает метод, если он реализован, передавая объекты точек GeoJSON и
                <a href="/doc/maps/ru/manual/basic-types#dglatlng"><code>LatLng</code></a>.
                По умолчанию, будут создаваться обычные <a href="/doc/maps/ru/manual/markers#dgmarker"><code>Маркеры</code></a>:
                <code class="lang-js">function(geoJsonPoint, latlng) {
                    return DG.marker(latlng);
                }
                </code></td>
        </tr>
        <tr id="geojson-style">
            <td><code><b>style</b></code></td>
            <td><code>Function </code></td>
            <td><code>*</code></td>
            <td><code>Функция</code>, определяющая
                <a href="/doc/maps/ru/manual/vector-layers#dgpath-options"><code>Path options</code></a>
                для стилизации отображения GeoJSON линий и полигонов. API карт вызывает метод, если он реализован,
                при каждом добавлении данных. По умолчанию, стили никак не изменяются:
                <code class="lang-js">function (geoJsonFeature) {
                    return {}
                }
                </code></td>
        </tr>
        <tr id="geojson-oneachfeature">
            <td><code><b>onEachFeature</b></code></td>
            <td><code>Function </code></td>
            <td><code>*</code></td>
            <td><code>Функция</code>, которая будет вызвана после каждого создания и стилизации нового
                <a href="/doc/maps/ru/manual/base-classes#dglayer"><code>Слоя</code></a>.
                Удобно использовать для подключения обработчиков событий и всплывающих окон.
                По умолчанию, никаких дополнительных действий не происходит:
                <code class="lang-js">function (layer) {}
                </code></td>
        </tr>
        <tr id="geojson-filter">
            <td><code><b>filter</b></code></td>
            <td><code>Function </code></td>
            <td><code>*</code></td>
            <td><code>Функция</code>, которая определяет, должен ли отображаться указанный объект или нет.
                По умолчанию, отображаются все объекты:
                <code class="lang-js">function (geoJsonFeature) {
                    return true;
                }
                </code></td>
        </tr>
        <tr id="geojson-coordstolatlng">
            <td><code><b>coordsToLatLng</b></code></td>
            <td><code>Function </code></td>
            <td><code>*</code></td>
            <td><code>Функция</code>, которая будет использоваться для преобразования координат GeoJSON
                в координаты <a href="/doc/maps/ru/manual/basic-types#dglatlng"><code>LatLng</code></a>s.
                По умолчанию будет использован статический метод <code>coordsToLatLng</code>.</td>
        </tr>
    </tbody>
</table>

#### События

#### Методы

#### Статические функции

<table>
    <thead>
        <tr>
            <th>Функция</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
	<tbody>
        <tr id="geojson-geometrytolayer">
            <td><code><b>geometryToLayer</b>(
                <nobr>&lt;Object&gt; <i>featureData</i>,</nobr>
                <nobr>&lt;<a href="#geojson-option">GeoJSON options</a>&gt; <i>options?</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/ru/manual/base-classes#dglayer">Layer</a></code></td>
            <td>Создает <a href="/doc/maps/ru/manual/base-classes#dglayer"><code>Слой</code></a> на основе переданного
                GeoJSON объекта. Может использовать собственные функции <a href="#geojson-pointtolayer"><code>pointToLayer</code></a>
                и/или <a href="#geojson-coordstolatlng"><code>coordsToLatLng</code></a>, если они переданы в объекте свойств.</td>
        </tr>
        <tr id="geojson-coordstolatlng">
            <td><code><b>coordsToLatLng</b>(
                <nobr>&lt;Array&gt; <i>coords</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Создает объект <a href="/doc/maps/ru/manual/basic-types#dglatlng"><code>LatLng</code></a> из массива
                двух чисел, переданных в формате (longitude, latitude), или трех чисел, в формате (longitude, latitude, altitude),
                которые используются в GeoJSON для представления точек.</td>
        </tr>
        <tr id="geojson-coordstolatlngs">
            <td><code><b>coordsToLatLngs</b>(
                <nobr>&lt;Array&gt; <i>coords</i>,</nobr>
                <nobr>&lt;Number&gt; <i>levelsDeep?</i>,</nobr>
                <nobr>&lt;Function&gt; <i>coordsToLatLng?</i> )</nobr>
            </code></td>

            <td><code>Array</code></td>
            <td>Создает многомерный массив объектов <a href="/doc/maps/ru/manual/basic-types#dglatlng"><code>LatLng</code></a>
                из массива GeoJSON координат. <code>levelsDeep</code> определяет уровень вложенности (0 для массива точек,
                1 для массива массивов точек, и т.д., по умолчанию 0). Может использовать собственную функцию
                <a href="#geojson-coordstolatlng"><code>coordsToLatLng</code></a> для преобразования.</td>
        </tr>
        <tr id="geojson-latlngtocoords">
            <td><code><b>latLngToCoords</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>

            <td><code>Array</code></td>
            <td>Обратная операция для <a href="#geojson-coordstolatlng"><code>coordsToLatLng</code></a></td>
        </tr>
        <tr id="geojson-latlngstocoords">
            <td><code><b>latLngsToCoords</b>(
                <nobr>&lt;Array&gt; <i>latlngs</i>,</nobr>
                <nobr>&lt;Number&gt; <i>levelsDeep?</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>closed?</i> )</nobr>
            </code></td>

            <td><code>Array</code></td>
            <td>Обратная операция для <a href="#geojson-coordstolatlngs"><code>coordsToLatLngs</code></a>
                Свойство <code>closed</code> определяет, нужно ли добавлять первую точку в конец массива и используется
                только в случае, если <code>levelsDeep</code> равен 0.</td>
        </tr>
        <tr id="geojson-asfeature">
            <td><code><b>asFeature</b>(
                <nobr>&lt;Object&gt; <i>geojson</i> )</nobr>
            </code></td>

            <td><code>Object</code></td>
            <td>Нормализует геометрические примитивы GeoJSON в объекты GeoJSON.</td>
        </tr>
    </tbody>
</table>

### DG.GridLayer

Generic class for handling a tiled grid of HTML elements. This is the base class for all tile layers and
replaces <code>TileLayer.Canvas</code>. GridLayer can be extended to create a tiled grid of HTML Elements
like <code>&lt;canvas&gt;</code>, <code>&lt;img&gt;</code> or <code>&lt;div&gt;</code>. GridLayer will
handle creating and animating these DOM elements for you.

#### Synchronous usage

To create a custom layer, extend GridLayer and impliment the <code>createTile()</code> method,
which will be passed a <a href="/doc/maps/ru/manual/basic-types#dgpoint"><code>Point</code></a> object with the <code>x</code>,
<code>y</code>, and <code>z</code> (zoom level) coordinates to draw your tile.

    var CanvasLayer = DG.GridLayer.extend({
        createTile: function(coords){
            // create a <canvas> element for drawing
            var tile = DG.DomUtil.create('canvas', 'leaflet-tile');
            // setup tile width and height according to the options
            var size = this.getTileSize();
            tile.width = size.x;
            tile.height = size.y;
            // get a canvas context and draw something on it using coords.x, coords.y and coords.z
            var ctx = canvas.getContext('2d');
            // return the tile so it can be rendered on screen
            return tile;
        }
    });

#### Asynchrohous usage

Tile creation can also be asyncronous, this is useful when using a third-party drawing library.
Once the tile is finsihed drawing it can be passed to the done() callback.

    var CanvasLayer = DG.GridLayer.extend({
        createTile: function(coords, done){
            var error;
            // create a <canvas> element for drawing
            var tile = DG.DomUtil.create('canvas', 'leaflet-tile');
            // setup tile width and height according to the options
            var size = this.getTileSize();
            tile.width = size.x;
            tile.height = size.y;
            // draw something and pass the tile to the done() callback
            done(error, tile);
        }
    });

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr id="gridlayer-l-gridlayer">
            <td><code><b>DG.gridLayer</b>(
                <nobr>&lt;GridLayer options&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Creates a new instance of GridLayer with the supplied options.</td>
        </tr>
    </tbody>
</table>

#### Options

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="gridlayer-tilesize">
            <td><code><b>tileSize</b></code></td>
            <td><code>Number|Point </code></td>
            <td><code>256</code></td>
            <td>Width and height of tiles in the grid. Use a number if width and height are equal,
                or <code>DG.point(width, height)</code> otherwise.</td>
        </tr>
        <tr id="gridlayer-opacity">
            <td><code><b>opacity</b></code></td>
            <td><code>Number </code></td>
            <td><code>1.0</code></td>
            <td>Opacity of the tiles. Can be used in the <code>createTile()</code> function.</td>
        </tr>
        <tr id="gridlayer-updatewhenidle">
            <td><code><b>updateWhenIdle</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>depends</code></td>
            <td>If <code>false</code>, new tiles are loaded during panning, otherwise only after it (for better
                performance). <code>true</code> by default on mobile browsers, otherwise <code>false</code>.</td>
        </tr>
        <tr id="gridlayer-updateinterval">
            <td><code><b>updateInterval</b></code></td>
            <td><code>Number </code></td>
            <td><code>200</code></td>
            <td>Tiles will not update more than once every <code>updateInterval</code> milliseconds.</td>
        </tr>
        <tr id="gridlayer-attribution">
            <td><code><b>attribution</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
            <td>String to be shown in the attribution control, describes the layer data, e.g. &quot;© Mapbox&quot;.</td>
        </tr>
        <tr id="gridlayer-zindex">
            <td><code><b>zIndex</b></code></td>
            <td><code>Number </code></td>
            <td><code>1</code></td>
            <td>The explicit zIndex of the tile layer.</td>
        </tr>
        <tr id="gridlayer-bounds">
            <td><code><b>bounds</b></code></td>
            <td><code>LatLngBounds </code></td>
            <td><code>undefined</code></td>
            <td>If set, tiles will only be loaded inside inside the set
                <a href="/doc/maps/ru/manual/basic-types#dglatlngbounds"><code>LatLngBounds</code></a>.</td>
        </tr>
        <tr id="gridlayer-minzoom">
            <td><code><b>minZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>0</code></td>
            <td>The minimum zoom level that tiles will be loaded at. By default the entire map.</td>
        </tr>
        <tr id="gridlayer-maxzoom">
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>undefined</code></td>
            <td>The maximum zoom level that tiles will be loaded at.
        maxZoom: undefined,</td>
        </tr>
        <tr id="gridlayer-nowrap">
            <td><code><b>noWrap</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Whether the layer is wrapped around the antimeridian. If <code>true</code>, the
                GridLayer will only be displayed once at low zoom levels.</td>
        </tr>
        <tr id="gridlayer-pane">
            <td><code><b>pane</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;tilePane&#x27;</code></td>
            <td><code>Map pane</code> where the grid layer will be added.</td>
        </tr>
    </tbody>
</table>

#### Events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="gridlayer-loading">
            <td><code><b>loading</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the grid layer starts loading tiles</td>
        </tr>
        <tr id="gridlayer-tileunload">
            <td><code><b>tileunload</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#tileevent">TileEvent</a></code></td>
            <td>Fired when a tile is removed (e.g. when a tile goes off the screen).</td>
        </tr>
        <tr id="gridlayer-tileloadstart">
            <td><code><b>tileloadstart</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#tileevent">TileEvent</a></code></td>
            <td>Fired when a tile is requested and starts loading.</td>
        </tr>
        <tr id="gridlayer-tileerror">
            <td><code><b>tileerror</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#tileevent">TileEvent</a></code></td>
            <td>Fired when there is an error loading a tile.</td>
        </tr>
        <tr id="gridlayer-tileload">
            <td><code><b>tileload</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#tileevent">TileEvent</a></code></td>
            <td>Fired when a tile loads.</td>
        </tr>
        <tr id="gridlayer-load">
            <td><code><b>load</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#tileevent">TileEvent</a></code></td>
            <td>Fired when the grid layer loaded all visible tiles.</td>
        </tr>
    </tbody>
</table>

#### Methods

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="gridlayer-bringtofront">
            <td><code><b>bringToFront</b>()</code></td>

            <td><code>this</code></td>
            <td>Brings the tile layer to the top of all tile layers.</td>
        </tr>
        <tr id="gridlayer-bringtoback">
            <td><code><b>bringToBack</b>()</code></td>

            <td><code>this</code></td>
            <td>Brings the tile layer to the bottom of all tile layers.</td>
        </tr>
        <tr id="gridlayer-getattribution">
            <td><code><b>getAttribution</b>()</code></td>

            <td><code>String</code></td>
            <td>Used by the <code>attribution control</code>, returns the
                <a href="#gridlayer-attribution">attribution option</a>.</td>
        </tr>
        <tr id="gridlayer-getcontainer">
            <td><code><b>getContainer</b>()</code></td>

            <td><code>String</code></td>
            <td>Returns the HTML element that contains the tiles for this layer.</td>
        </tr>
        <tr id="gridlayer-setopacity">
            <td><code><b>setOpacity</b>(
                <nobr>&lt;Number&gt; <i>opacity</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Changes the <a href="#gridlayer-opacity">opacity</a> of the grid layer.</td>
        </tr>
        <tr id="gridlayer-setzindex">
            <td><code><b>setZIndex</b>(
                <nobr>&lt;Number&gt; <i>zIndex</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Changes the <a href="#gridlayer-zindex">zIndex</a> of the grid layer.</td>
        </tr>
        <tr id="gridlayer-isloading">
            <td><code><b>isLoading</b>()</code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if any tile in the grid layer has not finished loading.</td>
        </tr>
        <tr id="gridlayer-redraw">
            <td><code><b>redraw</b>()</code></td>

            <td><code>this</code></td>
            <td>Causes the layer to clear all the tiles and request them again.</td>
        </tr>
        <tr id="gridlayer-gettilesize">
            <td><code><b>getTileSize</b>()</code></td>

            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Normalizes the <a href="#gridlayer-tilesize">tileSize option</a> into a point.
                Used by the <code>createTile()</code> method.</td>
        </tr>
    </tbody>
</table>

#### Extension methods

Layers extending <a href="#dggridlayer"><code>DG.GridLayer</code></a> shall reimplement the following method.

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr id="gridlayer-createtile">
            <td><code><b>createTile</b>(
                <nobr>&lt;Object&gt; <i>coords</i>,</nobr>
                <nobr>&lt;Function&gt; <i>done?</i> )</nobr>
            </code></td>

            <td><code>HTMLElement</code></td>
            <td>Called only internally, must be overriden by classes extending
                <a href="#dggridlayer"><code>GridLayer</code></a>. Returns the <code>HTMLElement</code>
                corresponding to the given <code>coords</code>. If the <code>done</code> callback
                is specified, it must be called when the tile has finished loading and drawing.
            </td>
        </tr>
    </tbody>
</table>
