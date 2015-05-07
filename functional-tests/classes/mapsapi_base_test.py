# -*- coding: utf-8 -*-
from classes.components.page import Page
from contesto.basis.test_case import UnittestContestoTestCase
from config import config


# TODO: Переопределить логгер из contesto, чтоб не падать при пустых логах
class MapsAPIBaseTest(UnittestContestoTestCase):
    def setUp(self):
        super(MapsAPIBaseTest, self).setUp()
        self.page = Page(self.driver)
        if self.driver.browser != 'opera' or self.driver.browser != 'phantomjs':
            self.driver.maximize_window()
        self.driver.set_script_timeout(config.timeout["normal"])
        self._webAPI = None
        self._baseWAPI = None

    def tearDown(self):
        # log.info("JS Errors: %s" % self.driver.js_errors)
        super(MapsAPIBaseTest, self).tearDown()
