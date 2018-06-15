## Карта

В данном разделе описывается основной класс API карт, который используется для создания и управления картой на странице.

{toc}

### DG.Map

#### Пример использования

Инициализация карты в элементе <code>div</code> с id &quot;map&quot;, с указанием координат центра и коэффициента
масштабирования:

    var map = DG.map('map', {
        center: [54.98, 82.89],
        zoom: 13
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
        <tr id="map-l-map">
            <td><code><b>DG.map</b>(
                <nobr>&lt;String&gt;> <i>id</i>,</nobr>
                <nobr>&lt;Map options&gt;> <i>options?</i> )</nobr>
            </code></td>
            <td>Инициализирует карту в DOM-узле <code>&lt;div&gt;</code> элемента с указанным id с необязательным
                набором опций, которые описаны ниже.</td>
        </tr>
        <tr>
            <td><code><b>DG.map</b>(
                <nobr>&lt;HTMLElement&gt; <i>el</i>,</nobr>
                <nobr>&lt;Map options&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Инициализирует карту в переданном DOM-узле <code>&lt;div&gt;</code> элемента с необязательным набором
                опций, которые описаны ниже.</td>
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
        <tr id="map-prefercanvas">
            <td><code><b>preferCanvas</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Должны ли экземпляры <a href="/doc/maps/ru/manual/vector-layers#dgpath"><code>Path</code></a>
                отрисовываться на <a href="/doc/maps/ru/manual/vector-layers#dgcanvas">
                <code>Canvas</code></a>. По умолчанию все экземпляры <code>Path</code>
                отрисовываются с помощью <a href="/doc/maps/ru/manual/vector-layers#dgsvg"><code>SVG</code></a> рендерера.
            </td>
        </tr>
    </tbody>
</table>

##### Опции элементов управления

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
            <td><code><b>zoomControl</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Добавлен ли <a href="/doc/maps/ru/manual/controls#dgcontrol.zoom">элемент управления масштабом</a>
                на карту.
            </td>
        </tr>
        <tr>
            <td><code><b>fullscreenControl</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Добавлена ли <a href="/doc/maps/ru/manual/controls#dgcontrol.fullscreen">
                кнопка включения полноэкранного режима</a> на карту.
            </td>
        </tr>
    </tbody>
</table>

##### Опции взаимодействия

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
            <td><code><b>closePopupOnClick</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Закрывать ли попапы при клике в карту.</td>
        </tr>
        <tr id="map-zoomsnap">
            <td><code><b>zoomSnap</b></code></td>
            <td><code>Number </code></td>
            <td><code>1</code></td>
            <td>Всегда приводит уровень масштабирования к значению кратному данному параметру. Приведение
                происходит сразу после выполнения <a href="#map-fitbounds"><code>fitBounds()</code></a>
                или изменения масштаба &quot;щипком&quot; (pinch-zoom). По умолчанию уровень масштабирования
                приводится к ближайшему целому числу; меньшие значения (например, <code>0.5</code> или
                <code>0.1</code>) позволяют более точно управлять приведением масшатаба. Значение <code>0</code>
                говорит о том, что уровень масштабирования не будет приводиться после <code>fitBounds</code>
                или изменения масштаба &quot;щипком&quot;.
            </td>
        </tr>
        <tr id="map-zoomdelta">
            <td><code><b>zoomDelta</b></code></td>
            <td><code>Number </code></td>
            <td><code>1</code></td>
            <td>Управляет тем, насколько изменится уровень масштаба после
                <a href="#map-zoomin"><code>zoomIn()</code></a>,
                <a href="#map-zoomout"><code>zoomOut()</code></a>, нажатия <code>+</code> или
                <code>-</code> на клавиатуре или используя
                <a href="/doc/maps/ru/manual/controls#dgcontrol.zoom">элемент управления масштабом</a>.
                Значения меньшие чем <code>1</code> (например, <code>0.5</code>) предоставляют большую точность.
            </td>
        </tr>
        <tr id="map-trackresize">
            <td><code><b>trackResize</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Обновляется ли карта при изменении размера окна браузера.</td>
        </tr>
        <tr id="map-boxzoom">
            <td><code><b>boxZoom</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Может ли масштаб карты быть изменен с помощью box-масштабирования (shift + выделение мышью).</td>
        </tr>
        <tr id="map-doubleclickzoom">
            <td><code><b>doubleClickZoom</b></code></td>
            <td><code>Boolean|String </code></td>
            <td><code>true</code></td>
            <td>Разрешено ли увеличивать масштаб карты двойным кликом мыши (удерживание Shift позволяет уменьшать
                масштаб). Если передано значение <code>center</code>, карта всегда масштабируется отностиельно центра
                просматриваемой области, независимо от положения курсора.
            </td>
        </tr>
        <tr id="map-dragging">
            <td><code><b>dragging</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Разрешено ли перетаскивать карту мышью или тачем.</td>
        </tr>
        <tr id="map-geoclicker">
            <td><code><b>geoclicker</b></code></td>
            <td><code>Boolean | Object</code></td>
            <td><code>false</code></td>
            <td>Включено ли геокодирование по клику (геокликер). Если <code>false</code>, тогда при клике в любой объект
                карты (улицы, дома, остановки) не будет отображаться информация об этом объекте. Если
                в качестве параметра передан объект с опциями, тогда геокликер будет включен. Опции
                <code>showPhotos</code> и <code>showBooklet</code> позволяют отключить в балуне организации ссылки на буклеты
                и фотографии.
            </td>
        </tr>
        <tr id="map-projectdetector">
            <td><code><b>projectDetector</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Включает или отключает механизм определения проектов 2ГИС. Проект — это агломерация,
                включающая крупный город и ближайшие населённые пункты.
            </td>
        </tr>
        <tr id="map-tilescheck">
            <td><code><b>tilesCheck</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Возвращается ли карта к предыдущему состоянию, если на целевом уровне
                масштабирования нет тайлов.
            </td>
        </tr>
        <tr id="map-museum">
            <td><code><b>museum</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Будет ли отображаться сообщение о том, что браузер не поддерживается.</td>
        </tr>
    </tbody>
</table>

##### Опции состояния карты

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
        <tr id="map-center">
            <td><code><b>center</b></code></td>
            <td><code>LatLng </code></td>
            <td><code>undefined</code></td>
            <td>Начальный географический центр карты.</td>
        </tr>
        <tr id="map-zoom">
            <td><code><b>zoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>undefined</code></td>
            <td>Начальный уровень масштаба.</td>
        </tr>
        <tr id="map-minzoom">
            <td><code><b>minZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>undefined</code></td>
            <td>Минимальный уровень масштабируемости карты. Переопределяет свойство <code>minZoom</code>
                используемых слоев.
            </td>
        </tr>
        <tr id="map-maxzoom">
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>undefined</code></td>
            <td>Максимальный уровень масштабируемости карты. Переопределяет свойство <code>maxZoom</code>
                используемых слоев.
            </td>
        </tr>
        <tr id="map-layers">
            <td><code><b>layers</b></code></td>
            <td><code>Layer[] </code></td>
            <td><code>[]</code></td>
            <td>Массив слоев, которые изначально будут добавлены на карту.</td>
        </tr>
        <tr id="map-maxbounds">
            <td><code><b>maxBounds</b></code></td>
            <td><code>LatLngBounds </code></td>
            <td><code>null</code></td>
            <td>Если свойство установлено, карта ограничивает область просмотра согласно заданным географическим
                границам, &quot;отбрасывая&quot; пользователя назад, если он пытается выйти за пределы установленных границ,
                а также не позволяет уменьшить масштаб так, чтобы можно было просмотреть неразрешенные участки
                карты. Для установки ограничения динамически, используйте метод
                <a href="#map-setmaxbounds">setMaxBounds</a>.
            </td>
        </tr>
        <tr id="map-renderer">
            <td><code><b>renderer</b></code></td>
            <td><code>Renderer </code></td>
            <td><code>*</code></td>
            <td>Метод, который используется для отрисовки векторных слоев на карте.
                По умолчанию устанавливается
                <a href="/doc/maps/ru/manual/vector-layers#dgsvg"><code>DG.SVG</code></a> или
                <a href="/doc/maps/ru/manual/vector-layers#dgcanvas"><code>DG.Canvas</code></a>
                в зависимости от поддержки браузером.
            </td>
        </tr>
        <tr id="map-poi">
            <td><code><b>poi</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Отображать ли точки интереса на карте.</td>
        </tr>
        <tr id="map-currentlang">
            <td><code><b>currentLang</b></code></td>
            <td><code>string</code></td>
            <td><code>''</code></td>
            <td>Язык пользовательского интерфейса карты (см. <a href="/doc/maps/ru/manual/dg-locale/">Локализация</a>)</td>
        </tr>
    </tbody>
</table>

##### Опции анимации

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
        <tr id="map-fadeanimation">
            <td><code><b>fadeAnimation</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Включена ли анимация затухания тайлов. По умолчанию включена во всех браузерах
                поддерживающих CSS3 transitions, кроме Android.
            </td>
        </tr>
        <tr id="map-markerzoomanimation">
            <td><code><b>markerZoomAnimation</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Включена ли анимация масштабирования маркеров при анимации масштабирования карты,
                если выключена, тогда маркеры пропадают во время анимации карты. По умолчанию включена
                во всех браузерах поддерживающих CSS3 transitions, кроме Android.
            </td>
        </tr>
        <tr id="map-transform3dlimit">
            <td><code><b>transform3DLimit</b></code></td>
            <td><code>Number </code></td>
            <td><code>2^23</code></td>
            <td>Определяет максимальное значение CSS translation transform. Значение по умолчанию
                изменять не стоит, до тех пор пока браузер не начинает позиционировать слои в
                неправильном месте после большего смещения в результате <code>panBy</code>.
            </td>
        </tr>
        <tr id="map-zoomanimation">
            <td><code><b>zoomAnimation</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Включена ли анимация масштабирования тайлов. По умолчанию включена во всех браузерах
                поддерживающих CSS3 transitions, кроме Android.
            </td>
        </tr>
        <tr id="map-zoomanimationthreshold">
            <td><code><b>zoomAnimationThreshold</b></code></td>
            <td><code>Number </code></td>
            <td><code>4</code></td>
            <td>Порог, начиная с которого будет отключаться анимация масштабирования.</td>
        </tr>
    </tbody>
</table>

##### Опции инерции при перемещении

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
        <tr id="map-inertia">
            <td><code><b>inertia</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>*</code></td>
            <td>
                Если опция включена, тогда создается эффект инерции при движении карты &mdash; при
                перетаскивании карта продолжает движение в том же направлении какое-то время. Полезно
                для тач-устройств. По умолчанию, эта опция включена везде, за исключением старых
                Android-устройств.
            </td>
        </tr>
        <tr id="map-inertiadeceleration">
            <td><code><b>inertiaDeceleration</b></code></td>
            <td><code>Number </code></td>
            <td><code>3000</code></td>
            <td>Величина, на которую замедляется движение карты, указывается в пикселях/секунду<sup>2</sup>.</td>
        </tr>
        <tr id="map-inertiamaxspeed">
            <td><code><b>inertiaMaxSpeed</b></code></td>
            <td><code>Number </code></td>
            <td><code>Infinity</code></td>
            <td>Максимальная скорость инерционного движения, указывается в пикселях/секунду.</td>
        </tr>
        <tr id="map-easelinearity">
            <td><code><b>easeLinearity</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.2</code></td>
            <td></td>
        </tr>
        <tr id="map-worldcopyjump">
            <td><code><b>worldCopyJump</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Опция позволяет зациклить просмотр карты с сохранением слоев и маркеров на ней.</td>
        </tr>
        <tr id="map-maxboundsviscosity">
            <td><code><b>maxBoundsViscosity</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.0</code></td>
            <td>Если установлено свойство <code>maxBounds</code>, эта опция позволяет контролировать
                &quot;прочность&quot; границ при перемещении карты мышью или тачем. Значение по умолчанию
                <code>0.0</code> &mdash; позволяет пользователю перемещать карту за ее границы с нормальной
                скоростью, чем выше значение, тем меньше будет скорость при пермещении за пределы границы карты.
                При значении <code>0.1</code>, границы становятся полностью &quot;непроницаемы&quot;, предотвращая любое
                перемещение карты вне их пределов.
            </td>
        </tr>
    </tbody>
</table>

##### Опции навигации клавишами

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
        <tr id="map-keyboard">
            <td><code><b>keyboard</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Устанавливает фокус на карту и позволяет перемещаться по карте с помощью
                кнопок <code>+</code>/<code>-</code> и стрелок клавиатуры.
            </td>
        </tr>
        <tr id="map-keyboardpandelta">
            <td><code><b>keyboardPanDelta</b></code></td>
            <td><code>Number </code></td>
            <td><code>80</code></td>
            <td>Указывает, на сколько пикселей сдвинется карта, при нажатии стрелки на клавиатуре.</td>
        </tr>
    </tbody>
</table>

##### Опции колеса мыши

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
        <tr id="map-scrollwheelzoom">
            <td><code><b>scrollWheelZoom</b></code></td>
            <td><code>Boolean | String </code></td>
            <td><code>true</code></td>
            <td>Можно ли изменять масштаб карты с помощью колеса мыши. Если в качестве параметра
                передано значение <code>&#39;center&#39;</code>, изменение масштаба будет происходить
                относительно центра просматриваемой области, вне зависимости от позиции указателя
                мыши.
            </td>
        </tr>
        <tr id="map-wheeldebouncetime">
            <td><code><b>wheelDebounceTime</b></code></td>
            <td><code>Number </code></td>
            <td><code>40</code></td>
            <td>Ограничевает частоту, с которой прокрутка колеса мыши будет отправлять событие на изменение
                масштаба (в милисекундах). По умолчанию, пользователь не может изменять масштаб карты
                более чем один раз в 40 мс.
            </td>
        </tr>
        <tr id="map-wheelpxperzoomlevel">
            <td><code><b>wheelPxPerZoomLevel</b></code></td>
            <td><code>Number </code></td>
            <td><code>50</code></td>
            <td>Какое количество пикселей прокрутки (можно определить через
                <a href="/doc/maps/ru/manual/dom-utils#domevent-getwheeldelta">DG.DomEvent.getWheelDelta</a>)
                означает изменение на один уровень масштабирования. Меньшие значения
                будут изменять масштаб карты, с помощью колеса, быстрей (и наоборот).
            </td>
        </tr>
    </tbody>
</table>

##### Опции взаимодействия на тач-устройствах

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
        <tr id="map-tap">
            <td><code><b>tap</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Активирует поддержку мгновенных тапов (отключение задержки в 200мс в iOS/Android)
                и долгих тапов (в этом случае посылается событие <code>contextmenu</code>).
            </td>
        </tr>
        <tr id="map-taptolerance">
            <td><code><b>tapTolerance</b></code></td>
            <td><code>Number </code></td>
            <td><code>15</code></td>
            <td>Максимальное число пикселей, на которое пользователь может сдвинуть свой палец во
                время тача, для того, чтобы это событие было воспринято как тап.
            </td>
        </tr>
        <tr id="map-touchzoom">
            <td><code><b>touchZoom</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>*</code></td>
            <td>Разрешено ли изменять масштаб карты двумя пальцами на тач-устройствах.
                Если передано значение <code>&#39;center&#39;</code>, карта всегда будет масштабироваться
                относительно центра просматриваемой области, независимо от того, где на карте произошли
                события тача. Активируется в веб-браузерах с тач поддержкой, за исключением устройств со
                старой версией Android.
            </td>
        </tr>
        <tr id="map-bounceatzoomlimits">
            <td><code><b>bounceAtZoomLimits</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, карта будет возвращаться к допустимому масштабу,
                когда пользователь будет пытаться выйти за предельный максимальный/минимальный
                масштаб карты с помощью масштабирования пальцами.
            </td>
        </tr>
    </tbody>
</table>

#### События

##### События слоев

<table>
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-layeradd">
            <td><code><b>layeradd</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#layerevent">LayerEvent</a></code></td>
            <td>Вызывается при добавлении нового слоя на карту.</td>
        </tr>
        <tr id="map-layerremove">
            <td><code><b>layerremove</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#layerevent">LayerEvent</a></code></td>
            <td>Вызывается при удалении слоя с карты.</td>
        </tr>
    </tbody>
</table>

##### События изменения состояния карты

<table>
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-zoomlevelschange">
            <td><code><b>zoomlevelschange</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается, если при добавлении или удалении слоя карты изменилось
                количество доступных уровней масштабирования.
            </td>
        </tr>
        <tr id="map-resize">
            <td><code><b>resize</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается при изменении размера карты.</td>
        </tr>
        <tr id="map-unload">
            <td><code><b>unload</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается при удалении карты c помощью метода <a href="#map-remove">remove</a>.</td>
        </tr>
        <tr id="map-viewreset">
            <td><code><b>viewreset</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается, когда нужно перерисовать содержимое карты (обычно при
                изменении масштаба или загрузке). Полезно при создании дополнительных слоев.
            </td>
        </tr>
        <tr id="map-load">
            <td><code><b>load</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается при инициализации карты (при первой установке ее центра и масштаба).</td>
        </tr>
        <tr id="map-zoomstart">
            <td><code><b>zoomstart</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается в начале изменения масштаба (перед анимацией изменения масштаба).</td>
        </tr>
        <tr id="map-movestart">
            <td><code><b>movestart</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается в начале изменения области просмотра карты (например, когда пользователь
                начинает перетаскивать карту).
            </td>
        </tr>
        <tr id="map-zoom">
            <td><code><b>zoom</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается периодически, в течении любого изменения уровня масштаба,
                включая анимации перелета.
            </td>
        </tr>
        <tr id="map-move">
            <td><code><b>move</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается периодически, во время любого передвижения карты, включая
                анимации перелета.
            </td>
        </tr>
        <tr id="map-zoomend">
            <td><code><b>zoomend</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается после изменения масштаба и анимаций.</td>
        </tr>
        <tr id="map-moveend">
            <td><code><b>moveend</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается при окончании передвижения карты (например, когда пользователь
                прекращает перетаскивать карту).
            </td>
        </tr>
        <tr id="map-projectchange">
            <td><code><b>projectchange</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#projectevent">ProjectEvent</a></code></td>
            <td>Вызывается при перемещении пользователя из одного
                <a href="#map-projectdetector">проекта 2ГИС</a> в другой.
            </td>
        </tr>
        <tr id="map-projectleave">
            <td><code><b>projectleave</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#projectevent">ProjectEvent</a></code></td>
            <td>Вызывается при выходе пользователя из текущего
                <a href="#map-projectdetector">проекта 2ГИС</a>.
            </td>
        </tr>
        <tr id="map-entranceshow">
            <td><code><b>entranceshow</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается при отображении входа в здание.</td>
        </tr>
        <tr id="map-entrancehide">
            <td><code><b>entrancehide</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается при скрытии входа в здание.</td>
        </tr>
        <tr id="map-poihover">
            <td><code><b>poihover</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#poievent">MetaEvent</a></code></td>
            <td>Вызывается при наведении курсора мыши на точку интереса.</td>
        </tr>
        <tr id="map-poileave">
            <td><code><b>poileave</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#poievent">MetaEvent</a></code></td>
            <td>Вызывается, когда курсор мыши покидает область точки интереса.</td>
        </tr>
        <tr id="map-langchange">
            <td><code><b>langchange</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#langevent">LangEvent</a></code></td>
            <td>Вызывается при изменении языка карты.</td>
        </tr>
    </tbody>
</table>

##### События попапа

<table>
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-popupopen">
            <td><code><b>popupopen</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Вызывается при открытии попапа.</td>
        </tr>
        <tr id="map-popupclose">
            <td><code><b>popupclose</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Вызывается при закрытии попапа.</td>
        </tr>
        <tr id="map-autopanstart">
            <td><code><b>autopanstart</b></code></td>
            <td><code></code></td>
            <td>Вызывается, когда карта начинает двигаться после появления попапа.</td>
        </tr>
    </tbody>
</table>

##### События взаимодействий

<table>
    <thead>
        <tr>
            <th>События</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-click">
            <td><code><b>click</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Вызывается при клике (или тапе) по карте.</td>
        </tr>
        <tr id="map-dblclick">
            <td><code><b>dblclick</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Вызывается при двойном клике (или двойном тапе) по карте.</td>
        </tr>
        <tr id="map-mousedown">
            <td><code><b>mousedown</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Вызывается при нажатии кнопки мыши над областью карты.</td>
        </tr>
        <tr id="map-mouseup">
            <td><code><b>mouseup</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Вызывается, когда пользователь отпускает кнопку мыши над областью карты.</td>
        </tr>
        <tr id="map-mouseover">
            <td><code><b>mouseover</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Вызывается при наведении курсора мыши на карту.</td>
        </tr>
        <tr id="map-mouseout">
            <td><code><b>mouseout</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Вызывается, когда курсор мыши покидает область карты.</td>
        </tr>
        <tr id="map-mousemove">
            <td><code><b>mousemove</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Вызывается, когда курсор мыши перемещается над картой.</td>
        </tr>
        <tr id="map-contextmenu">
            <td><code><b>contextmenu</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Вызывается при нажатии правой кнопки мыши на карте, предотвращает появление
                стандартного контекстного меню браузера, если на это событие подписаны обработчики.
                Также вызывается на мобильных устройствах, когда пользователь удерживает тач
                в течение секунды (долгое нажатие).
            </td>
        </tr>
        <tr id="map-keypress">
            <td><code><b>keypress</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается при нажатии клавиш на клавиатуре, когда карта находится в фокусе.</td>
        </tr>
        <tr id="map-preclick">
            <td><code><b>preclick</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a></code></td>
            <td>Вызывается перед кликом мыши на карте (полезно, если нужно выполнить
                какое-либо действие до вызова обработчика клика).
            </td>
        </tr>
    </tbody>
</table>

##### События анимаций

<table>
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-zoomanim">
            <td><code><b>zoomanim</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#zoomanimevent">ZoomAnimEvent</a></code></td>
            <td>Вызывается каждый кадр, в процессе изменения масштаба.</td>
        </tr>
    </tbody>
</table>

##### События местоположения

<table>
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-locationerror">
            <td><code><b>locationerror</b></code></td>
            <td><code><a href="#errorevent">ErrorEvent</a></code></td>
            <td>Вызывается при возникновении ошибок, во время обнаружения местоположения пользователя
                (при использовании метода <a href="#map-locate"><code>locate</code></a>).
            </td>
        </tr>
        <tr id="map-locationfound">
            <td><code><b>locationfound</b></code></td>
            <td><code><a href="#locationevent">LocationEvent</a></code></td>
            <td>Вызывается при успешном обнаружении местоположения пользователя (при использовании метода
                <a href="#map-locate">locate</a>).
            </td>
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
        <tr id="map-getrenderer">
            <td>
                <code>
                    <b>getRenderer</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/vector-layers#dgpath">Path</a>&gt; <i>layer</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#dgrenderer">Renderer</a></code></td>
            <td>Возвращает экземпляр <a href="/doc/maps/ru/manual/base-classes#dgrenderer"><code>Renderer</code></a>,
                который должен быть использован для отрисовки необходимого
                <a href="/doc/maps/ru/manual/vector-layers#dgpath"><code>векторного слоя</code></a>. Метод гарантирует, что опции
                <a href="/doc/maps/ru/manual/base-classes#dgrenderer"><code>движка отображения</code></a> карты и векторных слоев
                будут учитываться, и что необходимые движки отображения действительно существуют на карте.
            </td>
        </tr>
    </tbody>
</table>

##### Методы слоев и элементов управления

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-addlayer">
            <td>
                <code>
                    <b>addLayer</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Добавляет слой на карту.</td>
        </tr>
        <tr id="map-removelayer">
            <td>
                <code>
                    <b>removeLayer</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Удаляет указанные слои с карты.</td>
        </tr>
        <tr id="map-haslayer">
            <td>
                <code>
                    <b>hasLayer</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/base-classes#dglayer">Layer</a>&gt; <i>layer</i>)</nobr>
                </code>
            </td>
            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если слой, на данный момент, добавлен на карту.</td>
        </tr>
        <tr id="map-eachlayer">
            <td>
                <code>
                    <b>eachLayer</b>(
                    <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                    <nobr>&lt;Object&gt; <i>context?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>
                Выполняет заданную функцию для каждого слоя карты. Дополнительно можно
                указать контекст выполнения функции.
<pre><code>map.eachLayer(function(layer){
    layer.bindPopup(&#39;Hello&#39;);
});
</code></pre>
            </td>
        </tr>
        <tr id="map-openpopup">
            <td>
                <code>
                    <b>openPopup</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/popup#dgpopup">Popup</a>&gt; <i>popup</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Показывает указанный попап, предварительно закрыв все открытые.</td>
        </tr>
        <tr id="map-openpopup">
            <td>
                <code>
                    <b>openPopup</b>(
                    <nobr>&lt;String|HTMLElement&gt; <i>content</i></nobr>,
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;<a href="/doc/maps/ru/manual/popup#popup-option">Popup options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Создает попап с переданными опциями и содержимым и открывает его в определенной точке на карте.</td>
        </tr>
        <tr id="map-closepopup">
            <td>
                <code>
                    <b>closePopup</b>(<nobr>&lt;<a href="/doc/maps/ru/manual/popup#dgpopup">Popup</a>&gt; <i>popup?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Закрывает попап, открытый с помощью <a href="/doc/maps/ru/manual/popup#map-openpopup">openPopup</a>.</td>
        </tr>
        <tr id="map-addcontrol">
            <td>
                <code>
                    <b>addControl</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/controls#dgcontrol">Control</a>&gt; <i>control</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Добавляет элемент управления на карту.</td>
        </tr>
        <tr id="map-removecontrol">
            <td>
                <code>
                    <b>removeControl</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/controls#dgcontrol">Control</a>&gt; <i>control</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Удаляет элемент управления с карты.</td>
        </tr>
    </tbody>
</table>

##### Методы модификации состояния карты

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-setview">
            <td>
                <code>
                    <b>setView</b>(
                    <nobr>&lt;LatLnt&gt; <i>center</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom</i></nobr>,
                    <nobr>&lt;Zoom/Pan options&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Устанавливает область просмотра карты (географический центр и масштаб).
                Дополнительно можно указать опции анимации.
            </td>
        </tr>
        <tr id="map-setzoom">
            <td>
                <code>
                    <b>setZoom</b>(
                    <nobr>&lt;Number&gt; <i>zoom</i></nobr>,
                    <nobr>&lt;Zoom/Pan options&gt; <i>options</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Устанавливает уровень масштаба.</td>
        </tr>
        <tr id="map-zoomin">
            <td>
                <code>
                    <b>zoomIn</b>(
                    <nobr>&lt;Number&gt; <i>delta?</i></nobr>,
                    <nobr>&lt;<a href="#опции-масштабирования">Zoom options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Увеличивает масштаб карты на величину <code>delta</code>
                (по умолчанию <a href="#map-zoomdelta"><code>zoomDelta</code></a>).
            </td>
        </tr>
        <tr id="map-zoomout">
            <td>
                <code>
                    <b>zoomOut</b>(
                    <nobr>&lt;Number&gt; <i>delta?</i></nobr>,
                    <nobr>&lt;<a href="#опции-масштабирования">Zoom options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Уменьшает масштаб карты на величину <code>delta</code>
                (по умолчанию <a href="#map-zoomdelta"><code>zoomDelta</code></a>).
            </td>
        </tr>
        <tr id="map-setzoomaround">
            <td>
                <code>
                    <b>setZoomAround</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom</i></nobr>,
                    <nobr>&lt;<a href="#опции-масштабирования">Zoom options</a>&gt; <i>options</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Масштабирует карту, сохраняя при этом указанную точку в неподвижном состоянии
                (например, используется для масштабировании при помощи колесика мыши и двойного клика).
            </td>
        </tr>
        <tr id="map-setzoomaround">
            <td>
                <code>
                    <b>setZoomAround</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>offset</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom</i></nobr>,
                    <nobr>&lt;<a href="#опции-масштабирования">Zoom options</a>&gt; <i>options</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Масштабирует карту, сохраняя при этом указанную точку в пикселях в неподвижном состоянии
                (относительно левого верхнего угла).
            </td>
        </tr>
        <tr id="map-fitbounds">
            <td>
                <code>
                    <b>fitBounds</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                    <nobr>&lt;<a href="#опции-соответствия-границам">fitBounds options</a>&gt; <i>options</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Устанавливает область просмотра карты так, чтобы она содержала заданные границы,
                на максимально возможном уровне масштаба.
            </td>
        </tr>
        <tr id="map-fitworld">
            <td>
                <code>
                    <b>fitWorld</b>(
                    <nobr>&lt;<a href="#опции-соответствия-границам">fitBounds options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Устанавливает область просмотра карты так, чтобы та отображала весь мир,
                на максимально возможном уровне масштаба.
            </td>
        </tr>
        <tr id="map-panto">
            <td>
                <code>
                    <b>panTo</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;<a href="#опции-перемещения">Pan options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Передвигает карту к указанному центру.
            </td>
        </tr>
        <tr id="map-panby">
            <td>
                <code>
                    <b>panBy</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>offset</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Перемещает карту на заданное количество пикселей (анимировано).</td>
        </tr>
        <tr id="map-setmaxbounds">
            <td>
                <code>
                    <b>setMaxBounds</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgbounds">Bounds</a>&gt; <i>bounds</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Ограничивает область просмотра карты заданными границами (см. опцию
                <a href="#map-maxbounds">maxBounds</a>).
            </td>
        </tr>
        <tr id="map-setminzoom">
            <td><code><b>setMinZoom</b>(<nobr>&lt;Number&gt; <i>zoom</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Устанавливает нижний предел уровней масштабирования
                (см. опцию <a href="#map-minzoom">minZoom</a>).
            </td>
        </tr>
        <tr id="map-setmaxzoom">
            <td><code><b>setMaxZoom</b>(<nobr>&lt;Number&gt; <i>zoom</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Устанавливает верхний предел уровней масштабирования
                (см. опцию <a href="#map-minzoom">maxZoom</a>).
            </td>
        </tr>
        <tr id="map-paninsidebounds">
            <td>
                <code>
                    <b>panInsideBounds</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                    <nobr>&lt;<a href="#опции-перемещения">Pan options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Перемещает карту в ближайшую область просмотра, лежащую в пределах заданных границ.
                Можно контролировать анимацию, передав объект опций вторым параметром.
            </td>
        </tr>
        <tr id="map-invalidatesize">
            <td><code><b>invalidateSize</b>(<nobr>&lt;Zoom/Pan options&gt; <i>options</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Обновляет карту при изменении размера ее контейнера. Этот метод необходимо вызывать,
                если размер контейнера изменяется динамически (по умолчанию, также будет происходить
                анимация переимещения). Если параметр <code>options.pan</code> установлен в <code>false</code>,
                то карта не будет перемещаться. Если параметр <code>options.debounceMoveend</code> установлен в
                <code>true</code>, то событие <code>moveend</code> не будет вызываться часто, даже
                если метод будет вызываться много раз подряд.
            </td>
        </tr>
        <tr id="map-invalidatesize">
            <td><code><b>invalidateSize</b>(<nobr>&lt;Boolean&gt; <i>animate</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Обновляет карту при изменении размера ее контейнера. Этот метод необходимо вызывать,
                если размер контейнера изменяется динамически (по умолчанию, также будет происходить
                анимация переимещения).
            </td>
        </tr>
        <tr id="map-stop">
            <td><code><b>stop</b>()</code></td>
            <td><code>this</code></td>
            <td>Останавливает текущие запущенные анимации <code>panTo</code> или <code>flyTo</code>.
            </td>
        </tr>
        <tr id="map-flyto">
            <td>
                <code>
                    <b>flyTo</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom?</i></nobr>,
                    <nobr>&lt;Zoom/Pan options&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Устанавливает область просмотра карты (гегорафический центр и масштаб), выполняя
                плавную анимацию изменения масштаба и перемещения.
            </td>
        </tr>
        <tr id="map-flytobounds">
            <td>
                <code>
                    <b>flyToBounds</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                    <nobr>&lt;<a href="#опции-соответствия-границам">fitBounds options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Устанавливает область просмотра карты с плавной анимацией изменения масштаба и перемещения, как
                <a href="#map-flyto"><code>flyTo</code></a>, но примнимает в качестве параметра границы, как
                <a href="#map-fitbounds"><code>fitBounds</code></a>.
            </td>
        </tr>
        <tr id="map-setlang">
            <td><code><b>setLang</b>( <nobr>&lt;String&gt; <i>lang</i> )</nobr></code></td>
            <td><code>String</code></td>
            <td>Устанавливает <a href="/doc/maps/ru/manual/dg-locale">язык карты</a>. В качестве параметра
                принимает код языка (например, 'en').
            </td>
        </tr>
    </tbody>
</table>

##### Другие методы

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-addhandler">
            <td>
                <code>
                    <b>addHandler</b>(
                    <nobr>&lt;String&gt; <i>name</i></nobr>,
                    <nobr>&lt;Function&gt; <i>HandlerClass</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Добавляет новый <a href="/doc/maps/ru/manual/base-classes#dghandler"><code>Handler</code></a> на карту,
                c переданным именем и функцией-конструктором.
            </td>
        </tr>
        <tr id="map-remove">
            <td><code><b>remove</b>()</code></td>
            <td><code>this</code></td>
            <td>Удаляет карту и все обработчики, связанные с ней.</td>
        </td>
        </tr>
        <tr id="map-createpane">
            <td>
                <code>
                    <b>createPane</b>(
                    <nobr>&lt;String&gt; <i>name</i></nobr>,
                    <nobr>&lt;HTMLElement&gt; <i>container?</i>)</nobr>
                </code>
            </td>
            <td><code>HTMLElement</code></td>
            <td>Создает новую панель карты с данным именем, если она еще не существует, и затем
                возвращает ее. Панель создается как ребенок <code>container</code>,
                или как дочерний элемент главной панели карты, если <code>container</code> не установлен.
            </td>
        </tr>
        <tr id="map-getpane">
            <td><code><b>getPane</b>(<nobr>&lt;String | HTMLElement&gt; <i>pane</i>)</nobr></code></td>
            <td><code>HTMLElement</code></td>
            <td>Возвращает панель карты по ее имени или по ее HTML-элементу</td>
        </tr>
        <tr id="map-getpanes">
            <td><code><b>getPanes</b>()</code></td>
            <td><code>Object</code></td>
            <td>Возвращает объект, содержащий имена всех панелей как ключи и сами панели, как значения
            </td>
        </tr>
        <tr id="map-getcontainer">
            <td><code><b>getContainer</b>()</code></td>
            <td><code>HTMLElement</code></td>
            <td>Возвращает контейнер карты (HTML-элемент).</td>
        </tr>
        <tr id="map-whenready">
            <td>
                <code>
                    <b>whenReady</b>(
                    <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                    <nobr>&lt;Object&gt; <i>context?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Выполняет функцию <code>fn</code> после инициализации карты (когда установлен
                центр и масштаб) и, по крайней мере, одним слоем, или сразу, если она
                была инициализирована ранее. Опционально можно передать контекст выполнения.
            </td>
        </tr>
    </tbody>
</table>

##### Методы получения состояния карты

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-getcenter">
            <td><code><b>getCenter</b>()</code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Возвращает географический центр области просмотра карты.</td>
        </tr>
        <tr id="map-getzoom">
            <td><code><b>getZoom</b>()</code></td>
            <td><code>Number</code></td>
            <td>Возвращает текущий уровень масштабирования.</td>
        </tr>
        <tr id="map-getbounds">
            <td><code><b>getBounds</b>()</code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlngbounds">LatLngBounds</a></code></td>
            <td>Возвращает географические прямоугольные границы текущей области просмотра карты.</td>
        </tr>
        <tr id="map-getminzoom">
            <td><code><b>getMinZoom</b>()</code></td>
            <td><code>Number</code></td>
            <td>Возвращает минимальный уровень масштабирования карты (если установлена опция
                <code>minZoom</code> у карты или любого слоя) или <code>0</code>, по умолчанию.
            </td>
        </tr>
        <tr id="map-getmaxzoom">
            <td><code><b>getMaxZoom</b>()</code></td>
            <td><code>Number</code></td>
            <td>Возвращает максимальный уровень масштабирования карты (если установлена опция
                <code>maxZoom</code> у карты или любого слоя).
            </td>
        </tr>
        <tr id="map-getboundszoom">
            <td>
                <code>
                    <b>getBoundsZoom</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlngbounds">LatLngBounds</a>&gt; <i>bounds</i></nobr>,
                    <nobr>&lt;Boolean&gt; <i>inside?</i>)</nobr>
                </code>
            </td>
            <td><code>Number</code></td>
            <td>Возвращает максимальный уровень масштабирования, при котором заданные границы полностью
                входят в область просмотра. Если опция <code>inside</code> установлена в <code>true</code>,
                тогда метод возвращает минимальный уровень зума, с теми же условиями.
            </td>
        </tr>
        <tr id="map-getsize">
            <td><code><b>getSize</b>()</code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Возвращает текущий размер контейнера карты (в пикселях).</td>
        </tr>
        <tr id="map-getpixelbounds">
            <td><code><b>getPixelBounds</b>()</code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgbounds">Bounds</a></code></td>
            <td>Возвращает прямоугольные границы области просмотра карты, спроецированные на пиксельные
                координаты (иногда полезно в реализациях слоев и оверлеев).
            </td>
        </tr>
        <tr id="map-getpixelorigin">
            <td><code><b>getPixelOrigin</b>()</code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Возвращает спроецированные пиксельные координаты левой верхней точки слоя карты.
                Полезно при реализации дополнительных слоев и оверлеев.
            </td>
        </tr>
        <tr id="map-getpixelworldbounds">
            <td>
                <code>
                    <b>getPixelWorldBounds</b>(
                    <nobr>&lt;Number&gt; <i>zoom?</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgbounds">Bounds</a></code></td>
            <td>Возвращает пиксельные координаты границ мира для заданного уровня масштабирования
                <code>zoom</code>. Если <code>zoom</code> пропущен, используется текущий уровень масштаба
                карты.
            </td>
        </tr>
        <tr id="map-getlang">
            <td><code><b>getLang</b>()</code></td>
            <td><code>String</code></td>
            <td>Возвращает текущий <a href="/doc/maps/ru/manual/dg-locale">язык карты</a>.</td>
        </tr>
    </tbody>
</table>

##### Методы преобразования

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-getzoomscale">
            <td>
                <code>
                    <b>getZoomScale</b>(
                    <nobr>&lt;Number&gt; <i>toZoom</i></nobr>,
                    <nobr>&lt;Number&gt; <i>fromZoom</i>)</nobr>
                </code>
            </td>
            <td><code>Number</code></td>
            <td>Возвращает коэффициент масштабирования, который будет применен к переходу с уровня
                <code>fromZoom</code> до <code>toZoom</code>. Используется внутри библиотеки в анимациях
                изменения масштаба.
            </td>
        </tr>
        <tr id="map-getscalezoom">
            <td>
                <code><b>getScaleZoom</b>(
                <nobr>&lt;Number&gt; <i>scale</i></nobr>,
                <nobr>&lt;Number&gt; <i>fromZoom</i>)</nobr>
                </code>
            </td>
            <td><code>Number</code></td>
            <td>Возвращает уровень масштаба, на котором окажется карта, если ее текущий уровень масштабирования
                <code>fromZoom</code> и коэффициент масштабирования <code>scale</code>. Метод обратный
                <a href="#map-getZoomScale"><code>getZoomScale</code></a>.
            </td>
        </tr>
        <tr id="map-project">
            <td>
                <code>
                    <b>project</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>Проецирует географические координаты
                <a href="/doc/maps/ru/manual/basic-types#dglatlng"><code>LatLng</code></a>
                в соответствии с типом проекции карты (CRS), затем масштабирует их в соответствии с
                параметром zoom и CRS <a href="#transformation"><code>Transformation</code></a>
                Результат - пиксельные координаты относительно основания CRS.
            </td>
        </tr>
        <tr id="map-unproject">
            <td>
                <code>
                    <b>unproject</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i></nobr>,
                    <nobr>&lt;Number&gt; <i>zoom</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Метод обратный <a href="#map-project"><code>project</code></a>.
            </td>
        </tr>
        <tr id="map-layerpointtolatlng">
            <td>
                <code>
                    <b>layerPointToLatLng</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>По переданным пиксельным координатам относительно <a href="#map-getpixelorigin">origin pixel</a>
                возвращает соответствующие географические координаты (для текущего уровня масштабирования).
            </td>
        </tr>
        <tr id="map-latlngtolayerpoint">
            <td>
                <code>
                    <b>latLngToLayerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>По переданным географическим координатам возвращает соответствующие пиксельные
                координаты относительно <a href="#map-getpixelorigin">origin pixel</a>.
            </td>
        </tr>
        <tr id="map-wraplatlng">
            <td>
                <code>
                    <b>wrapLatLng</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Возвращает <a href="/doc/maps/ru/manual/basic-types#dglatlng"><code>LatLng</code></a>, где <code>lat</code>
                и <code>lng</code> &quot;зацикливаются&quot; в соответствии с CRS-свойствами <code>wrapLat</code> и
                <code>wrapLng</code>, если они выходят за  CRS-границы. По умолчанию
                это значит, что долгота переносится относительно линии перемены даты. Таким
                образом, ее значение всегда будет находиться между -180 и +180 градусами.
            </td>
        </tr>
        <tr id="map-distance">
            <td>
                <code>
                    <b>distance</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng1</i></nobr>,
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng2</i>)</nobr>
                </code>
            </td>
            <td><code>Number</code></td>
            <td>Возвращает расстояние между двумя географическими координатами в соответствии
                с CRS карты. По умолчанию расстояние измеряется в метрах.
            </td>
        </tr>
        <tr id="map-containerpointtolayerpoint">
            <td>
                <code>
                    <b>containerPointToLayerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>По переданным пиксельным координатам, относительно контейнера карты, возвращает
                соответствующие пиксельные координаты, относительно <a href="#map-getpixelorigin">origin pixel</a>.
            </td>
        </tr>
        <tr id="map-layerpointtocontainerpoint">
            <td>
                <code>
                    <b>layerPointToContainerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>По переданным пиксельным координатам, относительно <a href="#map-getpixelorigin">origin pixel</a>,
                возвращает соответствующие пиксельные координаты, относительно контейнера карты.
            </td>
        </tr>
        <tr id="map-containerpointtolatlng">
            <td>
                <code>
                    <b>containerPointToLatLng</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a>&gt; <i>point</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>По переданным пиксельным координатам, относительно контейнера карты,
                возвращает географические координаты (для текущего уровня масштабирования).
            </td>
        </tr>
        <tr id="map-latlngtocontainerpoint">
            <td>
                <code>
                    <b>latLngToContainerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>По переданным географическим координатам, возвращает пиксельные координаты,
                относительно контейнера карты.
            </td>
        </tr>
        <tr id="map-mouseeventtocontainerpoint">
            <td>
                <code>
                    <b>mouseEventToContainerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a>&gt; <i>ev</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>По переданному объекту MouseEvent, возвращает пиксельную координату места, где произошло событие,
                относительно левого верхнего угла контейнера карты.
            </td>
        </tr>
        <tr id="map-mouseeventtolayerpoint">
            <td>
                <code>
                    <b>mouseEventToLayerPoint</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a>&gt; <i>ev</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dgpoint">Point</a></code></td>
            <td>По переданному объекту MouseEvent, возвращает пиксельную координату, где произошло
                событие, относительно <a href="#map-getpixelorigin">origin pixel</a>.
            </td>
        </tr>
        <tr id="map-mouseeventtolatlng">
            <td>
                <code>
                    <b>mouseEventToLatLng</b>(
                    <nobr>&lt;<a href="/doc/maps/ru/manual/base-classes#mouseevent">MouseEvent</a>&gt; <i>ev</i>)</nobr>
                </code>
            </td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>По переданному объекту MouseEvent, возвращает географическую координату, где
                произошло событие.
            </td>
        </tr>
    </tbody>
</table>

##### Методы геолокации

<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
	</thead
    ><tbody>
        <tr id="map-locate">
            <td>
                <code>
                    <b>locate</b>(
                    <nobr>&lt;<a href="#опции-определения-местоположения">Locate options</a>&gt; <i>options?</i>)</nobr>
                </code>
            </td>
            <td><code>this</code></td>
            <td>Пытается определить местоположение пользователя используя
                <a href="https://en.wikipedia.org/wiki/W3C_Geolocation_API" target="_blank">Geolocation API</a>.
                При успешном определении вызывается событие <code>locationfound</code> с данными о местоположении,
                в случае ошибки будет вызвано событие <code>locationerror</code>. Опционально устанавливает
                область просмотра карты согласно местоположению пользователя (или отображает карту
                мира, если возникла ошибка геолокации).
                Для дополнительной информации см.
                <a href="#Опции определения местоположения">опции определения местоположения</a>.
            </td>
        </tr>
        <tr id="map-stoplocate">
            <td><code><b>stopLocate</b>()</code></td>
            <td><code>this</code></td>
            <td>Останавливает отслеживание местоположения, предварительно инициированное методом
                <code>map.locate({watch: true})</code>, и предотвращает сброс карты, если map.locate
                был вызван с <code>({setView: true})</code>.
            </td>
        </tr>
    </tbody>
</table>

##### Методы, унаследованные от Evented

Методы, унаследованные от Evented, смотрите <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">здесь</a>.

#### Свойства

Свойства карты включают в себя обработчики взаимодействия, которые позволяют контролировать интерактивное поведение,
подключение и отключение определенных возможностей карты, таких как перетаскивание и масштабирование тачем
(см. методы <a href="/doc/maps/ru/manual/base-classes#dghandler">Handler</a>). Например:

    map.doubleClickZoom.disable();

Вы также можете получить доступ к элементам управления картой, которые включены по умолчанию, например,
к элементу управления масштабом:

    map.zoomControl.setPosition('topright');

##### Обработчики

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-boxzoom">
            <td><code><b>boxZoom</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Обработчик box-масштабирования (shift + выделение мышью).</td>
        </tr>
        <tr id="map-doubleclickzoom">
            <td><code><b>doubleClickZoom</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Обработчик масштабирования по двойному клику.</td>
        </tr>
        <tr id="map-dragging">
            <td><code><b>dragging</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Обработчик перетаскивания карты (мышью и тачем).</td>
        </tr>
        <tr id="map-keyboard">
            <td><code><b>keyboard</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Обработчик навигации с помощью клавиатуры.</td>
        </tr>
        <tr id="map-scrollwheelzoom">
            <td><code><b>scrollWheelZoom</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Обработчик масштабирования по скроллу.</td>
        </tr>
        <tr id="map-tap">
            <td><code><b>tap</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Обработчики мобильных тач хаков (быстрый тап и удерживание тача).</td>
        </tr>
        <tr id="map-touchzoom">
            <td><code><b>touchZoom</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#dghandler">Handler</a></code></td>
            <td>Обработчик масштабирования с помощью тача.</td>
        </tr>
        <tr id="map-geoclicker">
            <td><code><b>geoclicker</b></code></td>
            <td><a href="/doc/maps/ru/manual/base-classes#dghandler"><code>Handler</code></a></td>
            <td>Обработчик геокодирования по клику.</td>
        </tr>
        <tr id="map-projectDetector">
            <td><code><b>projectDetector</b></code></td>
            <td><a href="/doc/maps/ru/manual/base-classes#dghandler"><code>Handler</code></a></td>
            <td>Обработчик определения <a href="#map-projectdetector">проекта 2ГИС</a>.</td>
        </tr>
        <tr id="map-zoomcontrol">
            <td><code><b>zoomControl</b></code></td>
            <td><a href="/doc/maps/ru/manual/controls#dgcontrol.zoom"><code>Control.Zoom</code></a></td>
            <td>Элемент управления масштабом.</td>
        </tr>
        <tr id="map-fullscreenControl">
            <td><code><b>fullscreenControl</b></code></td>
            <td><a href="/doc/maps/ru/manual/controls#dgcontrol.fullscreen"><code>Control.FullScreen</code></a></td>
            <td>Кнопка включения полноэкранного режима.</td>
        </tr>
        <tr id="map-rulerControl">
            <td><code><b>rulerControl</b></code></td>
            <td><a href="/doc/maps/ru/manual/controls#dgcontrol.ruler"><code>Control.Ruler</code></a></td>
            <td>Кнопка включения линейки.</td>
        </tr>
        <tr id="map-trafficControl">
            <td><code><b>trafficControl</b></code></td>
            <td><a href="/doc/maps/ru/manual/controls#dgcontrol.traffic"><code>Control.Traffic</code></a></td>
            <td>Кнопка включения слоя с пробками.</td>
        </tr>
        <tr id="map-baseLayer">
            <td><code><b>baseLayer</b></code></td>
            <td><a href="/doc/maps/ru/manual/raster-layers#dgtilelayer"><code>TileLayer</code></a></td>
            <td>Слой с тайлами 2ГИС, автоматически добавляемый на карту при её создании.</td>
        </tr>
    </tbody>
</table>

#### Панели карты

Панели - это DOM-элементы, которые используются для контроля очередности отображения слоев на карте.
Получить панели можно с помощью методов <a href="#map-getpane"><code>map.getPane</code></a>
или <a href="#map-getpanes"><code>map.getPanes</code></a>. Новые панели можно создать
с помощью метода <a href="#map-createpane"><code>map.createPane</code></a>. У каждой карты
по умолчанию есть следующий набор панелей, которые отличаются только zIndex.

<table>
    <thead>
        <tr>
            <th>Панель</th>
            <th>Тип</th>
            <th>Z-index</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="map-mappane">
            <td><code><b>mapPane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>&#x27;auto&#x27;</code></td>
            <td>Панель, содержащая в себе все другие панели</td>
        </tr>
        <tr id="map-tilepane">
            <td><code><b>tilePane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>2</code></td>
            <td>Панель для тайловых слоев</td>
        </tr>
        <tr id="map-overlaypane">
            <td><code><b>overlayPane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>4</code></td>
            <td>Панель для векторных слоев, таких как ломаные и многоугольники.</td>
        </tr>
        <tr id="map-shadowpane">
            <td><code><b>shadowPane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>5</code></td>
            <td>Панель для наложения теней (например, тени от маркеров).</td>
        </tr>
        <tr id="map-markerpane">
            <td><code><b>markerPane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>6</code></td>
            <td>Панель маркеров.</td>
        </tr>
        <tr id="map-popuppane">
            <td><code><b>popupPane</b></code></td>
            <td><code>HTMLElement </code></td>
            <td><code>7</code></td>
            <td>Панель попапов.</td>
        </tr>
    </tbody>
</table>

#### Опции определения местоположения

Некоторые методы геолокации объекта <a href="#dgmap"><code>Map</code></a> принимают параметр
<code>options</code>. Это обычный JavaScript-объект со следующими опциональными компонентами:

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
        <tr id="locate-options-watch">
            <td><code><b>watch</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, то местоположение будет отслеживаться постоянно (вместо определения
                местоположения один раз) используя W3C метод <code>watchPosition</code>. Можно остановить
                отслеживание, вызвав метод <code><b>map.stopLocate</b>()</code>.</td>
            </td>
        </tr>
        <tr id="locate-options-setview">
            <td><code><b>setView</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, то автоматически устанавливает область просмотра карты в
                точку местоположения пользователя, в соответствии с точностью определения.
                В случае ошибки поиска, отображаетcя карта мира.
            </td>
        </tr>
        <tr id="locate-options-maxzoom">
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>Infinity</code></td>
            <td>Задает максимальный уровень масштабирования при автоматическом перемещения карты,
                когда включена опция <code>setView</code>.
            </td>
        </tr>
        <tr id="locate-options-timeout">
            <td><code><b>timeout</b></code></td>
            <td><code>Number </code></td>
            <td><code>10000</code></td>
            <td>Количество миллисекунд ожидания ответа геолокации, перед тем как произойдет вызов
                события <code>locationerror</code>.
            </td>
        </tr>
        <tr id="locate-options-maximumage">
            <td><code><b>maximumAge</b></code></td>
            <td><code>Number </code></td>
            <td><code>0</code></td>
            <td>Максимальное время жизни данных о местоположении. Если с момента последнего поиска
                прошло меньше времени, чем указанно в данной опции, <code>locate</code> вернет
                данные из кэша.
            </td>
        </tr>
        <tr id="locate-options-enablehighaccuracy">
            <td><code><b>enableHighAccuracy</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Включает функцию повышения точности, см.
                <a target="_blank" href="http://dev.w3.org/geo/api/spec-source.html#high-accuracy">
                описание в W3C спецификации</a>.
            </td>
        </tr>
    </tbody>
</table>


#### Опции масштабирования

Некоторые методы объекта <a href="#dgmap"><code>Map</code></a>, которые изменяют масштаб,
принимают параметр <code>options</code>. Это обычный JavaScript-объект со следующими
необязательными компонентами:

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
        <tr id="zoom-options-animate">
            <td><code><b>animate</b></code></td>
            <td><code>Boolean</code></td>
            <td><code></code></td>
            <td>Если не указано, то масштабирование будет анимироваться, если точка, относительно
                которой происходит масштабирование, находится в пределах просматриваемой области карты.
                Если <code>true</code>, всегда будет производиться попытка анимировать масштабирование,
                вне зависимости от положения источника масштабирования. Если <code>false</code>,
                то масштабирование будет происходить без анимации.
            </td>
        </tr>
    </tbody>
</table>

#### Опции перемещения

Некоторые методы объекта <a href="#dgmap"><code>Map</code></a>, которые меняют центр карты,
принимают параметр <code>options</code>. Это обычный JavaScript-объект со следующими
необязательными компонентами:

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
        <tr id="pan-options-animate">
            <td><code><b>animate</b></code></td>
            <td><code>Boolean</code></td>
            <td><code></code></td>
            <td>Если <code>true</code>, то перемещения будут анимироваться всегда. Если <code>false</code>,
                перемещения не будут анимироваться при сбросе карты в исходное положение, если она была
                передвинута более чем на один экран; перемещения также не будут анимироваться при установке
                нового смещения панели карты (за исключением использования метода <code>panBy</code>).
            </td>
        </tr>
        <tr id="pan-options-duration">
            <td><code><b>duration</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.25</code></td>
            <td>Продолжительность анимации перемещения.</td>
        </tr>
        <tr id="pan-options-easelinearity">
            <td><code><b>easeLinearity</b></code></td>
            <td><code>Number </code></td>
            <td><code>0.25</code></td>
            <td>Коэффициент кривизны затухания анимации (третий параметр
                <a target="_blank" href="http://cubic-bezier.com/">Кривой Безье</a>). Значение 1.0 означает
                линейную анимацию; чем меньше значение, тем больше кривизна.
            </td>
        </tr>
        <tr id="pan-options-nomovestart">
            <td><code><b>noMoveStart</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Если <code>true</code>, тогда при перемещении не будет инициироваться событие
                <code>movestart</code> (используется внутри библиотеки при реализации
                инерции перемещения).
            </td>
        </tr>
    </tbody>
</table>

#### Дополнительные опции масштабирования/перемещения

Дополнительные опции наследуются от <a href="#zoom-options">Zoom options</a> и
<a href="#pan-options">Pan options</a>

#### Опции соответствия границам

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
	<tr id="fitbounds-options-paddingtopleft">
		<td><code><b>paddingTopLeft</b></code></td>
		<td><code>Point </code></td>
		<td><code>[0, 0]</code></td>
        <td>Задает отступ от верхнего левого угла контейнера карты, который не должен учитываться
            при подстройке центра и масштаба. Удобно использовать, например, если на карте приложения
            имеется левая панель и вы не хотите, чтобы при масштабировании под ней скрывались объекты.
        </td>
        </tr>
        <tr id="fitbounds-options-paddingbottomright">
            <td><code><b>paddingBottomRight</b></code></td>
            <td><code>Point </code></td>
            <td><code>[0, 0]</code></td>
            <td>То же самое, но для нижнего правого угла карты.</td>
        </tr>
        <tr id="fitbounds-options-padding">
            <td><code><b>padding</b></code></td>
            <td><code>Point </code></td>
            <td><code>[0, 0]</code></td>
            <td>Эквивалентно установке и верхнего левого, и нижнего правого отступов в одинаковые значения.</td>
        </tr>
        <tr id="fitbounds-options-maxzoom">
            <td><code><b>maxZoom</b></code></td>
            <td><code>Number </code></td>
            <td><code>null</code></td>
            <td>Максимальный возможный уровень зума.</td>
        </tr>
    </tbody>
</table>
