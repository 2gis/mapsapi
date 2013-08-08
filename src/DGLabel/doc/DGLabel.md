Плагин тултипа для маркеров и геометрий
=======================================

Плагин добавляет маркерам и геометриям, наследующим класс L.Path, тултип возникающий при наведении на обьект. Так же возможно его использование для статической подсказки маркера,

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

Для добавления подсказки уже созданному обьекту слудет вызвать метод ````bindLabel(content, options)````:

````js
var marker = L.marker([54.950206086231, 82.898068362003], {
    draggable : true
}).addTo(map);
marker.bindLabel( 'Static multiline<br/>label on marker!', { static : true } );
````
## Опции

Во время вызова метода ````bindLabel```` вы можете задать опции для тултипа:

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
        <td>Смещение контейнера тултипа относительно позиции курсора (позиции маркера в случае использования с маркером).</td>
    </tr>
    <tr>
        <td><b><code>className</code></b></td>
        <td><code>String</code></td>
        <td><code>'dg-label'</code></td>
        <td>CSS класс который будет присвоен DOM елементу тултипа.</td>
    </tr>
    <tr>
        <td><b><code>static</code></b></td>
        <td><code>Boolean</code></td>
        <td><code>false</code></td>
        <td>Если задано значение true, тултип будет отображаться постоянно.</td>
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
        <td>Добавляет тултип для маркера либо обновляет содержимое уже созданного</td>
    </tr>
    <tr>
        <td><code><b>unbindLabel</b>()</code></td>
        <td><code>this</code></td>
        <td>Удаляет тултип</td>
    </tr>
    <tr>
        <td><code><b>showLabel</b>()</code></td>
        <td><code>this</code></td>
        <td>Показывает тултип (в случае использования <a href="#options-static">статического</a>)</td>
    </tr>
    <tr>
        <td><code><b>hideLabel</b>()</code></td>
        <td><code>this</code></td>
        <td>Cкрывает тултип (в случае использования <a href="#options-static">статического</a>)</td>
    </tr>
    <tr>
        <td><code><b>getLabel</b>()</code></td>
        <td><code>L.DG.Label</code></td>
        <td>Возвращает вспомогательный обьект тултипа</td>
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
        <td>Добавляет тултип для геометрии либо обновляет содержимое уже созданного</td>
    </tr>
    <tr>
        <td><code><b>unbindLabel</b>()</code></td>
        <td><code>this</code></td>
        <td>Удаляет тултип</td>
    </tr>
    <tr>
        <td><code><b>getLabel</b>()</code></td>
        <td><code>L.DG.Label</code></td>
        <td>Возвращает вспомогательный обьект тултипа</td>
    </tr>
</table>

**Класс L.DG.Label**

Вспомогательный клас, реализует интерфейс ````ILayer```` для тултипа. Может быть использован для создания автономной статической подсказки на карте.

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>setContent</b>(&lt;String&gt; content)</code></td>
        <td><code>this</code></td>
        <td>Устанавливает содержимое тултипа</td>
    </tr>
    <tr>
        <td><code><b>setPosition</b>(&lt;L.Latlng&gt; latlng)</code></td>
        <td><code>this</code></td>
        <td>Устанавливает позицию тултипа</td>
    </tr>
</table>
