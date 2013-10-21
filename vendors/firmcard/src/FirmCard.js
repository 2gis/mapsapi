var FirmCard = function (firm, options) {
    this._setOptions(options);
    this._firmContentObject = {};
    this._schedule = new FirmCard.Schedule({
        localLang: options.lang,
        dict: this.dict
    });

    this.render(firm);
};

FirmCard.prototype = {

    render: function (firmId) {
        if (!firmId) { return; }

        if (firmId !== this._firmId) {
            this._firmContentObject = {};
            this._renderCardById(firmId);
        }

        return this._firmContentObject;
    },

    _renderCardById: function (firmId) {
        var self = this;

        this.options.ajax(firmId).then(function (res) {
            var data = res.result.data;
            if (data !== 'undefined') {
                self._firmData = data[0];
                self._firmId = firmId;
                self._renderFirmCard();
                self._initEventHandlers();
            }
        });
    },

    _createFirmContainer: function () {
        var firm = document.createElement('div');
        firm.setAttribute('id', 'dg-map-firm-full-' + this._firmId);
        firm.setAttribute('class', 'dg-map-firm-full');

        return firm;
    },

    _renderFirmCard: function () {
        var firmCardBody,
            schedule,
            forecast,
            links,
            btns,
            data = this._firmData,
            container = this._container = this._createFirmContainer(),
            attributes;

        this._footerContainer = document.createElement('div');

        schedule = this._schedule.transform(data.schedule, {
            zoneOffset: this.options.timezoneOffset,
            apiLang: this.options.lang,
            localLang: this.options.lang
        });
        forecast = this._schedule.forecast(schedule);


        console.log(schedule);
        /*firmCardBody = this.options.render(this.options.tmpls.body, {
            firm: data,
            schedule: schedule,
            dict: this.dict,
            lang: this.options.lang,
            forecast: forecast,
            dataHelper: FirmCard.DataHelper
        });*/
        if (!!(data.attributes && data.attributes.general.items)) {
            data.attributes.general.items ? attributes = data.attributes.general.items : attributes = [];
        }

        firmCardBody = this.options.render(this.options.tmpls.addr, {data: data.geo});
        firmCardBody += this.options.render(this.options.tmpls.contacts, {groups: data.contact_groups});
        firmCardBody += this.options.render(this.options.tmpls.schedule, {schedule: schedule,
                                                                         forecast: forecast});
        firmCardBody += this.options.render(this.options.tmpls.payments, {payments: attributes});
        firmCardBody += this.options.render(this.options.tmpls.rubrics, {rubrics: data.rubrics});

        links = this._fillHeaderLinks();

        btns = this._fillFooterButtons();

        //fill object for view render
        this._firmContentObject.header = this.options.render(this.options.tmpls.header, {'firmName': data.name, 'links': links});
        container.innerHTML = firmCardBody;
        this._firmContentObject.tmpl = container;
        this._footerContainer.innerHTML = this.options.render(this.options.tmpls.footer, {'btns': btns});
        this._firmContentObject.footer = this._footerContainer;

        this.options.onFirmReady && this.options.onFirmReady(this._firmContentObject);
    },

    _fillFooterButtons: function () {
        var btns = [];

        if (this.options.backBtn) {
            btns.push({ name: 'firmCard-back',
                        label: this.dict.t(this.options.lang, 'btnBack'),
                        icon: true
            });
        }
        // console.log(this.dict);
        btns.push({ name: 'goto',
                    label: this.dict.t(this.options.lang, 'btnFindWay'),
                    icon: true,
                    href: this.options.gotoUrl
        });

        if (this._firmData.geo.entrances) {
            btns.push({ name: 'show-entrance',
                        label: this.dict.t(this.options.lang, 'btnEntrance'),
                        icon: true
            });
        }

        return btns;
    },

    _fillHeaderLinks: function () {
        var links = [],
            reviewData = this._firmData.reviews,
            photos = this._firmData.photos,
            booklet = this._firmData.booklet,
            link;

        // photos = [{"hash":"88a78667012a80499533d1c3fcc4f138","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/612x612\/37895536_u3a7bcWn-9JlTaUIwoLFsMkhT5yLAPrmM3q_tfiCVhM.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/37895536_u3a7bcWn-9JlTaUIwoLFsMkhT5yLAPrmM3q_tfiCVhM.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/37895536_u3a7bcWn-9JlTaUIwoLFsMkhT5yLAPrmM3q_tfiCVhM.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/37895536_u3a7bcWn-9JlTaUIwoLFsMkhT5yLAPrmM3q_tfiCVhM.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"cc0d0313ee4bbe0a3664126e4e63dbf5","urls":{"original":"https:\/\/irs0.4sqi.net\/img\/general\/720x960\/27097967_RIphxKQIH11idy71ybe9Vbqk2RJUPpZBcyyjb9KptgY.jpg","height100":"https:\/\/irs0.4sqi.net\/img\/general\/height100\/27097967_RIphxKQIH11idy71ybe9Vbqk2RJUPpZBcyyjb9KptgY.jpg","100x100":"https:\/\/irs0.4sqi.net\/img\/general\/100x100\/27097967_RIphxKQIH11idy71ybe9Vbqk2RJUPpZBcyyjb9KptgY.jpg","width100":"https:\/\/irs0.4sqi.net\/img\/general\/width100\/27097967_RIphxKQIH11idy71ybe9Vbqk2RJUPpZBcyyjb9KptgY.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"1892ba77e37afb750832b84c61ed99ac","urls":{"original":"https:\/\/irs0.4sqi.net\/img\/general\/960x720\/57486351_r_2nRZWm8CYF42IpcZ7LCvaz0dS1pNdGR61c9SGsGfo.jpg","height100":"https:\/\/irs0.4sqi.net\/img\/general\/height100\/57486351_r_2nRZWm8CYF42IpcZ7LCvaz0dS1pNdGR61c9SGsGfo.jpg","100x100":"https:\/\/irs0.4sqi.net\/img\/general\/100x100\/57486351_r_2nRZWm8CYF42IpcZ7LCvaz0dS1pNdGR61c9SGsGfo.jpg","width100":"https:\/\/irs0.4sqi.net\/img\/general\/width100\/57486351_r_2nRZWm8CYF42IpcZ7LCvaz0dS1pNdGR61c9SGsGfo.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"1eefb0fbd713086226ef9a8f3633b189","urls":{"original":"https:\/\/irs2.4sqi.net\/img\/general\/720x960\/17825996_JeMfIZFwZPDKEHkdio7asB_o6DghzvryZtbhQ3grbIE.jpg","height100":"https:\/\/irs2.4sqi.net\/img\/general\/height100\/17825996_JeMfIZFwZPDKEHkdio7asB_o6DghzvryZtbhQ3grbIE.jpg","100x100":"https:\/\/irs2.4sqi.net\/img\/general\/100x100\/17825996_JeMfIZFwZPDKEHkdio7asB_o6DghzvryZtbhQ3grbIE.jpg","width100":"https:\/\/irs2.4sqi.net\/img\/general\/width100\/17825996_JeMfIZFwZPDKEHkdio7asB_o6DghzvryZtbhQ3grbIE.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"b145b67606eb562c7e78493e34b6a83a","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/540x960\/54230891_wyHF-9cJ7iwCawkJ2_50hehO6V-jR24q8yuxDRhnVPI.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/54230891_wyHF-9cJ7iwCawkJ2_50hehO6V-jR24q8yuxDRhnVPI.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/54230891_wyHF-9cJ7iwCawkJ2_50hehO6V-jR24q8yuxDRhnVPI.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/54230891_wyHF-9cJ7iwCawkJ2_50hehO6V-jR24q8yuxDRhnVPI.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"b9e4f3729d1b5ec4db8312055f9930b9","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/1440x1920\/45896790_rSs0UDQ2BsTcDXVz6YgJuHkOY6YHErTLUMyq-Pq_yQ0.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/45896790_rSs0UDQ2BsTcDXVz6YgJuHkOY6YHErTLUMyq-Pq_yQ0.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/45896790_rSs0UDQ2BsTcDXVz6YgJuHkOY6YHErTLUMyq-Pq_yQ0.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/45896790_rSs0UDQ2BsTcDXVz6YgJuHkOY6YHErTLUMyq-Pq_yQ0.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"d857a1bd18e5d145a7c14b7d05081301","urls":{"original":"https:\/\/irs3.4sqi.net\/img\/general\/960x540\/17830155_wRutA2vNSfoJ4EkyOL0Ie2vSUv5x48kXRWKBORW6D_k.jpg","height100":"https:\/\/irs3.4sqi.net\/img\/general\/height100\/17830155_wRutA2vNSfoJ4EkyOL0Ie2vSUv5x48kXRWKBORW6D_k.jpg","100x100":"https:\/\/irs3.4sqi.net\/img\/general\/100x100\/17830155_wRutA2vNSfoJ4EkyOL0Ie2vSUv5x48kXRWKBORW6D_k.jpg","width100":"https:\/\/irs3.4sqi.net\/img\/general\/width100\/17830155_wRutA2vNSfoJ4EkyOL0Ie2vSUv5x48kXRWKBORW6D_k.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"f72f3c64f4035c03dcf80fb0c957be7b","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/960x720\/45878663_ru0PfCUmxCcwadY-ZV8I8StpgXupeMi9qTAqQFS4cP8.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/45878663_ru0PfCUmxCcwadY-ZV8I8StpgXupeMi9qTAqQFS4cP8.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/45878663_ru0PfCUmxCcwadY-ZV8I8StpgXupeMi9qTAqQFS4cP8.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/45878663_ru0PfCUmxCcwadY-ZV8I8StpgXupeMi9qTAqQFS4cP8.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"80d2f169f1a586475915139d767a3f99","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/960x720\/50892476_JLTOPlQT643Z4pNjYWwKJ1rMJLPPXLW3R6wkhRe1jU8.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/50892476_JLTOPlQT643Z4pNjYWwKJ1rMJLPPXLW3R6wkhRe1jU8.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/50892476_JLTOPlQT643Z4pNjYWwKJ1rMJLPPXLW3R6wkhRe1jU8.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/50892476_JLTOPlQT643Z4pNjYWwKJ1rMJLPPXLW3R6wkhRe1jU8.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"fd7612455142d2b0a7021b84e7db4299","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/960x720\/36348703_m9Nk1tmjU2-iVvcHsnaiAj5rcW350QalNepoJsrtAc4.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/36348703_m9Nk1tmjU2-iVvcHsnaiAj5rcW350QalNepoJsrtAc4.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/36348703_m9Nk1tmjU2-iVvcHsnaiAj5rcW350QalNepoJsrtAc4.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/36348703_m9Nk1tmjU2-iVvcHsnaiAj5rcW350QalNepoJsrtAc4.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"3cb9b60310763a4bc5e42367c2a0720e","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/717x959\/57468240_vLBH2Qu_0pK_iaPC9kyoi2q6tzrfnCxOA8XdWdmFz68.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/57468240_vLBH2Qu_0pK_iaPC9kyoi2q6tzrfnCxOA8XdWdmFz68.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/57468240_vLBH2Qu_0pK_iaPC9kyoi2q6tzrfnCxOA8XdWdmFz68.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/57468240_vLBH2Qu_0pK_iaPC9kyoi2q6tzrfnCxOA8XdWdmFz68.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"8534e5f8fcd475a40c05fe2a5ae6daf4","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/720x960\/56648572_xzl2aWsh1SQdnhIDsVVphj6LMTWGRnq-qC9a0BxZxVg.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/56648572_xzl2aWsh1SQdnhIDsVVphj6LMTWGRnq-qC9a0BxZxVg.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/56648572_xzl2aWsh1SQdnhIDsVVphj6LMTWGRnq-qC9a0BxZxVg.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/56648572_xzl2aWsh1SQdnhIDsVVphj6LMTWGRnq-qC9a0BxZxVg.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"3fa7df82260962a922440b7a5c6efd9f","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/575x960\/38129614_jp2RVR3pfJ8HcrGdjYfI1hdvjsnSLAer-51JmQtbmo0.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/38129614_jp2RVR3pfJ8HcrGdjYfI1hdvjsnSLAer-51JmQtbmo0.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/38129614_jp2RVR3pfJ8HcrGdjYfI1hdvjsnSLAer-51JmQtbmo0.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/38129614_jp2RVR3pfJ8HcrGdjYfI1hdvjsnSLAer-51JmQtbmo0.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"8cadf8fb9018031f9e39e61a864eccf3","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/960x541\/63332408_oa78zH5pRIqXcx2LaJT_hLXTUCmtgkDGwbj_ctf3mGU.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/63332408_oa78zH5pRIqXcx2LaJT_hLXTUCmtgkDGwbj_ctf3mGU.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/63332408_oa78zH5pRIqXcx2LaJT_hLXTUCmtgkDGwbj_ctf3mGU.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/63332408_oa78zH5pRIqXcx2LaJT_hLXTUCmtgkDGwbj_ctf3mGU.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"6269cd730988b8c6df3ba27a0d01eea9","urls":{"original":"https:\/\/irs2.4sqi.net\/img\/general\/575x960\/38129614_RIpdf8sv4KOHh9DKQB-x7lXLfJLlNOz8Dc7kJvIabJc.jpg","height100":"https:\/\/irs2.4sqi.net\/img\/general\/height100\/38129614_RIpdf8sv4KOHh9DKQB-x7lXLfJLlNOz8Dc7kJvIabJc.jpg","100x100":"https:\/\/irs2.4sqi.net\/img\/general\/100x100\/38129614_RIpdf8sv4KOHh9DKQB-x7lXLfJLlNOz8Dc7kJvIabJc.jpg","width100":"https:\/\/irs2.4sqi.net\/img\/general\/width100\/38129614_RIpdf8sv4KOHh9DKQB-x7lXLfJLlNOz8Dc7kJvIabJc.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"ace61ca003e9d9a383d2d8030c4da9ec","urls":{"original":"https:\/\/irs3.4sqi.net\/img\/general\/960x720\/54833658_uu8L2NOT_idFiJkh8o-vLi_M8mX3k5cx4m76Z3TMv5Q.jpg","height100":"https:\/\/irs3.4sqi.net\/img\/general\/height100\/54833658_uu8L2NOT_idFiJkh8o-vLi_M8mX3k5cx4m76Z3TMv5Q.jpg","100x100":"https:\/\/irs3.4sqi.net\/img\/general\/100x100\/54833658_uu8L2NOT_idFiJkh8o-vLi_M8mX3k5cx4m76Z3TMv5Q.jpg","width100":"https:\/\/irs3.4sqi.net\/img\/general\/width100\/54833658_uu8L2NOT_idFiJkh8o-vLi_M8mX3k5cx4m76Z3TMv5Q.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"76c0cd761ae0e081a738eb435e83c4ca","urls":{"original":"https:\/\/irs2.4sqi.net\/img\/general\/720x720\/65935364_3_b18SNEWuv7PR2telT7MoNSQ_AfYM7yW1vJ7ZTTff8.jpg","height100":"https:\/\/irs2.4sqi.net\/img\/general\/height100\/65935364_3_b18SNEWuv7PR2telT7MoNSQ_AfYM7yW1vJ7ZTTff8.jpg","100x100":"https:\/\/irs2.4sqi.net\/img\/general\/100x100\/65935364_3_b18SNEWuv7PR2telT7MoNSQ_AfYM7yW1vJ7ZTTff8.jpg","width100":"https:\/\/irs2.4sqi.net\/img\/general\/width100\/65935364_3_b18SNEWuv7PR2telT7MoNSQ_AfYM7yW1vJ7ZTTff8.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"951f6d7750eefdd7df4830317e29cc89","urls":{"original":"https:\/\/irs0.4sqi.net\/img\/general\/583x960\/21999272_aLllIdlWJAR64F4J-rs2HaD2Caq2UQj8TRTP5E6Snmc.jpg","height100":"https:\/\/irs0.4sqi.net\/img\/general\/height100\/21999272_aLllIdlWJAR64F4J-rs2HaD2Caq2UQj8TRTP5E6Snmc.jpg","100x100":"https:\/\/irs0.4sqi.net\/img\/general\/100x100\/21999272_aLllIdlWJAR64F4J-rs2HaD2Caq2UQj8TRTP5E6Snmc.jpg","width100":"https:\/\/irs0.4sqi.net\/img\/general\/width100\/21999272_aLllIdlWJAR64F4J-rs2HaD2Caq2UQj8TRTP5E6Snmc.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"b6f814f81c1a31556e25a5ec8c40c0e5","urls":{"original":"https:\/\/irs0.4sqi.net\/img\/general\/717x959\/57750443_-EK4OezLeF9rF441ILi0P9RC-sPRwBEFH0HCpH4B6-o.jpg","height100":"https:\/\/irs0.4sqi.net\/img\/general\/height100\/57750443_-EK4OezLeF9rF441ILi0P9RC-sPRwBEFH0HCpH4B6-o.jpg","100x100":"https:\/\/irs0.4sqi.net\/img\/general\/100x100\/57750443_-EK4OezLeF9rF441ILi0P9RC-sPRwBEFH0HCpH4B6-o.jpg","width100":"https:\/\/irs0.4sqi.net\/img\/general\/width100\/57750443_-EK4OezLeF9rF441ILi0P9RC-sPRwBEFH0HCpH4B6-o.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"1bebb09d7d254afbbfd9a73d15637278","urls":{"original":"https:\/\/irs0.4sqi.net\/img\/general\/717x959\/28765602_EUqOO8qYlG2ilb40QCjk_oii3oSsI980SWuBcpW_M8s.jpg","height100":"https:\/\/irs0.4sqi.net\/img\/general\/height100\/28765602_EUqOO8qYlG2ilb40QCjk_oii3oSsI980SWuBcpW_M8s.jpg","100x100":"https:\/\/irs0.4sqi.net\/img\/general\/100x100\/28765602_EUqOO8qYlG2ilb40QCjk_oii3oSsI980SWuBcpW_M8s.jpg","width100":"https:\/\/irs0.4sqi.net\/img\/general\/width100\/28765602_EUqOO8qYlG2ilb40QCjk_oii3oSsI980SWuBcpW_M8s.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"cb8653380b212fffc4e4cd2e6144bd94","urls":{"original":"https:\/\/irs3.4sqi.net\/img\/general\/540x720\/40468520_pcFQUU6T43ZwWhT1YI7ORqkTbin7cNvtJDhfKMLsYrc.jpg","height100":"https:\/\/irs3.4sqi.net\/img\/general\/height100\/40468520_pcFQUU6T43ZwWhT1YI7ORqkTbin7cNvtJDhfKMLsYrc.jpg","100x100":"https:\/\/irs3.4sqi.net\/img\/general\/100x100\/40468520_pcFQUU6T43ZwWhT1YI7ORqkTbin7cNvtJDhfKMLsYrc.jpg","width100":"https:\/\/irs3.4sqi.net\/img\/general\/width100\/40468520_pcFQUU6T43ZwWhT1YI7ORqkTbin7cNvtJDhfKMLsYrc.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"d3f16ca317a488ca49df8934ab40269c","urls":{"original":"https:\/\/irs2.4sqi.net\/img\/general\/720x431\/39719282_UeOPFJLOnFEE3TEw_RFNEv8FxasRJMaWbD0mTWL2MYQ.jpg","height100":"https:\/\/irs2.4sqi.net\/img\/general\/height100\/39719282_UeOPFJLOnFEE3TEw_RFNEv8FxasRJMaWbD0mTWL2MYQ.jpg","100x100":"https:\/\/irs2.4sqi.net\/img\/general\/100x100\/39719282_UeOPFJLOnFEE3TEw_RFNEv8FxasRJMaWbD0mTWL2MYQ.jpg","width100":"https:\/\/irs2.4sqi.net\/img\/general\/width100\/39719282_UeOPFJLOnFEE3TEw_RFNEv8FxasRJMaWbD0mTWL2MYQ.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"77e40f21f4f5d69428abb7089ffdda77","urls":{"original":"https:\/\/irs3.4sqi.net\/img\/general\/540x720\/33244904_iKS-MOHIc8nkihwIUceBNNdYOsDwJpZVI6MC0MGe8NQ.jpg","height100":"https:\/\/irs3.4sqi.net\/img\/general\/height100\/33244904_iKS-MOHIc8nkihwIUceBNNdYOsDwJpZVI6MC0MGe8NQ.jpg","100x100":"https:\/\/irs3.4sqi.net\/img\/general\/100x100\/33244904_iKS-MOHIc8nkihwIUceBNNdYOsDwJpZVI6MC0MGe8NQ.jpg","width100":"https:\/\/irs3.4sqi.net\/img\/general\/width100\/33244904_iKS-MOHIc8nkihwIUceBNNdYOsDwJpZVI6MC0MGe8NQ.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"a7647e66fe2c80d59e7e2894f2a72999","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/720x540\/33064924_p7WyzKQUu2U6FrznlQDo8cdEVd_-dUp9Csi356GOSUc.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/33064924_p7WyzKQUu2U6FrznlQDo8cdEVd_-dUp9Csi356GOSUc.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/33064924_p7WyzKQUu2U6FrznlQDo8cdEVd_-dUp9Csi356GOSUc.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/33064924_p7WyzKQUu2U6FrznlQDo8cdEVd_-dUp9Csi356GOSUc.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"e88d5f65f9d101c9ae2b996c8c3c044d","urls":{"original":"https:\/\/irs3.4sqi.net\/img\/general\/960x720\/48692089_i4VoEAgK2X5nm6R2LfYMOuu7-G10q8aNNP-W6-0AGrI.jpg","height100":"https:\/\/irs3.4sqi.net\/img\/general\/height100\/48692089_i4VoEAgK2X5nm6R2LfYMOuu7-G10q8aNNP-W6-0AGrI.jpg","100x100":"https:\/\/irs3.4sqi.net\/img\/general\/100x100\/48692089_i4VoEAgK2X5nm6R2LfYMOuu7-G10q8aNNP-W6-0AGrI.jpg","width100":"https:\/\/irs3.4sqi.net\/img\/general\/width100\/48692089_i4VoEAgK2X5nm6R2LfYMOuu7-G10q8aNNP-W6-0AGrI.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"63d2780d05c0a77a61453e5232e8553c","urls":{"original":"https:\/\/irs2.4sqi.net\/img\/general\/960x720\/17825996_NaSTx_vSoB-Acv0nELe0U8HHM2ZN9MJKiUcCaS_MWtA.jpg","height100":"https:\/\/irs2.4sqi.net\/img\/general\/height100\/17825996_NaSTx_vSoB-Acv0nELe0U8HHM2ZN9MJKiUcCaS_MWtA.jpg","100x100":"https:\/\/irs2.4sqi.net\/img\/general\/100x100\/17825996_NaSTx_vSoB-Acv0nELe0U8HHM2ZN9MJKiUcCaS_MWtA.jpg","width100":"https:\/\/irs2.4sqi.net\/img\/general\/width100\/17825996_NaSTx_vSoB-Acv0nELe0U8HHM2ZN9MJKiUcCaS_MWtA.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"ab8972fc09bb17e07fd92828fb240d93","urls":{"original":"https:\/\/irs1.4sqi.net\/img\/general\/720x540\/36348703_2zQWBHPxK_3E-iaa_nqefaXLMoZNNgbf15gfYS6tzfc.jpg","height100":"https:\/\/irs1.4sqi.net\/img\/general\/height100\/36348703_2zQWBHPxK_3E-iaa_nqefaXLMoZNNgbf15gfYS6tzfc.jpg","100x100":"https:\/\/irs1.4sqi.net\/img\/general\/100x100\/36348703_2zQWBHPxK_3E-iaa_nqefaXLMoZNNgbf15gfYS6tzfc.jpg","width100":"https:\/\/irs1.4sqi.net\/img\/general\/width100\/36348703_2zQWBHPxK_3E-iaa_nqefaXLMoZNNgbf15gfYS6tzfc.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}},{"hash":"75addfa55247bb76eacb04c3c8c246bc","urls":{"original":"https:\/\/irs0.4sqi.net\/img\/general\/960x720\/25914715_mARyOgJ96NQmssh3ll-cww9t1XToQfnBr1o3b2dzZgQ.jpg","height100":"https:\/\/irs0.4sqi.net\/img\/general\/height100\/25914715_mARyOgJ96NQmssh3ll-cww9t1XToQfnBr1o3b2dzZgQ.jpg","100x100":"https:\/\/irs0.4sqi.net\/img\/general\/100x100\/25914715_mARyOgJ96NQmssh3ll-cww9t1XToQfnBr1o3b2dzZgQ.jpg","width100":"https:\/\/irs0.4sqi.net\/img\/general\/width100\/25914715_mARyOgJ96NQmssh3ll-cww9t1XToQfnBr1o3b2dzZgQ.jpg"},"description":null,"copyright":{"type":"image","value":"http:\/\/cephgw1.d1.nato\/api\/55095947cd04fc95aa0062ebd697bc2d.png","url":"https:\/\/foursquare.com"}}];
        // booklet = {"url":"http:\/\/maps.2gis.ru\/14"};

        if (reviewData && reviewData.is_allowed_to_show_reviews) {
            links.push({
                name: 'flamp_stars',
                label: this.dict.t(this.options.lang, 'stars'),
                width: reviewData.rating * 20
            });
            links.push({
                name: 'flamp_reviews',
                label: this.dict.t(this.options.lang, 'linkReviews', reviewData.review_count),
                href: '__FLAMP_URL__' + this._firmId + '?' + '__FLAMP_GOOGLE_ANALYTICS__'
            });
        }

        if (photos && photos.length) {
            link = L.Util.template('__PHOTOS_LINK__',
                {
                    'code': this.options.map.dgProjectDetector.getProject().code,
                    'id': this._firmId,
                });

            links.push({name: 'photos',
                        href: link,
                        label: this.dict.t(this.options.lang, 'linkPhoto', photos.length)
            });
        }

        if (booklet && booklet.url) {
            links.push({name: 'booklet',
                        href: this._firmData.booklet.url,
                        label: this.dict.t(this.options.lang, 'linkBooklet')});
        }


        return links;
    },

    _onFooterBtnClick: function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;

        if (target && target.nodeName === 'A') {
            if (target.id === 'popup-btn-firmCard-back') {
                this.options.backBtn();
            } else if (target.id ===  'popup-btn-show-entrance') {
                var ent = new this.options.showEntrance({'vectors': this._firmData.geo.entrances[0].vectors});
                ent.addTo(this.options.map).show();
            }
        }
    },

    _onToggleSchedule: function (e) {
        var schedule = this._container.querySelector('.schedule__table'),
            display = 'block',
            target = e.target || e.srcElement;

        if (!schedule) { return; }

        if (target && target.nodeName === 'DIV' && target.className.indexOf('schedule__today') !== -1) {
            if (schedule.style.display === 'block') {
                display = 'none';
            }
            schedule.style.display = display;
        }
    },

    _initEventHandlers: function () {

        var eventName = this._hasTouch() ? 'touchend' : 'click',
            footer = this._footerContainer;

        //TODO:  do it crossbrowser!
        if (footer.addEventListener) {
            footer.addEventListener(eventName, this._onFooterBtnClick.bind(this), false);
            this._container.addEventListener(eventName, this._onToggleSchedule.bind(this), false);
        } else {
            footer.attachEvent('on' + eventName, this._onFooterBtnClick);
        }
    },

    _setOptions: function (options) {
        var option;

        this.options = this.options || {};
        options.lang = options.lang || 'ru';

        for (option in options) {
            if (options.hasOwnProperty(option)) {
                this.options[option] = options[option];
            }
        }
    },

    _hasTouch: function () {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
};
