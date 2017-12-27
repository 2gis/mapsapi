## Попапы

Попап — это всплывающее окно, в котором можно отобразить произвольный HTML-код.
Попап связан с определенным местом на карте.

{toc}

### DG.Popup

Используется для создания и открытия попапов в определенных местах на карте.

Для открытия попапа можно использовать метод карты
<a href="/doc/maps/ru/manual/map#map-openpopup">Map.openPopup</a>, в таком случае
одновременно может быть открыт лишь один попап, либо метод
<a href="/doc/maps/ru/manual/map#map-addlayer">Map.addLayer</a> для отображения
любого количества попапов.

#### Пример использования

Включить отображение попапа по клику на маркер довольно просто:

	marker.bindPopup(popupContent).openPopup();

У дополнительных слоев, таких как ломаные, также есть метод bindPopup.
Вот более сложный пример отображения попапа:

	var popup = DG.popup()
		.setLatLng(latlng)
		.setContent('<p>Привет мир!<br />Это попап.</p>')
		.openOn(map);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
	</thead>
    <tbody>
        <tr id="popup-dg-popup">
            <td><code><b>DG.popup</b>(
                    <nobr>&lt;<a href="#опции">Popup options</a>&gt; <i>options?</i></nobr>,
                    <nobr>&lt;<a href="/doc/maps/ru/manual/base-classes#dglayer">Layer</a>&gt; <i>source?</i>)</nobr>
                </code></td>
            <td>Создает объект Popup с переданными опциями, описывающими внешний вид и расположение попапа.
                Также вторым параметром можно передать объект <code>source</code>, указывающий привязку
                попапа к определенному объекту типа Layer.</td>
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
        <tr id="popup-maxwidth">
            <td><code><b>maxWidth</b></code></td>
            <td><code>Number </code></td>
            <td><code>300</code></td>
            <td>Максимальная ширина попапа в пикселях.</td>
        </tr>
        <tr id="popup-minwidth">
            <td><code><b>minWidth</b></code></td>
            <td><code>Number </code></td>
            <td><code>50</code></td>
            <td>Минимальная ширина попапа в пикселях.</td>
        </tr>
        <tr id="popup-maxheight">
            <td><code><b>maxHeight</b></code></td>
            <td><code>Number </code></td>
            <td><code>null</code></td>
            <td>Если значение установлено и содержимое попапа превышает заданную высоту,
                создается контейнер указанной высоты со скроллом.</td>
        </tr>
        <tr id="popup-autopan">
            <td><code><b>autoPan</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Установите значение в false, если не хотите, чтобы карта автоматически сдвигалась
                для полного отображения попапа.</td>
        </tr>
        <tr id="popup-autopanpaddingtopleft">
            <td><code><b>autoPanPaddingTopLeft</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
            <td>Задает расстояние от края попапа до левого верхнего угла карты при автоматическом сдвиге.</td>
        </tr>
        <tr id="popup-autopanpaddingbottomright">
            <td><code><b>autoPanPaddingBottomRight</b></code></td>
            <td><code>Point </code></td>
            <td><code>null</code></td>
            <td>Задает расстояние от края попапа до правого нижнего угла карты при автоматическом сдвиге.</td>
        </tr>
        <tr id="popup-autopanpadding">
            <td><code><b>autoPanPadding</b></code></td>
            <td><code>Point </code></td>
            <td><code>Point(5, 5)</code></td>
            <td>Задает расстояние от края попапа до границы карты при автоматическом сдвиге,
                устанавливает одинаковые значения для <code>autoPanPaddingBottomRight</code> и <code>autoPanPaddingTopLeft</code>.</td>
        </tr>
        <tr id="popup-keepinview">
            <td><code><b>keepInView</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Установите в <code>true</code>, если необходимо предотвратить вероятность перемещения
                попапа за пределы видимой области карты пока он открыт.</td>
        </tr>
        <tr id="popup-closebutton">
            <td><code><b>closeButton</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Отвечает за отображение кнопки закрытия попапа.</td>
        </tr>
        <tr id="popup-offset">
            <td><code><b>offset</b></code></td>
            <td><code>Point </code></td>
            <td><code>Point(0, 7)</code></td>
            <td>Устанавливает отступ позиции попапа. Удобно для управления "ножкой" попапа.</td>
        </tr>
        <tr id="popup-autoclose">
            <td><code><b>autoClose</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Установите эту опцию в <code>false</code>, если хотите изменить стандартное
                поведение, когда попап закрывается при кликах в область карты (устанавливается глобально
                с помощью метода карты
                <a href="/doc/maps/ru/manual/map#map-closepopuponclick">closePopupOnClick</a>)</td>
        </tr>
        <tr id="popup-zoomanimation">
            <td><code><b>zoomAnimation</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Анимировать ли попап при масштабировании. Отключите, если есть проблемы с
                отображением Flash содержимого внутри попапа.</td>
        </tr>
        <tr id="popup-classname">
            <td><code><b>className</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;&#x27;</code></td>
            <td>Имя CSS-класса, которое будет назначено попапу.</td>
        </tr>
        <tr id="popup-pane">
            <td><code><b>pane</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;popupPane&#x27;</code></td>
            <td>Панель карты, на которую будет добавлен попап.</td>
        </tr>
        <tr id="popup-sprawling">
            <td><code><b>sprawling</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>false</code></td>
            <td>По умолчанию, ширина попапа подстраивается под ширину его контента и под ширину карты.
                Выставьте значение <code>true</code>, если хотите, чтобы выбиралась максимальная ширина,
                ограниченная только шириной карты.</td>
        </tr>
        <tr id="label-textdirection">
            <td><code><b>textDirection</b></code></td>
            <td><code>string</code></td>
            <td><code>'auto'</code></td>
            <td>Направление текста контента попапа. Может принимать одно из следующих значений: <code>'auto'</code>,
                <code>'rtl'</code>, <code>'ltr'</code>.</td>
        </tr>
    </tbody>
</table>

#### События

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
        <tr id="popup-add">
            <td><code><b>add</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается при добавлении нового слоя на карту.</td>
        </tr>
        <tr id="popup-remove">
            <td><code><b>remove</b></code></td>
            <td><code><a href="/doc/maps/ru/manual/base-classes#event">Event</a></code></td>
            <td>Вызывается при удалении слоя с карты.</td>
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
        <tr id="popup-popupopen">
            <td><code><b>popupopen</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Вызывается при открытии попапа.</td>
        </tr>
        <tr id="popup-popupclose">
            <td><code><b>popupclose</b></code></td>
            <td><code>PopupEvent</code></td>
            <td>Вызывается при закрытии попапа.</td>
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
        <tr id="popup-openon">
            <td><code><b>openOn</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/map#dgmap">Map</a>&gt; <i>map</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Добавляет попап на карту, предварительно закрыв другие попапы. Аналогично map.openPopup(popup).</td>
        </tr>
        <tr id="popup-getlatlng">
            <td><code><b>getLatLng</b>()</code></td>
            <td><code><a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a></code></td>
            <td>Возвращает географические координаты точки открытия попапа.</td>
        </tr>
        <tr id="popup-setlatlng">
            <td><code><b>setLatLng</b>(
                <nobr>&lt;<a href="/doc/maps/ru/manual/basic-types#dglatlng">LatLng</a>&gt; <i>latlng</i>)</nobr></code></td>
            <td><code>this</code></td>
            <td>Устанавливает географические координаты точки открытия попапа.</td>
        </tr>
        <tr id="popup-getcontent">
            <td><code><b>getContent</b>()</code></td>
            <td><code>String|HTMLElement</code></td>
            <td>Возвращает содержимое основной части попапа.</td>
        </tr>
        <tr id="popup-setcontent">
            <td><code><b>setContent</b>(
                <nobr>&lt;String | HTMLElement | Function&gt; <i>htmlContent</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Задает содержимое основной части попапа. Может принимать HTML строку или DOM-элемент.
                Если метод получает функцию, данной функции будет передан исходный слой. Функция должна возвращать
                <code>String</code> или <code>HTMLElement</code></td>
        </tr>
        <tr id="popup-getheadercontent">
            <td><code><b>getHeaderContent</b>()</code></td>
            <td><code>String | HTMLElement</code></td>
            <td>Возвращает содержимое секции <code>header</code> попапа.</td>
        </tr>
        <tr id="popup-setheadercontent">
            <td><code><b>setHeaderContent</b>(
                <nobr>&lt;String | HTMLElement&gt; <i>htmlContent</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Задает содержимое секции <code>header</code> попапа. Может принимать HTML строку или DOM-элемент.</td>
        </tr>
        <tr id="popup-getfootercontent">
            <td><code><b>getFooterContent</b>()</code></td>
            <td><code>String|HTMLElement</code></td>
            <td>Возвращает содержимое секции <code>footer</code> попапа.</td>
        </tr>
        <tr id="popup-setfootercontent">
            <td><code><b>setFooterContent</b>(
                <nobr>&lt;String|HTMLElement&gt; <i>htmlContent</i>)</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Задает содержимое секции <code>footer</code> попапа. Может принимать HTML строку или DOM-элемент.</td>
        </tr>
        <tr id="popup-getelement">
            <td><code><b>getElement</b>()</code></td>
            <td><code>String|HTMLElement</code></td>
            <td>Алиас для <a href="#popup-getcontent">getContent()</a></td>
        </tr>
        <tr id="popup-update">
            <td><code><b>update</b>()</code></td>
            <td><code>null</code></td>
            <td>Обновляет содержимое попапа, разметку и позиционирование. Полезно при обновлении
                попапа, когда внутри него что-то изменилось, например, загрузилось изображение.</td>
        </tr>
        <tr id="popup-isopen">
            <td><code><b>isOpen</b>()</code></td>
            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, когда попап отображается на карте.</td>
        </tr>
        <tr id="popup-bringtofront">
            <td><code><b>bringToFront</b>()</code></td>
            <td><code>this</code></td>
            <td>Помещает данный попап выше других попапов (в пределах одной панели карты)</td>
        </tr>
        <tr id="popup-bringtoback">
            <td><code><b>bringToBack</b>()</code></td>
            <td><code>this</code></td>
            <td>Помещает данный попап под другими попапами (в пределах одной панели карты)</td>
        </tr>
    </tbody>
</table>

Методы попапа, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-popup-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dglayer-methods">Layer</a> <!-- TODO: include methods -->

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgevented-methods">Evented</a> <!-- TODO: include methods -->
