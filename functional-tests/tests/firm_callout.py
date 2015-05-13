# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util import scripts


class FirmCallout(MapsAPIBaseTest):
    """
    Тесты на сallout фирмы
    """
    def firm_name(self):
        """
        Проверка заголовка фирмы
        1.Открываем калаут фирмы
        2.Проверяем заголовок
        """
        pass

    def firm_back_list(self):
        """
        Проверка кнопки назад (в здании с мн. организаций)
        1.Открываем калаут фирмы
        2.Нажимаем назад
        3.Провираем наличие списка организаций
        """
        pass

    def firm_back_build(self):
        """
        Проверка кнопки назад (к зданию)
        1.Открываем калаут фирмы
        2.Нажимаем назад
        3.Провираем наличие колаута здания
        """
        pass

    def firm_route_to(self):
        """
        Проверка ссылки на проехать до
        1.Открываем калаут фирмы
        2.Проверяем атирибут ссылки "Проехать сюда"
        """
        pass

    def firm_photo(self):
        """
        Проверка наличия фото у фирмы
        1.Открыть фирму с фото
        2.Проверить наличие ссылки
        3.Проверить url ссылки
        4.Проверить количество фото
        """
        pass
