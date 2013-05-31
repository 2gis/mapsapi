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


### События

Можно подписать на события используя [эти методы][39].

<table>
    <tr>
        <th>События</th>
        <th>Данные</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>click</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается при клике на карту.</td>
    </tr>
    <tr>
        <td><code><b>dblclick</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается при двойном клике на карту.</td>
    </tr>
    <tr>
        <td><code><b>mousedown</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается при нажатии кнопки мыши над областью карты.</td>
    </tr>
    <tr>
        <td><code><b>mouseup</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается когда пользователь отпускает кнопку мыши над областью карты.</td>
    </tr>
    <tr>
        <td><code><b>mouseover</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается когда курсор мыши входит в область карты.</td>
    </tr>
    <tr>
        <td><code><b>mouseout</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается когда курсор мыши покилает область карты.</td>
    </tr>
    <tr>
        <td><code><b>mousemove</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается когда курсор мыши передвигается над картой.</td>
    </tr>
    <tr>
        <td><code><b>contextmenu</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается при нажатии правой кнопкой мыши на карте, если лиснер установлен, предотвращает появление стандартного контекстного меню браузера.</td>
    </tr>
    <tr>
        <td><code><b>focus</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается при установлении фокуса на карту (с помощью tab или кликнув/потянув ее).</td>
    </tr>
    <tr>
        <td><code><b>blur</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается при потере фокуса картой.</td>
    </tr>
    <tr>
        <td><code><b>preclick</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается перед кликом мышки на карте (полезно, если нужно что-то выполнить до вызова обработчика клика).</td>
    </tr>
    <tr>
        <td><code><b>load</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызыватся когда карта была инициализированна (когда впервые были установлены ее центр и уровень зума).</td>
    </tr>
    <tr id="map-viewreset">
        <td><code><b>viewreset</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается когда нужно перерисовать контент карты (обычно при зуме или загрузке).</td>
    </tr>
    <tr>
        <td><code><b>movestart</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается при начале изменения области просмотра карты (т.е. когда пользователь начинает двигать карту).</td>
    </tr>
    <tr>
        <td><code><b>move</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается во время любого передвижения карты.</td>
    </tr>
    <tr id="map-moveend">
        <td><code><b>moveend</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается при окончании передвижения краты (т.е. когда пользователь прекращает двигать карту).</td>
    </tr>
    <tr>
        <td><code><b>dragstart</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается когда пользователь начинает двигать карту.</td>
    </tr>
    <tr>
        <td><code><b>drag</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается когда пользователь двигает карту.</td>
    </tr>
    <tr>
        <td><code><b>dragend</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается когда пользователь прекращает двигать карту.</td>
    </tr>
    <tr>
        <td><code><b>zoomstart</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается в начале изменения зума (т.е. перед анимацией зума).</td>
    </tr>
    <tr>
        <td><code><b>zoomend</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается после изменения зума.</td>
    </tr>
    <tr>
        <td><code><b>autopanstart</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается при автоматическом сдвиге карты после появления балуна.</td>
    </tr>
    <tr>
        <td><code><b>layeradd</b></code></td>
        <td><code><a href="#layer-event">LayerEvent</a></code>
        <td>Вызывается при добавлении нового слоя на карту.</td>
    </tr>
    <tr>
        <td><code><b>layerremove</b></code></td>
        <td><code><a href="#layer-event">LayerEvent</a></code>
        <td>Вызывается при удалиении слоя с карты.</td>
    </tr>
    <tr>
        <td><code><b>baselayerchange</b></code></td>
        <td><code><a href="#layer-event">LayerEvent</a></code>
        <td>Вызывается когда исходный слой изменяется при помощи <a href="#control-layers">layer control</a>.</td>
    </tr>
    <tr>
        <td><code><b>overlayadd</b></code></td>
        <td><code><a href="#layer-event">LayerEvent</a></code>
        <td>Вызывается когда overlay выбран при помощи <a href="#control-layers">layer control</a>.</td>
    </tr>
    <tr>
        <td><code><b>overlayremove</b></code></td>
        <td><code><a href="#layer-event">LayerEvent</a></code>
        <td>Вызывается когда overlay отключен при помощи <a href="#control-layers">layer control</a>.</td>
    </tr>
    <tr>
        <td><code><b>locationfound</b></code></td>
        <td><code><a href="#location-event">LocationEvent</a></code>
        <td>Вызываеся если геолокация прошла успешно (используется метод <a href="#map-locate">locate</a>).</td>
    </tr>
    <tr>
        <td><code><b>locationerror</b></code></td>
        <td><code><a href="#error-event">ErrorEvent</a></code>
        <td>Вызывается при возникновении ошибок во время геолокации.</td>
    </tr>
    <tr>
        <td><code><b>popupopen</b></code></td>
        <td><code><a href="#popup-event">PopupEvent</a></code>
        <td>Вызывается при открытии балуна (используется метод <code>openPopup</code>).</td>
    </tr>
    <tr>
        <td><code><b>popupclose</b></code></td>
        <td><code><a href="#popup-event">PopupEvent</a></code>
        <td>Вызывается при закрытии балуна (используется метод <code>closePopup</code>).</td>
    </tr>
</table>

### Методы управления состоянием карты
<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>setView</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>center</i>,</nobr>
            <nobr>&lt;Number&gt; <i>zoom</i>,</nobr>
            <nobr>&lt;Boolean&gt; <i>forceReset?</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Устнавливает область просмотра карты (географический центр и зум). Если <code>forceReset</code> установлен в <code><span class="literal">true</span></code>, карта перегружается при движении и зуме (по умолчанию <code><span class="literal">false</span></code>).</td>
    </tr>
    <tr>
        <td><code><b>setZoom</b>(
            <nobr>&lt;Number&gt; <i>zoom</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Устанавливает уровень зума.</td>
    </tr>
    <tr>
        <td><code><b>zoomIn</b>( <nobr>&lt;Number&gt; delta? )</nobr></code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Увеличивает зум карты на величину <code>delta</code> (по умолчанию <code><span class="number">1</span></code>).</td>
    </tr>
    <tr>
        <td><code><b>zoomOut</b>( <nobr>&lt;Number&gt; delta? )</nobr></code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Уменьшает зум карты на величину <code>delta</code> (по умолчанию <code><span class="number">1</span></code>).</td>
    </tr>
    <tr id="map-fitbounds">
        <td><code><b>fitBounds</b>(
            <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Устанавливает область просмотра карты так, чтобы та содержала заданные границы в максимально возможным уровнем зума.</td>
    </tr>
    <tr id="map-fitworld">
        <td><code><b>fitWorld</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Устанавливает область просмотра карты так, чтобы та отображала весь мир в максимально возможном зуме.</td>
    </tr>
    <tr>
        <td><code><b>panTo</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Передвигает карты на заданный центр. Передвижение анимируется, если заданный центр находится на расстоянии не более одного экрана от текущего.</td>
    </tr>
    <tr id="map-paninsidebounds">
        <td><code><b>panInsideBounds</b>(
            <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Сдвигает карту в ближайшую область просмотра, лежащую в пределах заданных границ.</td>
    </tr>
    <tr>
        <td><code><b>panBy</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Сдвинуть карту на заданное колличетво пикселей (анимировано).</td>
    </tr>
    <tr>
        <td><code><b>invalidateSize</b>(
            <nobr>&lt;Boolean&gt; <i>animate?</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Проверяет изменился ли размер контейнера карты, если да, карта обновляется. Нужно вызвать этот метод, если размер контейнера изменился динамически. Если параментр <code>animate</code> установлен <code><span class="literal">true</span></code>, обновление карты анимируется.</td>
    </tr>
    <tr id="map-setmaxbounds">
        <td><code><b>setMaxBounds</b>(
            <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Ограничивает область обзора карты заданными границами. (смотри опцию <a href="#map-maxbounds">map maxBounds</a>).</td>
    </tr>
    <tr id="map-locate">
        <td><code><b>locate</b>(
            <nobr>&lt;<a href="#map-locate-options">Locate options</a>&gt; <i>options?</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Пытается определить местоположения пользователя используя <a href="https://en.wikipedia.org/wiki/W3C_Geolocation_API">Geolocation API</a>. В случае успеха вызывается событие <code>locationfound</code> с данными о местонахождении, в случае ошибки <code>locationerror</code>, и опционально устанавливает область просмотра карты согласно местоположению пользователя (или просмотр карты мира, если возникла ошибка геолокации). Для деталей смотри <a href="#map-locate-options">Locate options</a>.</td>
    </tr>
    <tr>
        <td><code><b>stopLocate</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Останавливает отслеживание локации, предварительно инициированное <code><b>map.locate</b>({watch: true})</code>.</td>
    </tr>
</table>

### Методы чтения состояния карты
<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>getCenter</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает географический центр области обзора карты.</td>
    </tr>
    <tr>
        <td><code><b>getZoom</b>()</code></td>
        <td><code>Number</code></td>
        <td>Возвращает текущий зум карты.</td>
    </tr>
    <tr>
        <td><code><b>getMinZoom</b>()</code></td>
        <td><code>Number</code></td>
        <td>Возвращает минимальный уровень зума карты.</td>
    </tr>
    <tr>
        <td><code><b>getMaxZoom</b>()</code></td>
        <td><code>Number</code></td>
        <td>Возвращает максимальный уровень зума карты.</td>
    </tr>
    <tr>
        <td><code><b>getBounds</b>()</code></td>
        <td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
        <td>Возвращает <a href="#latlngbounds">LatLngBounds</a> текущей области обзора карты.</td>
    </tr>
    <tr>
        <td><code><b>getBoundsZoom</b>(
            <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i>,</nobr>
            <nobr>&lt;Boolean&gt; <i>inside?</i> )</nobr>
        </code></td>

        <td><code>Number</code></td>

        <td>Возвращает максимальный уровень зума при котором заданные границы полностью входят в область просмотра карты. Если опция <code>inside</code> установлена в  <code><span class="literal">true</span></code>, метод возвращает минимальный уровень зума с теми же условиями.</td>
    </tr>
    <tr>
        <td><code><b>getSize</b>()</code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает текущий размер контейнера карты.</td>
    </tr>
    <tr>
        <td><code><b>getPixelBounds</b>()</code></td>
        <td><code>Bounds</code></td>
        <td>Возвращает проекцию координат текущей области просмотра карты.</td>
    </tr>
    <tr>
        <td><code><b>getPixelOrigin</b>()</code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает проекцию координат левой верхней точки слоя карты.</td>
    </tr>
</table>

### Методы Слоев и Элементов упаравления
<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr id="map-addlayer">
        <td><code><b>addLayer</b>(
            <nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i>,</nobr>
            <nobr>&lt;Boolean&gt; <i>insertAtTheBottom?</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Добавляет переданный слой на карту. Если опция <code>insertAtTheBottom</code> установлена в <code><span class="literal">true</span></code>, слой добавляется поверх остальных.</td>
    </tr>
    <tr>
        <td><code><b>removeLayer</b>(
            <nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Удаляет переданные слои с карты.</td>
    </tr>
    <tr>
        <td><code><b>hasLayer</b>(
            <nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code><span class="literal">true</span></code> если переданный слой в данный момент добавлен на карту.</td>
    </tr>

    <tr id="map-openpopup">
        <td><code><b>openPopup</b>(
            <nobr>&lt;<a href="#popup">Popup</a>&gt; <i>popup</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Показывает указанный балун, предварительно спрятав все открытые. (только один балун может быть открыт в определнный момент времени, по причинам юзабилити).</td>
    </tr>
    <tr id="map-closepopup">
        <td><code><b>closePopup</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Закрывает балун, открытый с помощью <a href="#map-openpopup">openPopup</a>.</td>
    </tr>
    <tr id="map-addcontrol">
        <td><code><b>addControl</b>(
            <nobr>&lt;<a href="#icontrol">IControl</a>&gt; <i>control</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Добавляет переданный элемент управления на карту.</td>
    </tr>
    <tr>
        <td><code><b>removeControl</b>(
            <nobr>&lt;<a href="#icontrol">IControl</a>&gt; <i>control</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Удаляет элемент управления с карты.</td>
    </tr>
</table>

### Методы преобразования
<table>
    <tr>
        <th class="width200">Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>latLngToLayerPoint</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает точку на карте которая соотвествует переданным координатам (полезно при размещении overlays на карте).</td>
    </tr>
    <tr>
        <td><code><b>layerPointToLatLng</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>

        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает герграфические координаты переданной точки карты.</td>
    </tr>
    <tr>
        <td><code><b>containerPointToLayerPoint</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Конвертирует point контейнера карты в point слоя карты.</td>
    </tr>
    <tr>
        <td><code><b>layerPointToContainerPoint</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Конвертирует point слоя карты в point контейнера карты.</td>
    </tr>
    <tr>
        <td><code><b>latLngToContainerPoint</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает point контейнера карты соотвествующей географическим координатам.</td>
    </tr>
    <tr>
        <td><code><b>containerPointToLatLng</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>

        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает географические координаты переданной point контейнера.</td>
    </tr>
    <tr>
        <td><code><b>project</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i>,</nobr>
            <nobr>&lt;Number&gt; <i>zoom?</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Проецирует переданные географические координаты в абсолютное значение координат в пикселях для переданного уровня зума (текущий уровень зума используется по умолчанию).</td>
    </tr>
    <tr>
        <td><code><b>unproject</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i>,</nobr>
            <nobr>&lt;Number&gt; <i>zoom?</i> )</nobr>
        </code></td>

        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Проецирует переданное абсолютное значение координат в пикселях в географические координаты для переданного уровня зума (текущий уровень зума используется по умолчанию).</td>
    </tr>
    <tr>
        <td><code><b>mouseEventToContainerPoint</b>(
            <nobr>&lt;MouseEvent&gt; <i>event</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает пиксельные координаты клика мыши (относительно левого верхнего угла карты), переданного объектом event.</td>
    </tr>
    <tr>
        <td><code><b>mouseEventToLayerPoint</b>(
            <nobr>&lt;MouseEvent&gt; <i>event</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает пиксельные координаты клика мышью по слою, переданного объектом event.
    </tr>
    <tr>
        <td><code><b>mouseEventToLatLng</b>(
            <nobr>&lt;MouseEvent&gt; <i>event</i> )</nobr>
        </code></td>

        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает географические координаты точки клика мышью, переданного объектом event.</td>
    </tr>
</table>

### Другие методы
<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>getContainer</b>()</code></td>
        <td><code>HTMLElement</code></td>
        <td>Возвращает контейнер элемента карты.</td>
    </tr>
    <tr id="map-getpanes">
        <td><code><b>getPanes</b>()</code></td>
        <td><code><a href="#map-panes">MapPanes</a></code></td>
        <td>Возвращает объект с  map panes (to render overlays in).</td>
    </tr>
    <tr id="map-whenready">
        <td><code><b>whenReady</b>(
            <nobr>&lt;Function&gt; <i>fn</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr></code></td>
        <td><code>this</code></td>
        <td>Выполняет переданный колбек после того как карта инициализировалась или сразу, если она была инициализирована раньше. Опцинально можно передать контекст исполнения.</td>
    </tr>
</table>

### Опции локации
<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>watch</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если <code><span class="literal">true</span></code>, постоянно отслеживает изменения локации (вместо определения локации однажны) используя W3C метод <code>watchPosition</code>. Можно остановить отслеживание вызвав метод <code><b>map.stopLocate</b>()</code>.</td>
    </tr>
    <tr>
        <td><code><b>setView</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если <code><span class="literal">true</span></code>, автоматически устанавливает область просмотра карты в точку локации пользователя, в соотвествии с точностью определения. В случае ошибки поиска, отображаетcя карта мира.</td>
    </tr>
    <tr>
        <td><code><b>maxZoom</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">Infinity</span></code></td>
        <td>Задает максимальный зум, в случае автоматического перемещения карты (если включена опция `setView`).</td>
    </tr>
    <tr>
        <td><code><b>timeout</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">10000</span></code></td>
        <td>Колличество миллисекунд ожидания ответа геолокации перед тем как вызовется событие <code>locationerror</code>.</td>
    </tr>
    <tr>
        <td><code><b>maximumAge</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">0</span></code></td>
        <td>Максимальный "возраст" данных локации. Если с момента последнего поиска прошло меньше времени, чем указанно в этой опции, данные вернутся из кеша.</td>
    </tr>
    <tr>
        <td><code><b>enableHighAccuracy</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Включает high accuracy, смотри <a href="http://dev.w3.org/geo/api/spec-source.html#high-accuracy">описание в W3C спецификации</a>.</td>
    </tr>
</table>

### Свойства

Свойства карты включают в себя обработчиков взаимодействия, которые позволяют конролировать интерактивное поведение, подключение и отключение опредленных возможностей карты такие как зум, touch-события (смотри методы [IHandler][51]). Например:

    map.doubleClickZoom.disable();

Вы также можете получить доступ к дефолтным элементам управления карты, таким как копирайт, через свойства карты:

    map.attributionControl.addAttribution("Earthquake data &copy; GeoNames");

<table>
    <tr>
        <th class="minwidth">Свойство</th>
        <th class="minwidth">Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>dragging</b></code></td>
        <td><a href="#ihandler"><code>IHandler</code></a></td>
        <td>Обработчик драга карты (мышкой и touch).</td>
    </tr>
    <tr>
        <td><code><b>touchZoom</b></code></td>
        <td><a href="#ihandler"><code>IHandler</code></a></td>
        <td>Обработчик touch-зума.</td>
    </tr>
    <tr>
        <td><code><b>doubleClickZoom</b></code></td>
        <td><a href="#ihandler"><code>IHandler</code></a></td>
        <td>Обработчик зума по двойному клику.</td>
    </tr>
    <tr>
        <td><code><b>scrollWheelZoom</b></code></td>
        <td><a href="#ihandler"><code>IHandler</code></a></td>
        <td>Обработчик зума по скролу.</td>
    </tr>
    <tr>
        <td><code><b>boxZoom</b></code></td>
        <td><a href="#ihandler"><code>IHandler</code></a></td>
        <td>Обработчик вox-зума (shift+выделение мышкой).</td>
    </tr>
    <tr>
        <td><code><b>keyboard</b></code></td>
        <td><a href="#ihandler"><code>IHandler</code></a></td>
        <td>Обработчк навигации клавиатурой.</td>
    </tr>
    <tr>
        <td><code><b>zoomControl</b></code></td>
        <td><a href="#control-zoom"><code>Control.Zoom</code></a></td>
        <td>Элемент управления - зум.</td>
    </tr>
    <tr>
        <td><code><b>attributionControl</b></code></td>
        <td><a href="#control-attribution"><code>Control.Attribution</code></a></td>
        <td>Элемент управления - копирайт.</td>
    </tr>
</table>

### Панели карты

Объект (возвращаемый [map.getPanes][74]) содержит различные панели карты, которые можно использовать для своих слоев. Основное отличие в параметре zIndex, определяющем очередь наложения.
<table>
    <tr>
        <th class="width100">Свойство</th>
        <th class="width100">Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>mapPane</b></code></td>
        <td><code>HTMLElement</code></td>
        <td>Панель, которая содержит все остальные панели карты.</td>
    </tr>
    <tr>
        <td><code><b>tilePane</b></code></td>
        <td><code>HTMLElement</code></td>
        <td>Панель для слоя тайлов.</td>
    </tr>
    <tr>
        <td><code><b>objectsPane</b></code></td>
        <td><code>HTMLElement</code></td>
        <td>Панель, которая содержит все панели, кроме тайловой.</td>
    </tr>
    <tr>
        <td><code><b>shadowPane</b></code></td>
        <td><code>HTMLElement</code></td>
        <td>Панель для наложения теней.</td>
    </tr>
    <tr>
        <td><code><b>overlayPane</b></code></td>
        <td><code>HTMLElement</code></td>
        <td>Панель для наложения геометрий, полилайнов и полигонов.</td>
    </tr>
    <tr>
        <td><code><b>markerPane</b></code></td>
        <td><code>HTMLElement</code></td>
        <td>Панель для иконок маркеров.</td>
    </tr>
    <tr>
        <td><code><b>popupPane</b></code></td>
        <td><code>HTMLElement</code></td>
        <td>Панель для балунов.</td>
    </tr>
</table>

## L.Marker

Используется для добавления маркеров на карту.

    L.marker([50.5, 30.5]).addTo(map);

### Конструктор
<table>
    <tr>
        <th class="width200">Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Marker</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i>,</nobr>
            <nobr>&lt;<a href="#marker-options">Marker options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td class="factory-usage">
            <code>L.marker(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает объект Marker по переданным географическим координатам и необязательному объекту опций.</td>
    </tr>
</table>


### Опции
<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>icon</b></code></td>
        <td><code><a href="#icon">L.Icon</a></code></td>
        <td>*</td>
        <td>Класс Icon используется для отрисовки маркера. Смотри подробное описание настройки иконки - <a href="#icon">Icon documentation</a>. По умолчанию используется <code>new L.Icon.Default()</code>.</td>
    </tr>
    <tr>
        <td><code><b>clickable</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">true</span></code></td>
        <td>Если значение <code><span class="literal">false</span></code>, обработчик клика по маркеру не вызывается.</td>
    </tr>
    <tr>
        <td><code><b>draggable</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Возможно ли перетаскивать маркер по карте.</td>
    </tr>
    <tr>
        <td><code><b>title</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">''</span></code></td>
        <td>Текст для отображения тултипа при наведении курсора на маркер (по умолчанию не ототбражается).</td>
    </tr>
    <tr id="marker-zindexoffset">
        <td><code><b>zIndexOffset</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">0</span></code></td>
        <td>По умолчанию, изображению маркера свойство z-index устнавливается автоматически, исходя из его координат. Используйте эту опцию если хотите разместить маркер поверх всех остальных (или снизу), указав наивысшее значние (или нивысшее отрицательное, соответсвенно).</td>
    </tr>
    <tr>
        <td><code><b>opacity</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">1.0</span></code></td>
        <td>Прозрачность маркера.</td>
    </tr>
    <tr>
        <td><code><b>riseOnHover</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если значение <code><span class="literal">true</span></code>, маркер отобразится поверх остальных при наведении на него мышкой.</td>
    </tr>
    <tr>
        <td><code><b>riseOffset</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">250</span></code></td>
        <td>Позволяет задать шаг z-index при использовании <code>riseOnHover</code>.</td>
    </tr>
</table>

### События

Можно подписать на события используя [эти методы][39].
<table>
    <tr>
        <th class="width100">Событие</th>
        <th class="width100">Данные</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>click</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается по клику на маркере.</td>
    </tr>
    <tr>
        <td><code><b>dblclick</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается при двойном клике на маркере.</td>
    </tr>
    <tr>
        <td><code><b>mousedown</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается при нажатии кнопки мыши на маркере.</td>
    </tr>
    <tr>
        <td><code><b>mouseover</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается при наведении курсора мыши на маркер.</td>
    </tr>
    <tr>
        <td><code><b>mouseout</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается когда курсор мыши покидает область маркера.</td>
    </tr>
    <tr>
        <td><code><b>contextmenu</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается при нажатии правой кнопки мыши на маркере.</td>
    </tr>
    <tr>
        <td><code><b>dragstart</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается когда пользователь начинает тянуть маркер.</td>
    </tr>
    <tr>
        <td><code><b>drag</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается постоянно во время перетягивания маркера.</td>
    </tr>
    <tr>
        <td><code><b>dragend</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается когда пользователь прекращает перетягивание маркера.</td>
    </tr>
    <tr>
        <td><code><b>move</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается при передвижении маркера с помощью метода setLatLng.</td>
    </tr>
    <tr>
        <td><code><b>remove</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается при удалении маркера с карты.</td>
    </tr>
</table>

### Методы
<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>addTo</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Добавляет маркер на карту.</td>
    </tr>
    <tr>
        <td><code><b>getLatLng</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает текущие геокоординаты маркера.</td>
    </tr>
    <tr>
        <td><code><b>setLatLng</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Меняет координаты маркера на переданные.</td>
    </tr>
    <tr>
        <td><code><b>setIcon</b>(
            <nobr>&lt;<a href="#icon">Icon</a>&gt; <i>icon</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Меняет иконку маркера.</td>
    </tr>
    <tr>
        <td><code><b>setZIndexOffset</b>(
            <nobr>&lt;Number&gt; <i>offset</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Меняет свойство маркера <a href="#marker-zindexoffset">zIndex offset</a>.</td>
    </tr>
    <tr>
        <td><code><b>setOpacity</b>(
            <nobr>&lt;Number&gt; <i>opacity</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Меняет прозрачность маркера.</td>
    </tr>
    <tr>
        <td><code><b>update</b>()</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Обновляет позиционирование маркера, полезно в случае если <code>latLng</code> маркера были изменены напрямую.</td>
    </tr>
    <tr id="marker-bindpopup">
        <td><code><b>bindPopup</b>(
            <nobr>&lt;String&gt; <i>htmlContent</i>,</nobr>
            <nobr>&lt;<a href="#popup-options">Popup options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Прикрепляет к маркеру балун, с определенным HTML содержимым. Балун отобразится при клике на маркер.</td>
    </tr>
    <tr id="marker-unbindpopup">
        <td><code><b>unbindPopup</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Отвязывает балун от маркера.</td>
    </tr>
    <tr id="marker-openpopup">
        <td><code><b>openPopup</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Открывает балун, предварительно присоединенный с помощью метода <a href="#marker-bindpopup">bindPopup</a>.</td>
    </tr>
    <tr id="marker-closepopup">
        <td><code><b>closePopup</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Закрвает балун, если тот был открыт.</td>
    </tr>
</table>

### Обработчики взаимодействия

Свойства маокера включают в себя обработчики взаимодействия, которые позволяют конролировать интерактивное поведение, подключение и отключение опредленных возможностей таких как драг (смотри методы [IHandler][51]). Например:

    marker.dragging.disable();

<table>
    <tr>
        <th class="width100">Property</th>
        <th class="width100">Type</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>dragging</td>
        <td><a href="#ihandler"><code>IHandler</code></a></td>
        <td>Обработчик драга маркера.</td>
    </tr>
</table>


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

