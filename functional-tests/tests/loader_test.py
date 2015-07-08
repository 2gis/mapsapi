# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util.scripts import SetScripts


class LoaderTest(MapsAPIBaseTest):
    """
    Тесты параметров лоадера mapsapi
    """
    @dataprovider([
        (config.aut['local'] + u'/lazyLoad.html')
    ])
    def loader_dg_then_add_app_test(self, url):
        """
        :param url: Адрес страницы
        Тест на проверку ленивой загрузки
        1.Открываем страницу
        2.Проверяем отсутсвие скрипта
        3.Выполняем DG.then
        4.Проверяем наличие скрипта
        """
        self.driver.get(url)
        self.assertTrue(not self.page.sources.app_js_present)
        self.driver.execute_script(SetScripts.dg_then())
        self.assertTrue(self.page.sources.app_js_present)

    @dataprovider([
        (config.aut['local'] + u'/notLazyLoad.html')
    ])
    def loader_lazy_false_add_app_test(self, url):
        """
        :param url: Адрес страницы
        Тест на проверку ленивой загрузки
        1.Открываем страницу
        4.Проверяем наличие скрипта
        """
        self.driver.get(url)
        self.assertTrue(self.page.sources.app_js_present)
