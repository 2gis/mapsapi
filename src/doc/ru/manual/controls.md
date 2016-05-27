## Элементы управления

{toc}

Элементы управления — это компоненты интерфейса, с помощью которых пользователь может взаимодействовать с картой.

### DG.Control.Zoom

Базовый элемент управления масштабом с двумя кнопками (приблизить и отдалить). Добавляется на карту по умолчанию,
если не передана опция <a href="#map-zoomcontrol"><code>zoomControl</code> со значением `false`.
Расширяет <a href="#control"><code>Control</code></a>.

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-zoom-l-control-zoom">
            <td><code><b>DG.control.zoom</b>(
                <nobr>&lt;<a href='#control-zoom-option'>DG.Control.Zoom options</a>&gt; <i>options</i> )</nobr>
            </code></td>
            <td>Создает элемент управления масштабом.</td>
	    </tr>
	</tbody>
</table>

#### Свойства

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Значение<br>по умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-zoom-zoomintext">
            <td><code><b>zoomInText</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;+&#x27;</code></td>
            <td>Текст кнопки &#39;приблизить&#39;.</td>
        </tr>
        <tr id="control-zoom-zoomintitle">
            <td><code><b>zoomInTitle</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;Zoom in&#x27;</code></td>
            <td>Значение атрибута title для конпки &#39;приблизить&#39;.</td>
        </tr>
        <tr id="control-zoom-zoomouttext">
            <td><code><b>zoomOutText</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;-&#x27;</code></td>
            <td>Текст кнопки &#39;Отдалить&#39;.</td>
        </tr>
        <tr id="control-zoom-zoomouttitle">
            <td><code><b>zoomOutTitle</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;Zoom out&#x27;</code></td>
            <td>Значение атрибута title для конпки &#39;отдалить&#39;.</td>
        </tr>
    </tbody>
</table>

### DG.Control.Attribution

Позволяет показать информацию об авторстве в небольшом текстовом контейнере на карте. Добавляется на карту по умолчанию,
если значение свойства <a href="#map-attributioncontrol"><code>attributionControl</code> option</a> не выставлено в `false`.
Компонует итоговый текст из слоев, вызывая их метод <a href="#layer-getattribution"><code>getAttribution</code></a>.
Расширяет <a href="#control"><code>Control</code></a>.

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-attribution-l-control-attribution">
            <td><code><b>DG.control.attribution</b>(
                <nobr>&lt;<a href="#control-attribution-option">DG.Control.Attribution options</a>&gt; <i>options</i> )</nobr>
            </code></td>
            <td>Создает элемент с информацией об авторстве.</td>
        </tr>
	</tbody>
</table>

#### Свойства

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Значение<br>по умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-attribution-prefix">
            <td><code><b>prefix</b></code></td>
            <td><code>String </code></td>
            <td><code>&#x27;Leaflet&#x27;</code></td>
            <td>Текст в формате HTML, который будет отображен перед информацией об авторстве.
                Для отключения необходимо передать `false`.</td>
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
        <tr id='control-attribution-setprefix'>
            <td><code><b>setPrefix</b>(
                <nobr>&lt;String&gt; <i>prefix</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет текст перед информацией об авторстве.</td>
        </tr>
        <tr id='control-attribution-addattribution'>
            <td><code><b>addAttribution</b>(
                <nobr>&lt;String&gt; <i>text</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет информацию об авторстве (например, <code>&#39;Картографические данные 2GIS&#39;</code>).</td>
        </tr>
        <tr id='control-attribution-removeattribution'>
            <td><code><b>removeAttribution</b>(
                <nobr>&lt;String&gt; <i>text</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет информацию об авторстве.</td>
        </tr>
    </tbody>
</table>

### DG.Control.Scale

Показывает масштаб карты в метрической (метры, километры) и английской (мили, футы) системах измерений.
Расширяет <a href="#control"><code>DG.Control</code></a>.

    DG.control.scale().addTo(map);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-scale-l-control-scale">
            <td><code><b>DG.control.scale</b>(
                <nobr>&lt;<a href="#control-scale-option">DG.Control.Scale options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Создает индикатор масштаба.</td>
        </tr>
	</tbody>
</table>

#### Свойства

<table>
    <thead>
        <tr>
            <th>Свойство</th>
            <th>Тип</th>
            <th>Значение<br>по умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-scale-maxwidth">
            <td><code><b>maxWidth</b></code></td>
            <td><code>Number </code></td>
            <td><code>100</code></td>
            <td>Максимальная ширина элемента в пикселях.</td>
        </tr>
        <tr id="control-scale-metric">
            <td><code><b>metric</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>True</code></td>
            <td>Включает или отключает метрическую систему измерений (метры, километры).</td>
        </tr>
        <tr id="control-scale-imperial">
            <td><code><b>imperial</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>True</code></td>
            <td>Включает или отключает английскую систему измерений (мили, футы).</td>
        </tr>
        <tr id="control-scale-updatewhenidle">
            <td><code><b>updateWhenIdle</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>При значении <code>true</code>, элемент будет обновляться только при возникновении события
                <a href="#map-moveend"><code>moveend</code></a>, в противном случае, при каждом событии
                <a href="#map-move"><code>move</code></a>.</td>
        </tr>
    </tbody>
</table>

### DG.Control.Ruler

Элемент управления (кнопка), при клике на который включается линейка измерения расстояний на карте.
Extends <a href="#control"><code>DG.Control</code></a>.

    DG.control.ruler().addTo(map);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-ruler-l-control-ruler">
            <td><code><b>DG.control.ruler</b>(
                <nobr>&lt;<a href="#control-ruler-option">DG.Control.Ruler options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Creates a ruler control with the given options.</td>
        </tr>
	</tbody>
</table>

### DG.Control.Traffic

The traffic control allows you to display traffic overlay data on a map. Extends <a href="#control"><code>DG.Control</code></a>.

    DG.control.traffic().addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-traffic-l-control-traffic">
            <td><code><b>DG.control.traffic</b>(
                <nobr>&lt;<a href="#control-traffic-option">DG.Control.Traffic options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Creates a traffic control with the given options.</td>
        </tr>
	</tbody>
</table>

### DG.Control.Fullscreen

The fullscreen control enables display of the map over fullscreen window which bounds are physical bounds of a given
user monitor. The button works like a trigger. It is put on the map by default unless you set its
<a href="#map-attributioncontrol"><code>fullscreenControl</code> option</a> to <code>false</code>. Extends DG.Control.

    DG.control.fullscreen().addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-fullscreen-l-control-fullscreen">
            <td><code><b>DG.control.fullscreen</b>(
                <nobr>&lt;<a href="#control-fullscreen-option">DG.Control.Fullscreen options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Creates a fullscreen control with the given options.</td>
        </tr>
	</tbody>
</table>

### DG.Control.LocationControl

The geo-location control allow users to detect their geographic positions and automatically pan the map layer to found coordinates.
Control is disabled if geo-location API is not available.

    DG.control.location().addTo(map);

#### Creation

<table>
    <thead>
        <tr>
            <th>Factory</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-location-l-control-location">
            <td><code><b>DG.control.location</b>(
                <nobr>&lt;<a href="#control-location-option">DG.Control.LocationControl options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Creates a geo-location control with the given options.</td>
        </tr>
	</tbody>
</table>

#### Options

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-location-drawcircle">
            <td><code><b>drawCircle</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Will the circle showing the accuracy of the detection be displayed or not.</td>
        </tr>
        <tr id="control-location-follow">
            <td><code><b>follow</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Update user location dynamically or not, works if <code>watch</code> and <code>setView</code> options are
                exposed to `true` in <code>locateOptions</code>.</td>
        </tr>
        <tr id="control-location-stopfollowingondrag">
            <td><code><b>stopFollowingOnDrag</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Enables or disables the user's location update as he drag the map.</td>
        </tr>
        <tr id="control-location-metric">
            <td><code><b>metric</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Use metric or English units of measurement.</td>
        </tr>
        <tr id="control-location-locateoptions">
            <td><code><b>locateOptions</b></code></td>
            <td><code>Object </code></td>
            <td><code></code></td>
            <td>See <a href="/doc/maps/en/manual/map#geolocation-options">geo-location options</a>.</td>
        </tr>
    </tbody>
</table>
