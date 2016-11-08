## Well-known text


Is used to obtain the vector layers of API maps based on their description in
<a target="_blank" href="http://en.wikipedia.org/wiki/Well-known_text">WKT format</a>.

{toc}

### DG.Wkt

#### Example of usage

Reads the description of the polygon in WKT format and displays it on the map:

    var polygonComponents = 'POLYGON((82.91699 55.042136, 82.917522 55.040187, 82.918063 55.040235, 82.917540 55.042184,82.91699 55.042136))';
    DG.Wkt.geoJsonLayer(polygonComponents).addTo(map);

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
            <td><code><b>DG.Wkt.toGeoJSON</b>(
                <nobr>&lt;String&gt; <i>wkt</i>)</nobr>
            </code></td>
            <td><code>geoJSON</code></td>
            <td>Reads a string in WKT format and verifies its correctness. Returns
                <a href="http://geojson.org/geojson-spec.html" target="_blank">GeoJSON</a>.</td>
        </tr>
        <tr>
            <td><code><b>DG.Wkt.toLatLngs</b>(
                <nobr>&lt;String | Array&gt; <i>wkt</i>)</nobr>
            </code></td>
            <td><code>Array</code></td>
            <td>Reads a string in WKT format and returns the pixel array in the
                <a href="/doc/maps/en/manual/basic-types/#dglatlng">LatLng</a> format (its internal representation).
                Can take an array of WKT strings.</td>
        </tr>
        <tr>
            <td><code><b>DG.Wkt.geoJsonLayer</b>(
                <nobr>&lt;String&gt; <i>wkt</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/en/manual/other-layers#geojson-option">GeoJSON options</a>&gt; <i>options?</i>)</nobr></code></td>
            <td><code>Object</code></td>
            <td>Creates a GeoJSON layer. Takes a string in WKT format to display the data on the map
                and the object of options. Generates a vector layer of maps AP based on the data read
                with the DG.Wkt.toGeoJSON method. This method supports all the options of the constructor
                of the <a href="/doc/maps/en/manual/other-layers#dggeojson">DG.GeoJSON</a> class.
                For example, you can send the <code>DG.Wkt.geoJsonLayer(polygonComponents, {clickable:false})</code>
                parameter, to make the layer non-clickable.</td>
        </tr>
    </tbody>
</table>
