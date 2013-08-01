var TranslateHelper = {

	MON: 'Mon',
    TUE: 'Tue',
    WED: 'Wed',
    THU: 'Thu',
    FRI: 'Fri',
    SAT: 'Sat',
    SUN: 'Sun',

    WH0: 'working_hours-0',
    WH1: 'working_hours-1',

	getWeek: function() {
		var self = TranslateHelper;
        return [self.MON, self.TUE, self.WED, self.THU, self.FRI, self.SAT, self.SUN];
	},

    convertWorkingHours: function(workingHours) {
        var self = TranslateHelper,
            res = {
                workFrom: false,
                workTo: false,
                lunchFrom: false,
                lunchTo: false,
                isRestDay: false
            };

        if (workingHours === false) {
            res.isRestDay = true;
            return res;
        }

        if (workingHours[self.WH1]) {
            res.workFrom = workingHours[self.WH0].from;
            res.workTo = workingHours[self.WH1].to;
            res.lunchFrom = workingHours[self.WH0].to;
            res.lunchTo = workingHours[self.WH1].from;
        } else {
            res.workFrom = workingHours[self.WH0].from;
            res.workTo = workingHours[self.WH0].to;
        }
        return res;
    },

    getWeekDayNum: function(now) {
        var num = now.getDay();

        // Convert to week, started with Monday
        return num === 0 ? 6 : num - 1;
    },

    getTodayWorkingHours: function(weekDay, workingHours) {
        return workingHours[weekDay] ? workingHours[weekDay] : false;
    },

    setTimeStrInDate: function (date, time, isShiftDate) {
        // clone the date
        var newDate = new Date(date.getTime()),
            timeParts = time.split(':');

        // Enable shift date if end of firm work time after 00:00
        if (isShiftDate) {
            newDate.setDate(date.getDate() + 1);
        }

        newDate.setHours(timeParts[0], timeParts[1], timeParts[2] ? timeParts[2] : 0, 0);
        return newDate;
    },

    isNextWorkPeriodExists: function (workingHours, num) {
        var matches, num;
        matches = num.match(/(.+-)(\d+)$/);

        if (!matches) {
            return false;
        }
        num = parseInt(matches[2]);
        num++;

        return workingHours.hasOwnProperty(matches[1] + num);
    },

    getNextWorkDay: function (now, workingHours) {
        var startWithDay,
            crntDay,
            week,
            suffix = '_in',
            paranoicCounter = 0;

        startWithDay = crntDay = TranslateHelper.getWeekDayNum(now);
        week = TranslateHelper.getWeek();
        crntDay++;
        debugger;
        while (startWithDay != crntDay && paranoicCounter++ < 8) {
            if (workingHours[week[crntDay]]) {
                return week[crntDay] + suffix;
            }
            crntDay++;
            // rounding up the crnt day num
            crntDay = crntDay % 8;
        }
        return false;
    }
};