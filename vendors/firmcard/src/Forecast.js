FirmCard.prototype.forecast = function (sch) {
    var str,
        interval = '',
        open,
        minHToClose = this.minHoursToDisplayClosure;

    if (sch.always) { // Если круглосуточно, ничего кроме "Открыто" выводить не нужно
        str = 'Открыто';
        open = true;
    } else {
        if (sch.will.h) {
            interval += this.t(sch.will.h, 'час', 'часа', 'часов') + ' ';
        }

        if (sch.will.m) {
            interval += this.t(sch.will.m, 'минуту', 'минуты', 'минут');
        }

        open = !!(sch.now.open && (sch.will.h || sch.will.m)); /* Если до закрытия меньше минуты - считаем что уже закрыто */

        if (open && sch.will.h >= minHToClose) {
            str = 'Открыто до ' + sch.will.till;
        }

        if (open && sch.will.h < minHToClose) {
            str = 'Закроется через ' + interval;
        }

        if (!open && sch.will.h >= minHToClose && sch.will.d === 0) {
            str = 'Откроется в ' + sch.will.till;
        }

        if (!open && sch.will.h < minHToClose) {
            str = 'Откроется через ' + interval;
        }

        if (!open && sch.will.d > 0 && sch.will.h >= minHToClose) {
            str = 'Откроется ' + sch.will.when;
        }
    }

    return {str: str, open: open};
};
