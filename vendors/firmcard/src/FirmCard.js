function FirmCard() {
    this.apiLang = 'en',
    this.localLang = 'ru',
    this.localWorkingDays = [ 0, 1, 1, 1, 1, 1, 0 ], // Рабочие дни в данной стране
    this.firstdayOffset = 1, // 0-6
    this.minHoursToDisplayClosure = 4; // Число часов, меньше которого появляется строка "закроется через 2 часа..."

    return this;
}
