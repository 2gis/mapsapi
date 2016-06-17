## Markers

{toc}

### DG.Marker

DG.Marker is used to display clickable/draggable icons on the map.

	DG.marker([54.98, 82.89]).addTo(map);

#### Creation

<table>
	<thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td><code><b>DG.Marker</b>(
				<nobr>&lt;<a href="/doc/maps/en/manual/base-types#dglatlng">LatLng</a>&gt; <i>latlng</i>,</nobr>
				<nobr>&lt;<a href="#options">Marker options</a>&gt; <i>options?</i> )</nobr>
			</code></td>
			<td>Instantiates a Marker object given a geographical point and optionally an options object.</td>
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
        <tr id="marker-icon">
            <td><code><b>icon</b></code></td>
            <td><code><a href="#dgicon">Icon</a></code></td>
            <td><code>*</code></td>
            <td>Icon class to use for rendering the marker. See <a href="#dgicon">Icon documentation</a>
                for details on how to customize the marker icon. Set to new
                <code>DG.Icon.Default()</code> by default.</td>
        </tr>
        <tr id="marker-interactive">
            <td><code><b>interactive</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>If <code>false</code>, the marker will not emit mouse events and will act as a part of
                the underlying map.</td>
        </tr>
        <tr id="marker-draggable">
            <td><code><b>draggable</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Whether the marker is draggable with mouse/touch or not.</td>
        </tr>
        <tr id="marker-keyboard">
            <td><code><b>keyboard</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.</td>
        </tr>
        <tr id="marker-title">
            <td><code><b>title</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>Text for the browser tooltip that appear on marker hover (no tooltip by default).</td>
        </tr>
        <tr id="marker-alt">
            <td><code><b>alt</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>Text for the <code>alt</code> attribute of the icon image (useful for accessibility).</td>
        </tr>
        <tr id="marker-zindexoffset">
            <td><code><b>zIndexOffset</b></code></td>
            <td><code>Number </code></td>
            <td><code>0</code></td>
            <td>By default, marker images zIndex is set automatically based on its latitude.
                Use this option if you want to put the marker on top of all others (or below),
                specifying a high value like <code>1000</code> (or high negative value, respectively).</td>
        </tr>
        <tr id="marker-opacity">
            <td><code><b>opacity</b></code></td>
            <td><code>Number </code></td>
            <td><code>1.0</code></td>
            <td>The opacity of the marker.</td>
        </tr>
        <tr id="marker-riseonhover">
            <td><code><b>riseOnHover</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If <code>true</code>, the marker will get on top of others when you hover the mouse over it.</td>
        </tr>
        <tr id="marker-riseoffset">
            <td><code><b>riseOffset</b></code></td>
            <td><code>Number </code></td>
            <td><code>250</code></td>
            <td>The z-index offset used for the <code>riseOnHover</code> feature.</td>
        </tr>
        <tr id="marker-pane">
            <td><code><b>pane</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;markerPane&#x27;</code></td>
            <td><code>Map pane</code> where the markers icon will be added.</td>
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
        <tr id="marker-click">
            <td><code><b>click</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the user clicks (or taps) the marker.</td>
        </tr>
        <tr id="marker-dblclick">
            <td><code><b>dblclick</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the user double-clicks (or double-taps) the marker.</td>
        </tr>
        <tr id="marker-mousedown">
            <td><code><b>mousedown</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the user pushes the mouse button on the marker.</td>
        </tr>
        <tr id="marker-mouseover">
            <td><code><b>mouseover</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the mouse enters the marker.</td>
        </tr>
        <tr id="marker-mouseout">
            <td><code><b>mouseout</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the mouse leaves the marker.</td>
        </tr>
        <tr id="marker-contextmenu">
            <td><code><b>contextmenu</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the user right-clicks on the marker.</td>
        </tr>
        <tr id="marker-move">
            <td><code><b>move</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the marker is moved via <a href="#marker-setlatlng"><code>setLatLng</code></a>
                or by <a href="#marker-dragging">dragging</a>. Old and new coordinates are included in
                event arguments as <code>oldLatLng</code>, <a href="/doc/maps/en/manual/basic-types#dglatlng"><code>latlng</code></a>.</td>
        </tr>
    </tbody>
</table>

##### Dragging events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="marker-dragstart">
            <td><code><b>dragstart</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the user starts dragging the marker.</td>
        </tr>
        <tr id="marker-movestart">
            <td><code><b>movestart</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the marker starts moving (because of dragging).</td>
        </tr>
        <tr id="marker-drag">
            <td><code><b>drag</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired repeatedly while the user drags the marker.</td>
        </tr>
        <tr id="marker-dragend">
            <td><code><b>dragend</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#dragendevent">DragEndEvent</a></code></td>
            <td>Fired when the user stops dragging the marker.</td>
        </tr>
        <tr id="marker-moveend">
            <td><code><b>moveend</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the marker stops moving (because of dragging).</td>
        </tr>
    </tbody>
</table>

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="marker-add">
            <td><code><b>add</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired after the layer is added to a map</td>
        </tr>
        <tr id="marker-remove">
            <td><code><b>remove</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired after the layer is removed from a map</td>
        </tr>
    </tbody>
</table>

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="marker-popupopen">
            <td><code><b>popupopen</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Fired when a popup bound to this layer is opened</td>
        </tr>
        <tr id="marker-popupclose">
            <td><code><b>popupclose</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Fired when a popup bound to this layer is closed</td>
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
        <tr id="marker-getlatlng">
            <td><code><b>getLatLng</b>()</nobr></code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Returns the current geographical position of the marker.</td>
        </tr>
        <tr id="marker-setlatlng">
            <td><code><b>setLatLng</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr>
                </code></td>
            <td><code>this</code></td>
            <td>Changes the marker position to the given point.</td>
        </tr>
        <tr id="marker-setzindexoffset">
            <td><code><b>setZIndexOffset</b>(
                    <nobr>&lt;Number&gt; <i>offset</i>)</nobr>
                </code></td>
            <td><code>this</code></td>
            <td>Changes the <a href="#marker-zindexoffset">zIndex offset</a> of the marker.</td>
        </tr>
        <tr id="marker-seticon">
            <td><code><b>setIcon</b>(
                    <nobr>&lt;<a href="#dgicon">Icon</a>&gt; <i>icon</i>)</nobr>
                </code></td>
            <td><code>this</code></td>
            <td>Changes the marker icon.</td>
        </tr>
        <tr id="marker-setopacity">
            <td><code><b>setOpacity</b>(
                    <nobr>&lt;Number&gt; <i>opacity</i>)</nobr>
                </code></td>
            <td><code>this</code></td>
            <td>Changes the opacity of the marker. </td>
        </tr>
	    <tr id="marker-bindlabel">
	        <td><code><b>bindLabel</b>(&lt;String&gt; content, &lt;<a href="/doc/maps/en/manual/dg-label#опции">Label options</a>&gt; options?)</code></td>
            <td><code>this</code></td>
            <td><!-- TODO: translate --></td>
	    </tr>
	    <tr id="marker-unbindlabel">
	        <td><code><b>unbindLabel</b>()</code></td>
	        <td><code>this</code></td>
            <td><!-- TODO: translate --></td>
	    </tr>
	    <tr id="marker-showLabel">
	        <td><code><b>showLabel</b>()</code></td>
	        <td><code>this</code></td>
            <td><!-- TODO: translate --></td>
	    </tr>
	    <tr id="marker-hideLabel">
	        <td><code><b>hideLabel</b>()</code></td>
	        <td><code>this</code></td>
            <td><!-- TODO: translate --></td>
	    </tr>
    </tbody>
</table>

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

#### Interaction handlers

Interaction handlers are properties of a marker instance that allow you to control interaction
behavior in runtime, enabling or disabling certain features such as dragging
(see Handler methods). Example: 

	marker.dragging.disable();

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="marker-dragging">
            <td><code><b>dragging</b></code></td>
            <td><code><a href="/doc/maps/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Marker dragging handler (by both mouse and touch).</td>
        </tr>
    </tbody>
</table>

### DG.Icon

Represents an icon to provide when creating a marker.

    var myIcon = DG.icon({
        iconUrl: 'my-icon.png',
        iconRetinaUrl: 'my-icon@2x.png',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: 'my-icon-shadow.png',
        shadowRetinaUrl: 'my-icon-shadow@2x.png',
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });

    DG.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

#### Creation

<table>
	<thead>
	    <tr>
	        <th>Factory</th>
	        <th>Description</th>
	    </tr>
	</thead>
	<tbody>
	    <tr>
            <td><code><b>DG.icon</b>(
                <nobr>&lt;<a href="#icon-option">Icon options</a>&gt; <i>options</i>)</nobr>
            </code></td>
            <td>Creates an icon instance with the given options.</td>
	    </tr>
	</tbody>
</table>

#### Options

<table id="dgicon-options">
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="icon-iconurl">
            <td><code><b>iconUrl</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
            <td><strong>(required)</strong> The URL to the icon image (absolute or relative to your script path).</td>
        </tr>
        <tr id="icon-iconretinaurl">
            <td><code><b>iconRetinaUrl</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
            <td>The URL to a retina sized version of the icon image (absolute or relative to your
                script path). Used for Retina screen devices.</td>
        </tr>
        <tr id="icon-iconsize">
            <td><code><b>iconSize</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
            <td>Size of the icon image in pixels.</td>
        </tr>
        <tr id="icon-iconanchor">
            <td><code><b>iconAnchor</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
            <td>The coordinates of the &quot;tip&quot; of the icon (relative to its top left corner). The icon
                will be aligned so that this point is at the marker&#39;s geographical location. Centered
                by default if size is specified, also can be set in CSS with negative margins.</td>
        </tr>
        <tr id="icon-popupanchor">
            <td><code><b>popupAnchor</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
            <td>The coordinates of the point from which popups will &quot;open&quot;, relative to the icon anchor.</td>
        </tr>
        <tr id="icon-shadowurl">
            <td><code><b>shadowUrl</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
            <td>The URL to the icon shadow image. If not specified, no shadow image will be created.</td>
        </tr>
        <tr id="icon-shadowretinaurl">
            <td><code><b>shadowRetinaUrl</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
            <td></td>
        </tr>
        <tr id="icon-shadowsize">
            <td><code><b>shadowSize</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
            <td>Size of the shadow image in pixels.</td>
        </tr>
        <tr id="icon-shadowanchor">
            <td><code><b>shadowAnchor</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
            <td>The coordinates of the &quot;tip&quot; of the shadow (relative to its top left corner) (the same
                as iconAnchor if not specified).</td>
        </tr>
        <tr id="icon-classname">
            <td><code><b>className</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>A custom class name to assign to both icon and shadow images. Empty by default.</td>
        </tr>
    </tbody>
</table>

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Methods

<table id="dgicon-methods">
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="icon-createicon">
            <td><code><b>createIcon</b>(<nobr>&lt;HTMLElement&gt; <i>oldIcon?</i>)</nobr></code></td>
            <td><code>HTMLElement</code></td>
            <td>Called internally when the icon has to be shown,
                returns a <code>&lt;img&gt;</code> HTML element
                styled according to the options.</td>
        </tr>
        <tr id="icon-createshadow">
            <td><code><b>createShadow</b>(<nobr>&lt;HTMLElement&gt; <i>oldIcon?</i>)</nobr></code></td>
            <td><code>HTMLElement</code></td>
            <td>As <code>createIcon</code>, but for the shadow beneath it.</td>
        </tr>
    </tbody>
</table>

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.DivIcon

Represents a lightweight icon for markers that uses a simple <code>&lt;div&gt;</code>
element instead of an image. Inherits from <a href="#dgicon"><code>Icon</code></a>
but ignores the <code>iconUrl</code> and shadow options.

    // you can set .my-div-icon styles in CSS
    var myIcon = DG.divIcon({className: 'my-div-icon'}); 

    DG.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

#### Creation

<table>
	<thead>
	    <tr>
	        <th>Factory</th>
	        <th>Description</th>
	    </tr>
	</thead>
	<tbody>
	    <tr>
	        <td><code><b>DG.DivIcon</b>(
	            <nobr>&lt;<a href="#divicon-options">DivIcon options</a>&gt; <i>options</i> )</nobr>
	        </code></td>
            <td>Creates a <code>DivIcon</code> instance with the given options.</td>
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
        <tr id="divicon-html">
            <td><code><b>html</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>Custom HTML code to put inside the div element, empty by default.</td>
        </tr>
        <tr id="divicon-bgpos">
            <td><code><b>bgPos</b></code></td>
            <td><code>Point </code></td>
            <td><code>[0, 0]</code></td>
            <td>Optional relative position of the background, in pixels</td>
        </tr>
	</tbody>
</table>


Options inherited from <a href="#dgicon-options">Icon</a> <!-- TODO: include options -->

Options inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### Events

Events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

Popup events inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Methods

Methods inherited from <a href="#dgicon-methods">Icon</a> <!-- TODO: include methods -->

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->
