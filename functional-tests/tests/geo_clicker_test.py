# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util.scripts import SetScripts
from classes.util.scripts import GetScripts
from classes.WAPI.dataWorker import GeoData
from classes.WAPI.dataWorker import FirmData
from classes.WAPI.dataWorker import GalleryData


class GeoClicker(MapsAPIBaseTest):
    """
    Тесты геокликера.
    В данных тестах проверяется открытие нужных колаутов в соответствии с координатами и зумом.
    Кроме того для описания переводов используются словари с ключами языков.
    """
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
        'en': u"District",
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
        (config.aut['local'] + u'/base.html', 54.98, 82.32)
    ])
    def callout_unknown_place_test(self, url, lat, lng):
        """
        :param url: Адрес страницы
        :param lat: Широта
        :param lng: Долгота
        Тест на проверку колаута неизвестного места.
        1.Перемещаемся к координатам
        2.Кликаем в центр
        3.Проверяем открытие калаута
        4.Проверяем содержимое колаута для всех языков
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.driver.execute_script(SetScripts.pan_to(lat, lng))
        self.page.map.center_click()
        self.page.unkown_place.wait_present()
        self.assertTrue(self.page.unkown_place.is_visible)
        for lang in self.not_found:
            self.driver.execute_script(SetScripts.set_lang(lang))
            header = self.page.unkown_place.header
            self.assertEqual(self.not_found[lang], header)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def callout_city_place_test(self, url):
        """
        :param url: Адрес страницы
        Тест на проверку колаута города.
        1.Изменяем изначальный зум к 8
        2.Кликаем в центр
        3.Проверяем открытие калаута
        4.Проверяем название города
        5.Проверяем информацию о геообъекте на всех языках
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.driver.execute_script(SetScripts.set_zoom(8))
        center = self.driver.execute_script(GetScripts.getCenter)
        g = GeoData(center, 8)
        self.page.map.center_click()
        self.page.place_callout.wait_present()
        self.assertEqual(self.page.place_callout.header, g.city_name)
        for lang in self.city:
            self.driver.execute_script(SetScripts.set_lang(lang))
            purpose = self.page.place_callout.purpose
            self.assertEqual(self.city[lang], purpose)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def callout_district_place_test(self, url):
        """
        :param url: Адрес страницы
        Тест на проверку колаута района.
        1.Кликаем в центр
        2.Проверяем открытие калаута
        3.Проверяем название района
        4.Проверяем адрес района
        5.Проверяем информацию о геообъекте на всех языках
        """
        self.driver.get(url)
        self.page.map.wait_init()
        center = self.driver.execute_script(GetScripts.getCenter)
        self.page.map.center_click()
        self.page.addresed_place_callout.wait_present()
        zoom = self.driver.execute_script(GetScripts.getZoom)
        g = GeoData(center, zoom)
        district_addr = g.place_address
        callout_addr = self.page.addresed_place_callout.drilldown
        self.assertEqual(self.page.addresed_place_callout.header, g.district_name)
        self.assertEqual(callout_addr, district_addr)
        for lang in self.district:
            self.driver.execute_script(SetScripts.set_lang(lang))
            purpose = self.page.addresed_place_callout.purpose
            self.assertEqual(self.district[lang], purpose)

    @dataprovider([
        (config.aut['local'] + u'/base.html', 54.9802611969944, 82.89837956428528)

    ])
    def callout_building_name_test(self, url, lat, lng):
        """
        :param url: Адрес страницы
        :param lat: Широта
        :param lng: Долгота
        Проверка здания с названием.
        1.Перемещаемся к координатам
        2.Изменяем изначальный зум к 18
        3.Кликаем в центр
        4.Проверяем наличие названия в заголовке
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.driver.execute_script(SetScripts.pan_to(lat, lng))
        self.driver.execute_script(SetScripts.set_zoom(18))
        self.page.map.center_click()
        center = self.driver.execute_script(GetScripts.getCenter)
        self.page.build_callout.wait_present()
        g = GeoData(center, 18)
        self.assertEqual(g.build_name, self.page.build_callout.header)

    @dataprovider([
        (config.aut['local'] + u'/base.html', 54.98511556781472, 82.85259425640108)

    ])
    def callout_building_without_name_test(self, url, lat, lng):
        """
        :param url: Адрес страницы
        :param lat: Широта
        :param lng: Долгота
        Проверка здания без названия.
        1.Перемещаемся к координатам
        2.Изменяем изначальный зум к 18
        3.Кликаем в центр
        4.Проверяем наличие адреса в заголовке
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(SetScripts.set_zoom(18))
        self.page.console(SetScripts.pan_to(lat, lng))
        self.page.map.center_click()
        center = self.page.console(GetScripts.getCenter)
        g = GeoData(center, 18)
        self.page.build_callout.wait_present()
        self.assertEqual(g.build_name, self.page.build_callout.header)

    @dataprovider([
        (config.aut['local'] + u'/base.html', 54.98127706190138, 82.88240969181062)
    ])
    def callout_attraction_test(self, url, lat, lng):
        """
        :param url: Адрес страницы
        :param lat: Широта
        :param lng: Долгота
        Проверка калаута достопремичательности.
        1.Перемещаемся к координатам
        2.Изменяем изначальный зум к 18
        3.Кликаем в центр
        4.Проверяем наличие калаута
        6.Проверяем заголовок калаута
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(SetScripts.pan_to(lat, lng))
        self.page.console(SetScripts.set_zoom(18))
        self.page.map.center_click()
        self.page.attraction_callout.wait_present()
        center = self.page.console(GetScripts.getCenter)
        g = GeoData(center, 18)
        self.assertTrue(self.page.attraction_callout.is_visible)
        self.assertEqual(g.attraction_name, self.page.attraction_callout.header)

    @dataprovider([
        (config.aut['local'] + u'/base.html', 54.9833825909448, 82.89679169654848)
    ])
    def callout_street_test(self, url, lat, lng):
        """
        :param url: Адрес страницы
        :param lat: Широта
        :param lng: Долгота
        Проверка калаута улицы.
        1.Перемещаемся к координатам
        2.Изменяем изначальный зум к 18
        3.Кликаем в центр
        4.Проверяем наличие калаута
        5.Проверяем название улицы
        6.Проверяем расположение улицы
        7.Проверяем информацию о геообъекте на всех языках
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(SetScripts.pan_to(lat, lng))
        self.page.console(SetScripts.set_zoom(18))
        self.page.map.center_click()
        center = self.page.console(GetScripts.getCenter)
        g = GeoData(center, 18)
        self.page.addresed_place_callout.wait_present()
        self.assertTrue(self.page.addresed_place_callout.is_visible)
        self.assertEqual(g.street_name, self.page.addresed_place_callout.header)
        self.assertEqual(self.page.addresed_place_callout.drilldown, g.street_address)
        for lang in self.street:
            self.page.console(SetScripts.set_lang(lang))
            self.assertEqual(self.page.addresed_place_callout.purpose, self.street[lang])

    @dataprovider([
        (config.aut['local'] + u'/base.html', '54.986870015252265', '82.8704744636')
    ])
    def callout_attraction_text_test(self, url, lat, lng):
        """
        :param url: Адрес страницы
        :param lat: Широта
        :param lng: Долгота
        Проверка калаута памятника с текстом.
        1.Перемещаемся к координатам
        2.Изменяем изначальный зум к 18
        3.Кликаем в центр
        4.Проверяем наличие калаута
        6.Проверяем заголовок калаута
        7.Проверяем наличие враппера
        8.Проверяем текст
        9.Кликаем во враппер
        10.Проверяем отсутствие враппера
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(SetScripts.set_zoom(18))
        self.page.console(SetScripts.pan_to(lat, lng))
        self.page.map.center_click()
        self.page.attraction_callout_wrapped.wait_present()
        center = self.page.console(GetScripts.getCenter)
        g = GeoData(center, 18)
        self.assertTrue(self.page.attraction_callout_wrapped.is_visible)
        self.assertEqual(g.attraction_name, self.page.attraction_callout.header)
        self.assertTrue(self.page.attraction_callout_wrapped.wrapper())
        self.assertEqual(g.attraction_description, self.page.attraction_callout_wrapped.text)
        self.page.attraction_callout_wrapped.unwrap()
        self.assertFalse(self.page.attraction_callout_wrapped.wrapper())

    @dataprovider([
        (config.aut['local'] + u'/base.html', '54.98088611087379', '82.89719912975313', 141265770417218)
    ])
    def callout_poi_test(self, url, lat, lng, firm_id):
        """
        :param url: Адрес страницы
        :param lat: Широта
        :param lng: Долгота
        :param firm_id:
        Проверка калаута POI.
        1.Перемещаемся к координатам
        2.Изменяем изначальный зум к 18
        3.Кликаем в центр
        4.Проверяем наличие калаута
        6.Проверяем заголовок калаута
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(SetScripts.set_zoom(18))
        self.page.console(SetScripts.pan_to(lat, lng))
        self.page.map.center_click()
        self.page.firm_callout.wait_present()
        f = FirmData(firm_id)
        self.assertEqual(self.page.firm_callout.header, f.firm_name)

    @dataprovider([
        (config.aut['local'] + u'/base.html', '-33.44692090822703', '-70.65750718116762', 14215121979385186)
    ])
    def callout_poi_gallery_test(self, url, lat, lng, firm_id):
        """
        :param url: Адрес страницы
        :param lat: Широта
        :param lng: Долгота
        :param firm_id:
        Проверка калаута памятника с текстом.
        1.Перемещаемся к координатам
        2.Изменяем изначальный зум к 18
        3.Кликаем в центр
        4.Проверяем наличие калаута
        6.Проверяем заголовок калаута
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(SetScripts.pan_to(lat, lng))
        self.page.console(SetScripts.set_zoom(19))
        self.page.map.center_click()
        self.page.build_callout.wait_present()
        g = GalleryData(firm_id)
        self.assertEqual(self.page.build_callout.header, g.gallery_name)
