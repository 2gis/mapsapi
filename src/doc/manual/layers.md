## Слои

{toc}

### Описание

API карт позволяет накладывать пользовательские растровые слои поверх слоя карты. Это дает возможность отображать на карте практически любые графические объекты. Используемая по умолчанию система координат &mdash; <a href="http://ru.wikipedia.org/wiki/WGS_84" target="_blank">WGS84</a>.

### Класс DG.TileLayer

Используется для загрузки и отображения тайлового слоя, реализует интерфейс <a href="/doc/maps/manual/interfaces#ilayer">ILayer</a>.

    var url = 'http://tile{s}.traffic.2gis.ru/novosibirsk/traffic/{z}/{x}/{y}/speed/0/';
    DG.tileLayer(url, {subdomains: '012'}).addTo(map);

#### Конструктор
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
			<td><code><b>DG.TileLayer</b>(
				<nobr>&lt;String&gt; <i><a href="#шаблон-url">urlTemplate</a></i>,</nobr>
				<nobr>&lt;<a href="#опции">TileLayer options</a>&gt; <i>options?</i> )</nobr>
			</code></td>

			<td>
				<code>DG.tileLayer(&hellip;)</code>
			</td>

			<td>Создает объект тайлового слоя по переданному <a href="#шаблон-url">шаблону URL</a> и необязательному объекту опций.</td>
		</tr>
	</tbody>
</table>

#### Шаблон URL

Строка следующего вида:

	'http://{s}.somedomain.com/blabla/{z}/{x}/{y}.png'

`{s}` &mdash; один из доступных поддоменов (используется для параллельной загрузки тайлов браузером). Поддомены указываются в опциях. `a`, `b` или `c` &mdash; значения по умолчанию, `{z}` &mdash; уровень зума, `{x}` и `{y}` &mdash; координаты тайлов в тайловой сетке.

В шаблонах можно использовать собственные ключи, например так:

	DG.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});

#### Опции
<table id = "tilelayer-options">
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
			<td>Максимальный уровень зума исходных тайлов. Если значение установлено, на всех уровнях зума больше <code>maxNativeZoom</code> будут отображены смасштабированные тайлы максимально доступного зума.</td>
		</tr>
		<tr>
			<td><code><b>tileSize</b></code></td>
			<td><code>Number</code></td>
			<td><code>256</code></td>
			<td>Размер тайла (ширина и высота в пикселях, предполагается что тайл квадратный).</td>
		</tr>
		<tr>
			<td><code><b>subdomains</b></code></td>
			<td><code>String</code> или <code>String[]</code></td>
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
			<td>Задает z-index тайлового слоя. По умолчанию не установлен.</td>
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
			<td>Если установлено значение <code>true</code> и у пользователя устройство с Retina экраном, тогда вместо одного тайла будет загружено 4 с большего уровня масштабирования, также изображениям устанавливается размер на 50% меньше их реального разрешения. Таким образом достигается лучшее качество отображения тайлов на экранах с высоким разрешением.</td>
		</tr>
		<tr>
			<td><code><b>reuseTiles</b></code></td>
			<td><code><code>Boolean</code></code></td>
			<td><code>false</code></td>
			<td>Если установлено значение <code>true</code>, тогда все тайлы, которые не видны после изменения центра карты, добавляются в очередь переиспользования, из которой они будут взяты, если опять попадут в область видимости.</td>
		</tr>
	</tbody>
</table>

#### События

Вы можете подписаться на следующие события используя <a href="/doc/maps/manual/events#методы-управления-событиями">эти методы</a>.
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
			<td><code><b>loading</b></code></td>
			<td><code><a href="/doc/maps/manual/events#event">Event</a></code>
			<td>Вызывается при начале загрузки тайлов.</td>
		</tr>
		<tr>
			<td><code><b>load</b></code></td>
			<td><code><a href="/doc/maps/manual/events#event">Event</a></code>
			<td>Вызывается при окончании загрузки видимых тайлов.</td>
		</tr>
		<tr>
	      <td><code><b>tileloadstart</b></code></td>
	      <td><code><a href="/doc/maps/manual/events#tileevent">TileEvent</a></code></td>
	      <td>Вызывается при запросе тайла и начале его загрузки.</td>
	    </tr>
		<tr>
			<td><code><b>tileload</b></code></td>
			<td><code><a href="/doc/maps/manual/events#tileevent">TileEvent</a></code>
			<td>Вызывается после загрузки тайла.</td>
		</tr>
		<tr>
			<td><code><b>tileunload</b></code></td>
			<td><code><a href="/doc/maps/manual/events#tileevent">TileEvent</a></code>
			<td>Вызывается при удалении тайла (например, при включенном режиме <code>unloadInvisibleTiles</code>).</td>
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
		<tr>
			<td><code><b>addTo</b>(
				<nobr>&lt;<a href="/doc/maps/manual/map#описание">Map</a>&gt; <i>map</i> )</nobr>
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
				<nobr>&lt;String&gt; <i><a href="#шаблон-url">urlTemplate</a></i> )</nobr>
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
	</tbody>
</table>

### Класс DG.TileLayer.WMS

Используется для отображения данных WMS сервисов. Расширяет <a href="#класс-dgtilelayer">TileLayer</a>.

	var nexrad = DG.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
		layers: 'nexrad-n0r-900913',
		format: 'image/png',
		transparent: true,
		attribution: "Weather data © 2014 IEM Nexrad"
	});

#### Конструктор
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
			<td><code><b>DG.TileLayer.WMS</b>(
				<nobr>&lt;String&gt; <i>baseUrl</i></nobr>,
				<nobr>&lt;<a href="#опции-1">TileLayer.WMS options</a>&gt; <i>options</i> )</nobr>
			</code></td>

			<td>
				<code>DG.tileLayer.wms(&hellip;)</code>
			</td>

			<td>Создает объект тайлового WMS слоя по переданному URL WMS-сервиса и объекту опций.</td>
		</tr>
	</tbody>
</table>


#### Опции

Включает все <a href="#опции">опции TileLayer</a> и дополнительно:
<table id = "tilelayer-wms-options">
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
			<td><code><b>layers</b></code></td>
			<td><code>String</code></td>
			<td><code>''</code></td>
			<td>Обязательный список WMS слоев для отображения, разделяются запятой.</td>
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
		<tr>
			<td><code><b>setParams</b>(
				<nobr>&lt;<a href="#опции-1">WMS parameters</a>&gt; <i>params</i></nobr>,
				<nobr>&lt;Boolean&gt; <i>noRedraw?</i> )</nobr>
			</code></td>
			<td><code>this</code></td>
			<td>Сливает объект с новыми параметрами и перезапрашивает тайлы текущей области видимости (если опция <code>noRedraw</code> не установлена в <code>true</code>).</td>
		</tr>
	</tbody>
</table>

### Класс DG.TileLayer.Canvas

Используется для создания тайлового слоя на основе сanvas, при этом тайлы отрисовываются на стороне браузера. Расширяет <a href="#класс-dgtilelayer">TileLayer</a>.

	var canvasTiles = DG.tileLayer.canvas();
	canvasTiles.drawTile = function(canvas, tilePoint, zoom) {
		var ctx = canvas.getContext('2d');
		// отрисовываем тайл
	}

#### Конструктор
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
			<td><code><b>DG.TileLayer.Canvas</b>(
				<nobr>&lt;<a href="#опции">TileLayer options</a>&gt; <i>options?</i> )</nobr>
			</code></td>
			<td>
				<code>DG.tileLayer.canvas(&hellip;)</code>
			</td>
			<td>Создает объект canvas-слоя с необязательными опциями.</td>
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
		<tr>
			<td><code><b>async</b></code></td>
			<td><code>Boolean</code></td>
			<td><code>false</code></td>
			<td>Указывает на то, что тайлы будут отрисовываться асинхронно. Метод <a href="#tilelayer-canvas-tiledrawn">tileDrawn</a> должен быть вызван для каждого тайла после завершения отрисовки.</td>
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
		<tr id = "tilelayer-canvas-drawtile">
			<td><code><b>drawTile</b>(
				<nobr>&lt;HTMLCanvasElement&gt; <i>canvas</i></nobr>,
				<nobr>&lt;<a href="/doc/maps/manual/base-classes#класс-dgpoint">Point</a>&gt; <i>tilePoint</i></nobr>,
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
	</tbody>
</table>

### Класс DG.ImageOverlay

Используется для загрузки и отображения одного изображения в определенной области карты, реализует интерфейс <a href="/doc/maps/manual/interfaces#ilayer">ILayer</a>.

	var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
		imageBounds = [[54.712216, 82.22655], [54.773941, 82.12544]];
	DG.imageOverlay(imageUrl, imageBounds).addTo(map);

#### Конструктор
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
			<td><code><b>DG.ImageOverlay</b>(
				<nobr>&lt;String&gt; <i>imageUrl</i></nobr>,
				<nobr>&lt;<a href="/doc/maps/manual/base-classes#класс-dglatlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
				<nobr>&lt;<a href="#опции-3">ImageOverlay options</a>&gt; <i>options?</i> )</nobr>
			</code></td>

			<td>
				<code>DG.imageOverlay(&hellip;)</code>
			</td>

			<td>Создает объект изображения дополнительного слоя по переданному URL и географическим координатам, к которым оно привязано.</td>
		</tr>
	</tbody>
</table>

#### Опции
<table id = "imageoverlay-options">
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
			<td><code><b>opacity</b></code></td>
			<td><code>Number</code></td>
			<td><code>1.0</code></td>
			<td>Прозрачность слоя.</td>
		</tr>
		<tr>
			<td><code><b>attribution</b></code></td>
			<td><code>String</code></td>
			<td><code>''</code></td>
			<td>Текст атрибуции слоя.</td>
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
		<tr>
			<td><code><b>addTo</b>(
				<nobr>&lt;<a href="/doc/maps/manual/map#описание">Map</a>&gt; <i>map</i> )</nobr>
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
	</tbody>
</table>