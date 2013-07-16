## L.DG.Entrance

Используется для отображения входа в здание.

### Конструктор

<table>
    <tr>
        <th>Конструктор</th>
        <th>Использование</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>L.DG.Entrance</b>(
            <nobr>&lt;<a href="#entrance-options">Entrance options</a>&gt; <i>options</i> )</nobr>
        </code></td>

        <td>
            <code>L.DG.entrance(&hellip;)</code>
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
        <td><code><b>fitBounds</b></code></td>
        <td><code>Boolean</td>
        <td><code>true</code></td>
        <td>Если задано значение true, карта автоматически подстраиваетя так, чтобы стрелка входа в здание отображалась посередине вьюпорта на максимально возможном зуме.</td>
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
        <td>Добавляет вход на карту. По умолчанию вход скрыт.</td>
    </tr>
    <tr>
        <td><code><b>removeFrom</b>(
            <nobr>&lt;<a href="#map">Map</a>&gt; <i>map</i> )</nobr>
        </code></td>

        <td><code>this</code></td>
        <td>Удаляет вход с карты.</td>
    </tr>
    <tr>
        <td><code><b>show</b>()</code></td>
        <td><code>this</code></td>
        <td>Анимировано показывает вход на карте.</td>
    </tr>
    <tr>
        <td><code><b>hide</b>()</code></td>
        <td><code>this</code></td>
        <td>Скрывает вход.</td>
    </tr>
    <tr>
        <td><code><b>isShown</b>()</code></td>
        <td><code>Boolean</code></td>
        <td>Возвращает <code>true</code>, если вход показан на карте.</td>
    </tr>
</table>
