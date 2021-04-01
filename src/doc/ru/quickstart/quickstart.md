## Все возможности API&SDK 2ГИС
[dev.2gis.ru](https://dev.2gis.ru)

## Полная обновлённая документация
[docs.2gis.com/ru](https://docs.2gis.com/ru)



## Общие сведения

При помощи API карт вы сможете:

* <span style="color:323232">создавать интерактивные карты на веб-странице;</span>
* <span style="color:323232">показывать на карте различные объекты (маркеры, попапы, геометрические объекты);</span>
* <span style="color:323232">производить поиск на карте: определять координаты геообъектов по их названиям и названия по координатам.</span>

Исходный код API карт доступен на [GitHub](https://github.com/2gis/mapsapi), проект открыт к предложениям и пулл-реквестам.

### Начало работы

Ниже приведен простой пример создания карты.

#### Подключите API

Для подключения JavaScript кода API добавьте в секцию head HTML-страницы следующий код:

    <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full"></script>

Если вас интересует подключение кода API с помощью npm, перейдите в раздел [Подключение API](/doc/maps/ru/manual/dg-loading#npm).

#### Создайте контейнер карты

Для создания контейнера, в котором будет отображаться карта, необходимо добавить блочный HTML-элемент необходимого вам размера:

    <body>
        <div id="map" style="width:500px; height:400px"></div>
    </body>

#### Создайте карту

Теперь все готово к тому, чтобы создать карту. Для этого добавьте следующий код в секцию head:

    <script type="text/javascript">
        var map;

        DG.then(function () {
            map = DG.map('map', {
                center: [54.98, 82.89],
                zoom: 13
            });
        });
    </script>

В данном примере карта принимает два параметра:

* <span style="color:323232">center - координаты центра карты в формате [широта, долгота];</span>
* <span style="color:323232">zoom - коэффициент масштабирования в диапазоне от 1 до 18.</span>

#### Добавьте маркер на карту

После создания карты вы можете отобразить на ней маркер, добавив одну строку кода в написанный ранее код:

    <script type="text/javascript">
        var map;

        DG.then(function () {
            map = DG.map('map', {
                center: [54.98, 82.89],
                zoom: 13
            });

            DG.marker([54.98, 82.89]).addTo(map);
        });
    </script>

#### Покажите попап с информацией

Если немного расширить добавленную выше строку кода с маркером, тогда при клике в маркер будет отображаться попап
(всплывающий блок) с необходимой вам информацией:

    <script type="text/javascript">
        var map;

        DG.then(function () {
            map = DG.map('map', {
                center: [54.98, 82.89],
                zoom: 13
            });

            DG.marker([54.98, 82.89]).addTo(map).bindPopup('Вы кликнули по мне!');
        });
    </script>

#### Всё вместе

Результирующий код:

    <!DOCTYPE html>
    <html>
        <head>
            <title>API карт 2ГИС</title>
            <script src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full"></script>
            <script type="text/javascript">
                var map;

                DG.then(function () {
                    map = DG.map('map', {
                        center: [54.98, 82.89],
                        zoom: 13
                    });

                    DG.marker([54.98, 82.89]).addTo(map).bindPopup('Вы кликнули по мне!');
                });
            </script>
        </head>
        <body>
            <div id="map" style="width:500px; height:400px"></div>
        </body>
    </html>

### Дальнейшие шаги

Всё получилось? Теперь можно ознакомиться с <a href="/doc/maps/ru/manual/dg-loading">руководством для разработчиков</a>
и <a href="/doc/maps/ru/examples/base">примерами использования</a>.

### Техническая поддержка

Если у вас возникли сложности в работе с API карт &mdash; <a href="mailto:api@2gis.ru">напишите нам письмо</a>
и мы обязательно поможем вам разобраться.

### Порядок определения стоимости

Порядок определения стоимости программного обеспечения вы можете найти по адресу https://docs.2gis.com/ru/prices.
