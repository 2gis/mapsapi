## DG.dust

Используется для шаблонизации в Javascript. Использует шаблонизатор [dustjs(fork Linkedin)](http://linkedin.github.io/dustjs/)


### Функция-конструктор

<table>
    <tr>
        <th>Использование</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>
            <code>DG.dust(<b>String</b><i> dust</i>, <b>Object</b><i> data</i>)</code>
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

### Подключение шаблонов

Добавляем нужные шаблоны в каталог templates:

* **DGTraffic/**
    * **...**
    * **templates/**
        * baloon.tmpl
        * firmCard.tmpl

Чтобы получить доступ к шаблонам модуля нужно объявить переменную `__ModuleName_TMPL__` (например `__DGTraffic_TMPL__`). Эта переменная при сборке будет заменена на объект со всеми шаблонами модуля и их содержимым (обращение по имени файла шаблона, то есть: содержимое шаблона baloon.tmpl будет доступно через templates.balloon, а содержимое шаблона firmCard.tmpl через templates.firmCard):

```bash
var templates = __DGTraffic_TMPL__; // объект templates содержит все шаблоны модуля DGTraffic
templates.baloon // вернет контент шаблона baloon.tmpl
```