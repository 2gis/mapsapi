# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider


class Balloons(MapsAPIBaseTest):
    """
    Тесты балунов
    """
    @dataprovider([
        config.aut['local'] + u'/demo.html'
    ])
    def balloon_to_marker_test(self, url):
        """
        :param url: Адрес страницы
        Проверка появления маркера при закрытии балуна
        1.Кликаем в контрол закрытия балуна
        2.Проверяем видимость маркера
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.callout_crossed.wait_present()
        self.page.callout_crossed.close()
        self.assertTrue(self.page.marker.is_visible)

    def balloon_program_open(self, url):
        """
        :param url: Адрес страницы
        Проверка програмного открытия балуна.
        1.Кликае по кнопке "Открыть балун"
        2.Проверяем что открыт один новый балун
        """
        pass

    def balloon_group_open(self, url):
        """
        :param url:
        Проверка открытия группы балунов
        1.Проверяем количество открытых балунов на карте
        """
        pass

    @dataprovider([
        config.aut['local'] + u'/sprawlingBalloon.html'
    ])
    def balloon_sprawling(self, url):
        """
        :param url: Адрес страницы
        Проверка растягивания балуна с параметром sprawling
        1.Проверяем что балун входит в границу карты
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.driver.find_element_by_css_selector('input#sprawling').click()
        self.assertTrue(False)
