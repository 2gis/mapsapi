describe('DGFirmList', function () {
    var render, results, addFirms, alreadyInList, defaultFirm;
    beforeEach(function () {
        results =
        [{"id":"141265769760312_7f48jh2915H23H8he2g3uvDn5A6AG45842cB44287906231J5b6d19G4H3G38495","name":"Спарк-Авто, ООО","type":"filial","firm":{"id":"141274359477657","filials_count":3,"name":"Спарк-Авто, ООО"},"ads":{"warning":null,"micro_comment":"Оригинальные и дубликатные запчасти на авто европейского производства"},"rubrics":{"primary":[{"name":"Автозапчасти для иномарок"},{"name":"Автохимия / Масла"},{"name":"Автоаксессуары"}],"additional":[]}},{"id":"141265769349900_71B8jh2903H33H75e5BguvDn5A6AG45842cB4428379C231J546A19G4H3G28495","name":"Автозапчасти, ООО Невис ПТ","type":"filial","firm":{"id":"141274359268956","filials_count":1,"name":"Автозапчасти, ООО Невис ПТ"},"ads":null,"rubrics":{"primary":[{"name":"Автозапчасти для иномарок"},{"name":"Автоаксессуары"}],"additional":[]}},{"id":"141265769369916_77A8jh2919H43H6ee45BuvDn5A6AG4584AcB4428399C231J556719G4H3G28495","name":"Детская поликлиника, Детская городская клиническая больница №1, Отделение №2","type":"filial","firm":{"id":"141274359278970","filials_count":2,"name":"Детская поликлиника, Детская городская клиническая больница №1"},"ads":null,"rubrics":{"primary":[{"name":"Поликлиники детские"}],"additional":[]}},{"id":"141265770849956_7A88jh2959H53H78e9g9uvDn5A71G4584ecB4428879C231J5b6919G4H3G28495","name":"Магазин автозапчастей для Peugeot, Citroen, Fiat, ООО Меркурий Авто","type":"filial","firm":{"id":"141274359990712","filials_count":1,"name":"Магазин автозапчастей для Peugeot, Citroen, Fiat, ООО Меркурий Авто"},"ads":null,"rubrics":{"primary":[{"name":"Автозапчасти для иномарок"}],"additional":[]}}];
        addFirms = [{"id":"141265770537261_gb48jh2964H43HA6b42guvDn5A71G4584gh744285675535JA18g19G4H3G28816","name":"Семицветик, АНО, центр развития ребенка","type":"filial","firm":{"id":"141274359781129","filials_count":4,"name":"Семицветик, АНО, центр развития ребенка"},"ads":null,"rubrics":{"primary":[{"name":"Центры раннего развития / дошкольного образования детей"}],"additional":[]}},{"id":"141265771201116_eb4Cjh2919H53HA5b66guvDn5A72G45876g744282314535JA18g19G4H3G28816","name":"СибТайм, лингвистический центр","type":"filial","firm":{"id":"141274359311404","filials_count":4,"name":"СибТайм, лингвистический центр"},"ads":null,"rubrics":{"primary":[{"name":"Школы иностранных языков"}],"additional":[{"name":"Перевод с иностранных языков"},{"name":"Обучение за рубежом"}]}},{"id":"141265770296136_2b49jh2939H63H87beeguvDn5A71G458b87744282C64535J918g19G4H3G28816","name":"Пеликан, центр психолого-педагогической поддержки молодежи","type":"filial","firm":{"id":"141274359390966","filials_count":2,"name":"Пеликан, центр психолого-педагогической поддержки молодежи"},"ads":null,"rubrics":{"primary":[{"name":"Услуги психолога"}],"additional":[]}},{"id":"141265770029779_1b4hjh297CH73H95b6cguvDn5A71G4583A574428059A535J218g19G4H3G28816","name":"Следственный отдел по Кировскому району","type":"filial","firm":{"id":"141274359738445","filials_count":1,"name":"Следственный отдел по Кировскому району"},"ads":null,"rubrics":{"primary":[{"name":"Следственный комитет"}],"additional":[]}}];
        alreadyInList = [{"id":"141265769760312_7f48jh2915H23H8he2g3uvDn5A6AG45842cB44287906231J5b6d19G4H3G38495","name":"Спарк-Авто, ООО","type":"filial","firm":{"id":"141274359477657","filials_count":3,"name":"Спарк-Авто, ООО"},"ads":{"warning":null,"micro_comment":"Оригинальные и дубликатные запчасти на авто европейского производства"},"rubrics":{"primary":[{"name":"Автозапчасти для иномарок"},{"name":"Автохимия / Масла"},{"name":"Автоаксессуары"}],"additional":[]}}];
        defaultFirm = {"id":"141265769358463_1b4ijh2966H23H97b37guvDn5A6AG4589d9744283887535JB18g19G4H3G28816","name":"Железобетонспецстрой, ЗАО, строительная компания","type":"filial","firm":{"id":"141274359275268","filials_count":1,"name":"Железобетонспецстрой, ЗАО, строительная компания"},"ads":null,"rubrics":{"primary":[{"name":"Реконструкция и капремонт зданий"},{"name":"Промышленное строительство"},{"name":"Жилищное строительство"}],"additional":[]}};
    });

    afterEach(function () {
        results = addFirms = alreadyInList = defaultFirm = null;
    });

    describe('#should set correct default options:', function () {
        it("default container", function() {
            var firmList = new FirmCard.List(results, {});

            expect(firmList.getContainer().className).to.be('dg-building-callout__list');
        });

        it("default lang = ru", function() {
            var firmList = new FirmCard.List(results, {});

            expect(firmList.getLang()).to.be('ru');
        });
    })

    describe('#should manage FirmCards in correct way:', function () {
        it("render results and return FirmList container", function() {
            var customContainer = document.createElement('div'),
                firmList = new FirmCard.List(results, {container: customContainer});

            expect(customContainer.className).to.be('dg-building-callout__list');
            expect(customContainer.querySelectorAll('.dg-building-callout__list-item').length).to.be(4);
        });

        it("add firm", function() {
            var customContainer = document.createElement('div'),
                firmList = new FirmCard.List(results, {container: customContainer});
            firmList.addFirms(defaultFirm);
            firmList.renderList();

            expect(customContainer.querySelectorAll('.dg-building-callout__list-item').length).to.be(5);
        });

        it("add firms array", function() {
            var customContainer = document.createElement('div'),
                firmList = new FirmCard.List(results, {container: customContainer});
            firmList.addFirms(addFirms);
            firmList.renderList();

            expect(customContainer.querySelectorAll('.dg-building-callout__list-item').length).to.be(8);
        });

        it("remove firm", function() {
            var customContainer = document.createElement('div'),
                firmList = new FirmCard.List(results, {container: customContainer});
            firmList.removeFirms('141265769760312');

            expect(customContainer.querySelector('#firm-141265769760312')).not.to.be.ok();
            expect(customContainer.querySelectorAll('.dg-building-callout__list-item').length).to.be(3);
        });

        it("remove firms array", function() {
            var customContainer = document.createElement('div'),
                firmList = new FirmCard.List(results, {container: customContainer});
            firmList.renderList();
            firmList.removeFirms(['141265769760312', '141265769349900', '141265770849956']);

            expect(customContainer.querySelectorAll('.dg-building-callout__list-item').length).to.be(1);
        });

        it("remove firms if List was cleared", function() {
            var customContainer = document.createElement('div'),
                firmList = new FirmCard.List(results, {container: customContainer});
            firmList.renderList();
            firmList.clearList();

            expect(customContainer.querySelectorAll('.dg-building-callout__list-item').length).to.be(0);
        });

        it("ignore firm if it already in list", function() {
            var customContainer = document.createElement('div'),
                firmList = new FirmCard.List(results, {container: customContainer});
            firmList.renderList();
            firmList.addFirms(alreadyInList);
            firmList.renderList();

            expect(customContainer.querySelectorAll('.dg-building-callout__list-item').length).to.be(4);
        });
    })

    describe('#should support localization:', function () {
        it("setLang method", function() {
            var firmList = new FirmCard.List(results, {});
            firmList.setLang('en');
            expect(firmList.getLang()).to.be('en');
        });
    })
});
