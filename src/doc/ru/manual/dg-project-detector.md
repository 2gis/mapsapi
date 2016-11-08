## Модуль определения проекта 2GIS

Проект — это агломерация, включающая крупный город и ближайшие населённые пункты.
Данный плагин позволяет получить информацию о просматриваемом в текущий момент времени проекте.

{toc}

### Примеры использования

Подписка на событие projectchange:

    map.on('projectchange', function (e) {
        console.log(e);
    });

Подписка на событие projectleave:

    map.on('projectleave', function (e) {
       console.log(e);
    });

### События

<table>
    <thead>
        <tr>
            <th>Событие</th>
            <th>Данные</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>projectchange</td>
            <td>ProjectEvent</td>
            <td>Возникает, когда пользователь переходит из одного проекта в другой.</td>
        </tr>
        <tr>
            <td>projectleave</td>
            <td>ProjectEvent</td>
            <td>Возникает, когда пользователь выходит за пределы текущего проекта.</td>
        </tr>
    </tbody>
</table>

#### Методы

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
            <td>getProjectList</td>
            <td>Object</td>
            <td>Возвращает все доступные проекты.</td>
        </tr>
        <tr>
            <td>getProject</td>
            <td>Object</td>
            <td>Возвращает текущий проект.</td>
        </tr>
    </tbody>
</table>
