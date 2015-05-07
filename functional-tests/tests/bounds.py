# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util import scripts
from time import sleep


class Bounds(MapsAPIBaseTest):
    """
    Тесты на ограничение зума и границ
    """
    def zoom_bound_min(self, url):
        """
        :param url: Адрес страницы
        Проверка ограничения минимального зума
        1.Выставляем зум меньше ограничения
        2.Проверяем что зум равен ограничению
        """
        pass

    def zoom_bound_max(self, url):
        """
        :param url: Адрес страницы
        Проверка ограничения максимального зума
        1.Выставляем зум больше ограничения
        2.Проверяем что зум равен ограничению
        """
        pass

    def side_bound(self, url):
        """
        :param url: Адрес страницы
        Проверка ограничения границ
        1.Драгаем карту за границу
        2.Проверяем что центр карты в границе
        """
        pass
