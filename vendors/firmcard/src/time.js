var tt = {
    _lang: 'ru',

    _t: new Date(),

    daysOfWeek: {
        ru: {
            "short":{
                "0":"Вс",
                "1":"Пн",
                "2":"Вт",
                "3":"Ср",
                "4":"Чт",
                "5":"Пт",
                "6":"Сб"
            },
            "wide":{
                "0":"Воскресенье",
                "1":"Понедельник",
                "2":"Вторник",
                "3":"Среда",
                "4":"Четверг",
                "5":"Пятница",
                "6":"Суббота"
            }
        },
        en: {
            "short":{
                "0":"Sun",
                "1":"Mon",
                "2":"Tue",
                "3":"Wed",
                "4":"Thu",
                "5":"Fri",
                "6":"Sat"
            },
            "wide":{
                "0":"Sunday",
                "1":"Monday",
                "2":"Tuesday",
                "3":"Wednesday",
                "4":"Thursday",
                "5":"Friday",
                "6":"Saturday"
            }
        }
    },

    setTime: function (stamp) {
        this._t.setTime(stamp);
        return this;
    },

    lang: function (lang) {
        this._lang = lang;
    },

    day: function (stamp, format) {
        if (stamp) this.setTime(stamp);

        var dayNum = this._t.getDay();

        if (!format) {
            return dayNum;
        } else {
            return this.weekDay(dayNum, format);
        }
    },

    weekDay: function (idx, format) {
        var day = idx % 7;
        return this.daysOfWeek[this._lang][format][day];
    },

    format: function (stamp, timeFormat) {
        if (stamp) this.setTime(stamp);
        var t = this._t;

        return t.getHours() + ':' + t.getMinutes();
    }
};
