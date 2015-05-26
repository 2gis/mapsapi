# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util.scripts import SetScripts
from classes.util import misc


class EventHandlers(MapsAPIBaseTest):
    @dataprovider([
        (config.aut['local'] + u'/clickEvent.html')
    ])
    def click_marker_test(self, url):
        """
        Проверка события click для маркера
        :param url: Адрес страницы
        1.Открываем страницу
        2.Кликаем в маркер
        3.Проверяем содержимое info
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.marker.click()
        info = self.page.map.info_elem()
        self.assertEqual(info.text, 'marker')

    @dataprovider([
        (config.aut['local'] + u'/clickEvent.html', {'lat': 54.99, 'lng': 82.73})
    ])
    def click_map_test(self, url, point):
        """
        Проверка события click для карты
        :param url: Адрес страницы
        :param point: Координаты на карте
        1.Открываем страницу
        2.Кликаем в координаты
        3.Проверяем содержимое info
        """
        self.driver.get(url)
        self.page.map.wait_init()
        info = self.page.map.info_elem()
        self.page.console(SetScripts.set_zoom(17))
        self.page.console(SetScripts.pan_to(point['lat'], point['lng']))
        self.page.map.center_click()
        self.assertEqual(info.text.split(' ')[0], 'map')
        coords = misc.coord_string_to_dict(info.text[4:])
        self.assertTrue(misc.coord_equals(point, coords, 2))

    @dataprovider([
        (config.aut['local'] + u'/clickEvent.html', {'lat': 54.985, 'lng': 82.911})
    ])
    def click_polygon_test(self, url, point):
        """
        Проверка события click для карты
        :param url: Адрес страницы
        :param point: Координаты на карте внутри полигона
        1.Открываем страницу
        2.Кликаем в координаты
        3.Проверяем содержимое info
        """
        self.driver.get(url)
        self.page.map.wait_init()
        info = self.page.map.info_elem()
        self.page.console(SetScripts.set_zoom(17))
        self.page.console(SetScripts.pan_to(point['lat'], point['lng']))
        self.page.map.center_click()
        self.assertEqual(info.text, 'polygon')
