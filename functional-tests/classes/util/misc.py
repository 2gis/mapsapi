# -*- coding: utf-8 -*-
import urllib


def extend(extension, base):
    """
    :param base: dict of dicts
    :param extension: dict
    :return: dict
    Extend each base dict from key of extension
    """
    for part in base:
        for default_prop in extension:
            if default_prop not in base[part]:
                base[part][default_prop] = extension[default_prop]
    return base


def comment_equals(comment, wapi_comment):
    """
    :type comment: str or unicode
    :type wapi_comment: str or unicode
    :rtype: bool
    """
    return comment == '— '.decode('utf-8') + wapi_comment


def unicode_print(s):
    """
    Prints unicode strings
    :type s: unicode
    """
    s = to_unicode(s)
    print u'%s' % s,


def to_unicode(s):
    """
    Converts string to unicode if necessary
    :type s: str or unicode
    :rtype: unicode
    """
    try:
        s = str(s)
        return s.decode('utf-8')
    except UnicodeEncodeError:
        return s


def rprint(item):
    """
    Prints list or dict recursively.
    :type item: list, dict
    """
    if isinstance(item, list):
        print '[',
        for i in item:
            rprint(i)
            print ', ',
        print ']',
    elif isinstance(item, dict):
        print '{',
        for key, val in item.iteritems():
            unicode_print(key)
            print ': ',
            rprint(val)
            print ', ',
        print '}',
    else:
        unicode_print(item)


class AttrDict(dict):
    """
    Wraps a dict object or literal to access values like object properties:
    my_dict = AttrDict( {'a': 1} )
    assert my_dict.a == 1
    """
    def __init__(self, *args, **kwargs):
        super(AttrDict, self).__init__(*args, **kwargs)
        self.__dict__ = self


def to_str(s):
    """
    Converts unicode to string if necessary
    :type s: str or unicode
    :rtype: str
    """
    try:
        return s.encode('utf-8')
    except UnicodeDecodeError:
        return s


def to_int(s):
    """
    Return first number from string
    :param s: strin or unicode
    :return: int
    """
    out = ''
    started = False
    for x in s:
        if x.isdigit():
            out += x
            started = True
        if started and not x.isdigit():
            return int(out)
    return int(out)


def address_and_comment(address, comment):
    return u"%s— %s" % (address, comment)


def phone_and_comment(phone, comment):
    return u"%s—  %s" % (phone, comment)


def check_route(link, check_part):
    """
    :param link: string with route link
    :param check_part: list of fixture base parts of route link
    :return: bool
    Remove protocol and unquote url
    Split route link by '/', split last part by '╎', split coordinates part by ','
    Save each parts in 'parts' list with original order.
    Round coordinates and check equal part in parts and check_part, save result in 'check' list
    Return all True of check list.
    """
    # unquote
    link = urllib.unquote(to_str(link[7:]))
    # make parts list
    parts = link.split('/')
    coords = parts[len(parts) - 1].split('╎')[0]
    address = parts[len(parts) - 1].split('╎')[1]
    parts.remove(parts[len(parts) - 1])
    parts.append(coords)
    parts.append(address)
    center = parts[3].split(',')
    baloon = parts[len(parts) - 2].split(',')
    parts[3] = center[0]
    parts.insert(4, center[1])
    parts[len(parts) - 2] = baloon[0]
    parts.insert(len(parts) - 1, baloon[1])
    # check equals
    i = 0
    check = list()
    while i < len(parts):
        if isinstance(check_part[i], float):
            check_part[i] = round(check_part[i], 2)
            parts[i] = round(float(parts[i]), 2)
        check.append(check_part[i] == parts[i])
        i += 1
    return all(item for item in check)


def coord_equals(expected, got, precision):
    """
    :param expected: Expected coordinate value
    :param got: Got coordinate value
    :param precision: Precision for round latitude and longitude
    :return: bool
    Check part by part coordinate equals with precision
    """
    checks = list()
    checks.append(round(expected['lat'], precision) == round(got['lat'], precision))
    checks.append(round(expected['lng'], precision) == round(got['lng'], precision))
    print(round(expected['lat'], precision))
    print(round(got['lat'], precision))
    print(round(expected['lng'], precision))
    print(round(got['lng'], precision))
    return all(check for check in checks)


def coord_string_to_dict(coord_str):
    """
    :param coord_str: string like 'lat, lng'
    :return: dict from coord_string content lat and lng respectively
    """
    parts = coord_str.split(', ')
    return {'lat': float(parts[0]), 'lng': float(parts[1])}
