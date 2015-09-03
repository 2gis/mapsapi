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
        'X': '.leaflet-popup-close-button',
        'firm': '.dg-popup__link',
        'firm_list': '.dg-popup__button_name_all'
    }
    # TODO добавить конструктор route-ссылок

    @property
    def header(self):
        """
        :return: str
        """
        return self.element.find_element_by_css_selector(self.selectors['header']).text.strip()

    def open_firm_by_index(self, index):
        self.driver.find_elements_by_css_selector(self.selectors['firm'])[index].click()

    @catches_not_found()
    def open_firm_list(self):
        self.driver.find_element_by_css_selector(self.selectors['firm_list']).click()

    @catches_not_found()
    def open_firm_by_id(self, firm_id):
        self.driver.find_element_by_id(str(firm_id)).click()


class FirmList(Callout):
    """
    Firm list callout
    """
    selectors = {
        'self': '.leaflet-popup',
        'header': '.dg-popup__header-title',
        'X': '.leaflet-popup-close-button',
        'list': '.dg-building-callout__list'
    }

    def list_present(self):
        return self.driver.find_element_by_css_selector(self.selectors['list']).is_displayed()


class Firm(Callout):
    """
    Firm and common poi callout
    """
    selectors = {
        'self': '.leaflet-popup',
        'header': '.dg-popup__header-title',
        'X': '.leaflet-popup-close-button',
        'photo': '.dg-popup__link_type_photos',
        'reviews': '.dg-popup__link_type_flamp_reviews',
        'stars': '.dg-popup__rating-stars',
        'back': '.dg-popup__button_name_firm-card-back',
        'route': '.dg-popup__button_name_goto',
        'address': '.dg-firm-card__address',
        'phones': '.dg-firm-card__phone-num',
        'websites': '.dg-firm-card__site',
        'email': '.dg-firm-card__email > a',
        'primary': '.dg-firm-card__rubrics-list_type_primary > .dg-firm-card__rubrics-list-item',
        'additional': '.dg-firm-card__rubrics-list_type_additional > .dg-firm-card__rubrics-list-item'
    }

    @property
    def callout(self):
        return self.driver.find_element_by_css_selector(self.selectors['self'])

    @property
    def header(self):
        """
        :return: str
        """
        return self.element.find_element_by_css_selector(self.selectors['header']).text.strip()

    @property
    @catches_not_found()
    def photo(self):
        """
        :return: web_element
        """
        return self.element.find_element_by_css_selector(self.selectors['photo'])

    @property
    @catches_not_found()
    def reviews(self):
        """
        :return: web_element
        """
        return self.element.find_element_by_css_selector(self.selectors['reviews'])

    @property
    @catches_not_found()
    def stars(self):
        """
        :return: web_element
        """
        return self.element.find_element_by_css_selector(self.selectors['stars'])

    @catches_not_found()
    def back(self):
        return self.element.find_element_by_css_selector(self.selectors['back']).click()

    @property
    def route_link(self):
        return self.element.find_element_by_css_selector(self.selectors['route'])

    @property
    def address(self):
        return self.driver.find_element_by_css_selector(self.selectors['address'])

    def phones(self):
        return self.driver.find_elements_by_css_selector(self.selectors['phones'])

    def websites(self):
        return self.driver.find_elements_by_css_selector(self.selectors['websites'])

    @property
    def email(self):
        return self.driver.find_element_by_css_selector(self.selectors['email'])

    @property
    def primary_rubrics(self):
        return self.driver.find_elements_by_css_selector(self.selectors['primary'])

    @property
    def additional_rubrics(self):
        return self.driver.find_elements_by_css_selector(self.selectors['additional'])
