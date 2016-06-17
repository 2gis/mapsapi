## Other Layers

{toc}

### DG.LayerGroup

Used to group several layers and handle them as one. If you add it to the map,
any layers added or removed from the group will be added/removed on the map as
well. Extends <a href="/doc/maps/en/manual/base-classes#dglayer"><code>DG.Layer</code></a>.

    DG.layerGroup([marker1, marker2])
        .addLayer(polyline)
        .addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="layergroup-l-layergroup">
            <td><code><b>DG.layerGroup</b>(
                <nobr>&lt;Layer[]&gt; <i>layers</i> )</nobr>
            </code></td>
            <td>Create a layer group, optionally given an initial set of layers.</td>
        </tr>
    </tbody>
</table>

#### Options

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a> <!-- TODO: include events -->

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
        <tr id="layergroup-togeojson">
            <td><code><b>toGeoJSON</b>()</code></td>

            <td><code>Object</code></td>
            <td>Returns a <a href="http://en.wikipedia.org/wiki/GeoJSON">
                <code>GeoJSON</code></a> representation of the layer group (as a GeoJSON <code>GeometryCollection</code>).</td>
        </tr>
        <tr id="layergroup-addlayer">
            <td><code><b>addLayer</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Adds the given layer to the group.</td>
        </tr>
        <tr id="layergroup-removelayer">
            <td><code><b>removeLayer</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Removes the given layer from the group.</td>
        </tr>
        <tr>
            <td><code><b>removeLayer</b>(
                <nobr>&lt;Number&gt; <i>id</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Removes the layer with the given internal ID from the group.</td>
        </tr>
        <tr id="layergroup-haslayer">
            <td><code><b>hasLayer</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the given layer is currently added to the group.</td>
        </tr>
        <tr id="layergroup-clearlayers">
            <td><code><b>clearLayers</b>()</code></td>

            <td><code>this</code></td>
            <td>Removes all the layers from the group.</td>
        </tr>
        <tr id="layergroup-invoke">
            <td><code><b>invoke</b>(
                <nobr>&lt;string&gt; <i>methodName</i>, <i>…</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Calls <code>methodName</code> on every layer contained in this group, passing any
                additional parameters. Has no effect if the layers contained do not
                implement <code>methodName</code>.</td>
        </tr>
        <tr id="layergroup-eachlayer">
            <td><code><b>eachLayer</b>(
                <nobr>&lt;Function&gt; <i>fn</i>,</nobr>
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Iterates over the layers of the group, optionally specifying context of the iterator function.
                <code class="lang-js">group.eachLayer(function (layer) {
                    layer.bindPopup(&#39;Hello&#39;);
                });</code></td>
        </tr>
        <tr id="layergroup-getlayer">
            <td><code><b>getLayer</b>(
                <nobr>&lt;Number&gt; <i>id</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a></code></td>
            <td>Returns the layer with the given internal ID.</td>
        </tr>
        <tr id="layergroup-getlayers">
            <td><code><b>getLayers</b>()</code></td>

            <td><code>Layer[]</code></td>
            <td>Returns an array of all the layers added to the group.</td>
        </tr>
        <tr id="layergroup-setzindex">
            <td><code><b>setZIndex</b>(
                <nobr>&lt;Number&gt; <i>zIndex</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Calls <code>setZIndex</code> on every layer contained in this group, passing the z-index.</td>
        </tr>
        <tr id="layergroup-getlayerid">
            <td><code><b>getLayerId</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Returns the internal ID for a layer</td>
        </tr>
    </tbody>
</table>

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented">Evented</a> <!-- TODO: include methods -->

### DG.FeatureGroup

Extended <a href="#dglayergroup"><code>DG.LayerGroup</code></a> that also has mouse events
(propagated from members of the group) and a shared bindPopup method.

    DG.featureGroup([marker1, marker2, polyline])
        .bindPopup('Hello world!')
        .on('click', function() { alert('Clicked on a group!'); })
        .addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr id="featuregroup-l-featuregroup">
            <td><code><b>DG.featureGroup</b>(
                <nobr>&lt;Layer[]&gt; <i>layers</i> )</nobr>
            </code></td>
            <td>Create a feature group, optionally given an initial set of layers.</td>
        </tr>
    </tbody>
</table>

#### Options

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a> <!-- TODO: include events -->

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
        <tr id="featuregroup-setstyle">
            <td><code><b>setStyle</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/vector-layers#dgpath-options">Path options</a>&gt; <i>style</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Sets the given path options to each layer of the group that has a <code>setStyle</code> method.</td>
        </tr>
        <tr id="featuregroup-bringtofront">
            <td><code><b>bringToFront</b>()</code></td>

            <td><code>this</code></td>
            <td>Brings the layer group to the top of all other layers</td>
        </tr>
        <tr id="featuregroup-bringtoback">
            <td><code><b>bringToBack</b>()</code></td>

            <td><code>this</code></td>
            <td>Brings the layer group to the top of all other layers</td>
        </tr>
        <tr id="featuregroup-getbounds">
            <td><code><b>getBounds</b>()</code></td>

            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlngbounds">LatLngBounds</a></code></td>
            <td>Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).</td>
        </tr>
    </tbody>
</table>

Methods inherited from <a href="#dglayergroup">LayerGroup</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented">Evented</a> <!-- TODO: include methods -->

### DG.GeoJSON

Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse
GeoJSON data and display it on the map. Extends <a href="#dgfeaturegroup"><code>DG.FeatureGroup</code></a>.

    DG.geoJson(data, {
        style: function (feature) {
            return {color: feature.properties.color};
        }
    }).bindPopup(function (layer) {
        return layer.feature.properties.description;
    }).addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr id="geojson-l-geojson">
            <td><code><b>DG.geoJSON</b>(
                <nobr>&lt;Object&gt; <i>geojson?</i>,</nobr>
                <nobr>&lt;<a href="#geojson-option">GeoJSON options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Creates a GeoJSON layer. Optionally accepts an object in
                <a href="http://geojson.org/geojson-spec.html">GeoJSON format</a> to display on the map
                (you can alternatively add it later with <code>addData</code> method) and an <code>options</code> object.</td>
        </tr>
    </tbody>
</table>

#### Options

<table id="geojson-option">
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr id="geojson-pointtolayer">
            <td><code><b>pointToLayer</b></code></td>
            <td><code>Function </code></td>
            <td><code>*</code></td>
            <td>A <code>Function</code> defining how GeoJSON points spawn maps API layers. It is internally
                called when data is added, passing the GeoJSON point feature and its
                <a href="/doc/maps/en/manual/basic-types#dglatlng"><code>LatLng</code></a>.
                The default is to spawn a default <a href="/doc/maps/en/manual/markers#dgmarker"><code>Marker</code></a>:
                <code class="lang-js">function(geoJsonPoint, latlng) {
                    return DG.marker(latlng);
                }
                </code></td>
        </tr>
        <tr id="geojson-style">
            <td><code><b>style</b></code></td>
            <td><code>Function </code></td>
            <td><code>*</code></td>
            <td>A <code>Function</code> defining the
                <a href="/doc/maps/en/manual/vector-layers#dgpath-options"><code>Path options</code></a>
                for styling GeoJSON lines and polygons, called internally when data is added.
                The default value is to not override any defaults:
                <code class="lang-js">function (geoJsonFeature) {
                    return {}
                }
                </code></td>
        </tr>
        <tr id="geojson-oneachfeature">
            <td><code><b>onEachFeature</b></code></td>
            <td><code>Function </code></td>
            <td><code>*</code></td>
            <td>A <code>Function</code> that will be called once for each created
                <a href="/doc/maps/en/manual/base-classes#dglayer"><code>Layer</code></a>,
                after it has been created and styled. Useful for attaching events and popups to features.
                The default is to do nothing with the newly created layers:
                <code class="lang-js">function (layer) {}
                </code></td>
        </tr>
        <tr id="geojson-filter">
            <td><code><b>filter</b></code></td>
            <td><code>Function </code></td>
            <td><code>*</code></td>
            <td>A <code>Function</code> that will be used to decide whether to show a feature or not.
                The default is to show all features:
                <code class="lang-js">function (geoJsonFeature) {
                    return true;
                }
                </code></td>
        </tr>
        <tr id="geojson-coordstolatlng">
            <td><code><b>coordsToLatLng</b></code></td>
            <td><code>Function </code></td>
            <td><code>*</code></td>
            <td>A <code>Function</code> that will be used for converting GeoJSON coordinates to
                <a href="/doc/maps/en/manual/basic-types#dglatlng"><code>LatLng</code></a>s.
                The default is the <code>coordsToLatLng</code> static method.</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a> <!-- TODO: include events -->

#### Methods

Methods inherited from <a href="#dgfeaturegroup">FeatureGroup</a> <!-- TODO: include methods -->

Methods inherited from <a href="#dglayergroup">LayerGroup</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented">Evented</a> <!-- TODO: include methods -->

#### Functions

There are several static functions which can be called without instantiating DG.GeoJSON:

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr id="geojson-geometrytolayer">
            <td><code><b>geometryToLayer</b>(
                <nobr>&lt;Object&gt; <i>featureData</i>,</nobr>
                <nobr>&lt;<a href="#geojson-option">GeoJSON options</a>&gt; <i>options?</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a></code></td>
            <td>Creates a <a href="/doc/maps/en/manual/base-classes#dglayer"><code>Layer</code></a> from a given
                GeoJSON feature. Can use a custom <a href="#geojson-pointtolayer"><code>pointToLayer</code></a> and/or
                <a href="#geojson-coordstolatlng"><code>coordsToLatLng</code></a> functions if provided as options.</td>
        </tr>
        <tr id="geojson-coordstolatlng">
            <td><code><b>coordsToLatLng</b>(
                <nobr>&lt;Array&gt; <i>coords</i> )</nobr>
            </code></td>

            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Creates a <a href="/doc/maps/en/manual/basic-types#dglatlng"><code>LatLng</code></a> object from an array
                of 2 numbers (longitude, latitude) or 3 numbers (longitude, latitude, altitude) used in GeoJSON for points.</td>
        </tr>
        <tr>
            <td><code><b>coordsToLatLngs</b>(
                <nobr>&lt;Array&gt; <i>coords</i>,</nobr>
                <nobr>&lt;Number&gt; <i>levelsDeep?</i>,</nobr>
                <nobr>&lt;Function&gt; <i>coordsToLatLng?</i> )</nobr>
            </code></td>

            <td><code>Array</code></td>
            <td>Creates a multidimensional array of <a href="/doc/maps/en/manual/basic-types#dglatlng"><code>LatLng</code></a>s
                from a GeoJSON coordinates array. <code>levelsDeep</code> specifies the nesting level (0 is for an array
                of points, 1 for an array of arrays of points, etc., 0 by default). Can use a custom
                <a href="#geojson-coordstolatlng"><code>coordsToLatLng</code></a> function.</td>
        </tr>
        <tr id="geojson-latlngtocoords">
            <td><code><b>latLngToCoords</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>

            <td><code>Array</code></td>
            <td>Reverse of <a href="#geojson-coordstolatlng"><code>coordsToLatLng</code></a></td>
        </tr>
        <tr id="geojson-latlngstocoords">
            <td><code><b>latLngsToCoords</b>(
                <nobr>&lt;Array&gt; <i>latlngs</i>,</nobr>
                <nobr>&lt;Number&gt; <i>levelsDeep?</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>closed?</i> )</nobr>
            </code></td>

            <td><code>Array</code></td>
            <td>Reverse of <a href="#geojson-coordstolatlngs"><code>coordsToLatLngs</code></a>
                <code>closed</code> determines whether the first point should be appended to the end of
                the array to close the feature, only used when <code>levelsDeep</code> is 0. False by default.</td>
        </tr>
        <tr id="geojson-asfeature">
            <td><code><b>asFeature</b>(
                <nobr>&lt;Object&gt; <i>geojson</i> )</nobr>
            </code></td>

            <td><code>Object</code></td>
            <td>Normalize GeoJSON geometries/features into GeoJSON features.</td>
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
which will be passed a <a href="/doc/maps/en/manual/basic-types#dgpoint"><code>Point</code></a> object with the <code>x</code>,
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

<table id='gridlayer-options'>
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
            <td>String to be shown in the attribution control, describes the layer data, e.g. &quot;© 2GIS&quot;.</td>
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
                <a href="/doc/maps/en/manual/basic-types#dglatlngbounds"><code>LatLngBounds</code></a>.</td>
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
            <td>The maximum zoom level that tiles will be loaded at.</td>
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

<table id='gridlayer-events'>
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
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the grid layer starts loading tiles</td>
        </tr>
        <tr id="gridlayer-tileunload">
            <td><code><b>tileunload</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#tileevent">TileEvent</a></code></td>
            <td>Fired when a tile is removed (e.g. when a tile goes off the screen).</td>
        </tr>
        <tr id="gridlayer-tileloadstart">
            <td><code><b>tileloadstart</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#tileevent">TileEvent</a></code></td>
            <td>Fired when a tile is requested and starts loading.</td>
        </tr>
        <tr id="gridlayer-tileerror">
            <td><code><b>tileerror</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#tileevent">TileEvent</a></code></td>
            <td>Fired when there is an error loading a tile.</td>
        </tr>
        <tr id="gridlayer-tileload">
            <td><code><b>tileload</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#tileevent">TileEvent</a></code></td>
            <td>Fired when a tile loads.</td>
        </tr>
        <tr id="gridlayer-load">
            <td><code><b>load</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#tileevent">TileEvent</a></code></td>
            <td>Fired when the grid layer loaded all visible tiles.</td>
        </tr>
    </tbody>
</table>

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a> <!-- TODO: include events -->

#### Methods

<table id='gridlayer-methods'>
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

            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
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

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented">Evented</a> <!-- TODO: include methods -->
