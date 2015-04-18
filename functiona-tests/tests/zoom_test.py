# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from time import sleep
from lode_runner.dataprovider import dataprovider
from classes.components.scrips import GetScripts


class ZoomTest(MapsAPIBaseTest):

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomin_click(self, url):
        self.driver.get(url)
        # Ждем инициализацию карты
        sleep(2)
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.zoom_control_in.zoom_in_click()
        zoom_end = self.driver.execute_script("return map.getZoom();")
        self.assertEqual(zoom_end - zoom_start, 1, 'Zoom level changed correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomout_click(self, url):
        self.driver.get(url)
        # Ждем инициализацию карты
        sleep(2)
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.zoom_control_out.zoom_out_click()
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, -1, 'Zoom level changed correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomIn_dbclick(self, url):
        self.driver.get(url)
        # Ждем инициализацию карты
        sleep(2)
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.map_container.center_dbclick()
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, 1, 'Zoom level changed correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomIn_shift_select(self, url):
        self.driver.get(url)
        # Ждем инициализацию карты
        sleep(2)
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.map_container.zoom_selection()
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, 1, 'Zoom level changed correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomIn_shift_select(self, url):
        self.driver.get(url)
        # Ждем инициализацию карты
        sleep(2)
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.map_container.zoom_selection()
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, 1, 'Zoom level changed correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomIn_wheel(self, url):
        self.driver.get(url)
        # Ждем инициализацию карты
        sleep(2)
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.map_container.wheel_zoom(1)
        sleep(1)
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, 1, 'Zoom level changed correct')

    @dataprovider([
        config.aut['local'] + u'/base.html'
    ])
    def test_zoomOut_wheel(self, url):
        self.driver.get(url)
        # Ждем инициализацию карты
        sleep(2)
        zoom_start = self.driver.execute_script(GetScripts.getZoom)
        self.page.map_container.wheel_zoom(-1)
        sleep(1)
        zoom_end = self.driver.execute_script(GetScripts.getZoom)
        self.assertEqual(zoom_end - zoom_start, -1, 'Zoom level changed correct')