## Группы

{toc}

### Класс DG.LayerGroup

Используется для группировки нескольких слоев, чтобы обрабатывать их как один. Если группа добавлена на карту, тогда удалив элемент из группы он удаляется и с карты. Реализует интерфейс [ILayer](/doc/2.0/maps/manual/interfaces#ilayer).

    DG.layerGroup([marker1, marker2])
        .addLayer(polyline)
        .addTo(map);

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
            <td><code><b>DG.LayerGroup</b>(
                <nobr>&lt;<a href="/doc/2.0/maps/manual/interfaces#ilayer">ILayer</a>[]&gt; <i>layers?</i> )</nobr>
            </code></td>
            <td>
                <code>DG.layerGroup(&hellip;)</code>
            </td>
            <td>Создает объект группы, принимает начальный набор слоев для группировки (опционально).</td>
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
                <nobr>&lt;<a href="/doc/2.0/maps/manual/map#описание">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Добавляет группу слоев на карту.</td>
        </tr>
        <tr>
            <td><code><b>addLayer</b>(
                <nobr>&lt;<a href="/doc/2.0/maps/manual/interfaces#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Добавляет указанный слой в группу.</td>
        </tr>
        <tr>
            <td><code><b>removeLayer</b>(
                <nobr>&lt;<a href="/doc/2.0/maps/manual/interfaces#ilayer">ILayer</a>&gt; <i>layer</i> | &lt;String&gt; <i>id</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Удаляет указанный слой из группы.</td>
        </tr>
        <tr>
            <td><code><b>hasLayer</b>(
                <nobr>&lt;<a href="/doc/2.0/maps/manual/interfaces#ilayer">ILayer</a>&gt; <i>layer</i> )</nobr>
            </code></td>
            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если переданный слой уже добавлен в группу.</td>
        </tr>
        <tr>
            <td><code><b>getLayer</b>(
                <nobr>&lt;String&gt; <i>id</i> )</nobr>
            </code></td>
            <td><code><a href="/doc/2.0/maps/manual/interfaces#ilayer">ILayer</a></code></td>
            <td>Возвращает слой по переданному id.</td>
        </tr>
        <tr>
            <td><code><b>getLayers</b>()</code></td>
            <td><code>Array</code></td>
            <td>Возвращает массив всех слоев группы.</td>
        </tr>
        <tr>
            <td><code><b>clearLayers</b>()</code></td>
            <td><code>this</code></td>
            <td>Удаляет все слои из группы.</td>
        </tr>
        <tr>
            <td><code><b>eachLayer</b>(
                <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Обходит циклом все слои группы, опционально можно передать контекст исполнения функции итератора.
    <pre><code>group.eachLayer(function(layer) { layer.bindPopup('Hello'); });</code></pre></td>
        </tr>
        <tr>
            <td><code><b>toGeoJSON</b>()</code></td>
            <td><code>Object</code></td>
            <td>Возвращает <a target="_blank" href="http://en.wikipedia.org/wiki/GeoJSON">GeoJSON</a> представление группы (GeoJSON FeatureCollection).</td>
        </tr>
    </tbody>
</table>

### Класс DG.FeatureGroup

Расширяет [LayerGroup](#класс-dglayergroup), включает в себя события мышки (инициированные членами группы) и общий метод bindPopup. Реализует интерфейс [ILayer](/doc/2.0/maps/manual/interfaces#ilayer).

    DG.featureGroup([marker1, marker2, polyline])
        .bindPopup('Привет! Я балун.')
        .on('click', function() { alert('Клик по группе!'); })
        .addTo(map);

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
            <td><code><b>DG.FeatureGroup</b>(
                <nobr>&lt;<a href="/doc/2.0/maps/manual/interfaces#ilayer">ILayer</a>[]&gt; <i>layers?</i> )</nobr>
            </code></td>
            <td>
                <code>DG.featureGroup(&hellip;)</code>
            </td>
            <td>Создает объект группы, принимает начальный набор слоев для группировки (опционально).</td>
        </tr>
    </tbody>
</table>

#### Методы

Содержит все [методы LayerGroup](#методы) и дополнительно:

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
            <td><code><b>bindPopup</b>(
                <nobr>&lt;String&gt; <i>htmlContent</i></nobr>,
                <nobr>&lt;<a href="/doc/2.0/maps/manual/popups#опции">Popup options</a>&gt; <i>options?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Связывает балун с указанным HTML содержимым со слоями группы, у которых есть метод <code>bindPopup</code>.</td>
        </tr>
        <tr>
            <td><code><b>getBounds</b>()</code></td>
            <td><code><a href="/doc/2.0/maps/manual/base-classes#класс-dglatlngbounds">LatLngBounds</a></code></td>
            <td>Возвращает прямоугольные границы элемента FeatureGroup (создается исходя из границ и координат дочерних элементов).</td>
        </tr>
        <tr>
            <td><code><b>setStyle</b>(
                <nobr>&lt;<a href="/doc/2.0/maps/manual/geometries#опции">Path options</a>&gt; <i>style</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Устанавливает переданные опции для каждого слоя группы, у которого есть метод <code>setStyle</code>.</td>
        </tr>
        <tr>
            <td><code><b>bringToFront</b>()</code></td>
            <td><code>this</code></td>
            <td>Позиционирует слой группы поверх остальных слоев.</td>
        </tr>
        <tr>
            <td><code><b>bringToBack</b>()</code></td>
            <td><code>this</code></td>
            <td>Позиционирует слой группы под остальными слоями.</td>
        </tr>
    </tbody>
</table>

#### События

Вы можете подписаться на следующие события используя [эти методы](/doc/2.0/maps/manual/events#методы-управления-событиями).

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
            <td><code><a href="/doc/2.0/maps/manual/events#mouseevent">MouseEvent</a></code>
            <td>Вызывается при клике на группу.</td>
        </tr>
        <tr>
            <td><code><b>dblclick</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#mouseevent">MouseEvent</a></code>
            <td>Вызывается при двойном клике на группу.</td>
        </tr>
        <tr>
            <td><code><b>mouseover</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#mouseevent">MouseEvent</a></code>
            <td>Вызывается при наведении курсора мышки на группу.</td>
        </tr>
        <tr>
            <td><code><b>mouseout</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#mouseevent">MouseEvent</a></code>
            <td>Вызывается когда курсор мышки покидает группу.</td>
        </tr>
        <tr>
            <td><code><b>mousemove</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#mouseevent">MouseEvent</a></code>
            <td>Вызывается когда курсор мышки перемещается над группой.</td>
        </tr>
        <tr>
            <td><code><b>contextmenu</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#mouseevent">MouseEvent</a></code>
            <td>Вызывается при клике правой кнопкой мышки на группу.</td>
        </tr>
        <tr>
            <td><code><b>layeradd</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#layerevent">LayerEvent</a></code>
            <td>Вызывается при добавлении слоя в группу.</td>
        </tr>
        <tr>
            <td><code><b>layerremove</b></code></td>
            <td><code><a href="/doc/2.0/maps/manual/events#layerevent">LayerEvent</a></code>
            <td>Вызывается при удалении слоя из группы.</td>
        </tr>
    </tbody>
</table>