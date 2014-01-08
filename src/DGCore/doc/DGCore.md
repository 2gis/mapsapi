## Loader

Чтобы быстро начать использовать API достаточно подключить наш загрузчик в `<head></head>`:

`<script src="http://maps.api.2gis.ru/2.0/loader.js?pkg=full&mode=debug&skin=dark&lazy=true" data-id="dgLoader"></script>`

* аттрибут `data-id="dgLoader"` является обязательным.

### Опции

<table>
	<tr>
		<th>Опции</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>pkg</b></code></td>
		<td><code>full</code></td>
		<td>Загрузка пакета, содержащего набор определенных модулей (full - содержит в себе все доступные модули).</td>
	</tr>
	<tr>
		<td><code><b>mod</b></code></td>
		<td><code>null</code></td>
		<td>Указание конкретных модулей для загрузки. Если задать этот параметр, то параметр pkg будет проигнорирован.</td>
	</tr>
	<tr>
		<td><code><b>skin</b></code></td>
		<td><code>light</code></td>
		<td>Указать желаемый скин приложения, в базовой поставке доступны cкины light и dark.</td>
	</tr>
	<tr>
		<td><code><b>mode</b></code></td>
		<td><code>null</code></td>
		<td>Если указать значение debug, загрузится не минифицированная версия API.</td>
	</tr>
	<tr>
		<td><code><b>lazy</b></code></td>
		<td><code>false</code></td>
		<td>Если указать значение true, API загрузится отложенно, при первом вызове L.DG.then.</td>
	</tr>
</table>

## L.DG.then

Интерфейс добавления обработчиков по событию загрузки API. Может вызываться в цепочке:

	L.DG.then(function () {
             map = new L.Map('map', {
                'center': new L.LatLng(54.980206086231, 82.898068362003),
                'zoom': 13,
                'dgGeoclicker': true
            });
        }, function () {console.log('rejected');})
        .then(function () {
            console.log('deferred handler');}
        })


### Интерфейс

<table>
	<tr>
		<th>Вызов</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.DG.then</b>(
			<nobr>&lt;Function&gt; <i>resolve</i>,</nobr>
			<nobr>&lt;Function&gt; <i>reject</i></nobr>)
		</code></td>
		<td><code>Promise</code></td>
		<td>Регистрирует обработчики для выполнения по завершению загрузки API, resolve - отрабатывают в случае успешной загрузки, reject - в случае, если сервер не отдал собранные js и css исходники.</td>
	</tr>
</table>

Т.к. в основе L.DG.then использованы Promise, вызов L.DG.then в любой момент после загрузки API, мгновенно выполнит обработчик.

## L.DG.plugin

Интерфейс для подключения плагинов, зависящих от API или Leaflet:

	L.DG.then(function () {
			//загрузка плагинов
            return L.DG.plugin('https://raw.github.com/mlevans/leaflet-hash/master/leaflet-hash.js');
        })
        .then(function () {
            //инициализация карты
            var map = new L.Map('map', {
                'center': new L.LatLng(54.980206086231, 82.898068362003),
                'zoom': 13,
                'dgGeoclicker': true
            });
            //инициализация плагина
            var hash = new L.Hash(map);
        })

Если плагин не является необходимым на начальном этапе работы с картой, удобно использовать его отложенную загрузку и инициализацию:

	L.DG.then(function () {
            /инициализация карты
            var map = new L.Map('map', {
                'center': new L.LatLng(54.980206086231, 82.898068362003),
                'zoom': 13,
                'dgGeoclicker': true
            });
        }).then(function () {
        	//загрузка плагинов
            return L.DG.plugin('https://raw.github.com/mlevans/leaflet-hash/master/leaflet-hash.js');
        }).then(function () {
            //инициализация плагина
            var hash = new L.Hash(map);
        })

### Интерфейс

<table>
	<tr>
		<th>Вызов</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.DG.plugin</b>(
			<nobr>&lt;String&gt; <i>String Url</i>/</nobr>
			<nobr>&lt;Array&gt; <i>[String Url, String Url...]</i></nobr>)
		</code></td>
		<td><code>Promise</code></td>
		<td>Загружает и добавляет сторонние плагины в head секцию html-документа, принимает прямые ссылки на js и css файлы. Файлы должны быть указанны в правильном порядке.</td>
	</tr>
</table>

## L.Map

Основной класс API &mdash; используется для создания и управления картами на странице.

### Пример использования

	// инициализация карты в элементе div с id "map" с указанием координат центра карты и уровня зума
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

		<td>
			<code>L.map(&hellip;)</code>
		</td>

		<td>Создает объект карты по переданному DOM элементу div (или его id) и необязательному объекту с опциями карты, описанными ниже.</td>
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
		<td><code>null</code></td>
		<td>Начальный географический центр карты.</td>
	</tr>
	<tr>
		<td><code><b>zoom</b></code></td>
		<td><code>Number</code></td>
		<td><code>null</code></td>
		<td>Начальный уровень масштаба.</td>
	</tr>
	<tr>
		<td><code><b>layers</b></code></td>
		<td><code><a href="#ilayer">ILayer</a>[]</code></td>
		<td><code>null</code></td>
		<td>Слои, изначально добавленные на карту.</td>
	</tr>
	<tr id="map-maxbounds">
		<td><code><b>maxBounds</b></code></td>
		<td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
		<td><code>null</code></td>
		<td>Если свойство установлено, карта ограничивает область просмотра согласно заданным географическим границам, "отбрасывая" пользователя назад, если он пытается выйти за пределы установленных границ, а также не позволяет уменьшить масштаб так, чтобы можно было просмотреть неразрешенные участки карты. Для установки ограничения динамически используйте метод <a href="#map-setmaxbounds">setMaxBounds</a>.</td>
	</tr>
</table>

#### Опции взаимодействия

<table>
  <tr>
		<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>dragging</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Разрешено ли перетаскивать карту мышкой.</td>
	</tr>
	<tr>
		<td><code><b>touchZoom</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Разрешено ли изменять масштаб карты двумя пальцами на тач-устройствах.</td>
	</tr>
	<tr>
		<td><code><b>scrollWheelZoom</b></code></td>
		<td><code>Boolean/String</code></td>
		<td><code>true/''</code></td>
		<td>Разрешено ли изменять масштаб карты колесиком мышки. Если передано значение 'center', карта всегда зумится в центр вьюпорта, независимо от положения курсора.</td>
	</tr>
	<tr>
		<td><code><b>doubleClickZoom</b></code></td>
		<td><code>Boolean/String</code></td>
		<td><code>true/''</code></td>
		<td>Разрешено ли изменять масштаб карты двойным кликом мышки. Если передано значение 'center', карта всегда зумится в центр вьюпорта, независимо от положения курсора.</td>
	</tr>
	<tr>
		<td><code><b>boxZoom</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Разрешено ли изменять масштаб карты, выделяется прямоугольную область карты зажав клавишу shift.</td>
	</tr>
	<tr>
		<td><code><b>trackResize</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Обновляется ли карта при изменении размера окна браузера.</td>
	</tr>
	<tr>
		<td><code><b>worldCopyJump</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Опция позволяет зациклить просмотр карты с сохранением слоев и маркеров на ней.</td>
	</tr>
	<tr>
		<td><code><b>closePopupOnClick</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Закрывать ли балуны при клике на карту.</td>
	</tr>
	<tr>
		<td><code><b>bounceAtZoomLimits</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Опция позволяет установить анимацию восстановления карты при зуме пальцами на тач-устройствах на min/max уровнях зума.</td>
	</tr>
</table>

#### Навигация клавишами

<table>
  <tr>
	<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>keyboard</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Устанавливает фокус на карту и позволяет перемещаться по карте с помощью кнопок <code>+</code>/<code>-</code> и стрелок клавиатуры.</td>
	</tr>
	<tr>
		<td><code><b>keyboardPanOffset</b></code></td>
		<td><code>Number</code></td>
		<td><code>80</code></td>
		<td>Указывает, на сколько пикселей сдвинется карта при нажатии стрелки на клавиатуре.</td>
	</tr>
	<tr>
		<td><code><b>keyboardZoomOffset</b></code></td>
		<td><code>Number</code></td>
		<td><code>1</code></td>
		<td>Указывает, на сколько уровней изменится масштаб при нажатии на кнопки <code>+</code>/<code>-</code>.</td>
	</tr>
</table>


#### Инерция движения карты
<table>
  <tr>
	<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>inertia</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Если опция включена, создается эффект инерции при движении карты, при перетаскивании карта продолжает движение в том же направлении какое-то время. Особенно полезно для тач-устройств.</td>
	</tr>
	<tr>
		<td><code><b>inertiaDeceleration</b></code></td>
		<td><code>Number</code></td>
		<td><code>3000</code></td>
		<td>Величина, на которую замедляется движение карты, указывается в пикселях/секунду<sup>2</sup>.</td>
	</tr>
	<tr>
		<td><code><b>inertiaMaxSpeed</b></code></td>
		<td><code>Number</code></td>
		<td><code>1500</code></td>
		<td>Максимальная скорость инерционного движения, указывается в пикселях/секунду.</td>
	</tr>
	<tr>
		<td><code><b>inertiaThreshold</b></code></td>
		<td><code>Number</code></td>
		<td><code>depends</code></td>
		<td>Количество миллисекунд, которое должно пройти между остановкой движения карты и отпусканием кнопки мышки, для прекращения эффекта инерции. По умолчанию <code>32</code> для тач-устройств и <code>14</code> для остальных.</td>
	</tr>
</table>


#### Элементы управления
<table>
	<tr>
		<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>zoomControl</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Добавлен ли <a href="#control-zoom">элемент управления масштабом</a> на карту.</td>
	</tr>
	<tr>
		<td><code><b>fullscreenControl</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Добавлена ли <a href="#control-fullscreen">кнопка включения полноэкранного режима</a> на карту.</td>
	</tr>
</table>


#### Опции анимации
<table>
	<tr>
		<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>fadeAnimation</b></code></td>
		<td><code>Boolean</code></td>
		<td>depends</td>
		<td>Включена ли анимация затухания тайлов. По умолчанию включена во всех браузерах поддерживающих CSS3 transitions, кроме Android.</td>
	</tr>
	<tr>
		<td><code><b>zoomAnimation</b></code></td>
		<td><code>Boolean</code></td>
		<td>depends</td>
		<td>Включена ли анимация масштабирования тайлов. По умолчанию включена во всех браузерах поддерживающих CSS3 transitions кроме Android.</td>
	</tr>
	<tr>
		<td><code><b>zoomAnimationThreshold</b></code></td>
		<td><code>Number</code></td>
		<td>4</td>
		<td>Порог, начиная с которого будет отключаться анимация масштабирования.</td>
	</tr>
	<tr>
		<td><code><b>markerZoomAnimation</b></code></td>
		<td><code>Boolean</code></td>
		<td>depends</td>
		<td>Включена ли анимация масштабирования маркеров при анимации масштабирования карты, если выключена, тогда маркеры пропадают во время анимации карты. По умолчанию включена во всех браузерах поддерживающих CSS3 transitions, кроме Android.</td>
	</tr>
</table>


### События

Вы можете подписаться на следующие события используя [эти методы][39].

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
		<td>Вызывается при нажатии кнопки мышки над областью карты.</td>
	</tr>
	<tr>
		<td><code><b>mouseup</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается когда пользователь отпускает кнопку мышки над областью карты.</td>
	</tr>
	<tr>
		<td><code><b>mouseover</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при наведении курсора мышки на карту.</td>
	</tr>
	<tr>
		<td><code><b>mouseout</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается когда курсор мышки покидает область карты.</td>
	</tr>
	<tr>
		<td><code><b>mousemove</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается когда курсор мышки перемещается над картой.</td>
	</tr>
	<tr>
		<td><code><b>contextmenu</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при нажатии правой кнопки мышки на карте, предотвращает появление стандартного контекстного меню браузера, если на это событие подписан обработчик.</td>
	</tr>
	<tr>
		<td><code><b>focus</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при установке фокуса на карту (с помощью tab или кликнув/потянув ее).</td>
	</tr>
	<tr>
		<td><code><b>blur</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при потере фокуса картой.</td>
	</tr>
	<tr>
		<td><code><b>preclick</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается перед кликом мышки на карте (полезно, если нужно выполнить какие-либо действие до вызова обработчика клика).</td>
	</tr>
	<tr>
		<td><code><b>load</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при инициализации карты (при первой установке ее центра и масштаба).</td>
	</tr>
	<tr id="map-viewreset">
		<td><code><b>viewreset</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается когда нужно перерисовать содержимое карты (обычно при изменении масштаба или загрузке).</td>
	</tr>
	<tr>
		<td><code><b>movestart</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при начале изменения области просмотра карты (например, когда пользователь начинает перетаскивать карту).</td>
	</tr>
	<tr>
		<td><code><b>move</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается во время любого передвижения карты.</td>
	</tr>
	<tr id="map-moveend">
		<td><code><b>moveend</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при окончании передвижения краты (например, когда пользователь прекращает перетаскивать карту).</td>
	</tr>
	<tr>
		<td><code><b>dragstart</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается когда пользователь начинает перетаскивать карту.</td>
	</tr>
	<tr>
		<td><code><b>drag</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается когда пользователь перетаскивает карту.</td>
	</tr>
	<tr>
		<td><code><b>dragend</b></code></td>
		<td><code><a href="#dragend-event">DragEndEvent</a></code>
		<td>Вызывается когда пользователь прекращает перетаскивать карту.</td>
	</tr>
	<tr>
		<td><code><b>zoomstart</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается в начале изменения масштаба (перед анимацией изменения масштаба).</td>
	</tr>
	<tr>
		<td><code><b>zoomend</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается после изменения масштаба.</td>
	</tr>
	<tr>
		<td><code><b>zoomlevelschange</b></code></td>
		<td><code><a href="#event">Event</a></code></td>
		<td>Вызывается, если при добавлении или удалении слоя карты изменилось количество доступных уровней масштабирования.</td>
	</tr>
	<tr>
		<td><code><b>resize</b></code></td>
		<td><code><a href="#resize-event">ResizeEvent</a></code></td>
		<td>Вызывается при изменении размера карты.</td>
	</tr>
	<tr>
		<td><code><b>requestfullscreen</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при активации полноэкранного режима.</td>
	</tr>
	<tr>
		<td><code><b>cancelfullscreen</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при выходе из полноэкранного режима.</td>
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
		<td><code><b>locationfound</b></code></td>
		<td><code><a href="#location-event">LocationEvent</a></code>
		<td>Вызывается при успешном обнаружении местоположения пользователя (используется метод <a href="#map-locate">locate</a>).</td>
	</tr>
	<tr>
		<td><code><b>locationerror</b></code></td>
		<td><code><a href="#error-event">ErrorEvent</a></code>
		<td>Вызывается при возникновении ошибок во время обнаружения местоположения пользователя.</td>
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
	<tr>
		<td><code><b>entranceshow</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при отображении входа в здание.</td>
	</tr>
	<tr>
		<td><code><b>entrancehide</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при скрытии входа в здание.</td>
	</tr>
	<tr>
		<td><code><b>poihover</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при наведении курсора мышки на POI.</td>
	</tr>
	<tr>
		<td><code><b>poileave</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается когда курсор мышки покидает область POI.</td>
	</tr>
</table>

### Методы изменения состояния карты
<table>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>setView</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>center</i>,</nobr>
			<nobr>&lt;Number&gt; <i>zoom?</i>,</nobr>
			<nobr>&lt;<a href="#map-zoompanoptions">zoom/pan options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Устанавливает область просмотра карты (географический центр и масштаб). Если <code>forceReset</code> установлен в <code>true</code>, карта перезагружается при перетаскивании и изменении масштаба (по умолчанию <code>false</code>).</td>
	</tr>
	<tr>
		<td><code><b>setZoom</b>(
			<nobr>&lt;Number&gt; <i>zoom</i></nobr>,
			<nobr>&lt;<a href="#map-zoomoptions">zoom options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Устанавливает уровень масштаба.</td>
	</tr>
	<tr>
		<td><code><b>zoomIn</b>(
			<nobr>&lt;Number&gt; <em>delta?</em></nobr>,
			<nobr>&lt;<a href="#map-zoomoptions">zoom options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Увеличивает масштаб карты на величину <code>delta</code> (по умолчанию <code>1</code>).</td>
	</tr>
	<tr>
		<td><code><b>zoomOut</b>(
			<nobr>&lt;Number&gt; <em>delta?</em></nobr>,
			<nobr>&lt;<a href="#map-zoomoptions">zoom options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Уменьшает масштаб карты на величину <code>delta</code> (по умолчанию <code>1</code>).</td>
	</tr>
	<tr>
		<td><code><b>setZoomAround</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i>, </nobr>
			<nobr>&lt;Number&gt; <i>zoom</i></nobr>,
			<nobr>&lt;<a href="#map-zoomoptions">zoom options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Масштабирует карту, сохраняя при этом указанную точку в области видимости (например, используется для масштабировании при помощи колесика мышки и двойного клика).</td>
	</tr>
	<tr id="map-fitbounds">
		<td><code><b>fitBounds</b>(
			<nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i> )</nobr>,
			<nobr>&lt;<a href="#map-fitboundsoptions">fitBounds options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Устанавливает область просмотра карты так, чтобы она содержала заданные границы на максимально возможном уровне масштаба.</td>
	</tr>
	<tr id="map-fitworld">
		<td><code><b>fitWorld</b>(
			<nobr>&lt;<a href="#map-fitboundsoptions">fitBounds options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Устанавливает область просмотра карты так, чтобы та отображала весь мир на максимально возможном уровне масштаба.</td>
	</tr>
	<tr>
		<td><code><b>panTo</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i></nobr>,
			<nobr>&lt;<a href="#map-panoptions">pan options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Перемещает карту в указанный центр. Передвижение анимируется, если центр находится на расстоянии не более одного экрана относительно текущего.</td>
	</tr>
	<tr id="map-paninsidebounds">
		<td><code><b>panInsideBounds</b>(
			<nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i> )</nobr>,
        	<nobr>&lt;<a href="#map-panoptions">pan options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Перемещает карту в ближайшую область просмотра, лежащую в пределах заданных границ. Можно контролировать анимацию, передавая объект опций вторым параметром.</td>
	</tr>
	<tr>
		<td><code><b>panBy</b>(
			<nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i></nobr>,
			<nobr>&lt;<a href="#map-panoptions">pan options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Перемещает карту на заданное колличетво пикселей (анимируется).</td>
	</tr>
	<tr>
		<td><code><b>invalidateSize</b>(
			<nobr>&lt;Boolean&gt; <i>animate?</i> )</nobr>,
			<nobr>&lt;<a href="#map-zoompanoptions">zoom/pan options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Проверяет изменился ли размер контейнера карты, если да, тогда карта обновляется. Этот метод необходимо вызывать если размер контейнера изменился динамически. Если параметр <code>animate</code> установлен в <code>true</code>, тогда обновление карты анимируется.</td>
	</tr>
	<tr id="map-setmaxbounds">
		<td><code><b>setMaxBounds</b>(
			<nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Ограничивает область просмотра карты заданными границами (см. опцию <a href="#map-maxbounds">maxBounds</a>).</td>
	</tr>
	<tr id="map-locate">
		<td><code><b>locate</b>(
			<nobr>&lt;<a href="#map-locate-options">Locate options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Пытается определить местоположение пользователя используя <a href="https://en.wikipedia.org/wiki/W3C_Geolocation_API">Geolocation API</a>. При успешном определении вызывается событие <code>locationfound</code> с данными о местоположении, в случае ошибки будет вызвано событие <code>locationerror</code>. Опционально устанавливает область просмотра карты согласно местоположению пользователя (или просмотр карты мира, если возникла ошибка геолокации). Для дополнительной информации см. <a href="#map-locate-options">опции определения местоположения</a>.</td>
	</tr>
	<tr>
		<td><code><b>stopLocate</b>()</code></td>
		<td><code>this</code></td>
		<td>Останавливает отслеживание местоположения, предварительно инициированное методом <code><b>map.locate</b>({watch: true})</code>.</td>
	</tr>
	<tr id="map-remove">
		<td><code><b>remove</b>()</code></td>
		<td><code>this</code></td>
		<td>Уничтожает карту и очищает все связанные с ней обработчики событий.</td>
	</tr>
</table>

### Методы получения состояния карты
<table>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>getCenter</b>()</code></td>
		<td><code><a href="#latlng">LatLng</a></code></td>
		<td>Возвращает географический центр области просмотра карты.</td>
	</tr>
	<tr>
		<td><code><b>getZoom</b>()</code></td>
		<td><code>Number</code></td>
		<td>Возвращает текущий уровень масштабирования.</td>
	</tr>
	<tr>
		<td><code><b>getMinZoom</b>()</code></td>
		<td><code>Number</code></td>
		<td>Возвращает минимальный уровень масштабирования.</td>
	</tr>
	<tr>
		<td><code><b>getMaxZoom</b>()</code></td>
		<td><code>Number</code></td>
		<td>Возвращает максимальный уровень масштабирования.</td>
	</tr>
	<tr>
		<td><code><b>getBounds</b>()</code></td>
		<td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
		<td>Возвращает географические прямоугольные границы текущей области просмотра карты.</td>
	</tr>
	<tr>
		<td><code><b>getBoundsZoom</b>(
			<nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i>,</nobr>
			<nobr>&lt;Boolean&gt; <i>inside?</i> )</nobr>
		</code></td>

		<td><code>Number</code></td>

		<td>Возвращает максимальный уровень масштабирования, при котором заданные границы полностью входят в область просмотра. Если опция <code>inside</code> установлена в <code>true</code>, тогда метод возвращает минимальный уровень зума с теми же условиями.</td>
	</tr>
	<tr>
		<td><code><b>getSize</b>()</code></td>
		<td><code><a href="#point">Point</a></code></td>
		<td>Возвращает текущий размер контейнера карты.</td>
	</tr>
	<tr>
		<td><code><b>getPixelBounds</b>()</code></td>
		<td><code>Bounds</code></td>
		<td>Возвращает пиксельные прямоугольные границы области просмотра карты.</td>
	</tr>
	<tr>
		<td><code><b>getPixelOrigin</b>()</code></td>
		<td><code><a href="#point">Point</a></code></td>
		<td>Возвращает пиксельные координаты левой верхней точки слоя карты.</td>
	</tr>
</table>

### Методы слоев и элементов управления
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

		<td><code>this</code></td>
		<td>Добавляет переданный слой на карту. Если опция <code>insertAtTheBottom</code> установлена в <code>true</code>, слой добавляется поверх остальных.</td>
	</tr>
	<tr>
		<td><code><b>removeLayer</b>(
			<nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Удаляет переданные слои с карты.</td>
	</tr>
	<tr>
		<td><code><b>hasLayer</b>(
			<nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
		</code></td>

		<td><code>Boolean</code></td>
		<td>Возвращает <code>true</code>, если переданный слой в данный момент добавлен на карту.</td>
	</tr>

	<tr id="map-openpopup">
		<td><code><b>openPopup</b>(
			<nobr>&lt;<a href="#popup">Popup</a>&gt; <i>popup</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Показывает переданный балун, предварительно закрыв все открытые.</td>
	</tr>
	<tr id="map-openpopup2">
		<td><code><b>openPopup</b>(
			<nobr>&lt;String&gt; <i>html</i> </nobr> | <nobr>&lt;HTMLElement&gt; <i>el</i>,
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i></nobr>,
			<nobr>&lt;<a href="#popup-options">Popup options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Создает балун с переданными опциями и открывает его в определенной точке на карте.</td>
	</tr>
	<tr id="map-closepopup">
		<td><code><b>closePopup</b>(
			<nobr>&lt;<a href="#popup">Popup</a>&gt; <i>popup?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Закрывает балун, открытый с помощью <a href="#map-openpopup">openPopup</a>.</td>
	</tr>
	<tr id="map-addcontrol">
		<td><code><b>addControl</b>(
			<nobr>&lt;<a href="#icontrol">IControl</a>&gt; <i>control</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Добавляет переданный элемент управления на карту.</td>
	</tr>
	<tr>
		<td><code><b>removeControl</b>(
			<nobr>&lt;<a href="#icontrol">IControl</a>&gt; <i>control</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Удаляет элемент управления с карты.</td>
	</tr>
</table>

### Методы преобразования
<table>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>latLngToLayerPoint</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
		</code></td>

		<td><code><a href="#point">Point</a></code></td>
		<td>Возвращает точку на карте, соответствующую переданным географическим координатам (удобно при размещении дополнительных слоев на карте).</td>
	</tr>
	<tr>
		<td><code><b>layerPointToLatLng</b>(
			<nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
		</code></td>

		<td><code><a href="#latlng">LatLng</a></code></td>
		<td>Возвращает географические координаты, соответствующие переданной точке на карте.</td>
	</tr>
	<tr>
		<td><code><b>containerPointToLayerPoint</b>(
			<nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
		</code></td>

		<td><code><a href="#point">Point</a></code></td>
		<td>Конвертирует точку контейнера карты в точку слоя карты.</td>
	</tr>
	<tr>
		<td><code><b>layerPointToContainerPoint</b>(
			<nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
		</code></td>

		<td><code><a href="#point">Point</a></code></td>
		<td>Конвертирует точку слоя карты в точку контейнера карты.</td>
	</tr>
	<tr>
		<td><code><b>latLngToContainerPoint</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
		</code></td>

		<td><code><a href="#point">Point</a></code></td>
		<td>Возвращает точку контейнера карты, соответствующую географическим координатам.</td>
	</tr>
	<tr>
		<td><code><b>containerPointToLatLng</b>(
			<nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
		</code></td>

		<td><code><a href="#latlng">LatLng</a></code></td>
		<td>Возвращает географические координаты, соответствующие переданной точке контейнера.</td>
	</tr>
	<tr>
		<td><code><b>project</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i>,</nobr>
			<nobr>&lt;Number&gt; <i>zoom?</i> )</nobr>
		</code></td>

		<td><code><a href="#point">Point</a></code></td>
		<td>Проецирует географические координаты в пиксельные для переданного уровня масштаба (по умолчанию текущий уровень).</td>
	</tr>
	<tr>
		<td><code><b>unproject</b>(
			<nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i>,</nobr>
			<nobr>&lt;Number&gt; <i>zoom?</i> )</nobr>
		</code></td>

		<td><code><a href="#latlng">LatLng</a></code></td>
		<td>Проецирует пиксельные координаты в географические для переданного уровня масштаба (по умолчанию текущий уровень).</td>
	</tr>
	<tr>
		<td><code><b>mouseEventToContainerPoint</b>(
			<nobr>&lt;MouseEvent&gt; <i>event</i> )</nobr>
		</code></td>

		<td><code><a href="#point">Point</a></code></td>
		<td>Возвращает пиксельные координаты клика мышки относительно левого верхнего угла контейнера карты на основе переданного объекта <code>event</code>.</td>
	</tr>
	<tr>
		<td><code><b>mouseEventToLayerPoint</b>(
			<nobr>&lt;MouseEvent&gt; <i>event</i> )</nobr>
		</code></td>

		<td><code><a href="#point">Point</a></code></td>
		<td>Возвращает пиксельные координаты клика мышки относительно слоя на основе переданного объекта <code>event</code>.
	</tr>
	<tr>
		<td><code><b>mouseEventToLatLng</b>(
			<nobr>&lt;MouseEvent&gt; <i>event</i> )</nobr>
		</code></td>

		<td><code><a href="#latlng">LatLng</a></code></td>
		<td>Возвращает географические координаты клика мышки на основе переданного объекта <code>event</code>.</td>
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
		<td>Возвращает контейнер карты.</td>
	</tr>
	<tr id="map-getpanes">
		<td><code><b>getPanes</b>()</code></td>
		<td><code><a href="#map-panes">MapPanes</a></code></td>
		<td>Возвращает объект с панелями карты (для отрисовки дополнительных слоев).</td>
	</tr>
	<tr id="map-whenready">
		<td><code><b>whenReady</b>(
			<nobr>&lt;Function&gt; <i>fn</i></nobr>,
			<nobr>&lt;Object&gt; <i>context?</i> )</nobr></code></td>
		<td><code>this</code></td>
		<td>Выполняет функцию <code>fn</code> после инициализации карты или сразу, если она была инициализирована ранее. Опционально можно передать контекст выполнения.</td>
	</tr>
</table>

### Опции определения местоположения
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
		<td><code>false</code></td>
		<td>Если <code>true</code>, тогда постоянно отслеживает изменения местоположения (вместо определения местоположения один раз) используя W3C метод <code>watchPosition</code>. Можно остановить отслеживание вызвав метод <code><b>map.stopLocate</b>()</code>.</td>
	</tr>
	<tr>
		<td><code><b>setView</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Если <code>true</code>, тогда автоматически устанавливает область просмотра карты в точку местоположения пользователя в соответствии с точностью определения. В случае ошибки поиска отображаетcя карта мира.</td>
	</tr>
	<tr>
		<td><code><b>maxZoom</b></code></td>
		<td><code>Number</code></td>
		<td><code>Infinity</code></td>
		<td>Задает максимальный уровень масштабирования в случае автоматического перемещения карты (если включена опция <code>setView</code>).</td>
	</tr>
	<tr>
		<td><code><b>timeout</b></code></td>
		<td><code>Number</code></td>
		<td><code>10000</code></td>
		<td>Количество миллисекунд ожидания ответа геолокации перед тем как вызовется событие <code>locationerror</code>.</td>
	</tr>
	<tr>
		<td><code><b>maximumAge</b></code></td>
		<td><code>Number</code></td>
		<td><code>0</code></td>
		<td>Максимальное время жизни данных местоположения. Если с момента последнего поиска прошло меньше времени, чем указанно в данной опции, данные будут получены из кэша.</td>
	</tr>
	<tr>
		<td><code><b>enableHighAccuracy</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Включает функцию повышения точности, см. <a href="http://dev.w3.org/geo/api/spec-source.html#high-accuracy">описание в W3C спецификации</a>.</td>
	</tr>
</table>

<h3 id="map-zoompanoptions">Опции масштабирования и перемещения</h3>

<table data-id='map'>
	<tr>
		<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>reset</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">false</span></code></td>
		<td>Если <code>true</code>, тогда область просмотра карты будет сброшена без каких-либо анимаций.</td>
	</tr>
	<tr>
		<td><code><b>pan</b></code></td>
		<td><code><a href="#map-panoptions">pan options</a></code></td>
		<td><code>-</code></td>
		<td>Опции перемещения.</td>
	</tr>
	<tr>
		<td><code><b>zoom</b></code></td>
		<td><code><a href="#map-zoomoptions">zoom options</a></code></td>
		<td><code>-</code></td>
		<td>Опции масштабирования.</td>
	</tr>
	<tr>
		<td><code><b>animate</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">-</span></code></td>
		<td>Эквивалентно передаче <code>animate</code> и для опций масштабирования и для опций перемещения.</td>
	</tr>
</table>

<h3 id="map-panoptions">Опции перемещения</h3>

<table data-id='map'>
	<tr>
		<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>animate</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>-</code></td>
		<td>Если <code>true</code>, тогда перемещение будет всегда анимироваться, если это возможно, в противном случае анимирование не будет осуществляться.</td>
	</tr>
	<tr>
		<td><code><b>duration</b></code></td>
		<td><code>Number</code></td>
		<td><code><span class="number">0.25</span></code></td>
		<td>Продолжительность анимирования перемещения.</td>
	</tr>
	<tr>
		<td><code><b>easeLinearity</b></code></td>
		<td><code>Number</code></td>
		<td><code>0.25</code></td>
		<td>Уровень искривления затухания анимации (третий параметр <a href="http://cubic-bezier.com/">Кривой Безье</a>). Значение 1.0 означает линейную анимацию.</td>
	</tr>
	<tr>
		<td><code><b>noMoveStart</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">false</span></code></td>
		<td>Если <code>true</code>, тогда при перемещении не будет инициироваться событие <code>movestart</code>.</td>
	</tr>
</table>

<h3 id="map-zoomoptions">Опции масштабирования</h3>

<table data-id='map'>
	<tr>
		<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>animate</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>-</code></td>
		<td>Если не указано, тогда масштабирование будет анимироваться в пределах просматриваемой области карты. Если <code>true</code>, тогда всегда будет произведена попытка анимировать масштабирование, вне зависимости от положения источника масштабирования. Если <code>false</code>, тогда масштабирование будет происходить без анимации.</td>
	</tr>
</table>

<h3 id="map-fitboundsoptions">Опции fitBounds</h3>

<p>То же самое, что в <a href="#map-zoompanoptions">опциях масштабирования и перемещения</a> и дополнительно:</p>

<table data-id='map'>
	<tr>
		<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>paddingTopLeft</b></code></td>
		<td><code><a href="#point">Point</a></code></td>
		<td><code><nobr>[<span class="number">0</span>, <span class="number">0</span>]</nobr>
		<td>Задает отступ от верхнего левого угла контейнера карты, который не должен учитываться при подстройке центра и масштаба. Удобно использовать, например, если на карте приложения имеется левая панель и вы не хотите, чтобы при масштабировании под ней скрывались объекты.</td>
	</tr>
	<tr>
		<td><code><b>paddingBottomRight</b></code></td>
		<td><code><a href="#point">Point</a></code></td>
		<td><code><nobr>[<span class="number">0</span>, <span class="number">0</span>]</nobr>
		<td>То же самое, но для нижнего правого угла карты.</td>
	</tr>
	<tr>
		<td><code><b>padding</b></code></td>
		<td><code><a href="#point">Point</a></code></td>
		<td><code><nobr>[<span class="number">0</span>, <span class="number">0</span>]</nobr>
		<td>Эквивалентно установке и верхнего левого и нижнего правого отступов в одинаковые значения.</td>
	</tr>
	<tr>
		<td><code><b>maxZoom</b></code></td>
		<td><code>Number</code></td>
		<td><code><nobr>null</nobr>
		<td>Максимальный уровень зума.</td>
	</tr>
</table>

### Свойства

Свойства карты включают в себя обработчики взаимодействия, которые позволяют контролировать интерактивное поведение, подключение и отключение определенных возможностей карты, таких как зум и тач-события (см. методы [IHandler][51]). Например:

	map.doubleClickZoom.disable();

Вы также можете получить доступ к элементам управления картой, которые включены по умолчанию, например, к элементу управления масштабом:

	map.zoomControl.setPosition('topright');

<table>
	<tr>
		<th>Свойство</th>
		<th>Тип</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>dragging</b></code></td>
		<td><a href="#ihandler"><code>IHandler</code></a></td>
		<td>Обработчик перетаскивания карты (мышкой и тачем).</td>
	</tr>
	<tr>
		<td><code><b>touchZoom</b></code></td>
		<td><a href="#ihandler"><code>IHandler</code></a></td>
		<td>Обработчик тач-масштабирования.</td>
	</tr>
	<tr>
		<td><code><b>doubleClickZoom</b></code></td>
		<td><a href="#ihandler"><code>IHandler</code></a></td>
		<td>Обработчик масштабирования по двойному клику.</td>
	</tr>
	<tr>
		<td><code><b>scrollWheelZoom</b></code></td>
		<td><a href="#ihandler"><code>IHandler</code></a></td>
		<td>Обработчик масштабирования по скроллу.</td>
	</tr>
	<tr>
		<td><code><b>boxZoom</b></code></td>
		<td><a href="#ihandler"><code>IHandler</code></a></td>
		<td>Обработчик box-масштабирования (shift + выделение мышкой).</td>
	</tr>
	<tr>
		<td><code><b>keyboard</b></code></td>
		<td><a href="#ihandler"><code>IHandler</code></a></td>
		<td>Обработчик навигации с помощью клавиатуры.</td>
	</tr>
	<tr>
		<td><code><b>zoomControl</b></code></td>
		<td><a href="#control-zoom"><code>Control.Zoom</code></a></td>
		<td>Элемент управления масштабом.</td>
	</tr>
	<tr>
		<td><code><b>fullscreenControl</b></code></td>
		<td><a href="#control-fullscreen"><code>Control.FullScreen</code></a></td>
		<td>Кнопка включения полноэкранного режима.</td>
	</tr>
</table>

### Панели карты

Объект (возвращаемый методом [map.getPanes][74]) содержит панели карты, которые можно использовать для собственных слоев. Основное различие панелей в параметре `zIndex`, определяющем очередь наложения.
<table>
	<tr>
		<th>Свойство</th>
		<th>Тип</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>mapPane</b></code></td>
		<td><code>HTMLElement</code></td>
		<td>Панель, содержащая все другие панели карты.</td>
	</tr>
	<tr>
		<td><code><b>tilePane</b></code></td>
		<td><code>HTMLElement</code></td>
		<td>Панель слоя тайлов.</td>
	</tr>
	<tr>
		<td><code><b>objectsPane</b></code></td>
		<td><code>HTMLElement</code></td>
		<td>Панель, содержащая все панели, кроме тайловой.</td>
	</tr>
	<tr>
		<td><code><b>shadowPane</b></code></td>
		<td><code>HTMLElement</code></td>
		<td>Панель для наложения теней.</td>
	</tr>
	<tr>
		<td><code><b>overlayPane</b></code></td>
		<td><code>HTMLElement</code></td>
		<td>Панель геометрий, таких как ломаные и многоугольники.</td>
	</tr>
	<tr>
		<td><code><b>markerPane</b></code></td>
		<td><code>HTMLElement</code></td>
		<td>Панель маркеров.</td>
	</tr>
	<tr>
		<td><code><b>popupPane</b></code></td>
		<td><code>HTMLElement</code></td>
		<td>Панель балунов.</td>
	</tr>
</table>

## L.Marker

Используется для добавления маркеров на карту.

	L.marker([50.5, 30.5]).addTo(map);

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.Marker</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i>,</nobr>
			<nobr>&lt;<a href="#marker-options">Marker options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.marker(&hellip;)</code>
		</td>

		<td>Создает объект маркера с переданными географическими координатами и необязательными опциями.</td>
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
		<td>Иконка, используемая для отображения маркера. См. <a href="#icon">L.Icon</a>.</td>
	</tr>
	<tr>
		<td><code><b>clickable</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Если значение <code>false</code>, тогда обработчик клика по маркеру не вызывается.</td>
	</tr>
	<tr>
		<td><code><b>draggable</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Возможно ли перетаскивать маркер.</td>
	</tr>
	<tr>
		<td><code><b>title</b></code></td>
		<td><code>String</code></td>
		<td><code>''</code></td>
		<td>Текст для отображения подсказки при наведении курсора на маркер (по умолчанию не отображается).</td>
	</tr>
	<tr>
		<td><code><b>alt</b></code></td>
		<td><code>String</code></td>
		<td><code>''</code></td>
		<td>Текст для alt аттрибута иконки.</td>
	</tr>
	<tr id="marker-zindexoffset">
		<td><code><b>zIndexOffset</b></code></td>
		<td><code>Number</code></td>
		<td><code>0</code></td>
		<td>По умолчанию изображению маркера свойство z-index устанавливается автоматически. Используйте эту опцию, если необходимо разместить маркер поверх (или снизу) других элементов, указав наибольшее (или наименьшее) значение.</td>
	</tr>
	<tr>
		<td><code><b>opacity</b></code></td>
		<td><code>Number</code></td>
		<td><code>1.0</code></td>
		<td>Прозрачность маркера.</td>
	</tr>
	<tr>
		<td><code><b>riseOnHover</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Если значение <code>true</code>, тогда маркер отобразится поверх остальных при наведении на него мышкой.</td>
	</tr>
	<tr>
		<td><code><b>riseOffset</b></code></td>
		<td><code>Number</code></td>
		<td><code>250</code></td>
		<td>Позволяет задать шаг z-index при использовании <code>riseOnHover</code>.</td>
	</tr>
</table>

### События

Вы можете подписаться на следующие события используя [эти методы][39].

<table>
	<tr>
		<th>Событие</th>
		<th>Данные</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>click</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при клике по маркеру.</td>
	</tr>
	<tr>
		<td><code><b>dblclick</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при двойном клике по маркеру.</td>
	</tr>
	<tr>
		<td><code><b>mousedown</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при нажатии кнопки мышки над маркером.</td>
	</tr>
	<tr>
		<td><code><b>mouseover</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при наведении курсора мышки на маркер.</td>
	</tr>
	<tr>
		<td><code><b>mouseout</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается когда курсор мышки покидает область маркера.</td>
	</tr>
	<tr>
		<td><code><b>contextmenu</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при нажатии правой кнопки мышки над маркером.</td>
	</tr>
	<tr>
		<td><code><b>dragstart</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается когда пользователь начинает перетаскивать маркер.</td>
	</tr>
	<tr>
		<td><code><b>drag</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается во время перетаскивания маркера.</td>
	</tr>
	<tr>
		<td><code><b>dragend</b></code></td>
		<td><code><a href="#dragend-event">DragEndEvent</a></code>
		<td>Вызывается когда пользователь прекращает перетаскивание маркера.</td>
	</tr>
	<tr>
		<td><code><b>move</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при перемещении маркера с помощью метода setLatLng.</td>
	</tr>
	<tr>
		<td><code><b>add</b></code></td>
		<td><code><a href="#event">Event</a></code></td>
		<td>Вызывается при добавлении маркера на карту.</td>
    </tr>
	<tr>
		<td><code><b>remove</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при удалении маркера с карты.</td>
	</tr>
	<tr>
		<td><code><b>popupopen</b></code></td>
		<td><code><a href="#popup-event">PopupEvent</a></code></td>
		<td>Вызывается при открытии прикрепленного к маркеру балуна.</td>
	</tr>
	<tr>
		<td><code><b>popupclose</b></code></td>
		<td><code><a href="#popup-event">PopupEvent</a></code></td>
		<td>Вызывается при закрытии прикрепленного к маркеру балуна.</td>
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

		<td><code>this</code></td>
		<td>Добавляет маркер на карту.</td>
	</tr>
	<tr>
		<td><code><b>getLatLng</b>()</code></td>
		<td><code><a href="#latlng">LatLng</a></code></td>
		<td>Возвращает текущие географические координаты маркера.</td>
	</tr>
	<tr>
		<td><code><b>setLatLng</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Изменяет координаты маркера на переданные.</td>
	</tr>
	<tr>
		<td><code><b>setIcon</b>(
			<nobr>&lt;<a href="#icon">Icon</a>&gt; <i>icon</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Изменяет иконку маркера.</td>
	</tr>
	<tr>
		<td><code><b>setZIndexOffset</b>(
			<nobr>&lt;Number&gt; <i>offset</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Изменяет свойство маркера <a href="#marker-zindexoffset">zIndexOffset</a>.</td>
	</tr>
	<tr>
		<td><code><b>setOpacity</b>(
			<nobr>&lt;Number&gt; <i>opacity</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Изменяет прозрачность маркера.</td>
	</tr>
	<tr>
		<td><code><b>update</b>()</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Обновляет позиционирование маркера, удобно при изменении свойства <code>latLng</code> напрямую.</td>
	</tr>
	<tr id="marker-bindpopup">
		<td><code><b>bindPopup</b>(
			<nobr>&lt;String&gt; <i>html</i> |</nobr> <nobr>&lt;HTMLElement&gt; <i>el</i> |</nobr> <nobr>&lt;<a href="#popup">Popup</a>&gt; <i>popup</i>,</nobr>
			<nobr>&lt;<a href="#popup-options">Popup options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Прикрепляет к маркеру балун с определенным HTML содержимым. Балун будет показан при клике на маркер.</td>
	</tr>
	<tr id="marker-unbindpopup">
		<td><code><b>unbindPopup</b>()</code></td>
		<td><code>this</code></td>
		<td>Отвязывает балун от маркера.</td>
	</tr>
	<tr id="marker-openpopup">
		<td><code><b>openPopup</b>()</code></td>
		<td><code>this</code></td>
		<td>Открывает балун, предварительно прикрепленный с помощью метода <a href="#marker-bindpopup">bindPopup</a>.</td>
	</tr>
	<tr id="marker-closepopup">
		<td><code><b>closePopup</b>()</code></td>
		<td><code>this</code></td>
		<td>Закрывает балун, если тот был открыт.</td>
	</tr>
	<tr id="marker-togglepopup">
		<td><code><b>togglePopup</b>()</code></td>
		<td><code>this</code></td>
		<td>Включает или отключает отображение балуна, который ранее был прикреплен с помощью метода <a href="#marker-bindpopup">bindPopup</a>, при клике.</td>
	</tr>
	<tr id="marker-bindpopup">
		<td><code><b>setPopupContent</b>(
			<nobr>&lt;String&gt; <i>html</i> |</nobr> <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
			<nobr>&lt;<a href="#popup-options">Popup options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Устанавливает HTML содержимое прикрепленному ранее балуну.</td>
	</tr>
	<tr id="marker-togeojson">
		<td><code><b>toGeoJSON</b>()</code></td>
		<td><code>Object</code></td>
		<td>Возвращает <a href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a> представление маркера (GeoJSON Point).</td>
	</tr>
</table>

### Обработчики взаимодействия

Свойства маркера включают в себя обработчики взаимодействия, которые позволяют контролировать интерактивное поведение маркера, а также подключение и отключение определенных возможностей, таких как перетаскивание (см. [IHandler][51]). Например:

	marker.dragging.disable();

<table>
	<tr>
		<th>Свойство</th>
		<th>Тип</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td>dragging</td>
		<td><a href="#ihandler"><code>IHandler</code></a></td>
		<td>Обработчик перетаскивания маркера.</td>
	</tr>
</table>

## L.Popup

Используется для отображения балунов на карте. Для открытия балуна можно использовать метод [Map#openPopup][72], в таком случае одновременно может быть открыт лишь один балун, либо [Map#addLayer][81] для отображения любого количества балунов.

### Пример использования

Включить отображения балуна по клику на маркер очень легко:

	marker.bindPopup(popupContent).openPopup();

У дополнительных слоев, таких как ломаные также есть метод `bindPopup`. Вот более сложный пример отображения балуна:

	var popup = L.popup()
		.setLatLng(latlng)
		.setContent('<p>Привет!<br />Я балун.</p>')
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
			<nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>source?</i> )</nobr>
		</code></td>

		<td>
			<code>L.popup(&hellip;)</code>
		</td>

		<td>Создает объект <code>Popup</code> с переданными опциями, описывающими внешний вид и расположение балуна, и объектом, указывающим привязку балуна к определенному ILayer.</td>
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
		<td><code>300</code></td>
		<td>Максимальная ширина балуна.</td>
	</tr>
	<tr>
		<td><code><b>minWidth</b></code></td>
		<td><code>Number</code></td>
		<td><code>50</code></td>
		<td>Минимальная ширина балуна.</td>
	</tr>
	<tr>
		<td><code><b>maxHeight</b></code></td>
		<td><code>Number</code></td>
		<td><code>null</code></td>
		<td>Если значение установлено и содержимое балуна превышает заданную высоту, создается контейнер указанной высоты со скроллом.</td>
	</tr>
	<tr>
		<td><code><b>autoPan</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Установите значение в <code>false</code>, если не хотите чтобы карта автоматически сдвигалась для полного отображения балуна.</td>
	</tr>
	<tr>
		<td><code><b>keepInView</b></code></td>
		<td><code>Boolean</code></td>
		<td><code><span class="literal">false</span></code></td>
		<td>Установите в <code>true</code>, если необходимо предотвратить вероятность перемещения балуна за пределы видимой области карты пока он открыт.</td>
	</tr>
	<tr>
		<td><code><b>closeButton</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Отвечает за отображение кнопки закрытия балуна.</td>
	</tr>
	<tr>
		<td><code><b>offset</b></code></td>
		<td><code><a href="#point">Point</a></code></td>
		<td><code><nobr>Point(0, 6)</nobr>
		</code></td>
		<td>Устанавливает отступ позиции балуна. Удобно для управления ножкой балуна.</td>
	</tr>
	<tr>
		<td><code><b>autoPanPaddingTopLeft</b></code></td>
		<td><code><a href="#point">Point</a></code></td>
		<td><code><nobr>null</nobr>
		</code></td>
		<td>Задает расстояние от края балуна до левого верхнего угла карты при автоматическом сдвиге.</td>
	</tr>
	<tr>
		<td><code><b>autoPanPaddingBottomRight</b></code></td>
		<td><code><a href="#point">Point</a></code></td>
		<td><code><nobr>null</nobr>
		</code></td>
		<td>Задает расстояние от края балуна до правого нижнего угла карты при автоматическом сдвиге.</td>
	</tr>
	<tr>
		<td><code><b>autoPanPadding</b></code></td>
		<td><code><a href="#point">Point</a></code></td>
		<td><code><nobr>Point(5, 5)</nobr>
		</code></td>
		<td>Задает расстояние от края балуна до границы карты при автоматическом сдвиге, устанавливает одинаковые значения для autoPanPaddingBottomRight и autoPanPaddingTopLeft.</td>
	</tr>
	<tr>
		<td><code><b>zoomAnimation</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Анимировать ли балун при масштабировании. Отключите, если есть проблемы с отображением Flash содержимого внутри балуна.</td>
	</tr>
	<tr>
		<td><code><b>closeOnClick</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>null</code></td>
		<td>Установите в <code>false</code>, если необходимо переопределить поведение закрытия балуна при клике по карте (глобальное поведение для всех балунов задается опцией карты <code>closePopupOnClick</code>).</td>
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

		<td><code>this</code></td>
		<td>Добавляет балун на карту.</td>
	</tr>
	<tr>
		<td><code><b>openOn</b>(
			<nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Добавляет балун на карту, предварительно закрыв другие балуны. Аналогично <code>map.openPopup(popup)</code>.</td>
	</tr>
	<tr>
		<td><code><b>setLatLng</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Устанавливает географические координаты точки открытия балуна.</td>
	</tr>
	<tr>
		<td><code><b>getLatLng</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Возвращает географические координаты точки открытия балуна.</td>
	</tr>
	<tr>
		<td><code><b>setHeaderContent</b>(
			<nobr>&lt;String&gt;/&lt;DOM-element&gt;  <i>content</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Задает содержимое секции header балуна. Может принимать HTML строку или DOM-элемент.</td>
	</tr>
	<tr>
		<td><code><b>setContent</b>(
			<nobr>&lt;String&gt;/&lt;DOM-element&gt;  <i>content</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Задает содержимое секции body балуна. Может принимать HTML строку или DOM-элемент.</td>
	</tr>
	<tr>
		<td><code><b>setFooterContent</b>(
			<nobr>&lt;String&gt;/&lt;DOM-element&gt; <i>content</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Задает содержимое секции footer балуна. Может принимать HTML строку или DOM-элемент.</td>
	</tr>
	<tr>
		<td><code><b>getContent</b>()</code></td>
		<td><code>&lt;String|HTMLElement&gt;</code></td>
		<td>Возвращает контент балуна.</td>
	</tr>
</table>

## L.TileLayer

Используется для загрузки и отображения тайлового слоя на карте, реализует интерфейс [ILayer][52].

### Пример использования

	L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
		key: 'API-key',
		styleId: 997
	}).addTo(map);

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.TileLayer</b>(
			<nobr>&lt;String&gt; <i><a href="#url-template">urlTemplate</a></i>,</nobr>
			<nobr>&lt;<a href="#tilelayer-options">TileLayer options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.tileLayer(&hellip;)</code>
		</td>

		<td>Создает объект тайлового слоя по переданному <a href="#url-template">URL шаблону</a> и необязательному объекту опций.</td>
	</tr>
</table>

### URL шаблон

Строка следующего вида:

	'http://{s}.somedomain.com/blabla/{z}/{x}/{y}.png'

`{s}` &mdash; один из доступных поддоменов (используется для параллельной загрузки тайлов браузером). Поддомены указываются в опциях. `a`, `b` или `c` &mdash; значения по умолчанию, `{z}` &mdash; уровень зума, `{x}` и `{y}` &mdash; координаты тайлов в тайловой сетке.

В шаблонах можно использовать собственные ключи, например так:

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
		<td><code>0</code></td>
		<td>Минимальный уровень зума.</td>
	</tr>
	<tr>
		<td><code><b>maxZoom</b></code></td>
		<td><code>Number</code></td>
		<td><code>18</code></td>
		<td>Максимальный уровень зума.</td>
	</tr>
	<tr>
		<td><code><b>maxNativeZoom</b></code></td>
		<td><code>Number</code></td>
		<td><code><span>null</span></code></td>
		<td>Максимальный уровень зума исходных тайлов. Если значение установлено, на всех уровнях зума больших <code>maxNativeZoom</code> будут отображены смасштабированные тайлы максимально доступного зума.</td>
	</tr>
	<tr>
		<td><code><b>tileSize</b></code></td>
		<td><code>Number</code></td>
		<td><code>256</code></td>
		<td>Размер тайла (ширина и высота в пикселях, предполагается что тайл квадратный).</td>
	</tr>
	<tr>
		<td><code><b>subdomains</b></code></td>
		<td><code>String</code> or <code>String[]</code></td>
		<td><code>'abc'</code></td>
		<td>Поддомены тайлового сервиса. Могут передаваться одной строкой (где каждая буква &mdash; имя поддомена) или массивом строк.</td>
	</tr>
	<tr>
		<td><code><b>errorTileUrl</b></code></td>
		<td><code>String</code></td>
		<td><code>''</code></td>
		<td>URL тайла, который будет показан в случае ошибки загрузки.</td>
	</tr>
	<tr>
		<td><code><b>attribution</b></code></td>
		<td><code>String</code></td>
		<td><code>''</code></td>
		<td>Копирайты слоя.</td>
	</tr>
	<tr>
		<td><code><b>tms</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Если <code>true</code>, тогда для тайлов выполняется инверсия нумерации по оси Y (актуально для TMS сервисов).</td>
	</tr>
	<tr>
		<td><code><b>continuousWorld</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Если установлено значение <code>true</code>, тогда координаты тайлов не будут "заворачиваться" по ширине (от -180&deg; до 180&deg; долготы) или высоте (от -90&deg; до 90&deg; широты). Удобно, если вы используете API для собственных карт, не отражающих реальный мир (например, игры, карты помещений, фото).</td>
	</tr>
	<tr>
		<td><code><b>noWrap</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Если установлено значение <code>true</code>, тогда тайлы не будут загружаться за пределами указанной ширины мира (от -180&deg; до 180&deg; долготы).</td>
	</tr>
	<tr>
		<td><code><b>zoomOffset</b></code></td>
		<td><code>Number</code></td>
		<td><code>0</code></td>
		<td>Значение, на которое будет смещен уровень масштабирования в адресе тайла.</td>
	</tr>
	<tr>
		<td><code><b>zoomReverse</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Если установлено значение <code>true</code>, тогда уровень масштабирования в адресе тайла будет обратным (<code>maxZoom - zoom</code> вместо <code>zoom</code>).</td>
	</tr>
	<tr>
		<td><code><b>opacity</b></code></td>
		<td><code>Number</code></td>
		<td><code>1.0</code></td>
		<td>Прозрачность тайлового слоя.</td>
	</tr>
	<tr>
		<td><code><b>zIndex</b></code></td>
		<td><code>Number</code></td>
		<td><code>null</code></td>
		<td>Указывает z-index тайлового слоя. По умолчанию не установлен.</td>
	</tr>
	<tr>
		<td><code><b>unloadInvisibleTiles</b></code></td>
		<td><code>Boolean</code></td>
		<td>depends</td>
		<td>Если установлено значение <code>true</code>, тогда все тайлы которые выходят за область видимости удаляются после перемещения карты (для лучшей производительности). По умолчанию <code>true</code> для мобильного WebKit, в остальных случаях <code>false</code>.</td>
	</tr>
	<tr>
		<td><code><b>updateWhenIdle</b></code></td>
		<td><code>Boolean</code></td>
		<td>depends</td>
		<td>Если установлено значение <code>false</code>, тогда новые тайлы подгружаются во время перетаскивания карты, иначе только по завершению перетаскивания (для лучшей производительности). По умолчанию <code>true</code> для мобильного WebKit, в остальных случаях <code>false</code>.</td>
	</tr>
	<tr>
		<td><code><b>detectRetina</b></code></td>
		<td><code><code>Boolean</code></code></td>
		<td><code>false</code></td>
		<td>Если установлено значение <code>true</code> и у пользователя устройство с Retina экраном, тогда вместо одного тайла будет загружено 4 с большим уровнем масштабирования, также изображениям устанавливается размер на 50% меньше их реального разрешения. Таким образом достигается лучшее качество отображения тайлов на экранах с высоким разрешением.</td>
	</tr>
	<tr>
		<td><code><b>reuseTiles</b></code></td>
		<td><code><code>Boolean</code></code></td>
		<td><code>false</code></td>
		<td>Если установлено значение <code>true</code>, тогда все тайлы которые не видны после изменения центра карты добавляются в очередь переиспользования, из которой они будут взяты, если опять попадут в область видимости.</td>
	</tr>
</table>

### События

Вы можете подписаться на следующие события используя [эти методы][39].
<table>
	<tr>
		<th>Событие</th>
		<th>Данные</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>loading</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при начале загрузки тайлов.</td>
	</tr>
	<tr>
		<td><code><b>load</b></code></td>
		<td><code><a href="#event">Event</a></code>
		<td>Вызывается при окончании загрузки видимых тайлов.</td>
	</tr>
	<tr>
      <td><code><b>tileloadstart</b></code></td>
      <td><code><a href="#tile-event">TileEvent</a></code></td>
      <td>Вызывается при запросе тайла и начале его загрузки.</td>
    </tr>
	<tr>
		<td><code><b>tileload</b></code></td>
		<td><code><a href="#tile-event">Event</a></code>
		<td>Вызывается после загрузки тайла.</td>
	</tr>
	<tr>
		<td><code><b>tileunload</b></code></td>
		<td><code><a href="#tile-event">Event</a></code>
		<td>Вызывается при удалении тайла (например, при включенном режиме <code>unloadInvisibleTiles</code>).</td>
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

		<td><code>this</code></td>
		<td>Добавляет слой на карту.</td>
	</tr>
	<tr>
		<td><code><b>bringToFront</b>()</code></td>
		<td><code>this</code></td>
		<td>Позиционирует тайловый слой поверх других слоев.</td>
	</tr>
	<tr>
		<td><code><b>bringToBack</b>()</code></td>
		<td><code>this</code></td>
		<td>Позиционирует тайловый слой под другими слоями.</td>
	</tr>
	<tr>
		<td><code><b>setOpacity</b>(
			<nobr>&lt;Number&gt; <i>opacity</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Изменяет прозрачность тайлового слоя.</td>
	</tr>
	<tr>
		<td><code><b>setZIndex</b>(
			<nobr>&lt;Number&gt; <i>zIndex</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Устанавливает z-index тайлового слоя.</td>
	</tr>
	<tr>
		<td><code><b>redraw</b>()</code></td>
		<td><code>this</code></td>
		<td>Очищает все текущие тайлы и запрашивает новые.</td>
	</tr>
	<tr>
		<td><code><b>setUrl</b>(
			<nobr>&lt;String&gt; <i><a href="#url-template">urlTemplate</a></i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Обновляет URL шаблон слоя и перерисовывает его.</td>
	</tr>
	<tr>
		<td><code><b>getContainer</b>()</nobr>
		</code></td>
		<td><code>HTMLElement</code></td>
		<td>Возвращает HTML элемент, который содержит тайлы данного слоя.</td>
	</tr>
</table>

## L.TileLayer.WMS

Используется для отображения данных WMS сервисов. Расширяет [TileLayer][13].

### Пример использования

	var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
		layers: 'nexrad-n0r-900913',
		format: 'image/png',
		transparent: true,
		attribution: "Weather data © 2012 IEM Nexrad"
	});

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.TileLayer.WMS</b>(
			<nobr>&lt;String&gt; <i>baseUrl</i></nobr>,
			<nobr>&lt;<a href="#tilelayer-wms-options">TileLayer.WMS options</a>&gt; <i>options</i> )</nobr>
		</code></td>

		<td>
			<code>L.tileLayer.wms(&hellip;)</code>
		</td>

		<td>Создает объект тайлового WMS слоя по переданному URL WMS-сервиса и объекту опций.</td>
	</tr>
</table>


### Опции

Включает все [опции TileLayer][83] и дополнительные:
<table>
	<tr>
		<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>layers</b></code></td>
		<td><code>String</code></td>
		<td><code>''</code></td>
		<td>(обязательная) Список WMS слоев для отображения, разделяются запятой.</td>
	</tr>
	<tr>
		<td><code><b>styles</b></code></td>
		<td><code>String</code></td>
		<td><code>''</code></td>
		<td>Список WMS стилей, разделяются запятой.</td>
	</tr>
	<tr>
		<td><code><b>format</b></code></td>
		<td><code>String</code></td>
		<td><code>'image/jpeg'</code></td>
		<td>Формат WMS-изображений (используйте <code>'image/png'</code> для слоев с прозрачностью).</td>
	</tr>
	<tr>
		<td><code><b>transparent</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Если установлено значение <code>true</code>, тогда WMS сервис вернет изображения с прозрачностью.</td>
	</tr>
	<tr>
		<td><code><b>version</b></code></td>
		<td><code>String</code></td>
		<td><code>'1.1.1'</code></td>
		<td>Используемая версия WMS сервиса.</td>
	</tr>
	<tr>
		<td><code><b>crs</b></code></td>
		<td><code><a href="#icrs">CRS</a></code></td>
		<td><code>null</code></td>
		<td>Система координат, используемая в WMS-запросах. По умолчанию соответствует системе координат карты.</td>
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
		<td><code>this</code></td>
		<td>Сливает объект с новыми параметрами и перезапрашивает тайлы текущей области видимости (если опция <code>noRedraw</code> не установлена в <code>true</code>).</td>
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
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.TileLayer.Canvas</b>(
			<nobr>&lt;<a href="#tilelayer-options">TileLayer options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td>
			<code>L.tileLayer.canvas(&hellip;)</code>
		</td>
		<td>Создает объект canvas-слоя с необязательными опциями.</td>
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
		<td><code>false</code></td>
		<td>Указывает на то, что тайлы будут отрисовываться асинхронно. Метод <a href="#tilelayer-canvas-tiledrawn">tileDrawn</a> должен быть вызван для каждого тайла после завершения отрисовки.</td>
	</tr>
</table>

### Методы
<table>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr id = "tilelayer-canvas-drawtile">
		<td><code><b>drawTile</b>(
			<nobr>&lt;HTMLCanvasElement&gt; <i>canvas</i></nobr>,
			<nobr>&lt;<a href="#point">Point</a>&gt; <i>tilePoint</i></nobr>,
			<nobr>&lt;Number&gt; <i>zoom</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Чтобы отрисовать тайлы, нужно определить этот метод после создания экземпляра класса. <code>canvas</code> &mdash; элемент canvas, на котором будут отрисовываться тайлы, <code>tilePoint</code> &mdash; номер тайла, и <code>zoom</code> &mdash; текущий уровень зума.</td>
	</tr>
	<tr id="tilelayer-canvas-tiledrawn">
		<td><code><b>tileDrawn</b>( <nobr>&lt;HTMLCanvasElement&gt; <i>canvas</i></nobr> )</code></td>
		<td>-</td>
		<td>Если опция <code>async</code> задана, тогда эту функцию необходимо вызывать каждый раз после отрисовки тайла. <code>canvas</code> &mdash; это тот же элемент, что передается в <a href="#tilelayer-canvas-drawtile">drawTile</a>.</td>
	</tr>
</table>

## L.ImageOverlay

Используется для загрузки и отображения одного изображения в определенной области карты, реализует интерфейс [ILayer][52].

### Пример использования

	var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
		imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];

	L.imageOverlay(imageUrl, imageBounds).addTo(map);

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.ImageOverlay</b>(
			<nobr>&lt;String&gt; <i>imageUrl</i></nobr>,
			<nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
			<nobr>&lt;<a href="#imageoverlay-options">ImageOverlay options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.imageOverlay(&hellip;)</code>
		</td>

		<td>Создает объект изображения дополнительного слоя по переданному URL и географическим координатам, к которым оно привязано.</td>
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
		<td><code><b>opacity</b></code></td>
		<td><code>Number</code></td>
		<td><code>1.0</code></td>
		<td>Прозрачность слоя.</td>
	</tr>
	<tr>
		<td><code><b>attribution</b></code></td>
		<td><code>String</code></td>
		<td><code>''</code></td>
		<td>Текст аттрибуции слоя.</td>
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

		<td><code>this</code></td>
		<td>Добавляет слой на карту.</td>
	</tr>
	<tr>
		<td><code><b>setOpacity</b>(
			<nobr>&lt;Number&gt; <i>opacity</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Устанавливает прозрачность слоя.</td>
	</tr>
	<tr>
		<td><code><b>setUrl</b>(
		<nobr>&lt;String&gt; <i>imageUrl</i> )</nobr>
		</code></td>

		<td><code><span>this</span></code></td>
		<td>Меняет URL адрес изображения.</td>
	</tr>
	<tr>
		<td><code><b>bringToFront</b>()</code></td>
		<td><code>this</code></td>
		<td>Позиционирует слой поверх остальных.</td>
	</tr>
	<tr>
		<td><code><b>bringToBack</b>()</code></td>
		<td><code>this</code></td>
		<td>Позиционирует слой под остальными.</td>
	</tr>
</table>

## L.Path

Абстрактный класс, содержащий опции и константы векторных слоев (Polygon, Polyline, Circle). Никогда не используется напрямую.

### Опции
<table>
	<tr>
		<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>stroke</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Рисовать ли границу фигуры. Установите значение в <code>false</code>, чтобы отключить границы многоугольников или кругов.</td>
	</tr>
	<tr>
		<td><code><b>color</b></code></td>
		<td><code>String</code></td>
		<td><code>'#03f'</code></td>
		<td>Цвет границы.</td>
	</tr>
	<tr>
		<td><code><b>weight</b></code></td>
		<td><code>Number</code></td>
		<td><code>5</code></td>
		<td>Ширина границы в пикселях.</td>
	</tr>
	<tr>
		<td><code><b>opacity</b></code></td>
		<td><code>Number</code></td>
		<td><code>0.5</code></td>
		<td>Прозрачность границы.</td>
	</tr>
	<tr>
		<td><code><b>fill</b></code></td>
		<td><code>Boolean</code></td>
		<td>depends</td>
		<td>Заполнять ли геометрии цветом. Установите значение в <code>false</code>, чтобы отключить заполнение многоугольников или кругов.</td>
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
		<td><code>0.2</code></td>
		<td>Прозрачность заливки.</td>
	</tr>
	<tr>
		<td><code><b>dashArray</b></code></td>
		<td><code>String</code></td>
		<td><code>null</code></td>
		<td>Строка <a href="https://developer.mozilla.org/en/SVG/Attribute/stroke-dasharray">шаблона границы</a>. Не работает на canvas слоях (например, Android 2).</td>
	</tr>
	<tr>
		<td><code><b>lineCap</b></code></td>
		<td><code>String</code></td>
		<td><code>null</code></td>
		<td>Определяет <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap">фигуру, которая будет использована как наконечник</a> геометрии, если у нее задана граница(stroke).</td>
	</tr>
	<tr>
		<td><code><b>lineJoin</b></code></td>
		<td><code>String</code></td>
		<td><code>null</code></td>
		<td>Определяет <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin">фигуру, которая будет использована на углах изгибов</a> геометрии, если у нее задана граница(stroke).</td>
	</tr>
	<tr>
		<td><code><b>clickable</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>true</code></td>
		<td>Если установлено значение <code>false</code>, тогда события мышки геометрии не обрабатываются.</td>
	</tr>
	<tr>
		<td><code><b>pointerEvents</b></code></td>
		<td><code>String</code></td>
		<td><code><span class="literal">null</span></code></td>
		<td>Устанавливает геометрии атрибут <code>pointer-events</code>, если для отрисовки используется SVG.</td>
	</tr>
	<tr>
		<td><code><b>className</b></code></td>
		<td><code>String</code></td>
		<td><code>''</code></td>
		<td>Добавляет класс в соотвествующий аттрибут элемента.</td>
	</tr>
</table>

### События

Вы можете подписаться на следующие события используя [эти методы][39].
<table>
	<tr>
		<th>Событие</th>
		<th>Данные</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>click</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при клике на объект.</td>
	</tr>
	<tr>
		<td><code><b>dblclick</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при двойном клике на объект.</td>
	</tr>
	<tr>
		<td><code><b>mousedown</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается когда пользователь нажимает кнопку мышки на объекте.</td>
	</tr>
	<tr>
		<td><code><b>mouseover</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при наведении курсора мышки на объект.</td>
	</tr>
	<tr>
		<td><code><b>mouseout</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается когда курсор мышки покидает область объекта.</td>
	</tr>
	<tr>
		<td><code><b>contextmenu</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при нажатии правой кнопкой мышки на объекте, предотвращает появление стандартного контекстного меню браузера.</td>
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
	<tr>
		<td><code><b>popupopen</b></code></td>
		<td><code><a href="#popup-event">PopupEvent</a></code></td>
		<td>Вызывается при открытии прикрепленного к геометрии балуна.</td>
	</tr>
	<tr>
		<td><code><b>popupclose</b></code></td>
		<td><code><a href="#popup-event">PopupEvent</a></code></td>
		<td>Вызывается при закрытии прикрепленного к геометрии балуна.</td>
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

		<td><code>this</code></td>
		<td>Добавляет слой на карту.</td>
	</tr>
	<tr id="path-bindpopup">
		<td><code><b>bindPopup</b>(
			<nobr>&lt;String&gt; <i>html</i> |</nobr> <nobr>&lt;HTMLElement&gt; <i>el</i> |</nobr> <nobr>&lt;<a href="#popup">Popup</a>&gt; <i>popup</i>,</nobr>
			<nobr>&lt;<a href="#popup-options">Popup options</a>&gt; <i>options?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Привязывает отображение балуна с HTML содержимым по клику на геометрию.</td>
	</tr>
	<tr id="path-unbindpopup">
		<td><code><b>unbindPopup</b>()</code></td>
		<td><code>this</code></td>
		<td>Отключает отображение балуна с HTML содержимым по клику на геометрию.</td>
	</tr>
	<tr id="path-openpopup">
		<td><code><b>openPopup</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng?</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Открывает балун, предварительно привязанный методом <a href="#path-bindpopup">bindPopup</a> в указанной точке.</td>
	</tr>
	<tr>
		<td><code><b>getPopup</b>()</code></td>
		<td><code><a href="#popup">Popup</a>&gt; <i>popup</i></code></td>
		<td>Возвращает балун, предварительно привязанный методом <a href="#path-bindpopup">bindPopup</a>.</td>
    </tr>
	<tr id="path-closepopup">
		<td><code><b>closePopup</b>()</code></td>

		<td><code>this</code></td>
		<td>Закрывает балун, привязанный к геометрии, если тот был открыт.</td>
	</tr>
	<tr id="path-setstyle">
		<td><code><b>setStyle</b>(
			<nobr>&lt;<a href="#path-options">Path options</a>&gt; <i>object</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Изменяет внешний вид геометрии указанный в <a href="#path-options">опциях класса Path</a>.</td>
	</tr>
	<tr id="path-getbounds">
		<td><code><b>getBounds</b>()</code></td>
		<td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
		<td>Возвращает прямоугольные границы геометрии.</td>
	</tr>
	<tr>
		<td><code><b>bringToFront</b>()</code></td>
		<td><code>this</code></td>
		<td>Позиционирует слой поверх всех остальных.</td>
	</tr>
	<tr>
		<td><code><b>bringToBack</b>()</code></td>
		<td><code>this</code></td>
		<td>Позиционирует слой под остальными.</td>
	</tr>
	<tr>
		<td><code><b>redraw</b>()</code></td>
		<td><code>this</code></td>
		<td>Перерисовывает слой. Удобно при изменении координат описывающих геометрию.</td>
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
		<td>True при рендеринге с использованием SVG (true в большинстве современных браузеров).</td>
	</tr>
	<tr>
		<td><code>VML</code></td>
		<td><code>Boolean</code></td>
		<td>depends</td>
		<td>True при рендеринге с использованием VML (IE 6-8).</td>
	</tr>
	<tr>
		<td><code>CANVAS</code></td>
		<td><code>Boolean</code></td>
		<td>depends</td>
		<td>True при рендеринге с использованием Canvas (Android 2).</td>
	</tr>
	<tr>
		<td><code>CLIP_PADDING</code></td>
		<td><code>Number</code></td>
		<td><nobr><code>0.5</code> for SVG</nobr><br /><nobr><code>0.02</code> for VML</nobr></td>
		<td>Указывает, насколько расширена область обрезания геометрий вокруг текущей области просмотра. Маленькие значения означают, что вы увидите обрезанные геометрии при  перетаскивании, большие понижают скорость отрисовки.</td>
	</tr>
</table>

## L.Polyline

Класс для отрисовки ломаных линий на карте. Расширяет [Path][17]. Используйте [Map#addLayer][81] для добавления на карту.

### Примеры использования

	// создаем красную ломаную из массива географических точек
	var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

	// подстраиваем центр карты и масштаб так, чтобы ломаную было видно
	map.fitBounds(polyline.getBounds());

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.Polyline</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>[]&gt; <i>latlngs</i></nobr>,
			<nobr>&lt;<a href="#polyline-options">Polyline options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.polyline(&hellip;)</code>
		</td>

		<td>Создает объект ломаной по переданному массиву географических точек и необязательному объекту опций.</td>
	</tr>
</table>

### Опции

Возможно использование [опций класса Path][91] и дополнительных опций:
<table>
	<tr>
		<th>Опция</th>
		<th>Тип</th>
		<th>По умолчанию</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>smoothFactor</b></code></td>
		<td><code>Number</code></td>
		<td><code>1.0</code></td>
		<td>Степень упрощения ломаной на каждом уровне масштаба. Большее значение означает выше производительность и меньшее качество, меньшее значение &mdash; лучшее качество, но ниже производительность.</td>
	</tr>
	<tr>
		<td><code><b>noClip</b></code></td>
		<td><code>Boolean</code></td>
		<td><code>false</code></td>
		<td>Отключает обрезание ломаной.</td>
	</tr>
</table>

### Методы

Возможно использование [методов класса Path][93] и дополнительных методов:
<table>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>addLatLng</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Добавляет переданную точку в ломаную.</td>
	</tr>
	<tr>
		<td><code><b>setLatLngs</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>[]&gt; <i>latlngs</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Заменяет все точки ломаной массивом переданных географических точек.</td>
	</tr>
	<tr>
		<td><code><b>getLatLngs</b>()</code></td>
		<td><code><a href="#latlng">LatLng</a>[]</code></td>
		<td>Возвращает массив точек геометрии.</td>
	</tr>
	<tr>
		<td><code><b>spliceLatLngs</b>(
			<nobr>&lt;Number&gt; <i>index</i></nobr>,
			<nobr>&lt;Number&gt; <i>pointsToRemove</i></nobr>,
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng?</i>, &hellip; )</nobr>
		</code></td>
		<td><code><a href="#latlng">LatLng</a>[]</code></td>
		<td>Позволяет добавлять, удалять или заменять точки в ломаной. Синтаксис аналогичен <a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice">Array#splice</a>. Возвращает массив удаленных точек.</td>
	</tr>
	<tr id="path-getbounds">
		<td><code><b>getBounds</b>()</code></td>
		<td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
		<td>Возвращает границы ломаной.</td>
	</tr>
	<tr id="polyline-togeojson">
		<td><code><b>toGeoJSON</b>()</code></td>
		<td><code>Object</code></td>
		<td>Возвращает <a href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a> представление ломаной (GeoJSON LineString).</td>
	</tr>
</table>

## L.MultiPolyline

Расширяет [FeatureGroup][26] и позволяет создавать мультиполилайны (один слой, содержащий несколько ломаных с общими стилями и балуном).

### Constructor
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.MultiPolyline</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>[][]&gt; <i>latlngs</i></nobr>,
			<nobr>&lt;<a href="#polyline-options">Polyline options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.multiPolyline(&hellip;)</code>
		</td>

		<td>Создает объект мультиполилайна по переданному массиву массивов географических точек (каждый для своей ломаной) и необязательному объекту опций.</td>
	</tr>
</table>

### Методы

<p>Мультиполилайны содержат все методы класса <a href="#polyline">Polyline</a>, но их поведение отличается, так как мультиполилайны содержат несколько ломаных.</p>

<table data-id='multipolyline'>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>setLatLngs</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>[][]&gt; <i>latlngs</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Заменяет все геометрии ломаных новыми на основе переданного многомерного массива географических координат.</td>
    </tr>
	<tr>
		<td><code><b>getLatLngs</b>()</td>

		<td><code><nobr>&lt;<a href="#latlng">LatLng</a>[][]&gt; <i>latlngs</i></nobr>
		</code></td>
		<td>Возвращает многомерный массив географических координат каждой ломаной.</td>
    </tr>
    <tr>
		<td><code><b>openPopup</b>()</code></td>
		<td><code>this</code></td>
		<td>Открывает балун, предварительно прикрепленный с помощью метода <a href="#marker-bindpopup">bindPopup</a>.</td>
	</tr>
	<tr id="multipolyline-togeojson">
		<td><code><b>toGeoJSON</b>()</code></td>
		<td><code>Object</code></td>
		<td>Возвращает <a href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a> представление мультиполилайна (GeoJSON MultiLineString).</td>
	</tr>
</table>


## L.Polygon

Класс для отрисовки многоугольников на карте. Расширяет [Polyline][18]. Используйте [Map#addLayer][81] для добавления на карту.

Обратите внимание на то, что среди точек которые передаются для создания многоугольника не должно быть дополнительной точки, совпадающей с первой.

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.Polygon</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>[]&gt; <i>latlngs</i></nobr>,
			<nobr>&lt;<a href="#polyline-options">Polyline options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.polygon(&hellip;)</code>
		</td>

		<td>Создает объект многоугольника по переданному массиву географических точек и необязательному объекту опций. Возможно также создать многоугольник с дырами, передав массив массивов latlngs, первый latlngs массив отвечает за внешние границы, остальные описывают дыру внутри.</td>
	</tr>
</table>


### Методы

У многоугольника те же опции и методы, что и у ломаной, но с некоторыми отличиями.

<table>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>toGeoJSON</b>()</code></td>
		<td><code>Object</code></td>
		<td>Возвращает <a href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a> представление многоугольника (GeoJSON Polygon).</td>
	</tr>
</table>

## L.MultiPolygon

Расширяет [FeatureGroup][26], позволяя создавать мультиполигоны (один слой, содержащий несколько многоугольников с общими стилями и балуном).

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.MultiPolygon</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>[][]&gt; <i>latlngs</i></nobr>,
			<nobr>&lt;<a href="#polyline-options">Polyline options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.multiPolygon(&hellip;)</code>
		</td>

		<td>Создает объект мультиполигона по переданному массиву массивов географических точек (каждый для своего многоугольника) и необязательному объекту опций.</td>
	</tr>
</table>

### Methods

<p>Мультиполигоны содержат все методы класса <a href="#polyline">Polyline</a>, но их поведение отличается, так как мультиполилайны содержат несколько многоугольников.</p>

<table data-id='multipolygon'>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>setLatLngs</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>[][]&gt; <i>latlngs</i> )</nobr>
		</code></td>

		<td><code><span class="keyword">this</span></code></td>
		<td>Заменяет все геометрии многоугольников новыми на основе переданного многомерного массива географических координат.</td>
    </tr>
	<tr>
		<td><code><b>getLatLngs</b>()</td>

		<td><code><nobr>&lt;<a href="#latlng">LatLng</a>[][]&gt; <i>latlngs</i></nobr>
		</code></td>
		<td>Возвращает многомерный массив географических координат каждого многоугольника.</td>
    </tr>
    <tr>
		<td><code><b>openPopup</b>()</code></td>
		<td><code>this</code></td>
		<td>Открывает балун, предварительно прикрепленный с помощью метода <a href="#marker-bindpopup">bindPopup</a>.</td>
	</tr>
	<tr id="multipolygon-togeojson">
		<td><code><b>toGeoJSON</b>()</code></td>
		<td><code>Object</code></td>
		<td>Возвращает <a href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a> представление мультиполигона (GeoJSON MultiPolygon).</td>
	</tr>
</table>


## L.Rectangle

Класс для отрисовки прямоугольников на карте. Расширяет [Polygon][20]. Используйте [Map#addLayer][81] для добавления на карту.

### Пример использования

	// создаем географические границы прямоугольника
	var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];

	// создаем оранжевый прямоугольник
	L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);

	// подстраиваем центр карты и масштаб так, чтобы прямоугольник было видно
	map.fitBounds(bounds);

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.Rectangle</b>(
			<nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
			<nobr>&lt;<a href="#path-options">Path options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.rectangle(&hellip;)</code>
		</td>

		<td>Создает объект прямоугольника по переданным географическим границам и необязательному объекту опций.</td>
	</tr>
</table>

### Методы

Возможно использование [методов класса Path][93] и дополнительно следующих методов:

<table>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>setBounds</b>(
			<nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>bounds</i> )</nobr>
			</code>
		</td>

		<td><code>this</code></td>
		<td>Перерисовывает прямоугольник согласно переданных границ.</td>
	</tr>
</table>

## L.Circle

Класс для отрисовки круга на карте. Расширяет [Path][17]. Используйте [Map#addLayer][81] для добавления на карту.

	L.circle([50.5, 30.5], 200).addTo(map);

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.Circle</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i></nobr>,
			<nobr>&lt;Number&gt; <i>radius</i></nobr>,
			<nobr>&lt;<a href="#path-options">Path options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.circle(&hellip;)</code>
		</td>

		<td>Создает объект круга по переданной географической точке, радиусу в метрах и необязательному объекту опций.</td>
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
		<td><code><b>getLatLng</b>()</code></td>
		<td><code><a href="#latlng">LatLng</a></code></td>
		<td>Возвращает текущее географическое положение круга.</td>
	</tr>
	<tr>
		<td><code><b>getRadius</b>()</code></td>
		<td><code>Number</code></td>
		<td>Возвращает текущий радиус круга, значение в метрах.</td>
	</tr>
	<tr>
		<td><code><b>setLatLng</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Устанавливает новое положение круга.</td>
	</tr>
	<tr>
		<td><code><b>setRadius</b>(
			<nobr>&lt;Number&gt; <i>radius</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Устанавливает радиус круга, значение в метрах.</td>
	</tr>
	<tr>
		<td><code><b>toGeoJSON</b>()</code></td>
		<td><code>Object</code></td>
		<td>Возвращает <a href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a> представление круга (GeoJSON Point).</td>
	</tr>
</table>

## L.CircleMarker

Круг фиксированного размера с радиусом указанным в пикселях. Расширяет [Circle][23]. Используйте [Map#addLayer][81] для добавления на карту.

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.CircleMarker</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i></nobr>,
			<nobr>&lt;<a href="#path-options">Path options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.circleMarker(&hellip;)</code>
		</td>

		<td>Создает объект круга по переданной географической точке и необязательному объекту опций. Значение радиуса по умолчанию &mdash; 10 пикселей.</td>
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
		<td><code><b>setLatLng</b>(
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Устанавливает позицию круга.</td>
	</tr>
	<tr>
		<td><code><b>setRadius</b>(
			<nobr>&lt;Number&gt; <i>radius</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Устанавливает радиус круга, значение в пикселях.</td>
	</tr>
	<tr>
		<td><code><b>toGeoJSON</b>()</code></td>
		<td><code>Object</code></td>
		<td>Возвращает <a href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a> представление круга (GeoJSON Point).</td>
	</tr>
</table>

## L.LayerGroup

Используется для группировки нескольких слоев, чтобы обрабатывать их как один. Если группа добавлена на карту, тогда удалив элемент из группы он удаляется и с карты. Реализует интерфейс [ILayer][52].

	L.layerGroup([marker1, marker2])
		.addLayer(polyline)
		.addTo(map);

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.LayerGroup</b>(
			<nobr>&lt;<a href="#ilayer">ILayer</a>[]&gt; <i>layers?</i> )</nobr>
		</code></td>

		<td>
			<code>L.layerGroup(&hellip;)</code>
		</td>

		<td>Создает объект группы, принимает начальный набор слоев для группировки (опционально).</td>
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

		<td><code>this</code></td>
		<td>Добавляет группу слоев на карту.</td>
	</tr>
	<tr>
		<td><code><b>addLayer</b>(
			<nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Добавляет указанный слой в группу.</td>
	</tr>
	<tr>
		<td><code><b>removeLayer</b>(
			<nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i> | &lt;String&gt; <i>id</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Удаляет указанный слой из группы.</td>
	</tr>
	<tr>
		<td><code><b>hasLayer</b>(
			<nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
		</code></td>

		<td><code>Boolean</code></td>
		<td>Возвращает <code>true</code>, если переданный слой уже добавлен в группу.</td>
	</tr>
	<tr>
		<td><code><b>getLayer</b>(
			<nobr>&lt;String&gt; <i>id</i> )</nobr>
		</code></td>

		<td><code><a href="#ilayer">ILayer</a></code></td>
		<td>Возвращает слой по переданному id.</td>
	</tr>
	<tr>
		<td><code><b>getLayers</b>()</code></td>
		<td><code>Array</code></td>
		<td>Возвращает массив всех слоев группы.</td>
	</tr>
	<tr>
		<td><code><b>clearLayers</b>()</code></td>
		<td><code>this</code></td>
		<td>Удаляет все слои из группы.</td>
	</tr>
	<tr>
		<td><code><b>eachLayer</b>(
			<nobr>&lt;Function&gt; <i>fn</i></nobr>,
			<nobr>&lt;Object&gt; <i>context?</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Обходит циклом все слои группы, опционально можно передать контекст исполнения функции итератора.
<pre><code>group.eachLayer(function (layer) {
	layer.bindPopup('Hello');
});</code></pre>
		</td>
	</tr>
	<tr>
		<td><code><b>toGeoJSON</b>()</code></td>
		<td><code>Object</code></td>
		<td>Возвращает <a href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a> представление группы (GeoJSON FeatureCollection).</td>
	</tr>
</table>

## L.FeatureGroup

Расширяет [LayerGroup][25], включает в себя события мышки (инициированные членами группы) и общий метод bindPopup. Реализует интерфейс [ILayer][52].

	L.featureGroup([marker1, marker2, polyline])
		.bindPopup('Hello world!')
		.on('click', function() { alert('Clicked on a group!'); })
		.addTo(map);

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.FeatureGroup</b>(
			<nobr>&lt;<a href="#ilayer">ILayer</a>[]&gt; <i>layers?</i> )</nobr>
		</code></td>

		<td>
			<code>L.featureGroup(&hellip;)</code>
		</td>

		<td>Создает объект группы, принимает начальный набор слоев для группировки (опционально).</td>
	</tr>
</table>

### Методы

Содержит все методы [LayerGroup][25] и дополнительно:
<table>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>bindPopup</b>(
			<nobr>&lt;String&gt; <i>htmlContent</i></nobr>,
			<nobr>&lt;<a href="#popup-options">Popup options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Связывает балун с указанным HTML содержимым со слоями группы, у которых есть метод <code>bindPopup</code>.</td>
	</tr>
	<tr>
		<td><code><b>getBounds</b>()</code></td>
		<td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
		<td>Возвращает прямоугольные границы элемента FeatureGroup (создается исходя из границ и координат дочерних элементов).</td>
	</tr>
	<tr>
		<td><code><b>setStyle</b>(
			<nobr>&lt;<a href="#path-options">Path options</a>&gt; <i>style</i> )</nobr>
		</code></td>
		<td><code>this</code></td>
		<td>Устанавливает переданные опции для каждого слоя группы, у которого есть метод <code>setStyle</code>.</td>
	</tr>
	<tr>
		<td><code><b>bringToFront</b>()</code></td>
		<td><code>this</code></td>
		<td>Позиционирует слой группы поверх остальных слоев.</td>
	</tr>
	<tr>
		<td><code><b>bringToBack</b>()</code></td>
		<td><code>this</code></td>
		<td>Позиционирует слой группы под остальными слоями.</td>
	</tr>
</table>

### События

Вы можете подписаться на следующие события используя [эти методы][39].

<table>
	<tr>
		<th>Событие</th>
		<th>Данные</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>click</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при клике на группу.</td>
	</tr>
	<tr>
		<td><code><b>dblclick</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при двойном клике на группу.</td>
	</tr>
	<tr>
		<td><code><b>mouseover</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при наведении курсора мышки на группу.</td>
	</tr>
	<tr>
		<td><code><b>mouseout</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается когда курсор мышки покидает группу.</td>
	</tr>
	<tr>
		<td><code><b>mousemove</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается когда курсор мышки перемещается над группой.</td>
	</tr>
	<tr>
		<td><code><b>contextmenu</b></code></td>
		<td><code><a href="#mouse-event">MouseEvent</a></code>
		<td>Вызывается при клике правой кнопкой мышки на группу.</td>
	</tr>
	<tr>
		<td><code><b>layeradd</b></code></td>
		<td><code><a href="#layer-event">LayerEvent</a></code>
		<td>Вызывается при добавлении слоя в группу.</td>
	</tr>
	<tr>
		<td><code><b>layerremove</b></code></td>
		<td><code><a href="#layer-event">LayerEvent</a></code>
		<td>Вызывается при удалении слоя из группы.</td>
	</tr>
</table>

## L.GeoJSON

Представляет [GeoJSON][95] слой. Позволяет анализировать данные в формате GeoJSON и отображать их на карте. Расширяет [FeatureGroup][26].

	L.geoJson(data, {
		style: function (feature) {
			return {color: feature.properties.color};
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup(feature.properties.description);
		}
	}).addTo(map);

Каждый созданный слой получает свойство `feature`, которое связывает его с GeoJSON данными, на основе которых он был создан.

### Конструктор
<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.GeoJSON</b>(
			<nobr>&lt;Object&gt; <i>geojson?</i></nobr>,
			<nobr>&lt;<a href="#geojson-options">GeoJSON options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.geoJson(&hellip;)</code>
		</td>

		<td>Создает GeoJSON слой. Опционально принимает объект в <a href="http://geojson.org/geojson-spec.html">формате GeoJSON</a> для отображения на карте (или же можно добавить данные позже, используя метод <code>addData</code>) и объект опций.</td>
	</tr>
</table>

### Опции
<table>
	<tr>
		<th>Опция</th>
		<th>Описание</th>
	</tr>
	<tr id="geojson-pointtolayer">
		<td><code><b>pointToLayer</b>(
			<nobr>&lt;GeoJSON&gt; <i>featureData</i></nobr>,
			<nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
		</code></td>

		<td>Используется для создания GeoJSON точек (если не указана, тогда будут созданы обычные маркеры).</td>
	</tr>
	<tr id="geojson-style">
		<td><code><b>style</b>(
			<nobr>&lt;GeoJSON&gt; <i>featureData</i> )</nobr>
		</code></td>

		<td>Используется для получения стиля векторных слоев, созданных для GeoJSON объектов.</td>
	</tr>
	<tr id="geojson-oneachfeature">
		<td><code><b>onEachFeature</b>(
			<nobr>&lt;GeoJSON&gt; <i>featureData</i></nobr>,
			<nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
		</code></td>

		<td>Вызывается при создании каждого объекта.</td>
	</tr>
	<tr id="geojson-filter">
		<td><code><b>filter</b>(
			<nobr>&lt;GeoJSON&gt; <i>featureData</i></nobr>,
			<nobr>&lt;<a href="#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
		</code></td>

		<td>Функция, которая определяет отображать объект или нет.</td>
	</tr>
	<tr id="geojson-coordstolatlng">
		<td><code><b>coordsToLatLng</b>(
			<nobr>&lt;Array&gt; <i>coords</i></nobr> )</nobr>
		</code></td>

		<td>Функция, которая будет использоваться для преобразования GeoJSON координат в <a href="#latlng">LatLng</a> (если не задана, тогда координаты будут формироваться согласно стандарту WGS84).</td>
	</tr>
</table>

<p>Также принимает все <a href="#path-options">опции</a> для полилайнов и полигонов.</p>

### Методы
<table>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>addData</b>(
			<nobr>&lt;GeoJSON&gt; <i>data</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Добавляет GeoJSON объект на слой.</td>
	</tr>
	<tr id="geojson-setstyle">
		<td><code><b>setStyle</b>(
			<nobr>&lt;Function&gt; <i><a href="#geojson-style">style</a></i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Заменяет стиль векторных GeoJSON слоев переданной функцией.</td>
	</tr>
	<tr id="geojson-resetstyle">
		<td><code><b>resetStyle</b>(
			<nobr>&lt;<a href="#path">Path</a>&gt; <i>layer</i> )</nobr>
		</code></td>

		<td><code>this</code></td>
		<td>Сбрасывает стиль векторного слоя на GeoJSON стиль по умолчанию, полезно для сброса стилей после событий hover.</td>
	</tr>
</table>

### Статические методы
<table>
	<tr>
		<th>Метод</th>
		<th>Возвращает</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>geometryToLayer</b>(
			<nobr>&lt;GeoJSON&gt; <i>featureData</i></nobr>,
			<nobr>&lt;<a href="#geojson-pointtolayer">Function</a>&gt; <i>pointToLayer?</i> )</nobr>
		</code></td>

		<td><code><a href="#ilayer">ILayer</a></code></td>
		<td>Создает слой на основе переданного GeoJSON объекта.</td>
	</tr>
	<tr>
		<td><code><b>coordsToLatlng</b>(
			<nobr>&lt;Array&gt; <i>coords</i></nobr>,
			<nobr>&lt;Boolean&gt; <i>reverse?</i> )</nobr>
		</code></td>

		<td><code><a href="#latlng">LatLng</a></code></td>
		<td>Создает объект <a href="#latlng">LatLng</a> по переданному массиву из двух чисел (широта, долгота), используется для GeoJSON точек. Если опция <code>reverse</code> установлена в <code>true</code>, тогда числа будут восприняты как (долгота, широта).</td>
	</tr>
	<tr>
		<td><code><b>coordsToLatlngs</b>(
			<nobr>&lt;Array&gt; <i>coords</i></nobr>,
			<nobr>&lt;Number&gt; <i>levelsDeep?</i></nobr>,
			<nobr>&lt;Boolean&gt; <i>reverse?</i> )</nobr>
		</code></td>

		<td><code>Array</code></td>
		<td>Создает многомерный массив объектов <a href="#latlng">LatLng</a> из массива GeoJSON координат. <code>levelsDeep</code> определяет уровень вложенности (0 &mdash; массив точек, 1 &mdash; массив массивов точек и т.д, по умолчанию 0). Если опция <code>reverse</code> установлена в <code>true</code>, тогда числа будут восприняты как (долгота, широта).</td>
	</tr>
</table>

## L.LatLng

Географическая точка с определенной широтой и долготой.

    var latlng = L.latLng(50.5, 30.5);

Все методы, которые принимают объекты LatLng также принимают широту и долготу в виде простого массива или объекта, то есть данные записи эквивалентны:

    map.panTo(L.latLng(50, 30));
	map.panTo([50, 30]);
	map.panTo({lon: 30, lat: 50});
	map.panTo({lat: 50, lng: 30});

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>
            <code><b>L.LatLng</b>(
            &lt;Number&gt; <i>latitude</i>,
            &lt;Number&gt; <i>longitude</i> )</code>,
            &lt;Number&gt; <i>altitude?</i> )</code>
        </td>
        <td>
            <code>L.latLng(…)</code>
            <code>L.latLng([…]</code>
        </td>
        <td>Создает объект, представляющий географическую точку с определенной широтой и долготой (и опционально высоту).</td>
    </tr>
</table>

### Свойства

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>lat</b></code></td>
        <td><code>Number</code></td>
        <td>Широта в градусах.</td>
    </tr>
    <tr>
        <td><code><b>lng</b></code></td>
        <td><code>Number</code></td>
        <td>Долгота в градусах.</td>
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
        <td><code><b>distanceTo</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>otherLatlng</i> )</nobr>
        </code></td>

        <td><code>Number</code></td>
        <td>Возвращает расстояние (в метрах) до переданной широты и долготы, рассчитывается по формуле Haversine. См. <a href="http://en.wikipedia.org/wiki/Haversine_formula">описание в Wikipedia</a></td>
    </tr>
    <tr>
        <td><code><b>equals</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>otherLatlng</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если переданная широта и долгота находится в той же позиции (с небольшой погрешностью).</td>
    </tr>
    <tr>
        <td><code><b>toString</b>()</code></td>
        <td><code>String</code></td>
        <td>Возвращает строковое представление точки (для отладки).</td>
    </tr>
</table>

### Константы

<table>
    <tr>
        <th>Константа</th>
        <th>Тип</th>
        <th>Значение</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>DEG_TO_RAD</b></code></td>
        <td><code>Number</code></td>
        <td><code>Math.PI / 180</code></td>
        <td>Коэффициент для конвертации градусов в радианы.</td>
    </tr>
    <tr>
        <td><code><b>RAD_TO_DEG</b></code></td>
        <td><code>Number</code></td>
        <td><code>180 / Math.PI</code></td>
        <td>Коэффициент для конвертации радиан в градусы.</td>
    </tr>
    <tr>
        <td><code><b>MAX_MARGIN</b></code></td>
        <td><code>Number</code></td>
        <td><code>1.0E-9</code></td>
        <td>Максимальная погрешность для проверки равенства.</td>
    </tr>
</table>

## L.LatLngBounds

Прямоугольная географическая область на карте.

    var southWest = L.latLng(40.712, -74.227),
        northEast = L.latLng(40.774, -74.125),
        bounds = L.latLngBounds(southWest, northEast);

Все методы, которые принимают объекты LatLngBounds также принимают их в виде простого массива, то есть границы могут быть указаны как в этом примере:

    map.fitBounds([
        [40.712, -74.227],
        [40.774, -74.125]
    ]);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>
            <code><b>L.LatLngBounds</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>southWest</i></nobr>,
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>northEast</i></nobr> )</code>
        </td>

        <td>
            <code>L.latLngBounds(&hellip;)</code><br />
            <code>L.latLngBounds([&hellip;])</code>
        </td>

        <td>Создает объект LatLngBounds с определенными юго-западным и северо-восточным углами прямоугольника.</td>
    </tr>
    <tr>
        <td><code><b>L.LatLngBounds</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>[]&gt; <i>latlng</i> )</nobr>
        </code></td>
        <td>
            <code>L.latLngBounds(&hellip;)</code>
        </td>
        <td>Создает объект LatLngBounds на основе географических точек, которые находятся внутри. Удобно использовать, если необходимо подстроить центр и масштаб карты с помощью метода <a href="#map-fitbounds">fitBounds</a>.</td>
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
        <td><code><b>extend</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>|<a href="#latlngbounds">LatLngBounds</a>&gt; <i>latlng</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Расширяет границы таким образом, чтобы в них входила переданная точка или другие границы.</td>
    </tr>
    <tr>
        <td><code><b>getSouthWest</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает юго-западную точку границ.</td>
    </tr>
    <tr>
        <td><code><b>getNorthEast</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает северо-восточную точку границ.</td>
    </tr>
    <tr>
        <td><code><b>getNorthWest</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает северо-западную точку границ.</td>
    </tr>
    <tr>
        <td><code><b>getSouthEast</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает юго-восточную точку границ.</td>
    </tr>
    <tr>
        <td><code><b>getWest</b>()</code></td>
        <td><code>Number</code></td>
        <td>Возвращает западную долготу границ.</td>
    </tr>
    <tr>
        <td><code><b>getSouth</b>()</code></td>
        <td><code>Number</code></td>
        <td>Возвращает южную широту границ.</td>
    </tr>
    <tr>
        <td><code><b>getEast</b>()</code></td>
        <td><code>Number</code></td>
        <td>Возвращает восточную долготу границ.</td>
    </tr>
    <tr>
        <td><code><b>getNorth</b>()</code></td>
        <td><code>Number</code></td>
        <td>Возвращает северную широту границ.</td>
    </tr>
    <tr>
        <td><code><b>getCenter</b>()</code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Возвращает центральную точку прямоугольной области.</td>
    </tr>
    <tr>
        <td><code><b>contains</b>(
            <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если текущий прямоугольник содержит внутри себя переданный прямоугольник.</td>
    </tr>
    <tr>
        <td><code><b>contains</b>(
            <nobr>&lt;<a href="#latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если прямоугольник содержит внутри себя переданную точку.</td>
    </tr>
    <tr>
        <td><code><b>intersects</b>(
            <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если текущий прямоугольник пересекается с переданным прямоугольником.</td>
    </tr>
    <tr>
        <td><code><b>equals</b>(
            <nobr>&lt;<a href="#latlngbounds">LatLngBounds</a>&gt; <i>otherBounds</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если текущий прямоугольник эквивалентен (с небольшой погрешностью) переданному прямоугольнику.</td>
    </tr>
    <tr>
        <td><code><b>toBBoxString</b>()</code></td>
        <td><code>String</code></td>
        <td>
Возвращает строку с координатами границ в формате <code>'southwest_lng,southwest_lat,northeast_lng,northeast_lat'</code>. Удобно использовать для отправки запросов к веб-сервисам, возвращающим геоданные.</td>
    </tr>
    <tr>
        <td><code><b>pad</b>(
            <nobr>&lt;Number&gt; <i>bufferRatio</i> )</nobr>
        </code></td>
        <td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
        <td>Возвращает большие границы, созданные путем расширения текущих границ на заданный процент в каждом направлении.</td>
    </tr>
    <tr>
        <td><code><b>isValid</b>()</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если если свойства границ инициализированы.</td>
    </tr>
</table>

## L.Point

Точка с пиксельными координатами x и y.

    var point = new L.Point(200, 300);

Все методы, которые принимают объекты Point также принимают координаты в виде простого массива, то есть данные записи эквивалентны:

    map.panBy([200, 300]);
    map.panBy(L.point(200, 300));

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Point</b>(
            <nobr>&lt;Number&gt; <i>x</i>, &lt;Number&gt; <i>y</i></nobr>,
            <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
        </code></td>

        <td>
            <code>L.point(&hellip;)</code><br />
            <code>L.point([&hellip;])</code>
        </td>

        <td>Создает объект Point с координатами <code>x</code> и <code>y</code>. Если опциональный параметр <code>round</code> передан со значением <code>true</code>, тогда координаты будут округлены.</td>
    </tr>
</table>


### Свойства

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>x</b></code></td>
        <td><code>Number</code></td>
        <td>Координата x.</td>
    </tr>
    <tr>
        <td><code><b>y</b></code></td>
        <td><code>Number</code></td>
        <td>Координата y.</td>
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
        <td><code><b>add</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>otherPoint</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает результат сложения текущей и переданной точек.</td>
    </tr>
    <tr>
        <td><code><b>subtract</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>otherPoint</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает результат вычитания переданной точки из текущей.</td>
    </tr>
    <tr>
        <td><code><b>multiplyBy</b>(
            <nobr>&lt;Number&gt; <i>number</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает результат умножения текущей точки на переданное число.</td>
    </tr>
    <tr>
        <td><code><b>divideBy</b>(
            <nobr>&lt;Number&gt; <i>number</i></nobr>,
            <nobr>&lt;Boolean&gt; <i>round?</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает результат деления текущей точки на переданное число. Если опциональный параметр <code>round</code> передан со значением <code>true</code>, тогда результат будет округлен.</td>
    </tr>
    <tr>
        <td><code><b>distanceTo</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>otherPoint</i> )</nobr>
        </code></td>

        <td><code>Number</code></td>
        <td>Возвращает расстояние между текущей и переданной точками.</td>
    </tr>
    <tr>
        <td><code><b>clone</b>()</code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает копию текущей точки.</td>
    </tr>
    <tr>
        <td><code><b>round</b>()</code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает копию текущей точки с округленными координатами.</td>
    </tr>
    <tr>
        <td><code><b>floor</b>()</code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает копию текущей точки с округленными в меньшую сторону координатами.</td>
    </tr>
    <tr>
        <td><code><b>equals</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>otherPoint</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если переданная точка имеет такие же координаты, как и текущая.</td>
    </tr>
    <tr>
        <td><code><b>contains</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>otherPoint</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если обе координаты переданной точки меньше соотвествующих координат текущей точки.</td>
    </tr>
    <tr>
        <td><code><b>toString</b>()</code></td>
        <td><code>String</code></td>
        <td>Возвращает строковое представление точки (для отладки).</td>
    </tr>
</table>

## L.Bounds

Прямоугольная область на карте в пиксельных координатах.

    var p1 = L.point(10, 10),
        p2 = L.point(40, 60),
        bounds = L.bounds(p1, p2);

Все методы, которые принимают объекты Bounds также принимают их в виде простого массива, то есть границы могут быть указаны как в этом примере:

    otherBounds.intersects([[10, 10], [40, 60]]);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Bounds</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>topLeft</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>bottomRight</i> )</nobr>
        </code></td>

        <td>
            <code>L.bounds(&hellip;)</code><br />
            <code>L.bounds([&hellip;])</code>
        </td>

        <td>Создает объект Bounds на основе левого верхнего и правого нижнего углов.</td>
    </tr>
    <tr>
        <td><code><b>L.Bounds</b>(
            <nobr>&lt;<a href="#point">Point</a>[]&gt; <i>points</i> )</nobr>
        </code></td>

        <td>
            <code>L.bounds(&hellip;)</code>
        </td>

        <td>Создает объект Bounds на основе точек, которые будут в него входить.</td>
    </tr>
</table>

### Свойства

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>min</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Левый верхний угол прямоугольника.</td>
    </tr>
    <tr>
        <td><code><b>max</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Правый нижний угол прямоугольника.</td>
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
        <td><code><b>extend</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Расширяет границы таким образом, чтобы в них входила переданная точка.</td>
    </tr>
    <tr>
        <td><code><b>getCenter</b>()</code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает центральную точку прямоугольной области.</td>
    </tr>
    <tr>
        <td><code><b>contains</b>(
            <nobr>&lt;<a href="#bounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если текущий прямоугольник содержит внутри себя переданный прямоугольник.</td>
    </tr>
    <tr>
        <td><code><b>contains</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если прямоугольник содержит внутри себя переданную точку.</td>
    </tr>
    <tr>
        <td><code><b>intersects</b>(
            <nobr>&lt;<a href="#bounds">Bounds</a>&gt; <i>otherBounds</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если текущий прямоугольник пересекается с переданным прямоугольником.</td>
    </tr>
    <tr>
        <td><code><b>isValid</b>()</code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если если свойства границ инициализированы.</td>
    </tr>
    <tr>
        <td><code><b>getSize</b>()</code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает размер прямоугольника.</td>
    </tr>
</table>

## L.Icon

Иконка маркера.

    var myIcon = L.icon({
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

    L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Icon</b>(
            <nobr>&lt;<a href="#icon-options">Icon options</a>&gt; <i>options</i> )</nobr>
        </code></td>

        <td>
            <code>L.icon(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает объект иконки с переданными опциями.</td>
    </tr>
</table>

### Опции

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>iconUrl</b></code></td>
        <td><code>String</code>
        <td>(обязательная) URL к изображению иконки (абсолютный или относительный).</td>
    </tr>
    <tr>
        <td><code><b>iconRetinaUrl</b></code></td>
        <td><code>String</code>
        <td>URL к изображению иконки для устройств с Retina экраном (абсолютный или относительный).</td>
    </tr>
    <tr>
        <td><code><b>iconSize</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Размер изображения иконки в пикселях.</td>
    </tr>
    <tr>
        <td><code><b>iconAnchor</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Координаты "ножки" иконки (относительно ее левого верхнего угла).
            Иконка будет установлена ​​так, чтобы эта точка соответствовала в географическому положению маркера. По умолчанию "ножка" располагается по центру иконки.</td>
    </tr>
    <tr>
        <td><code><b>shadowUrl</b></code></td>
        <td><code>String</code>
        <td>URL к изображению тени иконки. Если не указан, тогда тень будет отсутствовать.</td>
    </tr>
    <tr>
        <td><code><b>shadowRetinaUrl</b></code></td>
        <td><code>String</code>
        <td>URL к изображению тени иконки для устройств с Retina экраном. Если не указан, тогда тень будет отсутствовать.</td>
    </tr>
    <tr>
        <td><code><b>shadowSize</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Размер изображения тени в пикселях.</td>
    </tr>
    <tr>
        <td><code><b>shadowAnchor</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Координаты "ножки" тени (относительно ее левого верхнего угла). Значение по умолчанию такое же, как у <code>iconAnchor</code>.</td>
    </tr>
    <tr>
        <td><code><b>popupAnchor</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Координаты точки, из которой будет открываться балун (относительно <code>iconAnchor</code>).</td>
    </tr>
    <tr>
        <td><code><b>className</b></code></td>
        <td><code>String</code>
        <td>Значение класса, которое будет присвоено изображениям иконки и тени. По умолчанию пустое.</td>
    </tr>
</table>

## L.DivIcon

Простая иконка для маркеров, которые используют простой элемент `div` вместо изображения.

    var myIcon = L.divIcon({className: 'my-div-icon'});
    // вы можете установить стиль класса .my-div-icon в CSS

    L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

По умолчанию установлен класс `'leaflet-div-icon'`, который стилизован как маленький белый квадрат с тенью.

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.DivIcon</b>(
            <nobr>&lt;<a href="#divicon-options">DivIcon options</a>&gt; <i>options</i> )</nobr>
        </code></td>

        <td>
            <code>L.divIcon(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает объект <code>L.DivIcon</code> с переданными опциями.</td>
    </tr>
</table>

### Опции

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>iconSize</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Размер иконки в пикселях. Также может быть установлен с помощью CSS.</td>
    </tr>
    <tr>
        <td><code><b>iconAnchor</b></code></td>
        <td><code><a href="#point">Point</a></code>
        <td>Координаты "ножки" иконки (относительно ее левого верхнего угла). Иконка будет установлена ​​так, чтобы эта точка соответствовала в географическому положению маркера. По умолчанию "ножка" располагается по центру иконки, если указан ее размер.</td>
    </tr>
    <tr>
        <td><code><b>className</b></code></td>
        <td><code>String</code>
        <td>Значение класса, которое будет присвоено иконке. По умолчанию <code>'leaflet-div-icon'</code>.
    </tr>
    <tr>
        <td><code><b>html</b></code></td>
        <td><code>String</code>
        <td>HTML код, который будет установлен как содержимое иконки. По умолчанию пустой.</td>
    </tr>
</table>

## L.Control

Базовый класс для всех элементов управления. Реализует интерфейс [IControl][53]. Элементы на карту добавляются следующим образом:

    control.addTo(map);
    // то же самое, что
    map.addControl(control);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Control</b>(
            <nobr>&lt;<a href="#control-options">Control options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td>
            <code>L.control(<span class="comment">&hellip;</span>)</code>
        </td>

        <td>Создает элемент управления с переданными опциями.</td>
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
        <td><code><b>position</b></code></td>
        <td><code>String</code></td>
        <td><code>'topright'</td>
        <td>Расположение элемента управления (один из углов карты). См. <a href="#control-positions">позиции элементов управления</a>.</td>
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
        <td><code><b>setPosition</b>(
            <nobr>&lt;String&gt; <i>position</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Устанавливает позицию элемента управления См. <a href="#control-positions">позиции элементов управления</a>.</td>
    </tr>
    <tr>
        <td><code><b>getPosition</b>()</code></td>
        <td><code>String</code></td>
        <td>Возвращает текущую позицию элемента управления.</td>
    </tr>
    <tr>
        <td><code><b>addTo</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Добавляет элемент управления на карту.</td>
    </tr>
    <tr>
        <td><code><b>removeFrom</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Удаляет элемент управления с карты.</td>
    </tr>
	<tr>
		<td><code><b>getContainer</b>()</code></td>
		<td><code>HTMLElement</code></td>
		<td>Возвращает HTML контейнер элемента управления.</td>
	</tr>
</table>

### Позиции элементов управления

Позиции элементов управления (углы карты, в которых располагаются элементы) устанавливаются с помощью строк. Отступы между границами карты и элементами управления можно установить с помощью CSS.

<table>
    <tr>
        <th>Позиция</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code>'topleft'</code></td>
        <td>Верхний левый угол карты.</td>
    </tr>
    <tr>
        <td><code>'topright'</code></td>
        <td>Верхний правый угол карты.</td>
    </tr>
    <tr>
        <td><code>'bottomleft'</code></td>
        <td>Нижний левый угол карты.</td>
    </tr>
    <tr>
        <td><code>'bottomright'</code></td>
        <td>Нижний правый угол карты.</td>
    </tr>
</table>

## L.Control.Zoom

Базовый элемент управления масштабом с двумя кнопками (приблизить и отдалить). Добавляется на карту по умолчанию, если не передана опция zoomControl со значением `false`. Расширяет [Control][34].

### Конструктор

<table>
	<tr>
		<th>Конструктор</th>
		<th>Использование</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>L.Control.Zoom</b>(
			<nobr>&lt;<a href="#control-zoom-options">Control.Zoom options</a>&gt; <i>options?</i> )</nobr>
		</code></td>

		<td>
			<code>L.control.zoom(&hellip;)</code>
		</td>

		<td>Создает элемент управления масштабом.</td>
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
		<td><code><b>position</b></code></td>
		<td><code>String</code></td>
		<td><code><span>'topleft'</span></td>
		<td>Расположение элемента управления (один из углов карты). См. <a href="#control-positions">позиции элементов управления</a>.</td>
	</tr>
	<tr>
		<td><code><b>zoomInText</b></code></td>
		<td><code>String</code></td>
		<td><code><span>'+'</span></td>
		<td>Текст кнопки зум-ин.</td>
	</tr>
	<tr>
		<td><code><b>zoomOutText</b></code></td>
		<td><code>String</code></td>
		<td><code><span>'-'</span></td>
		<td>Текст кнопки зум-аут.</td>
	</tr>
	<tr>
		<td><code><b>zoomInTitle</b></code></td>
		<td><code>String</code></td>
		<td><code><span>'Zoom in'</span></td>
		<td>Значение аттрибута title для конпки зум-ин.</td>
	</tr>
	<tr>
		<td><code><b>zoomInTitle</b></code></td>
		<td><code>String</code></td>
		<td><code><span>'Zoom out'</span></td>
		<td>Значение аттрибута title для конпки зум-аут.</td>
	</tr>
</table>

## L.Control.Attribution

Позволяет показать атрибутику в небольшом текстовом контейнере на карте. Расширяет [Control][34].

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Control.Attribution</b>(
            <nobr>&lt;<a href="#control-attribution-options">Control.Attribution options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td>
            <code>L.control.attribution(&hellip;)</code>
        </td>

        <td>Создает элемент атрибутики.</td>
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
        <td><code><b>position</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">'bottomright'</span></td>
        <td>Расположение элемента управления (один из углов карты). См. <a href="#control-positions">позиции элементов управления</a>.</td>
    </tr>
    <tr>
        <td><code><b>prefix</b></code></td>
        <td><code>String</code></td>
        <td><code>'Leaflet'</td>
        <td>Текст, который будет показан перед атрибутикой. Для отключения необходимо указать <code>false</code>.</td>
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
        <td><code><b>setPrefix</b>(
            <nobr>&lt;String&gt; <i>prefix</i> )</nobr>
        </code></td>
        <td><code>this</code></td>
        <td>Устанавливает текст перед атрибутикой.</td>
    </tr>
    <tr>
        <td><code><b>addAttribution</b>(
            <nobr>&lt;String&gt; <i>text</i> )</nobr>
        </code></td>
        <td><code>this</code></td>
        <td>Добавляет текст атрибутики (например, <code>'Картографические данные &amp;copy; 2GIS'</code>).</td>
    </tr>
    <tr>
        <td><code><b>removeAttribution</b>(
            <nobr>&lt;String&gt; <i>text</i> )</nobr>
        </code></td>
        <td><code>this</code></td>
        <td>Удаляет текст атрибутики.</td>
    </tr>
</table>

## L.Control.Scale

Показывает масштаб карты в метрической (метры, километры) и английской (мили, футы) системах измерений. Расширяет Control.

    L.control.scale().addTo(map);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Control.Scale</b>(
            <nobr>&lt;<a href="#control-scale-options">Control.Scale options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td>
            <code>L.control.scale(&hellip;)</code>
        </td>

        <td>Создает индикатор масштаба с переданными опциями.</td>
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
        <td><code><b>position</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">'bottomleft'</span></td>
        <td>Расположение элемента управления (один из углов карты). См. <a href="#control-positions">позиции элементов управления</a>.</td>
    </tr>
    <tr>
        <td><code><b>maxWidth</b></code></td>
        <td><code>Number</code></td>
        <td><code><span class="number">100</span></code></td>
        <td>Максимальная ширина элемента в пикселях.</td>
    </tr>
    <tr>
        <td><code><b>metric</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code></td>
        <td>Включает или отключает метрическую систему измерений (метры, километры).</td>
    </tr>
    <tr>
        <td><code><b>imperial</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code></td>
        <td>Включает или отключает английскую систему измерений (мили, футы).</td>
    </tr>
    <tr>
        <td><code><b>updateWhenIdle</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="literal">false</span></code></td>
        <td>Если <code>true</code>, тогда элемент обновляется при событии <code>moveend</code>, иначе всегда будет отображена актуальная информация (обновляется при событии <code>move</code>).</td>
    </tr>
</table>

## Методы событий

Набор методов, позволяющих работать с событиями. События позволяют выполнить какое-либо действие в тот момент, когда что-то происходит с объектом (например, когда пользователь кликает по карте).

### Пример

    map.on('click', function(e) {
        alert(e.latlng);
    });

Управлять событиями можно с помощью ссылок на обработчики, например, если необходимо добавить и затем удалить обработчик, определите его как функцию:

    function onClick(e) { ... }

    map.on('click', onClick);
    map.off('click', onClick);

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>addEventListener</b>(
            <nobr>&lt;String&gt; <i>type</i></nobr>,
            <nobr>&lt;Function&gt; <i>fn</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Подписывает обработчик (<code>fn</code>) на определенный тип события. Опционально вы можете указать контекст обработчика (объект, на который будет указывать <code>this</code>). Также вы можете подписаться на несколько типов событий, указав их через пробел (например, <code>'click dblclick'</code>).</td>
    </tr>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>addOneTimeEventListener</b>(
			<nobr>&lt;String&gt; <i>type</i></nobr>,
			<nobr>&lt;Function&gt; <i>fn</i></nobr>,
			<nobr>&lt;Object&gt; <i>context?</i> )</nobr>
		</code></td>

        <td><code>this</code></td>
        <td>Аналогичен методу <code>addEventListener</code>, лишь с тем отличием, что после первого вызова обработчика он будет удален.</td>
    </tr>
    <tr>
        <td><code><b>addEventListener</b>(
            <nobr>&lt;Object&gt; <i>eventMap</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Подписывает несколько обработчиков на определенные типы событий, например <code>{click: onClick, mousemove: onMouseMove}</code></td>
    </tr>
    <tr>
        <td><code><b>removeEventListener</b>(
            <nobr>&lt;String&gt; <i>type</i></nobr>,
            <nobr>&lt;Function&gt; <i>fn?</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Отписывает ранее подписанный обработчик. Если обработчик не указан, тогда от определенного типа событий будут отписаны все обработчики.</td>
    </tr>
    <tr>
        <td><code><b>removeEventListener</b>(
            <nobr>&lt;Object&gt; <i>eventMap</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Отписывает несколько обработчиков от определенных событий.</code></td>
    </tr>
    <tr>
        <td><code><b>hasEventListeners</b>(
            <nobr>&lt;String&gt; <i>type</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если у переданного типа события есть подписчики.</td>
    </tr>
    <tr>
        <td><code><b>fireEvent</b>(
            <nobr>&lt;String&gt; <i>type</i></nobr>,
            <nobr>&lt;Object&gt; <i>data?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Инициирует событие определенного типа. Опционально можно передать объект с данными события, тогда этот объект будет передан первым параметром в функцию-обработчик.</td>
    </tr>
    <tr>
        <td><code><b>clearAllEventListeners</b>()</code></td>
        <td><code>this</code></td>
        <td>Удаляет все обработчики всех событий объекта.</code></td>
    </tr>
    <tr>
        <td><code><b>on</b>( &hellip; )</code></td>
        <td><code>this</code></td>
        <td>Псевдоним <code>addEventListener</code>.</td>
    </tr>
    <tr>
        <td><code><b>once</b>( &hellip; )</code></td>
        <td><code>this</code></td>
        <td>Псевдоним <code>addOneTimeEventListener</code>.</td>
    </tr>
    <tr>
        <td><code><b>off</b>( &hellip; )</code></td>
        <td><code>this</code></td>
        <td>Псевдоним <code>removeEventListener</code>.</td>
    </tr>
    <tr>
        <td><code><b>fire</b>( &hellip; )</code></td>
        <td><code>this</code></td>
        <td>Псевдоним <code>fireEvent</code>.</td>
    </tr>
</table>

## Объекты событий

Каждый объект события &mdash; это объект с данными о событии, передаваемый параметром в функцию-обработчик, подписанную на это событие при возникновении последнего. Например:

    map.on('click', function(e) {
        alert(e.latlng); // e является объектом события (в данном случае MouseEvent)
    });

### Event

Базовый объект события. Все объекты событий содержат такие же свойства, как и этот объект.

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>type</b></code></td>
        <td><code>String</code></td>
        <td>Тип события (например, <code>'click'</code>).</td>
    </tr>
    <tr>
        <td><code><b>target</b></code></td>
        <td><code>Object</code></td>
        <td>Объект, который инициировал событие.</td>
    </tr>
</table>

### MouseEvent

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>latlng</b></code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Географическая точка, в которой было инициировано событие мышки.</td>
    </tr>
    <tr>
        <td><code><b>layerPoint</b></code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Пиксельные координаты, в которых было инициировано событие мышки относительно слоя карты.</td>
    </tr>
    <tr>
        <td><code><b>containerPoint</b></code></td>
        <td><code><a href="#point">Point</a></code></td>
        <td>Пиксельные координаты, в которых было инициировано событие мышки относительно контейнера карты.</td>
    </tr>
    <tr>
        <td><code><b>originalEvent</b></code></td>
        <td><code>DOMMouseEvent</code></td>
        <td>Оригинальное браузерное событие мышки.</td>
    </tr>
</table>

### LocationEvent

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>latlng</b></code></td>
        <td><code><a href="#latlng">LatLng</a></code></td>
        <td>Географическое положение пользователя.</td>
    </tr>
    <tr>
        <td><code><b>bounds</b></code></td>
        <td><code><a href="#latlngbounds">LatLngBounds</a></code></td>
        <td>Географические границы, в которых находится пользователь (в соответствии с точностью местоположения).</td>
    </tr>
    <tr>
        <td><code><b>accuracy</b></code></td>
        <td><code>Number</code></td>
        <td>Точность местоположения в метрах.</td>
    </tr>
	<tr>
		<td><code><b>altitude</b></code></td>
		<td><code>Number</code></td>
		<td>Высота над поверхностью земли в метрах, согласно координатной системе WGS84.</td>
	</tr>
	<tr>
		<td><code><b>altitudeAccuracy</b></code></td>
		<td><code>Number</code></td>
		<td>Точность высоты в метрах.</td>
	</tr>
	<tr>
		<td><code><b>heading</b></code></td>
		<td><code>Number</code></td>
		<td>Направление движения в градусах, считается с севера по часовой стрелке.</td>
	</tr>
	<tr>
		<td><code><b>speed</b></code></td>
		<td><code>Number</code></td>
		<td>Скорость в метрах в секунду.</td>
	</tr>
	<tr>
		<td><code><b>timestamp</b></code></td>
		<td><code>Number</code></td>
		<td>Время изменения местоположения.</td>
	</tr>
</table>

### ErrorEvent

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>message</b></code></td>
        <td><code>String</code></td>
        <td>Сообщение об ошибке.</td>
    </tr>
    <tr>
        <td><code><b>code</b></code></td>
        <td><code>Number</code></td>
        <td>Код ошибки (если имеется).</td>
    </tr>
</table>

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>layer</b></code></td>
        <td><code><a href="#ilayer">ILayer</a></code></td>
        <td>Слой, который был добавлен или удален.</td>
    </tr>
</table>

### TileEvent

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>tile</b></code></td>
        <td><code>HTMLElement</code></td>
        <td>Элемент тайла (изображение).</td>
    </tr>
    <tr>
        <td><code><b>url</b></code></td>
        <td><code>String</code></td>
        <td>URL тайла.</td>
    </tr>
</table>

### ResizeEvent

<table>
	<tr>
		<th>Свойство</th>
		<th>Тип</th>
		<th>Описание</th>
	</tr>
	<tr>
		<td><code><b>oldSize</b></code></td>
		<td><code><a href="#point">Point</a></code></td>
		<td>Старый размер, до изменения.</td>
	</tr>
	<tr>
		<td><code><b>newSize</b></code></td>
		<td><code><a href="#point">Point</a></code></td>
		<td>Новый размер, после изменения.</td>
	</tr>
</table>

### GeoJSON event

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>layer</b></code></td>
        <td><code><a href="#ilayer">ILayer</a></code></td>
        <td>Слой GeoJSON объекта добавленного на карту.</td>
    </tr>
    <tr>
        <td><code><b>properties</b></code></td>
        <td><code>Object</code></td>
        <td>Свойства GeoJSON объекта.</td>
    </tr>
    <tr>
        <td><code><b>geometryType</b></code></td>
        <td><code>String</code></td>
        <td>Тип геометрии GeoJSON объекта.</td>
    </tr>
    <tr>
        <td><code><b>id</b></code></td>
        <td><code>String</code></td>
        <td>GeoJSON ID объекта (если задан).</td>
    </tr>
</table>

### Popup event

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>popup</b></code></td>
        <td><code><a href="#popup">Popup</a></code></td>
        <td>Балун, который был открыт или закрыт.</td>
    </tr>
</table>

### DragEndEvent

<table>
	<tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
	<tr>
		<td><code><b>distance</b></code></td>
		<td><code>Number</code></td>
		<td>Расстояние в пикселях на которое был сдвинут элемент.</td>
	</tr>
</table>

## L.Class

`L.Class` предоставляет возможность использовать ООП подход в разработке функционала API, используется для реализации большинства классов из данной документации.

Кроме реализации простой классической модели наследования имеются несколько свойств для удобной организации кода, такие как `options`, `includes` и `statics`.

    var MyClass = L.Class.extend({
        initialize: function (greeter) {
            this.greeter = greeter;
            // конструктор класса
        },

        greet: function (name) {
            alert(this.greeter + ', ' + name)
        }
    });

    // создает объект класса MyClass и передает "Hello" в конструктор
    var a = new MyClass("Hello");

    // вызывает метод greet, который показывает всплывающее окно с текстом "Hello, World"
    a.greet("World");


### Наследование

Для определения новых классов используется конструкция `L.Class.extend`, также метод `extend` можно использовать в любом классе, который наследуется от `L.Class`:

    var MyChildClass = MyClass.extend({
        // ... новые свойства и методы
    });

Данный код создаст класс, который наследует все методы и свойства родительского класса (через цепочку прототипов), также возможно добавление или переопределение родительских методов и свойств. Кроме того, корректно обрабатывается оператор `instanceof`:

    var a = new MyChildClass();
    a instanceof MyChildClass; // true
    a instanceof MyClass; // true

Вы можете вызывать родительские методы (включая конструктор) из потомков (так, как вы бы делали это с помощью вызова `super` в других языках программирования) с помощью JavaScript функций `call` или `apply`:

    var MyChildClass = MyClass.extend({
        initialize: function () {
            MyClass.prototype.initialize.call("Yo");
        },

        greet: function (name) {
            MyClass.prototype.greet.call(this, 'bro ' + name + '!');
        }
    });

    var a = new MyChildClass();
    a.greet('Jason'); // выведет "Yo, bro Jason!"

### Опции

`options` &mdash; это специальное свойство, которое в отличии от других объектов передаваемых через `extend` будет слито с аналогичным свойством родителя, вместо полного переопределения, это позволяет управлять конфигурацией объектов и значениями по умолчанию:

    var MyClass = L.Class.extend({
        options: {
            myOption1: 'foo',
            myOption2: 'bar'
        }
    });

    var MyChildClass = L.Class.extend({
        options: {
            myOption1: 'baz',
            myOption3: 5
        }
    });

    var a = new MyChildClass();
    a.options.myOption1; // 'baz'
    a.options.myOption2; // 'bar'
    a.options.myOption3; // 5

Также имеется метод `L.Util.setOptions`, который позволяет сливать опции переданные в конструктор с изначально заданными опциями:

    var MyClass = L.Class.extend({
        options: {
            foo: 'bar',
            bla: 5
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
            ...
        }
    });

    var a = new MyClass({bla: 10});
    a.options; // {foo: 'bar', bla: 10}

### Включения

`includes` &mdash; это специальное свойство, которое подмешивает объекты в класс (такие объекты называются mixin-ами). Хорошим примером является `L.Mixin.Events`, который подмешивает [методы событий][39], такие как `on`, `off` и `fire` в класс.

     var MyMixin = {
        foo: function () { ... },
        bar: 5
    };

    var MyClass = L.Class.extend({
        includes: MyMixin
    });

    var a = new MyClass();
    a.foo();

Также вы можете подмешивать объекты в процессе выполнения программы с помощью метода `include`:

    MyClass.include(MyMixin);

### Статика

`statics` &mdash; это свойство, в котором описываются статические элементы класса, удобно использовать для определения констант:

    var MyClass = L.Class.extend({
        statics: {
            FOO: 'bar',
            BLA: 5
        }
    });

    MyClass.FOO; // 'bar'

### Фабрики классов

Для создания новых объектов классов используются фабричные методы, которые имеют такое же название, как и у класса, но начинаются с нижнего регистра. Это аналог ключевого слова `new`, то есть, данные строки кода эквивалентны:

    new L.Map('map');
    L.map('map');

Реализовать фабричный метод в ваших собственных классах довольно просто, например:

    L.map = function (id, options) {
        return new L.Map(id, options);
    };

### Зацепки конструктора

Если вы разрабатываете плагин к API, тогда велика вероятность того, что вам понадобится выполнить дополнительные действия при инициализации объектов существующих классов (например, при инициализации объекта `L.Polyline`). Для подобного рода задач имеется метод `addInitHook`:

    MyClass.addInitHook(function () {
        // ... выполнить дополнительные действия при вызове конструктора
        // например, добавить обработчики событий, установить значения свойств и т.п.
    });

Также можно использовать сокращенную запись, если необходимо вызвать лишь один метод при инициализации:

    MyClass.addInitHook('methodName', arg1, arg2, …);

## L.Browser

Объект со свойствами, необходимыми для определения браузера/фичи.

    if (L.Browser.ie6) {
        alert('Вам срочно нужно обновить свой браузер!');
    }

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>ie</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для всех версий Internet Explorer.</td>
    </tr>
    <tr>
        <td><code><b>ie6</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для Internet Explorer 6.</td>
    </tr>
    <tr>
        <td><code><b>ie7</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для Internet Explorer 7.</td>
    </tr>
    <tr>
        <td><code><b>webkit</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для браузеров на основе WebKit, таких как Chrome и Safari (включая мобильные версии).</td>
    </tr>
    <tr>
        <td><code><b>webkit3d</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для браузеров на основе WebKit, поддерживающих CSS 3D трансформации.</td>
    </tr>
    <tr>
        <td><code><b>android</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для мобильных браузеров на Android устройствах.</td>
    </tr>
    <tr>
        <td><code><b>android23</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для мобильных браузеров на старых версиях Android устройств (2 и 3).</td>
    </tr>
    <tr>
        <td><code><b>mobile</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для браузеров, работающих на современных мобильных устройствах (включая iOS Safari и различные Android устройства).</td>
    </tr>
    <tr>
        <td><code><b>mobileWebkit</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для мобильных браузеров на основе WebKit.</td>
    </tr>
    <tr>
        <td><code><b>mobileOpera</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для мобильной версии Opera.</td>
    </tr>
    <tr>
        <td><code><b>touch</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для всех браузеров, работающих на тач-устройствах.</td>
    </tr>
    <tr>
        <td><code><b>msTouch</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для браузеров с тач-моделью от Microsoft (например, IE10).</td>
    </tr>
    <tr>
        <td><code><b>retina</b></code></td>
        <td><code>Boolean</code></td>
        <td><code>true</code> для устройств с Retina экранами.</td>
    </tr>
</table>

## L.Util

Служебные функции.

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>extend</b>(
            <nobr>&lt;Object&gt; <i>dest</i></nobr>,
            <nobr>&lt;Object&gt; <i>src?..</i> )</nobr>
        </code></td>

        <td><code>Object</code></td>
        <td>Сливает свойства объекта <code>src</code> (или нескольких объектов) в свойства объекта <code>dest</code> и возвращает последний. Также имеется псевдоним <code>L.extend</code>.</td>
    </tr>
    <tr>
        <td><code><b>bind</b>(
            <nobr>&lt;Function&gt; <i>fn</i></nobr>,
            <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
        </code></td>

        <td><code>Function</code></td>
        <td>Возвращает функцию, которая выполняет функцию <code>fn</code> с определенным объектом контекста <code>obj</code> (так, чтобы ключевое слово <code>this</code> внутри функции указывало на <code>obj</code>). Также имеется псевдоним <code>L.bind</code>.</td>
    </tr>
    <tr>
        <td><code><b>stamp</b>(
            <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
        </code></td>

        <td><code>String</code></td>
        <td> Применяет уникальный ключ к объекту и возвращает его значение. Полезно для получения быстрого доступа к объекту, находящемуся в группе.</td>
    </tr>
    <!-- TODO Commented out for the time being:
    https://github.com/Leaflet/Leaflet/pull/793#discussion_r1134904
    <tr>
        <td><code><b>requestAnimFrame</b>()</code></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td><code><b>cancelAnimFrame</b>()</code></td>
        <td></td>
        <td></td>
    </tr>
    -->
    <tr>
        <td><code><b>limitExecByInterval</b>(
            <nobr>&lt;Function&gt; <i>fn</i></nobr>,
            <nobr>&lt;Number&gt; <i>time</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>Function</code></td>
        <td>Возвращает обертку над функцией <code>fn</code>, которая гарантирует, что функция не будет вызвана чаще, чем раз в указанный интервал времени <code>time</code> (например, используется при запросах к тайлам во время перетаскивания карты), опционально можно передать контекст (<code>context</code>), в котором будет вызываться функция.</td>
    </tr>
    <tr>
        <td><code><b>formatNum</b>(
            <nobr>&lt;Number&gt; <i>num</i></nobr>,
            <nobr>&lt;Number&gt; <i>digits</i> )</nobr>
        </code></td>

        <td><code>Number</code></td>
        <td>Возвращает число <code>num</code> округленное до <code>digits</code> знаков.</td>
    </tr>
    <tr>
        <td><code><b>splitWords</b>(
            <nobr>&lt;String&gt; <i>str</i> )</nobr>
        </code></td>

        <td><code>String[]</code></td>
        <td>Обрезает и разделяет строку на части, используя в качестве разделителя пробел, возвращает массив с этими частями.</code></td>
    </tr>
    <tr>
        <td><code><b>setOptions</b>(
            <nobr>&lt;Object&gt; <i>obj</i></nobr>,
            <nobr>&lt;Object&gt; <i>options</i> )</nobr>
        </code></td>

        <td><code>Object</code></td>
        <td>Сливает переданные опции со свойством <code>options</code> объекта <code>obj</code>, возвращает результирующий объект. См. <a href="#class-options">Опции класса</a>. Также имеется псевдоним <code>L.setOptions</code>.</td>
    </tr>
    <tr>
        <td><code><b>getParamString</b>(
            <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
        </code></td>

        <td><code>String</code></td>
        <td>Преобразует объект в URL-строку, например, <nobr><code>{a: "foo", b: "bar"}</code></nobr> будет преобразован в <code><span class="string">'?a=foo&amp;b=bar'</span></code>.</td>
    </tr>
    <tr>
        <td><code><b>template</b>(
            <nobr>&lt;String&gt; <i>str</i>, &lt;Object&gt; <i>data</i> )</nobr>
        </code></td>

        <td><code>String</code></td>
        <td>Простая функция-шаблонизатор, создает строку применяя значения из объекта <code>data</code> в формате <code>{a: 'foo', b: 'bar', &hellip;}</code> к строке шаблона в формате <code>'Hello {a}, {b}'</code> &mdash; в этом примере будет возвращена строка <code>'Hello foo, bar'</code>.</td>
    </tr>
    <tr>
        <td><code><b>isArray</b>(
            <nobr>&lt;Object&gt; <i>obj</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если переданный объект является массивом.</td>
    </tr>
	<tr>
		<td><code><b>trim</b>(
			<nobr>&lt;String&gt; <i>str</i> )</nobr>
		</code></td>

		<td><code>String</code></td>
		<td>Обрезает пробелы с обеих сторон строки и возвращает результат.</td>
	</tr>
</table>

### Свойства

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>emptyImageUrl</b></code></td>
        <td><code>String</code></td>
        <td>URI, содержащий пустое GIF изображение, закодированное в base64. Используется для освобождения памяти неиспользуемых картинок в мобильных WebKit браузерах (память освобождается установкой свойства <code>src</code> в данное значение).</td>
    </tr>
</table>

## L.LineUtil

Набор методов для обработки точек ломаных.

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>simplify</b>(
            <nobr>&lt;<a href="#point">Point</a>[]&gt; <i>points</i></nobr>,
            <nobr>&lt;Number&gt; <i>tolerance</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a>[]</code></td>

        <td>Уменьшает количество точек в ломаной и возвращает новую упрощенную ломаную. Позволяет увеличить производительность обработки/отображения ломаных на карте. Параметр <code>tolerance</code> влияет на величину упрощения (чем меньше значение, тем лучше качество геометрии и ниже производительность).</td>
    </tr>
    <tr>
        <td><code><b>pointToSegmentDistance</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p1</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p2</i> )</nobr>
        </code></td>

        <td><code>Number</code></td>

        <td>Возвращает расстояние между точкой <code>p</code> и сегментом между точками <code>p1</code> и <code>p2</code>.
    </tr>
    <tr>
        <td><code><b>closestPointOnSegment</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p1</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>p2</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>

        <td>Возвращает ближайшую точку на сегменте <code>p1</code> <code>p2</code> до точки <code>p</code>.</td>
    </tr>
    <tr>
        <td><code><b>clipSegment</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>a</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>b</i></nobr>,
            <nobr>&lt;<a href="#bounds">Bounds</a>&gt; <i>bounds</i> )</nobr>
        </code></td>

        <td><code>-</code></td>

        <td>Обрезает сегмент <code>a</code> <code>b</code> по прямоугольной области (модифицируются непосредственно точки сегмента).</td>
    </tr>
</table>

## L.PolyUtil

Набор методов для обработки точек многоугольников.

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>clipPolygon</b>(
            <nobr>&lt;<a href="#point">Point</a>[]&gt; <i>points</i></nobr>,
            <nobr>&lt;<a href="#bounds">Bounds</a>&gt; <i>bounds</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a>[]</code></td>

        <td>Обрезает многоугольник по прямоугольной области.</td>
    </tr>
</table>

## L.DomEvent

Служебные методы для работы с DOM событиями.

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>addListener</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>type</i></nobr>,
            <nobr>&lt;Function&gt; <i>fn</i></nobr>,
            <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Подписывает обработчик <code>fn</code> на DOM событие определенного типа. Ключевое слово <code>this</code> внутри обработчика будет указывать на <code>context</code>, или на элемент на котором произошло событие, если контекст не задан.</td>
    </tr>
    <tr>
        <td><code><b>removeListener</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>type</i></nobr>,
            <nobr>&lt;Function&gt; <i>fn</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Отписывает ранее подписанный обработчик.</td>
    </tr>
    <tr>
        <td><code><b>stopPropagation</b>(
            <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
        </code></td>

        <td><code><span class="keyword">this</span></code></td>
        <td>Останавливает всплытие события к родительским элементам. Используется внутри функции-обработчика:
            <code>L.DomEvent.addListener(div, 'click', function (e) {
                L.DomEvent.stopPropagation(e);
            });</code>
        </td>
    </tr>
    <tr>
        <td><code><b>preventDefault</b>(
            <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Предотвращает поведение DOM элемента по умолчанию (например, переход по ссылке указанной в свойстве <code>href</code> элемента <code>a</code>). Используется внутри функции-обработчика.</td>
    </tr>
    <tr>
        <td><code><b>stop</b>(
            <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Вызывает одновременно <code>stopPropagation</code> и <code>preventDefault</code>.</td>
    </tr>
    <tr>
        <td><code><b>disableClickPropagation</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Добавляет <code>stopPropagation</code> к DOM элементу для событий <code>'click'</code>, <code>'doubleclick'</code>, <code>'mousedown'</code> и <code>'touchstart'</code>.</td>
    </tr>
    <tr>
        <td><code><b>getMousePosition</b>(
            <nobr>&lt;DOMEvent&gt; <i>e</i></nobr>,
            <nobr>&lt;HTMLElement&gt; <i>container?</i> )</nobr>
        </code></td>

        <td><code><a href="#point">Point</a></code></td>
        <td>Возвращает позицию мышки из DOM события относительно контейнера или относительно всей страницы, если контейнер не указан.</td>
    </tr>
    <tr>
        <td><code><b>getWheelDelta</b>(
            <nobr>&lt;DOMEvent&gt; <i>e</i> )</nobr>
        </code></td>

        <td><code>Number</code></td>
        <td>Возвращает дельту колесика мышки из DOM события <code>mousewheel</code>.</td>
    </tr>
</table>

## L.DomUtil

Служебные методы для работы с DOM деревом.

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>get</b>(
            <nobr>&lt;String or HTMLElement&gt; <i>id</i> )</nobr>
        </code></td>

        <td><code>HTMLElement</code></td>
        <td>Возвращает элемент по его id, если параметром была передана строка, либо возвращает тот же элемент, если он был передан в качестве параметра.</td>
    </tr>
    <tr>
        <td><code><b>getStyle</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>style</i> )</nobr>
        </code></td>

        <td><code>String</code></td>
        <td>Возвращает значение стиля элемента, включая рассчитанные значения или значения указанные с помощью CSS.</td>
    </tr>
    <tr>
        <td><code><b>getViewportOffset</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
        </code></td>

        <td><a href="#point"><code>Point</code></a></td>
        <td>Возвращает смещение элемента относительно области просмотра (viewport-а).</td>
    </tr>
    <tr>
        <td><code><b>create</b>(
            <nobr>&lt;String&gt; <i>tagName</i></nobr>,
            <nobr>&lt;String&gt; <i>className</i></nobr>,
            <nobr>&lt;HTMLElement&gt; <i>container?</i> )</nobr>
        </code></td>

        <td><code>HTMLElement</code></td>

        <td>Создает элемент <code>tagName</code>, устанавливает ему значение класса <code>className</code> и опционально добавляет его в элемент <code>container</code>.</td>
    </tr>
    <tr>
        <td><code><b>disableTextSelection</b>()</code></td>
        <td>-</td>
        <td>Отключает возможность выделения текста, например, во время перетаскивания.</td>
    </tr>
    <tr>
        <td><code><b>enableTextSelection</b>()</code></td>
        <td>-</td>
        <td>Включает возможность выделения текста.</td>
    </tr>
    <tr>
        <td><code><b>hasClass</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>name</i> )</nobr>
        </code></td>

        <td><code>Boolean</code></td>

        <td>Возвращает <code>true</code>, если элемент содержит класс <code>name</code>.</td>
    </tr>
    <tr>
        <td><code><b>addClass</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>name</i> )</nobr>
        </code></td>

        <td>-</td>

        <td>Добавляет класс <code>name</code> к элементу.</td>
    </tr>
    <tr>
        <td><code><b>removeClass</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;String&gt; <i>name</i> )</nobr>
        </code></td>

        <td>-</td>

        <td>Удаляет класс <code>name</code> из элемента.</td>
    </tr>
    <tr>
        <td><code><b>setOpacity</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;Number&gt; <i>value</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Устанавливает прозрачность элемента (включая поддержку старых IE). Значение должно быть от <code>0</code> до <code>1</code>.</td>
    </tr>
    <tr>
        <td><code><b>testProp</b>(
            <nobr>&lt;String[]&gt; <i>props</i> )</nobr>
        </code></td>

        <td><code>String</code> or <code><span class="literal">false</span></code></td>
        <td>Обходит массив названий стилей и возвращает первое имя, которое является корректным для текущего браузера. Если такого нет, тогда будет возвращено <code>false</code>. Удобно для стилей с префиксами производителей браузеров, например <code>transform</code>.</td>
    </tr>
    <tr>
        <td><code><b>getTranslateString</b>(
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i> )</nobr>
        </code></td>

        <td><code>String</code></td>
        <td>Возвращает CSS строку трансформации для смещения элемента. Использует 3D трансформацию для браузеров на основе WebKit с поддержкой аппаратного ускорения и 2D для других браузеров.</td>
    </tr>
    <tr>
        <td><code><b>getScaleString</b>(
            <nobr>&lt;Number&gt; <i>scale</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>origin</i> )</nobr>
        </code></td>

        <td><code>String</code></td>
        <td>Возвращает CSS строку трансформации для масштабирования элемента.</td>
    </tr>
    <tr>
        <td><code><b>setPosition</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i></nobr>,
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>point</i></nobr>,
            <nobr>&lt;Boolean&gt; <i>disable3D?</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Устанавливает позицию элемента в координаты <code>point</code>, используя CSS translate или свойства <code>top</code> и <code>left</code>, в зависимости от браузера. Принудительно использует позиционирование с помощью <code>top</code> и <code>left</code>, если <code>disable3D</code> установлено в <code>true</code>.</td>
    </tr>
    <tr>
        <td><code><b>getPosition</b>(
            <nobr>&lt;HTMLElement&gt; <i>el</i> )</nobr>
        </code></td>

        <td><a href="#point">Point</a></td>
        <td>Возвращает координаты элемента, который ранее был спозиционирован с помощью метода <code>setPosition</code>.</td>
    </tr>
</table>

### Properties

<table>
    <tr>
        <th>Свойство</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>TRANSITION</b></nobr>
        </code></td>
        <td><code>String</code></td>
        <td>Название CSS свойства transition с учетом префикса производителя браузера (например, <code>'webkitTransition'</code> для WebKit).</td>
    </tr>
    <tr>
        <td><code><b>TRANSFORM</b></nobr>
        </code></td>
        <td><code>String</code></td>
        <td>Название CSS свойства transform с учетом префикса производителя браузера.</td>
    </tr>
</table>

## L.PosAnimation

Используется для плавного перемещения элементов, использует CSS3 transitions для современных браузеров и таймер для IE6-9\.

    var fx = new L.PosAnimation();
    fx.run(el, [300, 500], 0.5);

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.PosAnimation</b>()</code></td>

        <td>
            <code>new L.PosAnimation()</code>
        </td>

        <td>Создает объект PosAnimation.</td>
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
        <td><code><b>run</b>(
            <nobr>&lt;HTMLElement&gt; <i>element</i>,</nobr>
            <nobr>&lt;<a href="#point">Point</a>&gt; <i>newPos</i></nobr>,
            <nobr>&lt;Number&gt; <i>duration?</i></nobr>,
            <nobr>&lt;Number&gt; <i>easeLinearity?</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Запускает анимацию переданного элемента, смещая его в новую позицию, опционально задается продолжительность в секундах (по умолчанию <code>0.25</code>) и функция затухания (третий аргумент <a href="http://cubic-bezier.com/#0,0,.5,1">кубической кривой Безье</a>, по умолчанию <code>0.5</code>)</td>
    </tr>
</table>

### События

Вы можете подписаться на следующие события используя [эти методы][39].

<table>
    <tr>
        <th>Событие</th>
        <th>Данные</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>start</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает во время старта анимации.</td>
    </tr>
    <tr>
        <td><code><b>step</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает в процессе анимации.</td>
    </tr>
    <tr>
        <td><code><b>end</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает во время окончания анимации.</td>
    </tr>
</table>

## L.Draggable

Класс, с помощью которого можно сделать DOM элемент перетаскиваемым (включая поддержку тач-устройств). Работает только в том случае, если элемент был позиционирован с помошью <a href="#domutil-setposition">DomUtil#setPosition</a>

    var draggable = new L.Draggable(elementToDrag);
    draggable.enable();

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.Draggable</b>(
            <nobr>&lt;HTMLElement&gt; <i>element</i>,</nobr>
            <nobr>&lt;HTMLElement&gt; <i>dragHandle?</i> )</nobr>
        </code></td>

        <td>
            <code>new L.Draggable(&hellip;)</code><!--<br />
            <code>L.draggable(<span class="comment">&hellip;</span>)</code>-->
        </td>

        <td>Создает объект, с помощью которого можно двигать элемент <code>element</code> во время перетаскивания элемента <code>dragHandle</code> (по умолчанию <code>dragHandle</code> является тем же элементом, что и <code>element</code>).</td>
    </tr>
</table>

### События

Вы можете подписаться на следующие события используя [эти методы][39].

<table>
    <tr>
        <th>Событие</th>
        <th>Данные</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>dragstart</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает в момент начала перетаскивания.</td>
    </tr>
    <tr>
        <td><code><b>predrag</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает в процессе перетаскивания <i>перед</i> каждым обновлением позиции элемента.</td>
    </tr>
    <tr>
        <td><code><b>drag</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает в процессе перетаскивания.</td>
    </tr>
    <tr>
        <td><code><b>dragend</b></code></td>
        <td><code><a href="#event">Event</a></code>
        <td>Возникает в момент окончания перетаскивания.</td>
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
        <td><code><b>enable</b>()</code></td>
        <td><code>-</code></td>
        <td>Включает возможность перетаскивания.</td>
    </tr>
    <tr>
        <td><code><b>disable</b>()</code></td>
        <td><code>-</code></td>
        <td>Отключает возможность перетаскивания.</td>
    </tr>
</table>

## IHandler

Интерфейс, который реализуется [обработчиками взаимодействия][114].

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>enable</b>()</code></td>
        <td>-</td>
        <td>Включает обработчик</td>
    </tr>
    <tr>
        <td><code><b>disable</b>()</code></td>
        <td>-</td>
        <td>Отключает обработчик.</td>
    </tr>
    <tr>
        <td><code><b>enabled</b>()</code></td>
        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code> если обработчик включен.</td>
    </tr>
</table>

## ILayer

Описывает объект, который привязан к определенному местоположению (или набору местоположений) на карте. Реализуется такими объектами, как [тайловые слои][13], [маркеры][11], [балуны][12], [растровые слои][16], [векторные слои][17] и [группы слоев][25].

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>onAdd</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Должен содержать код, который создает DOM элементы слоя, добавляет их на <a href="#map-panes">панели карты</a> и подписывает обработчики на все необходимые события карты. Вызывается при <code>map.addLayer(layer)</code>.</td>
    </tr>
    <tr>
        <td><code><b>onRemove</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Должен содержать код очистки, который удаляет элементы слоя и отписывает ранее добавленные обработчики событий. Вызывается при <code>map.removeLayer(layer)</code>.</td>
    </tr>
</table>

### Реализация пользовательских слоев

Наиболее важными при разработке пользовательских слоев являются событие [viewreset][115] и метод [latLngToLayerPoint][116] карты. `viewreset` возникает когда карта должна спозиционировать свои слои (например, при изменении масштаба), а `latLngToLayerPoint` используется для получения новых координат слоя.

Еще одним событием, которое часто используется при разработке слоев является [moveend][117], оно возникает после любых движений карты (перемещение, изменение масштаба и т.п.).

Еще одна важная особенность, которую необходимо знать &mdash; для всех DOM элементов, которые должны быть скрыты во время анимации изменения масштаба карты необходимо добавить класс `leaflet-zoom-hide`.

### Пример пользовательского слоя

Пример реализации пользовательского слоя:

    var MyCustomLayer = L.Class.extend({

        initialize: function (latlng) {
            // сохраняет позицию или другие опции конструктора
            this._latlng = latlng;
        },

        onAdd: function (map) {
            this._map = map;

            // создает DOM элемент и добавляет его на панели карты
            this._el = L.DomUtil.create('div', 'my-custom-layer leaflet-zoom-hide');
            map.getPanes().overlayPane.appendChild(this._el);

            // подписка на событие viewreset для обновления позиции слоя
            map.on('viewreset', this._reset, this);
            this._reset();
        },

        onRemove: function (map) {
            // удаляет DOM элементы слоя и отписывает обработчики событий
            map.getPanes().overlayPane.removeChild(this._el);
            map.off('viewreset', this._reset, this);
        },

        _reset: function () {
            // обновляет позицию слоя
            var pos = this._map.latLngToLayerPoint(this._latlng);
            L.DomUtil.setPosition(this._el, pos);
        }
    });

    map.addLayer(new MyCustomLayer(latlng));


## IControl

Графические элементы управления, которые располагаются в одном из углов карты. Реализуется элементами [zoom][35], [attribution][36], [scale][38] и т.п.

### Методы

Каждый элемент управления API должен наследоваться от класса [Control][34] и иметь следующие методы:

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>onAdd</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code>HTMLElement</code></td>
        <td>Должен содержать код, который создает DOM элементы, подписывает обработчики на все необходимые события карты и возвращает элемент содержащий содержимое элемента управления. Вызывается при <code>map.addControl(control)</code> или <code>control.addTo(map)</code>.</td>
    </tr>
    <tr>
        <td><code><b>onRemove</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td>-</td>
        <td>Опционально, должен содержать код очистки (например, отписывать обработчики событий). Вызывается при <code>map.removeControl(control)</code> или <code>control.removeFrom(map)</code>. DOM контейнер элемента управления удаляется автоматически.</td>
    </tr>
</table>

### Пример реализации элемента управления

    var MyControl = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function (map) {
            // создает контейнер элемента управления с определенным именем класса
            var container = L.DomUtil.create('div', 'my-custom-control');

            // ... инициализирует другие DOM элементы, добавляет обработчики событий и т.п.

            return container;
        }
    });

    map.addControl(new MyControl());


Если вы задаете собственный конструктор элемента управления, тогда необходимо корректно обработать опции:

    var MyControl = L.Control.extend({
        initialize: function (foo, options) {
            // ...
            L.Util.setOptions(this, options);
        },
        // ...
    });

Это позволит передавать такие опции, как, например, `position` при создании объекта элемента управления:

    map.addControl(new MyControl('bar', {position: 'bottomleft'}));

[0]: #map-usage
[1]: #map-constructor
[2]: #map-options
[3]: #map-events
[4]: #map-set-methods
[5]: #map-get-methods
[6]: #map-stuff-methods
[7]: #map-conversion-methods
[8]: #map-misc-methods
[9]: #map-properties
[10]: #map-panes
[11]: #marker
[12]: #popup
[13]: #tilelayer
[14]: #tilelayer-wms
[15]: #tilelayer-canvas
[16]: #imageoverlay
[17]: #path
[18]: #polyline
[19]: #multipolyline
[20]: #polygon
[21]: #multipolygon
[22]: #rectangle
[23]: #circle
[24]: #circlemarker
[25]: #layergroup
[26]: #featuregroup
[27]: #geojson
[28]: #latlng
[29]: #latlngbounds
[30]: #point
[31]: #bounds
[32]: #icon
[33]: #divicon
[34]: #control
[35]: #control-zoom
[36]: #control-attribution
[37]: #control-layers
[38]: #control-scale
[39]: #events
[40]: #event-objects
[41]: #class
[42]: #browser
[43]: #util
[44]: #transformation
[45]: #lineutil
[46]: #polyutil
[47]: #domevent
[48]: #domutil
[49]: #posanimation
[50]: #draggable
[51]: #ihandler
[52]: #ilayer
[53]: #icontrol
[54]: #iprojection
[55]: #icrs
[56]: #global
[57]: #noconflict
[58]: #version
[59]: https://github.com/Leaflet/Leaflet/zipball/gh-pages-master
[60]: #map-setmaxbounds
[61]: #mouse-event
[62]: #event
[63]: #layer-event
[64]: #location-event
[65]: #map-locate
[66]: #error-event
[67]: map-locate
[68]: #popup-event
[69]: #map-maxbounds
[70]: #map-locate-options
[71]: https://en.wikipedia.org/wiki/W3C_Geolocation_API
[72]: #map-openpopup
[73]: http://dev.w3.org/geo/api/spec-source.html#high-accuracy
[74]: #map-getpanes
[75]: #marker-options
[76]: #map
[77]: #marker-zindexoffset
[78]: #popup-options
[79]: #marker-openpopup
[80]: #marker-bindpopup
[81]: #map-addlayer
[82]: #url-template
[83]: #tilelayer-options
[84]: #tile-event
[85]: #tilelayer-wms-options
[86]: #tilelayer-canvas-tiledrawn
[87]: #tilelayer-canvas-drawtile
[88]: #imageoverlay-options
[89]: https://developer.mozilla.org/en/SVG/Attribute/stroke-dasharray
[90]: #path-bindpopup
[91]: #path-options
[92]: #polyline-options
[93]: #path-methods
[94]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice
[95]: http://geojson.org/geojson-spec.html
[96]: #geojson-options
[97]: #geojson-style
[98]: #geojson-pointtolayer
[99]: http://en.wikipedia.org/wiki/Haversine_formula
[100]: #map-fitbounds
[101]: #icon-options
[102]: #divicon-options
[103]: #control-options
[104]: #control-positions
[105]: #control-zoom-options
[106]: #control-attribution-options
[107]: examples/layers-control.html
[108]: #control-layers-config
[109]: #control-layers-options
[110]: #control-scale-options
[111]: #class-options
[112]: http://mourner.github.com/simplify-js/
[113]: http://cubic-bezier.com/#0,0,.5,1
[114]: #map-interaction-handlers
[115]: #map-viewreset
[116]: #map-latlngtolayerpoint
[117]: #map-moveend
[118]: http://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D1%80%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D1%84%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%86%D0%B8%D1%8F
[119]: http://en.wikipedia.org/wiki/Coordinate_reference_system
[120]: https://github.com/kartena/Proj4Leaflet
