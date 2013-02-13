Leaflet DG AJAX Plugin
Плагин для ассинхронных кросс-доменных HTTP (AJAX) запросов.

Версия 1.0.1

Copyright (c) 2013, 2GIS, Andrey Chizh

Описание:

    Параметры:

        url   {String} URL запрашиваемой страницы
        data  {Object} Передаваемые данные

    Функции обратного вызова:

        beforeSend {Function} Срабатывает перед отправкой запроса
        success    {Function} Срабатывает, если ошибок не возникло.
                          В качестве аргумента передает полученные данные.
        error      {Function} Срабатывает, если произошла ошибка.
                          В качестве аргумента передает данные о ошибке.
        complete   {Function} Срабатывает по окончанию запроса

Пример:

    L.DGAjax({
        url: 'http://catalog.api.2gis.ru/project/list',
        data: {
            output: 'jsonp',
            key: '123456',
            version: 1.3,
            lang: 'ru'
        },
        success: function(data) {
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        },
        beforeSend: function() {
            console.log('beforeSend');
        },
        complete: function() {
            console.log('complete');
        }
    });

