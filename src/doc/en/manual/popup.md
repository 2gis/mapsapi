## Popups

Popup is a window in which you can display arbitrary HTML-code.
Popup associated with a particular location on the map.

{toc}

### DG.Popup

Used to open popups in certain places of the map. Use
<a href="/doc/maps/en/manual/map#map-openpopup">Map.openPopup</a> to
open popups while making sure that only one popup is open at one time
(recommended for usability), or use <a href="/doc/maps/en/manual/map#map-addlayer">Map.addLayer</a>
to open as many as you want.

#### Usage example

If you want to just bind a popup to marker click and then open it, it&#39;s really easy:

	marker.bindPopup(popupContent).openPopup();

Path overlays like polylines also have a <code>bindPopup</code> method.
Here&#39;s a more complicated way to open a popup on a map:

	var popup = DG.popup()
		.setLatLng(latlng)
		.setContent(&#39;&lt;p&gt;Hello world!&lt;br /&gt;This is a nice popup.&lt;/p&gt;&#39;)
		.openOn(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
	</thead>
    <tbody>
        <tr id="popup-dg-popup">
            <td><code><b>DG.popup</b>(
                    <nobr>&lt;<a href="#options">Popup options</a>&gt; <i>options?</i></nobr>,
                    <nobr>&lt;<a href="/doc/maps/en/manual/base-classes#dglayer">Layer</a>&gt; <i>source?</i>)</nobr>
                </code></td>
            <td>Instantiates a Popup object given an optional <code>options</code> object that describes
                its appearance and location and an optional <code>source</code> object that is used to tag
                the popup with a reference to the Layer to which it refers.</td>
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
        <tr id="popup-maxwidth">
            <td><code><b>maxWidth</b></code></td>
            <td><code>Number </code></td>
            <td><code>300</code></td>
            <td>Max width of the popup, in pixels.</td>
        </tr>
        <tr id="popup-minwidth">
            <td><code><b>minWidth</b></code></td>
            <td><code>Number </code></td>
            <td><code>50</code></td>
            <td>Min width of the popup, in pixels.</td>
        </tr>
        <tr id="popup-maxheight">
            <td><code><b>maxHeight</b></code></td>
            <td><code>Number </code></td>
            <td><code>null</code></td>
            <td>If set, creates a scrollable container of the given height
                inside a popup if its content exceeds it.</td>
        </tr>
        <tr id="popup-autopan">
            <td><code><b>autoPan</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Set it to <code>false</code> if you don&#39;t want the map to do panning animation
                to fit the opened popup.</td>
        </tr>
        <tr id="popup-autopanpaddingtopleft">
            <td><code><b>autoPanPaddingTopLeft</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
            <td>The margin between the popup and the top left corner of the map
                view after autopanning was performed.</td>
        </tr>
        <tr id="popup-autopanpaddingbottomright">
            <td><code><b>autoPanPaddingBottomRight</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
            <td>The margin between the popup and the bottom right corner of the map
                view after autopanning was performed.</td>
        </tr>
        <tr id="popup-autopanpadding">
            <td><code><b>autoPanPadding</b></code></td>
            <td><code>Point </code></td>
            <td><code>Point(5, 5)</code></td>
            <td>Equivalent of setting both top left and bottom right autopan padding to the same value.</td>
        </tr>
        <tr id="popup-keepinview">
            <td><code><b>keepInView</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Set it to <code>true</code> if you want to prevent users from panning the popup
                off of the screen while it is open.</td>
        </tr>
        <tr id="popup-closebutton">
            <td><code><b>closeButton</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Controls the presence of a close button in the popup.</td>
        </tr>
        <tr id="popup-offset">
            <td><code><b>offset</b></code></td>
            <td><code>Point </code></td>
            <td><code>Point(0, 7)</code></td>
            <td>The offset of the popup position. Useful to control the anchor
                of the popup when opening it on some overlays.</td>
        </tr>
        <tr id="popup-autoclose">
            <td><code><b>autoClose</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Set it to <code>false</code> if you want to override the default behavior of
                the popup closing when user clicks the map (set globally by the Map&#39;s
                <a href="/doc/maps/en/manual/map#map-closepopuponclick">closePopupOnClick</a> option).</td>
        </tr>
        <tr id="popup-zoomanimation">
            <td><code><b>zoomAnimation</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Whether to animate the popup on zoom. Disable it if you have
                problems with Flash content inside popups.</td>
        </tr>
        <tr id="popup-classname">
            <td><code><b>className</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>A custom CSS class name to assign to the popup.</td>
        </tr>
        <tr id="popup-pane">
            <td><code><b>pane</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;popupPane&#x27;</code></td>
            <td><code>Map pane</code> where the popup will be added.</td>
        </tr>
        <tr id="popup-sprawling">
            <td><code><b>sprawling</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>false</code></td>
            <td><!-- TODO: translation --></td>
        </tr>
        <tr id="popup-textdirection">
            <td><code><b>textDirection</b></code></td>
            <td><code>string</code></td>
            <td><code>'auto'</code></td>
            <td>The direction of the popup content text. The following values are possible: <code>'auto'</code>,
                <code>'rtl'</code>, <code>'ltr'</code>.</td>
        </tr>
    </tbody>
</table>

#### Events

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
        <tr id="popup-add">
            <td><code><b>add</b></code></td>
            <td><code><a href="/doc/maps/en/manual/base-classes#event">Event</a></code></td>
            <td>Fired after the layer is added to a map</td>
        </tr>
        <tr id="popup-remove">
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
        <tr id="popup-popupopen">
            <td><code><b>popupopen</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Fired when a popup bound to this layer is opened</td>
        </tr>
        <tr id="popup-popupclose">
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
        <tr id="popup-addto">
            <td><code><b>addTo</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/map#dgmap">Map</a>&gt; <i>map</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Adds the popup to the map.</td>
        </tr>
        <tr id="popup-openon">
            <td><code><b>openOn</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/map#dgmap">Map</a>&gt; <i>map</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Adds the popup to the map and closes the previous one. The same as <code>map.openPopup(popup)</code>.</td>
        </tr>
        <tr id="popup-getlatlng">
            <td><code><b>getLatLng</b>()</code></td>
            <td><code><a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Returns the geographical point of popup.</td>
        </tr>
        <tr id="popup-setlatlng">
            <td><code><b>setLatLng</b>(
                <nobr>&lt;<a href="/doc/maps/en/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Sets the geographical point where the popup will open.</td>
        </tr>
        <tr id="popup-getcontent">
            <td><code><b>getContent</b>()</code></td>
            <td><code>String|HTMLElement</code></td>
            <td>Returns the main content of the popup.</td>
        </tr>
        <tr id="popup-setcontent">
            <td><code><b>setContent</b>(
                <nobr>&lt;String | HTMLElement | Function&gt; <i>htmlContent</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Sets the HTML content of the popup (in main section). If a function is passed the source layer will
                be passed to the function. The function should return a <code>String</code> or
                <code>HTMLElement</code> to be used in the popup.</td>
        </tr>
        <tr id="popup-getheadercontent">
            <td><code><b>getHeaderContent</b>()</code></td>
            <td><code>String | HTMLElement</code></td>
            <td>Returns the content of the header section of the popup.</td>
        </tr>
        <tr id="popup-setheadercontent">
            <td><code><b>setHeaderContent</b>(
                <nobr>&lt;String|HTMLElement&gt; <i>htmlContent</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Sets the content of the header section of the popup.</td>
        </tr>
        <tr id="popup-getfootercontent">
            <td><code><b>getFooterContent</b>()</code></td>
            <td><code>String | HTMLElement</code></td>
            <td>Returns the content of the footer section of the popup.</td>
        </tr>
        <tr id="popup-setfootercontent">
            <td><code><b>setFooterContent</b>(
                <nobr>&lt;String | HTMLElement&gt; <i>htmlContent</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Sets the content of the footer section of the popup.</td>
        </tr>
        <tr id="popup-getelement">
            <td><code><b>getElement</b>()</code></td>
            <td><code>String | HTMLElement</code></td>
            <td>Alias for <a href="#popup-getcontent">getContent()</a></td>
        </tr>
        <tr id="popup-update">
            <td><code><b>update</b>()</code></td>
            <td><code>null</code></td>
            <td>Updates the popup content, layout and position. Useful for updating the popup after
                something inside changed, e.g. image loaded.</td>
        </tr>
        <tr id="popup-isopen">
            <td><code><b>isOpen</b>()</code></td>
            <td><code>Boolean</code></td>
            <td>Returns <code>true</code> when the popup is visible on the map.</td>
        </tr>
        <tr id="popup-bringtofront">
            <td><code><b>bringToFront</b>()</code></td>
            <td><code>this</code></td>
            <td>Brings this popup in front of other popups (in the same map pane).</td>
        </tr>
        <tr id="popup-bringtoback">
            <td><code><b>bringToBack</b>()</code></td>
            <td><code>this</code></td>
            <td>Brings this popup to the back of other popups (in the same map pane).</td>
        </tr>
    </tbody>
</table>

Popup methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Methods inherited from <a href="/doc/maps/en/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->
