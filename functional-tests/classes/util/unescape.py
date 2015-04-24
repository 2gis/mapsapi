# -*- coding: utf-8 -*-


def unescape_text(text):
    """
    АПИ передает в выдаче эскейп-символы. Метод преобразовывает их в нормальный вид
    см tests/search/firms_minicard/
    """
    import HTMLParser
    return HTMLParser.HTMLParser().unescape(text)
