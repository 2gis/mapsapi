

    L.ajax({
        url: 'http://catalog.api.2gis.ru/project/list',
        data: {
            output: 'jsonp',
            key: 'ruxlih0718',
            version: 1.3,
            lang: 'ru'
        },
        success: function (data, textStatus) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });