
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
        nMins: ['минуту', 'минуты', 'минут'],
        lunch: "обед",
        Lunch: "Обед",
        workingDays: "Рабочие дни",
        restDay: "выходной",
        reviewsOnFlamp: "Отзывы на Флампе",
        writeReviewOnFlamp: "Написать отзыв на Флампе",
        payment: "оплата",
        everyday: "Ежедневно",
        worksAroundTheClock: "Работает круглосуточно",
        knowMore: "узнать больше",
        toClose: "до закрытия",
        monday: "понедельник",
        tuesday: "вторник",
        wednesday: "среда",
        thursday: "четверг",
        friday: "пятница",
        saturday: "суббота",
        sunday: "воскресенье",
        toLunch: "до обеда",
        today: "Сегодня",
        lessThenHour: "менее часа",
        youCouldLate: "вы можете не успеть",
        workingTime: "рабочее время",
        showAllOrgInRubric: "Показать все организации рубрики",
        todayIsRestDay: "Сегодня выходной",
        internet: "Оплата через Интернет",
        noncash: "Безналичный расчет",
        goldcrown: "Золотая Корона",
        dinersclub: "Diners Club",
        mastercard: "Mastercard",
        visa: "Visa",
        cash: "Наличный расчет",
        americanexpress: "American Express",
        hour : "час",
        less: "менее",
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

        tommorow: 'it завтра',
        afterTommorow: 'it послезавтра',
        afterWeek: 'it через неделю',
        nextSun: 'it в воскресенье',
        nextMon: 'it в понедельник',
        nextTue: 'it во вторник',
        nextWed: 'it в среду',
        nextThu: 'it в четверг',
        nextFri: 'it в пятницу',
        nextSat: 'it в субботу',
        willOpen: 'it откроется',
        willClose: 'it закроется',
        isOpen: 'it Открыто',
        openTill: 'it Открыто до ',
        closeIn: 'it Закроется через ',
        openAt: 'it Откроется в ',
        openIn: 'it Откроется через ',
        open: 'it Откроется ',
        nHours: ['it час', 'часа', 'часов'],
        nMins: ['it минуту', 'минуты', 'минут']
    },

    en: {
        pluralRules: function (n) { // (Number)
            if (n === 1) { // 1
                return 0;
            }
            if (n >= 2) { // 2, 3, 4 ..
                return 1;
            }
        },

        tommorow: 'en завтра',
        afterTommorow: 'en послезавтра',
        afterWeek: 'en через неделю',
        nextSun: 'en в воскресенье',
        nextMon: 'en в понедельник',
        nextTue: 'en во вторник',
        nextWed: 'en в среду',
        nextThu: 'en в четверг',
        nextFri: 'en в пятницу',
        nextSat: 'en в субботу',
        willOpen: 'en откроется',
        willClose: 'en закроется',
        isOpen: 'en Открыто',
        openTill: 'en Открыто до ',
        closeIn: 'en Закроется через ',
        openAt: 'en Откроется в ',
        openIn: 'en Откроется через ',
        open: 'en Откроется ',
        nHours: ['en час', 'часа', 'часов'],
        nMins: ['en минуту', 'минуты', 'минут']
    }
};
