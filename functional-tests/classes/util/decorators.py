# -*- coding: utf-8 -*-
from contesto import config
from contesto.exceptions import ElementNotFound
from selenium.webdriver.support.wait import WebDriverWait
import functools


def catches_not_found(if_not_found=None):
    def wrapper(f):
        @functools.wraps(f)
        def decorated(self, *args, **kwargs):
            try:
                return f(self, *args, **kwargs)
            except ElementNotFound:
                return if_not_found
        return decorated
    return wrapper


def waits_for(selectors, appear=False):
    def wrap(f):
        def decorate(self, *args, **kwargs):
            f(self, *args, **kwargs)
            for selector in selectors:
                try:
                    driver = self.test if 'test' in self.__class__.__dict__ else self.driver
                    wait = WebDriverWait(driver, float(config.timeout['normal']))
                    if appear:
                        wait.until(lambda dr: dr.find_element_by_css_selector(selector).is_displayed())
                    else:
                        wait.until_not(lambda dr: dr.find_element_by_css_selector(selector).is_displayed())
                except ElementNotFound:
                    continue
        return decorate
    return wrap


def try_x_times(x, exceptions_to_catch, exception_to_raise, fn):
    """
    :param x: int
    :param exceptions_to_catch: tuple of Exception
    :param exception_to_raise: tuple of Exception
    :param fn: function
    """
    @functools.wraps(fn)  # keeps name and docstring of old function
    def new_fn(*args, **kwargs):
        for i in xrange(x):
            try:
                return fn(*args, **kwargs)
            except exceptions_to_catch:
                pass
        raise exception_to_raise
    return new_fn