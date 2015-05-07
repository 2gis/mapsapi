from classes.components.component import Component
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from config import config


class Marker(Component):
    selectors = {
        'self': 'div.leaflet-pane.leaflet-marker-pane > div.dg-customization__marker',
        'label': 'div.dg-label > div.dg-label__content'
    }

    def click(self, index=0):
        self.driver.find_elements_by_css_selector(self.selectors['self'])[index].click()

    def wait_present(self):
        WebDriverWait(self.driver, config.timeout['normal']).until(
            EC.visibility_of(self.driver.find_element(By.CSS_SELECTOR, self.selectors['self']))
        )

    def drag_marker(self, x_offset, y_offset, index=0):
        actions = ActionChains(self.driver)
        marker = self.driver.find_elements_by_css_selector(self.selectors['self'])[index]
        actions.drag_and_drop_by_offset(marker, x_offset, y_offset).perform()

    def get_lat(self, name='marker'):
        return self.driver.execute_script('return %s._latlng.lat.toFixed(3)' % name)

    def get_lng(self, name='marker'):
        return self.driver.execute_script('return %s._latlng.lng.toFixed(3)' % name)

    def get_labels(self):
        return self.driver.find_elements_by_css_selector(self.selectors['label'])

    def get_markers(self):
        return self.driver.find_elements_by_css_selector(self.selectors['self'])

    def hover_marker(self, index=0):
        actions = ActionChains(self.driver)
        actions.move_to_element(self.get_markers()[index]).perform()

    def count(self):
        return len(self.driver.find_elements_by_css_selector(self.selectors['self']))
