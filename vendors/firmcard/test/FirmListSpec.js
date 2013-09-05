describe('DGFirmList', function () {
    var firmList,
    results =
[{"id":"141265769760312_7f48jh2915H23H8he2g3uvDn5A6AG45842cB44287906231J5b6d19G4H3G38495","name":"Спарк-Авто, ООО","type":"filial","firm":{"id":"141274359477657","filials_count":3,"name":"Спарк-Авто, ООО"},"ads":{"warning":null,"micro_comment":"Оригинальные и дубликатные запчасти на авто европейского производства"},"rubrics":{"primary":[{"name":"Автозапчасти для иномарок"},{"name":"Автохимия / Масла"},{"name":"Автоаксессуары"}],"additional":[]}},{"id":"141265769349900_71B8jh2903H33H75e5BguvDn5A6AG45842cB4428379C231J546A19G4H3G28495","name":"Автозапчасти, ООО Невис ПТ","type":"filial","firm":{"id":"141274359268956","filials_count":1,"name":"Автозапчасти, ООО Невис ПТ"},"ads":null,"rubrics":{"primary":[{"name":"Автозапчасти для иномарок"},{"name":"Автоаксессуары"}],"additional":[]}},{"id":"141265769369916_77A8jh2919H43H6ee45BuvDn5A6AG4584AcB4428399C231J556719G4H3G28495","name":"Детская поликлиника, Детская городская клиническая больница №1, Отделение №2","type":"filial","firm":{"id":"141274359278970","filials_count":2,"name":"Детская поликлиника, Детская городская клиническая больница №1"},"ads":null,"rubrics":{"primary":[{"name":"Поликлиники детские"}],"additional":[]}},{"id":"141265770849956_7A88jh2959H53H78e9g9uvDn5A71G4584ecB4428879C231J5b6919G4H3G28495","name":"Магазин автозапчастей для Peugeot, Citroen, Fiat, ООО Меркурий Авто","type":"filial","firm":{"id":"141274359990712","filials_count":1,"name":"Магазин автозапчастей для Peugeot, Citroen, Fiat, ООО Меркурий Авто"},"ads":null,"rubrics":{"primary":[{"name":"Автозапчасти для иномарок"}],"additional":[]}}];

    beforeEach(function () {
        firmList = new FirmCard.List({
                /*tmpls: {
                    loader: this._view.getTemplate("loader"),
                    shortFirm: this._view.getTemplate("shortFirm"),
                    fullFirm: this._view.getTemplate("fullFirm")
                },
                container: this._firmListObject.firmListContainer,
                render: L.DG.Template,
                defaultFirm: this._defaultFirm,
                ajax: L.bind(this._api.getFirmInfo, this._api),
                onReady: L.bind(this._renderFirmList, this),
                onToggleCard: L.bind(this._onFirmlistToggleCard, this)*/
            }, results
        );
    });

    afterEach(function () {
        firmList = null;
    });

    it("#empty cache on init", function() {
        console.log(firmList);
        expect( firmList.isListCached()).not.to.be.ok();
    });

});
