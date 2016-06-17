## Raster Layers

This section describes working with raster layers, such as a tile layer
or an image bound to specific geographic boundaries.

{toc}

### DG.TileLayer

Used to load and display tile layers on the map. Extends <a href="/doc/maps/en/manual/other-layers#dggridlayer">GridLayer</a>.

#### Usage Example

    DG.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);

##### URL Template

A string of the following form:

    'http://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'

You can use custom keys in the template, which will be evaluated from TileLayer options, like this:

    DG.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});

#### Creation

Extension methods

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="tilelayer-dg-tilelayer">
            <td><code>
                    <b>DG.tilelayer</b>(
                    <nobr>&lt;String&gt;</nobr> <i>urlTemplate</i>,
                    <nobr><i>options</i></nobr>)
                </code>
            </td>
            <td>Instantiates a tile layer object given a <code>URL template</code> and optionally an options object.
            </td>
        </tr>
    </tbody>
</table>

#### Options

<table id="tilelayer-options">
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="tilelayer-minzoom">
            <td><code><b>minZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>0</code></td>
            <td>Minimum zoom number.</td>
        </tr>
        <tr id="tilelayer-maxzoom">
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>18</code></td>
            <td>Maximum zoom number.</td>
        </tr>
        <tr id="tilelayer-maxnativezoom">
            <td><code><b>maxNativeZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>null</code></td>
            <td>Maximum zoom number the tile source has available. If it is specified,
                the tiles on all zoom levels higher than <code>maxNativeZoom</code> will be loaded
                from <code>maxNativeZoom</code> level and auto-scaled.
            </td>
        </tr>
        <tr id="tilelayer-subdomains">
            <td><code><b>subdomains</b></code></td>
            <td><code>String|String[] </code></td>
            <td><code>&#x27;abc&#x27;</code></td>
            <td>Subdomains of the tile service. Can be passed in the form of one string (where each letter
                is a subdomain name) or an array of strings.
            </td>
        </tr>
        <tr id="tilelayer-errortileurl">
            <td><code><b>errorTileUrl</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>URL to the tile image to show in place of the tile that failed to load.</td>
        </tr>
        <tr id="tilelayer-zoomoffset">
            <td><code><b>zoomOffset</b></code></td>
            <td><code>Number </code></td>
            <td><code>0</code></td>
            <td>The zoom number used in tile URLs will be offset with this value.</td>
        </tr>
        <tr id="tilelayer-tms">
            <td><code><b>tms</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If <code>true</code>, inverses Y axis numbering for tiles (turn this on for TMS services).</td>
        </tr>
        <tr id="tilelayer-zoomreverse">
            <td><code><b>zoomReverse</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If set to true, the zoom number used in tile URLs will be reversed
                (<code>maxZoom - zoom</code> instead of <code>zoom</code>)
            </td>
        </tr>
        <tr id="tilelayer-detectretina">
            <td><code><b>detectRetina</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If <code>true</code> and user is on a retina display, it will request four tiles of half
                the specified size and a bigger zoom level in place of one to utilize the high resolution.
            </td>
        </tr>
        <tr id="tilelayer-crossorigin">
            <td><code><b>crossOrigin</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If true, all tiles will have their crossOrigin attribute set to &#39;&#39;. This is needed if
                you want to access tile pixel data.
            </td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="/doc/maps/en/manual/other-layers#gridlayer-options">GridLayer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/other-layers#gridlayer-events">GridLayer</a> <!-- TODO: include events -->

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Methods

<table id="tilelayer-methods">
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="tilelayer-seturl">
            <td><code><b>setUrl</b>(
                <nobr>&lt;String&gt; <i>url</i></nobr>
                <nobr>&lt;Boolean&gt; <i>noRedraw?</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Updates the layer&#39;s URL template and redraws it (unless <code>noRedraw</code>
                is set to <code>true</code>).
            </td>
        </tr>
        <tr id="tilelayer-createtile">
            <td><code><b>createTile</b>(
                <nobr>&lt;Object&gt;</nobr> <i>coords</i>,
                <nobr>&lt;Function&gt;</nobr> <i>done?</i>)</nobr>
            </code></td>
            <td><code>HTMLElement</code></td>
            <td>Called only internally, overrides GridLayer&#39;s
                <a href="/doc/maps/en/manual/other-layers#gridlayer-createtile"><code>createTile()</code></a>
                to return an <code>&lt;img&gt;</code> HTML element with the appropiate
                image URL given <code>coords</code>. The <code>done</code>
                callback is called when the tile has been loaded.
            </td>
        </tr>
    </tbody>
</table>

##### Extension methods

Layers extending <a href="#dgtilelayer">TileLayer</a> might reimplement the following method.

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="tilelayer-gettileurl">
            <td><code><b>getTileUrl</b>(<nobr>&lt;Object&gt;</nobr> <i>coords</i>)</nobr></code></td>
            <td><code>String</code></td>
            <td>Called only internally, returns the URL for a tile given its coordinates.
                Classes extending <a href="#dgtilelayer"><code>TileLayer</code></a> can override
                this function to provide custom tile URL naming schemes.</td>
        </tr>
    </tbody>
</table>

Methods inherited from GridLayer <a href="/doc/maps/en/manual/other-layers#gridlayer-methods">GridLayer</a> <!-- TODO: include methods -->

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.TileLayer.wms

Used to display WMS services as tile layers on the map. Extends <a href="#dgtilelayer">TileLayer</a>.

#### Usage Example

    var nexrad = DG.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
        layers: 'nexrad-n0r-900913',
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad"
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
        <tr id="tilelayer-wms-dg-tilelayer-wms">
            <td><code><b>DG.tileLayer.wms</b>(
                <nobr>&lt;String&gt; <i>baseUrl</i></nobr>,
                <nobr>&lt;<a href="#tilelayer-wms-options">TileLayer.WMS options</a>&gt; <i>options</i>)</nobr>
            </code></td>
            <td>Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS
                parameters/options object.
            </td>
        </tr>
    </tbody>
</table>

#### Options

<table id="tilelayer-wms-options">
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="tilelayer-wms-layers">
            <td><code><b>layers</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td><strong>(required)</strong> Comma-separated list of WMS layers to show.</td>
        </tr>
        <tr id="tilelayer-wms-styles">
            <td><code><b>styles</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>Comma-separated list of WMS styles.</td>
        </tr>
        <tr id="tilelayer-wms-format">
            <td><code><b>format</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;image/jpeg&#x27;</code></td>
            <td>WMS image format (use <code>&#39;image/png&#39;</code> for layers with transparency).</td>
        </tr>
        <tr id="tilelayer-wms-transparent">
            <td><code><b>transparent</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If <code>true</code>, the WMS service will return images with transparency.</td>
        </tr>
        <tr id="tilelayer-wms-version">
            <td><code><b>version</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;1.1.1&#x27;</code></td>
            <td>Version of the WMS service to use</td>
        </tr>
        <tr id="tilelayer-wms-crs">
            <td><code><b>crs</b></code></td>
            <td><code>CRS </code></td>
            <td><code>null</code></td>
            <td>Coordinate Reference System to use for the WMS requests, defaults to
                map CRS. Don&#39;t change this if you&#39;re not sure what it means.
            </td>
        </tr>
        <tr id="tilelayer-wms-uppercase">
            <td><code><b>uppercase</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If <code>true</code>, WMS request parameter keys will be uppercase.</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="#tilelayer-options">TileLayer</a> <!-- TODO: include options -->

Options inherited from <a href="/doc/maps/en/manual/other-layers#gridlayer-options">GridLayer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/other-layers#gridlayer-events">GridLayer</a> <!-- TODO: include events -->

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->


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
        <tr id="tilelayer-wms-setparams">
            <td><code><b>setParams</b>(
                <nobr>&lt;Object&gt; <i>params</i></nobr>,
                <nobr>&lt;Boolean&gt; <i>noRedraw?</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Merges an object with the new parameters and re-requests tiles on the current screen
                (unless <code>noRedraw</code> was set to true).
            </td>
        </tr>
    </tbody>
</table>

Methods inherited from TileLayer <a href="#tilelayer-methods">TileLayer</a> <!-- TODO: include methods -->

Methods inherited from GridLayer <a href="/doc/maps/en/manual/other-layers#gridlayer-methods">GridLayer</a> <!-- TODO: include methods -->

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.ImageOverlay

Used to load and display a single image over specific bounds of the map. Extends Layer.

#### Usage Example

    var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
        imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
    DG.imageOverlay(imageUrl, imageBounds).addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="imageoverlay-l-imageoverlay">
            <td><code><b>L.imageOverlay</b>(
                <nobr>&lt;String&gt; <i>imageUrl</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                <nobr>&lt;ImageOverlay options&gt;</nobr> <i>options?</i></nobr>)
            </code></td>
            <td>Instantiates an image overlay object given the URL of the image and the
                geographical bounds it is tied to.
            </td>
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
        <tr id="imageoverlay-opacity">
            <td><code><b>opacity</b></code></td>
            <td><code>Number </code></td>
            <td><code>1.0</code></td>
            <td>The opacity of the image overlay.</td>
        </tr>
        <tr id="imageoverlay-alt">
            <td><code><b>alt</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>Text for the <code>alt</code> attribute of the image (useful for accessibility).</td>
        </tr>
        <tr id="imageoverlay-interactive">
            <td><code><b>interactive</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If <code>true</code>, the image overlay will emit mouse events when clicked or hovered.</td>
        </tr>
        <tr id="imageoverlay-attribution">
            <td><code><b>attribution</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
            <td>An optional string containing HTML to be shown on the <code>Attribution control</code></td>
        </tr>
        <tr id="imageoverlay-crossorigin">
            <td><code><b>crossOrigin</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If true, the image will have its crossOrigin attribute set to &#39;&#39;.
                This is needed if you want to access image pixel data.</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Mehtods

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="imageoverlay-setopacity">
            <td><code><b>setOpacity</b>()</nobr></code></td>
            <td><code>this</code></td>
            <td>Sets the opacity of the overlay.</td>
        </tr>
        <tr id="imageoverlay-bringtofront">
            <td><code><b>bringToFront</b>()</nobr></code></td>
            <td><code>this</code></td>
            <td>Brings the layer to the top of all overlays.</td>
        </tr>
        <tr id="imageoverlay-bringtoback">
            <td><code><b>bringToBack</b>()</nobr></code></td>
            <td><code>this</code></td>
            <td>Brings the layer to the bottom of all overlays.</td>
        </tr>
        <tr id="imageoverlay-seturl">
            <td><code><b>setUrl</b>(<nobr>&lt;String&gt; <i>url</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Changes the URL of the image.</td>
        </tr>
    </tbody>
</table>

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->
