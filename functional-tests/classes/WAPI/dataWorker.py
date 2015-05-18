# -*- coding: utf-8 -*-
from classes.WAPI.request import *
# TODO: Сделать хэлпер для выпиливания html entities из ответа API


class GeoData(object):
    def __init__(self, cords, zoom):
        request = GeoSearch()
        self.response = request.get(cords, zoom)

    def get_value_by_key(self, key_name, key_value, key_return):
        """
        :param key_name: Key name, that want use (example: 'subtype')
        :param key_value: Value that element with key_name should be equal (example: 'city')
        :param key_return: Key name that should be returned (example: 'name')
        :return: string or list (depends on field)
        """
        for elem in self.response['items']:
            if elem.get(key_name) == key_value:
                return elem.get(key_return)

    @property
    def city_name(self):
        return self.get_value_by_key('subtype', 'city', 'name')

    @property
    def district_name(self):
        return self.get_value_by_key('subtype', 'district', 'name')

    @property
    def place_address(self):
        adm_divs = self.get_value_by_key('subtype', 'district', 'adm_div')
        adm_divs.reverse()
        dist_addr = adm_divs.pop(0)['name']
        for div in adm_divs:
            dist_addr = "%s, %s" % (dist_addr, div['name'])
        return dist_addr.replace(u'\xa0', ' ')

    @property
    def build_name(self):
        address_name = self.get_value_by_key('subtype', None, 'address_name')
        building_name = self.get_value_by_key('subtype', None, 'building_name')
        if building_name is None:
            return address_name
        else:
            return building_name

    @property
    def street_name(self):
        return self.get_value_by_key('type', 'street', 'name').replace(u'\xa0', ' ')

    @property
    def street_address(self):
        return self.get_value_by_key('type', 'street', 'adm_div')[0]['name'].replace(u'\xa0', ' ')

    @property
    def attraction_name(self):
        subtype_name = self.get_value_by_key('type', 'attraction', 'subtype_name')
        name = self.get_value_by_key('type', 'attraction', 'name')
        if not name:
            return subtype_name
        else:
            return name

    @property
    def attraction_description(self):
        return self.get_value_by_key('type', 'attraction', 'description')


class FirmData(object):
    def __init__(self, firm_id):
        request = FirmInfo()
        self.response = request.get(firm_id)

    @property
    def firm_name(self):
        return self.response['items'][0]['name']

    @property
    def review_count(self):
        return self.response['items'][0]['reviews']['review_count']

    @property
    def rating(self):
        return self.response['items'][0]['reviews']['rating']

    @property
    def photos(self):
        return self.response['items'][0]['photos']['items']


class GalleryData(object):
    def __init__(self, gallery_id):
        request = GalleryInfo()
        self.response = request.get(gallery_id)

    @property
    def gallery_name(self):
        return self.response['items'][0]['name']
