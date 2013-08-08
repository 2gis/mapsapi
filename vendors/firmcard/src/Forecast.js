FirmCard.prototype.forecast = function (sch /*slot,*/) {
    var str,
        interval = '',
        open;

    if (sch.always) { // Если круглосуточно, ничего кроме "Открыто" выводить не нужно
        str = 'Открыто';
        open = true;
    } else {
        if (sch.will.h) {
            interval += sch.will.h + ' час';// slot._t(sch.will.h, 'час', 'часа', 'часов') + ' ';
        }

        if (sch.will.m) {
            interval += sch.will.m + ' минут';//slot._t(sch.will.m, 'минуту', 'минуты', 'минут');
        }

        open = !!(sch.now.open && (sch.will.h || sch.will.m)); /* Если до закрытия меньше минуты - считаем что уже закрыто */

        if (open && sch.will.h >= this.minHoursToDisplayClosure) {
            str = 'Открыто до ' + sch.will.till;
        }

        if (open && sch.will.h < this.minHoursToDisplayClosure) {
            str = 'Закроется через ' + interval;
        }

        if (!open && sch.will.h >= this.minHoursToDisplayClosure && sch.will.d === 0) {
            str = 'Откроется в ' + sch.will.till;
        }

        if (!open && sch.will.h < this.minHoursToDisplayClosure) {
            str = 'Откроется через ' + interval;
        }

        if (!open && sch.will.d > 0 && sch.will.h >= this.minHoursToDisplayClosure) {
            str = 'Откроется ' + sch.will.when;
        }
    }

    return {str: str, open: open};
};
