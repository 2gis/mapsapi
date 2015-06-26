## DG.dust

Используется для шаблонизации в Javascript. Использует шаблонизатор [dustjs (fork Linkedin)](http://linkedin.github.io/dustjs/)

### Функция-конструктор

<table>
    <tr>
        <th>Использование</th>
        <th>Возвращает</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>
            <code><b>String</b><i> name of dust template</i>, <b>Object</b><i> data</i></code>
        </td>
        <td>
            <code><b>String</b><i> rendered template</i></code>
        </td>
        <td>Функция, выполняющая рендер шаблона. Принимает имя шаблона и данные для подстановки и возвращает строку с итоговым html-кодом. Имя шаблона имеет следующий вид: имя_модуля/имя_файла_с_шаблоном; например: DGAttribution/copyright</td>
    </tr>
</table>


### Подключение шаблонов

Добавляем нужные шаблоны в каталог templates:

* **DGTraffic/**
    * **...**
    * **templates/**
        * balloon.dust
        * firmCard.dust

```js
var html = DG.dust('DGTraffic/balloon', {title: 'hello'}) // вернет контент шаблона balloon.dust с подставленым title'ом
```
