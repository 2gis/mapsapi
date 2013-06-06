## L.DG.FullScreen

При подключении данного элемента управления, в правом верхнем углу карты появится контрол, при клике на который, карта разворачивается на весь экран, повторный клик восстанавливает предыдущий размер.

Для современных браузеров используется [Fullscreen API](http://www.w3.org/TR/fullscreen/), для остальных fallback.

Добавляется FullScreen на карту по умолчанию, если не передана опция fullScreenControl со значением `false`.
Расширяет класс Control.

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.DG.FullScreen</b>(
            <nobr>&lt;<a href="#control-fullscreen-options">Control.FullScreen options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td>
            <code>L.DG.FullScreen(&hellip;)</code>
        </td>

        <td>Создает элемент управления полноэкранным режимом.</td>
    </tr>
</table>

### Опции

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>По умолчанию</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>position</b></code></td>
        <td><code>String</code></td>
        <td><code><span class="string">'topright'</span></td>
        <td>Расположение элемента управления (один из углов карты). См. <a href="#control-positions">позиции элементов управления</a>.</td>
    </tr>
</table>
