## Интерфейсы

{toc}

### IHandler

Интерфейс, который реализуется [обработчиками взаимодействия](/doc/maps/manual/map#свойства).

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
    </tbody>
</table>

### ILayer

Описывает объект, который привязан к определенному местоположению (или набору местоположений) на карте. Реализуется такими объектами, как [тайловые слои](/doc/maps/manual/layers#класс-dgtilelayer), [маркеры](/doc/maps/manual/markers#класс-dgmarker), [балуны](/doc/maps/manual/popups#описание), [слои](/doc/maps/manual/layers#описание), [векторные слои](/doc/maps/manual/geometries) и [группы](/doc/maps/manual/groups#класс-dglayergroup).

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
            <td><code><b>onAdd</b>(
                <nobr>&lt;<a href="/doc/maps/manual/map#описание">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>
            <td>-</td>
            <td>Должен содержать код, который создает DOM элементы слоя, добавляет их на <a href="/doc/maps/manual/map#панели-карты">панели карты</a> и подписывает обработчики на все необходимые события карты. Вызывается при <code>map.addLayer(layer)</code>.</td>
        </tr>
        <tr>
            <td><code><b>onRemove</b>(
                <nobr>&lt;<a href="/doc/maps/manual/map#описание">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>
            <td>-</td>
            <td>Должен содержать код очистки, который удаляет элементы слоя и отписывает ранее добавленные обработчики событий. Вызывается при <code>map.removeLayer(layer)</code>.</td>
        </tr>
    </tbody>
</table>

#### Реализация собственных слоев

Наиболее важными при разработке слоев являются событие [viewreset](/doc/maps/manual/map#map-viewreset) и метод [latLngToLayerPoint](/doc/maps/manual/map#map-latlngtolayerpoint) карты. `viewreset` вызывается когда карта должна спозиционировать свои слои (например, при изменении масштаба), а `latLngToLayerPoint` используется для получения новых координат слоя.

Еще одним событием, которое часто используется при разработке слоев является [moveend](/doc/maps/manual/map#map-moveend), оно вызывается после любых движений карты (перемещение, изменение масштаба и т.п.).

Еще одна важная особенность, которую необходимо знать &mdash; для всех DOM элементов, которые должны быть скрыты во время анимации изменения масштаба карты необходимо добавить класс `leaflet-zoom-hide`.

#### Пример реализации слоя

Пример реализации слоя:

    var MyCustomLayer = DG.Class.extend({

        initialize: function (latlng) {
            // сохраняет позицию или другие опции конструктора
            this._latlng = latlng;
        },

        onAdd: function (map) {
            this._map = map;

            // создает DOM элемент и добавляет его на панели карты
            this._el = DG.DomUtil.create('div', 'my-custom-layer leaflet-zoom-hide');
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
            DG.DomUtil.setPosition(this._el, pos);
        }
    });

    map.addLayer(new MyCustomLayer(latlng));

### IControl

Графические элементы управления, которые располагаются в одном из углов карты. Реализуется элементами [zoom](/doc/maps/manual/controls#класс-dgcontrolzoom), [attribution](/doc/maps/manual/controls#класс-dgcontrolattribution), [ruler](/doc/maps/manual/controls#класс-dgcontrolruler) и т.п.

#### Методы

Каждый элемент управления должен наследоваться от класса [Control](/doc/maps/manual/controls#класс-dgcontrol) и иметь следующие методы:

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
            <td><code><b>onAdd</b>(
                <nobr>&lt;<a href="/doc/maps/manual/map#описание">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>
            <td><code>HTMLElement</code></td>
            <td>Должен содержать код, который создает DOM элементы, подписывает обработчики на все необходимые события карты и возвращает элемент содержащий содержимое элемента управления. Вызывается при <code>map.addControl(control)</code> или <code>control.addTo(map)</code>.</td>
        </tr>
        <tr>
            <td><code><b>onRemove</b>(
                <nobr>&lt;<a href="/doc/maps/manual/map#описание">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>
            <td>-</td>
            <td>Опционально, должен содержать код очистки (например, отписывать обработчики событий). Вызывается при <code>map.removeControl(control)</code> или <code>control.removeFrom(map)</code>. DOM контейнер элемента управления удаляется автоматически.</td>
        </tr>
    </tbody>
</table>

#### Пример реализации элемента управления

    var MyControl = DG.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function (map) {
            // создает контейнер элемента управления с определенным именем класса
            var container = DG.DomUtil.create('div', 'my-custom-control');

            // ... инициализирует другие DOM элементы, добавляет обработчики событий и т.п.

            return container;
        }
    });

    map.addControl(new MyControl());

Если вы задаете собственный конструктор элемента управления, тогда необходимо корректно обработать опции:

    var MyControl = DG.Control.extend({
        initialize: function (foo, options) {
            // ...
            DG.Util.setOptions(this, options);
        },
        // ...
    });

Это позволит передавать такие опции, как, например, `position` при создании объекта элемента управления:

    map.addControl(new MyControl('bar', {position: 'bottomleft'}));