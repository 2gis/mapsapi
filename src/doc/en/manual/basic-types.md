## Basic Types

This section describes the classes of basic data types that are often found in the pages of maps API guide and
required for use with many maps API objects.

{toc}

### DG.LatLng

Represents a geographical point with a certain latitude and longitude.

    var latlng = DG.latLng(54.98, 82.89);

All methods that accept LatLng objects also accept them in a simple Array form and simple object form
(unless noted otherwise), so these lines are equivalent:

    map.panTo([54.98, 82.89]);
    map.panTo({lon: 82.89, lat: 54.98});
    map.panTo({lat: 54.98, lng: 82.89});
    map.panTo(DG.latLng(54.98, 82.89));

#### Constructor

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
		</tr>
    </thead>
    <tbody>
        <tr id="latlng-l-latlng">
            <td><code><b>DG.latLng</b>(
                <nobr>&lt;Number&gt; <i>latitude</i>,</nobr>
                <nobr>&lt;Number&gt; <i>longitude</i>,</nobr>
                <nobr>&lt;Number&gt; <i>altitude?</i> )</nobr>
            </code></td>
            <td>Creates an object representing a geographical point with the given latitude and longitude
                (and optionally altitude).</td>
        </tr>
        <tr>
            <td><code><b>DG.latLng</b>(
                <nobr>&lt;Array&gt; <i>coords</i> )</nobr>
            </code></td>
            <td>Expects an array of the form <code>[Number, Number]</code> or <code>[Number, Number, Number]</code>
                instead.</td>
        </tr>
        <tr>
            <td><code><b>DG.latLng</b>(
                <nobr>&lt;Object&gt; <i>coords</i> )</nobr>
            </code></td>
            <td>Expects an plain object of the form <code>{lat: Number, lng: Number}</code> or
                <code>{lat: Number, lng: Number, alt: Number}</code> instead.</td>
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
        <tr id="latlng-equals">
            <td><code><b>equals</b>(
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>otherLatLng</i>,</nobr>
                <nobr>&lt;Number&gt; <i>maxMargin?</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the given <a href="#dglatlng"><code>LatLng</code></a> point is at the
                same position (within a small margin of error). The margin of error can be overriden by setting
                <code>maxMargin</code> to a small number.</td>
        </tr>
        <tr id="latlng-tostring">
            <td><code><b>toString</b>()</code></td>

            <td><code>String</code></td>
            <td>Returns a string representation of the point (for debugging purposes).</td>
        </tr>
        <tr id="latlng-distanceto">
            <td><code><b>distanceTo</b>(
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>otherLatLng</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Returns the distance (in meters) to the given <a href="#dglatlng"><code>LatLng</code></a>
                calculated using the <a href="http://en.wikipedia.org/wiki/Haversine_formula">Haversine formula</a>.</td>
        </tr>
        <tr id="latlng-wrap">
            <td><code><b>wrap</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td>Returns a new <a href="#dglatlng"><code>LatLng</code></a> object with the longitude wrapped
                so it&#39;s always between -180 and +180 degrees.</td>
        </tr>
        <tr id="latlng-tobounds">
            <td><code><b>toBounds</b>(
                <nobr>&lt;Number&gt; <i>sizeInMeters</i> )</nobr>
            </code></td>

            <td><code><a href="#dglatlngbounds">LatLngBounds</a></code></td>
            <td>Returns a new <a href="#dglatlngbounds"><code>LatLngBounds</code></a> object in which each boundary
                is <code>sizeInMeters</code> meters apart from the <a href="#dglatlng"><code>LatLng</code></a>.</td>
        </tr>
    </tbody>
</table>

#### Properties

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="latlng-lat">
            <td><code><b>lat</b></code></td>
            <td><code>Number</code></td>
            <td>Latitude in degrees.</td>
        </tr>
        <tr id="latlng-lng">
            <td><code><b>lng</b></code></td>
            <td><code>Number</code></td>
            <td>Longitude in degrees.</td>
        </tr>
        <tr id="latlng-alt">
            <td><code><b>alt</b></code></td>
            <td><code>Number</code></td>
            <td>Altitude in meters (optional).</td>
        </tr>
    </tbody>
</table>

### DG.LatLngBounds

Represents a rectangular geographical area on a map.

    var southWest = DG.latLng(54.9801, 82.8974),
        northEast = DG.latLng(54.9901, 82.9074),
        bounds = DG.latLngBounds(southWest, northEast);

All methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise),
so the bounds example above can be passed like this:

    map.fitBounds([
        [54.9801, 82.8974],
        [54.9901, 82.9074]
    ]);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="latlngbounds-l-latlngbounds">
            <td><code><b>DG.latLngBounds</b>(
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>southWest</i>,</nobr>
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>northEast</i> )</nobr>
            </code></td>
            <td>Creates a <a href="#dglatlngbounds"><code>LatLngBounds</code></a> object by defining south-west
                and north-east corners of the rectangle.</td>
        </tr>
        <tr>
            <td><code><b>DG.latLngBounds</b>(
                <nobr>&lt;LatLng[]&gt; <i>latlngs</i>)</nobr>
            </code></td>
            <td>Creates a <a href="#dglatlngbounds"><code>LatLngBounds</code></a> object defined by the geographical
                points it contains. Very useful for zooming the map to fit a particular set of locations with
                <a href="/doc/maps/en/manual/map#map-fitbounds">fitBounds</a>.</td>
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
        <tr id="latlngbounds-extend">
            <td><code><b>extend</b>(
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Extend the bounds to contain the given point.</td>
        </tr>
        <tr>
            <td><code><b>extend</b>(
                <nobr>&lt;<a href="#dglatlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Extend the bounds to contain the given bounds.</td>
        </tr>
        <tr id="latlngbounds-pad">
            <td><code><b>pad</b>(
                <nobr>&lt;Number&gt; <i>bufferRatio</i> )</nobr>
            </code></td>

            <td><code><a href="#dglatlngbounds">LatLngBounds</a></code></td>
            <td>Returns bigger bounds created by extending the current bounds by a given percentage in each direction.</td>
        </tr>
        <tr id="latlngbounds-getcenter">
            <td><code><b>getCenter</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td>Returns the center point of the bounds.</td>
        </tr>
        <tr id="latlngbounds-getsouthwest">
            <td><code><b>getSouthWest</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td>Returns the south-west point of the bounds.</td>
        </tr>
        <tr id="latlngbounds-getnortheast">
            <td><code><b>getNorthEast</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td>Returns the north-east point of the bounds.</td>
        </tr>
        <tr id="latlngbounds-getnorthwest">
            <td><code><b>getNorthWest</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td>Returns the north-west point of the bounds.</td>
        </tr>
        <tr id="latlngbounds-getsoutheast">
            <td><code><b>getSouthEast</b>()</code></td>

            <td><code><a href="#dglatlng">LatLng</a></code></td>
            <td>Returns the south-east point of the bounds.</td>
        </tr>
        <tr id="latlngbounds-getwest">
            <td><code><b>getWest</b>()</code></td>

            <td><code>Number</code></td>
            <td>Returns the west longitude of the bounds.</td>
        </tr>
        <tr id="latlngbounds-getsouth">
            <td><code><b>getSouth</b>()</code></td>

            <td><code>Number</code></td>
            <td>Returns the south latitude of the bounds.</td>
        </tr>
        <tr id="latlngbounds-geteast">
            <td><code><b>getEast</b>()</code></td>

            <td><code>Number</code></td>
            <td>Returns the east longitude of the bounds.</td>
        </tr>
        <tr id="latlngbounds-getnorth">
            <td><code><b>getNorth</b>()</code></td>

            <td><code>Number</code></td>
            <td>Returns the north latitude of the bounds.</td>
        </tr>
        <tr id="latlngbounds-contains">
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#dglatlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the rectangle contains the given one.</td>
        </tr>
        <tr id="latlngbounds-contains">
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
             </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the rectangle contains the given point.</td>
        </tr>
        <tr id="latlngbounds-intersects">
            <td><code><b>intersects</b>(
                <nobr>&lt;<a href="#dglatlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the rectangle intersects the given bounds. Two bounds intersect
                if they have at least one point in common.</td>
        </tr>
        <tr id="latlngbounds-overlaps">
            <td><code><b>overlaps</b>(
                <nobr>&lt;<a href="#dgbounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the rectangle overlaps the given bounds. Two bounds overlap
                if their intersection is an area.</td>
        </tr>
        <tr id="latlngbounds-tobboxstring">
            <td><code><b>toBBoxString</b>()</code></td>

            <td><code>String</code></td>
            <td>Returns a string with bounding box coordinates in a
                &#39;southwest_lng,southwest_lat,northeast_lng,northeast_lat&#39; format. Useful for sending
                requests to web services that return geo data.</td>
        </tr>
        <tr id="latlngbounds-equals">
            <td><code><b>equals</b>(
                <nobr>&lt;<a href="#dglatlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the rectangle is equivalent (within a small margin of error)
                to the given bounds.</td>
        </tr>
        <tr id="latlngbounds-isvalid">
            <td><code><b>isValid</b>()</code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the bounds are properly initialized.</td>
        </tr>
    </tbody>
</table>

### DG.Point

Represents a point with x and y coordinates in pixels.

    var point = DG.point(200, 300);

All methods and options that accept Point objects also accept them in a simple Array form
(unless noted otherwise), so these lines are equivalent:

    map.panBy([200, 300]);
    map.panBy(DG.point(200, 300));

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="point-l-point">
            <td><code><b>DG.point</b>(
                <nobr>&lt;Number&gt; <i>x</i>,</nobr>
                <nobr>&lt;Number&gt; <i>y</i>,</nobr>
                <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
            </code></td>
            <td>Creates a Point object with the given <code>x</code> and <code>y</code> coordinates.
                If optional <code>round</code> is set to true, rounds the <code>x</code> and <code>y</code> values.</td>
        </tr>
        <tr id="point-l-point">
            <td><code><b>DG.point</b>(
                <nobr>&lt;Number[]&gt; <i>coords</i>)</nobr>
            </code></td>
            <td>Expects an array of the form <code>[x, y]</code> instead.</td>
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
        <tr id="point-clone">
            <td><code><b>clone</b>()</nobr></code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns a copy of the current point.</td>
        </tr>
        <tr id="point-add">
            <td><code><b>add</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns the result of addition of the current and the given points.</td>
        </tr>
        <tr id="point-subtract">
            <td><code><b>subtract</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns the result of subtraction of the given point from the current.</td>
        </tr>
        <tr id="point-divideby">
            <td><code><b>divideBy</b>(
                <nobr>&lt;Number&gt; <i>num</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns the result of division of the current point by the given number.</td>
        </tr>
        <tr id="point-multiplyby">
            <td><code><b>multiplyBy</b>(
                <nobr>&lt;Number&gt; <i>num</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns the result of multiplication of the current point by the given number.</td>
        </tr>
        <tr id="point-scaleby">
            <td><code><b>scaleBy</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>scale</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Multiply each coordinate of the current point by each coordinate of
                <code>scale</code>. In linear algebra terms, multiply the point by the
                <a href="https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation">scaling matrix</a>
                defined by <code>scale</code>.</td>
        </tr>
        <tr id="point-unscaleby">
            <td><code><b>unscaleBy</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>scale</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Inverse of <code>scaleBy</code>. Divide each coordinate of the current point by
                each coordinate of <code>scale</code>.</td>
        </tr>
        <tr id="point-round">
            <td><code><b>round</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns a copy of the current point with rounded coordinates.</td>
        </tr>
        <tr id="point-floor">
            <td><code><b>floor</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns a copy of the current point with floored coordinates (rounded down).</td>
        </tr>
        <tr id="point-ceil">
            <td><code><b>ceil</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns a copy of the current point with ceiled coordinates (rounded up).</td>
        </tr>
        <tr id="point-distanceto">
            <td><code><b>distanceTo</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code>Number</code></td>
            <td>Returns the cartesian distance between the current and the given points.</td>
        </tr>
        <tr id="point-equals">
            <td><code><b>equals</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the given point has the same coordinates.</td>
        </tr>
        <tr id="point-contains">
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>otherPoint</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if both coordinates of the given point are less than
                the corresponding current point coordinates (in absolute values).</td>
        </tr>
        <tr id="point-tostring">
            <td><code><b>toString</b>()</code></td>

            <td><code>String</code></td>
            <td>Returns a string representation of the point for debugging purposes.</td>
        </tr>
    </tbody>
</table>

#### Properties

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>x</b></code></td>
            <td><code>Number</code></td>
            <td><code>x</code> coordinate.</td>
        </tr>
        <tr>
            <td><code><b>y</b></code></td>
            <td><code>Number</code></td>
            <td><code>y</code> coordinate.</td>
        </tr>
    </tbody>
</table>

### DG.Bounds

Represents a rectangular area in pixel coordinates.

    var p1 = DG.point(10, 10),
        p2 = DG.point(40, 60),
        bounds = DG.bounds(p1, p2);

All methods that accept <a href="#dgbounds"><code>Bounds</code></a> objects also accept them in a simple Array form
(unless noted otherwise), so the bounds example above can be passed like this:</p>

    otherBounds.intersects([[10, 10], [40, 60]]);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="bounds-l-bounds">
            <td><code><b>DG.bounds</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>topLeft</i>,</nobr>
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>bottomRight</i> )</nobr>
            </code></td>
            <td>Creates a Bounds object from two coordinates (usually top-left and bottom-right corners).</td>
        </tr>
        <tr id="bounds-l-bounds">
            <td><code><b>DG.bounds</b>(
                <nobr>&lt;Point[]&gt; <i>points</i> )</nobr>
            </code></td>
            <td>Creates a Bounds object from the points it contains.</td>
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
        <tr id="bounds-extend">
            <td><code><b>extend</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Extends the bounds to contain the given point.</td>
        </tr>
        <tr id="bounds-getcenter">
            <td><code><b>getCenter</b>(
                <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
            </code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns the center point of the bounds.</td>
        </tr>
        <tr id="bounds-getbottomleft">
            <td><code><b>getBottomLeft</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns the bottom-left point of the bounds.</td>
        </tr>
        <tr id="bounds-gettopright">
            <td><code><b>getTopRight</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns the top-right point of the bounds.</td>
        </tr>
        <tr id="bounds-getsize">
            <td><code><b>getSize</b>()</code></td>

            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>Returns the size of the given bounds.</td>
        </tr>
        <tr id="bounds-contains">
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#dgbounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the rectangle contains the given one.</td>
        </tr>
        <tr id="bounds-contains">
            <td><code><b>contains</b>(
                <nobr>&lt;<a href="#dgpoint">Point</a>&gt; <i>point</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the rectangle contains the given poing.</td>
        </tr>
        <tr id="bounds-intersects">
            <td><code><b>intersects</b>(
                <nobr>&lt;<a href="#dgbounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the rectangle intersects the given bounds. Two bounds
                intersect if they have at least one point in common.</td>
        </tr>
        <tr id="bounds-overlaps">
            <td><code><b>overlaps</b>(
                <nobr>&lt;<a href="#dgbounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the rectangle overlaps the given bounds. Two bounds
                overlap if their intersection is an area.</td>
        </tr>
    </tbody>
</table>

#### Properties

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="bounds-min">
            <td><code><b>min</b></code></td>
            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>The top left corner of the rectangle.</td>
        </tr>
        <tr id="bounds-max">
            <td><code><b>max</b></code></td>
            <td><code><a href="#dgpoint">Point</a></code></td>
            <td>The bottom right corner of the rectangle.</td>
        </tr>
	</tbody>
</table>
