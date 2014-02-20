## События

{toc}

### Описание

События позволяют выполнить какое-либо действие в тот момент, когда что-то происходит с объектом (например, когда пользователь кликает по карте):

    map.on('click', function(e) {
        console.log(e.latlng);
    });

Управлять событиями можно с помощью ссылок на обработчики, например, если необходимо добавить и затем удалить обработчик, определите его как функцию:

    function onClick(e) { ... }

    map.on('click', onClick);
    map.off('click', onClick);

### Методы управления событиями

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
            <td><code><b>addEventListener</b>(
                <nobr>&lt;String&gt; <i>type</i></nobr>,
                <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Подписывает обработчик (<code>fn</code>) на определенный тип события. Опционально вы можете указать контекст обработчика (объект, на который будет указывать <code>this</code>). Также вы можете подписаться на несколько типов событий, указав их через пробел (например, <code>'click dblclick'</code>).</td>
        </tr>
        <tr>
            <td><code><b>addOneTimeEventListener</b>(
                <nobr>&lt;String&gt; <i>type</i></nobr>,
                <nobr>&lt;Function&gt; <i>fn</i></nobr>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Аналогичен методу <code>addEventListener</code>, лишь с тем отличием, что после первого вызова обработчика он будет удален.</td>
        </tr>
        <tr>
            <td><code><b>addEventListener</b>(
                <nobr>&lt;Object&gt; <i>eventMap</i></nobr>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Подписывает несколько обработчиков на определенные типы событий, например <code>{click: onClick, mousemove: onMouseMove}</code></td>
        </tr>
        <tr>
            <td><code><b>removeEventListener</b>(
                <nobr>&lt;String&gt; <i>type</i></nobr>,
                <nobr>&lt;Function&gt; <i>fn?</i></nobr>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Отписывает ранее подписанный обработчик. Если обработчик не указан, тогда от определенного типа событий будут отписаны все обработчики.</td>
        </tr>
        <tr>
            <td><code><b>removeEventListener</b>(
                <nobr>&lt;Object&gt; <i>eventMap</i></nobr>,
                <nobr>&lt;Object&gt; <i>context?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Отписывает несколько обработчиков от определенных событий.</code></td>
        </tr>
        <tr>
            <td><code><b>hasEventListeners</b>(
                <nobr>&lt;String&gt; <i>type</i> )</nobr>
            </code></td>

            <td><code>Boolean</code></td>
            <td>Возвращает <code>true</code>, если у переданного типа события есть подписчики.</td>
        </tr>
        <tr>
            <td><code><b>fireEvent</b>(
                <nobr>&lt;String&gt; <i>type</i></nobr>,
                <nobr>&lt;Object&gt; <i>data?</i> )</nobr>
            </code></td>

            <td><code>this</code></td>
            <td>Инициирует событие определенного типа. Опционально можно передать объект с данными события, тогда этот объект будет передан первым параметром в функцию-обработчик.</td>
        </tr>
        <tr>
            <td><code><b>clearAllEventListeners</b>()</code></td>
            <td><code>this</code></td>
            <td>Удаляет все обработчики всех событий объекта.</code></td>
        </tr>
        <tr>
            <td><code><b>on</b>( &hellip; )</code></td>
            <td><code>this</code></td>
            <td>Псевдоним <code>addEventListener</code>.</td>
        </tr>
        <tr>
            <td><code><b>once</b>( &hellip; )</code></td>
            <td><code>this</code></td>
            <td>Псевдоним <code>addOneTimeEventListener</code>.</td>
        </tr>
        <tr>
            <td><code><b>off</b>( &hellip; )</code></td>
            <td><code>this</code></td>
            <td>Псевдоним <code>removeEventListener</code>.</td>
        </tr>
        <tr>
            <td><code><b>fire</b>( &hellip; )</code></td>
            <td><code>this</code></td>
            <td>Псевдоним <code>fireEvent</code>.</td>
        </tr>
    </tbody>
</table>

### Объекты событий

Каждый объект события &mdash; это объект с данными о событии, передаваемый параметром в функцию-обработчик, подписанную на это событие при возникновении последнего. Например:

    map.on('click', function(e) {
        console.log(e.latlng); // e является объектом события (в данном случае MouseEvent)
    });

#### Event

Базовый объект события. Все объекты событий содержат такие же свойства, как и этот объект.

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
            <td><code><b>type</b></code></td>
            <td><code>String</code></td>
            <td>Тип события (например, <code>'click'</code>).</td>
        </tr>
        <tr>
            <td><code><b>target</b></code></td>
            <td><code>Object</code></td>
            <td>Объект, который инициировал событие.</td>
        </tr>
    </tbody>
</table>

#### MouseEvent

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
            <td><code><b>latlng</b></code></td>
            <td><code><a href="/doc/maps/2.0/manual/base-classes#класс-dglatlng">LatLng</a></code></td>
            <td>Географическая точка, в которой было инициировано событие мышки.</td>
        </tr>
        <tr>
            <td><code><b>layerPoint</b></code></td>
            <td><code><a href="/doc/maps/2.0/manual/base-classes#класс-dgpoint">Point</a></code></td>
            <td>Пиксельные координаты, в которых было инициировано событие мышки, относительно слоя карты.</td>
        </tr>
        <tr>
            <td><code><b>containerPoint</b></code></td>
            <td><code><a href="/doc/maps/2.0/manual/base-classes#класс-dgpoint">Point</a></code></td>
            <td>Пиксельные координаты, в которых было инициировано событие мышки, относительно контейнера карты.</td>
        </tr>
        <tr>
            <td><code><b>originalEvent</b></code></td>
            <td><code>DOMMouseEvent</code></td>
            <td>Оригинальное браузерное событие мышки.</td>
        </tr>
    </tbody>
</table>

#### LocationEvent

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
            <td><code><b>latlng</b></code></td>
            <td><code><a href="/doc/maps/2.0/manual/base-classes#класс-dglatlng">LatLng</a></code></td>
            <td>Географическое положение пользователя.</td>
        </tr>
        <tr>
            <td><code><b>bounds</b></code></td>
            <td><code><a href="/doc/maps/2.0/manual/base-classes#класс-dglatlngbounds">LatLngBounds</a></code></td>
            <td>Географические границы, в которых находится пользователь (в соответствии с точностью местоположения).</td>
        </tr>
        <tr>
            <td><code><b>accuracy</b></code></td>
            <td><code>Number</code></td>
            <td>Точность местоположения в метрах.</td>
        </tr>
        <tr>
            <td><code><b>altitude</b></code></td>
            <td><code>Number</code></td>
            <td>Высота над поверхностью земли в метрах, согласно координатной системе <a href="http://ru.wikipedia.org/wiki/WGS_84" target="_blank">WGS84</a>.</td>
        </tr>
        <tr>
            <td><code><b>altitudeAccuracy</b></code></td>
            <td><code>Number</code></td>
            <td>Точность высоты в метрах.</td>
        </tr>
        <tr>
            <td><code><b>heading</b></code></td>
            <td><code>Number</code></td>
            <td>Направление движения в градусах, считается с севера по часовой стрелке.</td>
        </tr>
        <tr>
            <td><code><b>speed</b></code></td>
            <td><code>Number</code></td>
            <td>Скорость в метрах в секунду.</td>
        </tr>
        <tr>
            <td><code><b>timestamp</b></code></td>
            <td><code>Number</code></td>
            <td>Время изменения местоположения.</td>
        </tr>
    </tbody>
</table>

#### ErrorEvent

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
            <td><code><b>message</b></code></td>
            <td><code>String</code></td>
            <td>Сообщение об ошибке.</td>
        </tr>
        <tr>
            <td><code><b>code</b></code></td>
            <td><code>Number</code></td>
            <td>Код ошибки (если имеется).</td>
        </tr>
    </tbody>
</table>

#### LayerEvent

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
            <td><code><b>layer</b></code></td>
            <td><code><a href="/doc/maps/2.0/manual/interfaces#ilayer">ILayer</a></code></td>
            <td>Слой, который был добавлен или удален.</td>
        </tr>
    </tbody>
</table>

#### TileEvent

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
            <td><code><b>tile</b></code></td>
            <td><code>HTMLElement</code></td>
            <td>Элемент тайла (изображение).</td>
        </tr>
        <tr>
            <td><code><b>url</b></code></td>
            <td><code>String</code></td>
            <td>URL тайла.</td>
        </tr>
    </tbody>
</table>

#### ResizeEvent

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
            <td><code><b>oldSize</b></code></td>
            <td><code><a href="/doc/maps/2.0/manual/base-classes#класс-dgpoint">Point</a></code></td>
            <td>Старый размер, до изменения.</td>
        </tr>
        <tr>
            <td><code><b>newSize</b></code></td>
            <td><code><a href="/doc/maps/2.0/manual/base-classes#класс-dgpoint">Point</a></code></td>
            <td>Новый размер, после изменения.</td>
        </tr>
    </tbody>
</table>

#### GeoJSON event

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
            <td><code><b>layer</b></code></td>
            <td><code><a href="/doc/maps/2.0/manual/interfaces#ilayer">ILayer</a></code></td>
            <td>Слой GeoJSON объекта добавленного на карту.</td>
        </tr>
        <tr>
            <td><code><b>properties</b></code></td>
            <td><code>Object</code></td>
            <td>Свойства GeoJSON объекта.</td>
        </tr>
        <tr>
            <td><code><b>geometryType</b></code></td>
            <td><code>String</code></td>
            <td>Тип геометрии GeoJSON объекта.</td>
        </tr>
        <tr>
            <td><code><b>id</b></code></td>
            <td><code>String</code></td>
            <td>GeoJSON ID объекта (если задан).</td>
        </tr>
    </tbody>
</table>

#### PopupEvent

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
            <td><code><b>popup</b></code></td>
            <td><code><a href="/doc/maps/2.0/manual/popups#описание">Popup</a></code></td>
            <td>Балун, который был открыт или закрыт.</td>
        </tr>
    </tbody>
</table>

#### DragEndEvent

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
            <td><code><b>distance</b></code></td>
            <td><code>Number</code></td>
            <td>Расстояние в пикселях на которое был сдвинут элемент.</td>
        </tr>
    </tbody>
</table>

#### PoiEvent

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
            <td><code><b>latlng</b></code></td>
            <td><code><a href="/doc/maps/2.0/manual/base-classes#класс-dglatlng">LatLng</a></code></td>
            <td>Географические координаты точки интереса.</td>
        </tr>
    </tbody>
</table>

#### ProjectEvent
<table>
    <thead>
        <tr>
            <th>Метод</th>
            <th>Параметры</th>
            <th>Возвращает</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>getProjectList</td>
            <td>Нет</td>
            <td>Object</td>
            <td>Возвращает все доступные <a href="/doc/maps/2.0/manual/map#map-projectdetector">проекты 2ГИС</a>.</td>
        </tr>
        <tr>
            <td>getProject</td>
            <td>Нет</td>
            <td>Object</td>
            <td>Возвращает текущий <a href="/doc/maps/2.0/manual/map#map-projectdetector">проект 2ГИС</a>.</td>
        </tr>
    </tbody>
</table>

#### LangEvent

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
            <td><code><b>lang</b></code></td>
            <td><code>String</code></td>
            <td>Текущий язык карты.</td>
        </tr>
    </tbody>
</table>