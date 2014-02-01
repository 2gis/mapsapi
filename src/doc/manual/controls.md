## Элементы управления

{toc}

### Описание

Элементы управления — это компоненты пользовательского интерфейса, с помощью которых пользователь может взаимодействовать с картой.

### Класс DG.Control

Базовый класс для всех элементов управления. Реализует интерфейс [IControl](#). Элементы добавляются на карту следующим образом:

    control.addTo(map);
    // то же самое, что
    map.addControl(control);

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
            <td><code><b>DG.Control</b>(
                <nobr>&lt;<a href="#опции">Control options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>
                <code>DG.control(<span class="comment">&hellip;</span>)</code>
            </td>
            <td>Создает элемент управления с переданными опциями.</td>
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
            <td><code><b>position</b></code></td>
            <td><code>String</code></td>
            <td><code>'topright'</td>
            <td>Расположение элемента управления (один из углов карты). См. <a href="#позиции-элементов-управления">позиции элементов управления</a>.</td>
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
            <td><code><b>setPosition</b>(
                <nobr>&lt;String&gt; <i>position</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Устанавливает позицию элемента управления См. <a href="#позиции-элементов-управления">позиции элементов управления</a>.</td>
        </tr>
        <tr>
            <td><code><b>getPosition</b>()</code></td>
            <td><code>String</code></td>
            <td>Возвращает текущую позицию элемента управления.</td>
        </tr>
        <tr>
            <td><code><b>addTo</b>(
                <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Добавляет элемент управления на карту.</td>
        </tr>
        <tr>
            <td><code><b>removeFrom</b>(
                <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Удаляет элемент управления с карты.</td>
        </tr>
        <tr>
            <td><code><b>getContainer</b>()</code></td>
            <td><code>HTMLElement</code></td>
            <td>Возвращает HTML контейнер элемента управления.</td>
        </tr>
    </tbody>
</table>

#### Позиции элементов управления

Позиции элементов управления (углы карты, в которых располагаются элементы) устанавливаются с помощью строк. Отступы между границами карты и элементами управления можно установить с помощью CSS.

<table>
    <thead>
        <tr>
            <th>Позиция</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>'topleft'</code></td>
            <td>Верхний левый угол карты.</td>
        </tr>
        <tr>
            <td><code>'topright'</code></td>
            <td>Верхний правый угол карты.</td>
        </tr>
        <tr>
            <td><code>'bottomleft'</code></td>
            <td>Нижний левый угол карты.</td>
        </tr>
        <tr>
            <td><code>'bottomright'</code></td>
            <td>Нижний правый угол карты.</td>
        </tr>
    </tbody>
</table>

### Класс DG.Control.Zoom

Базовый элемент управления масштабом с двумя кнопками (приблизить и отдалить). Добавляется на карту по умолчанию, если не передана опция zoomControl со значением `false`. Расширяет [Control](#класс-dgcontrol).

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
            <td><code><b>DG.Control.Zoom</b>(
                <nobr>&lt;<a href="#позиции-элементов-управления">Control.Zoom options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>
                <code>DG.control.zoom(&hellip;)</code>
            </td>
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
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code><b>position</b></code></td>
            <td><code>String</code></td>
            <td><code><span>'topleft'</span></td>
            <td>Расположение элемента управления (один из углов карты). См. <a href="#позиции-элементов-управления">позиции элементов управления</a>.</td>
        </tr>
        <tr>
            <td><code><b>zoomInText</b></code></td>
            <td><code>String</code></td>
            <td><code><span>'+'</span></td>
            <td>Текст кнопки Приблизить.</td>
        </tr>
        <tr>
            <td><code><b>zoomOutText</b></code></td>
            <td><code>String</code></td>
            <td><code><span>'-'</span></td>
            <td>Текст кнопки Отдалить.</td>
        </tr>
        <tr>
            <td><code><b>zoomInTitle</b></code></td>
            <td><code>String</code></td>
            <td><code><span>'Zoom in'</span></td>
            <td>Значение атрибута title для конпки Приблизить.</td>
        </tr>
        <tr>
            <td><code><b>zoomInTitle</b></code></td>
            <td><code>String</code></td>
            <td><code><span>'Zoom out'</span></td>
            <td>Значение атрибута title для конпки Отдалить.</td>
        </tr>
    </tbody>
</table>

### Класс DG.Control.Fullscreen

Кнопка, при клике на которую карта разворачивается на весь экран, повторный клик восстанавливает предыдущий размер. Добавляется на карту по умолчанию, если не передана опция fullscreenControl со значением `false`. Расширяет [Control](#класс-dgcontrol).

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
            <td><code><b>DG.Control.Fullscreen</b>(
                <nobr>&lt;<a href="#опции-2">Control.Fullscreen options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>
                <code>DG.Control.Fullscreen(&hellip;)</code>
            </td>
            <td>Создает элемент управления полноэкранным режимом.</td>
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
            <td><code><b>position</b></code></td>
            <td><code>String</code></td>
            <td><code><span class="string">'topright'</span></td>
            <td>Расположение элемента управления (один из углов карты). См. <a href="#позиции-элементов-управления">позиции элементов управления</a>.</td>
        </tr>
    </tbody>
</table>

### Класс DG.Control.LocationControl

Кнопка, при клике на которую определяется и отображается текущее месторасположение пользователя. Если <a href="http://dev.w3.org/geo/api/spec-source.html" target="_blank">API геолокации</a> не поддерживается устройством, тогда элемент управления не выводится.

    DG.control.location().addTo(map);

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
            <td><code><b>DG.Control.LocationControl</b>(
                <nobr>&lt;<a href="#опции-3">Control.Locate options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>
                <code>DG.Control.LocationControl(&hellip;)</code>
            </td>
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
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td><code><b>position</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">'topleft'</span></td>
        <td>Расположение элемента управления (один из углов карты). См. <a href="#позиции-элементов-управления">позиции элементов управления</a>.</td>
    </tr>
    <tr>
        <td><code><b>drawCircle</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="string">true</span></td>
        <td>Будет ли отображаться круг, показывающий точность определения месторасположения.</td>
    </tr>
    <tr>
        <td><code><b>follow</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="string">false</span></td>
        <td>Динамическое обновление месторасположения пользователя, работает если `watch` и `setView` выставлены в true в locateOptions.</td>
    </tr>
    <tr>
        <td><code><b>stopFollowingOnDrag</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="string">false</span></td>
        <td>Включает или отключает обновление месторасположения пользователя при перетаскивании карты.</td>
    </tr>
    <tr>
        <td><code><b>metric</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="string">true</span></td>
        <td>Использовать метрические или английские единицы измерения.</td>
    </tr>
    <tr>
        <td><code><b>locateOptions</b></code></td>
        <td><code>Object</code></td>
        <td><code><span class="string"></span></td>
        <td>См. <a href="#map-locate-options">параметры определения расположения</a>.</td>
    </tr>
</table>

### Класс DG.Control.Attribution

Позволяет показать атрибутику в небольшом текстовом контейнере на карте. Расширяет [Control](#класс-dgcontrol).

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
            <td><code><b>DG.Control.Attribution</b>(
                <nobr>&lt;<a href="#опции-4">Control.Attribution options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>
                <code>DG.control.attribution(&hellip;)</code>
            </td>
            <td>Создает элемент атрибутики.</td>
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
            <td><code><b>position</b></code></td>
            <td><code>String</code></td>
            <td><code><span class="string">'bottomright'</span></td>
            <td>Расположение элемента управления (один из углов карты). См. <a href="#позиции-элементов-управления">позиции элементов управления</a>.</td>
        </tr>
        <tr>
            <td><code><b>prefix</b></code></td>
            <td><code>String</code></td>
            <td><code>'Leaflet'</td>
            <td>Текст, который будет показан перед атрибутикой. Для отключения необходимо указать <code>false</code>.</td>
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
            <td><code><b>setPrefix</b>(
                <nobr>&lt;String&gt; <i>prefix</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Устанавливает текст перед атрибутикой.</td>
        </tr>
        <tr>
            <td><code><b>addAttribution</b>(
                <nobr>&lt;String&gt; <i>text</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Добавляет текст атрибутики (например, <code>'Картографические данные &amp;copy; 2GIS'</code>).</td>
        </tr>
        <tr>
            <td><code><b>removeAttribution</b>(
                <nobr>&lt;String&gt; <i>text</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Удаляет текст атрибутики.</td>
        </tr>
    </tbody>
</table>

### Класс DG.Control.Scale

Показывает масштаб карты в метрической (метры, километры) и английской (мили, футы) системах измерений. Расширяет [Control](#класс-dgcontrol).

    DG.control.scale().addTo(map);

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
            <td><code><b>DG.Control.Scale</b>(
                <nobr>&lt;<a href="#опции-5">Control.Scale options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>
                <code>DG.control.scale(&hellip;)</code>
            </td>
            <td>Создает индикатор масштаба с переданными опциями.</td>
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
            <td><code><b>position</b></code></td>
            <td><code>String</code></td>
            <td><code><span class="string">'bottomleft'</span></td>
            <td>Расположение элемента управления (один из углов карты). См. <a href="#позиции-элементов-управления">позиции элементов управления</a>.</td>
        </tr>
        <tr>
            <td><code><b>maxWidth</b></code></td>
            <td><code>Number</code></td>
            <td><code><span class="number">100</span></code></td>
            <td>Максимальная ширина элемента в пикселях.</td>
        </tr>
        <tr>
            <td><code><b>metric</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Включает или отключает метрическую систему измерений (метры, километры).</td>
        </tr>
        <tr>
            <td><code><b>imperial</b></code></td>
            <td><code>Boolean</code></td>
            <td><code>true</code></td>
            <td>Включает или отключает английскую систему измерений (мили, футы).</td>
        </tr>
        <tr>
            <td><code><b>updateWhenIdle</b></code></td>
            <td><code>Boolean</code></td>
            <td><code><span class="literal">false</span></code></td>
            <td>Если <code>true</code>, тогда элемент обновляется при событии <code>moveend</code>, иначе всегда будет отображена актуальная информация (обновляется при событии <code>move</code>).</td>
        </tr>
    </tbody>
</table>