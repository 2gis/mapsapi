from classes.WAPI.request import GeoSearch


class GeoData(object):
    def __init__(self, cords, zoom):
        request = GeoSearch()
        self.response = request.get(cords, zoom)

    def city_name(self):
        for elem in self.response['items']:
            if elem['subtype'] == u'city':
                return elem['name']

    def district_name(self):
        for elem in self.response['items']:
            if elem['subtype'] == u'district':
                return elem['name']

    def district_address(self):
        for elem in self.response['items']:
            if elem['subtype'] == u'district':
                elem['adm_div'].reverse()
                dist_addr = elem['adm_div'].pop(0)['name']
                for div in elem['adm_div']:
                    dist_addr = dist_addr + ', ' + div['name']
                return dist_addr

    def build_name(self):
        for elem in self.response['items']:
            if elem.get('subtype') is None:
                if elem.get('building_name') is None:
                    return elem['address_name']
                else:
                    return elem['building_name']
