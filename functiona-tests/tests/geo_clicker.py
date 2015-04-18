# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from time import sleep
from lode_runner.dataprovider import dataprovider
from classes.components.scrips import SetScripts
from classes.WAPI.dataWorker import GeoData
from classes.components.scrips import GetScripts
from difflib import Differ

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
    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_unknown_place(self, url):
        self.driver.get(url)
        # Ждем инициализацию карты
        sleep(2)
        self.driver.execute_script(SetScripts.pan_to(54.98, 82.32))
        sleep(1)
        self.page.map_container.center_click()
        sleep(2)
        self.assertEqual(True, self.page.unkown_place.is_visible, 'Unknown place card present')
        for lang in self.not_found:
            self.driver.execute_script(SetScripts.set_lang(lang))
            header = self.page.unkown_place.header
            self.assertEqual(self.not_found[lang], header, 'Unknown place content correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_city_place(self, url):
        self.driver.get(url)
        sleep(2)
        self.driver.execute_script(SetScripts.set_zoom(8))
        center = self.driver.execute_script(GetScripts.getCenter)
        g = GeoData(center, 8)
        self.page.map_container.center_click()
        sleep(2)
        self.assertEqual(self.page.place_callout.header, g.city_name(), 'City name correct')
        for lang in self.city:
            self.driver.execute_script(SetScripts.set_lang(lang))
            purpose = self.page.place_callout.purpose
            self.assertEqual(self.city[lang], purpose, 'Purpose correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_district_place(self, url):
        self.driver.get(url)
        sleep(2)
        center = self.driver.execute_script(GetScripts.getCenter)
        self.page.map_container.center_click()
        zoom = self.driver.execute_script(GetScripts.getZoom)
        g = GeoData(center, zoom)
        print(self.page.addresed_place_cllout.drilldown)
        print(g.district_address())
        self.assertEqual(self.page.addresed_place_cllout.header, g.district_name(), 'District name correct')
        #self.assertEqual(self.page.addresed_place_cllout.drilldown, g.district_address(), 'District address correct')
        for lang in self.district:
            self.driver.execute_script(SetScripts.set_lang(lang))
            purpose = self.page.addresed_place_cllout.purpose
            print(purpose)
            print(self.district[lang])
            self.assertEqual(self.district[lang], purpose, 'Purpose correct in ' + lang)