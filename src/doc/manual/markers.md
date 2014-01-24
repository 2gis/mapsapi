## DG.Marker

{toc}

Используется для добавления маркеров на карту.

	DG.marker([54.98, 82.89]).addTo(map);

### Конструктор
<table>
	<thead>
        <tr>
            <th>Конструктор</th>
            <th>Использование</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
		<tr>
			<td><code><b>DG.Marker</b>(
				<nobr>&lt;<a href="latlng">LatLng</a>&gt; <i>latlng</i>,</nobr>
				<nobr>&lt;<a href="#опции">Marker options</a>&gt; <i>options?</i> )</nobr>
			</code></td>

			<td>
				<code>DG.marker(&hellip;)</code>
			</td>

			<td>Создает объект маркера с переданными географическими координатами и необязательными опциями.</td>
		</tr>
	</tbody>
</table>

### Опции
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
		<tr>
			<td id = "icon"><code><b>icon</b></code></td>
			<td><code><a href="icon">DG.Icon</a></code></td>
			<td>*</td>
			<td>Иконка, используемая для отображения маркера. См. <a href="icon">DG.Icon</a>.</td>
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
			<td>Возможность перетаскивать маркер.</td>
		</tr>
		<tr>
			<td><code><b>title</b></code></td>
			<td><code>String</code></td>
			<td><code>''</code></td>
			<td>Текст подсказки при наведении курсора на маркер (по умолчанию не отображается).</td>
		</tr>
		<tr>
			<td><code><b>alt</b></code></td>
			<td><code>String</code></td>
			<td><code>''</code></td>
			<td>Текст для alt атрибута иконки.</td>
		</tr>
		<tr id="marker-zindexoffset">
			<td><code><b>zIndexOffset</b></code></td>
			<td><code>Number</code></td>
			<td><code>0</code></td>
			<td>По умолчанию, свойство z-index изображения маркера устанавливается автоматически. Используйте эту опцию, если необходимо разместить маркер поверх (или под) другим элементом, указав наибольшее (или наименьшее) значение.</td>
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
	</tbody>
</table>

### События

Вы можете подписаться на следующие события используя <a href="#">эти методы</a>.

<table>
	<thead>
		<tr>
			<th>Событие</th>
			<th>Данные</th>
			<th>Описание</th>
		</tr>
	</thead>
	<tbody>
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
			<td>Вызывается при перемещении маркера с помощью метода <code>setLatLng.</code></td>
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
	</tbody>
</table>

### Методы
<table>
	<thead>
		<tr>
			<th>Метод</th>
			<th>Возвращает</th>
			<th>Описание</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code><b>addTo</b>(
				<nobr>&lt;<a href="map">Map</a>&gt; <i>map</i> )</nobr>
			</code></td>

			<td><code>this</code></td>
			<td>Добавляет маркер на карту.</td>
		</tr>
		<tr>
			<td><code><b>getLatLng</b>()</code></td>
			<td><code><a href="latlng">LatLng</a></code></td>
			<td>Возвращает текущие географические координаты маркера.</td>
		</tr>
		<tr>
			<td><code><b>setLatLng</b>(
				<nobr>&lt;<a href="latlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
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
	</tbody>
</table>

### Обработчики взаимодействия

Свойства маркера включают в себя обработчики взаимодействия, которые позволяют контролировать интерактивное поведение маркера, а также подключение и отключение определенных возможностей, таких как перетаскивание. Например:

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
		<tr>
			<td>dragging</td>
			<td><a href="#ihandler"><code>IHandler</code></a></td>
			<td>Обработчик перетаскивания маркера.</td>
		</tr>
	</tbody>
</table>