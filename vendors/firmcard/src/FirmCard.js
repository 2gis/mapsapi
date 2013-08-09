function FirmCard(options) {
    var options = options || {};

    this.apiLang = options.apiLang || 'en';
    this.localLang = options.localLang || 'ru';
    this.localWorkingDays = options.localWorkingDays || [0, 1, 1, 1, 1, 1, 0];
    this.firstdayOffset = options.firstdayOffset || 1;
    this.minHoursToDisplayClosure = options.minHoursToDisplayClosure || 4;

    this.t = options.t || function(){};

    return this;
}
