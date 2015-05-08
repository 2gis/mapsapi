# -*- coding: utf-8 -*-
from classes.util.unescape import unescape_text
from classes.util.decorators import catches_not_found
from classes.components.balloon import BalloonCrossed


class Callout(BalloonCrossed):
    pass


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


class Place(Callout):
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


class AddressPlace(Place):
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


class Attraction(Callout):
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


class AttractionWrapped(Attraction):
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


class Build(Callout):
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


class Firm(Callout):
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
