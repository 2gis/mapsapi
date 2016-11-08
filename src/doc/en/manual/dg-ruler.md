## Ruler

Displays a ruler on the map that allows to measure distances between geographical points.

{toc}

### DG.Ruler

#### Example of usage

Create and display a ruler on the map:

    var latLngs = [
        [51.7314, 36.1938],
        [51.7307, 36.1894],
        [51.7297, 36.1926],
        [51.7299, 36.1968],
        [51.7307, 36.1968]]
    DG.ruler(latLngs).addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Usage</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>DG.Ruler</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>[]&gt; <i>latlngs</i>,</nobr>
                <nobr>&lt;<a href="#dgruler-options">Ruler options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td><code>DG.ruler(&hellip;)</code></td>
            <td>Creates the ruler object by the given array of geographical points and optional object of options.</td>
        </tr>
    </tbody>
</table>

#### Options

<table id='dgruler-options'>
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>editable</b></code></td>
            <td><code>Boolean</code></td>
            <td><code><span class="string">'true'</span></td>
            <td>Is it possible to change the intermediate points of the ruler.</td>
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
        <tr>
            <td><code><b>addTo</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/map#dgmap">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Adds a ruler to the map.</td>
        </tr>
        <tr>
            <td><code><b>getTotalDistance</b>()</nobr></code></td>
            <td><code>Number</code></td>
            <td>Returns the distance (in meters) between the start and end points.</td>
        </tr>
        <tr>
            <td><code><b>addLatLng</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Adds a point to the ruler.</td>
        </tr>
        <tr>
            <td><code><b>setLatLngs</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>[]&gt; <i>latlngs</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Replaces all the pixels of the ruler with an array of the transferred geographical locations.</td>
        </tr>
        <tr>
            <td><code><b>getLatLngs</b>()</code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>[]</code></td>
            <td>Returns an array of points of the ruler.</td>
        </tr>
        <tr>
            <td><code><b>spliceLatLngs</b>(
                <nobr>&lt;Number&gt; <i>index</i></nobr>,
                <nobr>&lt;Number&gt; <i>pointsToRemove</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng?</i>, &hellip; )</nobr>
            </code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>[]</code></td>
            <td>Allows you to add, remove or replace the points in the ruler. The syntax is similar
                <a target="_blank" href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice">Array#splice</a>.
                Returns an array of remote points.</td>
        </tr>
    </tbody>
</table>
