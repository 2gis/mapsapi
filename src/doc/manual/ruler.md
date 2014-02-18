## Класс DG.Ruler

{toc}

### Описание

Отображает на карте линейку, позволяющую замерять расстояние между географическими точками. Реализует интерфейс [ILayer](/doc/maps/2.0/manual/interfaces#ilayer).

### Пример использования

Создание и отображение линейки на карте:

    var latLngs = [
        [51.7314, 36.1938],
        [51.7307, 36.1894],
        [51.7297, 36.1926],
        [51.7299, 36.1968],
        [51.7307, 36.1968]]
    DG.ruler(latLngs).addTo(map);

### Конструктор

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
            <td><code><b>DG.Ruler</b>(
                <nobr>&lt;<a href="/doc/maps/2.0/manual/base-classes#класс-dglatlng">LatLng</a>[]&gt; <i>latlngs</i>, </nobr>
                <nobr>&lt;<a href="#опции">Ruler options</a>&gt; <i>options?</i> )</nobr>
            </code></td>
            <td>
                <code>DG.ruler(&hellip;)</code>
            </td>
            <td>Создает объект линейки по переданному массиву географических точек и необязательному объекту опций.</td>
        </tr>
    </tbody>
</table>

### Опции

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
            <td><code><b>editable</b></code></td>
            <td><code>Boolean</code></td>
            <td><code><span class="string">'true'</span></td>
            <td>Возможно ли изменять промежуточные точки линейки.</td>
        </tr>
    </tbody>
</table>

### Методы
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
                <nobr>&lt;<a href="/doc/maps/2.0/manual/map#описание">Map</a>&gt; <i>map</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Добавляет линейку на карту.</td>
        </tr>
        <tr>
            <td><code><b>getTotalDistance</b>()</nobr></code></td>
            <td><code>Number</code></td>
            <td>Возвращает расстояние (в метрах) между начальной и конечной точками.</td>
        </tr>
        <tr>
            <td><code><b>addLatLng</b>(
                <nobr>&lt;<a href="/doc/maps/2.0/manual/base-classes#класс-dglatlng">LatLng</a>&gt; <i>latlng</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Добавляет точку в линейку.</td>
        </tr>
        <tr>
            <td><code><b>setLatLngs</b>(
                <nobr>&lt;<a href="/doc/maps/2.0/manual/base-classes#класс-dglatlng">LatLng</a>[]&gt; <i>latlngs</i> )</nobr>
            </code></td>
            <td><code>this</code></td>
            <td>Заменяет все точки линейки массивом переданных географических точек.</td>
        </tr>
        <tr>
            <td><code><b>getLatLngs</b>()</code></td>
            <td><code><a href="/doc/maps/2.0/manual/base-classes#класс-dglatlng">LatLng</a>[]</code></td>
            <td>Возвращает массив точек линейки.</td>
        </tr>
        <tr>
            <td><code><b>spliceLatLngs</b>(
                <nobr>&lt;Number&gt; <i>index</i></nobr>,
                <nobr>&lt;Number&gt; <i>pointsToRemove</i></nobr>,
                <nobr>&lt;<a href="/doc/maps/2.0/manual/base-classes#класс-dglatlng">LatLng</a>&gt; <i>latlng?</i>, &hellip; )</nobr>
            </code></td>
            <td><code><a href="/doc/maps/2.0/manual/base-classes#класс-dglatlng">LatLng</a>[]</code></td>
            <td>Позволяет добавлять, удалять или заменять точки в линейке. Синтаксис аналогичен <a target="_blank" href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/splice">Array#splice</a>. Возвращает массив удаленных точек.</td>
        </tr>
    </tbody>
</table>