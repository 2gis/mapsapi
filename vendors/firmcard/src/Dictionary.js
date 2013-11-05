/*global
    FirmCard:false
*/
// FirmCard.dictionary = {};

FirmCard.prototype.dict = {

    t: function (lang, msg, argument) { // (String, Number) -> String
        var result,
            msgIsset = false,
            dictionaryMsg,
            exp;

        if (typeof this[lang] === 'undefined') {
            lang = 'ru';
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

        btnBack: 'Назад',
        btnFindWay: 'Проехать сюда',
        btnEntrance: 'Найти вход',
        linkReviews: ['отзыв', 'отзыва', 'отзывов'],
        linkPhoto: ['фото', 'фото', 'фото'],
        linkBooklet: ['Буклет'],
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
        lunch: 'обед',
        Lunch: 'Обед. ',
        workingDays: 'Рабочие дни',
        weekdays: 'Будние дни',
        restDay: 'выходной',
        reviewsOnFlamp: 'Отзывы на Флампе',
        writeReviewOnFlamp: 'Написать отзыв на Флампе',
        payment: 'оплата',
        everyday: 'Ежедневно c',
        worksAroundTheClock: 'Работает круглосуточно',
        aroundTheClock: 'Круглосуточно',
        knowMore: 'узнать больше',
        toClose: 'до закрытия',
        monday: 'понедельник',
        tuesday: 'вторник',
        wednesday: 'среда',
        thursday: 'четверг',
        friday: 'пятница',
        saturday: 'суббота',
        sunday: 'воскресенье',
        toLunch: 'до обеда',
        today: 'Сегодня',
        lessThenHour: 'менее часа',
        youCouldLate: 'вы можете не успеть',
        workingTime: 'рабочее время',
        showAllOrgInRubric: 'Показать все организации рубрики',
        todayIsRestDay: 'Сегодня выходной',
        internet: 'Оплата через Интернет',
        noncash: 'Безналичный расчет',
        goldcrown: 'Золотая Корона',
        dinersclub: 'Diners Club',
        mastercard: 'Mastercard',
        maestrocard: 'MaestroCard',
        visa: 'Visa',
        cash: 'Наличный расчет',
        americanexpress: 'American Express',
        hour : 'час',
        less: 'менее',
        'in' : 'Через',
        isClosingOnDinner : ' закрывается на обед'
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

        btnBack: 'it Назад',
        btnFindWay: 'it Проехать сюда',
        btnEntrance: 'it Найти вход',
        linkReviews: ['it отзыв', 'it отзыва', 'it отзывов'],
        linkPhoto: ['it фото', 'it фото', 'it фото'],
        linkBooklet: ['it Буклет'],
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
        nMins: ['it минуту', 'минуты', 'минут'],
        lunch: 'it обед',
        Lunch: 'it Обед. ',
        workingDays: 'it Рабочие дни',
        weekdays: 'it Будние дни',
        restDay: 'it выходной',
        reviewsOnFlamp: 'it Отзывы на Флампе',
        writeReviewOnFlamp: 'it Написать отзыв на Флампе',
        payment: 'it оплата',
        everyday: 'it Ежедневно c',
        worksAroundTheClock: 'it Работает круглосуточно',
        aroundTheClock: 'it Круглосуточно',
        knowMore: 'it узнать больше',
        toClose: 'it до закрытия',
        monday: 'it понедельник',
        tuesday: 'it вторник',
        wednesday: 'it среда',
        thursday: 'it четверг',
        friday: 'it пятница',
        saturday: 'it суббота',
        sunday: 'it воскресенье',
        toLunch: 'it до обеда',
        today: 'it Сегодня',
        lessThenHour: 'it менее часа',
        youCouldLate: 'it вы можете не успеть',
        workingTime: 'it рабочее время',
        showAllOrgInRubric: 'it Показать все организации рубрики',
        todayIsRestDay: 'it Сегодня выходной',
        internet: 'it Оплата через Интернет',
        noncash: 'it Безналичный расчет',
        goldcrown: 'it Золотая Корона',
        dinersclub: 'it Diners Club',
        mastercard: 'it Mastercard',
        maestrocard: 'it MaestroCard',
        visa: 'it Visa',
        cash: 'it Наличный расчет',
        americanexpress: 'it American Express',
        hour : 'it час',
        less: 'it менее',
        'in' : 'it Через',
        isClosingOnDinner : 'it закрывается на обед'
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

        btnBack: 'en Назад',
        btnFindWay: 'en Проехать сюда',
        btnEntrance: 'en Найти вход',
        linkReviews: ['en отзыв', 'en отзыва', 'en отзывов'],
        linkPhoto: ['en фото', 'en фото', 'en фото'],
        linkBooklet: ['en Буклет'],
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
        nMins: ['en минуту', 'минуты', 'минут'],
        lunch: 'en обед',
        Lunch: 'en Обед. ',
        workingDays: 'en Рабочие дни',
        weekdays: 'en Будние дни',
        restDay: 'en выходной',
        reviewsOnFlamp: 'en Отзывы на Флампе',
        writeReviewOnFlamp: 'en Написать отзыв на Флампе',
        payment: 'en оплата',
        everyday: 'en Ежедневно c',
        worksAroundTheClock: 'en Работает круглосуточно',
        aroundTheClock: 'en Круглосуточно',
        knowMore: 'en узнать больше',
        toClose: 'en до закрытия',
        monday: 'en понедельник',
        tuesday: 'en вторник',
        wednesday: 'en среда',
        thursday: 'en четверг',
        friday: 'en пятница',
        saturday: 'en суббота',
        sunday: 'en воскресенье',
        toLunch: 'en до обеда',
        today: 'en Сегодня',
        lessThenHour: 'en менее часа',
        youCouldLate: 'en вы можете не успеть',
        workingTime: 'en рабочее время',
        showAllOrgInRubric: 'en Показать все организации рубрики',
        todayIsRestDay: 'en Сегодня выходной',
        internet: 'en Оплата через Интернет',
        noncash: 'en Безналичный расчет',
        goldcrown: 'en Золотая Корона',
        dinersclub: 'en Diners Club',
        mastercard: 'en Mastercard',
        maestrocard: 'en MaestroCard',
        visa: 'en Visa',
        cash: 'en Наличный расчет',
        americanexpress: 'en American Express',
        hour : 'en час',
        less: 'en менее',
        'in' : 'en Через',
        isClosingOnDinner : 'en закрывается на обед'
    },

    cs: {
        pluralRules: function (n) { // (Number)
            if (n === 1) { // 1
                return 0;
            }
            if (n >= 2) { // 2, 3, 4 ..
                return 1;
            }
        },

        btnBack: 'cs Назад',
        btnFindWay: 'cs Проехать сюда',
        btnEntrance: 'cs Найти вход',
        linkReviews: ['cs отзыв', 'cs отзыва', 'cs отзывов'],
        linkPhoto: ['cs фото', 'cs фото', 'cs фото'],
        linkBooklet: ['cs Буклет'],
        tommorow: 'cs завтра',
        afterTommorow: 'cs послезавтра',
        afterWeek: 'cs через неделю',
        nextSun: 'cs в воскресенье',
        nextMon: 'cs в понедельник',
        nextTue: 'cs во вторник',
        nextWed: 'cs в среду',
        nextThu: 'cs в четверг',
        nextFri: 'cs в пятницу',
        nextSat: 'cs в субботу',
        willOpen: 'cs откроется',
        willClose: 'cs закроется',
        isOpen: 'cs Открыто',
        openTill: 'cs Открыто до ',
        closeIn: 'cs Закроется через ',
        openAt: 'cs Откроется в ',
        openIn: 'cs Откроется через ',
        open: 'cs Откроется ',
        nHours: ['cs час', 'часа', 'часов'],
        nMins: ['cs минуту', 'минуты', 'минут'],
        lunch: 'cs обед',
        Lunch: 'cs Обед. ',
        workingDays: 'cs Рабочие дни',
        weekdays: 'cs Будние дни',
        restDay: 'cs выходной',
        reviewsOnFlamp: 'cs Отзывы на Флампе',
        writeReviewOnFlamp: 'cs Написать отзыв на Флампе',
        payment: 'cs оплата',
        everyday: 'cs Ежедневно c',
        worksAroundTheClock: 'cs Работает круглосуточно',
        aroundTheClock: 'cs Круглосуточно',
        knowMore: 'cs узнать больше',
        toClose: 'cs до закрытия',
        monday: 'cs понедельник',
        tuesday: 'cs вторник',
        wednesday: 'cs среда',
        thursday: 'cs четверг',
        friday: 'cs пятница',
        saturday: 'cs суббота',
        sunday: 'cs воскресенье',
        toLunch: 'cs до обеда',
        today: 'cs Сегодня',
        lessThenHour: 'cs менее часа',
        youCouldLate: 'cs вы можете не успеть',
        workingTime: 'cs рабочее время',
        showAllOrgInRubric: 'cs Показать все организации рубрики',
        todayIsRestDay: 'cs Сегодня выходной',
        internet: 'cs Оплата через Интернет',
        noncash: 'cs Безналичный расчет',
        goldcrown: 'cs Золотая Корона',
        dinersclub: 'cs Diners Club',
        mastercard: 'cs Mastercard',
        maestrocard: 'cs MaestroCard',
        visa: 'cs Visa',
        cash: 'cs Наличный расчет',
        americanexpress: 'cs American Express',
        hour : 'cs час',
        less: 'cs менее',
        'in' : 'cs Через',
        isClosingOnDinner : 'cs закрывается на обед'
    }
};
