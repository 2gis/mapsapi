## L.DG.Template

Используется для шаблонизации в Javascript с возможностью задавать условные операторы и циклы. Основан на функции Джона Ресига (http://ejohn.org/blog/javascript-micro-templating/).


### Функция-конструктор

<table>
    <tr>
        <th>Использование</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>
            <code>L.DG.Template(<b>String</b><i> template</i>, <b>Object</b><i> data</i>)</code>
        </td>


        <td><code><b>String</b><i> html</i></code></td>
        <td>Считывает шаблон и данные для подстановки и возвращает строку с итоговым html кодом</td>
    </tr>
</table>

### Опции

<table>
    <tr>
        <th>Опция</th>
        <th>Тип</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td><code><b>template</b></code></td>
        <td><code>String</code></td>
        <td>Шаблон</td>
    </tr>
    <tr>
        <td><code><b>data</b></code></td>
        <td><code>Object</code></td>
        <td>Данные для подстановки в шаблон</td>
    </tr>
</table>

