# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util import scripts


class Ruler(MapsAPIBaseTest):
    """
    Тесты на линейку
    """
    def ruler_control(self):
        """
        Проверка контрола линеки
        1.Кликаем в контрол линейки
        2.Кликаем в центр карты
        3.Проверяем наличие маркера линейки
        4.Кликаем в контрол линейки
        5.Проверяем отсутсвие маркера линейки
        """
        pass
