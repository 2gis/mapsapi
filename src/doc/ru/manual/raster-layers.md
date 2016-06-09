## Растровые слои

В данном разделе рассматривается работа с растровыми слоями, которые могут представлять собой тайловые слои
или изображения привязанные к географическим границам.

{toc}

### DG.TileLayer

Используется для загрузки и отображения тайловых слоев на карте.
Расширяет <a href="/doc/maps/ru/manual/other-layers#dggridlayer">GridLayer</a>.

#### Пример использования

    DG.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);

##### Шаблон URL

Строка, представленная в следующем виде:

    'http://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'

Вы можете использовать свои ключи в шаблоне, которые будут подставлены из опций TileLayer:

    DG.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="tilelayer-dg-tilelayer">
            <td><code>
                    <b>DG.tilelayer</b>(
                    <nobr>&lt;String&gt;</nobr> <i>urlTemplate</i>,
                    <nobr><i>options</i></nobr>)
                </code></td>
            <td>Создает экземпляр объекта тайлового слоя с данным шаблоном URL и необязательным объектом опций.</td>
        </tr>
    </tbody>
</table>

#### Опции

<table id="tilelayer-options">
    <thead>
        <tr>
			<th>Опция</th>
			<th>Тип</th>
			<th>По умолчанию</th>
			<th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="tilelayer-minzoom">
            <td><code><b>minZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>0</code></td>
            <td>Минимальный уровень масштаба.</td>
        </tr>
        <tr id="tilelayer-maxzoom">
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>18</code></td>
            <td>Максимальный уровень масштаба.</td>
        </tr>
        <tr id="tilelayer-maxnativezoom">
            <td><code><b>maxNativeZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>null</code></td>
            <td>Максимальный уровень масштаба, который есть у тайлов. Если этот параметр установлен,
                тайлы всех уровней увеличения, выше чем <code>maxNativeZoom</code>, будут загружены
                из уровня <code>maxNativeZoom</code> и автоматически отмасштабированы.</td>
        </tr>
        <tr id="tilelayer-subdomains">
            <td><code><b>subdomains</b></code></td>
            <td><code>String|String[] </code></td>
            <td><code>&#x27;abc&#x27;</code></td>
            <td>Под-домены тайловой службы. Могут быть переданы в форме строки (где каждая буква, это имя
                под-домена) или в форме массива строк.</td>
        </tr>
        <tr id="tilelayer-errortileurl">
            <td><code><b>errorTileUrl</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>URL на тайл изображения, который надо показывать, если загрузка тайла не удалась.</td>
        </tr>
        <tr id="tilelayer-zoomoffset">
            <td><code><b>zoomOffset</b></code></td>
            <td><code>Number </code></td>
            <td><code>0</code></td>
            <td>Уровень масштаба, который используется в URL тайлов, будет скорректирован
                с учетом данного смещения.</td>
        </tr>
        <tr id="tilelayer-tms">
            <td><code><b>tms</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, инвертирует ось Y нумерации тайлов (включите эту опцию
                для <a href="https://en.wikipedia.org/wiki/Tile_Map_Service">TMS</a> сервисов).</td>
        </tr>
        <tr id="tilelayer-zoomreverse">
            <td><code><b>zoomReverse</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, уровень масштаба используемый в URL тайлов будет
                инвертировано (<code>maxZoom - zoom</code> вместо <code>zoom</code>) </td>
        </tr>
        <tr id="tilelayer-detectretina">
            <td><code><b>detectRetina</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code> и пользователь использует retina дисплей, тогда будет запрошено
                четыре тайла вместо одного. Эти тайлы будут в два раза меньше стандартного размера и на
                один уровень масштабирования больше, для того чтобы адаптироваться под более
                высокую плотность пикселей.</td>
        </tr>
        <tr id="tilelayer-crossorigin">
            <td><code><b>crossOrigin</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, у всех тайлов атрибут crossOrigin будет установлен в &#39;&#39;.
                Это необходимое условие, если вы хотите получить доступ к исходным тайлам на уровне пикселей.</td>
        </tr>
    </tbody>
</table>

Опции, унаследованные от <a href="/doc/maps/ru/manual/other-layers#gridlayer-options">GridLayer</a> <!-- TODO: include options -->


#### События

События, унаследованные от <a href="/doc/maps/ru/manual/other-layers#gridlayer-events">GridLayer</a> <!-- TODO: include events -->

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

#### Методы

<table id="tilelayer-methods">
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="tilelayer-seturl">
            <td><code><b>setUrl</b>(
                <nobr>&lt;String&gt; <i>url</i></nobr>
                <nobr>&lt;Boolean&gt; <i>noRedraw?</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Обновляет URL шаблон слоя и перерисовывает его (если параметр <code>noRedraw</code>
                не установлен в <code>true</code>). </td>
        </tr>
        <tr id="tilelayer-createtile">
            <td><code><b>createTile</b>(
                <nobr>&lt;Object&gt;</nobr> <i>coords</i>,
                <nobr>&lt;Function&gt;</nobr> <i>done?</i>)</nobr>
            </code></td>
            <td><code>HTMLElement</code></td>
            <td>Вызывается только внутри библиотеки. Перегружает метод
                <a href="/doc/maps/ru/manual/other-layers#gridlayer-createtile"><code>createTile()</code></a>
                класса GridLayer. Метод возвращает HTML-элемент <code>&lt;img&gt;</code> с соответствующим
                изображением по переданному аргументу <code>coords</code>. Функция обратного вызова
                <code>done</code> будет вызван, когда тайл будет загружен.</td>
        </tr>
    </tbody>
</table>

##### Методы расширения

Слои, расширяющие <a href="#dgtilelayer">TileLayer</a>, могут реализовать следующий метод:

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="tilelayer-gettileurl">
            <td><code><b>getTileUrl</b>(<nobr>&lt;Object&gt; <i>coords</i>)</nobr></code></td>
            <td><code>String</code></td>
            <td>Вызывается только внутри библиотеки, возвращает URL для тайла, расположенного по
                переданным координатам. Классы, расширяющие <a href="#dgtilelayer"><code>TileLayer</code></a>,
                могут перегружать эту функцию, для того чтобы предоставить собственные схемы
                именования URL тайлов.</td>
        </tr>
    </tbody>
</table>

Методы, унаследованные от GridLayer <a href="/doc/maps/ru/manual/other-layers#gridlayer-methods">GridLayer</a> <!-- TODO: include methods -->

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.TileLayer.wms

Используется для отображения WMS сервисов как тайловых слоев на карте. Расширяет <a href="#dgtilelayer">TileLayer</a>.

#### Пример использования

    var nexrad = DG.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
        layers: 'nexrad-n0r-900913',
        format: 'image/png',
        transparent: true,
        attribution: "Погодные данные © 2012 IEM Nexrad"
    });

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="tilelayer-wms-dg-tilelayer-wms">
            <td><code><b>DG.tileLayer.wms</b>(
                <nobr>&lt;String&gt; <i>baseUrl</i></nobr>,
                <nobr>&lt;<a href="#tilelayer-wms-options">TileLayer.WMS options</a>&gt; <i>options</i>)</nobr>
            </code></td>
            <td>Создает экземпляр объекта WMS тайлового слоя по переданному URL WMS-сервиса и объекту WMS-опций.</td>
        </tr>
    </tbody>
</table>

#### Опции

<table id="tilelayer-wms-options">
    <thead>
        <tr>
			<th>Опция</th>
			<th>Тип</th>
			<th>По умолчанию</th>
			<th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="tilelayer-wms-layers">
            <td><code><b>layers</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td><strong>(требуется)</strong> Разделенный запятыми список WMS-слоев для отображения.</td>
        </tr>
        <tr id="tilelayer-wms-styles">
            <td><code><b>styles</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>Разделенный запятыми список WMS-стилей.</td>
        </tr>
        <tr id="tilelayer-wms-format">
            <td><code><b>format</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;image/jpeg&#x27;</code></td>
            <td>Формат изображений WMS (используйте <code>&#39;image/png&#39;</code> для слоев с прозрачностью).</td>
        </tr>
        <tr id="tilelayer-wms-transparent">
            <td><code><b>transparent</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, WMS-сервис вернет изображения с прозрачностью.</td>
        </tr>
        <tr id="tilelayer-wms-version">
            <td><code><b>version</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;1.1.1&#x27;</code></td>
            <td>Версия WMS сервиса, которую следует использовать</td>
        </tr>
        <tr id="tilelayer-wms-crs">
            <td><code><b>crs</b></code></td>
            <td><code>CRS </code></td>
            <td><code>null</code></td>
            <td>Система координат (CRS), котрую следует использовать при WMS-запросах, по умолчанию
                установлена в CRS карты. Не изменяйте эту настройку, если вы не уверены в том, что
                она означает.</td>
        </tr>
        <tr id="tilelayer-wms-uppercase">
            <td><code><b>uppercase</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, ключи параетров WMS запросов будут переведены в верхний регистр.</td>
        </tr>
    </tbody>
</table>

Опции, унаследованные от <a href="#tilelayer-options">TileLayer</a> <!-- TODO: include options -->

Опции, унаследованные от <a href="/doc/maps/ru/manual/other-layers#gridlayer-options">GridLayer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/other-layers#gridlayer-events">GridLayer</a> <!-- TODO: include events -->

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

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
        <tr id="tilelayer-wms-setparams">
            <td><code><b>setParams</b>(
                <nobr>&lt;Object&gt; <i>params</i></nobr>,
                <nobr>&lt;Boolean&gt; <i>noRedraw?</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Расширяет объект новыми параметрами и заново запрашивает тайлы для текущего экрана
                (если <code>noRedraw</code> не был установлен в true).</td>
        </tr>
    </tbody>
</table>

Методы, унаследованные от  TileLayer <a href="#tilelayer-methods">TileLayer</a> <!-- TODO: include methods -->

Методы, унаследованные от GridLayer <a href="/doc/maps/ru/manual/other-layers#gridlayer-methods">GridLayer</a> <!-- TODO: include methods -->

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->

### DG.ImageOverlay

Используется для загрузки и отображения указанного изображения в определенной области карты. Расширяет Layer.

#### Пример использования

    var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
        imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
    DG.imageOverlay(imageUrl, imageBounds).addTo(map);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="imageoverlay-dg-imageoverlay">
            <td><code><b>DG.imageOverlay</b>(
                <nobr>&lt;String&gt; <i>imageUrl</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                <nobr>&lt;ImageOverlay options&gt; <i>options?</i></nobr>)
            </code></td>
            <td>Создает экземпляр слоя с изображением по переданному URL изображения и
                географическим координатам, к которым оно привязано.</td>
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
        <tr id="imageoverlay-opacity">
            <td><code><b>opacity</b></code></td>
            <td><code>Number </code></td>
            <td><code>1.0</code></td>
            <td>Прозрачность слоя с изображением.</td>
        </tr>
        <tr id="imageoverlay-alt">
            <td><code><b>alt</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>Текст для атрибута <code>alt</code> изобаржения.</td>
        </tr>
        <tr id="imageoverlay-interactive">
            <td><code><b>interactive</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, слой изображения будет генерировать события мыши при кликах или наведении курсора.</td>
        </tr>
        <tr id="imageoverlay-crossorigin">
            <td><code><b>crossOrigin</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, атрибут изображения <code>crossOrigin</code> будет установлен в &#39;&#39;.
                Это необходимое условие, если вы хотите получить доступ к изображению на уровне пикселей.</td>
        </tr>
    </tbody>
</table>

Оцпии, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-options">Layer</a> <!-- TODO: include options -->

#### События

События, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-events">Layer</a> <!-- TODO: include events -->

События попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-events">Layer</a> <!-- TODO: include popup events -->

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
        <tr id="imageoverlay-setopacity">
            <td><code><b>setOpacity</b>()</nobr></code></td>
            <td><code>this</code></td>
            <td>Устанавливает прозрачность слоя.</td>
        </tr>
        <tr id="imageoverlay-bringtofront">
            <td><code><b>bringToFront</b>()</nobr></code></td>
            <td><code>this</code></td>
            <td>Перемещает слой выше других слоев.</td>
        </tr>
        <tr id="imageoverlay-bringtoback">
            <td><code><b>bringToBack</b>()</nobr></code></td>
            <td><code>this</code></td>
            <td>Перемещает слой ниже других слоев.</td>
        </tr>
        <tr id="imageoverlay-seturl">
            <td><code><b>setUrl</b>(<nobr>&lt;String&gt; <i>url</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Изменяет URL изображения.</td>
        </tr>
    </tbody>
</table>

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->
