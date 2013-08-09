var tt = {
    _lang: 'ru',
    _yearTs: new Date().setFullYear(new Date().getFullYear(), 0, 1),
    _t: new Date(),

    _daysOfWeek: {
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
        return this._daysOfWeek[this._lang][format][day];
    },

    format: function (stamp, mask) {
        var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            defaulMask = 'HH:MM';

        if (stamp) this.setTime(stamp);
        if (!mask) var mask = defaulMask;

        var d = this._t.getDate(),
            m = this._t.getMonth(),
            y = this._t.getFullYear(),
            H = this._t.getHours(),
            M = this._t.getMinutes(),
            s = this._t.getSeconds(),
            L = this._t.getMilliseconds(),
            flags = {
                d: d,
                dd: this._pad(d),
                m: m + 1,
                mm: this._pad(m + 1),
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: this._pad(H % 12 || 12),
                H: H,
                HH: this._pad(H),
                M: M,
                MM: this._pad(M),
                s: s,
                ss: this._pad(s),
                l: this._pad(L, 3),
                L: this._pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM"
            };

        return mask.replace(token, function($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    },

    dayOfYear: function (stamp) {
        if (stamp) this.setTime(stamp);
        var day = Math.ceil((stamp) / 86400000);

        return day - this._yearFirstDay();
    },

    getTs: function (stamp, d, h, m) {
        if (stamp) this.setTime(stamp);

        var currD = this._t.getDay(),
            diffD = d - currD,
            newD = (diffD >= 0 )? diffD : (6 - currD) + d + 1,
            date = this._t;
            /*console.log('curr '+currD);
            console.log('new ' +d);
            console.log('to add ' +newD);*/
        if (d) date.setDate(date.getDate() + newD);
        if (h) date.setHours(h);
        if (m) date.setMinutes(m);

        return date.getTime();

    },

    _yearFirstDay: function (){
        return Math.floor(this._yearTs / 86400000);
    },

    _pad: function(val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
    },
};
