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

Используется для отображения балунов в определенных местах карты. Используйте [Map\#openPopup][72] для ототбражения балунов, одновременно открытым может быть только один балун, или [Map\#addLayer][81] для отображения любого колличества балунов.

### Пример использования

Добавить отображения балуна по клику на маркер очень легко:

    marker.bindPopup(popupContent).openPopup();

У дополнительных слоев, таких как полилайны также есть метод `bindPopup`. Вот более сложный пример ототбражения балуна:

    var popup = L.popup()
        .setLatLng(latlng)
        .setContent('<p>Hello world!<br />This is a nice popup.</p>')
        .openOn(map);

### Конструктор
<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Popup</b>(
            <nobr>&lt;<a href="#popup-options">Popup options</a>&gt; <i>options?</i>,</nobr>
            <nobr>&lt;object&gt; <i>source?</i> )</nobr>
        </code></td>

        <td class="factory-usage">
            <code>L.popup(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает объект типа Popup по переданным объету опций, описывающему внешний вид и расположение балуна и объекту указывающих привязку балуна к элементу карты.</td>
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
        <td><code><b>maxWidth</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">300</span></code></td>
        <td>Максимальная ширина балуна.</td>
    </tr>
    <tr>
        <td><code><b>minWidth</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">50</span></code></td>
        <td>Минимальная ширина балуна.</td>
    </tr>
    <tr>
        <td><code><b>maxHeight</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="literal">null</span></code></td>
        <td>Если значение установлено, создается контейнер указанной высоты со скроллом, в случае если контент балуна превышает заданную высоту.</td>
    </tr>
    <tr>
        <td><code><b>autoPan</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">true</span></code></td>
        <td>Установите значение в <code><span class="literal">false</span></code> если не хотите чтобы карта автоматически сдвигалась для полного отображения балуна.</td>
    </tr>
    <tr>
        <td><code><b>closeButton</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">true</span></code></td>
        <td>Отвечает за отображение кнопки закрытия балуна.</td>
    </tr>
    <tr>
        <td><code><b>offset</b></code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td><code><nobr>Point(<span class="number">0</span>, <span class="number">6</span>)</nobr>
        </code></td>
        <td>Устанавливает отступ позиции балуна. Полезно для контроля ножки балуна при показе на определенных слоях.</td>
    </tr>
    <tr>
        <td><code><b>autoPanPadding</b></code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td><code><nobr>Point(<span class="number">5</span>, <span class="number">5</span>)</nobr>
        </code></td>
        <td>Задает расстояние от края балуна до границы просмотра карты при автосдвиге.</td>
    </tr>
    <tr>
        <td><code><b>zoomAnimation</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">true</span></code></td>
        <td>Указывает анимировать ли балун при зуме. Отключите, если есть проблемы с отображением Flash контента внутри балуна.</td>
    </tr>
</table>

### Методы
<table>
    <tr>
        <th class="width250">Метод</th>
        <th class="minwidth">Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>addTo</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Добавляет балун на карту.</td>
    </tr>
    <tr>
        <td><code><b>openOn</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Добавляет балун на карту, предварительно закрыв остальные. Аналогично <code>map.openPopup(popup)</code>.</td>
    </tr>
    <tr>
        <td><code><b>setLatLng</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Устанавливает географические координаты точки открытия балуна.</td>
    </tr>
    <tr>
        <td><code><b>setContent</b>(
            <nobr>&lt;String&gt; <i>htmlContent</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Задает HTML контент балуна.</td>
    </tr>
</table>

## L.TileLayer

Используется для загрузки и ототбражения тайлового слоя на карте, реализует интерфейс [ILayer][52].

### Примеры использования

    L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
        key: 'API-key',
        styleId: 997
    }).addTo(map);

### Конструктор
<table>
    <tr>
        <th class="width250">Constructor</th>
        <th>Usage</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><code><b>L.TileLayer</b>(
            <nobr>&lt;String&gt; <i><a href="#url-template">urlTemplate</a></i>,</nobr>
            <nobr>&lt;<a href="#tilelayer-options">TileLayer options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td class="factory-usage">
            <code>L.tileLayer(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает объект слоя тайлов по переданному <a href="#url-template">URL шаблону</a> опциональному объекту настроек.</td>
    </tr>
</table>


### URL шаблон

Строка следующего вида:

    'http://{s}.somedomain.com/blabla/{z}/{x}/{y}.png'

`{s}` один из доступных субдоменов (используется поочередно, чтобы браузер загружал ресурсы паралельно, согласно ограничению доменов; значения указаны в опциях; `a`, `b` или `c` по умочанию), `{z}` --- уровень зума, `{x}` и `{y}` --- координаты тайлов.

Вы можете использовать собственные ключи в шаблонах, которые будут доступны из TileLayer options, например так:

    L.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});

### Опции
<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>minZoom</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">0</span></code></td>
        <td>Минимальный уровень зума.</td>
    </tr>
    <tr>
        <td><code><b>maxZoom</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">18</span></code></td>
        <td>Максимальный уровень зума.</td>
    </tr>
    <tr>
        <td><code><b>tileSize</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">256</span></code></td>
        <td>Размер тайла (ширина и высота в пикселях, предполагается что тайл квадратный).</td>
    </tr>
    <tr>
        <td><code><b>subdomains</b></code></td>
        <td><code>String</code> or <code>String[]</code></td>
        <td><code><span class="string">'abc'</span></code></td>
        <td>Субдомены тайлового сервиса. Могут передаваться одной строкой (где каждая буква имя субдомена) или массивом строк.</td>
    </tr>
    <tr>
        <td><code><b>errorTileUrl</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">''</span></code></td>
        <td>URL к тайл изображению, которое отображается в случае ошибки загрузки тайла.</td>
    </tr>
    <tr>
        <td><code><b>attribution</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">''</span></code></td>
        <td>Здесь указывается копирайт-информация.</td>
    </tr>
    <tr>
        <td><code><b>tms</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если установлено значение <code><span class="literal">true</span></code>, делает инверсию нумерации оси Y для тайлов (включите для TMS сервисов).</td>
    </tr>
    <tr>
        <td><code><b>continuousWorld</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если установлено значение <code><span class="literal">true</span></code>, координаты тайлов не будут "заворачиваться" по ширине мира (-180 до 180 широты) или высоте (-90 дл 90). Полезно, если вы используете Leaflet собственных карт, не отображающих реальный мир (т.е. игры, помещения или фото карты).</td>
    </tr>
    <tr>
        <td><code><b>noWrap</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если установлено значение <code><span class="literal">true</span></code>, тайлы не будут загружаться за пределами ширины мира (-180 до 180 широты).</td>
    </tr>
    <tr>
        <td><code><b>zoomOffset</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">0</span></code></td>
        <td>Уровень зума указанный в URL тайлов будет смещен на это переданное значение.</td>
    </tr>
    <tr>
        <td><code><b>zoomReverse</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если установлено значение <code><span class="literal">true</span></code>, уровень зума указанный в URL тайла будет реверсирован (<code>maxZoom - zoom</code> вместо <code>zoom</code>)</td>
    </tr>
    <tr>
        <td><code><b>opacity</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">1.0</span></code></td>
        <td>Прозрачность слоя тайлов.</td>
    </tr>
    <tr>
        <td><code><b>zIndex</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="literal">null</span></code></td>
        <td>Указывает zIndex тайлового слоя. Не установлен по умолчанию.</td>
    </tr>
    <tr>
        <td><code><b>unloadInvisibleTiles</b></code></td>
        <td><code>Boolean</code></td>
        <td>depends</td>
        <td>Если установлено значение <code><span class="literal">true</span></code>, все тайлы которые выходят за область видимости после любого перемешения карты удаляются (для лучшей производительности). <code><span class="literal">true</span></code> по умолчанию для мобильного WebKit, в остальных случаях <code><span class="literal">false</span></code>.</td>
    </tr>
    <tr>
        <td><code><b>updateWhenIdle</b></code></td>
        <td><code>Boolean</code></td>
        <td>depends</td>
        <td>Если установлено значение <code><span class="literal">false</span></code>, новые тайлы подгружаются во время перетягивания карты, иначе только по завершению перетягивания (для лучшей производительности). <code><span class="literal">true</span></code> по умолчанию для мобильного WebKit, в остальных случаях <code><span class="literal">false</span></code>.</td>
    </tr>
    <tr>
        <td><code><b>detectRetina</b></code></td>
        <td><code><code>Boolean</code></code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если установлено значение <code><span class="literal">true</span></code> и у пользователя retina дисплей, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.</td>
    </tr>
    <tr>
        <td><code><b>reuseTiles</b></code></td>
        <td><code><code>Boolean</code></code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если установлено значение <code><span class="literal">true</span></code>, все тайлы которые невидны после перемешения карты добавляется в очередь переиспользования, из которой они будут взяты, если опять попадут в область видимости. В теории это сокращает объем используемой памяти.</td>
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
        <td><code><b>loading</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается когда тайловый слой начинает загрузку тайлов.</td>
    </tr>
    <tr>
        <td><code><b>load</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается когда тайловый слой завершил загрузку всех видимых тайлов.</td>
    </tr>
    <tr>
        <td><code><b>tileload</b></code></td>
        <td><code><a href="#tile-event">Event</a></code>
        <td>Вызывается когда тайл загружается.</td>
    </tr>
    <tr>
        <td><code><b>tileunload</b></code></td>
        <td><code><a href="#tile-event">Event</a></code>
        <td>Вызывается при удалении тайла (т.е. при включенном режиме <code>unloadInvisibleTiles</code>).</td>
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
        <td>Добавляет слой на карту.</td>
    </tr>
    <tr>
        <td><code><b>bringToFront</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Отображает тайловый слой поверх всех остальных слоев.</td>
    </tr>
    <tr>
        <td><code><b>bringToBack</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Отображает тайловый слой снизу остальных слоев.</td>
    </tr>
    <tr>
        <td><code><b>setOpacity</b>(
            <nobr>&lt;Number&gt; <i>opacity</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Изменяет прозрачность тайлового слоя.</td>
    </tr>
    <tr>
        <td><code><b>setZIndex</b>(
            <nobr>&lt;Number&gt; <i>zIndex</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Устанавливает z-index тайлового слоя.</td>
    </tr>
    <tr>
        <td><code><b>redraw</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Очищает все текущие тайлы и запрашивает новые.</td>
    </tr>
    <tr>
        <td><code><b>setUrl</b>(
            <nobr>&lt;String&gt; <i><a href="#url-template">urlTemplate</a></i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Обновляет URL темлейта и перерсовывает его.</td>
    </tr>
</table>

## L.TileLayer.WMS

Испльзуется для отображения WMS сервисов как тайловый слой карты. Расширяет [TileLayer][13].

### Usage example

    var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
        layers: 'nexrad-n0r-900913',
        format: 'image/png',
        transparent: true,
        attribution: "Weather data © 2012 IEM Nexrad"
    });

### Конструктор
<table>
    <tr>
        <th class="width250">Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.TileLayer.WMS</b>(
            <nobr>&lt;String&gt; <i>baseUrl</i></nobr>,
            <nobr>&lt;<a href="#tilelayer-wms-options">TileLayer.WMS options</a>&gt; <i>options</i> )</nobr>
        </code></td>

        <td class="factory-usage">
            <code>L.tileLayer.wms(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает объект WMS тайлового слоя по переданному URL WMS-сервиса и объекту опций.</td>
    </tr>
</table>


### Опции

Включает все опции [TileLayer options][83] и дополнительные:
<table>
    <tr>
        <th class="width100">Опция</th>
        <th class="width100">Тип</th>
        <th class="width100">По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>layers</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">''</span></code></td>
        <td><b>(обязательная)</b> Список WMS слоев которые необходимо отобразить, разделенных запятой.</td>
    </tr>
    <tr>
        <td><code><b>styles</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">''</span></code></td>
        <td>WMS стилей, разделенный запятой.</td>
    </tr>
    <tr>
        <td><code><b>format</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">'image/jpeg'</span></code></td>
        <td>Формат WMS-изображений (используйте <code><span class="string">'image/png'</span></code> для слоев с прозрачностью).</td>
    </tr>
    <tr>
        <td><code><b>transparent</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если установлено значение <code><span class="literal">true</span></code>, WMS сервис вернет изображения с прозрачностью.</td>
    </tr>
    <tr>
        <td><code><b>version</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">'1.1.1'</span></code></td>
        <td>Указывает какую версию WMS сервиса использовать.</td>
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
        <td><code><b>setParams</b>(
            <nobr>&lt;<a href="#tilelayer-wms-options">WMS parameters</a>&gt; <i>params</i></nobr>,
            <nobr>&lt;Boolean&gt; <i>noRedraw?</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Мержит объект с новыми параметрами и перезапрашивает тайлы текущего скрина(если только <code>noRedraw</code> не установлен в <code><span class="literal">true</span></code>).</td>
    </tr>
</table>

## L.TileLayer.Canvas

Используется для создания тайлового слоя на основе сanvas, при этом тайлы отрисовываются на стороне браузера. Расширяет [TileLayer][13].

### Пример использования

    var canvasTiles = L.tileLayer.canvas();

    canvasTiles.drawTile = function(canvas, tilePoint, zoom) {
        var ctx = canvas.getContext('2d');
        // отрисовываем тайл
    }

### Конструктор
<table>
    <tr>
        <th class="width200">Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.TileLayer.Canvas</b>(
            <nobr>&lt;<a href="#tilelayer-options">TileLayer options</a>&gt; <i>options?</i> )</nobr>
        </code></td>
        <td class="factory-usage">
            <code>L.tileLayer.canvas(<span class="comment">&hellip;</span>)</code>
        </td>
        <td>Создает объект Canvas-тайлового слоя по переданному объекту параметров (опциональный).</td>
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
        <td><code><b>async</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Указывает что тайлы должны отрисовываться асинхронно. Метод <a href="#tilelayer-canvas-tiledrawn">tileDrawn</a> должен быть вызван для каждого тайла после завершения отрисовки.</td>
    </tr>
</table>

### Методы
<table>
    <tr>
        <th class="width200">Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr id = "tilelayer-canvas-drawtile">
        <td><code><b>drawTile</b>(
            <nobr>&lt;HTMLCanvasElement&gt; <i>canvas</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>tilePoint</i></nobr>,
            <nobr>&lt;Number&gt; <i>zoom</i> )</nobr>
        </code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Чтобы отрисовать тайлы, нужно определить этот метод после создания инстанса объекта; <code>canvas</code> непосредственно элемент canvas на котором будут отрисовываться тайлы, <code>tilePoint</code> номера тайлов, и <code>zoom</code> текущий уровень зума.</td>
    </tr>
    <tr id="tilelayer-canvas-tiledrawn">
        <td><code><b>tileDrawn</b>( <nobr>&lt;HTMLCanvasElement&gt; <i>canvas</i></nobr> )</code></td>
        <td>-</td>
        <td>Если опция <code>async</code> задана, эту функцию нужно вызывать каждый раз после отрисовки тайла. <code>canvas</code> тот же элемент, что передается в <a href="#tilelayer-canvas-drawtile">drawTile</a>.</td>
    </tr>
</table>

## L.ImageOverlay

Используется для загрузки и отображаения одного конкретного изображения за границами карты, реализует интерфейс [ILayer][52].

### Пример использования

    var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
        imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];

    L.imageOverlay(imageUrl, imageBounds).addTo(map);

### Конструктор
<table>
    <tr>
        <th class="width250">Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.ImageOverlay</b>(
            <nobr>&lt;String&gt; <i>imageUrl</i></nobr>,
            <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
            <nobr>&lt;<a href="#imageoverlay-options">ImageOverlay options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td class="factory-usage">
            <code>L.imageOverlay(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает объект изображения дополнительного слоя по переданному URL адресу и географическим координатам к которым оно привязано.</td>
    </tr>
</table>

### Опции
<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th class="minwidth">По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>opacity</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">1.0</span></code></td>
        <td>Прозрачность допслоя.</td>
    </tr>
</table>

### Методы
<table>
    <tr>
        <th class="width250">Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>addTo</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Добавляет допслой на карту.</td>
    </tr>
    <tr>
        <td><code><b>setOpacity</b>(
            <nobr>&lt;Number&gt; <i>opacity</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Устанавливает прозрачность допслоя.</td>
    </tr>
    <tr>
        <td><code><b>bringToFront</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Позиционирует слой поверх остальных.</td>
    </tr>
    <tr>
        <td><code><b>bringToBack</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Позиционирует слой за всеми осталными.</td>
    </tr>
</table>

## L.Path

Абстрактный класс который содержит опции и константы доступные в векторных допслоях (Polygon, Polyline, Circle). Не используйте их напрямую.

### Опции
<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th class="minwidth">По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>stroke</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">true</span></code></td>
        <td>Рисовать ли границу фигуры. Установите значение в <code><span class="literal">false</span></code> чтобы отключить границы на полигонах или кругах.</td>
    </tr>
    <tr>
        <td><code><b>color</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">'#03f'</span></code></td>
        <td>Цвет границы.</td>
    </tr>
    <tr>
        <td><code><b>weight</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">5</span></code></td>
        <td>Ширина границы в пикселях.</td>
    </tr>
    <tr>
        <td><code><b>opacity</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">0.5</span></code></td>
        <td>Прозрачность границы.</td>
    </tr>
    <tr>
        <td><code><b>fill</b></code></td>
        <td><code>Boolean</code></td>
        <td>depends</td>
        <td>Заливать ли геометрии цветом. Установите значение в <code><span class="literal">false</span></code> чтобы отключить заполнение полигонов и кругов.</td>
    </tr>
    <tr>
        <td><code><b>fillColor</b></code></td>
        <td><code>String</code></td>
        <td>same as color</td>
        <td>Цвет заливки.</td>
    </tr>
    <tr>
        <td><code><b>fillOpacity</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">0.2</span></code></td>
        <td>Прозрачность заливки.</td>
    </tr>
    <tr>
        <td><code><b>dashArray</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="literal">null</span></code></td>
        <td>Строка определяющая <a href="https://developer.mozilla.org/en/SVG/Attribute/stroke-dasharray">шаблон границы</a>. Не работает на canvas слоях (т.е. Android 2).</td>
    </tr>
    <tr>
        <td><code><b>clickable</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">true</span></code></td>
        <td>Если установлено значение <code><span class="literal">false</span></code>, геометрия не обрабатывает события мышки.</td>
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
        <td>Вызывается при клике или тапе на объект.</td>
    </tr>
    <tr>
        <td><code><b>dblclick</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается при двойном клике или двойном тапе на объект.</td>
    </tr>
    <tr>
        <td><code><b>mousedown</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается когда пользователь нажимает кнопку мыши на объекте.</td>
    </tr>
    <tr>
        <td><code><b>mouseover</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается когда курсор мыши заходит в область объекта.</td>
    </tr>
    <tr>
        <td><code><b>mouseout</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается когда курсор мыши покидает область объекта.</td>
    </tr>
    <tr>
        <td><code><b>contextmenu</b></code></td>
        <td><code><a href="#mouse-event">MouseEvent</a></code>
        <td>Вызывается при нажатии правой кнопкой мыши на объекте, предотвращает появление стандартного контекстного меню браузера.</td>
    </tr>
    <tr>
        <td><code><b>add</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается при добавлении геометрии на карту.</td>
    </tr>
    <tr>
        <td><code><b>remove</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Вызывается при удалении геометрии с карты.</td>
    </tr>
</table>

### Методы
<table>
    <tr>
        <th class="width250">Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>addTo</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Добавляет слой на карту.</td>
    </tr>
    <tr id="path-bindpopup">
        <td><code><b>bindPopup</b>(
            <nobr>&lt;String&gt; <i>htmlContent</i></nobr>,
            <nobr>&lt;<a href="#popup-options">Popup options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Привязывает отображение балуна с HTML контентом по клику на геометрию.</td>
    </tr>
    <tr id="path-unbindpopup">
        <td><code><b>unbindPopup</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Отключает отображение балуна с HTML контентом по клику на геометрию.</td>
    </tr>
    <tr id="path-openpopup">
        <td><code><b>openPopup</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng?</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Открывате балун, предварительно привязанный методом <a href="#path-bindpopup">bindPopup</a> в указанной точке.</td>
    </tr>
    <tr id="path-closepopup">
        <td><code><b>closePopup</b>()</code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Закрывает балун, привязанный к геометрии, если тот был открыть.</td>
    </tr>
    <tr id="path-setstyle">
        <td><code><b>setStyle</b>(
            <nobr>&lt;<a href="#path-options">Path options</a>&gt; <i>object</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Изменяет внешний вид геометрии указанный в объекте<a href="#path-options">Path options</a>.</td>
    </tr>
    <tr id="path-getbounds">
        <td><code><b>getBounds</b>()</code></td>
        <td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
        <td>Возвращает LatLngBounds геометрии.</td>
    </tr>
    <tr>
        <td><code><b>bringToFront</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Позиционирует слой поверх всех остальных слоев.</td>
    </tr>
    <tr>
        <td><code><b>bringToBack</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Позиционирует слой за всеми остальными слоями.</td>
    </tr>
    <tr>
        <td><code><b>redraw</b>()</code></td>
        <td><code><span class="keyword">this</span></code></td>
        <td>Перерисовывает слой. Полезно в случае если вы изменили координаты которые описывают геометрию.</td>
    </tr>
</table>

### Статические свойства
<table>
    <tr>
        <th>Константа</th>
        <th>Тип</th>
        <th>Значение</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code>SVG</code></td>
        <td><code>Boolean</code></td>
        <td>depends</td>
        <td>True если для рендеринга вектора используется SVG (true в большинстве современных браузеров).</td>
    </tr>
    <tr>
        <td><code>VML</code></td>
        <td><code>Boolean</code></td>
        <td>depends</td>
        <td>True если для рендеринга вектора используется VML (IE 6-8).</td>
    </tr>
    <tr>
        <td><code>CANVAS</code></td>
        <td><code>Boolean</code></td>
        <td>depends</td>
        <td>True если для рендеринга вектора используется Canvas (Android 2). Можно прямо указать значение глобальной перменной <code>L_PREFER_CANVAS</code> равное <code><span class="literal">true</span></code> <em>перед/em> подключением Leaflet на страницу — иногда это помогает заметно улучшить производительность при отрисовке множества маркеров, но в данный момент существует баг, не позволящий улучшить производительность подобным способом.</td>
    </tr>
    <tr>
        <td><code>CLIP_PADDING</code></td>
        <td><code>Number</code></td>
        <td><nobr><code><span class="number">0.5</span></code> for SVG</nobr><br /><nobr><code><span class="number">0.02</span></code> for VML</nobr></td>
        <td>Указывает насколько сильно расширять clip-область вокруг области просмотра карты. Маленькие значения означают что вы увидите обрезанные геометрии при перетягивании, большие увеличат скорость отрисовки.</td>
    </tr>
</table>

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

