# -*- coding: utf-8 -*-
from classes.components.component import Component
from classes.util.unescape import unescape_text
from classes.util.decorators import catches_not_found
from config import config
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class Callout(Component):
    selectors = {
        'self': '.leaflet-popup',
        'X': '.leaflet-popup-close-button'
    }

    def wait_present(self):
        WebDriverWait(self.driver, config.timeout['normal']).until(
            EC.visibility_of(self.driver.find_element(By.CSS_SELECTOR, self.selectors['self']))
        )


class UnknownPlace(Callout):
    """
    Unknown place callout
    """
    selectors = {
        'self': '.leaflet-popup',
        'header': '.dg-popup__header-title',
        'X': '.leaflet-popup-close-button'
    }

    @property
    def header(self):
        """
        :return: str
        """
        return self.element.find_element_by_css_selector(self.selectors['header']).text.strip()

    def close(self):
        self.element.find_element_by_css_selector(self.selectors['X']).click()


class PlaceCallout(Callout):
    """
    Base place callout (example: city callout)
    """
    selectors = {
        'self': '.leaflet-popup',
        'header': '.dg-popup__header-title',
        'X': '.leaflet-popup-close-button',
        'purpose': '.dg-map-geoclicker__purpose'
    }

    @property
    def header(self):
        """
        :return: str
        """
        return self.element.find_element_by_css_selector(self.selectors['header']).text.strip()

    @property
    def purpose(self):
        """
        :return: str
        """
        return self.element.find_element_by_css_selector(self.selectors['purpose']).text.strip()

    def close(self):
        self.element.find_element_by_css_selector(self.selectors['X']).click()


class AddressPlaceCallout(PlaceCallout):
    """
    Addressed place callout (example: district)
    """
    selectors = {
        'self': '.leaflet-popup',
        'header': '.dg-popup__header-title',
        'X': '.leaflet-popup-close-button',
        'purpose': '.dg-map-geoclicker__purpose',
        'drilldown': '.dg-map-geoclicker__drilldown'
    }

    @property
    def drilldown(self):
        """
        :return: str
        """
        return unescape_text(self.element.find_element_by_css_selector(self.selectors['drilldown']).text.strip())


class AttractionCallout(Callout):
    """
    Attraction callout without text (example: sandboxes, toilets, attractions)
    """
    selectors = {
        'self': '.leaflet-popup',
        'header': '.dg-popup__header-title',
        'X': '.leaflet-popup-close-button',
        'purpose': '.dg-map-geoclicker__purpose'
    }

    @property
    def header(self):
        """
        :return: str
        """
        return self.element.find_element_by_css_selector(self.selectors['header']).text.strip()

    @property
    def purpose(self):
        """
        :return: str
        """
        return self.element.find_element_by_css_selector(self.selectors['purpose']).text.strip()

    def close(self):
        self.element.find_element_by_css_selector(self.selectors['X']).click()


class AttractionCallouttWrapped(AttractionCallout):
    """
    Attraction callout with text (example: monuments etc.)
    """
    selectors = {
        'self': '.leaflet-popup',
        'header': '.dg-popup__header-title',
        'X': '.leaflet-popup-close-button',
        'purpose': '.dg-map-geoclicker__purpose',
        'wrapper': '.dg-map-geoclicker__show-more-sights-link',
        'text': '.dg-map-geoclicker__sight-description'
    }

    @property
    def text(self):
        """
        :return: str
        """
        return self.element.find_element_by_css_selector(self.selectors['text']).text.strip()

    @catches_not_found(False)
    def wrapper(self):
        return self.element.find_element_by_css_selector(self.selectors['wrapper'])

    def unwrap(self):
        self.element.find_element_by_css_selector(self.selectors['wrapper']).click()


class BuildCallout(Callout):
    """
    Base build callout
    """
    selectors = {
        'self': '.leaflet-popup',
        'header': '.dg-popup__header-title',
        'X': '.leaflet-popup-close-button'
    }

    @property
    def header(self):
        """
        :return: str
        """
        return self.element.find_element_by_css_selector(self.selectors['header']).text.strip()

    def close(self):
        self.element.find_element_by_css_selector(self.selectors['X']).click()


class FirmCallout(Callout):
    """
    Firm and common poi callout
    """
    selectors = {
        'self': '.leaflet-popup',
        'header': '.dg-popup__header-title',
        'X': '.leaflet-popup-close-button'
    }

    @property
    def header(self):
        """
        :return: str
        """
        return self.element.find_element_by_css_selector(self.selectors['header']).text.strip()

    def close(self):
        self.element.find_element_by_css_selector(self.selectors['X']).click()