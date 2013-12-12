## L.DG.LocationControl

При подключении данного элемента управления, в левом верхнем углу карты появится контрол, при клике на который, на карте маркером отмечается текущее месторасположение пользователя. Если Geolocation API не поддерживается устройством, контрол не выводится.

По умолчанию не выводится, подключается если в карту передать опцию locateControl со значением 'true'.

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.DG.LocationControl</b>(
            <nobr>&lt;<a href="#control-locate-options">Control.Locate options</a>&gt; <i>options?</i> )</nobr>
        </code></td>

        <td>
            <code>L.DG.LocationControl(&hellip;)</code>
        </td>

        <td>Создает элемент управления геопозиционированием.</td>
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
        <td><code><span class="string">'topleft'</span></td>
        <td>Расположение элемента управления (один из углов карты). См. <a href="#control-positions">позиции элементов управления</a>.</td>
    </tr>
    <tr>
        <td><code><b>drawCircle</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="string">true</span></td>
        <td>Рисовать круг который показывает точность определения месторасположения</td>
    </tr>
    <tr>
        <td><code><b>follow</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="string">false</span></td>
        <td>Динамически обновлять месторасположения пользователя, работает если `watch` и `setView` выставлены в true в locateOptions</td>
    </tr>
    <tr>
        <td><code><b>stopFollowingOnDrag</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="string">false</span></td>
        <td>Прекращать обновление месторасположения пользователя при перетаскивании карты</td>
    </tr>
    <tr>
        <td><code><b>metric</b></code></td>
        <td><code>Boolean</code></td>
        <td><code><span class="string">true</span></td>
        <td>Использовать метрические или британские единицы</td>
    </tr>
    <tr>
        <td><code><b>locateOptions</b></code></td>
        <td><code>Object</code></td>
        <td><code><span class="string"></span></td>
        <td>См. <a href="#map-locate-options">параметры определения расположения</a>.</td>
    </tr>
</table>
