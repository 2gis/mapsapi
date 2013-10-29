## L.DG.Geoclicker

Плагин поддержки геокодирования картой.
При клике мышкой в любой точке на карте выполняется запрос геокодирования и отображается балун с информацией о текущей точке.
По умолчанию, при старте карты геокликер включен.

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.DG.Geoclicker</b>(
            <nobr>&lt;<a href="#geoclicker-map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td>
            <code>L.DG.Geoclicker(&hellip;)</code>
        </td>

        <td>Добавляет функциональность геокликера на карту</td>
    </tr>
</table>

### Пример использования:
<pre>
<code>
	//отключение Геокликера
	map.dgGeoclicker.disable();

	//включение Геокликера:
    map.dgGeoclicker.enable();

    //отменить активацию Геокликера при загрузке карты
    L.Map.mergeOptions({
        dgGeoclicker: false
    });

    //после такого отключения можно будет включить геокликер с помощью
     map.dgGeoclicker.enable();
</code>
</pre>
