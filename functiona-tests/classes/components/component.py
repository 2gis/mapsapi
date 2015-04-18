from contesto.basis.component import BaseComponent
from selenium.webdriver.common.action_chains import ActionChains


class Component(BaseComponent):
    def __init__(self, test, element):
        """
        :type test: InfoPortalDriver
        :type element: InfoPortalWebElement
        """
        super(Component, self).__init__(test, element)
        self.test = self.driver

    def hover(self):
        ActionChains(self.driver).move_to_element(self.element).perform()

    @property
    def is_visible(self):
        return self.element.is_displayed()
