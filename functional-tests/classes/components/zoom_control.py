# -*- coding: utf-8 -*-
from component import Component


class ZoomControlIn(Component):
    selectors = {
        'self': '.dg-zoom__in > div'
    }

    def zoom_in_click(self):
        self.element.click()


class ZoomControlOut(Component):
    selectors = {
        'self': '.dg-zoom__out > div'
    }

    def zoom_out_click(self):
        self.element.click()
