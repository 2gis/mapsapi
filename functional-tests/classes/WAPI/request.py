# -*- coding: utf-8 -*-
import urllib2
import urllib
import json
from config import config
from classes.exceptions.exceptions import WebAPIException


class BaseReq(object):

    def __init__(self):
        self.api_url = '%s/%s' % (config.wapi['url'], config.wapi['version'])
        self.base_params = {
            'key': config.wapi['key']
        }

    def request(self, url, params):
        """
        :type url: str or unicode
        :type params: dict
        :rtype: dict
        """
        data = urllib.urlencode(params)
        req = urllib2.Request('%s?%s' % (url, data))  # GET-method
        response = urllib2.urlopen(req).read()
        try:
            result = json.loads(response)
        except ValueError:
            raise WebAPIException('Response not in json')
        else:
            if not result['meta']['code'] == 200 and not result['meta']['code'] == 404:
                raise WebAPIException('Response code is %s, API response:\n%s' % (result['meta']['code'], result))
            return result['result']


class GeoSearch(BaseReq):
    def __init__(self):
        super(GeoSearch, self).__init__()

    def get(self, coord, zoom):
        """
        :param coord: diсt of lat and lng
        :param zoom:  int or str
        :return: dict
        """
        method = '/geo/search'
        params = {
            'key': self.base_params['key'],
            'point': '%s,%s' % (coord['lng'], coord['lat']),
            'zoom_level': str(zoom),
            'fields': 'items.geometry.selection,items.links,items.adm_div,items.address,items.floors,items.description',
            'type': 'adm_div.settlement,adm_div.city,adm_div.division,adm_div.district,'
                    'street,building,adm_div.place,poi,attraction'
        }
        url = self.api_url + method
        return self.request(url, params)


class FirmList(BaseReq):
    def __init__(self):
        super(FirmList, self).__init__()

    def get(self, build_id, page=1):
        """
        :param build_id: int or str
        :param page:  int or str
        :return: dict
        """
        method = '/catalog/branch/list'
        params = {
            'key': self.base_params['key'],
            'building_id': str(build_id),
            'page': str(page)
        }
        url = "%s%s" % (self.api_url, method)
        return self.request(url, params)


class FirmInfo(BaseReq):
    def __init__(self):
        super(FirmInfo, self).__init__()

    def get(self, firm_id):
        """
        :param firm_id: int or str
        :return: dict
        """
        method = '/catalog/branch/get'
        params = {
            'key': self.base_params['key'],
            'id': str(firm_id),
            'type': 'filial',
            'fields': 'items.reviews,items.links,items.external_content'
        }
        url = "%s%s" % (self.api_url, method)
        return self.request(url, params)


class GalleryInfo(BaseReq):
    def __init__(self):
        super(GalleryInfo, self).__init__()

    def get(self, id):
        """
        :param id: int or str
        :return: dict
        """
        method = '/geo/get'
        params = {
            'key': self.base_params['key'],
            'id': str(id),
            'type': 'filial',
            'fields': 'items.geometry.selection,items.links,items.adm_div,items.address,items.floors,items.description'
        }
        url = "%s%s" % (self.api_url, method)
        return self.request(url, params)
