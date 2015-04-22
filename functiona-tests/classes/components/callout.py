# -*- coding: utf-8 -*-
from classes.components.component import Component
from classes.util.unescape import unescape_text
from classes.util.decorators import catches_not_found


class Callout(Component):
    selectors = {
        'self': '.leaflet-popup',
        'X': '.leaflet-popup-close-button'
    }


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