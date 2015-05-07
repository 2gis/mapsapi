# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util import scripts
from time import sleep


class Balloons(MapsAPIBaseTest):
    """
    Тесты балунов
    """
    def program_open(self, url):
        """
        :param url: Адрес страницы
        Проверка програмного открытия балуна.
        1.Кликае по кнопке "Открыть балун"
        2.Проверяем что открыт один новый балун
        """
        pass

    def baloon_group(self, url):
        """
        :param url:
        Проверка открытия группы балунов
        1.Проверяем количество открытых балунов на карте
        """
        pass

    @dataprovider([
        config.aut['local'] + u'/sprawlingBaloon.html'
    ])
    def balloon_sprawling(self, url):
        """
        :param url: Адрес страницы
        Проверка растягивания балуна с параметром sprawling
        1.Проверяем что балун входит в границу карты
        """
        self.driver.get(url)
        self.page.map_container.wait_map_init()
        self.driver.find_element_by_css_selector('input#sprawling').click()
        self.assertTrue(False)
