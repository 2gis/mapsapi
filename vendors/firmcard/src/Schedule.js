/*global
    FirmCard:false
*/
FirmCard.Schedule = function (options) {
    options = options || {};

    this.localLang = options.localLang || 'ru';
    this.dict = options.dict;
    return this;
};

FirmCard.Schedule.prototype = {

    setLang: function (lang) {
        this.localLang = lang || 'ru';
        return this;
    },

    transform: function (model, params) {
        if (!model) {
            return;
        }
        params = params || {};

        function bind(fn, obj) { // (Function, Object) -> Function
            var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
            return function () {
                return fn.apply(obj, args || arguments);
            };
        }

        var todayKey, // Mon, Tue ...
            today, // Объект модели - текущий день недели
            from, // Самое раннее время открытия за день
            to, // Самое позднее время закрытия за день
            zoneOffset = params.zoneOffset || 0,
            schedule = {}, // Объект-расписание, формируемый под шаблон
            now = params.now || FirmCard.DataHelper.getProjectTime(zoneOffset).getTime(), // Current timestamp in milliseconds
            weekKeys = [], // Ключи дней недели, определяют порядок дней и первый день недели. 0 - первый день недели в регионе (не обязательно Mon)
            weekKeysLocal = [],
            weekFullKeysLocal = [],
            weekKeysShort =  [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
            weekKeysFull = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'],
            localLang = params.localLang || this.localLang,
            localWorkingDays = params.localWorkingDays || [0, 1, 1, 1, 1, 1, 0],
            firstdayOffset = params.firstdayOffset || 1,
            minHoursToDisplayClosure = params.minHoursToDisplayClosure || 4,
            t = bind(this.dict.t, this.dict);


        function capitaliseFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function getHours(str) {
            return str.substr(0, 2);
        }

        function getMinutes(str) {
            return str.substr(3, 2);
        }

        // Конвертация временной точки формата апи в формат отображения (25:00 -> 01:00)
        function formatTime(str) {
            var hours = +getHours(str) % 24 + '';

            if (hours.length === 1) {
                hours = '0' + hours;
            }

            return hours + ':' + getMinutes(str);
        }

        // Конвертация int числа в номер дня недели (диапазон 0-6)
        // отрицательные чила: -1 вернёт 6, -2 -> 5 и т.д
        // положительные: 7 -> 0, 8 -> 1
        function dayNum(n) {
            return (n + 70) % 7;
        }


        /* jshint ignore:start */
        // Возвращает последний элемент массива
        // Взято из Underscore.js http://underscorejs.org/#last
        function getArrayLast(arr, n) {
            if ( arr == null ) return void 0;
            if (   n == null ) return arr[ arr.length - 1 ];
            return slice.call( arr, Math.max(arr.length - n , 0) );
        }


        // Выполняет глубокое сравнение объектов
        // Взято из Underscore.js http://underscorejs.org/#isEqual
        // Упрощено для тех трёх сравнений, которые выполняются в Shedule.js
        function isEqual(obj1, obj2) {
            if ( obj1 === obj2 ) return true;
            if ( ! ( obj1 instanceof Object ) || ! ( obj2 instanceof Object ) ) return false;
            if ( obj1.constructor !== obj2.constructor ) return false;
            for ( var prop in obj1 ) {
                if ( ! obj1.hasOwnProperty( prop ) ) continue;
                if ( ! obj2.hasOwnProperty( prop ) ) return false;
                if ( obj1[ prop ] === obj2[ prop ] ) continue;
                if ( typeof( obj1[ prop ] ) !== "object" ) return false;
                if ( ! isEqual( obj1[ prop ],  obj2[ prop ] ) ) return false;
            }
            for ( prop in obj2 ) {
            if ( obj2.hasOwnProperty( prop ) && ! obj1.hasOwnProperty( prop ) ) return false;
            }

            return true;
        }

        // Generate an integer Array containing an arithmetic progression. A port of
        // the native Python `range()` function. See
        // [the Python documentation](http://docs.python.org/library/functions.html#range).
        function range(start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var idx = 0;
        var range = new Array(length);
        while(idx < length) {
            range[idx++] = start;
            start += step;
        }

        return range;
        }


        //Заполняет свойства объекта значениями по умолчанию
        //Взято из Underscore.js http://underscorejs.org/#defaults
        function fillDefaults(obj) {
         var args = Array.prototype.slice.call(arguments, 1);
         args.forEach(function(source) {
            if (source) {
                for (var prop in source) {
                    if (obj[prop] === void 0) obj[prop] = source[prop];
                }
            }
        });
        return obj;
        }

        //Сортирует значения согласно с итератором
        //Взято с Underscore.js http://underscorejs.org/#sortBy
        function sortBy(obj, iterator){
            return pluck(obj.map( function(value, index, list) {
                return {
                        value: value,
                        index: index,
                        criteria: iterator.call(this, value, index, list)
                        };
                }).sort(function(left, right) {
                        var a = left.criteria;
                        var b = right.criteria;
                        if (a !== b) {
                        if (a > b || a === void 0) return 1;
                        if (a < b || b === void 0) return -1;
                        }
                return left.index - right.index;
                }), 'value');
        }

        /* jshint ignore:end */

        function pluck(arr, key){
            var i, rv = [];
            for (i = 0; i < arr.length; ++i) {
            rv[i] = arr[i][key];
            }
            return rv;
        }


        // Преобразовать расписание на день в упорядоченный массив временных отсечек (string)
        // Сейчас полагается, что API уже выдаёт сортированный массив
        function getSortedTimePoints(day) {
            var points = [],
                from, to,
                deltaHours, deltaMinutes;

            if (!day || !day.working_hours) {
                return [];
            }

            for (var i = 0 ; i < day.working_hours.length ; i++) {
                from = day.working_hours[i].from;
                to = day.working_hours[i].to;

                deltaHours = getHours(to) - getHours(from);
                deltaMinutes = getMinutes(to) - getMinutes(from);
                if (deltaHours < 0 || (deltaHours === 0 && deltaMinutes <= 0)) { // Если "до" меньше или равно "от" - значит указывает на завтра
                    to = (+getHours(to) + 24) + ':' + getMinutes(to); // (01:00 -> 25:00)
                }

                points[i * 2] = {
                    time: from,
                    type: 'open'
                };
                points[i * 2 + 1] = {
                    time: to,
                    type: day.working_hours.length - 1 === i ? 'close' : 'lunch'
                };
            }

            return points;
        }

        // Возвращает массив timestamp всех точек, всех дней недели, от сегодняшнего и в будущее
        // Например, сегодня среда, отсечки будут взяты для дат со среды (сегодня) по следующий вторник включительно
        function getTimeStamps(model) {
            var timestamps = [],
                out = [],
                timePoints,
                num = weekKeys.indexOf(todayKey); // Номер сегодняшнего дня недели (для данного региона)


            // Цикл по дням недели начиная с сегодняшнего
            var j; // Номер текущего дня в массиве weekKeys
            for (var i = 0 ; i < 7 ; i++) {
                j = dayNum(num + i);
                timePoints = getSortedTimePoints(model[weekKeys[j]]);
                // Цикл по точкам времени с конвертацией в timestamp
                timePoints.forEach(
                    /* jshint -W083 */
                    function (point) {
                    // now - обязательно! иначе будет браться текущий timestamp что чревато несовпадениями при медленном быстродействии
                    // Вычислить таймстемп для данного дня недели, часа и минуты, в будущем, но ближайший к now
                    var tsp = new Date(now);
                    tsp.setDate(tsp.getDate()+i);
                    tsp.setHours(getHours(point.time));
                    tsp.setMinutes(getMinutes(point.time));
                    var ts = tsp.getTime();



                    timestamps.push({
                        ts: ts,
                        type: point.type
                    });

                    if (timestamps[timestamps.length - 1] && timestamps[timestamps.length - 2]) {
                        // Парно удаляем совпадающие точки (они не имеют смысла - это сегодня 24:00 и завтра 00:00)
                        if (timestamps[timestamps.length - 1].ts === timestamps[timestamps.length - 2].ts) {
                            timestamps.pop();
                            timestamps.pop();
                        }
                    }

                    if (timestamps[timestamps.length - 1] && timestamps[timestamps.length - 2]) {
                        // Парно переносим точки в будущее, если они обе в прошлом (первая точка ([0]) должна быть всегда открытием!)
                        if (timestamps[timestamps.length - 1].ts <= now && timestamps[timestamps.length - 2].ts <= now) {
                            timestamps[timestamps.length - 1].ts += (7 * 24 * 60 * 60 * 1000);
                            timestamps[timestamps.length - 2].ts += (7 * 24 * 60 * 60 * 1000);
                        }
                    }
                }
                /* jshint +W083 */
                );
            }

            // Сортируем на возрастание, ведь возможно были переносы в будущее
            timestamps = sortBy(timestamps, function (timestamp) { return timestamp.ts; });

            // Удаляем попарно совпадающие точки времени
            i = 0;
            while (i < timestamps.length) {
                if (timestamps[i + 1] && timestamps[i].ts === timestamps[i + 1].ts) {
                    i++;
                } else {
                    out.push(timestamps[i].ts);
                }
                i++;
            }

            // Проверка на ежедневно-круглосуточность
            if (out.length === 2 && (out[1] - out[0]) === (7 * 24 * 60 * 60 * 1000)) {
                return [];
            }

            return timestamps;
        }

        function whenOpenInverse(h, d, num) {
            if (d === 1 && h > minHoursToDisplayClosure ) {
                return t(localLang, 'tommorow');
            } else if (d > 1) {
                /* jshint -W015 */
                switch (num) {
                    case 0: return t(localLang, 'nextSun');
                    case 1: return t(localLang, 'nextMon');
                    case 2: return t(localLang, 'nextTue');
                    case 3: return t(localLang, 'nextWed');
                    case 4: return t(localLang, 'nextThu');
                    case 5: return t(localLang, 'nextFri');
                    case 6: return t(localLang, 'nextSat');
                }
                /* jshint +W015 */
            }

            return;
        }


        //Возвращает интервал в целых днях, с поправкой на смену дня в полночь, между
        // @param timestampEnd и @param dateStart
        function dayInterval(timestampEnd, dateStart) {

            var oneDay = 1000 * 60 * 60 * 24,
                dateEnd = new Date(timestampEnd.ts);

            var diff;

            diff = Math.round((dateEnd - dateStart) / oneDay);

            if( timestampEnd.type==='open' && dateEnd.getHours() < 1 )
                { diff ++; }

            return diff;
        }


        // Поместить данные в объект для шаблона о сегодняшнем дне
        function setTodayString(today) {

            var timePoints,
                periods = [],
                timestamps;

            schedule.now = {};

            // Timestamps всех отсечек
            timestamps = getTimeStamps(model);

            if (!timestamps.length) {
                schedule.always = true; // Работает ежедневно круглосуточно
                schedule.now.open = true;
            }


            for (var i = 0 ; i < timestamps.length ; i++) {
                // Попали между точками i-1 и i // Мы находимся заведомо в будущем относительно 1
                if (now >= (timestamps[i - 1] && timestamps[i - 1].ts || 0) && now < timestamps[i].ts) {
                    var h = Math.floor((timestamps[i].ts - now) / (1000 * 60 * 60)), // Количество часов до следующего timestamp
                        m = Math.floor((timestamps[i].ts - now) / (1000 * 60) - h * 60), // Количество минут (без часов) до следующего timestamp
                        dayNow = new Date(now),

                        // открыто если следующая итерация не открытие
                        nowIsOpen = timestamps[i].type !== 'open';

                        //var d = dayOfYear(dayTs) - dayOfYear(dayNow);
                        //var d = dayInterval(dayTs, dayNow, nowIsOpen);
                        var d = dayInterval(timestamps[i], dayNow);



                    // округляем минуты до кратных 5
                    m = Math.floor(m / 10) * 10 ? Math.floor(m / 10) * 10 : 5;

                    schedule.now.open = nowIsOpen;
                    schedule.now.lunch = !!(timestamps[i - 1] && timestamps[i - 1].type === 'lunch' || getArrayLast(timestamps).type === 'lunch');

                    schedule.will = {
                        willType: timestamps[i].type,
                        d: d,
                        h: h,
                        m: m
                    };

                    // Когда закроется или откроется
                    var willWhen = new Date(timestamps[i].ts);
                    schedule.will.when = whenOpenInverse(h, d, willWhen.getDay());


                    var willTill = new Date(timestamps[i].ts),
                        strHours = willTill.getHours(),
                        strMinutes = willTill.getMinutes();

                    if (strHours < 10) { strHours = '0' + strHours; }
                    if (strMinutes < 10) { strMinutes = '0' + strMinutes; }

                    schedule.will.till = strHours+':'+strMinutes;
                }
            }

            if (!today) {
                return; // На сегодня расписания нет - сейчас закрыто
            }

            timePoints = pluck(getSortedTimePoints(today), 'time');

            // Цикл по периодам работы за день
            for (i = 2 ; i < timePoints.length ; i = i + 2) {
                periods.push({ from: timePoints[i - 1], to: timePoints[i] });
            }

            from = formatTime(timePoints[0]);
            to = formatTime(timePoints[timePoints.length - 1]);

            if (from === to) { // Круглосуточно
                schedule.today = {
                    alltime: true,
                    alltimeStr: t(localLang, 'worksAroundTheClock'),
                    from: '00:00',
                    to: '24:00'
                };
            } else { // От from до to
                schedule.today = {
                    from: from,
                    to: to
                };
            }

            if (periods.length > 0) { // Перерывы на обед
                schedule.lunch = periods;
                schedule.lunchStr = t(localLang, 'lunch');
            }
        }

        // Формирование объекта-таблицы-расписания для шаблона
        function makeTable() {
            var column = [],
                hasLunch = false;

            for (var j = 0 ; j < 7 ; j++) {
                var dayKey = weekKeys[j],
                    lunchMaxLength = 0;

                column[j] = {};

                if (model[dayKey]) {
                    var day = model[dayKey],
                        timePoints = pluck(getSortedTimePoints(day), 'time'),
                        lunch = []; // Отрезки времени (отсортированные моменты) на обеды

                    // Цикл по периодам работы за день
                    for (var i = 2 ; i < timePoints.length ; i = i + 2) {
                        hasLunch = true;
                        lunch.push({ from: timePoints[i - 1], to: timePoints[i] });
                    }
                    lunchMaxLength = Math.max(timePoints.length / 2, lunchMaxLength);

                    column[j] = {
                        from: formatTime(timePoints[0]),
                        to: formatTime(timePoints[timePoints.length - 1]),
                        lunch: lunch
                    };
                }

                if (dayKey === todayKey) { // Сегодняшний день надо подсветить
                    column[j].active = true;
                }

                column[j].key = weekKeysLocal[j];
            }

            // Дополнение пустыми объектами массивов lunch
            column.forEach( function (col) {
                if (col.lunch) {
                    fillDefaults(col.lunch, range(1, lunchMaxLength));
                }
            });

            return {
                table: column,
                hasLunch: hasLunch
            };
        }

        // Сгенерировать строку для всех дней model, совпадающих с day
        function makeSimpleString(day, model) {
            var points,
                out = {
                    dayList: [],
                    lunch: []
                },
                lunchesTime = [];

            if (day && day.working_hours && day.working_hours.length) {
                points = pluck(getSortedTimePoints(day), 'time');
                points.forEach( function (point, key) {
                    if (key === 0) {
                        out.from = formatTime(point);
                    } else if (key === points.length - 1) {
                        out.to = formatTime(point);
                    } else {
                        lunchesTime.push(formatTime(point));
                    }
                });
                for (var i = 0; i < lunchesTime.length; i += 2) {
                    out.lunch.push({
                        from: lunchesTime[i],
                        to: lunchesTime[i + 1],
                        lunchStr: capitaliseFirstLetter(t(localLang, 'lunch'))
                    });
                }

                if (out.from == '00:00' && out.to == '00:00') {
                    out.to = '24:00';
                }

                if (day.round_the_clock) {
                    out.alltime = true;
                    out.alltimeStr = t(localLang, 'worksAroundTheClock');
                }
            } else { // Выходной
                out.holiday = true;
            }

            // Формируем список дней на локальном языке
            var groupWorkingDays = [0, 0, 0, 0, 0, 0, 0]; // Флаги работы фирмы в дни текущей группы
            var flow = 0;

            weekKeys.forEach( function (dayKey, numKey) { // 'Mon', 0
                if (isEqual(model[dayKey], day) || (!model[dayKey] && day === null)) {
                    out.dayList.push(weekFullKeysLocal[numKey]);
                    groupWorkingDays[dayNum(numKey + firstdayOffset)] = 1;
                    flow++;
                } else {
                    if (flow > 2) { // Более 2 дней подряд
                        var lastDay = out.dayList.pop();

                        for (var i = 1 ; i < flow - 1 ; i++) {
                            out.dayList.pop();
                        }

                        out.dayList[out.dayList.length - 1] += ' — ' + lastDay;
                    }

                    flow = 0;
                }
            });

            // Список дней в данной группе идентичен списку будних дней, значит можно заменить словом "Будни"
            out.budni = isEqual(localWorkingDays, groupWorkingDays);
            // Список рабочих дней - все дни недели, значит нужно выводить фразу "Ежедневно"
            out.everyday = ( Math.min.apply(Math, groupWorkingDays) === 1 );

            if ( out.holiday ) { out.holidayStr = t(localLang, 'restDay', out.dayList.length).slice(2); }

            // Делаем из массива строку и поднимаем первый символ
            out.dayList = out.dayList.join(', ');
            out.dayList = out.dayList.charAt(0).toUpperCase() + out.dayList.slice(1);


            return out;
        }

        // Возвращает массив simple строк на основе массива дней days
        function makeAdvancedString(days, model) {
            var out = [];

            for (var i = days.length - 1 ; i >= 0 ; i--) {
                out.push(makeSimpleString(days[i], model));
            }

            return out;
        }

        // Заполняем названия дней недели, 1 - понедельник. В заполненных массивах понедельник это 0

        for (var i = 0 ; i < 7 ; i++) {
            weekKeys[i] = weekKeysShort[i];
            weekKeysLocal[i] = this.dict.t(localLang, weekKeysShort[i].toLowerCase());
            weekFullKeysLocal[i] = this.dict.t(localLang, weekKeysFull[i]);
        }

        // Вычисляем сегодняшний день недели (ссылку на объект дня в модели)
        todayKey = weekKeysShort[dayNum(new Date(now).getDay() - firstdayOffset)];
        today = model[todayKey]; // Объект расписания - текущий день недели
        setTodayString(today); // Сделать объект для шаблона - строка, которая описывает время работы сегодня

        // Находим количество разных расписаний и сохраняем их в массив
        var apiDifferentDays = [], // Массив различающихся дней из модели
            apiScheduleDaysCount = 0, // Количество описанных дней в расписании модели
            apiDifferentDaysCount = 0, // Количество разных дней в расписании модели
            differentWorkingHoursCount = []; // Количество рабочих часов в разных днях

        Object.keys(model).forEach( function(day) {
            if (model[day] && model[day].working_hours) { // Проверяем что это день, а не комментарий или что-то ещё
                apiScheduleDaysCount++;
                if (!isEqual(model[day], getArrayLast(apiDifferentDays))) {
                    apiDifferentDays.push(model[day]);
                }
            }
        });

        apiDifferentDaysCount = apiDifferentDays.length;
        // Если не все дни описаны в модели, значит есть ещё один тип дней - выходной (отсутствущий в модели)
        if (apiScheduleDaysCount < 7) {
            apiDifferentDaysCount++;
        }

        // Если разных более 2, то упростить не получится - делаем таблицу
        if (apiDifferentDaysCount > 2) {
            schedule.week = makeTable(model);
        } else { // Иначе, составляем комментарий из двух строк

            // Случай, когда все одинаковые
            if (apiDifferentDaysCount === 1) {
                schedule.week = {
                    evently: [makeSimpleString(model[weekKeys[0]], model)]
                };
            } else { // Остаётся случай, когда есть два типа дней
                // Определяем день с наибольшим количеством рабочих часов из числа разных дней
                for (i = 0 ; i < apiDifferentDaysCount ; i++) {
                    differentWorkingHoursCount[i] = 0;

                    if (apiDifferentDays[i]) {
                        var points = pluck(getSortedTimePoints(apiDifferentDays[i]), 'time');

                        for (var j = 0 ; j < points.length ; j = j + 2) {
                            var hours = (getHours(points[j + 1]) + getMinutes(points[j + 1]) / 60) - (getHours(points[j]) + getMinutes(points[j]) / 60);
                            differentWorkingHoursCount[i] += hours;
                        }
                    } else { // Выходной
                        apiDifferentDays[i] = null;
                    }
                }

                var apiSortedDifferentDays = sortBy(apiDifferentDays, function (day, key) {
                    return differentWorkingHoursCount[key];
                });

                schedule.week = {
                    evently: makeAdvancedString(apiSortedDifferentDays, model)
                };
            }
        }

        schedule.comment = model.comment;
        if (schedule.week && schedule.week.evently && schedule.week.evently.length === 1) {
            schedule.everyday = schedule.week.evently[0].everyday;
        }
        return schedule;
    },

    forecast: function (schedule, params) {
        var interval = '',
        open,
        today = {},
        nowText,
        maxHours = params && params.maxHours || 1;

        if (!schedule) {
            return {};
        }

        if (schedule.always) { // Круглосуточно ежедневно - более ничего выводить не нужно
            return {
                today: {
                    text: this.dict.t(this.localLang, 'aroundTheClock')
                },
                open: true
            };
        }

        // Формируем строку - через сколько произойдёт следующая инверсия открытости
        if (schedule.will && schedule.will.h < maxHours) {
            if (schedule.will.h) {
                interval += this.dict.t(this.localLang, 'nHours', schedule.will.h) + ' ';
            }

            if (schedule.will.m) {
                interval += this.dict.t(this.localLang, 'nMins', schedule.will.m);
            }
        }

        // Данные на сегодня
        if (schedule.today) {
            today.text = this.dict.t(this.localLang, 'today');
            if (schedule.everyday) {
                today.text = this.dict.t(this.localLang, 'everyday');
            }
            today.from = schedule.today.from;
            today.to = schedule.today.to;
            today.lunch = schedule.lunch;
            if (today.lunch) {
                today.lunchStr = this.dict.t(this.localLang, 'lunch');
            }
        } else {
            today.text = this.dict.t(this.localLang, 'todayIsRestDay');
        }

        // Текущий статус и прогноз
        if (schedule.always) { // Если круглосуточно, ничего кроме "Круглосуточно" выводить не нужно
            today.text = this.dict.t(this.localLang, 'aroundTheClock');
            open = true;
        } else if (schedule.now) {
            open = schedule.now.open;
            if (open) { // открыто
                if (schedule.will && schedule.will.willType === 'lunch') {
                    // далее - закрытие на обед
                    if (schedule.will && schedule.will.h < maxHours) {
                        // менее maxHours до закрытия  на обед
                        nowText = this.dict.t(this.localLang, '_in') + ' ' + this.dict.t(this.localLang, 'nMins', interval) + this.dict.t(this.localLang, 'isClosingOnDinner');
                    } else {
                        // больше maxHours до закрытия  на обед
                        nowText = this.dict.t(this.localLang, 'isOpen');
                    }

                } else {
                    // далее просто закрытие
                    if (schedule.will.h < maxHours) {
                        // менее maxHours до закрытия просто
                        nowText = this.dict.t(this.localLang, 'closeIn') + this.dict.t(this.localLang, 'nMins', interval);
                    } else {
                        // больше maxHours до закрытия просто
                        nowText = this.dict.t(this.localLang, 'isOpen');
                    }
                }
            } else { // закрыто
                if (schedule.will && schedule.will.when) {
                    // откроется не сегодня
                    nowText = this.dict.t(this.localLang, 'open') + schedule.will.when;
                } else {
                    // откроется сегодня
                    if (schedule.now && schedule.now.lunch) {
                        // сейчас обед
                        if (schedule.will.h < maxHours) {
                            // менее maxHours до открытия с обеда
                            nowText = this.dict.t(this.localLang, 'Lunch') + this.dict.t(this.localLang, 'openIn') + this.dict.t(this.localLang, 'nMins', interval);
                        } else {
                            // больше maxHours до открытия с обеда
                            nowText = this.dict.t(this.localLang, 'Lunch') + this.dict.t(this.localLang, 'openAt') + schedule.will.till;
                        }
                    } else {
                        // просто закрыто
                        if (schedule.will && schedule.will.h < maxHours) {
                            // менее maxHours до открытия просто
                            nowText = this.dict.t(this.localLang, 'openIn') + this.dict.t(this.localLang, 'nMins', interval);
                        } else {
                            // больше maxHours до открытия просто
                            nowText = this.dict.t(this.localLang, 'openAt') + schedule.will.till;
                        }
                    }
                }
            }
        }

        return {
            today: today,
            now: nowText,
            open: open,
            week: schedule.week,
            comment: schedule.comment,
            everyday: schedule.everyday
        };
    }
};
