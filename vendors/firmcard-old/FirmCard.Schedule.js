FirmCard.Schedule = function() {}

FirmCard.Schedule.payMethods = [
    'americanexpress',
    'cash',
    'dinersclub',
    'goldcrown',
    'internet',
    'mastercard',
    'noncash',
    'visa'
];
FirmCard.Schedule.FLAMP_URL = '__FLAMP_URL__';
FirmCard.Schedule.FLAMP_GOOGLE_ANALYTICS = '__FLAMP_GOOGLE_ANALYTICS__';

FirmCard.Schedule.groupWorkingHours = function(workingHours) {
    var day, i, j, week, periods;

    function areEqualWorkingHours(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    periods = [];

    j = -1;
    week = TranslateHelper.getWeek();

    for (i = 0, len = week.length; i < len; i++) {
        day = week[i];

        // It seems day is a rest day
        if (!workingHours[day]) {
            workingHours[day] = false;
        }

        if (j > -1 && areEqualWorkingHours(periods[j].workhours, workingHours[day])) {
            //Schedule of current day is same as previos
            periods[j].lastDay = day;
            periods[j].daysCount++;
        } else {
            //Schedule of current day is different then previos, create the new period
            periods[++j] = {
                workhours: workingHours[day],
                firstDay: day,
                lastDay: day,
                daysCount: 1
            };
        }
    }

    return periods;
};

FirmCard.Schedule.parsePeriods = function(periods, workingHours) {
    var i, week, len,
        // declare all possible variants
        result = {
            aroundTheClock: false,
            daily: false,
            byPeriods: false,
            allTable: false,
            anyLunchExists: false
        },
        periodsLen = periods.length,
        convertedWH;

    if (periodsLen == 1) {
        if (periods[0].firstDay == TranslateHelper.MON && periods[0].lastDay == TranslateHelper.SUN) {
            convertedWH = TranslateHelper.convertWorkingHours(periods[0].workhours);
            if (convertedWH.workFrom == '00:00' && convertedWH.workTo == '24:00') {
                result.aroundTheClock = true;
            } else {
                result.daily = convertedWH;
                result.anyLunchExists = !!convertedWH.lunchFrom;
            }
            return result;
        }
    }

    if (periodsLen < 4) {
        result.byPeriods = [];
        for (i = 0; i < periodsLen; i++) {
            result.byPeriods[i] = TranslateHelper.convertWorkingHours(periods[i].workhours);
            result.byPeriods[i].daysCount = periods[i].daysCount;
            result.byPeriods[i].workingDays = periods[i].firstDay == TranslateHelper.MON && periods[i].lastDay == TranslateHelper.FRI;
            result.byPeriods[i].firstDay = periods[i].firstDay;
            if (periods[i].lastDay && periods[i].lastDay != periods[i].firstDay) {
                result.byPeriods[i].lastDay = periods[i].lastDay;
            }
            result.anyLunchExists = result.anyLunchExists || !!periods[i].lunchFrom;
        }
    } else {
        week = TranslateHelper.getWeek();
        result.allTable = [];
        for (i = 0, len = week.length; i < len; i++) {
            result.allTable[i] = TranslateHelper.convertWorkingHours(workingHours[week[i]]);
            result.allTable[i].firstDay = week[i];
            result.anyLunchExists = result.anyLunchExists || !!result.allTable[i].lunchFrom;
        }
    }

    return result;
};

FirmCard.Schedule.getFlampUrl = function(id) {
    var urlFlamp = FirmCard.Schedule.FLAMP_URL,
        urlFlampGoogleAnalytics = FirmCard.Schedule.FLAMP_GOOGLE_ANALYTICS;

    return urlFlamp + id + '?' + urlFlampGoogleAnalytics;
};

FirmCard.Schedule.getFirmMsgs = function() {
    var msgs = {
        show_all_org_in_rubric : FirmCard.t("know more"),  //Показать все организации рубрики
        know_more : FirmCard.t("know more"),   //узнать больше
        works_around_the_clock : FirmCard.t("works around the clock"),  //Работает круглосуточно
        lunch : FirmCard.t("lunch"),  //обед
        daily : FirmCard.t("daily"),  //ежедневно
        working_days : FirmCard.t("Working days"),  //Рабочие дни
        rest_day : FirmCard.t("rest day"),  //выходной
        today_is_restday : FirmCard.t("today is restday"), //cегодня выходной
        today : FirmCard.t("today"),  //cегодня
        today_msg : FirmCard.t("today msg"),  //cегодня (в строке "Вы можете не успеть сегодня")
        working_time : FirmCard.t("working time"), //рабочее время
        is_open : FirmCard.t("Open"),  //Открыто
        is_close : FirmCard.t("Close"), //Закрыто
        is_lunch : FirmCard.t("Lunch"), //Обед
        less_then_hour : FirmCard.t("less then hour"),  //менее часа
        to_lunch : FirmCard.t("to lunch"),  //до обеда
        to_close : FirmCard.t("to close"), //до закрытия
        you_could_late : FirmCard.t("you could late"), //вы можете не успеть
        less : FirmCard.t("less"), // менее
        remains: FirmCard.t("remains"), //осталось
        minutes : FirmCard.t("minutes"),   //минут
        one_hour : FirmCard.t("one hour"),  //1 час
        hour: FirmCard.t("hour"),  //час
        open_in : FirmCard.t("open in"),   //открывается через
        will_open : FirmCard.t("will open"),   //откроется
        reviews_on_flamp : FirmCard.t("reviews on Flamp"), //Отзывы на Флампе
        write_review_on_flamp : FirmCard.t("write review on Flamp"),   //Написать отзыв на Флампе
        payment : FirmCard.t("payment"),  //оплата
        pay_americanexpress :  FirmCard.t("pay americanexpress"),  //American Express
        pay_cash : FirmCard.t("pay cash"),  //Наличный расчет
        pay_visa : FirmCard.t("pay visa"),  //Visa
        pay_mastercard : FirmCard.t("pay mastercard"),  //Mastercard
        pay_dinersclub : FirmCard.t("pay dinersclub"), //Diners Club
        pay_goldcrown : FirmCard.t("pay goldcrown"), //Золотая Корона
        pay_internet : FirmCard.t("pay internet"),  //Оплата через Интернет
        pay_noncash : FirmCard.t("pay noncash")  //Безналичный расчет
    };

    msgs[TranslateHelper.MON] = FirmCard.t("monday");
    msgs[TranslateHelper.MON+'_in'] = FirmCard.t("in monday");
    msgs[TranslateHelper.MON+'_short'] = FirmCard.t("Mo");
    msgs[TranslateHelper.TUE] = FirmCard.t("tuesday");
    msgs[TranslateHelper.TUE+'_in'] = FirmCard.t("in tuesday");
    msgs[TranslateHelper.TUE+'_short'] = FirmCard.t("Tu");
    msgs[TranslateHelper.WED] = FirmCard.t("wednesday");
    msgs[TranslateHelper.WED+'_in'] = FirmCard.t("in wednesday");
    msgs[TranslateHelper.WED+'_short'] = FirmCard.t("We");
    msgs[TranslateHelper.THU] = FirmCard.t("thursday");
    msgs[TranslateHelper.THU+'_in'] = FirmCard.t("in thursday");
    msgs[TranslateHelper.THU+'_short'] = FirmCard.t("Th");
    msgs[TranslateHelper.FRI] = FirmCard.t("friday");
    msgs[TranslateHelper.FRI+'_in'] = FirmCard.t("in friday");
    msgs[TranslateHelper.FRI+'_short'] = FirmCard.t("Fr");
    msgs[TranslateHelper.SAT] = FirmCard.t("saturday");
    msgs[TranslateHelper.SAT+'_in'] = FirmCard.t("in saturday");
    msgs[TranslateHelper.SAT+'_short'] = FirmCard.t("Sa");
    msgs[TranslateHelper.SUN] = FirmCard.t("sunday");
    msgs[TranslateHelper.SUN+'_in'] = FirmCard.t("in sunday");
    msgs[TranslateHelper.SUN+'_short'] = FirmCard.t("Su");

    return msgs;
};

FirmCard.Schedule.prototype = {
    parseWorkingHours: function(workingHours, now) {
        // declare the all possible keys
        var result = {
            aroundTheClock: false,
            daily: false,
            byPeriods: false,
            allTable: false,
            anyLunchExists: false,
            isOpened: false,
            timeToOpen: false,
            timeToClose: false,
            timeToLunchBegin: false,
            timeToLunchEnd: false,
            nextWorkDay: false,
            todayWorkhours: false,
            weekDayStr: false
        },
        periods,
        parsedPeriods,
        weekDayNum,
        todayWorkingHours,
        forecastData;

        if (!workingHours || !workingHours.workhours) {
            return result;
        }
        periods = FirmCard.Schedule.groupWorkingHours(workingHours.workhours);
        parsedPeriods = FirmCard.Schedule.parsePeriods(periods, workingHours.workhours);

        /** TODO: use JS analog of php array_merge */
        result.aroundTheClock = parsedPeriods.aroundTheClock;
        result.daily = parsedPeriods.daily;
        result.byPeriods = parsedPeriods.byPeriods;
        result.allTable = parsedPeriods.allTable;
        result.anyLunchExists = parsedPeriods.anyLunchExists;

        now = now || new Date();

        weekDayNum = TranslateHelper.getWeekDayNum(now);
        result.weekDayStr = TranslateHelper.getWeek()[weekDayNum];

        todayWorkingHours = TranslateHelper.getTodayWorkingHours(result.weekDayStr, workingHours.workhours);
        result.todayWorkhours = TranslateHelper.convertWorkingHours(todayWorkingHours);

        forecastData = ForecastHelper.getForecastData(now, todayWorkingHours);

        result.isOpened = forecastData.isOpened;
        result.timeToOpen = forecastData.timeToOpen;
        result.timeToClose = forecastData.timeToClose;
        result.timeToLunchBegin = forecastData.timeToLunchBegin;
        result.timeToLunchEnd = forecastData.timeToLunchEnd;
        result.isLunchNow = forecastData.isLunchNow;

        if (!todayWorkingHours) {
            //debugger;
            result.nextWorkDay = TranslateHelper.getNextWorkDay(now, workingHours.workhours);
        }

        return result;
    },

    setSchedule: function(schedule, msgs) {
        this._schedule = schedule;
        this._msgs = msgs;

        if (schedule.aroundTheClock) {
            this._schedule.todayWorkhours = false;
            this._schedule.timeToClose = false;
        }
        ForecastHelper.chooseScheduleHintMsgs(this);
        this._schedulePeriodsHelper();

        return this._schedule;
    },

    getSchedule: function() {
        return this._schedule;
    },

    msgU: function(msg) {
        var res = this.msg(msg),
            f = res.charAt(0).toUpperCase();
        return f + res.substr(1);
    },

    msg: function(msg) {
        if (this._msgs.hasOwnProperty(msg)) {
            return this._msgs[msg];
        }
        /** @todo log this occurrence */
        //add check of console object for IE
        console && console.log("Cant't find translation for '" + msg + "'.");
        return msg.toString().replace('_', ' ');
    },

    get: function(key) {
        return this._schedule[key];
    },

    set: function(key, val) {
        this._schedule[key] = val;
    },

    _schedulePeriodsHelper: function() {
        for ( var i = 0, len = this._schedule.byPeriods.length; i < len; i++) {
            var period, separator;
            period = this._schedule.byPeriods[i];
            if (period.workingDays) {
                period.days = this.msgU('working_days');
            } else {
                period.days = this.msgU(period.firstDay);
                if (period.daysCount > 1) {
                    separator = period.daysCount == 2 ? ", " : " &ndash; ";
                    period.days += separator + this.msg(period.lastDay);
                }
            }
            if (period.workFrom) {
                period.labelText = period.workFrom + "&ndash;" + period.workTo;
            } else {
                period.labelText = " &mdash; " + this.msg('rest_day');
            }
        }
    },

    getMsgs: function() {
        return this._msgs;
    }
}
