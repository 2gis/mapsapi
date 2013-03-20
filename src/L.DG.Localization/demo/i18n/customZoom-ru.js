L.Control.CustomZoom.Dictionary = L.Control.CustomZoom.Dictionary || {};

L.Control.CustomZoom.Dictionary.ru = {
    pluralRules: function (n) {
        if (n % 10 === 1 && n % 100 !== 11) { // 1, 21
            return 0;
        }
        if ((n % 10 >= 2 && n % 10 <= 4 && (n % 10) % 1 === 0) && (n % 100 < 12 || n % 100 > 14)) { // 2, 3
            return 1;
        }

        if ((n % 10 === 0) || (n % 10 >= 5 && n % 10 <= 9 && (n % 10) % 1 === 0) || (n % 100 >= 11 && (n % 100) <= 14 && (n % 100) % 1 === 0)) { // 13, 17
            return 2;
        }
    },

    "Zoom in": "Приблизить",
    "Zoom out": "Отдалить",
    "Current Zoom": "Текущий зум",
    "elevation": ["{n} этаж", "{n} этажа", "{n} этажей"],
    "hours": ["{n} час", "{n} часа", "{n} часов"]
};