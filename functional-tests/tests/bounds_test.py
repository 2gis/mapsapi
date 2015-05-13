# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util import scripts


class Bounds(MapsAPIBaseTest):
    """
    Тесты на ограничение зума и границ
    """
    @dataprovider([
        config.aut['local'] + u'/boundsNsk.html'
    ])
    def bound_min_zoom_script_test(self, url):
        """
        :param url: Адрес страницы
        Проверка ограничения минимального зума
        1.Выставляем зум меньше ограничения
        2.Проверяем что зум равен ограничению
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(scripts.SetScripts.set_zoom(9))
        zoom = self.page.console(scripts.GetScripts.getZoom)
        self.assertEqual(10, zoom)

    @dataprovider([
        config.aut['local'] + u'/boundsNsk.html'
    ])
    def bound_max_zoom_script_test(self, url):
        """
        :param url: Адрес страницы
        Проверка ограничения максимального зума
        1.Выставляем зум больше ограничения
        2.Проверяем что зум равен ограничению
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(scripts.SetScripts.set_zoom(16))
        zoom = self.page.console(scripts.GetScripts.getZoom)
        self.assertEqual(15, zoom)

    @dataprovider([
        config.aut['local'] + u'/boundsNsk.html'
    ])
    def bound_max_zoom_control_test(self, url):
        """
        :param url: Адрес страницы
        Проверка ограничения максимального зума
        1.Выставляем зум равный ограничению
        2.Кликаем в контрол zoom in
        3.Проверяем что зум равен ограничению
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(scripts.SetScripts.set_zoom(15))
        self.page.zoom_control_in.zoom_in_click()
        zoom = self.page.console(scripts.GetScripts.getZoom)
        self.assertEqual(15, zoom)

    @dataprovider([
        config.aut['local'] + u'/boundsNsk.html'
    ])
    def bound_min_zoom_control_test(self, url):
        """
        :param url: Адрес страницы
        Проверка ограничения минимального зума
        1.Выставляем зум равный ограничения
        2.Кликаем
        3.Проверяем что зум равен ограничению
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(scripts.SetScripts.set_zoom(10))
        self.page.zoom_control_out.zoom_out_click()
        zoom = self.page.console(scripts.GetScripts.getZoom)
        self.assertEqual(10, zoom)
