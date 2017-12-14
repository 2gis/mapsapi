## Labels

{toc}

### DG.Label

<code>DG.Label</code> class implements a small hint which may appear over a particular object on the map
(above a marker or a vector layer, for example). Also, the tips can be shown not only when you
hover the mouse over the object, but constantly, these tips are called static.

#### Example of usage

To enable the display of tips when you hover over the marker is quite easy:

    DG.marker([54.9502, 82.8380], {
        label : 'I'm a tip!'
    }).addTo(map);

For vector layers, you can specify a tip in this way, for example:

    DG.polyline([
        [55.02, 83.02],
        [54.97, 83.03],
        [54.95, 83.01],
        [54.98, 82.97]
    ], {
        label: 'I am a hint!'
    }).addTo(map);

To add a tip to an object that has been already created, you can call the <code>bindLabel</code> method:

    var marker = DG.marker([54.9502, 82.8980]).addTo(map);
    marker.bindLabel('I am a static tip!', { static: true });

<!--
TODO: JSAPI-3564
Showing autonomous static labels on the map:

    DG.label('I am an autonomous hint!')
        .setLatLng([54.9502, 82.8980]);
        .addTo(map);

#### Creation
...
-->

#### Options

When you call the <code>bindLabel</code> method, you can set the following options for the tooltip:

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
        <tr>
            <td><b><code>offset</code></b></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td><nobr><code>Point(12, 15)</code></nobr></td>
            <td>The offset of a tooltip container relative to the cursor position (the position
                of the marker in the case when used with a marker).</td>
        </tr>
        <tr>
            <td><b><code>className</code></b></td>
            <td><code>String</code></td>
            <td><code>'dg-label'</code></td>
            <td>The CSS class that will be assigned to the DOM element of the tooltip.</td>
        </tr>
        <tr id="label-static">
            <td><b><code>static</code></b></td>
            <td><code>Boolean</code></td>
            <td><code>false</code></td>
            <td>If the value is set to <code>true</code>, then the tooltip will be always visible
                (this option is available only for a marker tip).</td>
        </tr>
        <tr id="label-textdirection">
            <td><code><b>textDirection</b></code></td>
            <td><code>string</code></td>
            <td><code>'auto'</code></td>
            <td>The direction of the label text. The following values are possible: <code>'auto'</code>,
                <code>'rtl'</code>, <code>'ltr'</code>.</td>
        </tr>
    </tbody>
</table>

<!--
TODO: JSAPI-3564
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
            <td><code><b>setContent</b>(&lt;String&gt; content)</code></td>
            <td><code>this</code></td>
            <td>Sets the contents of the tooltip.</td>
        </tr>
        <tr>
            <td><code><b>setLatLng</b>(&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; latlng)</code></td>
            <td><code>this</code></td>
            <td>Sets the geographical coordinates of the tip.</td>
        </tr>
        <tr>
            <td><code><b>getLatLng</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Returns the geographical coordinates of the tip.</td>
        </tr>
    </tbody>
</table>
-->
