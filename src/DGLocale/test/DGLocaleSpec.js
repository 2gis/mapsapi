describe('DG Locale Module', function() {
	var map, 
		getLangSpy,
		setLangSpy;

	beforeEach(function() {
		map = new L.Map(document.createElement('div'), {
            center : new L.LatLng(54.980206086231, 82.898068362003),
            zoom:10
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
	});
});
