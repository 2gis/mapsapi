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
            <code>DG.dust(<b>Object</b><i> module templates</i>)</code>
        </td>
        <td>
            <code>function(<b>String</b><i> name of dust template</i>, <b>Object</b><i> data</i>)</code>
        </td>
        <td>Считывает скомпилированые шаблоны модуля и возвращает функцию, которая используеться как рендер шаблонов. Она принимает имя шаблона и данные для подстановки и возвращает строку с итоговым html кодом.</td>
    </tr>
</table>


### Подключение шаблонов

Добавляем нужные шаблоны в каталог templates:

* **DGTraffic/**
    * **...**
    * **templates/**
        * baloon.dust
        * firmCard.dust

Чтобы получить доступ к шаблонам модуля нужно объявить переменную `__ModuleName_TMPL__` (например `__DGTraffic_TMPL__`). Эта переменная при сборке будет заменена на объект со всеми шаблонами модуля и их содержимым (обращение по имени файла шаблона, то есть: содержимое шаблона baloon.dust будет доступно через templates.balloon, а содержимое шаблона firmCard.dust через templates.firmCard):

```bash
var templates = DG.dust(__DGTraffic_TMPL__); // объект templates содержит все шаблоны модуля DGTraffic
templates(baloon) // вернет контент шаблона baloon.dust
templates(baloon, {title: 'hello'}) // вернет контент шаблона baloon.dust с подставленым title'ом
```