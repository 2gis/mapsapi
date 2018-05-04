## DG.Entrance

Используется для отображения входа в здание.

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>DG.Entrance</b>(
            <nobr>&lt;<a href="#entrance-options">Entrance options</a>&gt; <i>options</i> )</nobr>
        </code></td>

        <td>
            <code>DG.entrance(&hellip;)</code>
        </td>

        <td>Создает объект входа на основе переданных опций.</td>
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
        <td><code><b>vectors</b></code></td>
        <td><code>Array</td>
        <td><code>[]</code></td>
        <td>Векторы, описывающие вход в здание. Обычно вектор всего один, но в случае многокомпонентного входа их может быть несколько, например, если вход с двух сторон арки.</td>
    </tr>
    <tr>
        <td><code><b>fillColor</b></code></td>
        <td><code>String</td>
        <td><code>#0085a0</code></td>
        <td>Цвет заполнения стрелок входов.</td>
    </tr>
    <tr>
        <td><code><b>strokeColor</b></code></td>
        <td><code>String</td>
        <td><code>#ffffff</code></td>
        <td>Цвет обводки стрелок входов.</td>
    </tr>
    <tr>
        <td><code><b>enableAnimation</b></code></td>
        <td><code>Boolean</td>
        <td><code>true</code></td>
        <td>Анимировать ли показ стрелок входов.</td>
    </tr>
    <tr>
        <td><code><b>interactive</b></code></td>
        <td><code>Boolean</td>
        <td><code>false</code></td>
        <td>Если значение false, тогда обработчик действий мыши не вызывается.</td>
    </tr>
    <tr>
        <td><code><b>autoClose</b></code></td>
        <td><code>Boolean</td>
        <td><code>true</code></td>
        <td>Если значение true, то входы пропадут с карты после добавления новых слоев.</td>
    </tr>
</table>

### Методы

<table>
    <tr>
        <th>Метод</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>addTo</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Добавляет вход на карту.</td>
    </tr>
    <tr>
        <td><code><b>removeFrom</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Удаляет вход с карты.</td>
    </tr>
    <tr>
        <td><code><b>isShown</b>()</code></td>
        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если вход показан на карте.</td>
    </tr>
    <tr>
        <td><code><b>setFillColor</b>()</code></td>
        <td><code>String</code></td>
        <td>Изменяет цвет заполнения стрелок.</td>
    </tr>
    <tr>
        <td><code><b>setStrokeColor</b>()</code></td>
        <td><code>String</code></td>
        <td>Изменяет цвет обводки стрелок.</td>
    </tr>
</table>
