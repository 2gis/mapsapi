describe('Расписание работы организации', function() {

    function mockTime(timestamp) {
        return timestamp + (7 + new Date().getTimezoneOffset() / 60) * 60 * 60 * 1000;
    }
    var d = new FirmCard({
        id: "141265770546806_f1i6jh2909H3J1HB2c99uvDn5A711J34b6324428576B971Bc1h619G4AJ0I79810",
        /*name: "Азимут Оптика, сеть салонов"*/
    }, {
        localLang: 'ru'
    });

    it('!model', function() {
        var result =  d.getSchedule().transform();

        expect(result).to.not.be.ok();
    });

    it('!params', function() {
        var result =  d.getSchedule().transform(scheduleDemoData['default'].model);

        expect(result).to.be.ok();
        expect(result.everyday).to.not.be.ok();

    });

    it('Comment', function() {
        var result =  d.getSchedule().transform({
            comment: 'comment'
        });

        expect(result.comment).to.be('comment');
        expect(result.everyday).to.be.ok(); // Ежедневно закрыто, Ха!

    });

    it('Будни одинаково, выходные выходные', function() {
        var result =  d.getSchedule().transform(scheduleDemoData['default'].model, {
            now: mockTime(1366610753162), 
            
        }); // 13:06 пн 22 апреля 2013

        expect(result.now.open).to.be.ok();
        expect(result.will.d).to.be(0);
        expect(result.will.h).to.be(4);
        expect(result.will.m).to.be(50);
        expect(result.will.till).to.be('18:00');
        expect(result.today.from).to.be('10:00');
        expect(result.today.to).to.be('18:00');
        expect(result.week.evently[0].dayList).to.be('Понедельник&ndash;пятница');
        expect(result.week.evently[0].budni).to.be.ok();
        expect(result.week.evently[0].everyday).to.not.be.ok();
        expect(result.week.evently[1].dayList).to.be('Суббота, воскресенье');
        expect(result.week.evently[1].budni).to.not.be.ok();
        expect(result.week.evently[1].everyday).to.not.be.ok();
        expect(result.everyday).to.not.be.ok();

    });

    it('Будни одинаково, выходные выходные, до нуля', function() {
        var result =  d.getSchedule().transform(scheduleDemoData.evently.model, {
            now: mockTime(1366610753162)
        }); // 13:06 пн 22 апреля 2013


        expect(result.now.open).to.be.ok();
        expect(result.will.d).to.be(1);
        expect(result.will.h).to.be(10);
        expect(result.will.m).to.be(50);
        expect(result.will.till).to.be('00:00');
        expect(result.today.from).to.be('10:00');
        expect(result.today.to).to.be('00:00');
        expect(result.week.evently[0].dayList).to.be('Понедельник&ndash;пятница');
        expect(result.week.evently[0].budni).to.be.ok();
        expect(result.week.evently[0].holiday).to.not.be.ok();
        expect(result.week.evently[0].everyday).to.not.be.ok();
        expect(result.week.evently[1].dayList).to.be('Суббота, воскресенье');
        expect(result.week.evently[1].budni).to.not.be.ok();
        expect(result.week.evently[1].holiday).to.be.ok();
        expect(result.week.evently[1].everyday).to.not.be.ok();
        expect(result.everyday).to.not.be.ok();

    });

    it('Будни одинаково, суббота сокращённо', function() {
        var result =  d.getSchedule().transform(scheduleDemoData.eventlySat.model, {
            now: mockTime(1366610753162)
        }); // 13:06 пн 22 апреля 2013

        expect(result.now.open).to.be.ok();
        expect(result.will.d).to.be(0);
        expect(result.will.h).to.be(4);
        expect(result.will.m).to.be(50);
        expect(result.will.till).to.be('18:00');
        expect(result.today.from).to.be('10:00');
        expect(result.today.to).to.be('18:00');
        expect(result.week.evently).to.not.be.ok;
        expect(_.isEqual(result.week.table, [
            { from: '10:00', to: '18:00', lunch: [], active: true, key: 'пнд' },
            { from: '10:00', to: '18:00', lunch: [], key: 'втр' },
            { from: '10:00', to: '18:00', lunch: [], key: 'срд' },
            { from: '10:00', to: '18:00', lunch: [], key: 'чтв' },
            { from: '10:00', to: '18:00', lunch: [], key: 'птн' },
            { from: '10:00', to: '17:00', lunch: [], key: 'сбт' },
            { key: 'вск' }
        ])).to.be.ok;
        expect(result.everyday).to.not.be.ok();

    });

    it('Будни одинаково, суббота сокращённо, максимум часов в субботу', function() {
        var result =  d.getSchedule().transform(scheduleDemoData.eventlySatMax.model, {
            now: mockTime(1366610753162)
        }); // 13:06 пн 22 апреля 2013

        expect(result.now.open).to.be.ok();
        expect(result.will.d).to.be(0);
        expect(result.will.h).to.be(4);
        expect(result.will.m).to.be(50);
        expect(result.will.till).to.be('18:00');
        expect(result.today.from).to.be('10:00');
        expect(result.today.to).to.be('18:00');
        expect(result.week.evently).to.not.be.ok;
        expect(_.isEqual(result.week.table, [
            { from: '10:00', to: '18:00', lunch: [], active: true, key: 'пнд' },
            { from: '10:00', to: '18:00', lunch: [], key: 'втр' },
            { from: '10:00', to: '18:00', lunch: [], key: 'срд' },
            { from: '10:00', to: '18:00', lunch: [], key: 'чтв' },
            { from: '10:00', to: '18:00', lunch: [], key: 'птн' },
            { from: '10:00', to: '19:00', lunch: [], key: 'сбт' },
            { key: 'вск' }
        ])).to.be.ok;
        expect(result.everyday).to.not.be.ok();
    });

    it('Круглосуточно без выходных', function() {
        var result =  d.getSchedule().transform(scheduleDemoData.alltime.model, {
            now: mockTime(1366610753162)
        }); // 13:06 пн 22 апреля 2013

        expect(result.now.open).to.be.ok();
        expect(result.always).to.be.ok();
        expect(result.today.alltime).to.be.ok();
        expect(result.will).to.not.be.ok();
        expect(result.week.hasLunch).to.not.be.ok();
        expect(result.week.evently[0].dayList).to.be('Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
        expect(result.week.evently[0].alltime).to.be.ok();
        expect(result.week.evently[0].budni).to.not.be.ok();
        expect(result.week.evently[0].everyday).to.be.ok();
        expect(result.everyday).to.be.ok();

    });

    it('Круглосуточно кроме выходных среды и воскресенья', function() {
        var result =  d.getSchedule().transform(scheduleDemoData.thuHol.model, {
            now: mockTime(1366610753162)
        }); // 13:06 пн 22 апреля 2013

        expect(result.now.open).to.be.ok();
        expect(result.always).to.be(undefined);
        expect(result.today.alltime).to.be.ok();
        expect(result.will.d).to.be(3);
        expect(result.will.h).to.be(58);
        expect(result.will.m).to.be(50);
        expect(result.will.till).to.be('00:00');
        expect(result.week.hasLunch).to.not.be.ok();
        expect(result.week.evently[0].dayList).to.be('Понедельник&ndash;среда, пятница, суббота');
        expect(result.week.evently[0].alltime).to.be.ok();
        expect(result.week.evently[0].budni).to.not.be.ok();
        expect(result.week.evently[0].everyday).to.not.be.ok();
        expect(result.week.evently[1].dayList).to.be('Четверг, воскресенье');
        expect(result.week.evently[1].alltime).to.not.be.ok();
        expect(result.week.evently[1].budni).to.not.be.ok();
        expect(result.week.evently[1].everyday).to.not.be.ok();
        expect(result.everyday).to.not.be.ok();

    });

    it('Среда–пятница', function() {
        var result =  d.getSchedule().transform(scheduleDemoData.strangeWeek.model, {
            now: mockTime(1366610753162)
        }); // 13:06 пн 22 апреля 2013

        expect(result.now.open).to.not.be.ok();
        expect(result.always).to.be(undefined);
        expect(result.today).to.be(undefined);
        expect(result.will.d).to.be(2);
        expect(result.will.h).to.be(34);
        expect(result.will.m).to.be(50);
        expect(result.will.when).to.be('в среду');
        expect(result.will.till).to.be('00:00');
        expect(result.week.hasLunch).to.not.be.ok();
        expect(result.week.evently[0].dayList).to.be('Среда&ndash;пятница');
        expect(result.week.evently[0].alltime).to.be(undefined);
        expect(result.week.evently[0].everyday).to.not.be.ok();
        expect(result.week.evently[0].budni).to.not.be.ok();
        expect(result.week.evently[1].dayList).to.be('Понедельник, вторник, суббота, воскресенье');
        expect(result.week.evently[1].alltime).to.not.be.ok();
        expect(result.week.evently[1].everyday).to.not.be.ok();
        expect(result.week.evently[1].budni).to.not.be.ok();
        expect(result.everyday).to.not.be.ok();

    });

    it('Работает только в воскресенье с обедом', function() {
        var result =  d.getSchedule().transform(scheduleDemoData.periods3.model, {
            now: mockTime(1366610753162)
        }); // 13:06 пн 22 апреля 2013

        expect(result.now.open).to.not.be.ok();
        expect(result.always).to.be(undefined);
        expect(result.today).to.be(undefined);
        expect(result.will.d).to.be(6);
        expect(result.will.h).to.be(140);
        expect(result.will.m).to.be(50);
        expect(result.will.when).to.be('в воскресенье');
        expect(result.will.till).to.be('10:00');
        expect(result.week.hasLunch).to.not.be.ok();
        expect(result.week.evently[0].dayList).to.be('Воскресенье');
        expect(result.week.evently[0].alltime).to.be(undefined);
        expect(result.week.evently[0].everyday).to.not.be.ok();
        expect(result.week.evently[0].budni).to.not.be.ok();
        expect(result.week.evently[1].dayList).to.be('Понедельник&ndash;суббота');
        expect(result.week.evently[1].alltime).to.not.be.ok();
        expect(result.week.evently[1].everyday).to.not.be.ok();
        expect(result.week.evently[1].budni).to.not.be.ok();
        expect(result.everyday).to.not.be.ok();

    });

    it('Закроется через 1 минуту', function() {
        var result =  d.getSchedule().transform(scheduleDemoData.oneMinuteLeft.model, {
            now: mockTime(1366610753162)
        }); // 13:06 пн 22 апреля 2013

        expect(result.now.open).to.be.ok();
        expect(result.always).to.be(undefined);
        expect(result.today).to.be.ok();
        expect(result.will.d).to.be(0);
        expect(result.will.h).to.be(0);
        expect(result.will.m).to.be(5);

    });

    it('Сегодня уже закрыто, откроется через неделю', function() {
        var result =  d.getSchedule().transform(scheduleDemoData.foraWeek.model, {
            now: mockTime(1366610753162)
        }); // 13:06 пн 22 апреля 2013

        expect(result.now.open).to.not.be.ok();
        expect(result.always).to.be(undefined);
        expect(result.today).to.be.ok();
        expect(result.will.d).to.be(7);
        expect(result.will.h).to.be(165);
        expect(result.will.m).to.be(20);
        expect(result.everyday).to.not.be.ok();

    });

    it('Ещё закрыто, откроется через час с лишним', function() {
        var result =  d.getSchedule().transform(scheduleDemoData.tooEarly.model, {
            now: mockTime(1366773607003)
        }); // 10:20 ср 24 апреля 2013

        expect(result.now.open).to.not.be.ok();
        expect(result.always).to.be(undefined);
        expect(result.today).to.be.ok();
        expect(result.will.d).to.be(0);
        expect(result.will.h).to.be(1);
        expect(result.will.m).to.be(40);
        expect(result.will.when).to.be(undefined);
        expect(result.comment).to.ok("до последнего клиента");

    });

    it('Откроется завтра если сегодня воскресенье', function() { // Баг сбербанка
        var result =  d.getSchedule().transform(scheduleDemoData.sberBank.model, {
            now: mockTime(1367138129777)
        }); // Воскресенье, 28 апреля 2013

        expect(result.will.d).to.be(1);
        expect(result.will.when).to.be('завтра');
        expect(result.everyday).to.not.be.ok();

    });

    it('Ежедневно одинаково, откроется завтра', function() { // Баг с неправильной сортировкой timestamps
        var result =  d.getSchedule().transform(scheduleDemoData.everyday.model, {
            now: mockTime(1368015897543)
        }); // Среда, 8 мая 2013, 19+

        expect(result.will.d).to.be(1);
    });

    it('Timespamp совпадает с открытием – должен быть объект will', function() { // Баг с неправильной сортировкой timestamps
        var result =  d.getSchedule().transform(scheduleDemoData.everyday.model, {
            now: mockTime(1368015897543 + 52560000)
        }); // Точно совпадает с временем открытия

        expect(result.will).to.be.ok();
    });
});

describe("FirmCard", function() {

    it("#getId with firm object arg", function() {
        var firmCard = new FirmCard({
            id: "141265770546806_f1i6jh2909H3J1HB2c99uvDn5A711J34b6324428576B971Bc1h619G4AJ0I79810",
        });
        expect(firmCard.getId()).to.be.eql("141265770546806");
    });

    it("#getId with firm id arg", function() {

        var firmCard = new FirmCard("141265770546806", {
            ajax: sinon.spy(),
            render: sinon.spy(),
            tmpls: {
                loader: ''
            }
        });

       expect(firmCard.getId()).to.be.eql("141265770546806"); 

    });

    it("#getSchedule", function() {
        var firmCard = new FirmCard({
            id: "141265770546806_f1i6jh2909H3J1HB2c99uvDn5A711J34b6324428576B971Bc1h619G4AJ0I79810",
        });

        expect(firmCard.getSchedule()).to.be.a(FirmCard.Schedule);
    });

    it("#setLang", function() {
        var firmCard = new FirmCard({
            id: "141265770546806_f1i6jh2909H3J1HB2c99uvDn5A711J34b6324428576B971Bc1h619G4AJ0I79810",
            localLang: 'ru'
        });

        expect(firmCard.getSchedule().localLang).to.be.eql('ru');
        firmCard.setLang('en');
        expect(firmCard.getSchedule().localLang).to.be.eql('en');
    });

});