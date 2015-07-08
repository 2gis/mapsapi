from component import Component
from classes.util.decorators import catches_not_found


class Source(Component):
    selectors = {
        'loader': '[src*="loader"]',
        'app_js': 'script[src*="/js/?"]'
    }

    @property
    @catches_not_found(False)
    def loader_present(self):
        return bool(self.driver.find_element_by_css_selector(self.selectors['loader']))

    @property
    @catches_not_found(False)
    def app_js_present(self):
        return bool(self.driver.find_element_by_css_selector(self.selectors['app_js']))
