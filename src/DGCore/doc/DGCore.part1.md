#### Map

* [Usage example][0]
* [Constructor][1]
* [Options][2]
* [Events][3]

#### Map Methods

* [For modifying map state][4]
* [For getting map state][5]
* [For layers and controls][6]
* [Conversion methods][7]
* [Other methods][8]

#### Map Misc

* [Properties][9]
* [Panes][10]

#### UI Layers

* [Marker][11]
* [Popup][12]

#### Raster Layers

* [TileLayer][13]
* [TileLayer.WMS][14]
* [TileLayer.Canvas][15]
* [ImageOverlay][16]

#### Vector Layers

* [Path][17]
* [Polyline][18]
* [MultiPolyline][19]
* [Polygon][20]
* [MultiPolygon][21]
* [Rectangle][22]
* [Circle][23]
* [CircleMarker][24]

#### Other Layers

* [LayerGroup][25]
* [FeatureGroup][26]
* [GeoJSON][27]

#### Basic Types

* [LatLng][28]
* [LatLngBounds][29]
* [Point][30]
* [Bounds][31]
* [Icon][32]
* [DivIcon][33]

#### Controls

* [Control][34]
* [Zoom][35]
* [Attribution][36]
* [Layers][37]
* [Scale][38]

#### Events

* [Events methods][39]
* [Event objects][40]

#### Utility

* [Class][41]
* [Browser][42]
* [Util][43]
* [Transformation][44]
* [LineUtil][45]
* [PolyUtil][46]

#### DOM Utility

* [DomEvent][47]
* [DomUtil][48]
* [PosAnimation][49]
* [Draggable][50]

#### Interfaces

* [IHandler][51]
* [ILayer][52]
* [IControl][53]
* [IProjection][54]
* [ICRS][55]

#### Misc

* [global switches][56]
* [noConflict][57]
* [version][58]

---

Документация по **Leaflet 0.5**. Документацию находящююся в работе можно найти в файле `reference.html` ветки [gh-pages-master branch][59].

## L.Map

Основной класс API --- используется для создания и управления картами на странице.

### Пример использования

    // инициализация карты на элементе div "map" с указанием координат центра карты и уровня зума
    var map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
    });

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Map</b>(
            <nobr>&lt;HTMLElement|String&gt; <i>id</i>,</nobr>
            <nobr>&lt;<a href="#map-options">Map options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td class="factory-usage">
            <code>L.map(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает экземпляр класса карты по переданному dom элементу div (или его id) и необязательному объекту с опциями карты, описанными ниже.</td>
    </tr>
</table>

### Опции

<table>
    <tr>
        <th>Опции</th>
        <th>Тип</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>center</b></code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td><code><span class="literal">null</span></code></td>
        <td>Задает начальный географический центр карты.</td>
    </tr>
    <tr>
        <td><code><b>zoom</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="literal">null</span></code></td>
        <td>Начальный уровень зума.</td>
    </tr>
    <tr>
        <td><code><b>layers</b></code></td>
        <td><code><a href="#ilayer">ILayer</a>[]</code></td>
        <td><code><span class="literal">null</span></code></td>
        <td>Слои, предварительно добавленные на карту.</td>
    </tr>
    <tr>
        <td><code><b>minZoom</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="literal">null</span></code></td>
        <td>Минимальный уровень зума на карте. Перезаписывает свойство <code>minZoom</code> установленное на слоях.</td>
    </tr>
    <tr>
        <td><code><b>maxZoom</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="literal">null</span></code></td>
        <td>Максимальный уровень зума на карте. Перезаписывает свойство <code>maxZoom</code> установленное на слоях.</td>
    </tr>
    <tr id="map-maxbounds">
        <td><code><b>maxBounds</b></code></td>
        <td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
        <td><code><span class="literal">null</span></code></td>
        <td>Если свойство установлено, карта ограничивает область просмотра согласно заданным географическим границам, отбрасывая пользователя назад, если он пытается выйти за пределы установленных границ, а также не позволяет уменьшить зум чтобы просмотреть неразрешенные участки карты. Чтобы установить ограничения динамически, используйте метод <a href="#map-setmaxbounds">setMaxBounds</a></td>
    </tr>
    <tr>
        <td><code><b>crs</b></code></td>
        <td><code><a href="#icrs">CRS</a></code></td>
        <td><code>L.CRS.<br/>EPSG3857</code></td>
        <td>Для использования Coordinate Reference System. Не меняйте эту опцию, если не уверены что она значит.</td>
    </tr>
</table>

#### Опции взаимодействия

<table>
  <tr>
		<th class="width140">Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>dragging</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">true</span></code></td>
		<td>Разрешено ли двигать карту мышкой или при помощи касания экрана.</td>
	</tr>
	<tr>
		<td><code><b>touchZoom</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">true</span></code></td>
		<td>Разрешено ли зумировать карту 2мя пальцами на touch устройствах.</td>
	</tr>
	<tr>
		<td><code><b>scrollWheelZoom</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">true</span></code></td>
		<td>Разрешено ли зумировать карту колесиком мышки.</td>
	</tr>
	<tr>
		<td><code><b>doubleClickZoom</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">true</span></code></td>
		<td>Разрешено ли зумировать карту двойным кликом мышки.</td>
	</tr>
	<tr>
		<td><code><b>boxZoom</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">true</span></code></td>
		<td>Разрешено ли увеличивать заданную область карты. Выделяется мышью с зажатым шифтом.</td>
	</tr>
	<tr>
		<td><code><b>trackResize</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">true</span></code></td>
		<td>Обновляется ли карта при изменении размера окна браузера.</td>
	</tr>
	<tr>
		<td><code><b>worldCopyJump</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">false</span></code></td>
		<td>Опция позволяет зациклить просмотр карты, с сохранением слоев и маркеров на ней.</td>
	</tr>
	<tr>
		<td><code><b>closePopupOnClick</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">true</span></code></td>
		<td>Указывает закрывать ли балуны при клике на карту.</td>
	</tr>
</table>

#### Навигация клавишами

<table>
  <tr>
  	<th class="width140">Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>keyboard</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">true</span></code></td>
		<td>Устанавливает фокус на карту и позволяет навигироваться стрелками и кнопками <code>+</code>/<code>-</code>.</td>
	</tr>
	<tr>
		<td><code><b>keyboardPanOffset</b></code></td>
		<td><code>Number</code></td>
		<td><code><span class="number">80</span></code></td>
		<td>Указывает на сколько пикселей сдвинется катра при нажатии стрелки на клавиатуре.</td>
	</tr>
	<tr>
		<td><code><b>keyboardZoomOffset</b></code></td>
		<td><code>Number</code></td>
		<td><code><span class="number">1</span></code></td>
		<td>Указывает на сколько уровней изменится зум при нажанитии <code>+</code> или <code>-</code>.</td>
	</tr>
</table>


#### Инерция движения карты
<table>
  <tr>
    <th class="width140">Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>inertia</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">true</span></code></td>
		<td>Если опция включена, создается эффект инерции при движении карты, при драгании карта продолжает движение в том же направлении какое-то время. Выглядит особенно хорошо на  touch устройствах.</td>
	</tr>
	<tr>
		<td><code><b>inertiaDeceleration</b></code></td>
		<td><code>Number</code></td>
		<td><code><span class="number">3000</span></code></td>
		<td>Величина, на которую замедляется движение карты, указывается в пикселях/секунду<sup>2</sup>.</td>
	</tr>
	<tr>
		<td><code><b>inertiaMaxSpeed</b></code></td>
		<td><code>Number</code></td>
		<td><code><span class="number">1500</span></code></td>
		<td>Максимальная скорость инерционного движения, указывается в пикселях/секунду.</td>
	</tr>
	<tr>
		<td><code><b>inertiaThreshold</b></code></td>
		<td><code>Number</code></td>
		<td><code>depends</code></td>
		<td>Колличество миллисекунд, которое должно пройти между остановкой движения карты и отпусканием мыши или touch, для предотвращения эффекта энерции. По умолчанию <code><span class="number">32</span></code> для touch устройств и <code><span class="number">14</span></code> для остальных.</td>
	</tr>
</table>


#### Элементы управления
<table>
  <tr>
    <th class="width140">Опция</th>
  	<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>zoomControl</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">true</span></code></td>
		<td>Добавлен ли <a href="#control-zoom">элемент управления зумом</a> на карту.</td>
	</tr>
	<tr>
		<td><code><b>attributionControl</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">true</span></code></td>
		<td>Добавлен ли  <a href="#control-attribution">элемент аттрибуции</a> на карту.</td>
	</tr>
</table>


#### Опции анимации
<table>
  <tr>
    <th class="width140">Опция</th>
    <th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>fadeAnimation</b></code></td>
		<td><code>Boolean</code></td>
		<td>depends</td>
		<td>Включена ли анимция затухания тайлов. По умолчанию включена во всех браузерах поддерживающих CSS3 Transitions кроме Android.</td>
	</tr>
	<tr>
		<td><code><b>zoomAnimation</b></code></td>
		<td><code>Boolean</code></td>
		<td>depends</td>
		<td>Включена ли анимация зума тайлов. По умолчанию включена во всех браузерах поддерживающих CSS3 Transitions кроме Android.</td>
	</tr>
	<tr>
		<td><code><b>markerZoomAnimation</b></code></td>
		<td><code>Boolean</code></td>
		<td>depends</td>
		<td>Включена ли анимация зума маркеров при анимации зума карты, если выключена, маркеры пропадают на время анимации карты. По умолчанию включена во всех браузерах поддерживающих CSS3 Transitions кроме Android.</td>
	</tr>
</table>


### Events

You can subscribe to the following events using [these methods][39].
Event
Data
Description

`**click**`
`[MouseEvent][61]`
Fired when the user clicks (or taps) the map.

`**dblclick**`
`[MouseEvent][61]`
Fired when the user double-clicks (or double-taps) the map.

`**mousedown**`
`[MouseEvent][61]`
Fired when the user pushes the mouse button on the map.

`**mouseup**`
`[MouseEvent][61]`
Fired when the user pushes the mouse button on the map.

`**mouseover**`
`[MouseEvent][61]`
Fired when the mouse enters the map.

`**mouseout**`
`[MouseEvent][61]`
Fired when the mouse leaves the map.

`**mousemove**`
`[MouseEvent][61]`
Fired while the mouse moves over the map.

`**contextmenu**`
`[MouseEvent][61]`
Fired when the user pushes the right mouse button on the map, prevents default browser context menu from showing if there are listeners on this event.

`**focus**`
`[Event][62]`
Fired when the user focuses the map either by tabbing to it or clicking/panning.

`**blur**`
`[Event][62]`
Fired when the map looses focus.

`**preclick**`
`[MouseEvent][61]`
Fired before mouse click on the map (sometimes useful when you want something to happen on click before any existing click handlers start running).

`**load**`
`[Event][62]`
Fired when the map is initialized (when its center and zoom are set for the first time).

`**viewreset**`
`[Event][62]`
Fired when the map needs to redraw its content (this usually happens on map zoom or load). Very useful for creating custom overlays.

`**movestart**`
`[Event][62]`
Fired when the view of the map starts changing (e.g. user starts dragging the map).

`**move**`
`[Event][62]`
Fired on any movement of the map view.

`**moveend**`
`[Event][62]`
Fired when the view of the map ends changed (e.g. user stopped dragging the map).

`**dragstart**`
`[Event][62]`
Fired when the user starts dragging the map.

`**drag**`
`[Event][62]`
Fired repeatedly while the user drags the map.

`**dragend**`
`[Event][62]`
Fired when the user stops dragging the map.

`**zoomstart**`
`[Event][62]`
Fired when the map zoom is about to change (e.g. before zoom animation).

`**zoomend**`
`[Event][62]`
Fired when the map zoom changes.

`**autopanstart**`
`[Event][62]`
Fired when the map starts autopanning when opening a popup.

`**layeradd**`
`[LayerEvent][63]`
Fired when a new layer is added to the map.

`**layerremove**`
`[LayerEvent][63]`
Fired when some layer is removed from the map.

`**baselayerchange**`
`[LayerEvent][63]`
Fired when the base layer is changed through the layer control.

`**locationfound**`
`[LocationEvent][64]`
Fired when geolocation (using the [locate][65] method) went successfully.

`**locationerror**`
`[ErrorEvent][66]`
Fired when geolocation (using the [locate][67] method) failed.

`**popupopen**`
`[PopupEvent][68]`
Fired when a popup is opened (using `openPopup` method).

`**popupclose**`
`[PopupEvent][68]`
Fired when a popup is closed (using `closePopup` method).

### Methods for Modifying Map State
Method
Returns
Description

`**setView**(
            <[LatLng][28]> _center_,
<Number> _zoom_,
<Boolean> _forceReset?_ )
`
`this`
Sets the view of the map (geographical center and zoom). If `forceReset` is set to `true`, the map is reloaded even if it's eligible for pan or zoom animation (`false` by default).

`**setZoom**(
            <Number> _zoom_ )
`
`this`
Sets the zoom of the map.

`**zoomIn**( <Number> delta? )`
`this`
Increases the zoom of the map by `delta` (`1` by default).

`**zoomOut**( <Number> delta? )`
`this`
Decreases the zoom of the map by `delta` (`1` by default).

`**fitBounds**(
            <[LatLngBounds][29]> _bounds_ )
`
`this`
Sets a map view that contains the given geographical bounds with the maximum zoom level possible.

`**fitWorld**()`
`this`
Sets a map view that mostly contains the whole world with the maximum zoom level possible.

`**panTo**(
            <[LatLng][28]> _latlng_ )
`
`this`
Pans the map to a given center. Makes an animated pan if new center is not more than one screen away from the current one.

`**panInsideBounds**(
            <[LatLngBounds][29]> _bounds_ )
`
`this`
Pans the map to the closest view that would lie inside the given bounds (if it's not already).

`**panBy**(
            <[Point][30]> _point_ )
`
`this`
Pans the map by a given number of pixels (animated).

`**invalidateSize**(
            <Boolean> _animate?_ )
`
`this`
Checks if the map container size changed and updates the map if so --- call it after you've changed the map size dynamically. If `animate` is `true`, map animates the update.

`**setMaxBounds**(
            <[LatLngBounds][29]> _bounds_ )
`
`this`
Restricts the map view to the given bounds (see [map maxBounds][69] option).

`**locate**(
            <[Locate options][70]> _options?_ )
`
`this`
Tries to locate the user using the [Geolocation API][71], firing a `locationfound` event with location data on success or a `locationerror` event on failure, and optionally sets the map view to the user's location with respect to detection accuracy (or to the world view if geolocation failed). See [Locate options][70] for more details.

`**stopLocate**()`
`this`
Stops watching location previously initiated by `**map.locate**({watch: true})`.

### Methods for Getting Map State
Method
Returns
Description

`**getCenter**()`
`[LatLng][28]`
Returns the geographical center of the map view.

`**getZoom**()`
`Number`
Returns the current zoom of the map view.

`**getMinZoom**()`
`Number`
Returns the minimum zoom level of the map.

`**getMaxZoom**()`
`Number`
Returns the maximum zoom level of the map.

`**getBounds**()`
`[LatLngBounds][29]`
Returns the LatLngBounds of the current map view.

`**getBoundsZoom**(
            <[LatLngBounds][29]> _bounds_,
<Boolean> _inside?_ )
`
`Number`
Returns the maximum zoom level on which the given bounds fit to the map view in its entirety. If `inside` (optional) is set to `true`, the method instead returns the minimum zoom level on which the map view fits into the given bounds in its entirety.

`**getSize**()`
`[Point][30]`
Returns the current size of the map container.

`**getPixelBounds**()`
`Bounds`
Returns the bounds of the current map view in projected pixel coordinates (sometimes useful in layer and overlay implementations).

`**getPixelOrigin**()`
`[Point][30]`
Returns the projected pixel coordinates of the top left point of the map layer (useful in custom layer and overlay implementations).

### Methods for Layers and Controls
Method
Returns
Description

`**addLayer**(
            <[ILayer][52]> _layer_,
<Boolean> _insertAtTheBottom?_ )
`
`this`
Adds the given layer to the map. If optional `insertAtTheBottom` is set to `true`, the layer is inserted under all others (useful when switching base tile layers).

`**removeLayer**(
            <[ILayer][52]> _layer_ )
`
`this`
Removes the given layer from the map.

`**hasLayer**(
            <[ILayer][52]> _layer_ )
`
`Boolean`
Returns `true` if the given layer is currently added to the map.

`**openPopup**(
            <[Popup][12]> _popup_ )
`
`this`
Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).

`**closePopup**()`
`this`
Closes the popup opened with [openPopup][72].

`**addControl**(
            <[IControl][53]> _control_ )
`
`this`
Adds the given control to the map.

`**removeControl**(
            <[IControl][53]> _control_ )
`
`this`
Removes the given control from the map.

### Conversion Methods
Method
Returns
Description

`**latLngToLayerPoint**(
            <[LatLng][28]> _latlng_ )
`
`[Point][30]`
Returns the map layer point that corresponds to the given geographical coordinates (useful for placing overlays on the map).

`**layerPointToLatLng**(
            <[Point][30]> _point_ )
`
`[LatLng][28]`
Returns the geographical coordinates of a given map layer point.

`**containerPointToLayerPoint**(
            <[Point][30]> _point_ )
`
`[Point][30]`
Converts the point relative to the map container to a point relative to the map layer.

`**layerPointToContainerPoint**(
            <[Point][30]> _point_ )
`
`[Point][30]`
Converts the point relative to the map layer to a point relative to the map container.

`**latLngToContainerPoint**(
            <[LatLng][28]> _latlng_ )
`
`[Point][30]`
Returns the map container point that corresponds to the given geographical coordinates.

`**containerPointToLatLng**(
            <[Point][30]> _point_ )
`
`[LatLng][28]`
Returns the geographical coordinates of a given map container point.

`**project**(
            <[LatLng][28]> _latlng_,
<Number> _zoom?_ )
`
`[Point][30]`
Projects the given geographical coordinates to absolute pixel coordinates for the given zoom level (current zoom level by default).

`**unproject**(
            <[Point][30]> _point_,
<Number> _zoom?_ )
`
`[LatLng][28]`
Projects the given absolute pixel coordinates to geographical coordinates for the given zoom level (current zoom level by default).

`**mouseEventToContainerPoint**(
            <MouseEvent> _event_ )
`
`[Point][30]`
Returns the pixel coordinates of a mouse click (relative to the top left corner of the map) given its event object.

`**mouseEventToLayerPoint**(
            <MouseEvent> _event_ )
`
`[Point][30]`
Returns the pixel coordinates of a mouse click relative to the map layer given its event object.

`**mouseEventToLatLng**(
            <MouseEvent> _event_ )
`
`[LatLng][28]`
Returns the geographical coordinates of the point the mouse clicked on given the click's event object.

### Other Methods
Method
Returns
Description

`**getContainer**()`
`HTMLElement`
Returns the container element of the map.

`**getPanes**()`
`[MapPanes][10]`
Returns an object with different map panes (to render overlays in).

`**whenReady**(
            <Function> _fn_,
            <Object> _context?_ )`
`this`
Runs the given callback when the map gets initialized with a place and zoom, or immediately if it happened already, optionally passing a function context.

### Locate options
Option
Type
Default
Description

`**watch**`
`Boolean`
`false`
If `true`, starts continous watching of location changes (instead of detecting it once) using W3C `watchPosition` method. You can later stop watching using `**map.stopLocate**()` method.

`**setView**`
`Boolean`
`false`
If `true`, automatically sets the map view to the user location with respect to detection accuracy, or to world view if geolocation failed.

`**maxZoom**`
`Number`
`Infinity`
The maximum zoom for automatic view setting when using \`setView\` option.

`**timeout**`
`Number`
`10000`
Number of millisecond to wait for a response from geolocation before firing a `locationerror` event.

`**maximumAge**`
`Number`
`0`
Maximum age of detected location. If less than this amount of milliseconds passed since last geolocation response, `locate` will return a cached location.

`**enableHighAccuracy**`
`Boolean`
`false`
Enables high accuracy, see [description in the W3C spec][73].

### Properties

Map properties include interaction handlers that allow you to control interaction behavior in runtime, enabling or disabling certain features such as dragging or touch zoom (see [IHandler][51] methods). Example:

    map.doubleClickZoom.disable();

You can also access default map controls like attribution control through map properties:

    map.attributionControl.addAttribution("Earthquake data &copy; GeoNames");

Property
Type
Description

`**dragging**`
[`IHandler`][51]
Map dragging handler (by both mouse and touch).

`**touchZoom**`
[`IHandler`][51]
Touch zoom handler.

`**doubleClickZoom**`
[`IHandler`][51]
Double click zoom handler.

`**scrollWheelZoom**`
[`IHandler`][51]
Scroll wheel zoom handler.

`**boxZoom**`
[`IHandler`][51]
Box (shift-drag with mouse) zoom handler.

`**keyboard**`
[`IHandler`][51]
Keyboard navigation handler.

`**zoomControl**`
[`Control.Zoom`][35]
Zoom control.

`**attributionControl**`
[`Control.Attribution`][36]
Attribution control.

### Map Panes

An object literal (returned by [map.getPanes][74]) that contains different map panes that you can use to put your custom overlays in. The difference is mostly in zIndex order that such overlays get.
Property
Type
Description

`**mapPane**`
`HTMLElement`
Pane that contains all other map panes.

`**tilePane**`
`HTMLElement`
Pane for tile layers.

`**objectsPane**`
`HTMLElement`
Pane that contains all the panes except tile pane.

`**shadowPane**`
`HTMLElement`
Pane for overlay shadows (e.g. marker shadows).

`**overlayPane**`
`HTMLElement`
Pane for overlays like polylines and polygons.

`**markerPane**`
`HTMLElement`
Pane for marker icons.

`**popupPane**`
`HTMLElement`
Pane for popups.

## L.Marker

Used to put markers on the map.

    L.marker([50.5, 30.5]).addTo(map);

### Constructor
Constructor
Usage
Description

`**L.Marker**(
            <[LatLng][28]> _latlng_,
<[Marker options][75]> _options?_ )
`
`new L.Marker(…)`
`L.marker(…)`
Instantiates a Marker object given a geographical point and optionally an options object.

### Options
Option
Type
Default
Description

`**icon**`
`[L.Icon][32]`
\*
Icon class to use for rendering the marker. See [Icon documentation][32] for details on how to customize the marker icon. Set to `new L.Icon.Default()` by default.

`**clickable**`
`Boolean`
`true`
If `false`, the marker will not emit mouse events and will act as a part of the underlying map.

`**draggable**`
`Boolean`
`false`
Whether the marker is draggable with mouse/touch or not.

`**title**`
`String`
`''`
Text for the browser tooltip that appear on marker hover (no tooltip by default).

`**zIndexOffset**`
`Number`
`0`
By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).

`**opacity**`
`Number`
`1.0`
The opacity of the marker.

`**riseOnHover**`
`Boolean`
`false`
If `true`, the marker will get on top of others when you hover the mouse over it.

`**riseOffset**`
`Number`
`250`
The z-index offset used for the `riseOnHover` feature.

### Events

You can subscribe to the following events using [these methods][39].
Event
Data
Description

`**click**`
`[MouseEvent][61]`
Fired when the user clicks (or taps) the marker.

`**dblclick**`
`[MouseEvent][61]`
Fired when the user double-clicks (or double-taps) the marker.

`**mousedown**`
`[MouseEvent][61]`
Fired when the user pushes the mouse button on the marker.

`**mouseover**`
`[MouseEvent][61]`
Fired when the mouse enters the marker.

`**mouseout**`
`[MouseEvent][61]`
Fired when the mouse leaves the marker.

`**contextmenu**`
`[MouseEvent][61]`
Fired when the user right-clicks on the marker.

`**dragstart**`
`[Event][62]`
Fired when the user starts dragging the marker.

`**drag**`
`[Event][62]`
Fired repeatedly while the user drags the marker.

`**dragend**`
`[Event][62]`
Fired when the user stops dragging the marker.

`**move**`
`[Event][62]`
Fired when the marker is moved via setLatLng. New coordinate include in event arguments.

`**remove**`
`[Event][62]`
Fired when the marker is removed from the map.

### Methods
Method
Returns
Description

`**addTo**(
            <[Map][76]> _map_ )
`
`this`
Adds the marker to the map.

`**getLatLng**()`
`[LatLng][28]`
Returns the current geographical position of the marker.

`**setLatLng**(
            <[LatLng][28]> _latlng_ )
`
`this`
Changes the marker position to the given point.

`**setIcon**(
            <[Icon][32]> _icon_ )
`
`this`
Changes the marker icon.

`**setZIndexOffset**(
            <Number> _offset_ )
`
`this`
Changes the [zIndex offset][77] of the marker.

`**setOpacity**(
            <Number> _opacity_ )
`
`this`
Changes the opacity of the marker.

`**update**()
        `
`this`
Updates the marker position, useful if coordinates of its `latLng` object were changed directly.

`**bindPopup**(
            <String> _htmlContent_,
<[Popup options][78]> _options?_ )
`
`this`
Binds a popup with a particular HTML content to a click on this marker. You can also open the bound popup with the Marker [openPopup][79] method.

`**unbindPopup**()`
`this`
Unbinds the popup previously bound to the marker with `bindPopup`.

`**openPopup**()`
`this`
Opens the popup previously bound by the [bindPopup][80] method.

`**closePopup**()`
`this`
Closes the bound popup of the marker if it's opened.

### Interaction handlers

Interaction handlers are properties of a marker instance that allow you to control interaction behavior in runtime, enabling or disabling certain features such as dragging (see [IHandler][51] methods). Example:

    marker.dragging.disable();

Property
Type
Description

dragging
[`IHandler`][51]
Marker dragging handler (by both mouse and touch).

## L.Popup

Used to open popups in certain places of the map. Use [Map\#openPopup][72] to open popups while making sure that only one popup is open at one time (recommended for usability), or use [Map\#addLayer][81] to open as many as you want.

### Usage example

If you want to just bind a popup to marker click and then open it, it's really easy:

    marker.bindPopup(popupContent).openPopup();

Path overlays like polylines also have a `bindPopup` method. Here's a more complicated way to open a popup on a map:

    var popup = L.popup()
        .setLatLng(latlng)
        .setContent('<p>Hello world!<br />This is a nice popup.</p>')
        .openOn(map);

### Constructor
Constructor
Usage
Description

`**L.Popup**(
            <[Popup options][78]> _options?_,
<object> _source?_ )
`
`new L.Popup(…)`
`L.popup(…)`
Instantiates a Popup object given an optional options object that describes its appearance and location and an optional object that is used to tag the popup with a reference to the source object to which it refers.

### Options
Option
Type
Default
Description

`**maxWidth**`
`Number`
`300`
Max width of the popup.

`**minWidth**`
`Number`
`50`
Min width of the popup.

`**maxHeight**`
`Number`
`null`
If set, creates a scrollable container of the given height inside a popup if its content exceeds it.

`**autoPan**`
`Boolean`
`true`
Set it to `false` if you don't want the map to do panning animation to fit the opened popup.

`**closeButton**`
`Boolean`
`true`
Controls the presense of a close button in the popup.

`**offset**`
`[Point][30]`
`Point(0, 6)
`
The offset of the popup position. Useful to control the anchor of the popup when opening it on some overlays.

`**autoPanPadding**`
`[Point][30]`
`Point(5, 5)
`
The margin between the popup and the edges of the map view after autopanning was performed.

`**zoomAnimation**`
`Boolean`
`true`
Whether to animate the popup on zoom. Disable it if you have problems with Flash content inside popups.

### Methods
Method
Returns
Description

`**addTo**(
            <[Map][76]> _map_ )
`
`this`
Adds the popup to the map.

`**openOn**(
            <[Map][76]> _map_ )
`
`this`
Adds the popup to the map and closes the previous one. The same as `map.openPopup(popup)`.

`**setLatLng**(
            <[LatLng][28]> _latlng_ )
`
`this`
Sets the geographical point where the popup will open.

`**setContent**(
            <String> _htmlContent_ )
`
`this`
Sets the HTML content of the popup.

## L.TileLayer

Used to load and display tile layers on the map, implements [ILayer][52] interface.

### Usage example

    L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
        key: 'API-key',
        styleId: 997
    }).addTo(map);

### Constructor
Constructor
Usage
Description

`**L.TileLayer**(
            <String> _[urlTemplate][82]_,
<[TileLayer options][83]> _options?_ )
`
`new L.TileLayer(…)`
`L.tileLayer(…)`
Instantiates a tile layer object given a [URL template][82] and optionally an options object.

### URL template

A string of the following form:

    'http://{s}.somedomain.com/blabla/{z}/{x}/{y}.png'

`{s}` means one of the available subdomains (used sequentially to help with browser parallel requests per domain limitation; subdomain values are specified in options; `a`, `b` or `c` by default, can be omitted), `{z}` --- zoom level, `{x}` and `{y}` --- tile coordinates.

You can use custom keys in the template, which will be evaluated from TileLayer options, like this:

    L.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});

### Options
Option
Type
Default
Description

`**minZoom**`
`Number`
`0`
Minimum zoom number.

`**maxZoom**`
`Number`
`18`
Maximum zoom number.

`**tileSize**`
`Number`
`256`
Tile size (width and height in pixels, assuming tiles are square).

`**subdomains**`
`String` or `String[]`
`'abc'`
Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.

`**errorTileUrl**`
`String`
`''`
URL to the tile image to show in place of the tile that failed to load.

`**attribution**`
`String`
`''`
e.g. "(c) CloudMade" --- the string used by the attribution control, describes the layer data.

`**tms**`
`Boolean`
`false`
If `true`, inverses Y axis numbering for tiles (turn this on for TMS services).

`**continuousWorld**`
`Boolean`
`false`
If set to `true`, the tile coordinates won't be wrapped by world width (-180 to 180 longitude) or clamped to lie within world height (-90 to 90). Use this if you use Leaflet for maps that don't reflect the real world (e.g. game, indoor or photo maps).

`**noWrap**`
`Boolean`
`false`
If set to `true`, the tiles just won't load outside the world width (-180 to 180 longitude) instead of repeating.

`**zoomOffset**`
`Number`
`0`
The zoom number used in tile URLs will be offset with this value.

`**zoomReverse**`
`Boolean`
`false`
If set to `true`, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)

`**opacity**`
`Number`
`1.0`
The opacity of the tile layer.

`**zIndex**`
`Number`
`null`
The explicit zIndex of the tile layer. Not set by default.

`**unloadInvisibleTiles**`
`Boolean`
depends
If `true`, all the tiles that are not visible after panning are removed (for better performance). `true` by default on mobile WebKit, otherwise `false`.

`**updateWhenIdle**`
`Boolean`
depends
If `false`, new tiles are loaded during panning, otherwise only after it (for better performance). `true` by default on mobile WebKit, otherwise `false`.

`**detectRetina**`
``Boolean``
`false`
If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.

`**reuseTiles**`
``Boolean``
`false`
If `true`, all the tiles that are not visible after panning are placed in a reuse queue from which they will be fetched when new tiles become visible (as opposed to dynamically creating new ones). This will in theory keep memory usage low and eliminate the need for reserving new memory whenever a new tile is needed.

### Events

You can subscribe to the following events using [these methods][39].
Event
Data
Description

`**loading**`
`[Event][62]`
Fired when the tile layer starts loading tiles.

`**load**`
`[Event][62]`
Fired when the tile layer loaded all visible tiles.

`**tileload**`
`[Event][84]`
Fired when a tile loads.

`**tileunload**`
`[Event][84]`
Fired when a tile is removed (e.g. when you have `unloadInvisibleTiles` on).

### Methods
Method
Returns
Description

`**addTo**(
            <[Map][76]> _map_ )
`
`this`
Adds the layer to the map.

`**bringToFront**()`
`this`
Brings the tile layer to the top of all tile layers.

`**bringToBack**()`
`this`
Brings the tile layer to the bottom of all tile layers.

`**setOpacity**(
            <Number> _opacity_ )
`
`this`
Changes the opacity of the tile layer.

`**setZIndex**(
            <Number> _zIndex_ )
`
`this`
Sets the zIndex of the tile layer.

`**redraw**()`
`this`
Causes the layer to clear all the tiles and request them again.

`**setUrl**(
            <String> _[urlTemplate][82]_ )
`
`this`
Updates the layer's URL template and redraws it.

## L.TileLayer.WMS

Used to display WMS services as tile layers on the map. Extends [TileLayer][13].

### Usage example

    var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
        layers: 'nexrad-n0r-900913',
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad"
    });

### Constructor
Constructor
Usage
Description

`**L.TileLayer.WMS**(
            <String> _baseUrl_,
            <[TileLayer.WMS options][85]> _options_ )
`
`new L.TileLayer.WMS(…)`
`L.tileLayer.wms(…)`
Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS parameters/options object.

### Options

Includes all [TileLayer options][83] and additionally:
Option
Type
Default
Description

`**layers**`
`String`
`''`
**(required)** Comma-separated list of WMS layers to show.

`**styles**`
`String`
`''`
Comma-separated list of WMS styles.

`**format**`
`String`
`'image/jpeg'`
WMS image format (use `'image/png'` for layers with transparency).

`**transparent**`
`Boolean`
`false`
If `true`, the WMS service will return images with transparency.

`**version**`
`String`
`'1.1.1'`
Version of the WMS service to use.

### Methods
Method
Returns
Description

`**setParams**(
            <[WMS parameters][85]> _params_,
            <Boolean> _noRedraw?_ )
`
`this`
Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to `true`).

## L.TileLayer.Canvas

Used to create Canvas-based tile layers where tiles get drawn on the browser side. Extends [TileLayer][13].

### Usage example

    var canvasTiles = L.tileLayer.canvas();

    canvasTiles.drawTile = function(canvas, tilePoint, zoom) {
        var ctx = canvas.getContext('2d');
        // draw something on the tile canvas
    }

### Constructor
Constructor
Usage
Description

`**L.TileLayer.Canvas**(
            <[TileLayer options][83]> _options?_ )
`
`new L.TileLayer.Canvas(…)`
`L.tileLayer.canvas(…)`
Instantiates a Canvas tile layer object given an options object (optionally).

### Options
Option
Type
Default
Description

`**async**`
`Boolean`
`false`
Indicates that tiles will be drawn asynchronously. [tileDrawn][86] method should be called for each tile after drawing completion.

### Methods
Method
Returns
Description

`**drawTile**(
            <HTMLCanvasElement> _canvas_,
            <[Point][30]> _tilePoint_,
            <Number> _zoom_ )
`
`this`
You need to define this method after creating the instance to draw tiles; `canvas` is the actual canvas tile on which you can draw, `tilePoint` represents the tile numbers, and `zoom` is the current zoom.

`**tileDrawn**( <HTMLCanvasElement> _canvas_ )`
-
If `async` option is defined, this function should be called for each tile after drawing completion. `canvas` is the same canvas element, that was passed to [drawTile][87].

## L.ImageOverlay

Used to load and display a single image over specific bounds of the map, implements [ILayer][52] interface.

### Usage example

    var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
        imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];

    L.imageOverlay(imageUrl, imageBounds).addTo(map);

### Constructor
Constructor
Usage
Description

`**L.ImageOverlay**(
            <String> _imageUrl_,
            <[LatLngBounds][29]> _bounds_,
            <[ImageOverlay options][88]> _options?_ )
`
`new L.ImageOverlay(…)`
`L.imageOverlay(…)`
Instantiates an image overlay object given the URL of the image and the geographical bounds it is tied to.

### Options
Option
Type
Default
Description

`**opacity**`
`Number`
`1.0`
The opacity of the image overlay.

### Methods
Method
Returns
Description

`**addTo**(
            <[Map][76]> _map_ )
`
`this`
Adds the overlay to the map.

`**setOpacity**(
            <Number> _opacity_ )
`
`this`
Sets the opacity of the overlay.

`**bringToFront**()`
`this`
Brings the layer to the top of all overlays.

`**bringToBack**()`
`this`
Brings the layer to the bottom of all overlays.

## L.Path

An abstract class that contains options and constants shared between vector overlays (Polygon, Polyline, Circle). Do not use it directly.

### Options
Option
Type
Default
Description

`**stroke**`
`Boolean`
`true`
Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.

`**color**`
`String`
`'#03f'`
Stroke color.

`**weight**`
`Number`
`5`
Stroke width in pixels.

`**opacity**`
`Number`
`0.5`
Stroke opacity.

`**fill**`
`Boolean`
depends
Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.

`**fillColor**`
`String`
same as color
Fill color.

`**fillOpacity**`
`Number`
`0.2`
Fill opacity.

`**dashArray**`
`String`
`null`
A string that defines the stroke [dash pattern][89]. Doesn't work on canvas-powered layers (e.g. Android 2).

`**clickable**`
`Boolean`
`true`
If `false`, the vector will not emit mouse events and will act as a part of the underlying map.

### Events

You can subscribe to the following events using [these methods][39].
Event
Data
Description

`**click**`
`[MouseEvent][61]`
Fired when the user clicks (or taps) the object.

`**dblclick**`
`[MouseEvent][61]`
Fired when the user double-clicks (or double-taps) the object.

`**mousedown**`
`[MouseEvent][61]`
Fired when the user pushes the mouse button on the object.

`**mouseover**`
`[MouseEvent][61]`
Fired when the mouse enters the object.

`**mouseout**`
`[MouseEvent][61]`
Fired when the mouse leaves the object.

`**contextmenu**`
`[MouseEvent][61]`
Fired when the user pushes the right mouse button on the object, prevents default browser context menu from showing if there are listeners on this event.

`**add**`
`[Event][62]`
Fired when the path is added to the map.

`**remove**`
`[Event][62]`
Fired when the path is removed from the map.

### Methods
Method
Returns
Description

`**addTo**(
            <[Map][76]> _map_ )
`
`this`
Adds the layer to the map.

`**bindPopup**(
            <String> _htmlContent_,
            <[Popup options][78]> _options?_ )
`
`this`
Binds a popup with a particular HTML content to a click on this path.

`**unbindPopup**()`
`this`
Unbinds the popup previously bound to the path with `bindPopup`.

`**openPopup**(
            <[LatLng][28]> _latlng?_ )
`
`this`
Opens the popup previously bound by the [bindPopup][90] method in the given point, or in one of the path's points if not specified.

`**closePopup**()`
`this`
Closes the path's bound popup if it is opened.

`**setStyle**(
            <[Path options][91]> _object_ )
`
`this`
Changes the appearance of a Path based on the options in the [Path options][91] object.

`**getBounds**()`
`[LatLngBounds][29]`
Returns the LatLngBounds of the path.

`**bringToFront**()`
`this`
Brings the layer to the top of all path layers.

`**bringToBack**()`
`this`
Brings the layer to the bottom of all path layers.

`**redraw**()`
`this`
Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.

### Static properties
Constant
Type
Value
Description

`SVG`
`Boolean`
depends
True if SVG is used for vector rendering (true for most modern browsers).

`VML`
`Boolean`
depends
True if VML is used for vector rendering (IE 6-8).

`CANVAS`
`Boolean`
depends
True if Canvas is used for vector rendering (Android 2). You can also force this by setting global variable `L_PREFER_CANVAS` to `true` _before_ the Leaflet include on your page --- sometimes it can increase performance dramatically when rendering thousands of circle markers, but currently suffers from a bug that causes removing such layers to be extremely slow.

`CLIP_PADDING`
`Number`
`0.5` for SVG
`0.02` for VML
How much to extend the clip area around the map view (relative to its size, e.g. 0.5 is half the screen in each direction). Smaller values mean that you will see clipped ends of paths while you're dragging the map, and bigger values decrease drawing performance.

## L.Polyline

A class for drawing polyline overlays on a map. Extends [Path][17]. Use [Map\#addLayer][81] to add it to the map.

### Usage example

    // create a red polyline from an arrays of LatLng points
    var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

    // zoom the map to the polyline
    map.fitBounds(polyline.getBounds());

### Constructor
Constructor
Usage
Description

`**L.Polyline**(
            <[LatLng][28][]> _latlngs_,
            <[Polyline options][92]> _options?_ )
`
`new L.Polyline(…)`
`L.polyline(…)`
Instantiates a polyline object given an array of geographical points and optionally an options object.

### Options

You can use [Path options][91] and additionally the following options:
Option
Type
Default
Description

`**smoothFactor**`
`Number`
`1.0`
How much to simplify the polyline on each zoom level. More means better performance and smoother look, and less means more accurate representation.

`**noClip**`
`Boolean`
`false`
Disabled polyline clipping.

### Methods

You can use [Path methods][93] and additionally the following methods:
Method
Returns
Description

`**addLatLng**(
            <[LatLng][28]> _latlng_ )
`
`this`
Adds a given point to the polyline.

`**setLatLngs**(
            <[LatLng][28][]> _latlngs_ )
`
`this`
Replaces all the points in the polyline with the given array of geographical points.

`**getLatLngs**()`
`[LatLng][28][]`
Returns an array of the points in the path.

`**spliceLatLngs**(
            <Number> _index_,
            <Number> _pointsToRemove_,
            <[LatLng][28]> _latlng?_, … )
`
`[LatLng][28][]`
Allows adding, removing or replacing points in the polyline. Syntax is the same as in [Array\#splice][94]. Returns the array of removed points (if any).

`**getBounds**()`
`[LatLngBounds][29]`
Returns the LatLngBounds of the polyline.

## L.MultiPolyline

Extends [FeatureGroup][26] to allow creating multi-polylines (single layer that consists of several polylines that share styling/popup).

### Constructor
Constructor
Usage
Description

`**L.MultiPolyline**(
            <[LatLng][28][][]> _latlngs_,
            <[Polyline options][92]> _options?_ )
`
`new L.MultiPolyline(…)`
`L.multiPolyline(…)`
Instantiates a multi-polyline object given an array of arrays of geographical points (one for each individual polyline) and optionally an options object.

## L.Polygon

A class for drawing polygon overlays on a map. Extends [Polyline][18]. Use [Map\#addLayer][81] to add it to the map.

Note that points you pass when creating a polygon shouldn't have an additional last point equal to the first one --- it's better to filter out such points.

### Constructor
Constructor
Usage
Description

`**L.Polygon**(
            <[LatLng][28][]> _latlngs_,
            <[Polyline options][92]> _options?_ )
`
`new L.Polygon(…)`
`L.polygon(…)`
Instantiates a polygon object given an array of geographical points and optionally an options object (the same as for Polyline). You can also create a polygon with holes by passing an array of arrays of latlngs, with the first latlngs array representing the exterior ring while the remaining represent the holes inside.

Polygon the same options and methods as Polyline.

## L.MultiPolygon

Extends [FeatureGroup][26] to allow creating multi-polygons (single layer that consists of several polygons that share styling/popup).

### Constructor
Constructor
Usage
Description

`**L.MultiPolygon**(
            <[LatLng][28][][]> _latlngs_,
            <[Polyline options][92]> _options?_ )
`
`new L.MultiPolygon(…)`
`L.multiPolygon(…)`
Instantiates a multi-polyline object given an array of latlngs arrays (one for each individual polygon) and optionally an options object (the same as for MultiPolyline).

## L.Rectangle

A class for drawing rectangle overlays on a map. Extends [Polygon][20]. Use [Map\#addLayer][81] to add it to the map.

### Usage example

    // define rectangle geographical bounds
    var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];

    // create an orange rectangle
    L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);

    // zoom the map to the rectangle bounds
    map.fitBounds(bounds);

### Constructor
Constructor
Usage
Description

`**L.Rectangle**(
            <[LatLngBounds][29]> _bounds_,
            <[Path options][91]> _options?_ )
`
`new L.Rectangle(…)`
`L.rectangle(…)`
Instantiates a rectangle object with the given geographical bounds and optionally an options object.

### Methods

You can use [Path methods][93] and additionally the following methods:
Method
Returns
Description

`**setBounds**(
            <[LatLngBounds][29]> _bounds_ )
`
`this`
Redraws the rectangle with the passed bounds.

## L.Circle

A class for drawing circle overlays on a map. Extends [Path][17]. Use [Map\#addLayer][81] to add it to the map.

    L.circle([50.5, 30.5], 200).addTo(map);

### Constructor
Constructor
Usage
Description

`**L.Circle**(
            <[LatLng][28]> _latlng_,
            <Number> _radius_,
            <[Path options][91]> _options?_ )
`
`new L.Circle(…)`
`L.circle(…)`
Instantiates a circle object given a geographical point, a radius in meters and optionally an options object.

### Methods
Method
Returns
Description

`**getLatLng**()`
`[LatLng][28]`
Returns the current geographical position of the circle.

`**getRadius**()`
`Number`
Returns the current radius of a circle. Units are in meters.

`**setLatLng**(
            <[LatLng][28]> _latlng_ )
`
`this`
Sets the position of a circle to a new location.

`**setRadius**(
            <Number> _radius_ )
`
`this`
Sets the radius of a circle. Units are in meters.

## L.CircleMarker

A circle of a fixed size with radius specified in pixels. Extends [Circle][23]. Use [Map\#addLayer][81] to add it to the map.

### Constructor
Constructor
Usage
Description

`**L.CircleMarker**(
            <[LatLng][28]> _latlng_,
            <[Path options][91]> _options?_ )
`
`new L.CircleMarker(…)`
`L.circleMarker(…)`
Instantiates a circle marker given a geographical point and optionally an options object. The default radius is 10 and can be altered by passing a "radius" member in the path options object.

### Methods
Method
Returns
Description

`**setLatLng**(
            <[LatLng][28]> _latlng_ )
`
`this`
Sets the position of a circle marker to a new location.

`**setRadius**(
            <Number> _radius_ )
`
`this`
Sets the radius of a circle marker. Units are in pixels.

## L.LayerGroup

Used to group several layers and handle them as one. If you add it to the map, any layers added or removed from the group will be added/removed on the map as well. Implements [ILayer][52] interface.

    L.layerGroup([marker1, marker2])
        .addLayer(polyline)
        .addTo(map);

### Constructor
Constructor
Usage
Description

`**L.LayerGroup**(
            <[ILayer][52][]> _layers?_ )
`
`new L.LayerGroup(…)`
`L.layerGroup(…)`
Create a layer group, optionally given an initial set of layers.

### Methods
Method
Returns
Description

`**addTo**(
            <[Map][76]> _map_ )
`
`this`
Adds the group of layers to the map.

`**addLayer**(
            <[ILayer][52]> _layer_ )
`
`this`
Adds a given layer to the group.

`**removeLayer**(
            <[ILayer][52]> _layer_ )
`
`this`
Removes a given layer from the group.

`**clearLayers**()`
`this`
Removes all the layers from the group.

`**eachLayer**(
            <Function> _fn_,
            <Object> _context?_ )
`
`this`
Iterates over the layers of the group, optionally specifying context of the iterator function.

    group.eachLayer(function (layer) {
        layer.bindPopup('Hello');
    });

## L.FeatureGroup

Extended [LayerGroup][25] that also has mouse events (propagated from members of the group) and a shared bindPopup method. Implements [ILayer][52] interface.

    L.featureGroup([marker1, marker2, polyline])
        .bindPopup('Hello world!')
        .on('click', function() { alert('Clicked on a group!'); })
        .addTo(map);

### Constructor
Constructor
Usage
Description

`**L.FeatureGroup**(
            <[ILayer][52][]> _layers?_ )
`
`new L.FeatureGroup(…)`
`L.featureGroup(…)`
Create a layer group, optionally given an initial set of layers.

### Methods

Has all [LayerGroup][25] methods and additionally:
Method
Returns
Description

`**bindPopup**(
            <String> _htmlContent_,
            <[Popup options][78]> _options?_ )
`
`this`
Binds a popup with a particular HTML content to a click on any layer from the group that has a `bindPopup` method.

`**getBounds**()`
`[LatLngBounds][29]`
Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).

`**setStyle**(
            <[Path options][91]> _style_ )
`
`this`
Sets the given path options to each layer of the group that has a `setStyle` method.

`**bringToFront**()`
`this`
Brings the layer group to the top of all other layers.

`**bringToBack**()`
`this`
Brings the layer group to the bottom of all other layers.

### Events

You can subscribe to the following events using [these methods][39].
Event
Data
Description

`**click**`
`[MouseEvent][61]`
Fired when the user clicks (or taps) the group.

`**dblclick**`
`[MouseEvent][61]`
Fired when the user double-clicks (or double-taps) the group.

`**mouseover**`
`[MouseEvent][61]`
Fired when the mouse enters the group.

`**mouseout**`
`[MouseEvent][61]`
Fired when the mouse leaves the group.

`**mousemove**`
`[MouseEvent][61]`
Fired while the mouse moves over the layers of the group.

`**contextmenu**`
`[MouseEvent][61]`
Fired when the user right-clicks on one of the layers.

`**layeradd**`
`[LayerEvent][63]`
Fired when a layer is added to the group.

`**layerremove**`
`[LayerEvent][63]`
Fired when a layer is removed from the map.

## L.GeoJSON

Represents a [GeoJSON][95] layer. Allows you to parse GeoJSON data and display it on the map. Extends [FeatureGroup][26].

    L.geoJson(data, {
        style: function (feature) {
            return {color: feature.properties.color};
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.description);
        }
    }).addTo(map);

Each feature layer created by it gets a `feature` property that links to the GeoJSON feature data the layer was created from (so that you can access its properties later).

### Constructor
Constructor
Usage
Description

`**L.GeoJSON**(
            <Object> _geojson?_,
            <[GeoJSON options][96]> _options?_ )
`
`new L.GeoJSON(…)`
`L.geoJson(…)`
Creates a GeoJSON layer. Optionally accepts an object in [GeoJSON format][95] to display on the map (you can alternatively add it later with `addData` method) and an options object.

### Options
Option
Description

`**pointToLayer**(
            <GeoJSON> _featureData_,
            <[LatLng][28]> _latlng_ )
`
Function that will be used for creating layers for GeoJSON points (if not specified, simple markers will be created).

`**style**(
            <GeoJSON> _featureData_ )
`
Function that will be used to get style options for vector layers created for GeoJSON features.

`**onEachFeature**(
            <GeoJSON> _featureData_,
            <[ILayer][52]> _layer_ )
`
Function that will be called on each created feature layer. Useful for attaching events and popups to features.

`**filter**(
            <GeoJSON> _featureData_,
            <[ILayer][52]> _layer_ )
`
Function that will be used to decide whether to show a feature or not.

### Methods
Method
Returns
Description

`**addData**(
            <GeoJSON> _data_ )
`
`Boolean`
Adds a GeoJSON object to the layer.

`**setStyle**(
            <Function> _[style][97]_ )
`
`this`
Changes styles of GeoJSON vector layers with the given style function.

`**resetStyle**(
            <[Path][17]> _layer_ )
`
`this`
Resets the the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.

### Static methods
Method
Returns
Description

`**geometryToLayer**(
            <GeoJSON> _featureData_,
            <[Function][98]> _pointToLayer?_ )
`
`[ILayer][52]`
Creates a layer from a given GeoJSON feature.

`**coordsToLatlng**(
            <Array> _coords_,
            <Boolean> _reverse?_ )
`
`[LatLng][28]`
Creates a LatLng object from an array of 2 numbers (latitude, longitude) used in GeoJSON for points. If `reverse` is set to `true`, the numbers will be interpreted as (longitude, latitude).

`**coordsToLatlngs**(
            <Array> _coords_,
            <Number> _levelsDeep?_,
            <Boolean> _reverse?_ )
`
`Array`
Creates a multidimensional array of LatLng objects from a GeoJSON coordinates array. `levelsDeep` specifies the nesting level (0 is for an array of points, 1 for an array of arrays of points, etc., 0 by default). If `reverse` is set to `true`, the numbers will be interpreted as (longitude, latitude).

