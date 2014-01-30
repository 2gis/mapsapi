## Класс DG.Popup

{toc}

### Описание

Балун — это всплывающее окно, в котором можно отобразить произвольный HTML-код. Балун связан с определенным местом на карте.

Для открытия балуна можно использовать метод <a href="#">openPopup</a>, в таком случае одновременно может быть открыт лишь один балун, либо метод <a href="#">addLayer</a> для отображения любого количества балунов.

### Пример использования

Включить отображения балуна по клику на маркер довольно просто:

	marker.bindPopup(popupContent).openPopup();

У дополнительных слоев, таких как ломаные, также есть метод `bindPopup`. Вот более сложный пример отображения балуна:

	var popup = DG.popup()
		.setLatLng(latlng)
		.setContent('<p>Привет!<br />Я балун.</p>')
		.openOn(map);

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
			<td><code><b>DG.Popup</b>(
				<nobr>&lt;<a href="#опции">Popup options</a>&gt; <i>options?</i>,</nobr>
				<nobr>&lt;<a href="#">ILayer</a>&gt; <i>source?</i> )</nobr>
			</code></td>

			<td>
				<code>DG.popup(&hellip;)</code>
			</td>

			<td>Создает объект <code>Popup</code> с переданными опциями, описывающими внешний вид и расположение балуна, и объектом, указывающим привязку балуна к определенному объекту типа ILayer.</td>
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
			<td><code><a href="#">Point</a></code></td>
			<td><code><nobr>Point(0, 6)</nobr>
			</code></td>
			<td>Устанавливает отступ позиции балуна. Удобно для управления ножкой балуна.</td>
		</tr>
		<tr>
			<td><code><b>autoPanPaddingTopLeft</b></code></td>
			<td><code><a href="#">Point</a></code></td>
			<td><code><nobr>null</nobr>
			</code></td>
			<td>Задает расстояние от края балуна до левого верхнего угла карты при автоматическом сдвиге.</td>
		</tr>
		<tr>
			<td><code><b>autoPanPaddingBottomRight</b></code></td>
			<td><code><a href="#">Point</a></code></td>
			<td><code><nobr>null</nobr>
			</code></td>
			<td>Задает расстояние от края балуна до правого нижнего угла карты при автоматическом сдвиге.</td>
		</tr>
		<tr>
			<td><code><b>autoPanPadding</b></code></td>
			<td><code><a href="#">Point</a></code></td>
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
				<nobr>&lt;<a href="#">Map</a>&gt; <i>map</i> )</nobr>
			</code></td>

			<td><code>this</code></td>
			<td>Добавляет балун на карту.</td>
		</tr>
		<tr>
			<td><code><b>openOn</b>(
				<nobr>&lt;<a href="#">Map</a>&gt; <i>map</i> )</nobr>
			</code></td>

			<td><code>this</code></td>
			<td>Добавляет балун на карту, предварительно закрыв другие балуны. Аналогично <code>map.openPopup(popup)</code>.</td>
		</tr>
		<tr>
			<td><code><b>setLatLng</b>(
				<nobr>&lt;<a href="#">LatLng</a>&gt; <i>latlng</i> )</nobr>
			</code></td>

			<td><code>this</code></td>
			<td>Устанавливает географические координаты точки открытия балуна.</td>
		</tr>
		<tr>
			<td><code><b>getLatLng</b>(
				<nobr>&lt;<a href="#">LatLng</a>&gt; <i>latlng</i> )</nobr>
			</code></td>

			<td><code>this</code></td>
			<td>Возвращает географические координаты точки открытия балуна.</td>
		</tr>
		<tr>
			<td><code><b>setHeaderContent</b>(
				<nobr>&lt;String&gt;&nbsp;|&nbsp;&lt;HTMLElement&gt; <i>content</i> )</nobr>
			</code></td>

			<td><code>this</code></td>
			<td>Задает содержимое секции header балуна. Может принимать HTML строку или DOM-элемент.</td>
		</tr>
		<tr>
			<td><code><b>setContent</b>(
				<nobr>&lt;String&gt;&nbsp;|&nbsp;&lt;HTMLElement&gt; <i>content</i> )</nobr>
			</code></td>

			<td><code>this</code></td>
			<td>Задает содержимое секции body балуна. Может принимать HTML строку или DOM-элемент.</td>
		</tr>
		<tr>
			<td><code><b>setFooterContent</b>(
				<nobr>&lt;String&gt;&nbsp;|&nbsp;&lt;HTMLElement&gt; <i>content</i> )</nobr>
			</code></td>

			<td><code>this</code></td>
			<td>Задает содержимое секции footer балуна. Может принимать HTML строку или DOM-элемент.</td>
		</tr>
		<tr>
			<td><code><b>getContent</b>()</code></td>
			<td><code>&lt;String&nbsp;|&nbsp;HTMLElement&gt;</code></td>
			<td>Возвращает контент балуна.</td>
		</tr>
	</tbody>
</table>