# -*- coding: utf-8 -*-
from classes.components.component import Component
from config import config
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class Balloon(Component):
    selectors = {
        'self': '.leaflet-popup'
    }

    def wait_present(self):
        WebDriverWait(self.driver, config.timeout['normal']).until(
            EC.visibility_of(self.driver.find_element(By.CSS_SELECTOR, self.selectors['self']))
        )


class BalloonCrossed(Balloon):
    selectors = {
        'self': '.leaflet-popup',
        'header': '.dg-popup__header-title',
        'X': '.leaflet-popup-close-button'
    }

    def close(self):
        self.element.find_element_by_css_selector(self.selectors['X']).click()
