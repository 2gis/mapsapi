## Map

This section describes the central class of the maps API which is used to create a map on a page and manipulate it.

{toc}

### DG.Map

#### Usage example

Initialize the map on the &quot;map&quot; div with a given center and zoom:

    var map = DG.map('map', {
        center: [54.98, 82.89],
        zoom: 13
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
        <tr id="map-l-map">
            <td><code><b>DG.map</b>(
                <nobr>&lt;String&gt; <i>id</i></nobr>,
                <nobr>&lt;Map options&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Instantiates a map object given the DOM ID of a <code>&lt;div&gt;</code> element
                and optionally an object literal with <code>Map options</code>.</td>
        </tr>
        <tr>
            <td><code><b>DG.map</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
                <nobr>&lt;Map options&gt; <i>options?</i>)</nobr>
            </code></td>
            <td>Instantiates a map object given an instance of a <code>&lt;div&gt;</code> HTML element
                and optionally an object literal with <code>Map options</code>.</td>
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
        <tr id="map-prefercanvas">
            <td><code><b>preferCanvas</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Whether <a href="/doc/maps/en/manual/vector-layers#dgpath"><code>Path</code></a>s
                should be rendered on a <a href="/doc/maps/en/manual/vector-layers#dgcanvas">
                <code>Canvas</code></a> renderer. By default, all <code>Path</code>s are
                rendered in a <a href="/doc/maps/en/manual/vector-layers#dgsvg"><code>SVG</code></a> renderer.
            </td>
        </tr>
    </tbody>
</table>

##### Control Options

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
        <tr id="map-zoomcontrol">
            <td><code><b>zoomControl</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether a <a href="/doc/maps/en/manual/controls#dgcontrolzoom">zoom control</a>
                is added to the map by default.
            </td>
        </tr>
        <tr id="map-fullscreencontrol">
            <td><code><b>fullscreenControl</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether a <a href="/doc/maps/en/manual/controls#dgcontrolfullscreen">fullscreen control</a>
                is added to the map by default.
            </td>
        </tr>
    </tbody>
</table>

##### Interaction Options

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
        <tr id="map-closepopuponclick">
            <td><code><b>closePopupOnClick</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Set it to <code>false</code> if you don&#39;t want popups to close when user clicks the map.</td>
        </tr>
        <tr id="map-zoomsnap">
            <td><code><b>zoomSnap</b></code></td>
            <td><code>Number </code></td>
            <td><code>1</code></td>
            <td>Forces the map&#39;s zoom level to always be a multiple of this,
                particularly right after a <a href="#map-fitbounds"><code>fitBounds()</code></a>
                or a pinch-zoom. By default, the zoom level snaps to the nearest integer;
                lower values (e.g. <code>0.5</code> or <code>0.1</code>) allow for greater
                granularity. A value of <code>0</code> means the zoom level will not be snapped after
                <code>fitBounds</code> or a pinch-zoom.
            </td>
        </tr>
        <tr id="map-zoomdelta">
            <td><code><b>zoomDelta</b></code></td>
            <td><code>Number </code></td>
            <td><code>1</code></td>
            <td>Controls how much the map&#39;s zoom level will change after a
                <a href="#map-zoomin"><code>zoomIn()</code></a>,
                <a href="#map-zoomout"><code>zoomOut()</code></a>, pressing <code>+</code> or
                <code>-</code> on the keyboard, or using the
                <a href="/doc/maps/en/manual/controls#dgcontrolzoom">zoom controls</a>.
                Values smaller than <code>1</code> (e.g. <code>0.5</code>) allow for greater granularity.
            </td>
        </tr>
        <tr id="map-trackresize">
            <td><code><b>trackResize</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether the map automatically handles browser window resize to update itself.</td>
        </tr>
        <tr id="map-boxzoom">
            <td><code><b>boxZoom</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether the map can be zoomed to a rectangular area specified by dragging
                the mouse while pressing the shift key.
            </td>
        </tr>
        <tr id="map-doubleclickzoom">
            <td><code><b>doubleClickZoom</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether the map can be zoomed in by double clicking on it and zoomed out by
                double clicking while holding shift. If passed <code>&#39;center&#39;</code>,
                double-click zoom will zoom to the center of the view regardless of where the mouse was.
            </td>
        </tr>
        <tr id="map-dragging">
            <td><code><b>dragging</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether the map be draggable with mouse/touch or not.</td>
        </tr>
        <tr id="map-geoclicker">
            <td><code><b>geoclicker</b></code></td>
            <td><code>Boolean | Object</code></td>
            <td><code>false</code></td>
            <td>
                <!-- TODO: translation -->
            </td>
        </tr>
        <tr id="map-projectdetector">
            <td><code><b>projectDetector</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>
                <!-- TODO: translation -->
            </td>
        </tr>
        <tr id="map-tilescheck">
            <td><code><b>tilesCheck</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>
                <!-- TODO: translation -->
            </td>
        </tr>
        <tr id="map-museum">
            <td><code><b>museum</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Whether the message about unsupported browser will be displayed.</td>
        </tr>
    </tbody>
</table>

##### Map State Options

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
        <tr id="map-center">
            <td><code><b>center</b></code></td>
            <td><code>LatLng </code></td>
            <td><code>undefined</code></td>
            <td>Initial geographic center of the map</td>
        </tr>
        <tr id="map-zoom">
            <td><code><b>zoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>undefined</code></td>
            <td>Initial map zoom level</td>
        </tr>
        <tr id="map-minzoom">
            <td><code><b>minZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>undefined</code></td>
            <td>Minimum zoom level of the map. Overrides any <code>minZoom</code> option set on map layers.</td>
        </tr>
        <tr id="map-maxzoom">
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>undefined</code></td>
            <td>Maximum zoom level of the map. Overrides any <code>maxZoom</code> option set on map layers.</td>
        </tr>
        <tr id="map-layers">
            <td><code><b>layers</b></code></td>
            <td><code>Layer[] </code></td>
            <td><code>[]</code></td>
            <td>Array of layers that will be added to the map initially</td>
        </tr>
        <tr id="map-maxbounds">
            <td><code><b>maxBounds</b></code></td>
            <td><code>LatLngBounds </code></td>
            <td><code>null</code></td>
            <td>When this option is set, the map restricts the view to the given geographical bounds,
                bouncing the user back when he tries to pan outside the view. To set the restriction
                dynamically, use <a href="#map-setmaxbounds"><code>setMaxBounds</code></a> method.</td>
        </tr>
        <tr id="map-renderer">
            <td><code><b>renderer</b></code></td>
            <td><code>Renderer </code></td>
            <td><code>*</code></td>
            <td>The default method for drawing vector layers on the map.
                <a href="/doc/maps/en/manual/vector-layers#dgsvg"><code>DG.SVG</code></a>
                or <a href="/doc/maps/en/manual/vector-layers#dgcanvas"><code>DG.Canvas</code></a>
                by default depending on browser support.
            </td>
        </tr>
        <tr id="map-poi">
            <td><code><b>poi</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>
                <!-- TODO: translation -->
            </td>
        </tr>
        <tr id="map-currentlang">
            <td><code><b>currentLang</b></code></td>
            <td><code>string</code></td>
            <td><code>''</code></td>
            <td>Language of user interface (see <a href="/doc/maps/en/manual/dg-locale/">Localization</a>)</td>
        </tr>
    </tbody>
</table>

##### Animation Options

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
        <tr id="map-fadeanimation">
            <td><code><b>fadeAnimation</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether the tile fade animation is enabled. By default it&#39;s enabled
                in all browsers that support CSS3 Transitions except Android.
            </td>
        </tr>
        <tr id="map-markerzoomanimation">
            <td><code><b>markerZoomAnimation</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether markers animate their zoom with the zoom animation, if disabled they
                will disappear for the length of the animation. By default it&#39;s enabled
                in all browsers that support CSS3 Transitions except Android.
            </td>
        </tr>
        <tr id="map-transform3dlimit">
            <td><code><b>transform3DLimit</b></code></td>
            <td><code>Number </code></td>
            <td><code>2^23</code></td>
            <td>Defines the maximum size of a CSS translation transform. The default value should
                not be changed unless a web browser positions layers in the wrong place after doing
                a large <code>panBy</code>.
            </td>
        </tr>
        <tr id="map-zoomanimation">
            <td><code><b>zoomAnimation</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether the map zoom animation is enabled. By default it&#39;s enabled in all browsers
                that support CSS3 Transitions except Android.
            </td>
        </tr>
        <tr id="map-zoomanimationthreshold">
            <td><code><b>zoomAnimationThreshold</b></code></td>
            <td><code>Number </code></td>
            <td><code>4</code></td>
            <td>Won&#39;t animate zoom if the zoom difference exceeds this value.</td>
        </tr>
    </tbody>
</table>

##### Panning Inertia Options

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
        <tr id="map-inertia">
            <td><code><b>inertia</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>*</code></td>
            <td>If enabled, panning of the map will have an inertia effect where the map builds
                momentum while dragging and continues moving in the same direction for some time.
                Feels especially nice on touch devices. Enabled by default unless running on old
                Android devices.
            </td>
        </tr>
        <tr id="map-inertiadeceleration">
            <td><code><b>inertiaDeceleration</b></code></td>
            <td><code>Number </code></td>
            <td><code>3000</code></td>
            <td>The rate with which the inertial movement slows down, in pixels/second².</td>
        </tr>
        <tr id="map-inertiamaxspeed">
            <td><code><b>inertiaMaxSpeed</b></code></td>
            <td><code>Number </code></td>
            <td><code>Infinity</code></td>
            <td>Max speed of the inertial movement, in pixels/second.</td>
        </tr>
        <tr id="map-easelinearity">
            <td><code><b>easeLinearity</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.2</code></td>
            <td></td>
        </tr>
        <tr id="map-worldcopyjump">
            <td><code><b>worldCopyJump</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>With this option enabled, the map tracks when you pan to another &quot;copy&quot;
                of the world and seamlessly jumps to the original one so that all overlays like
                markers and vector layers are still visible.
            </td>
        </tr>
        <tr id="map-maxboundsviscosity">
            <td><code><b>maxBoundsViscosity</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.0</code></td>
            <td>If <code>maxBounds</code> is set, this option will control how solid the bounds
                are when dragging the map around. The default value of <code>0.0</code> allows
                the user to drag outside the bounds at normal speed, higher values will slow down
                map dragging outside bounds, and <code>1.0</code> makes the bounds fully solid,
                preventing the user from dragging outside the bounds.
            </td>
        </tr>
    </tbody>
</table>

##### Keyboard Navigation Options

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
        <tr id="map-keyboard">
            <td><code><b>keyboard</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Makes the map focusable and allows users to navigate the map with keyboard
                arrows and <code>+</code>/<code>-</code> keys.
            </td>
        </tr>
        <tr id="map-keyboardpandelta">
            <td><code><b>keyboardPanDelta</b></code></td>
            <td><code>Number </code></td>
            <td><code>80</code></td>
            <td>Amount of pixels to pan when pressing an arrow key.</td>
        </tr>
    </tbody>
</table>

##### Mousewheel options

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
        <tr id="map-scrollwheelzoom">
            <td><code><b>scrollWheelZoom</b></code></td>
            <td><code>Boolean | String</code></td>
            <td><code>true</code></td>
            <td>Whether the map can be zoomed by using the mouse wheel. If passed
                <code>&#39;center&#39;</code>, it will zoom to the center of the view
                regardless of where the mouse was.</td>
        </tr>
        <tr id="map-wheeldebouncetime">
            <td><code><b>wheelDebounceTime</b></code></td>
            <td><code>Number </code></td>
            <td><code>40</code></td>
            <td>Limits the rate at which a wheel can fire (in milliseconds). By default
                user can&#39;t zoom via wheel more often than once per 40 ms.
            </td>
        </tr>
        <tr id="map-wheelpxperzoomlevel">
            <td><code><b>wheelPxPerZoomLevel</b></code></td>
            <td><code>Number </code></td>
            <td><code>50</code></td>
            <td>How many scroll pixels (as reported by
                <a href="/doc/maps/en/manual/dom-utils#domevent-getwheeldelta>DG.DomEvent.getWheelDelta</a>)
                mean a change of one full zoom level. Smaller values will make wheel-zooming
                faster (and vice versa).
            </td>
        </tr>
    </tbody>
</table>

##### Touch interaction options

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
        <tr id="map-tap">
            <td><code><b>tap</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Enables mobile hacks for supporting instant taps (fixing 200ms click
                delay on iOS/Android) and touch holds (fired as <code>contextmenu</code> events).
            </td>
        </tr>
        <tr id="map-taptolerance">
            <td><code><b>tapTolerance</b></code></td>
            <td><code>Number </code></td>
            <td><code>15</code></td>
            <td>The max number of pixels a user can shift his finger during touch
                for it to be considered a valid tap.
            </td>
        </tr>
        <tr id="map-touchzoom">
            <td><code><b>touchZoom</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>*</code></td>
            <td>Whether the map can be zoomed by touch-dragging with two fingers. If
                passed <code>&#39;center&#39;</code>, it will zoom to the center of the view regardless of
                where the touch events (fingers) were. Enabled for touch-capable web
                browsers except for old Androids.
            </td>
        </tr>
        <tr id="map-bounceatzoomlimits">
            <td><code><b>bounceAtZoomLimits</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Set it to false if you don&#39;t want the map to zoom beyond min/max zoom
                and then bounce back when pinch-zooming.
            </td>
        </tr>
    </tbody>
</table>

#### Events

##### Layer events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-layeradd">
            <td><code><b>layeradd</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#layerevent">LayerEvent</a></code></td>
            <td>Fired when a new layer is added to the map.</td>
        </tr>
        <tr id="map-layerremove">
            <td><code><b>layerremove</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#layerevent">LayerEvent</a></code></td>
            <td>Fired when some layer is removed from the map</td>
        </tr>
    </tbody>
</table>

##### Map state change events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-zoomlevelschange">
            <td><code><b>zoomlevelschange</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the number of zoomlevels on the map is changed due
                to adding or removing a layer.
            </td>
        </tr>
        <tr id="map-resize">
            <td><code><b>resize</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the map is resized.</td>
        </tr>
        <tr id="map-unload">
            <td><code><b>unload</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the map is destroyed with <a href="#map-remove">remove</a> method.</td>
        </tr>
        <tr id="map-viewreset">
            <td><code><b>viewreset</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the map needs to redraw its content (this usually happens
                on map zoom or load). Very useful for creating custom overlays.
            </td>
        </tr>
        <tr id="map-load">
            <td><code><b>load</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the map is initialized (when its center and zoom are set
                for the first time).
            </td>
        </tr>
        <tr id="map-zoomstart">
            <td><code><b>zoomstart</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the map zoom is about to change (e.g. before zoom animation).</td>
        </tr>
        <tr id="map-movestart">
            <td><code><b>movestart</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the view of the map starts changing (e.g. user starts dragging the map).</td>
        </tr>
        <tr id="map-zoom">
            <td><code><b>zoom</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired repeteadly during any change in zoom level, including zoom
                and fly animations.
            </td>
        </tr>
        <tr id="map-move">
            <td><code><b>move</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired repeteadly during any movement of the map, including pan and
                fly animations.
            </td>
        </tr>
        <tr id="map-zoomend">
            <td><code><b>zoomend</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the map has changed, after any animations.</td>
        </tr>
        <tr id="map-moveend">
            <td><code><b>moveend</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the center of the map stops changing (e.g. user stopped
                dragging the map).
            </td>
        </tr>
        <tr id="map-projectchange">
            <td><code><b>projectchange</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#projectevent">ProjectEvent</a></code></td>
            <td>
                <!-- TODO: translation -->
            </td>
        </tr>
        <tr id="map-projectleave">
            <td><code><b>projectleave</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#projectevent">ProjectEvent</a></code></td>
            <td>
                <!-- TODO: translation -->
            </td>
        </tr>
        <tr id="map-entranceshow">
            <td><code><b>entranceshow</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td><!-- TODO: translation --></td>
        </tr>
        <tr id="map-entrancehide">
            <td><code><b>entrancehide</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td><!-- TODO: translation --></td>
        </tr>
        <tr id="map-poihover">
            <td><code><b>poihover</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#poievent">MetaEvent</a></code></td>
            <td><!-- TODO: translation --></td>
        </tr>
        <tr id="map-poileave">
            <td><code><b>poileave</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#poievent">MetaEvent</a></code></td>
            <td><!-- TODO: translation --></td>
        </tr>
        <tr id="map-langchange">
            <td><code><b>langchange</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#langevent">LangEvent</a></code></td>
            <td><!-- TODO: translation --></td>
        </tr>
    </tbody>
</table>

##### Popup events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-popupopen">
            <td><code><b>popupopen</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Fired when a popup is opened in the map</td>
        </tr>
        <tr id="map-popupclose">
            <td><code><b>popupclose</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Fired when a popup in the map is closed</td>
        </tr>
        <tr id="map-autopanstart">
            <td><code><b>autopanstart</b></code></td>
            <td><code></code></td>
            <td>Fired when the map starts autopanning when opening a popup.</td>
        </tr>
    </tbody>
</table>

##### Interaction events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-click">
            <td><code><b>click</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the user clicks (or taps) the map.</td>
        </tr>
        <tr id="map-dblclick">
            <td><code><b>dblclick</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the user double-clicks (or double-taps) the map.</td>
        </tr>
        <tr id="map-mousedown">
            <td><code><b>mousedown</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the user pushes the mouse button on the map.</td>
        </tr>
        <tr id="map-mouseup">
            <td><code><b>mouseup</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the user releases the mouse button on the map.</td>
        </tr>
        <tr id="map-mouseover">
            <td><code><b>mouseover</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the mouse enters the map.</td>
        </tr>
        <tr id="map-mouseout">
            <td><code><b>mouseout</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the mouse leaves the map.</td>
        </tr>
        <tr id="map-mousemove">
            <td><code><b>mousemove</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired while the mouse moves over the map.</td>
        </tr>
        <tr id="map-contextmenu">
            <td><code><b>contextmenu</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired when the user pushes the right mouse button on the map, prevents
                default browser context menu from showing if there are listeners on
                this event. Also fired on mobile when the user holds a single touch
                for a second (also called long press).
            </td>
        </tr>
        <tr id="map-keypress">
            <td><code><b>keypress</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired when the user presses a key from the keyboard while the map is focused.</td>
        </tr>
        <tr id="map-preclick">
            <td><code><b>preclick</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Fired before mouse click on the map (sometimes useful when you
                want something to happen on click before any existing click
                handlers start running).
            </td>
        </tr>
    </tbody>
</table>

##### Animation Events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-zoomanim">
            <td><code><b>zoomanim</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#zoomanimevent">ZoomAnimEvent</a></code></td>
            <td>Fired on every frame of a zoom animation</td>
        </tr>
    </tbody>
</table>

##### Location Events

<table>
    <thead>
        <tr>
            <th>Event</th>
            <th>Data</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-locationerror">
            <td><code><b>locationerror</b></code></td>
            <td><code><a href="#errorevent">ErrorEvent</a></code></td>
            <td>Fired when geolocation (using the <a href="#map-locate"><code>locate</code></a> method) failed.</td>
        </tr>
        <tr id="map-locationfound">
            <td><code><b>locationfound</b></code></td>
            <td><code><a href="#locationevent">LocationEvent</a></code></td>
            <td>Fired when geolocation (using the <a href="#map-locate"><code>locate</code></a> method)
                went successfully.
            </td>
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
        <tr id="map-getrenderer">
            <td>
                <code>
                    <b>getRenderer</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/vector-layers#dgpath">Path</a>&gt; <i>layer</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/base-classes#dgrenderer">Renderer</a></code></td>
            <td>Returns the instance of
                <a href="/doc/maps/en/manual/base-classes#dgrenderer"><code>Renderer</code></a>
                that should be used to render the given
                <a href="/doc/maps/en/manual/vector-layers#dgpath"><code>Path</code></a>.
                It will ensure that the
                <a href="/doc/maps/en/manual/base-classes#dgrenderer"><code>renderer</code></a>
                options of the map and paths are respected, and that the renderers do exist on the map.
            </td>
        </tr>
    </tbody>
</table>

##### Methods for Layers and Controls

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-addlayer">
            <td>
                <code>
                    <b>addLayer</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Adds the given layer to the map</td>
        </tr>
        <tr id="map-removelayer">
            <td>
                <code>
                    <b>removeLayer</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Removes the given layer from the map.</td>
        </tr>
        <tr id="map-haslayer">
            <td>
                <code>
                    <b>hasLayer</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i>)</nobr>
                </code>
            </td>
            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> if the given layer is currently added to the map</td>
        </tr>
        <tr id="map-eachlayer">
            <td>
                <code>
                    <b>eachLayer</b>(
                    <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                    <nobr>&lt;Object&gt; <i>context?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>
                Iterates over the layers of the map, optionally specifying context of the iterator function.
<pre><code>map.eachLayer(function(layer){
    layer.bindPopup(&#39;Hello&#39;);
});
</code></pre>
            </td>
        </tr>
        <tr id="map-openpopup">
            <td>
                <code>
                    <b>openPopup</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/popup#dgpopup">Popup</a>&gt; <i>popup</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Opens the specified popup while closing the previously opened (to make
                sure only one is opened at one time for usability).
            </td>
        </tr>
        <tr id="map-openpopup">
            <td>
                <code>
                    <b>openPopup</b>(
                    <nobr>&lt;String|HTMLElement&gt; <i>content</i></nobr>,
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;<a href="/doc/maps/en/manual/popup#popup-option">Popup options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Creates a popup with the specified content and options and opens
                it in the given point on a map.
            </td>
        </tr>
        <tr id="map-closepopup">
            <td>
                <code>
                    <b>closePopup</b>(<nobr>&lt;<a href="/doc/maps/en/manual/popup#dgpopup">Popup</a>&gt; <i>popup?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Closes the popup previously opened with <a href="#map-openpopup">openPopup</a>
                (or the given one).
            </td>
        </tr>
        <tr id="map-addcontrol">
            <td>
                <code>
                    <b>addControl</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/controls#dgcontrol">Control</a>&gt; <i>control</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Adds the given control to the map</td>
        </tr>
        <tr id="map-removecontrol">
            <td>
                <code>
                    <b>removeControl</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/controls#dgcontrol">Control</a>&gt; <i>control</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Removes the given control from the map</td>
        </tr>
    </tbody>
</table>

##### Methods for modifying map state

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-setview">
            <td>
                <code>
                    <b>setView</b>(
                    <nobr>&lt;LatLnt&gt; <i>center</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom</i></nobr>,
                    <nobr>&lt;Zoom/Pan options&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Sets the view of the map (geographical center and zoom) with the given
                animation options.
            </td>
        </tr>
        <tr id="map-setzoom">
            <td>
                <code>
                    <b>setZoom</b>(
                    <nobr>&lt;Number&gt; <i>zoom</i></nobr>,
                    <nobr>&lt;Zoom/Pan options&gt; <i>options</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Sets the zoom of the map.</td>
        </tr>
        <tr id="map-zoomin">
            <td>
                <code>
                    <b>zoomIn</b>(
                    <nobr>&lt;Number&gt; <i>delta?</i></nobr>,
                    <nobr>&lt;<a href="#zoom-options">Zoom options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Increases the zoom of the map by <code>delta</code>
                (<a href="#map-zoomdelta"><code>zoomDelta</code></a> by default).
            </td>
        </tr>
        <tr id="map-zoomout">
            <td>
                <code>
                    <b>zoomOut</b>(
                    <nobr>&lt;Number&gt; <i>delta?</i></nobr>,
                    <nobr>&lt;<a href="#zoom-options">Zoom options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Decreases the zoom of the map by <code>delta</code>
                (<a href="#map-zoomdelta"><code>zoomDelta</code></a> by default).
            </td>
        </tr>
        <tr id="map-setzoomaround">
            <td>
                <code>
                    <b>setZoomAround</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom</i></nobr>,
                    <nobr>&lt;<a href="#zoom-options">Zoom options</a>&gt; <i>options</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Zooms the map while keeping a specified geographical point on the map
                stationary (e.g. used internally for scroll zoom and double-click zoom).
            </td>
        </tr>
        <tr id="map-setzoomaround">
            <td>
                <code>
                    <b>setZoomAround</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>offset</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom</i></nobr>,
                    <nobr>&lt;<a href="#zoom-options">Zoom options</a>&gt; <i>options</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Zooms the map while keeping a specified pixel on the map
                (relative to the top-left corner) stationary.
            </td>
        </tr>
        <tr id="map-fitbounds">
            <td>
                <code>
                    <b>fitBounds</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                    <nobr>&lt;<a href="#fitbounds-options">fitBounds options</a>&gt; <i>options</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Sets a map view that contains the given geographical bounds with the
                maximum zoom level possible.
            </td>
        </tr>
        <tr id="map-fitworld">
            <td>
                <code>
                    <b>fitWorld</b>(
                    <nobr>&lt;<a href="#fitbounds-options">fitBounds options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Sets a map view that mostly contains the whole world with the maximum
                zoom level possible.
            </td>
        </tr>
        <tr id="map-panto">
            <td>
                <code>
                    <b>panTo</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;<a href="#pan-options">Pan options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Pans the map to a given center.
            </td>
        </tr>
        <tr id="map-panby">
            <td>
                <code>
                    <b>panBy</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>offset</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Pans the map by a given number of pixels (animated).
            </td>
        </tr>
        <tr id="map-setmaxbounds">
            <td>
                <code>
                    <b>setMaxBounds</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgbounds">Bounds</a>&gt; <i>bounds</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Restricts the map view to the given bounds (see the
                <a href="#map-maxbounds">maxBounds</a> option).
            </td>
        </tr>
        <tr id="map-setminzoom">
            <td><code><b>setMinZoom</b>(<nobr>&lt;Number&gt; <i>zoom</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Sets the lower limit for the available zoom levels
                (see the <a href="#map-minzoom">minZoom</a> option).
            </td>
        </tr>
        <tr id="map-setmaxzoom">
            <td><code><b>setMaxZoom</b>(<nobr>&lt;Number&gt; <i>zoom</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Sets the upper limit for the available zoom levels
                (see the <a href="#map-maxzoom">maxZoom</a> option).
            </td>
        </tr>
        <tr id="map-paninsidebounds">
            <td>
                <code>
                    <b>panInsideBounds</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                    <nobr>&lt;<a href="#pan-options">Pan options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Pans the map to the closest view that would lie inside the given bounds
                (if it&#39;s not already), controlling the animation using the options specific, if any.
            </td>
        </tr>
        <tr id="map-invalidatesize">
            <td><code><b>invalidateSize</b>(<nobr>&lt;Zoom/Pan options&gt; <i>options</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Checks if the map container size changed and updates the map if so —
                call it after you&#39;ve changed the map size dynamically, also animating
                pan by default. If <code>options.pan</code> is <code>false</code>, panning will not occur.
                If <code>options.debounceMoveend</code> is <code>true</code>, it will delay <code>moveend</code>
                event so that it doesn&#39;t happen often even if the method is called many
                times in a row.
            </td>
        </tr>
        <tr id="map-invalidatesize">
            <td><code><b>invalidateSize</b>(<nobr>&lt;Boolean&gt; <i>animate</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Checks if the map container size changed and updates the map if so —
                call it after you&#39;ve changed the map size dynamically, also animating
                pan by default.
            </td>
        </tr>
        <tr id="map-stop">
            <td><code><b>stop</b>()</code></td>
            <td><code>this</code></td>
            <td>Stops the currently running <code>panTo</code> or <code>flyTo</code> animation, if any.
            </td>
        </tr>
        <tr id="map-flyto">
            <td>
                <code>
                    <b>flyTo</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom?</i></nobr>,
                    <nobr>&lt;Zoom/Pan options&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Sets the view of the map (geographical center and zoom) performing a smooth
                pan-zoom animation.
            </td>
        </tr>
        <tr id="map-flytobounds">
            <td>
                <code>
                    <b>flyToBounds</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                    <nobr>&lt;<a href="#fitbounds-options">fitBounds options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Sets the view of the map with a smooth animation like
                <a href="#map-flyto"><code>flyTo</code></a>,
                but takes a bounds parameter like <a href="#map-fitbounds"><code>fitBounds</code></a>.
            </td>
        </tr>
        <tr id="map-setlang">
            <td><code><b>setLang</b>( <nobr>&lt;String&gt; <i>lang</i> )</nobr></code></td>
            <td><code>String</code></td>
            <td>
                <!-- TODO: translation -->
            </td>
        </tr>
    </tbody>
</table>

##### Other Methods

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-addhandler">
            <td>
                <code>
                    <b>addHandler</b>(
                    <nobr>&lt;String&gt; <i>name</i></nobr>,
                    <nobr>&lt;Function&gt; <i>HandlerClass</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Adds a new <a href="/doc/maps/en/manual/base-classes#dghandler"><code>Handler</code></a> to the map,
                given its name and constructor function.
            </td>
        </tr>
        <tr id="map-remove">
            <td><code><b>remove</b>()</code></td>
            <td><code>this</code></td>
            <td>Destroys the map and clears all related event listeners.
        </td>
        </tr>
        <tr id="map-createpane">
            <td>
                <code>
                    <b>createPane</b>(
                    <nobr>&lt;String&gt; <i>name</i></nobr>,
                    <nobr>&lt;HTMLElement&gt; <i>container?</i>)</nobr>
                </code>
            </td>
            <td><code>HTMLElement</code></td>
            <td>Creates a new map pane with the given name if it doesn&#39;t exist already,
                then returns it. The pane is created as a children of <code>container</code>, or
                as a children of the main map pane if not set.
            </td>
        </tr>
        <tr id="map-getpane">
            <td><code><b>getPane</b>(<nobr>&lt;String|HTMLElement&gt; <i>pane</i>)</nobr></code></td>
            <td><code>HTMLElement</code></td>
            <td>Returns a map pane, given its name or its HTML element (its identity).</td>
        </tr>
        <tr id="map-getpanes">
            <td><code><b>getPanes</b>()</code></td>
            <td><code>Object</code></td>
            <td>Returns a plain object containing the names of all panes as keys and
                the panes as values.
            </td>
        </tr>
        <tr id="map-getcontainer">
            <td><code><b>getContainer</b>()</code></td>
            <td><code>HTMLElement</code></td>
            <td>Returns the HTML element that contains the map.</td>
        </tr>
        <tr id="map-whenready">
            <td>
                <code>
                    <b>whenReady</b>(
                    <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                    <nobr>&lt;Object&gt; <i>context?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Runs the given function <code>fn</code> when the map gets initialized with
                a view (center and zoom) and at least one layer, or immediately
                if it&#39;s already initialized, optionally passing a function context.
            </td>
        </tr>
    </tbody>
</table>

##### Methods for Getting Map State

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-getcenter">
            <td><code><b>getCenter</b>()</code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Returns the geographical center of the map view</td>
        </tr>
        <tr id="map-getzoom">
            <td><code><b>getZoom</b>()</code></td>
            <td><code>Number</code></td>
            <td>Returns the current zoom level of the map view</td>
        </tr>
        <tr id="map-getbounds">
            <td><code><b>getBounds</b>()</code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlngbounds">LatLngBounds</a></code></td>
            <td>Returns the geographical bounds visible in the current map view</td>
        </tr>
        <tr id="map-getminzoom">
            <td><code><b>getMinZoom</b>()</code></td>
            <td><code>Number</code></td>
            <td>Returns the minimum zoom level of the map (if set in the <code>minZoom</code>
                option of the map or of any layers), or <code>0</code> by default.
            </td>
        </tr>
        <tr id="map-getmaxzoom">
            <td><code><b>getMaxZoom</b>()</code></td>
            <td><code>Number</code></td>
            <td>Returns the maximum zoom level of the map (if set in the <code>maxZoom</code>
                option of the map or of any layers).
            </td>
        </tr>
        <tr id="map-getboundszoom">
            <td>
                <code>
                    <b>getBoundsZoom</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                    <nobr>&lt;Boolean&gt; <i>inside?</i>)</nobr>
                </code>
            </td>
            <td><code>Number</code></td>
            <td>Returns the maximum zoom level on which the given bounds fit to the map
                view in its entirety. If <code>inside</code> (optional) is set to <code>true</code>, the method
                instead returns the minimum zoom level on which the map view fits into
                the given bounds in its entirety.
            </td>
        </tr>
        <tr id="map-getsize">
            <td><code><b>getSize</b>()</code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Returns the current size of the map container (in pixels).</td>
        </tr>
        <tr id="map-getpixelbounds">
            <td><code><b>getPixelBounds</b>()</code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgbounds">Bounds</a></code></td>
            <td>Returns the bounds of the current map view in projected pixel
                coordinates (sometimes useful in layer and overlay implementations).
            </td>
        </tr>
        <tr id="map-getpixelorigin">
            <td><code><b>getPixelOrigin</b>()</code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Returns the projected pixel coordinates of the top left point of
                the map layer (useful in custom layer and overlay implementations).
            </td>
        </tr>
        <tr id="map-getpixelworldbounds">
            <td>
                <code>
                    <b>getPixelWorldBounds</b>(
                    <nobr>&lt;Number&gt; <i>zoom?</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgbounds">Bounds</a></code></td>
            <td>Returns the world&#39;s bounds in pixel coordinates for zoom level <code>zoom</code>.
                If <code>zoom</code> is omitted, the map&#39;s current zoom level is used.
            </td>
        </tr>
        <tr id="map-getlang">
            <td><code><b>getLang</b>()</code></td>
            <td><code>String</code></td>
            <td><!-- TODO: translation --></td>
        </tr>
    </tbody>
</table>

##### Conversion Methods

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-getzoomscale">
            <td>
                <code>
                    <b>getZoomScale</b>(
                    <nobr>&lt;Number&gt; <i>toZoom</i></nobr>,
                    <nobr>&lt;Number&gt; <i>fromZoom</i>)</nobr>
                </code>
            </td>
            <td><code>Number</code></td>
            <td>Returns the scale factor to be applied to a map transition from zoom level
                <code>fromZoom</code> to <code>toZoom</code>. Used internally to help with zoom animations.
            </td>
        </tr>
        <tr id="map-getscalezoom">
            <td>
                <code><b>getScaleZoom</b>(
                <nobr>&lt;Number&gt; <i>scale</i></nobr>,
                <nobr>&lt;Number&gt; <i>fromZoom</i>)</nobr>
                </code>
            </td>
            <td><code>Number</code></td>
            <td>Returns the zoom level that the map would end up at, if it is at <code>fromZoom</code>
                level and everything is scaled by a factor of <code>scale</code>. Inverse of
                <a href="#map-getZoomScale"><code>getZoomScale</code></a>.
            </td>
        </tr>
        <tr id="map-project">
            <td>
                <code>
                    <b>project</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Projects a geographical coordinate <a href="/doc/maps/en/manual/basic-types#dglatlng"><code>LatLng</code></a>
                according to the projection of the map&#39;s CRS, then scales it according to
                <code>zoom</code> and the CRS&#39;s
                <a href="#transformation"><code>Transformation</code></a>. The result is pixel coordinate relative to
                the CRS origin.
            </td>
        </tr>
        <tr id="map-unproject">
            <td>
                <code>
                    <b>unproject</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Inverse of <a href="#map-project"><code>project</code></a>.
            </td>
        </tr>
        <tr id="map-layerpointtolatlng">
            <td>
                <code>
                    <b>layerPointToLatLng</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Given a pixel coordinate relative to the <a href="#map-getpixelorigin">origin pixel</a>,
                returns the corresponding geographical coordinate (for the current zoom level).
            </td>
        </tr>
        <tr id="map-latlngtolayerpoint">
            <td>
                <code>
                    <b>latLngToLayerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Given a geographical coordinate, returns the corresponding pixel coordinate
                relative to the <a href="#map-getpixelorigin">origin pixel</a>.
            </td>
        </tr>
        <tr id="map-wraplatlng">
            <td>
                <code>
                    <b>wrapLatLng</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Returns a <a href="/doc/maps/en/manual/basic-types#dglatlng"><code>LatLng</code></a> where <code>lat</code>
                and <code>lng</code> has been wrapped according to the
                map&#39;s CRS&#39;s <code>wrapLat</code> and <code>wrapLng</code> properties, if they are outside the
                CRS&#39;s bounds.
                By default this means longitude is wrapped around the dateline so its
                value is between -180 and +180 degrees.
            </td>
        </tr>
        <tr id="map-distance">
            <td>
                <code>
                    <b>distance</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng1</i></nobr>,
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng2</i>)</nobr>
                </code>
            </td>
            <td><code>Number</code></td>
            <td>Returns the distance between two geographical coordinates according to
                the map&#39;s CRS. By default this measures distance in meters.
            </td>
        </tr>
        <tr id="map-containerpointtolayerpoint">
            <td>
                <code>
                    <b>containerPointToLayerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Given a pixel coordinate relative to the map container, returns the corresponding
                pixel coordinate relative to the <a href="#map-getpixelorigin">origin pixel</a>.
            </td>
        </tr>
        <tr id="map-layerpointtocontainerpoint">
            <td>
                <code>
                    <b>layerPointToContainerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Given a pixel coordinate relative to the <a href="#map-getpixelorigin">origin pixel</a>,
                returns the corresponding pixel coordinate relative to the map container.
            </td>
        </tr>
        <tr id="map-containerpointtolatlng">
            <td>
                <code>
                    <b>containerPointToLatLng</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Given a pixel coordinate relative to the map container, returns
                the corresponding geographical coordinate (for the current zoom level).
            </td>
        </tr>
        <tr id="map-latlngtocontainerpoint">
            <td>
                <code>
                    <b>latLngToContainerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Given a geographical coordinate, returns the corresponding pixel coordinate
                relative to the map container.
            </td>
        </tr>
        <tr id="map-mouseeventtocontainerpoint">
            <td>
                <code>
                    <b>mouseEventToContainerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a>&gt; <i>ev</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Given a MouseEvent object, returns the pixel coordinate relative to the
                map container where the event took place.
            </td>
        </tr>
        <tr id="map-mouseeventtolayerpoint">
            <td>
                <code>
                    <b>mouseEventToLayerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a>&gt; <i>ev</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Given a MouseEvent object, returns the pixel coordinate relative to
                the <a href="#map-getpixelorigin">origin pixel</a> where the event took place.
            </td>
        </tr>
        <tr id="map-mouseeventtolatlng">
            <td>
                <code>
                    <b>mouseEventToLatLng</b>(
                    <nobr>&lt;<a href="/doc/maps/en/manual/base-classes#mouseevent">MouseEvent</a>&gt; <i>ev</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Given a MouseEvent object, returns geographical coordinate where the
                event took place.
            </td>
        </tr>
    </tbody>
</table>

##### Geolocation methods

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Returns</th>
            <th>Description</th>
        </tr>
	</thead
    ><tbody>
        <tr id="map-locate">
            <td>
                <code>
                    <b>locate</b>(
                    <nobr>&lt;<a href="#locate-options">Locate options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Tries to locate the user using the Geolocation API, firing a <code>locationfound</code>
                event with location data on success or a <code>locationerror</code> event on failure,
                and optionally sets the map view to the user&#39;s location with respect to
                detection accuracy (or to the world view if geolocation failed).
                See <a href="#locate-options"><code>Locate options</code></a> for more details.
            </td>
        </tr>
        <tr id="map-stoplocate">
            <td><code><b>stopLocate</b>()</code></td>
            <td><code>this</code></td>
            <td>Stops watching location previously initiated by <code>map.locate({watch: true})</code>
                and aborts resetting the map view if map.locate was called with
                <code>{setView: true}</code>.
            </td>
        </tr>
    </tbody>
</table>

##### Methods inherited from Evented

Methods inherited from Evented see <a href="/doc/maps/en/manual/base-classes#dgevented-methods">here</a>.

### Properties

<!-- TODO: translation -->

#### Handlers

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-boxzoom">
            <td><code><b>boxZoom</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Box (shift-drag with mouse) zoom handler.</td>
        </tr>
        <tr id="map-doubleclickzoom">
            <td><code><b>doubleClickZoom</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Double click zoom handler.</td>
        </tr>
        <tr id="map-dragging">
            <td><code><b>dragging</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Map dragging handler (by both mouse and touch).</td>
        </tr>
        <tr id="map-keyboard">
            <td><code><b>keyboard</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Keyboard navigation handler.</td>
        </tr>
        <tr id="map-scrollwheelzoom">
            <td><code><b>scrollWheelZoom</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Scroll wheel zoom handler.</td>
        </tr>
        <tr id="map-tap">
            <td><code><b>tap</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Mobile touch hacks (quick tap and touch hold) handler.</td>
        </tr>
        <tr id="map-touchzoom">
            <td><code><b>touchZoom</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Touch zoom handler.</td>
        </tr>
        <tr id="map-geoclicker">
            <td><code><b>geoclicker</b></code></td>
            <td><a href="/doc/maps/en/manual/base-classes#dghandler"><code>Handler</code></a></td>
            <td><!-- TODO: translation --></td>
        </tr>
        <tr id="map-projectDetector">
            <td><code><b>projectDetector</b></code></td>
            <td><a href="/doc/maps/en/manual/base-classes#dghandler"><code>Handler</code></a></td>
            <td><!-- TODO: translation --></td>
        </tr>
        <tr id="map-zoomControl">
            <td><code><b>zoomControl</b></code></td>
            <td><a href="/doc/maps/en/manual/controls#dgcontrol.zoom"><code>Control.Zoom</code></a></td>
            <td><!-- TODO: translation --></td>
        </tr>
        <tr id="map-fullscreenControl">
            <td><code><b>fullscreenControl</b></code></td>
            <td><a href="/doc/maps/en/manual/controls#dgcontrol.fullscreen"><code>Control.FullScreen</code></a></td>
            <td><!-- TODO: translation --></td>
        </tr>
        <tr id="map-rulerControl">
            <td><code><b>rulerControl</b></code></td>
            <td><a href="/doc/maps/en/manual/controls#dgcontrol.ruler"><code>Control.Ruler</code></a></td>
            <td><!-- TODO: translation --></td>
        </tr>
        <tr id="map-trafficControl">
            <td><code><b>trafficControl</b></code></td>
            <td><a href="/doc/maps/en/manual/controls#dgcontrol.traffic"><code>Control.Traffic</code></a></td>
            <td><!-- TODO: translation --></td>
        </tr>
        <tr id="map-baseLayer">
            <td><code><b>baseLayer</b></code></td>
            <td><a href="/doc/maps/en/manual/raster-layers#dgtilelayer"><code>TileLayer</code></a></td>
            <td><!-- TODO: translation --></td>
        </tr>
    </tbody>
</table>

#### Map panes

Panes are DOM elements used to control the ordering of layers on the map. You
can access panes with <a href="#map-getpane"><code>map.getPane</code></a> or
<a href="#map-getpanes"><code>map.getPanes</code></a> methods. New panes can be created with the
<a href="#map-createpane"><code>map.createPane</code></a> method.
Every map has the following default panes that differ only in zIndex.

<table>
    <thead>
        <tr>
            <th>Pane</th>
            <th>Type</th>
            <th>Z-index</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-mappane">
            <td><code><b>mapPane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>&#x27;auto&#x27;</code></td>
            <td>Pane that contains all other map panes</td>
        </tr>
        <tr id="map-tilepane">
            <td><code><b>tilePane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>2</code></td>
            <td>Pane for tile layers</td>
        </tr>
        <tr id="map-overlaypane">
            <td><code><b>overlayPane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>4</code></td>
            <td>Pane for overlays like polylines and polygons</td>
        </tr>
        <tr id="map-shadowpane">
            <td><code><b>shadowPane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>5</code></td>
            <td>Pane for overlay shadows (e.g. marker shadows)</td>
        </tr>
        <tr id="map-markerpane">
            <td><code><b>markerPane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>6</code></td>
            <td>Pane for marker icons</td>
        </tr>
        <tr id="map-popuppane">
            <td><code><b>popupPane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>7</code></td>
            <td>Pane for popups.</td>
        </tr>
    </tbody>
</table>

#### Locate options

Some of the geolocation methods for <a href="#dgmap"><code>Map</code></a> take in an <code>options</code> parameter.
This is a plain javascript object with the following optional components:

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
        <tr id="locate-options-watch">
            <td><code><b>watch</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If <code>true</code>, starts continous watching of location changes (instead of detecting it
                once) using W3C <code>watchPosition</code> method. You can later stop watching using
                <code>map.stopLocate()</code> method.
            </td>
        </tr>
        <tr id="locate-options-setview">
            <td><code><b>setView</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If <code>true</code>, automatically sets the map view to the user location with respect to
                detection accuracy, or to world view if geolocation failed.
            </td>
        </tr>
        <tr id="locate-options-maxzoom">
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>Infinity</code></td>
            <td>The maximum zoom for automatic view setting when using <code>setView</code> option.</td>
        </tr>
        <tr id="locate-options-timeout">
            <td><code><b>timeout</b></code></td>
            <td><code>Number </code></td>
            <td><code>10000</code></td>
            <td>Number of milliseconds to wait for a response from geolocation before firing a
                <code>locationerror</code> event.
            </td>
        </tr>
        <tr id="locate-options-maximumage">
            <td><code><b>maximumAge</b></code></td>
            <td><code>Number </code></td>
            <td><code>0</code></td>
            <td>Maximum age of detected location. If less than this amount of milliseconds
                passed since last geolocation response, <code>locate</code> will return a cached location.
            </td>
        </tr>
        <tr id="locate-options-enablehighaccuracy">
            <td><code><b>enableHighAccuracy</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Enables high accuracy, see
                <a href="http://dev.w3.org/geo/api/spec-source.html#high-accuracy">description in the W3C spec</a>.
            </td>
        </tr>
    </tbody>
</table>


#### Zoom options

Some of the <a href="#dgmap"><code>Map</code></a> methods which modify the zoom level take in an <code>options</code>
parameter. This is a plain javascript object with the following optional
components:

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
        <tr id="zoom-options-animate">
            <td><code><b>animate</b></code></td>
            <td><code>Boolean</code></td>
            <td><code></code></td>
            <td>If not specified, zoom animation will happen if the zoom origin is inside the
                current view. If <code>true</code>, the map will attempt animating zoom disregarding where
                zoom origin is. Setting <code>false</code> will make it always reset the view completely
                without animation.
            </td>
        </tr>
    </tbody>
</table>

#### Pan options

Some of the <a href="#map"><code>Map</code></a> methods which modify the center of the map take in an
<code>options</code> parameter. This is a plain javascript object with the following optional components:

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
        <tr id="pan-options-animate">
            <td><code><b>animate</b></code></td>
            <td><code>Boolean</code></td>
            <td><code></code></td>
            <td>If <code>true</code>, panning will always be animated if possible. If <code>false</code>, it will
                not animate panning, either resetting the map view if panning more than a
                screen away, or just setting a new offset for the map pane (except for <code>panBy</code>
                which always does the latter).
            </td>
        </tr>
        <tr id="pan-options-duration">
            <td><code><b>duration</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.25</code></td>
            <td>Duration of animated panning, in seconds.</td>
        </tr>
        <tr id="pan-options-easelinearity">
            <td><code><b>easeLinearity</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.25</code></td>
            <td>The curvature factor of panning animation easing (third parameter of the
                <a href="http://cubic-bezier.com/">Cubic Bezier curve</a>). 1.0 means linear animation,
                the less the more bowed the curve.
            </td>
        </tr>
        <tr id="pan-options-nomovestart">
            <td><code><b>noMoveStart</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>If <code>true</code>, panning won&#39;t fire <code>movestart</code> event on
                start (used internally for panning inertia).
            </td>
        </tr>
    </tbody>
</table>

#### Zoom/pan options

Options inherited from <a href="#zoom-options">Zoom options</a>

Options inherited from <a href="#pan-options">Pan options</a>

#### FitBounds options

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
	<tr id="fitbounds-options-paddingtopleft">
		<td><code><b>paddingTopLeft</b></code></td>
		<td><code>Point </code></td>
		<td><code>[0, 0]</code></td>
		<td>Sets the amount of padding in the top left corner of a map container that
            shouldn&#39;t be accounted for when setting the view to fit bounds. Useful if you
            have some control overlays on the map like a sidebar and you don&#39;t want them
            to obscure objects you&#39;re zooming to.
        </td>
        </tr>
        <tr id="fitbounds-options-paddingbottomright">
            <td><code><b>paddingBottomRight</b></code></td>
            <td><code>Point </code></td>
            <td><code>[0, 0]</code></td>
            <td>The same for the bottom right corner of the map.</td>
        </tr>
        <tr id="fitbounds-options-padding">
            <td><code><b>padding</b></code></td>
            <td><code>Point </code></td>
            <td><code>[0, 0]</code></td>
            <td>Equivalent of setting both top left and bottom right padding to the same value.</td>
        </tr>
        <tr id="fitbounds-options-maxzoom">
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>null</code></td>
            <td>The maximum possible zoom to use.</td>
        </tr>
    </tbody>
</table>
