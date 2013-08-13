L.DG.Label
==========

Плагин добавляет маркерам и геометриям, наследующим класс L.Path, всплывающую подсказку при наведении на объект. Также возможно его использование для реализации статической подсказки маркера.

## Пример использования

Если вам необходимо добавить подсказку для маркера при его создании, вы можете задать свойство ````label```` объекта ````options```` передаваемого в конструктор:

````js
L.marker([54.950206086231, 82.838068362003], {
    draggable : true,
    label : 'Marker label on hover!'
}).addTo(map)
````
Аналогично для геометрий:

````js
L.polyline([
        [55.0, 83.0],
        [54.97, 83.03],
        [54.95, 83.01],
        [54.98, 82.97]
    ], {
        label: 'Polyline label on hover!'
}).addTo(map)
````

Для добавления подсказки к уже созданному объекту следует вызвать метод ````bindLabel(content, options)````:

````js
var marker = L.marker([54.950206086231, 82.898068362003], {
    draggable : true
}).addTo(map);
marker.bindLabel( 'Static multiline<br/>label on marker!', { static : true } );
````
## Опции

Во время вызова метода ````bindLabel```` вы можете задать опции для всплывающей подсказки:

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><b><code>offset</code></b></td>
        <td><code>L.Point</code></td>
        <td><code>new L.Point(12, 15)</code></td>
        <td>Смещение контейнера всплывающей подсказки относительно позиции курсора (позиции маркера в случае использования с маркером).</td>
    </tr>
    <tr>
        <td><b><code>className</code></b></td>
        <td><code>String</code></td>
        <td><code>'dg-label'</code></td>
        <td>CSS класс который будет присвоен DOM элементу всплывающей подсказки.</td>
    </tr>
    <tr>
        <td><b><code>static</code></b></td>
        <td><code>Boolean</code></td>
        <td><code>false</code></td>
        <td>Если задано значение true, всплывающая подсказка будет отображаться постоянно.</td>
    </tr>
</table>

## Методы

**Класс L.Marker**

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>bindLabel</b>(&lt;String&gt; content, &lt;Object&gt; options?)</code></td>
        <td><code>this</code></td>
        <td>Добавляет всплывающую подсказку для маркера либо обновляет содержимое уже созданной.</td>
    </tr>
    <tr>
        <td><code><b>unbindLabel</b>()</code></td>
        <td><code>this</code></td>
        <td>Удаляет всплывающую подсказку.</td>
    </tr>
    <tr>
        <td><code><b>showLabel</b>()</code></td>
        <td><code>this</code></td>
        <td>Показывает всплывающую подсказку (в случае использования <a href="#options-static">статической</a>).</td>
    </tr>
    <tr>
        <td><code><b>hideLabel</b>()</code></td>
        <td><code>this</code></td>
        <td>Cкрывает всплывающую подсказку (в случае использования <a href="#options-static">статической</a>).</td>
    </tr>
    <tr>
        <td><code><b>getLabel</b>()</code></td>
        <td><code>L.DG.Label</code></td>
        <td>Возвращает объект всплывающей подсказки.</td>
    </tr>
</table>

**Класс L.Path**

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>bindLabel</b>(&lt;String&gt; content, &lt;Object&gt; options?)</code></td>
        <td><code>this</code></td>
        <td>Добавляет всплывающую подсказку для геометрии либо обновляет содержимое уже созданной.</td>
    </tr>
    <tr>
        <td><code><b>unbindLabel</b>()</code></td>
        <td><code>this</code></td>
        <td>Удаляет всплывающую подсказку.</td>
    </tr>
    <tr>
        <td><code><b>getLabel</b>()</code></td>
        <td><code>L.DG.Label</code></td>
        <td>Возвращает объект всплывающей подсказки.</td>
    </tr>
</table>

**Класс L.DG.Label**

Клаcc, реализует интерфейс ````ILayer```` для всплывающей подсказки. Может быть использован для создания автономной статической подсказки на карте.

Пример:
````js
var standaloneLabel = L.DG.label('Standalone tooltip');

standaloneLabel.setPosition(new L.LatLng(55.0, 82.8));
map.addLayer(standaloneLabel);
````

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>setContent</b>(&lt;String&gt; content)</code></td>
        <td><code>this</code></td>
        <td>Устанавливает содержимое всплывающей подсказки.</td>
    </tr>
    <tr>
        <td><code><b>setPosition</b>(&lt;L.Latlng&gt; latlng)</code></td>
        <td><code>this</code></td>
        <td>Устанавливает позицию всплывающей подсказки.</td>
    </tr>
</table>
