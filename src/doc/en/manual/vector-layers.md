## Vector Layers

This section describes classes for working with vector layers - a geometrical
objects like circles, polylines and polygons.

{toc}

### DG.Path

An abstract class that contains options and constants shared between vector overlays 
(Polygon, Polyline, Circle). Do not use it directly. Extends <a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a>.

#### Options

<table id="dgpath-options">
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="path-stroke">
            <td><code><b>stroke</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether to draw stroke along the path. Set it to <code>false</code>
                to disable borders on polygons or circles.</td>
        </tr>
        <tr id="path-color">
            <td><code><b>color</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;#3388ff&#x27;</code></td>
            <td>Stroke color</td>
        </tr>
        <tr id="path-weight">
            <td><code><b>weight</b></code></td>
            <td><code>Number </code></td>
            <td><code>3</code></td>
            <td>Stroke width in pixels</td>
        </tr>
        <tr id="path-opacity">
            <td><code><b>opacity</b></code></td>
            <td><code>Number </code></td>
            <td><code>1.0</code></td>
            <td>Stroke opacity</td>
        </tr>
        <tr id="path-linecap">
            <td><code><b>lineCap</b></code></td>
            <td><code>String</code></td>
            <td><code>&#x27;round&#x27;</code></td>
            <td>A string that defines
                <a href="https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap">shape to be
                used at the end</a> of the stroke.</td>
        </tr>
        <tr id="path-linejoin">
            <td><code><b>lineJoin</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;round&#x27;</code></td>
            <td>A string that defines
                <a href="https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin">shape to
                be used at the corners</a> of the stroke.</td>
        </tr>
        <tr id="path-dasharray">
            <td><code><b>dashArray</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
            <td>A string that defines the stroke
                <a href="https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray">dash pattern</a>.
                Doesn&#39;t work on canvas-powered layers (e.g. Android 2).</td>
        </tr>
        <tr id="path-dashoffset">
            <td><code><b>dashOffset</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
            <td>A string that defines the
                <a href="https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset">distance
                into the dash pattern to start the dash</a>. Doesn&#39;t work on canvas-powered layers</td>
        </tr>
        <tr id="path-fill">
            <td><code><b>fill</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>depends</code></td>
            <td>Whether to fill the path with color. Set it to <code>false</code> to disable
                filling on polygons or circles.</td>
        </tr>
        <tr id="path-fillcolor">
            <td><code><b>fillColor</b></code></td>
            <td><code>String </code></td>
            <td><code>*</code></td>
            <td>Fill color. Defaults to the value of the <a href="#path-color"><code>color</code></a> option</td>
        </tr>
        <tr id="path-fillopacity">
            <td><code><b>fillOpacity</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.2</code></td>
            <td>Fill opacity.</td>
        </tr>
        <tr id="path-fillrule">
            <td><code><b>fillRule</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;evenodd&#x27;</code></td>
            <td>A string that defines
                <a href="https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule">how the inside
                of a shape</a> is determined.</td>
        </tr>
        <tr id="path-interactive">
            <td><code><b>interactive</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>If <code>false</code>, the vector will not emit mouse events and will
                act as a part of the underlying map.</td>
        </tr>
        <tr id="path-renderer">
            <td><code><b>renderer</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#dgrenderer">Renderer</a></code></td>
            <td><code></code></td>
            <td>Use this specific instance of <a href="/doc/maps/en/manual/base-classes#dgrenderer"><code>Renderer</code></a> for this path. Takes
                precedence over the map&#39;s <a href="/doc/maps/en/manual/map#map-renderer">default renderer</a>.</td>
        </tr>
        <tr id="path-classname">
            <td><code><b>className</b></code></td>
            <td><code>string </code></td>
            <td><code>null</code></td>
            <td>Custom class name set on an element. Only for SVG renderer.</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Methods

<table id="dgpath-methods">
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="path-redraw">
            <td><code><b>redraw</b>()</code></td>
            <td><code>this</code></td>
            <td>Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.</td>
        </tr>
        <tr id="path-setstyle">
            <td><code>
                <b>setStyle</b>(
                <nobr>&lt;<a href="#dgpath-options">Path options</a>&gt; <i>style</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Changes the appearance of a Path based on the options in the <a href="#dgpath-options">
                <code>Path options</code></a> object.</td>
        </tr>
        <tr id="path-bringtofront">
            <td><code><b>bringToFront</b>()</code></td>
            <td><code>this</code></td>
            <td>Brings the layer to the top of all path layers.</td>
        </tr>
        <tr id="path-bringtoback">
            <td><code><b>bringToBack</b>()</code></td>
            <td><code>this</code></td>
            <td>Brings the layer to the bottom of all path layers. </td>
        </tr>
    </tbody>
</table>

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.Polyline

A class for drawing polyline overlays on a map. Extends <a href="#dgpath">Path</a>.

#### Usage example

    // create a red polyline from an array of LatLng points
    var latlngs = [
        [-122.68, 45.51],
        [-122.43, 37.77],
        [-118.2, 34.04]
    ];
    var polyline = DG.polyline(latlngs, {color: 'red'}).addTo(map);
    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());

You can also pass a multi-dimensional array to represent a MultiPolyline shape:

    // create a red polyline from an array of arrays of LatLng points
    var latlngs = [
        [[-122.68, 45.51],
         [-122.43, 37.77],
         [-118.2, 34.04]],
        [[-73.91, 40.78],
         [-87.62, 41.83],
         [-96.72, 32.76]]
    ];

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="polyline-l-polyline">
            <td><code><b>DG.polyline</b>(
                <nobr>&lt;LatLng[]&gt; <i>latlngs</i></nobr>,
                <nobr>&lt;<a href="#dgpath-options">Path options</a>&gt; <i>options?</i>)</nobr>
            </code></td>
            <td>Instantiates a polyline object given an array of geographical points and
                optionally an options object. You can create a <a href="#dgpolyline"><code>Polyline</code></a>
                object with multiple separate lines (<code>MultiPolyline</code>) by passing an array of arrays
                of geographic points.</td>
        </tr>
    </tbody>
</table>

#### Options

<table id="dgpolyline-options">
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="polyline-smoothfactor">
            <td><code><b>smoothFactor</b></code></td>
            <td><code>Number </code>
            <td><code>1.0</code></td>
            <td>How much to simplify the polyline on each zoom level. More means
                better performance and smoother look, and less means more accurate representation.</td>
        </tr>
        <tr id="polyline-noclip">
            <td><code><b>noClip</b></code></td>
            <td><code>Boolean: false</code>
            <td><code></code></td>
            <td>Disable polyline clipping.</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="#dgpath-options">Path</a> <!-- TODO: include options -->

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Methods

<table id="dgpolyline-methods">
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="polyline-togeojson">
            <td><code><b>toGeoJSON</b>()</code></td>
            <td><code>Object</code></td>
            <td>Returns a <a href="http://en.wikipedia.org/wiki/GeoJSON">
                <code>GeoJSON</code></a> representation of the polyline
                (as a GeoJSON <code>LineString</code> or <code>MultiLineString</code> Feature).</td>
        </tr>
        <tr id="polyline-getlatlngs">
            <td><code><b>getLatLngs</b>()</code></td>
            <td><code>LatLng[]</code></td>
            <td>Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.</td>
        </tr>
        <tr id="polyline-setlatlngs">
            <td><code><b>setLatLngs</b>(<nobr>&lt;LatLng[]&gt; <i>latlngs</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Replaces all the points in the polyline with the given array of geographical points.</td>
        </tr>
        <tr id="polyline-isempty">
            <td><code><b>isEmpty</b>()</code></td>
            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the Polyline has no LatLngs.</td>
        </tr>
        <tr id="polyline-getcenter">
            <td><code><b>getCenter</b>()</code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Returns the center (<a href="http://en.wikipedia.org/wiki/Centroid">centroid</a>) of the
            polyline.</td>
        </tr>
        <tr id="polyline-getbounds">
            <td><code><b>getBounds</b>()</code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlngbounds">LatLngBounds</a></code></td>
            <td>Returns the <a href="/doc/maps/en/manual/basic-types#dglatlngbounds"><code>LatLngBounds</code></a> of the path.</td>
        </tr>
        <tr id="polyline-addlatlng">
            <td><code><b>addLatLng</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>
                    Adds a given point to the polyline. By default, adds to the first ring of
                    the polyline in case of a multi-polyline, but can be overridden by passing
                    a specific ring as a LatLng array (that you can earlier access with
                    <a href="#polyline-getlatlngs"><code>getLatLngs</code></a>).
                </td>
        </tr>
    </tbody>
</table>

Methods inherited from <a href="#dgpath-methods">Path</a> <!-- TODO: include methods -->

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.Polygon

A class for drawing polygon overlays on a map. Extends <a href="#dgpolyline">Polyline</a>.
Note that points you pass when creating a polygon shouldn't have an additional last point equal
to the first one — it's better to filter out such points.

#### Usage example

    // create a red polygon from an array of LatLng points
    var latlngs = [[-111.03, 41],[-111.04, 45],[-104.05, 45],[-104.05, 41]];
    var polygon = DG.polygon(latlngs, {color: 'red'}).addTo(map);
    // zoom the map to the polygon
    map.fitBounds(polygon.getBounds());

You can also pass an array of arrays of latlngs, with the first array representing the outer shape
and the other arrays representing holes in the outer shape:

    var latlngs = [
      [[-111.03, 41],[-111.04, 45],[-104.05, 45],[-104.05, 41]], // outer ring
      [[-108.58,37.29],[-108.58,40.71],[-102.50,40.71],[-102.50,37.29]] // hole
    ];

Additionally, you can pass a multi-dimensional array to represent a MultiPolygon shape.

    var latlngs = [
      [ // first polygon
        [[-111.03, 41],[-111.04, 45],[-104.05, 45],[-104.05, 41]], // outer ring
        [[-108.58,37.29],[-108.58,40.71],[-102.50,40.71],[-102.50,37.29]] // hole
      ],
      [ // second polygon
        [[-109.05, 37],[-109.03, 41],[-102.05, 41],[-102.04, 37],[-109.05, 38]]
      ]
    ];

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="polygon-l-polygon">
            <td><code>
                <b>DG.polygon</b>(
                <nobr>&lt;LatLng[]&gt; <i>latlngs</i></nobr>,
                <nobr>&lt;Polyline options&gt; <i>options?</i>)</nobr>
            </code></td>
            <td></td>
        </tr>
    </tbody>
</table>


#### Options

Options inherited from <a href="#dgpolyline-options">Polyline</a> <!-- TODO: include options -->

Options inherited from <a href="#dgpath-options">Path</a> <!-- TODO: include options -->

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Methods

<span id="#dgpolygon-methods"></span>

Methods inherited from <a href="#dgpolyline-methods">Polyline</a> <!-- TODO: include methods -->

Methods inherited from <a href="#dgpath-methods">Path</a> <!-- TODO: include methods -->

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.Rectangle

A class for drawing rectangle overlays on a map. Extends <a href="#dgpolygon">Polygon</a>.

#### Usage example

    // define rectangle geographical bounds
    var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
    // create an orange rectangle
    DG.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
    // zoom the map to the rectangle bounds
    map.fitBounds(bounds);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="rectangle-l-rectangle">
            <td><code>
                <b>DG.rectangle</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>latLngBounds</i></nobr>,
                <nobr>&lt;Polyline options&gt; <i>options?</i>)</nobr>
            </code></td>
            <td></td>
        </tr>
    </tbody>
</table>

#### Options

Options inherited from <a href="#dgpolyline-options">Polyline</a> <!-- TODO: include options -->

Options inherited from <a href="#dgpath-options">Path</a> <!-- TODO: include options -->

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### Events

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
        <tr id="rectangle-setbounds">
            <td><code><b>setBounds</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>latLngBounds</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Redraws the rectangle with the passed bounds.</td>
        </tr>
    </tbody>
</table>

Methods inherited from <a href="#dgpolygon-method">Polygon</a> <!-- TODO: include methods -->

Methods inherited from <a href="#dgpath-methods">Path</a> <!-- TODO: include methods -->

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.Circle

A class for drawing circle overlays on a map. Extends <a href="#dgcirclemarker">CircleMarker</a>. It's an approximation
and starts to diverge from a real circle closer to poles (due to projection distortion).

#### Usage example

    DG.circle([50.5, 30.5], 200).addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="circle-l-circle">
            <td><code>
                <b>DG.circle</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;<a href="#dgpath-options">Path options</a>&gt; <i>options?</i>)</nobr>
            </code></td>
            <td>Instantiates a circle object given a geographical point, and an options object
                which contains the circle radius.</td>
        </tr>
        <tr id="circle-l-circle-2">
            <td><code><b>DG.circle</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                <nobr>&lt;Number&gt; <i>radius</i></nobr>,
                <nobr>&lt;<a href="#dgpath-options">Path options</a>&gt; <i>options?</i>)</nobr>
            </code></td>
            <td>Obsolete way of instantiating a circle, for compatibility with old code.
                Do not use in new applications or plugins.</td>
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
        <tr id="circle-radius">
            <td><code><b>radius</b></code></td>
            <td><code>Number</code>
            <td><code></code></td>
            <td>Radius of the circle, in meters.</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="#dgpath-options">Path</a> <!-- TODO: include options -->

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### Events

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
        <tr id="circle-setradius">
            <td><code>
                <b>setRadius</b>(
                <nobr>&lt;Number&gt; <i>radius</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Sets the radius of a circle. Units are in meters.</td>
        </tr>
        <tr id="circle-getradius">
            <td><code><b>getRadius</b>()</code></td>
            <td><code>Number</code></td>
            <td>Returns the current radius of a circle. Units are in meters.</td>
        </tr>
        <tr id="circle-getbounds">
            <td><code><b>getBounds</b>()</code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlngbounds">LatLngBounds</a></code></td>
            <td>Returns the <a href="/doc/maps/en/manual/basic-types#dglatlngbounds"><code>LatLngBounds</code></a>
                of the path.</td>
        </tr>
    </tbody>
</table>

Methods inherited from <a href="#dgcirclemarker-methods">CircleMarker</a> <!-- TODO: include methods -->

Methods inherited from <a href="#dgpath-methods">Path</a> <!-- TODO: include methods -->

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.CircleMarker

A circle of a fixed size with radius specified in pixels. Extends <a href="#dgpath">Path</a>.

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="circlemarker-dg-circlemarker">
            <td><code>
                <b>DG.circleMarker</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                <i>options</i>)</code></td>
            <td>Instantiates a circle marker object given a geographical point, and an optional options object.</td>
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
        <tr id="circlemarker-radius">
            <td><code><b>radius</b></code></td>
            <td><code>Number </code></td>
            <td><code>10</code></td>
            <td>Radius of the circle marker, in pixels</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="#dgpath-options">Path</a> <!-- TODO: include options -->

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->


#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Methods

<table id="dgcirclemarker-methods">
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="circlemarker-togeojson">
            <td><code><b>toGeoJSON</b>()</code></td>
            <td><code>Object</code></td>
            <td>
                    Returns a <a href="http://en.wikipedia.org/wiki/GeoJSON"><code>GeoJSON</code></a>
                    representation of the circle marker (as a GeoJSON <a href="/doc/maps/en/manual/basic-types#point"><code>Point</code></a>
                    Feature).
                </td>
        </tr>
        <tr id="circlemarker-setlatlng">
            <td><code><b>setLatLng</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latLng</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Sets the position of a circle marker to a new location. </td>
        </tr>
        <tr id="circlemarker-getlatlng">
            <td><code><b>getLatLng</b>()</code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Returns the current geographical position of the circle marker </td>
        </tr>
        <tr id="circlemarker-setradius">
            <td><code><b>setRadius</b>(<nobr>&lt;Number&gt; <i>radius</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Sets the radius of a circle marker. Units are in pixels. </td>
        </tr>
        <tr id="circlemarker-getradius">
            <td><code><b>getRadius</b>()</code></td>
            <td><code>Number</code></td>
            <td>Returns the current radius of the circle </td>
        </tr>
    </tbody>
</table>

Methods inherited from <a href="#dgpath-methods">Path</a> <!-- TODO: include methods -->

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->


### DG.Svg

Allows vector layers to be displayed with <a href="https://developer.mozilla.org/docs/Web/SVG">SVG</a>.
Inherits <a href="/doc/maps/en/manual/base-classes#dgrenderer">Renderer</a>.

Due to <a href="http://caniuse.com/#search=svg">technical limitations</a>, SVG is not
available in all web browsers, notably Android 2.x and 3.x.

Although SVG is not available on IE8, this browser supports
<a href="https://en.wikipedia.org/wiki/Vector_Markup_Language">VML</a>
(a now deprecated technology), and the SVG renderer will fall back to VML in
this case.


#### Usage example

Use SVG by default for all paths in the map:

    var map = DG.map("map", {
        renderer: DG.svg();
    });

Use a SVG renderer with extra padding for specific vector geometries:

    var map = DG.map("map");
    var myRenderer = DG.svg({ padding: 0.5 });
    var line = DG.polyline( coordinates, { renderer: myRenderer } );
    var circle = DG.circle( center, { renderer: myRenderer } );

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="svg-dg-svg">
            <td><code><b>DG.svg</b>(<nobr>&lt;SVG options&gt; <i>options?</i>)</nobr></code></td>
            <td>Creates a SVG renderer with the given options.</td>
        </tr>
    </tbody>
</table>

#### Options

Options inherited from <a href="/doc/maps/en/manual/base-classes#dgrenderer-options">Renderer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Methods

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

#### Functions

There are several static functions which can be called without instantiating DG.SVG:

<table>
    <thead>
        <tr>
            <th>Function</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="svg-create">
            <td><code><b>create</b>(<nobr>&lt;String&gt; <i>name</i>)</nobr></code></td>
            <td><code>SVGElement</code></td>
            <td>Returns a instance of <a href="https://developer.mozilla.org/docs/Web/API/SVGElement">SVGElement</a>,
                corresponding to the class name passed. For example, using &#39;line&#39; will return
                an instance of <a href="https://developer.mozilla.org/docs/Web/API/SVGLineElement">SVGLineElement</a>.</td>
        </tr>
        <tr id="svg-pointstopath">
            <td><code>
                <b>pointsToPath</b>(
                <nobr>&lt;[]&gt; <i>rings</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>closed</i>)</nobr>
            </code></td>
            <td><code>String</code></td>
            <td>Generates a SVG path string for multiple rings, with each ring turning
                into &quot;M..L..L..&quot; instructions</td>
        </tr>
    </tbody>
</table>

### DG.Canvas

Allows vector layers to be displayed with <a href="https://developer.mozilla.org/docs/Web/API/Canvas_API">canvas</a>.
Inherits <a href="/doc/maps/en/manual/base-classes#dgrenderer"><code>Renderer</code></a>.
Inherits <a href="/doc/maps/en/manual/base-classes#dgrenderer">Renderer</a>.
Due to <a href="http://caniuse.com/#search=canvas">technical limitations</a>, Canvas is not
available in all web browsers, notably IE8, and overlapping geometries might
not display properly in some edge cases.

#### Usage example

Use Canvas by default for all paths in the map:

    var map = DG.map('map', {
        renderer: DG.canvas();
    });

Use a Canvas renderer with extra padding for specific vector geometries:

    var map = DG.map('map');
    var myRenderer = DG.canvas({ padding: 0.5 });
    var line = DG.polyline( coordinates, { renderer: myRenderer } );
    var circle = DG.circle( center, { renderer: myRenderer } );

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="canvas-dg-canvas">
            <td><code><b>DG.canvas</b>(<nobr>&lt;Canvas options&gt; <i>options?</i>)</nobr></code></td>
            <td>Creates a Canvas renderer with the given options.</td>
        </tr>
    </tbody>
</table>

#### Options

Options inherited from <a href="/doc/maps/en/manual/base-classes#dgrenderer-options">Renderer</a> <!-- TODO: include options -->

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Methods

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->
