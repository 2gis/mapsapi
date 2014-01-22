## DG.Geoclicker

Плагин поддержки геокодирования картой.
При клике мышкой в любой точке на карте выполняется запрос геокодирования и отображается балун с информацией о текущей точке.
По умолчанию, при старте карты геокликер выключен.

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>DG.Geoclicker</b>(
            <nobr>&lt;<a href="#geoclicker-map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td>
            <code>DG.Geoclicker(&hellip;)</code>
        </td>

        <td>Добавляет функциональность геокликера на карту</td>
    </tr>
</table>

## Опции

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><b><code>showPhotos</code></b></td>
        <td><code>Boolean</code></td>
        <td><code>true</code></td>
        <td>Определяет вывод ссылки на фотографии(если есть) в карточке фирмы.</td>
    </tr>
    <tr>
        <td><b><code>showBooklet</code></b></td>
        <td><code>Boolean</code></td>
        <td><code>true</code></td>
        <td>Определяет вывод ссылки на буклет(если есть) в карточке фирмы.</td>
    </tr>
</table>

### Пример использования:
<pre>
<code>
    //включение в опциях карты с выключенной ссылкой на буклеты
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
        <td><code>DG.Point</code></td>
        <td><code>new DG.Point(12, 15)</code></td>
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
    //включение через опции карты с выключенными ссылками на буклеты
    map = new DG.Map('map', {
        center: new DG.LatLng(54.980206086231, 82.898068362003),
        zoom: 18,
        geoclicker: {
            showBooklet: false
        }
    });

	//отключение Геокликера
	map.geoclicker.disable();

	//включение Геокликера:
    map.geoclicker.enable();

    //отменить активацию Геокликера при загрузке карты
    DG.Map.mergeOptions({
        geoclicker: false
    });

    //после такого отключения можно будет включить геокликер с помощью
     map.geoclicker.enable();
</code>
</pre>
