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
        self.page.balloon_crossed.wait_present()
        self.page.balloon_crossed.close()
        self.assertTrue(self.page.marker.is_visible)

    @dataprovider([
        config.aut['local'] + u'/openBalloons.html'
    ])
    def balloon_default_open_test(self, url):
        """
        :param url: Адрес страницы
        Проверка програмного открытия балуна.
        1.Проверяем что открыт балун по умолчанию
        """
        self.driver.get(url)
        self.page.map.wait_init()
        balloon_text = self.page.balloon.get_content().text
        self.assertEqual('default', balloon_text)

    @dataprovider([
        config.aut['local'] + u'/openBalloons.html'
    ])
    def balloon_program_open_test(self, url):
        """
        :param url: Адрес страницы
        Проверка програмного открытия балуна.
        1.Проверяем что открыт балун по умолчанию
        2.Кликаем по кнопке "Открыть балун"
        3.Проверяем что открыт один новый балун
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.driver.find_element_by_css_selector('#showPopup').click()
        self.page.balloon.wait_close()
        self.page.balloon.wait_present()
        balloon = self.page.balloon.get_content()
        self.assertEqual(1, self.page.balloon.count())
        self.assertEqual('request', balloon.text)

    @dataprovider([
        config.aut['local'] + u'/groupBalloon.html'
    ])
    def balloon_group_open_test(self, url):
        """
        :param url:
        Проверка открытия группы балунов
        1.Проверяем количество открытых балунов на карте
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.balloon.wait_present()
        self.assertEqual(10, self.page.balloon.count())

    @dataprovider([
        (config.aut['local'] + u'/sprawlingBalloon.html', 'large', '350px'),
        (config.aut['local'] + u'/sprawlingBalloon.html', 'mid', '290px'),
        (config.aut['local'] + u'/sprawlingBalloon.html', 'small', '190px'),
    ])
    def balloon_sprawling_test(self, url, size, width):
        """
        :param url: Адрес страницы
        :param size: Размер карты(large - 500px, mid - 300px, small - 200px)
        :param width: Ширина балуна
        Проверка размера балуна с параметром sprawling на карте
        1.Выставляем размер карты
        2.Кликаем в создать балун
        3.Проверяем ширину
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.driver.find_element_by_css_selector("input#%s" % size).click()
        self.driver.find_element_by_css_selector('input#sprawling').click()
        balloon_width = self.page.balloon.width
        self.assertEqual(balloon_width, width)

    @dataprovider([
        (config.aut['local'] + u'/sprawlingBalloon.html', 'small', 'large', '350px'),
        (config.aut['local'] + u'/sprawlingBalloon.html', 'small', 'mid', '290px'),
        (config.aut['local'] + u'/sprawlingBalloon.html', 'large', 'small', '190px'),
    ])
    def balloon_sprawling_resize_test(self, url, start, end, width):
        """
        :param url: Адрес страницы
        :param start: С какого размера переключаемся (размеры в описаны balloon_sprawling_test)
        :param end: На какой переключаемся
        :param width: Какой размер должен принять балун
        Проверка размера балуна с параметром sprawling на большой карте
        1.Выставляем ширину карты
        2.Создаем балун
        3.Меняем ширину карты
        4.Приверяем ширину балуна
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.driver.find_element_by_css_selector("input#%s" % start).click()
        self.driver.find_element_by_css_selector('input#sprawling').click()
        self.driver.find_element_by_css_selector("input#%s" % end).click()
        balloon_width = self.page.balloon.width
        self.assertEqual(balloon_width, width)

    @dataprovider([
        (config.aut['local'] + u'/scrollBarBalloon.html', 'scrollBar', True),
        (config.aut['local'] + u'/scrollBarBalloon.html', 'noMaxHeight', False),
        (config.aut['local'] + u'/scrollBarBalloon.html', 'noScrollBar', False),
    ])
    def balloon_scroll_bar_test(self, url, type_, scroll_bar):
        """
        Проверка скроллбара
        :param url: Адрес страницы
        :param type_: Какой балун
        :param scroll_bar: Есть ли скролбар
        1.Кликаем в создать балун
        2.Проверяем наличие скролбара
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.driver.find_element_by_css_selector("input#%s" % type_).click()

        self.assertEqual(bool(self.page.balloon.scroll), scroll_bar)

    @dataprovider([
        (config.aut['local'] + u'/scrollBarBalloon.html', 'scrollBar', 300),
        (config.aut['local'] + u'/scrollBarBalloon.html', 'noScrollBar', 240),
    ])
    def balloon_max_height_test(self, url, type_, height):
        """
        Проверка скроллбара
        :param url: Адрес страницы
        :param type_: Какой балун
        :param height: Высота
        1.Кликаем в создать балун
        2.Проверяем высоту балуна
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.driver.find_element_by_css_selector("input#%s" % type_).click()

        balloon_height = self.page.balloon.height
        self.assertEqual(balloon_height, "%dpx" % height)
