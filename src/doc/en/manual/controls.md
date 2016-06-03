## Controls

Controls is a user interface components by which a user can interact with the map.

{toc}

### DG.Control.Zoom

A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless
you set its <a href="/doc/maps/en/manual/map#map-zoomcontrol"><code>zoomControl</code> option</a> to <code>false</code>.
Extends <a href="/doc/maps/en/manual/base-classes#dgcontrol"><code>Control</code></a>.

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-zoom-l-control-zoom">
            <td><code><b>DG.control.zoom</b>(
                <nobr>&lt;<a href="#control-zoom-option">DG.Control.Zoom options</a>&gt; <i>options</i> )</nobr>
            </code></td>
            <td>Creates a zoom control</td>
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
        <tr id="control-zoom-zoomintext">
            <td><code><b>zoomInText</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;+&#x27;</code></td>
            <td>The text set on the &#39;zoom in&#39; button.</td>
        </tr>
        <tr id="control-zoom-zoomintitle">
            <td><code><b>zoomInTitle</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;Zoom in&#x27;</code></td>
            <td>The title set on the &#39;zoom in&#39; button.</td>
        </tr>
        <tr id="control-zoom-zoomouttext">
            <td><code><b>zoomOutText</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;-&#x27;</code></td>
            <td>The text set on the &#39;zoom out&#39; button.</td>
        </tr>
        <tr id="control-zoom-zoomouttitle">
            <td><code><b>zoomOutTitle</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;Zoom out&#x27;</code></td>
            <td>The title set on the &#39;zoom out&#39; button.</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Methods

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.Attribution

The attribution control allows you to display attribution data in a small text box on a map.
It is put on the map by default unless you set its
<a href="/doc/maps/en/manual/map#map-attributioncontrol"><code>attributionControl</code> option</a>
to <code>false</code>, and it fetches attribution texts from layers with the
<a href="/doc/maps/en/manual/base-classes#layer-getattribution"><code>getAttribution</code> method</a> automatically.
Extends <a href="/doc/maps/en/manual/base-classes#dgcontrol"><code>DG.Control</code></a>.

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-attribution-l-control-attribution">
            <td><code><b>DG.control.attribution</b>(
                <nobr>&lt;<a href="#control-attribution-option">DG.Control.Attribution options</a>&gt; <i>options</i> )</nobr>
            </code></td>
            <td>Creates an attribution control.</td>
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
        <tr id="control-attribution-prefix">
            <td><code><b>prefix</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;Leaflet&#x27;</code></td>
            <td>The HTML text shown before the attributions. Pass <code>false</code> to disable.</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

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
        <tr id="control-attribution-setprefix">
            <td><code><b>setPrefix</b>(
                <nobr>&lt;String&gt; <i>prefix</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Sets the text before the attributions.</td>
        </tr>
        <tr id="control-attribution-addattribution">
            <td><code><b>addAttribution</b>(
                <nobr>&lt;String&gt; <i>text</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Adds an attribution text (e.g. <code>&#39;Vector data &amp;copy; Mapbox&#39;</code>).</td>
        </tr>
        <tr id="control-attribution-removeattribution">
            <td><code><b>removeAttribution</b>(
                <nobr>&lt;String&gt; <i>text</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Removes an attribution text.</td>
        </tr>
    </tbody>
</table>

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.Scale

A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial
(mi/ft) systems. Extends <a href="/doc/maps/en/manual/base-classes#dgcontrol"><code>DG.Control</code></a>.

    DG.control.scale().addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-scale-l-control-scale">
            <td><code><b>DG.control.scale</b>(
                <nobr>&lt;<a href="#control-scale-option">DG.Control.Scale options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Creates an scale control with the given options.</td>
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
        <tr id="control-scale-maxwidth">
            <td><code><b>maxWidth</b></code></td>
            <td><code>Number </code></td>
            <td><code>100</code></td>
            <td>Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).</td>
        </tr>
        <tr id="control-scale-metric">
            <td><code><b>metric</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>True</code></td>
            <td>Whether to show the metric scale line (m/km).</td>
        </tr>
        <tr id="control-scale-imperial">
            <td><code><b>imperial</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>True</code></td>
            <td>Whether to show the imperial scale line (mi/ft).</td>
        </tr>
        <tr id="control-scale-updatewhenidle">
            <td><code><b>updateWhenIdle</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If <code>true</code>, the control is updated on <a href="/doc/maps/en/manual/map#map-moveend"><code>moveend</code></a>,
                otherwise it&#39;s always up-to-date (updated on <a href="/doc/maps/en/manual/map#map-move"><code>move</code></a>).</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Methods

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.Ruler

When clicked opens a ruler - the tool for measurement of distances on a map.
Extends <a href="/doc/maps/en/manual/base-classes#dgcontrol"><code>DG.Control</code></a>.

    DG.control.ruler().addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-ruler-l-control-ruler">
            <td><code><b>DG.control.ruler</b>(
                <nobr>&lt;<a href="#control-ruler-option">DG.Control.Ruler options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Creates a ruler control with the given options.</td>
        </tr>
	</tbody>
</table>

#### Options

Options inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Methods

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.Traffic

The traffic control allows you to display traffic overlay data on a map.
Extends <a href="/doc/maps/en/manual/base-classes#dgcontrol"><code>DG.Control</code></a>.

    DG.control.traffic().addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-traffic-l-control-traffic">
            <td><code><b>DG.control.traffic</b>(
                <nobr>&lt;<a href="#control-traffic-option">DG.Control.Traffic options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Creates a traffic control with the given options.</td>
        </tr>
	</tbody>
</table>

#### Options

Options inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Methods

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.Fullscreen

The fullscreen control enables display of the map over fullscreen window which bounds are physical bounds of a given
user monitor. The button works like a trigger. It is put on the map by default unless you set its
<a href="/doc/maps/en/manual/map#map-attributioncontrol"><code>fullscreenControl</code> option</a> to <code>false</code>.
Extends <a href="/doc/maps/en/manual/base-classes#dgcontrol"><code>DG.Control</code></a>.

    DG.control.fullscreen().addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-fullscreen-l-control-fullscreen">
            <td><code><b>DG.control.fullscreen</b>(
                <nobr>&lt;<a href="#control-fullscreen-option">DG.Control.Fullscreen options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Creates a fullscreen control with the given options.</td>
        </tr>
	</tbody>
</table>

#### Options

Options inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Methods

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.LocationControl

The geo-location control allow users to detect their geographic positions and automatically pan the map layer to found coordinates.
Control is disabled if geo-location API is not available.

    DG.control.location().addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-location-l-control-location">
            <td><code><b>DG.control.location</b>(
                <nobr>&lt;<a href="#control-location-option">DG.Control.LocationControl options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Creates a geo-location control with the given options.</td>
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
        <tr id="control-location-drawcircle">
            <td><code><b>drawCircle</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Will the circle showing the accuracy of the detection be displayed or not.</td>
        </tr>
        <tr id="control-location-follow">
            <td><code><b>follow</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Update user location dynamically or not, works if <code>watch</code> and <code>setView</code> options are
                exposed to <code>true</code> in <code>locateOptions</code>.</td>
        </tr>
        <tr id="control-location-stopfollowingondrag">
            <td><code><b>stopFollowingOnDrag</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Enables or disables the user's location update as he drag the map.</td>
        </tr>
        <tr id="control-location-metric">
            <td><code><b>metric</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Use metric or English units of measurement.</td>
        </tr>
        <tr id="control-location-locateoptions">
            <td><code><b>locateOptions</b></code></td>
            <td><code>Object </code></td>
            <td><code></code></td>
            <td>See <a href="/doc/maps/en/manual/map#geolocation-options">geo-location options</a>.</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Methods

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->
