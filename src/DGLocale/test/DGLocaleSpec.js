describe('DG Locale Module', function() {
	var map,
		getLangSpy,
		setLangSpy;

	beforeEach(function() {
		map = new L.Map(document.createElement('div'), {
            center : new L.LatLng(54.980206086231, 82.898068362003),
            zoom:10,
            fullScreenControl: false
        });
		getLangSpy = sinon.spy(map, "getLang");
		setLangSpy = sinon.spy(map, "setLang");
	});

	afterEach(function() {
		map = null;
		getLangSpy = null;
		setLangSpy = null;
	});

	describe('getLang / setLang test cases', function() {
		it("should return default language: ru", function() {
			map.getLang();

			expect(getLangSpy.calledOnce).to.be.ok();
			expect(getLangSpy.returnValues).to.eql(['ru']);
		});

		it("should return language that was set: it", function() {
			map.getLang();
			map.setLang("it");
			map.getLang();

			expect(setLangSpy.calledOnce).to.be.ok();

			expect(getLangSpy.calledTwice).to.be.ok();
			expect(getLangSpy.returnValues).to.eql(['ru', 'it']);
	});

		it("should return default language (ru) if setLang was called with invalid argument: undefined, null, etc", function() {
			map.setLang(null);
			map.getLang();

			map.setLang(undefined);
			map.getLang();

			map.setLang("");
			map.getLang();

			map.setLang(5);
			map.getLang();

			map.setLang(["it"]);
			map.getLang();

			map.setLang({lang: "it"});
			map.getLang();

			expect(setLangSpy.callCount).to.eql(6);
			expect(getLangSpy.callCount).to.eql(6);

			expect(getLangSpy.returnValues).to.eql(['ru', 'ru', 'ru', 'ru', 'ru', 'ru']);
		});

		it("should call dgLangChange event when setting new lang through setLang method", function() {
			var callback = sinon.spy(function() {
				return 5;
			});
			map.on("dgLangChange", callback);
			map.setLang("it");

			expect(setLangSpy.calledOnce).to.be.ok()
			expect(callback.calledOnce).to.be.ok()
			expect(callback.firstCall.returnValue).to.eql(5);
		});
	});

	describe('t() method test cases', function() {
		var TestPlugin,
			plugin,
			pluginSpy;

		beforeEach(function() {
			TestPlugin = L.Control.extend({
			    includes: L.DG.Locale,
			    options: {
			        position: 'topright'
			    },
			    statics: {
			    	Dictionary: {}
			    },
			    onAdd: function (map) {
			        return L.DomUtil.create('div', 'locale-example');
			    }
			});

			TestPlugin.Dictionary.ru = L.extend({
				"{n} people" : ["{n} пользователь", "{n} пользователя", "{n} пользователей"],
				"regularly use 2GIS" : "регулярно используют 2GIS"
			}, L.DG.Dictionary.ru);

			TestPlugin.Dictionary.it = L.extend({
				"{n} people" : ["{n} utente", "{n} utenti"],
				"regularly use 2GIS" : "utilizzano regolarmente 2GIS"
			}, L.DG.Dictionary.it);

			plugin = new TestPlugin();
			map.addControl(plugin);
			tSpy = sinon.spy(plugin, "t");
		});

		afterEach(function() {
			TestPlugin = null;
			plugin = null;
			tSpy = null;
		});

		it("should correctly get dictionary by lang", function() {
			plugin.t("{n} people", 123456);
			map.setLang("it");
			plugin.t("{n} people", 1234560);

			expect(setLangSpy.calledOnce).to.be.ok();
			expect(tSpy.calledTwice).to.be.ok();

			expect(tSpy.returnValues).to.eql(["123456 пользователей",'1234560 utenti']);
		});

		it("should return source message for call with not existing lang: uk", function() {
			map.setLang("uk");
			plugin.t("regularly use 2GIS");

			expect(TestPlugin.Dictionary).to.not.have.property("uk");
			expect(setLangSpy.calledTwice).to.be.ok();
			expect(tSpy.calledOnce).to.be.ok();
			expect(tSpy.firstCall.returnValue).to.eql("регулярно используют 2GIS");
		});

		it("should return source message for call with not existing message for lang: ru", function() {
			plugin.t("not existing message", 1);

			expect(tSpy.calledOnce).to.be.ok();
			expect(tSpy.returnValues).to.eql(["not existing message"]);
		});

		it("should set second argument to 0 when it`s type is not Number", function() {
			plugin.t("{n} people", "dds");

			expect(tSpy.calledOnce).to.be.ok();
			expect(tSpy.returnValues).to.eql(["0 пользователей"]);
		});


	});

});
