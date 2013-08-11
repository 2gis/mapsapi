
FirmCard.Schedule.dictionary = {};

FirmCard.Schedule.dictionary = {
    
    t: function (lang, msg, argument) { // (String, Number) -> String
        var result,
            msgIsset = false,
            dictionaryMsg,
            exp;

        if (typeof this[lang] === 'undefined') {
            lang = "ru";
        }
        dictionaryMsg = this[lang][msg];
        msgIsset = typeof dictionaryMsg !== 'undefined';
        if (!msgIsset) {
            return msg;
        }
        result = msgIsset ? dictionaryMsg : msg;

        if (argument !== undefined) {
            argument = parseInt(argument, 10);
            argument = isNaN(argument) ? 0 : argument;
            exp = this[lang].pluralRules(argument);
            result = argument + ' ' + dictionaryMsg[exp];
        }

        return result ? result : msg;
    },

    ru: {
        pluralRules: function (n) { // (Number)
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

        tommorow: 'завтра',
        afterTommorow: 'послезавтра',
        afterWeek: 'через неделю',
        nextSun: 'в воскресенье',
        nextMon: 'в понедельник',
        nextTue: 'во вторник',
        nextWed: 'в среду',
        nextThu: 'в четверг',
        nextFri: 'в пятницу',
        nextSat: 'в субботу',
        willOpen: 'откроется',
        willClose: 'закроется',
        isOpen: 'Открыто',
        openTill: 'Открыто до ',
        closeIn: 'Закроется через ',
        openAt: 'Откроется в ',
        openIn: 'Откроется через ',
        open: 'Откроется ',
        nHours: ['час', 'часа', 'часов'],
        nMins: ['минуту', 'минуты', 'минут']
    },

    it: {
        pluralRules: function (n) { // (Number)
            if (n === 1) { // 1
                return 0;
            }
            if (n >= 2) { // 2, 3, 4 ..
                return 1;
            }
        },
        
        tommorow: 'завтра',
        afterTommorow: 'послезавтра',
        afterWeek: 'через неделю',
        nextSun: 'в воскресенье',
        nextMon: 'в понедельник',
        nextTue: 'во вторник',
        nextWed: 'в среду',
        nextThu: 'в четверг',
        nextFri: 'в пятницу',
        nextSat: 'в субботу',
        willOpen: 'откроется',
        willClose: 'закроется',
        isOpen: 'Открыто',
        openTill: 'Открыто до ',
        closeIn: 'Закроется через ',
        openAt: 'Откроется в ',
        openIn: 'Откроется через ',
        open: 'Откроется ',
        nHours: ['час', 'часа', 'часов'],
        nMins: ['минуту', 'минуты', 'минут']
    }
};
