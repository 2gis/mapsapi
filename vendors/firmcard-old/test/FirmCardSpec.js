function mockTime(now) { // +7 - Novosibirsk
    var timestamp = now.getTime() + (7 + new Date().getTimezoneOffset() / 60) * 60 * 60 * 1000;
    now.setTime(timestamp);
    return now;
}

describe("FirmCard", function() { // 6

	describe("#getContainer", function() {
		
		// check return value

	});

	describe("#getId", function() {

		// check return value

	});

	describe("#toggle", function() {

		// check collapse
		// check expand

	});

	describe("#setOPtions", function() {

		// Give undefined|false|null|{}|""
		// Give correct value and check static properties in FirmCard

	});

	describe("Schedule", function() { // 23
		var schedule;

		beforeEach(function() {
			schedule = new Schedule();
		});

		afterEach(function() {
			schedule = null;
		});

		describe("#groupWorkingHours", function() {

			//Schedule.groupWorkingHours(undefined|{}|null|"") -> ?
			it("Некорректные входные данные", function() {
				var result = schedule.parseWorkingHours();

				expect(result.allTable).to.not.be.ok();
				expect(result.aroundTheClock).to.not.be.ok();
				expect(result.daily).to.not.be.ok();
				expect(result.byPeriods).to.not.be.ok();
				expect(result.anyLunchExists).to.not.be.ok();
				expect(result.allTable).to.not.be.ok();
				expect(result.isOpened).to.not.be.ok();
				expect(result.timeToClose).to.not.be.ok();
				expect(result.timeToLunchBegin).to.not.be.ok();
				expect(result.timeToLunchEnd).to.not.be.ok();
				expect(result.timeToOpen).to.not.be.ok();
				expect(result.todayWorkhours).to.not.be.ok();
				expect(result.weekDayStr).to.not.be.ok();
			});
			
			//Give Mon-Fri 10-18 and weekends
			it("Будни одинаково, выходные выходные", function() {
				var result = schedule.parseWorkingHours(firmWorkingDaysMock.whs, mockTime(new Date(2013, 6, 31, 10, 20, 0))),
					workingDays = {
					daysCount: 5,
					firstDay: "Mon",
					isRestDay: false,
					lastDay: "Fri",
					lunchFrom: false,
					lunchTo: false,
					workFrom: "10:00",
					workTo: "18:00",
					workingDays: true
				},
				weekends = {
					daysCount: 2,
					firstDay: "Sat",
					isRestDay: true,
					lastDay: "Sun",
					lunchFrom: false,
					lunchTo: false,
					workFrom: false,
					workTo: false,
					workingDays: false,
				},
				todayWorkhours = {
					isRestDay: false,
					lunchFrom: false,
					lunchTo: false,
					workFrom: "10:00",
					workTo: "18:00"
				};
				console.log("111", result)
				expect(result.allTable).to.not.be.ok();
				expect(result.aroundTheClock).to.not.be.ok();
				expect(result.daily).to.not.be.ok();
				expect(result.byPeriods).to.have.length(2);

				expect(result.byPeriods[0]).to.eql(workingDays);

				expect(result.byPeriods[1]).to.eql(weekends);
				expect(result.anyLunchExists).to.not.be.ok();
				expect(result.allTable).to.not.be.ok();
				expect(result.isOpened).to.not.be.ok();
				expect(result.timeToClose).to.not.be.ok();
				expect(result.timeToLunchBegin).to.not.be.ok();
				expect(result.timeToLunchEnd).to.not.be.ok();
				expect(result.timeToOpen).to.not.be.ok();

				expect(result.todayWorkhours).to.eql(todayWorkhours);
				expect(result.weekDayStr).to.be('Wed');
			});
			
			//Give Mon-Sun 10-18
			/*it("Все дни рабочие одинаковые", function() {
				var result = schedule.parseWorkingHours(firmFullWeekMock.whs, mockTime(new Date())),
					daily = {
						isRestDay: false,
						lunchFrom: false,
						lunchTo: false,
						workFrom: "10:00",
						workTo: "18:00"
					};

				expect(result.allTable).to.not.be.ok();
				expect(result.aroundTheClock).to.not.be.ok();
				expect(result.anyLunchExists).to.not.be.ok();
				expect(result.byPeriods).to.not.be.ok();
				expect(result.isLunchNow).to.not.be.ok();
				expect(result.isOpened).to.not.be.ok();
				expect(result.nextWorkDay).to.not.be.ok();
				expect(result.timeToLunchBegin).to.not.be.ok();
				expect(result.timeToLunchEnd).to.not.be.ok();
				expect(result.timeToOpen).to.not.be.ok();
				expect(result.weekDayStr).to.be('Wed');
				expect(result.todayWorkhours).to.eql(daily);
				expect(result.daily).to.eql(daily);

			});

			it("Будни одинаково, суббота сокращённо", function() {
				var result = schedule.parseWorkingHours(firmReducedSaturdayMock.whs, mockTime(new Date())),
					todayWorkhours = {
						isRestDay: false,
						lunchFrom: false,
						lunchTo: false,
						workFrom: "10:00",
						workTo: "18:00"
					},
					byPeriods = [
						{
							daysCount: 5,
							firstDay: "Mon",
							isRestDay: false,
							lastDay: "Fri",
							lunchFrom: false,
							lunchTo: false,
							workFrom: "10:00",
							workTo: "18:00",
							workingDays: true,
						},
						{
							daysCount: 1,
							firstDay: "Sat",
							isRestDay: false,
							lunchFrom: false,
							lunchTo: false,
							workFrom: "10:00",
							workTo: "17:00",
							workingDays: false
						},
						{
							daysCount: 1,
							firstDay: "Sun",
							isRestDay: true,
							lunchFrom: false,
							lunchTo: false,
							workFrom: false,
							workTo: false,
							workingDays: false
						}
					];


				expect(result.allTable).to.not.be.ok();
				expect(result.aroundTheClock).to.not.be.ok();
				expect(result.anyLunchExists).to.not.be.ok();
				expect(result.isLunchNow).to.not.be.ok();
				expect(result.isOpened).to.not.be.ok();
				expect(result.nextWorkDay).to.not.be.ok();
				expect(result.timeToLunchBegin).to.not.be.ok();
				expect(result.timeToLunchEnd).to.not.be.ok();
				expect(result.timeToOpen).to.not.be.ok();
				expect(result.timeToClose).to.not.be.ok();
				expect(result.weekDayStr).to.be('Wed');
				expect(result.byPeriods).to.eql(byPeriods);
				expect(result.todayWorkhours).to.eql(todayWorkhours);

			});

			it('Круглосуточно без выходных', function() {
				var result = schedule.parseWorkingHours(firmAllDayMock.whs, mockTime(new Date())),
					daily = {
						isRestDay: false,
						lunchFrom: false,
						lunchTo: false,
						workFrom: "00:00",
						workTo: "00:00"
					};

				expect(result.allTable).to.not.be.ok();
				expect(result.aroundTheClock).to.not.be.ok();
				expect(result.anyLunchExists).to.not.be.ok();
				expect(result.byPeriods).to.not.be.ok();
				expect(result.isLunchNow).to.not.be.ok();
				expect(result.isOpened).to.not.be.ok();
				expect(result.nextWorkDay).to.not.be.ok();
				expect(result.timeToLunchBegin).to.not.be.ok();
				expect(result.timeToLunchEnd).to.not.be.ok();
				expect(result.timeToOpen).to.not.be.ok();
				expect(result.timeToClose).to.not.be.ok();
				expect(result.weekDayStr).to.be('Wed');
				expect(result.todayWorkhours).to.eql(daily);
				expect(result.daily).to.eql(daily);
			});

			it('Круглосуточно кроме выходных четверга и субботы', function() {
				var result = schedule.parseWorkingHours(firmWithoutThuSatMock.whs, mockTime(new Date())),
					allTable = [ 
						{ 
							workFrom: '00:00',
							workTo: '00:00',
							lunchFrom: false,
							lunchTo: false,
							isRestDay: false,
							firstDay: 'Mon' 
					    },
					    {
					    	workFrom: '00:00',
							workTo: '00:00',
							lunchFrom: false,
							lunchTo: false,
							isRestDay: false,
							firstDay: 'Tue' 
					    },
					    { 
							workFrom: '00:00',
							workTo: '00:00',
							lunchFrom: false,
							lunchTo: false,
							isRestDay: false,
							firstDay: 'Wed' 
					    },
						{ 
							workFrom: false,
							workTo: false,
							lunchFrom: false,
							lunchTo: false,
							isRestDay: true,
							firstDay: 'Thu' 
						},
						{ 
							workFrom: '00:00',
							workTo: '00:00',
							lunchFrom: false,
							lunchTo: false,
							isRestDay: false,
							firstDay: 'Fri' 
						},
						{ 
							workFrom: false,
							workTo: false,
							lunchFrom: false,
							lunchTo: false,
							isRestDay: true,
							firstDay: 'Sat' 
						},
						{ 
							workFrom: '00:00',
							workTo: '00:00',
							lunchFrom: false,
							lunchTo: false,
							isRestDay: false,
							firstDay: 'Sun' 
						} 
					],
					todayWorkhours = {
						workFrom: '00:00',
						workTo: '00:00',
						lunchFrom: false,
						lunchTo: false,
						isRestDay: false
					};

				expect(result.todayWorkhours).to.eql(todayWorkhours);
				expect(result.allTable).to.eql(allTable);
				expect(result.aroundTheClock).to.not.be.ok();
				expect(result.anyLunchExists).to.not.be.ok();
				expect(result.byPeriods).to.not.be.ok();
				expect(result.daily).to.not.be.ok();
				expect(result.isLunchNow).to.not.be.ok();
				expect(result.isOpened).to.not.be.ok();
				expect(result.nextWorkDay).to.not.be.ok();
				expect(result.timeToLunchBegin).to.not.be.ok();
				expect(result.timeToLunchEnd).to.not.be.ok();
				expect(result.timeToOpen).to.not.be.ok();
				expect(result.timeToClose).to.not.be.ok();
				expect(result.weekDayStr).to.be('Wed');
			});

			 it('Среда-пятница', function() {
			 	var result = schedule.parseWorkingHours(firmWedThuFriMock.whs, mockTime(new Date())),
			 		mock = { 
						aroundTheClock: false,
						daily: false,
						byPeriods: 
						[ 
							{ 
								workFrom: false,
								workTo: false,
								lunchFrom: false,
								lunchTo: false,
								isRestDay: true,
								daysCount: 2,
								workingDays: false,
								firstDay: 'Mon',
								lastDay: 'Tue' 
							},
							{ 
								workFrom: '00:00',
								workTo: '23:00',
								lunchFrom: false,
								lunchTo: false,
								isRestDay: false,
								daysCount: 3,
								workingDays: false,
								firstDay: 'Wed',
								lastDay: 'Fri' 
							},
							{ 
								workFrom: false,
								workTo: false,
								lunchFrom: false,
								lunchTo: false,
								isRestDay: true,
								daysCount: 2,
								workingDays: false,
								firstDay: 'Sat',
								lastDay: 'Sun' 
							}
						],
						allTable: false,
						anyLunchExists: false,
						isOpened: false,
						timeToOpen: false,
						timeToClose: false,
						timeToLunchBegin: false,
						timeToLunchEnd: false,
						nextWorkDay: false,
						todayWorkhours: 
						{ 
							workFrom: '00:00',
							workTo: '23:00',
							lunchFrom: false,
							lunchTo: false,
							isRestDay: false 
						},
						weekDayStr: 'Wed',
						isLunchNow: false 
					};
			 	console.log(result);

			 	expect(result).to.eql(mock);
			 });

			it('Работает только в воскресенье с обедом', function() {
				//firmSunWithDinnerMock
				var result = schedule.parseWorkingHours(firmWedThuFriMock.whs, mockTime(new Date())),
					mock = {};
				console.log(result)
			});*/
		});

		describe("#getFlampUrl", function() {

			//Give id and receive URL with this id

		});

		describe("#parsePeriods", function() {
			//Schedule.parsePeriods(undefined, undefined|{}, {}|null,null|"","")
			// Give 1 period
				// Mon-Sun
					//around clock
					//not around clock
			//Give 2-3 periods
			//Give 4 periods
		});

		describe("#msgU", function() {

			// schedule.msgU(undefined|{}|null|"")
			// Give correct string

		});

		describe("#msg", function() {

			// schedule.msg(undefined|{}|null|"")
			// Give correct string

		});

		describe("#set", function() {

			// schedule.set(undefined|{}|null|"")
			// Give correct key and value

		});

		describe("#get", function() {

			// schedule.get(undefined|{}|null|"")
			// Give correct string key

		});

		describe("#setSchedule", function() {

			// schedule.setSchedule(undefined|{}|null|"")
			// Give correct object

		});

		describe("#getSchedule", function() {

			// check return value

		});
	});

	describe("TranslateHelper", function() { // 24
		describe("#getWeek", function() {

			// check return value

		});

		describe("#getWeekDayNum", function() {

			// TranslateHelper.getWeekDayNum(undefined|null|{}|"")
			// Pass correct value
				// 0
				// 5

		});

		describe("#getTodayWorkingHours", function() {

			// Give undefined|{}|null|""
			// Give workingHours[weekDay] !== undefined
			// Give workingHours[weekDay] === undefined

		});

		describe("#setTimeStrInDate", function() {

			// Give undefined|null|{}|""
			// Give isShiftDay === true
			// Give isShiftDay !== true
			// Give correct value

		});

		describe("#isNextWorkPeriodExists", function() {

			// Give undefined|null|{}|""
			// Give !matches
			// Give correct data

		});

		describe("#getNextWorkDay", function() {

			// Give undefined|null|{}|""
			// Give + + + + + + + Mon
			// Give + + + + + + - Sun
			// Give + + + + + - - Fri
			// Give - + + + + + - Sat
			// Give + + - - - - - Tue
			// Give - - + - - - - Wed

		});

		describe("#convertWorkingHours", function() {

			// Give false|undefined|null|{}|""
			// Give with WH1
			// Give with WH0

		});
	});

	describe("ForecastHelper", function() { // 37
		describe("#getForecastData", function() {

			// Give undefined|false|null|{}|""
			// Give timeToEnd <= 0
				// Give timeToBegin > 0
					// Give num > 0
					// Give num <= 0
				// Give timeToBegin <= 0
					// Give isNextWorkPeriodExists == true
					// Give isNextWorkPeriodExists == false
			// Give timeToEnd > 0

		});

		describe("#chooseScheduleHintMsgs", function() {

			// Give undefined|null|false|{}|""
			// Give isLunchNow == true
			// Give isLunchNow == false
			// Give isOpened == true
			// Give isOpened == false
			// Give timeToClose == true
				// Give minutesToClose <= 60
					// Give minutesToClose > 55
						// Give minutesToCloseLess <= 60
						// Give minutesToCloseLess > 60
					// Give minutesToClose <= 55
						// Give minutesToCloseLess < 15
							// Give timeToLunchBegin == true
							// Give timeToLunchBegin == false
						// Give minutesToCloseLess >= 15
				// Give minutesToClose > 60

			// Give timeToClose == false
			// Give timeToOpen == true
				// Give minutesToOpen < 60 && timeToLunchEnd == false && minutesToOpen >= 120
				// Give minutesToOpen >= 60 && timeToLunchEnd == true && minutesToOpen >= 120
				// Give minutesToOpen >= 60 && timeToLunchEnd == false && minutesToOpen < 120
					// Give minutesToOpen == 60
					// Give minutesToOpen != 60
						// Give timeToLunchEnd && minutesToOpen > 60
						// Give (timeToLunchEnd && minutesToOpen > 60) == false
			// Give timeToOpen == false
			// Give nextWorkDay == true
			// Give nextWorkDay == false
		});
	});

	describe("FirmCardEventListener", function() { // 4
		describe("#add", function() {

			// undefined|null|false|{}|""
			// correct data

		});

		describe("#remove", function() {

			// undefined|null|false|{}|""
			// correct id

		});
	});
});

// Total: FirmCard (6) + Schedule (23) + TranslateHelper (24) + ForecastHelper (37) + FirmCardEventListener (4) = 94 
