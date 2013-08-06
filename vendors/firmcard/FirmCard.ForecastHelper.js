var ForecastHelper = {
	getForecastData: function(now, workingHours) {
        var i, num;
            res = {
                isOpened: false,
                timeToOpen: false,
                timeToClose: false,
                isLunchNow: false,
                timeToLunchBegin: false,
                timeToLunchEnd: false
            };

        if (!workingHours) {
            // today is the rest day
            return res;
        }
        // number of the current period, must start with 0
        num = -1;
        for (i in workingHours) {
            if (!workingHours.hasOwnProperty(i)) {
                break;
            }
            num++;

            // Enable shift date if end of firm work time after 00:00
            var isShiftDate = false;
            var timeFrom = workingHours[i].from.split(':');
            var timeTo = workingHours[i].to.split(':');

            if (1 * timeFrom[0] > 1 * timeTo[0]) {
                isShiftDate = true;
            }

            var timeToBegin = TranslateHelper.setTimeStrInDate(now, workingHours[i].from, false) - now;
            var timeToEnd = TranslateHelper.setTimeStrInDate(now, workingHours[i].to, isShiftDate) - now;

            if (timeToEnd <= 0) {
                // current period in past
                continue;
            } else {
                if (timeToBegin > 0) {
                    // now is before start of the current period
                    res.isOpened = false;
                    res.timeToOpen = timeToBegin;
                    if (num > 0) {
                        res.isLunchNow = true;
                        // if current period isn't first, then now is in the lunch
                        res.timeToLunchEnd = res.timeToOpen;
                    }
                    return res;
                } else {
                    // now is in the current period
                    res.isOpened = true;
                    res.timeToClose = timeToEnd;
                    // If next workhours exists, then end of current period will be for lunch
                    if (TranslateHelper.isNextWorkPeriodExists(workingHours, i)) {
                        res.timeToLunchBegin = res.timeToClose;
                    }
                    return res;
                }
            }
        }

        return res;
    },

    chooseScheduleHintMsgs: function(schedule) {
        var event,
            isOpened = schedule.get('isOpened'),
            timeToClose = schedule.get('timeToClose'),
            timeToLunchBegin = schedule.get('timeToLunchBegin'),
            timeToOpen = schedule.get('timeToOpen'),
            timeToLunchEnd = schedule.get('timeToLunchEnd'),
            nextWorkDay = schedule.get('nextWorkDay');

        schedule.set('msgCrntState', '');
        schedule.set('msgHint', '');

        if (schedule.get('isLunchNow')) {
            schedule.set('msgCrntState', schedule.msgU('is_lunch'));
        } else if (isOpened) {
            schedule.set('msgCrntState', schedule.msgU('is_open'));
        } else if (!isOpened) {
            schedule.set('msgCrntState', schedule.msgU('is_close'));
        }

        if (timeToClose) {
            var minutesToClose = Math.floor(timeToClose / 1000 / 60 / 5) * 5;
            var minutesToCloseLess = Math.ceil(timeToClose / 1000 / 60 / 5) * 5;

            if (minutesToClose <= 60) {
                event = timeToLunchBegin ? schedule.msg('to_lunch') : schedule.msg('to_close');

                if (minutesToClose > 55) {
                    if (minutesToCloseLess <= 60) {
                        schedule.set('msgHint', '. ' + schedule.msgU('less_then_hour') + ' ' + event + '.');
                    }
                } else {
                    if (minutesToCloseLess < 15) {
                        schedule.set('msgHint', '. ' + schedule.msgU('less') + ' ' + minutesToCloseLess + ' ' + schedule.msg('minutes') + ' ' + event + '. ' + schedule.msgU('you_could_late'));
                        if (!timeToLunchBegin) {
                           schedule.set('msgHint', schedule.get('msgHint') + (schedule.msg('today_msg') === 'today msg') ? '' : ' ' + schedule.msg('today_msg'));
                        }
                        schedule.set('msgHint', schedule.get('msgHint') + '.');
                    } else {
                        var remains = (schedule.msgU('remains') === 'Remains') ? '' : schedule.msgU('remains') + ' ';
                        schedule.set('msgHint', '. ' + remains + minutesToClose + ' ' + schedule.msg('minutes') + ' ' + event + '.');
                    }
                }
            }
        }

        if (timeToOpen) {
            var minutesToOpen = Math.ceil(timeToOpen / 1000 / 60 / 5) * 5;
            if (minutesToOpen < 60 || timeToLunchEnd && minutesToOpen < 120) {
                if (minutesToOpen == 60) {
                    schedule.set('msgHint', '. ' + schedule.msgU('open_in') + ' ' + schedule.msg('hour') + '.');
                } else {
                    if (timeToLunchEnd && minutesToOpen > 60) {
                        minutesToOpen = schedule.msgU('one_hour') + ' ' + (minutesToOpen % 60);
                    }
                    schedule.set('msgHint', '. ' + schedule.msgU('open_in') + ' ' + minutesToOpen + ' ' + schedule.msg('minutes') + '.');
                }
            }
        }

        if (nextWorkDay) {
            schedule.set('msgHint', '. ' + schedule.msgU('will_open')+' ' + schedule.msg(nextWorkDay));
        }
    }
};