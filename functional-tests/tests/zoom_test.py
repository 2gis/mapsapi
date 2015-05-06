# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util.scripts import GetScripts


class ZoomTest(MapsAPIBaseTest):

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomin_click(self, url):
        """
        :param url: Адрес страницы
        Проверка контрола зума +.
        1.Получаем зум страницы
        2.Кликаем в контрол +
        3.Проверяем что зум стал на единицу больше
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.zoom_control_in.zoom_in_click()
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, 1)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomout_click(self, url):
        """
        :param url: Адрес страницы
        Проерка контрола зума -.
        1.Получаем зум страницы
        2.Кликаем в контрол -
        3.Проверяем что зум стал на единицу меньше
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.zoom_control_out.zoom_out_click()
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, -1)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomIn_dbclick(self, url):
        """
        :param url: Адрес страницы
        Проверка зума даблкликом.
        1.Получаем зум страницы
        2.Кликаем в контрол -
        3.Проверяем что зум стал на единицу меньше
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.map_container.center_dbclick()
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, 1)

    @dataprovider([
         config.aut['local'] + u'/base.html'
    ])
    def test_zoomIn_shift_select(self, url):
        """
        :param url: Адрес страницы
        Проверка зума селектом с shift.
        1.Получаем зум страницы
        2.Выделяем облость с зажатым shift и отпускаем
        3.Проверяем изменение зума
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.map_container.zoom_selection()
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, 1)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomIn_wheel(self, url):
        """
        :param url: Адрес страницы
        Проверка зума скролом вперед
        1.Получаем зум страницы
        2.Скролим вперед на одно деление увеличивая зум
        3.Проверяем изсенение зума
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.map_container.wheel_zoom(1)
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, 1)

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomOut_wheel(self, url):
        """
        :param url: Адрес страницы
        Проверка зума скролом назад
        1.Получаем зум страницы
        2.Скролим вперед на одно деление уменьшая зум
        3.Проверяем изсенение зума
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.map_container.wheel_zoom(-1)
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, -1)