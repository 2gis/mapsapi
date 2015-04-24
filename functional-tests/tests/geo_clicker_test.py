# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from time import sleep
from lode_runner.dataprovider import dataprovider
from classes.components.scrips import SetScripts
from classes.WAPI.dataWorker import GeoData
from classes.components.scrips import GetScripts
from classes.WAPI.dataWorker import FirmData
from classes.WAPI.request import GalleryInfo
# TODO: вынести в датапровайдеры захордкоженные координаты для памятников и пои


class ClickDifferentZoomsCords(MapsAPIBaseTest):
    not_found = {
        'ru': u"Это место мы ещё не успели изучить",
        'en': u"We haven't collected info about this place yet",
        'cs': u"O tomto místě zatím nemáme informace",
        'es': u"Todavía no hemos recopilado la información sobre este lugar",
        'it': u"Non disponiamo ancora di informazioni su questo posto"
    }
    city = {
        'ru': u"Город",
        'en': u"City",
        'cs': u"Město",
        'es': u"Ciudad",
        'it': u"Сittà"
    }
    district = {
        'ru': u"Район",
        # 'en': u"District",
        'cs': u"Městská část",
        'es': u"Comuna",
        'it': u"Municipalità"
    }

    street = {
        'ru': u"Улица",
        'en': u"Street",
        'cs': u"Ulice",
        'es': u"Calle",
        'it': u"Via"
    }

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_unknown_place(self, url):
        """
        :param url: powered by dataprovider
        Unknown place callout test
        """
        self.driver.get(url)
        # Ждем инициализацию карты
        sleep(2)
        self.driver.execute_script(SetScripts.pan_to(54.98, 82.32))
        sleep(1)
        self.page.map_container.center_click()
        sleep(2)
        self.assertTrue(self.page.unkown_place.is_visible, 'Unknown place card present')
        for lang in self.not_found:
            self.driver.execute_script(SetScripts.set_lang(lang))
            header = self.page.unkown_place.header
            self.assertEqual(self.not_found[lang], header, 'Unknown place content correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_city_place(self, url):
        """
        :param url: powered by dataprovider decorator
        City  callout test
        """
        self.driver.get(url)
        sleep(2)
        self.driver.execute_script(SetScripts.set_zoom(8))
        center = self.driver.execute_script(GetScripts.getCenter)
        g = GeoData(center, 8)
        self.page.map_container.center_click()
        sleep(2)
        self.assertEqual(self.page.place_callout.header, g.city_name, 'City name correct')
        for lang in self.city:
            self.driver.execute_script(SetScripts.set_lang(lang))
            purpose = self.page.place_callout.purpose
            self.assertEqual(self.city[lang], purpose, 'Purpose correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_district_place(self, url):
        """
        :param url: powered by dataprovider decorator
        District callout test
        """
        self.driver.get(url)
        sleep(2)
        center = self.driver.execute_script(GetScripts.getCenter)
        self.page.map_container.center_click()
        zoom = self.driver.execute_script(GetScripts.getZoom)
        g = GeoData(center, zoom)
        district_addr = g.place_address
        callout_addr = self.page.addresed_place_callout.drilldown
        self.assertEqual(self.page.addresed_place_callout.header, g.district_name, 'District name correct')
        self.assertEqual(callout_addr, district_addr,
                         'District address correct')
        for lang in self.district:
            self.driver.execute_script(SetScripts.set_lang(lang))
            purpose = self.page.addresed_place_callout.purpose
            self.assertEqual(self.district[lang], purpose, 'Purpose correct in ' + lang)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_building_name(self, url):
        """
        :param url: powered by dataprovider decorator
        Building with and without name callout
        """
        self.driver.get(url)
        sleep(2)
        self.driver.execute_script(SetScripts.pan_to(54.9802611969944, 82.89837956428528))
        self.driver.execute_script(SetScripts.set_zoom(18))
        self.page.map_container.center_click()
        center = self.driver.execute_script(GetScripts.getCenter)
        g = GeoData(center, 18)
        sleep(2)
        self.assertTrue(self.page.build_callout.is_visible, 'Build callout present')
        self.assertEqual(g.build_name, self.page.build_callout.header, 'Header text correct')
        self.driver.execute_script(SetScripts.pan_to(54.98511556781472, 82.85259425640108))
        self.page.map_container.center_click()
        center = self.driver.execute_script(GetScripts.getCenter)
        g = GeoData(center, 18)
        sleep(2)
        self.assertEqual(g.build_name, self.page.build_callout.header, 'Header text correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_street_callout(self, url):
        """
        :param url: powered by dataprovider decorator
        Street callout test
        """
        self.driver.get(url)
        sleep(2)
        self.driver.execute_script(SetScripts.pan_to(54.9833825909448, 82.89679169654848))
        self.driver.execute_script(SetScripts.set_zoom(18))
        self.page.map_container.center_click()
        center = self.driver.execute_script(GetScripts.getCenter)
        g = GeoData(center, 18)
        sleep(2)
        self.assertTrue(self.page.addresed_place_callout.is_visible, 'Street callout present')
        self.assertEqual(g.street_name, self.page.addresed_place_callout.header, 'Header text correct')
        self.assertEqual(self.page.addresed_place_callout.drilldown, g.street_address, 'Street address correct')
        for lang in self.street:
            self.driver.execute_script(SetScripts.set_lang(lang))
            self.assertEqual(self.page.addresed_place_callout.purpose, self.street[lang], 'Type place correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_attraction_callout(self, url):
        """
        :param url: powered by dataprovider decorator
        Street callout test
        """
        self.driver.get(url)
        sleep(2)
        self.driver.execute_script(SetScripts.pan_to(54.98127706190138, 82.88240969181062))
        self.driver.execute_script(SetScripts.set_zoom(18))
        self.page.map_container.center_click()
        center = self.driver.execute_script(GetScripts.getCenter)
        g = GeoData(center, 18)
        sleep(2)
        self.assertTrue(self.page.attraction_callout.is_visible, 'Attraction callout present')
        self.assertEqual(g.attraction_name, self.page.attraction_callout.header)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_attraction_text(self, url):
        """
        :param url: powered by dataprovider decorator
        Street callout test
        """
        self.driver.get(url)
        sleep(2)
        self.driver.execute_script(SetScripts.set_zoom(18))
        self.driver.execute_script(SetScripts.pan_to('54.986870015252265', '82.8704744636'))
        sleep(2)
        self.page.map_container.center_click()
        center = self.driver.execute_script(GetScripts.getCenter)
        g = GeoData(center, 18)
        sleep(2)
        self.assertTrue(self.page.attraction_callout_wrapped.is_visible, 'Attraction callout present')
        self.assertEqual(g.attraction_name, self.page.attraction_callout.header)
        self.assertTrue(self.page.attraction_callout_wrapped.wrapper())
        self.assertEqual(g.attraction_description, self.page.attraction_callout_wrapped.text)
        self.page.attraction_callout_wrapped.unwrap()
        self.assertFalse(self.page.attraction_callout_wrapped.wrapper())

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_poi_click(self, url):
        """
        :param url: powered by dataprovider decorator
        POI callout test
        """
        self.driver.get(url)
        sleep(2)
        self.driver.execute_script(SetScripts.set_zoom(18))
        self.driver.execute_script(SetScripts.pan_to('54.98088611087379', '82.89719912975313'))
        sleep(2)
        self.page.map_container.center_click()
        f = FirmData(141265770417218)
        self.assertEqual(self.page.firm_callout.header, f.firm_name)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_poi_gallery_click(self, url):
        """
        :param url: powered by dataprovider decorator
        POI callout test
        """
        self.driver.get(url)
        sleep(2)
        self.driver.execute_script(SetScripts.pan_to('-33.44692090822703', '-70.65750718116762'))
        self.driver.execute_script(SetScripts.set_zoom(19))
        sleep(2)
        self.page.map_container.center_click()
        f = GalleryInfo()
        sleep(3)
        print(f.get(14215121979385186))
        self.assertFalse(True)