## Маркеры

{toc}

### DG.Marker

Маркер представляет собой маленькую картинку, которая связана с определенным местом на карте.

    DG.marker([54.98, 82.89]).addTo(map);

#### Создание

<table>
	<thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td><code><b>DG.Marker</b>(
				<nobr>&lt;<a href="/doc/maps/ru/manual/base-types#dglatlng">LatLng</a>&gt; <i>latlng</i>,</nobr>
				<nobr>&lt;<a href="#опции">Marker options</a>&gt; <i>options?</i> )</nobr>
			</code></td>
			<td>Создает объект маркера с переданными географическими координатами и необязательными опциями.</td>
		</tr>
	</tbody>
</table>

#### Опции

<table>
    <thead>
        <tr>
			<th>Опция</th>
			<th>Тип</th>
			<th>По умолчанию</th>
			<th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="marker-icon">
            <td><code><b>icon</b></code></td>
            <td><code><a href="#dgicon">Icon</a></code></td>
            <td><code>*</code></td>
			<td>Иконка, используемая для отображения маркера. Смотрите <a href="#dgicon">документацию по иконкам</a>,
			    для информации о настройке внешнего вида маркеров. Новые маркеры по умолчанию принимают стиль
			    <code>DG.Icon.Default()</code>.</td>
        </tr>
        <tr id="marker-interactive">
            <td><code><b>interactive</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
			<td>Если значение <code>false</code>, тогда обработчик клика по маркеру не вызывается.
                Маркер ведет себя как часть нижележащего слоя карты.</td>
        </tr>
        <tr id="marker-draggable">
            <td><code><b>draggable</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
			<td>Можно ли перетаскивать маркер или нет.</td>
        </tr>
        <tr id="marker-keyboard">
            <td><code><b>keyboard</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Можно ли переходить к маркеру по нажатию на кнопку <code>Tab</code> и имитировать клик при
                нажатиии <code>Enter</code>.</td>
        </tr>
        <tr id="marker-title">
            <td><code><b>title</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
			<td>Текст подсказки при наведении курсора на маркер (по умолчанию не отображается).</td>
        </tr>
        <tr id="marker-alt">
            <td><code><b>alt</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
			<td>Текст для <code>alt</code> атрибута иконки (полезно для accessibility).</td>
        </tr>
        <tr id="marker-zindexoffset">
            <td><code><b>zIndexOffset</b></code></td>
            <td><code>Number </code></td>
            <td><code>0</code></td>
			<td>По умолчанию, свойство z-index изображения маркера устанавливается автоматически, в зависимости
                от его географического положения (широты). Используйте эту опцию, если необходимо разместить
                маркер поверх (или под) другим элементом, указав большее, например <code>1000</code>,
                (или меньшее) значение.</td>
        </tr>
        <tr id="marker-opacity">
            <td><code><b>opacity</b></code></td>
            <td><code>Number </code></td>
            <td><code>1.0</code></td>
			<td>Прозрачность маркера.</td>
        </tr>
        <tr id="marker-riseonhover">
            <td><code><b>riseOnHover</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
			<td>Если значение <code>true</code>, тогда маркер отобразится поверх остальных при наведении
                на него мышью.</td>
        </tr>
        <tr id="marker-riseoffset">
            <td><code><b>riseOffset</b></code></td>
            <td><code>Number </code></td>
            <td><code>250</code></td>
			<td>Позволяет задать шаг z-index при использовании <code>riseOnHover</code>.</td>
        </tr>
        <tr id="marker-pane">
            <td><code><b>pane</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;markerPane&#x27;</code></td>
            <td>Панель карты, на которую будет добавлен маркер.</td>
        </tr>
    </tbody>
</table>

#### События

<table>
    <thead>
        <tr>
			<th>Событие</th>
			<th>Данные</th>
			<th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="marker-click">
            <td><code><b>click</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
			<td>Вызывается при клике (или тапу) по маркеру.</td>
        </tr>
        <tr id="marker-dblclick">
            <td><code><b>dblclick</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
			<td>Вызывается при двойном клике (или двойному тапу) по маркеру.</td>
        </tr>
        <tr id="marker-mousedown">
            <td><code><b>mousedown</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
			<td>Вызывается при нажатии кнопки мыши над маркером.</td>
        </tr>
        <tr id="marker-mouseover">
            <td><code><b>mouseover</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
			<td>Вызывается при наведении курсора мыши на маркер.</td>
        </tr>
        <tr id="marker-mouseout">
            <td><code><b>mouseout</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
			<td>Вызывается, когда курсор мыши покидает область маркера.</td>
        </tr>
        <tr id="marker-contextmenu">
            <td><code><b>contextmenu</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
			<td>Вызывается при нажатии правой кнопки мыши над маркером.</td>
        </tr>
        <tr id="marker-move">
            <td><code><b>move</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается, когда маркер перемещается с помощью метода
                <a href="#marker-setlatlng"><code>setLatLng</code></a> или обычным
                <a href="#marker-dragging">перетаскиванием</a>. Старые и новые координаты попадают в
                аргументы события как <code>oldLatLng</code> и <a href="/doc/maps/ru/manual/basic-types#dglatlng"><code>latlng</code></a>.</td>
        </tr>
    </tbody>
</table>

##### События перетаскивания

<table>
    <thead>
        <tr>
			<th>Событие</th>
			<th>Данные</th>
			<th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="marker-dragstart">
            <td><code><b>dragstart</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
			<td>Вызывается, когда пользователь начинает перетаскивать маркер.</td>
        </tr>
        <tr id="marker-movestart">
            <td><code><b>movestart</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
			<td>Вызывается, когда маркер фактически начинает перемещаться во время перетаскивания.</td>
        </tr>
        <tr id="marker-drag">
            <td><code><b>drag</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
			<td>Вызывается периодически, во время перетаскивания маркера.</td>
        </tr>
        <tr id="marker-dragend">
            <td><code><b>dragend</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#dragendevent">DragEndEvent</a></code></td>
			<td>Вызывается, когда пользователь прекращает перетаскивание маркера.</td>
        </tr>
        <tr id="marker-moveend">
            <td><code><b>moveend</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
			<td>Вызывается, когда маркер фактически прекращает перемещаться во время перетаскивания.</td>
        </tr>
    </tbody>
</table>

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

<table>
    <thead>
        <tr>
			<th>Событие</th>
			<th>Данные</th>
			<th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="marker-add">
            <td><code><b>add</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается, когда слой (маркер) добавляется на карту</td>
        </tr>
        <tr id="marker-remove">
            <td><code><b>remove</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается, когда слой (маркер) удаляется с карты</td>
        </tr>
    </tbody>
</table>

События попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

<table>
    <thead>
        <tr>
			<th>Событие</th>
			<th>Данные</th>
			<th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="marker-popupopen">
            <td><code><b>popupopen</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Вызывается, когда открывается попап, привязанный к данному слою (маркеру).</td>
        </tr>
        <tr id="marker-popupclose">
            <td><code><b>popupclose</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Вызывается, когда закрываетс попап, привязанный к данному слою (маркеру).</td>
        </tr>
    </tbody>
</table>

#### Методы

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="marker-getlatlng">
            <td><code><b>getLatLng</b>()</nobr></code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Возвращает текущую географическую позицию маркера.</td>
        </tr>
        <tr id="marker-setlatlng">
            <td><code><b>setLatLng</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr>
                </code></td>
            <td><code>this</code></td>
            <td>Устанавилвает позицию маркера по переданным географическим координатам.</td>
        </tr>
        <tr id="marker-setzindexoffset">
            <td><code><b>setZIndexOffset</b>(
                    <nobr>&lt;Number&gt; <i>offset</i>)</nobr>
                </code></td>
            <td><code>this</code></td>
            <td>Изменяет <a href="#marker-zindexoffset">смещение zIndex</a> маркера.</td>
        </tr>
        <tr id="marker-seticon">
            <td><code><b>setIcon</b>(
                    <nobr>&lt;<a href="#dgicon">Icon</a>&gt; <i>icon</i>)</nobr>
                </code></td>
            <td><code>this</code></td>
            <td>Устанавливает иконку маркера</td>
        </tr>
        <tr id="marker-setopacity">
            <td><code><b>setOpacity</b>(
                    <nobr>&lt;Number&gt; <i>opacity</i>)</nobr>
                </code></td>
            <td><code>this</code></td>
            <td>Изменяет уровень прозрачности маркера. </td>
        </tr>
	    <tr id="marker-bindlabel">
	        <td><code><b>bindLabel</b>(&lt;String&gt; content, &lt;<a href="/doc/maps/ru/manual/dg-label#опции">Label options</a>&gt; options?)</code></td>
            <td><code>this</code></td>
            <td>Добавляет всплывающую подсказку для маркера или обновляет содержимое уже созданной.</td>
	    </tr>
	    <tr id="marker-unbindlabel">
	        <td><code><b>unbindLabel</b>()</code></td>
	        <td><code>this</code></td>
            <td>Отвязывает всплывающую подсказку от маркера.</td>
	    </tr>
	    <tr id="marker-showLabel">
	        <td><code><b>showLabel</b>()</code></td>
	        <td><code>this</code></td>
            <td>Показывает всплывающую подсказку (в случае использования опции
            <code><a href="/doc/maps/ru/manual/dg-label#label-static">static</a></code>).</td>
	    </tr>
	    <tr id="marker-hideLabel">
	        <td><code><b>hideLabel</b>()</code></td>
	        <td><code>this</code></td>
            <td>Скрывает всплывающую подсказку (в случае использования опции <code>static</code>).</td>
	    </tr>
    </tbody>
</table>

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

#### Обработчики взаимодействия

Свойства маркера включают в себя обработчики взаимодействия, которые позволяют контролировать
интерактивное поведение маркера, а также подключение и отключение определенных возможностей,
таких как перетаскивание (см. методы Handler). Например:

    marker.dragging.disable();

<table>
    <thead>
        <tr>
			<th>Свойство</th>
			<th>Тип</th>
			<th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="marker-dragging">
            <td><code><b>dragging</b></code></td>
            <td><code><a href="/doc/maps/manual/base-classes#dghandler">Handler</a></code></td>
			<td>Обработчик перетаскивания маркера (мышью и тачем).</td>
        </tr>
    </tbody>
</table>

### DG.Icon

Иконка, которую можно использовать при создании маркера. Например:

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

#### Создание

<table>
	<thead>
	    <tr>
            <th>Конструктор</th>
            <th>Описание</th>
	    </tr>
	</thead>
	<tbody>
	    <tr>
            <td><code><b>DG.icon</b>(
                <nobr>&lt;<a href="#icon-option">Icon options</a>&gt; <i>options</i>)</nobr>
            </code></td>
	        <td>Создает объект иконки, на основании переданных опций.</td>
	    </tr>
	</tbody>
</table>

#### Опции

<table id="dgicon-options">
    <thead>
        <tr>
			<th>Опция</th>
			<th>Тип</th>
			<th>По умолчанию</th>
			<th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="icon-iconurl">
            <td><code><b>iconUrl</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
	        <td>Обязательный URL к изображению иконки (абсолютный или относительный).</td>
        </tr>
        <tr id="icon-iconretinaurl">
            <td><code><b>iconRetinaUrl</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
	        <td>URL к изображению иконки для устройств с Retina экраном (абсолютный или относительный).</td>
        </tr>
        <tr id="icon-iconsize">
            <td><code><b>iconSize</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-types#dgpoint">Point</a></code></td>
            <td><code>null</code></td>
	        <td>Размер изображения иконки в пикселях.</td>
        </tr>
        <tr id="icon-iconanchor">
            <td><code><b>iconAnchor</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-types#dgpoint">Point</a></code></td>
            <td><code>null</code></td>
	        <td>Координаты "ножки" иконки (относительно ее левого верхнего угла).
	            Иконка будет установлена так, чтобы эта точка соответствовала географическому положению маркера.
                По умолчанию "ножка" располагается по центру иконки; дополнительно положение может быть настроено
                через отрицательные значения CSS-свойства margin.</td>
        </tr>
        <tr id="icon-popupanchor">
            <td><code><b>popupAnchor</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
	        <td>Координаты точки, из которой будет открываться попап (относительно <code>iconAnchor</code>).</td>
        </tr>
        <tr id="icon-shadowurl">
            <td><code><b>shadowUrl</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
	        <td>URL к изображению тени иконки. Если не указан, тогда тени не будет.</td>
        </tr>
        <tr id="icon-shadowretinaurl">
            <td><code><b>shadowRetinaUrl</b></code></td>
            <td><code>String </code></td>
            <td><code>null</code></td>
	        <td>URL к изображению тени иконки для устройств с Retina экраном.
                Если не указан, тогда тени не будет.</td>
        </tr>
        <tr id="icon-shadowsize">
            <td><code><b>shadowSize</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
	        <td>Размер изображения тени в пикселях.</td>
        </tr>
        <tr id="icon-shadowanchor">
            <td><code><b>shadowAnchor</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
	        <td>Координаты "ножки" тени (относительно ее левого верхнего угла).
                Значение по умолчанию такое же, как у <code>iconAnchor</code>.</td>
        </tr>
        <tr id="icon-classname">
            <td><code><b>className</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
	        <td>Значение класса, которое будет присвоено изображениям иконки и тени. По умолчанию пустое.</td>
        </tr>
    </tbody>
</table>

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Методы

<table id="dgicon-methods">
    <thead>
        <tr>
			<th>Метод</th>
			<th>Возвращает</th>
			<th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="icon-createicon">
            <td><code><b>createIcon</b>(<nobr>&lt;HTMLElement&gt; <i>oldIcon?</i>)</nobr></code></td>
            <td><code>HTMLElement</code></td>
            <td>Вызывается внутри библиотеки, когда должна быть показана иконка, возвращает
                HTML-элемент <code>&lt;img&gt;</code> со стилями, соответсвующими переданным опциям.</td>
        </tr>
        <tr id="icon-createshadow">
            <td><code><b>createShadow</b>(<nobr>&lt;HTMLElement&gt; <i>oldIcon?</i>)</nobr></code></td>
            <td><code>HTMLElement</code></td>
            <td>Тоже что и <code>createIcon</code>, но с тенью за иконкой.</td>
        </tr>
    </tbody>
</table>

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.DivIcon

Иконка для маркеров, которые используют простой элемент <code>&lt;div&gt;</code> вместо изображения.
Наследуется от <a href="#dgicon"><code>Icon</code></a>, но игнорирует опции теней и <code>iconUrl</code>.

    // вы можете установить стиль класса .my-div-icon в CSS
    var myIcon = DG.divIcon({className: 'my-div-icon'});

    DG.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

#### Создание

<table>
	<thead>
	    <tr>
	        <th>Конструктор</th>
	        <th>Описание</th>
	    </tr>
	</thead>
	<tbody>
	    <tr>
	        <td><code><b>DG.DivIcon</b>(
	            <nobr>&lt;<a href="#divicon-options">DivIcon options</a>&gt; <i>options</i> )</nobr>
	        </code></td>
	        <td>Создает объект <code>DG.DivIcon</code>, на основании переданных опций.</td>
	    </tr>
	</tbody>
</table>

#### Опции

<table>
	<thead>
	    <tr>
			<th>Опция</th>
			<th>Тип</th>
			<th>По умолчанию</th>
			<th>Описание</th>
	    </tr>
	</thead>
	<tbody>
        <tr id="divicon-html">
            <td><code><b>html</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
	        <td>HTML код, который будет установлен как содержимое иконки. По умолчанию пустой.</td>
        </tr>
        <tr id="divicon-bgpos">
            <td><code><b>bgPos</b></code></td>
            <td><code>Point </code></td>
            <td><code>[0, 0]</code></td>
            <td>Опциональное относительное позиционирование фона в пикселях</td>
        </tr>
	</tbody>
</table>

Опции, унаследованные от <a href="#dgicon-options">Icon</a> <!-- TODO: include options -->

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Методы

Методы, унаследованные от <a href="#dgicon-methods">Icon</a> <!-- TODO: include methods -->

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->
