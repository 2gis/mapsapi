# -*- coding: utf-8 -*-
from classes.components.component import Component
from config import config
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import time
from contesto.exceptions import ElementNotFound
from time import sleep
from classes.util.decorators import catches_not_found


class Balloon(Component):
    selectors = {
        'self': '.leaflet-popup',
        'content': '.dg-popup__container',
        'scroll': '.dg-scroller__bar'
    }

    def wait_present(self):
        WebDriverWait(self.driver, config.timeout['normal']).until(
            EC.visibility_of(self.driver.find_element(By.CSS_SELECTOR, self.selectors['self']))
        )

    def wait_close(self, timeout=0.5, polling=0.1):
        start = time()
        end = start + timeout
        present = True
        step = start + polling
        while time() < end and present:
            if time() > step:
                step += polling
                try:
                    self.driver.find_element_by_css_selector(['self'])
                except ElementNotFound:
                    present = False
            else:
                sleep(polling)

    def count(self):
        return len(self.driver.find_elements_by_css_selector(self.selectors['self']))

    def get_content(self):
        return self.driver.find_element_by_css_selector(self.selectors['content'])

    @property
    def width(self):
        return self.driver.find_element_by_css_selector(self.selectors['self']).value_of_css_property('width')

    @property
    def height(self):
        return self.driver.find_element_by_css_selector(self.selectors['self']).value_of_css_property('height')

    @property
    @catches_not_found()
    def scroll(self):
        return self.driver.find_element_by_css_selector(self.selectors['scroll'])


class BalloonCrossed(Balloon):
    selectors = {
        'self': '.leaflet-popup',
        'header': '.dg-popup__header-title',
        'X': '.leaflet-popup-close-button'
    }

    def close(self):
        self.element.find_element_by_css_selector(self.selectors['X']).click()
