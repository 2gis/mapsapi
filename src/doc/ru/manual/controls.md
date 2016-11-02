## Элементы управления

Элементы управления — это компоненты интерфейса, с помощью которых пользователь может взаимодействовать с картой.

{toc}

### DG.Control.Zoom

Базовый элемент управления масштабом с двумя кнопками (приблизить и отдалить). Добавляется на карту по умолчанию,
если не передана <a href="/doc/maps/ru/manual/map#map-zoomcontrol">опция <code>zoomControl</code></a> со значением <code>false</code>.
Расширяет <a href="/doc/maps/ru/manual/base-classes#dgcontrol"><code>DG.Control</code></a>.

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
                <nobr>&lt;<a href="#control-zoom-option">DG.Control.Zoom options</a>&gt; <i>options</i> )</nobr>
            </code></td>
            <td>Создает элемент управления масштабом.</td>
	    </tr>
	</tbody>
</table>

#### Опции

<table>
    <thead>
        <tr>
            <th>Опция</th>
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

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Методы

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.Attribution

Позволяет показать информацию об авторстве в небольшом текстовом контейнере на карте. Добавляется на карту по умолчанию,
если значение опции <a href="/doc/maps/ru/manual/map#map-attributioncontrol"><code>attributionControl</code></a>
не выставлено в <code>false</code>. Компонует итоговый текст из слоев, вызывая их метод
<a href="/doc/maps/ru/manual/base-classes#layer-getattribution"><code>getAttribution</code></a>.
Расширяет <a href="/doc/maps/ru/manual/base-classes#dgcontrol"><code>DG.Control</code></a>.

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

#### Опции

<table>
    <thead>
        <tr>
            <th>Опция</th>
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
                Для отключения необходимо передать <code>false</code>.</td>
        </tr>
    </tbody>
</table>

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

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
        <tr id="control-attribution-setprefix">
            <td><code><b>setPrefix</b>(
                <nobr>&lt;String&gt; <i>prefix</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет текст перед информацией об авторстве.</td>
        </tr>
        <tr id="control-attribution-addattribution">
            <td><code><b>addAttribution</b>(
                <nobr>&lt;String&gt; <i>text</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Добавляет информацию об авторстве (например, <code>&#39;Картографические данные 2GIS&#39;</code>).</td>
        </tr>
        <tr id="control-attribution-removeattribution">
            <td><code><b>removeAttribution</b>(
                <nobr>&lt;String&gt; <i>text</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Удаляет информацию об авторстве.</td>
        </tr>
    </tbody>
</table>

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.Scale

Показывает масштаб карты в метрической (метры, километры) и английской (мили, футы) системах измерений.
Расширяет <a href="/doc/maps/ru/manual/base-classes#dgcontrol"><code>DG.Control</code></a>.

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

#### Опции

<table>
    <thead>
        <tr>
            <th>Опция</th>
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
                <a href="/doc/maps/ru/manual/map#map-moveend"><code>moveend</code></a>, в противном случае, при каждом событии
                <a href="/doc/maps/ru/manual/map#map-move"><code>move</code></a>.</td>
        </tr>
    </tbody>
</table>

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Методы

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.Ruler

Кнопка включения отображения линейки для измерения расстояний на карте.
Расширяет <a href="/doc/maps/ru/manual/base-classes#dgcontrol"><code>DG.Control</code></a>.

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
            <td>Создает кнопку включения отображения линейки.</td>
        </tr>
	</tbody>
</table>

#### Опции

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Методы

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.Traffic

Кнопка включения отображения слоя пробок на карте.
Расширяет <a href="/doc/maps/ru/manual/base-classes#dgcontrol"><code>DG.Control</code></a>.

    DG.control.traffic().addTo(map);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-traffic-l-control-traffic">
            <td><code><b>DG.control.traffic</b>(
                <nobr>&lt;<a href="#control-traffic-option">DG.Control.Traffic options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Создает элемент управления слоем пробок.</td>
        </tr>
	</tbody>
</table>

#### Опции

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Методы

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.Fullscreen

Кнопка включения полноэкранного отображения карты, повторный клик в кнопку
восстанавливает исходный размер карты. Добавляется на карту по умолчанию,
если не передана опция <code>fullscreenControl</code> со значением <code>false</code>.
Расширяет <a href="/doc/maps/ru/manual/base-classes#dgcontrol"><code>DG.Control</code></a>.

    DG.control.fullscreen().addTo(map);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-fullscreen-l-control-fullscreen">
            <td><code><b>DG.control.fullscreen</b>(
                <nobr>&lt;<a href="#control-fullscreen-option">DG.Control.Fullscreen options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Создает элемент управления полноэкранным режимом.</td>
        </tr>
	</tbody>
</table>

#### Опции

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Методы

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

### DG.Control.LocationControl

Элемент управление (кнопка), при клике на которую определяется и отображается текущее месторасположение пользователя.
Если API геолокации не поддерживается устройством, тогда элемент управления не выводится.

    DG.control.location().addTo(map);

#### Создание

<table>
    <thead>
        <tr>
            <th>Конструктор</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-location-l-control-location">
            <td><code><b>DG.control.location</b>(
                <nobr>&lt;<a href="#control-location-option">DG.Control.LocationControl options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>Создает элемент управления геопозиционированием.</td>
        </tr>
	</tbody>
</table>

#### Опции

<table>
    <thead>
        <tr>
            <th>Опция</th>
            <th>Тип</th>
            <th>Значение<br>по умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr id="control-location-drawcircle">
            <td><code><b>drawCircle</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Будет ли отображаться круг, показывающий точность определения месторасположения.</td>
        </tr>
        <tr id="control-location-follow">
            <td><code><b>follow</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Динамическое обновление месторасположения пользователя, работает, если <code>watch</code> и
                <code>setView</code> выставлены в <code>true</code>.</td>
        </tr>
        <tr id="control-location-stopfollowingondrag">
            <td><code><b>stopFollowingOnDrag</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>false</code></td>
            <td>Включает или отключает обновление месторасположения пользователя при перетаскивании карты.</td>
        </tr>
        <tr id="control-location-metric">
            <td><code><b>metric</b></code></td>
            <td><code>Boolean </code></td>
            <td><code>true</code></td>
            <td>Использовать метрические или английские единицы измерения.</td>
        </tr>
        <tr id="control-location-locateoptions">
            <td><code><b>locateOptions</b></code></td>
            <td><code>Object </code></td>
            <td><code></code></td>
            <td>См. <a href="/doc/maps/ru/manual/map#geolocation-options">geo-location options</a>.</td>
        </tr>
    </tbody>
</table>

Опции, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->

#### Методы

Методы, унаследованные от <a href="/doc/maps/ru/manual/base-classes#dgcontrol">Control</a> <!-- TODO: include options -->
