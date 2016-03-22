# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util.scripts import GetScripts


class Zoom(MapsAPIBaseTest):

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def zoomIn_click_test(self, url):
        """
        :param url: Адрес страницы
        Проверка контрола зума +.
        1.Получаем зум страницы
        2.Кликаем в контрол +
        3.Проверяем что зум стал на единицу больше
        """
        self.driver.get(url)
        self.page.map.wait_init()
        zoom_start = self.page.console(GetScripts.getZoom)
        self.page.zoom_control_in.zoom_in_click()
        zoom_end = self.page.console(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, 1)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def zoomOut_click_test(self, url):
        """
        :param url: Адрес страницы
        Проерка контрола зума -.
        1.Получаем зум страницы
        2.Кликаем в контрол -
        3.Проверяем что зум стал на единицу меньше
        """
        self.driver.get(url)
        self.page.map.wait_init()
        zoom_start = self.page.console(GetScripts.getZoom)
        self.page.zoom_control_out.zoom_out_click()
        zoom_end = self.page.console(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, -1)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def zoomIn_dbclick_test(self, url):
        """
        :param url: Адрес страницы
        Проверка зума даблкликом.
        1.Получаем зум страницы
        2.Кликаем в контрол -
        3.Проверяем что зум стал на единицу меньше
        """
        self.driver.get(url)
        self.page.map.wait_init()
        zoom_start = self.page.console(GetScripts.getZoom)
        self.page.map.center_dbclick()
        zoom_end = self.page.console(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, 1)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def zoomIn_shift_select_test(self, url):
        """
        :param url: Адрес страницы
        Проверка зума селектом с shift.
        1.Получаем зум страницы
        2.Выделяем облость с зажатым shift и отпускаем
        3.Проверяем изменение зума
        """
        self.driver.get(url)
        self.page.map.wait_init()
        zoom_start = self.page.console(GetScripts.getZoom)
        self.page.map.zoom_selection()
        zoom_end = self.page.console(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, 1)
