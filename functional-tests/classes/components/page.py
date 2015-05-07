from contesto.basis.page import BasePage
from time import sleep


class Page(BasePage):
    def __init__(self, test):
        """
        :type test: Mapsapi driver
        """
        self.test = test
        super(Page, self).__init__(test)

    def refresh(self):
        super(Page, self).refresh()
        self.__init__(self.test)

    def forward(self):
        super(Page, self).forward()
        self.__init__(self.test)

    def back(self):
        super(Page, self).back()
        self.__init__(self.test)

    @property
    def new_window_url(self):
        win_count = len(self.test.window_handles)
        self.test.switch_to_window(self.test.window_handles[win_count - 1])
        return self.test.current_url

    def click(self):
        """
        Left-clicks the current cursor position
        """
        from selenium.webdriver.common.action_chains import ActionChains
        act = ActionChains(self.test)
        act.click().perform()

    @property
    def map(self):
        """
        :return: MapContainer
        """
        from classes.components.map import Map
        return Map(self.test, self.test.find_element_by_css_selector(Map.selectors['self']))

    @property
    def zoom_control_in(self):
        """
        :rtype: ZoomControlIn
        """
        from classes.components.zoom_control import ZoomControlIn
        return ZoomControlIn(self.test, self.test.find_element_by_css_selector(ZoomControlIn.selectors['self']))

    @property
    def zoom_control_out(self):
        """
        :rtype: ZoomControlOut
        """
        from classes.components.zoom_control import ZoomControlOut
        return ZoomControlOut(self.test, self.test.find_element_by_css_selector(ZoomControlOut.selectors['self']))

    @property
    def callout(self):
        """
        :return: Callout
        """
        from classes.components.callout import Callout
        return Callout(self.test, self.test.find_element_by_css_selector(Callout.selectors['self']))

    @property
    def callout_crossed(self):
        """
        :return: CalloutCrossed
        """
        from classes.components.callout import BalloonCrossed
        return BalloonCrossed(self.test, self.test.find_element_by_css_selector(BalloonCrossed.selectors['self']))

    @property
    def unkown_place(self):
        """
        :return: UnknownPlace
        """
        from classes.components.callout import UnknownPlace
        return UnknownPlace(self.test, self.test.find_element_by_css_selector(UnknownPlace.selectors['self']))

    @property
    def place_callout(self):
        """
        :return: PlaceCallout
        """
        from classes.components.callout import PlaceCallout
        return PlaceCallout(self.test, self.test.find_element_by_css_selector(PlaceCallout.selectors['self']))

    @property
    def addresed_place_callout(self):
        """
        :return: AddressPlaceCallout
        """
        from classes.components.callout import AddressPlaceCallout
        return AddressPlaceCallout(self.test, self.test.find_element_by_css_selector(AddressPlaceCallout.selectors['self']))

    @property
    def build_callout(self):
        """
        :return: BuildCallout
        """
        from classes.components.callout import BuildCallout
        return BuildCallout(self.test, self.test.find_element_by_css_selector(BuildCallout.selectors['self']))

    @property
    def attraction_callout(self):
        """
        :return: AttractionCallout
        """
        from classes.components.callout import AttractionCallout
        return AttractionCallout(self.test, self.test.find_element_by_css_selector(AttractionCallout.selectors['self']))

    @property
    def attraction_callout_wrapped(self):
        """
        :return: AttractionCallout
        """
        from classes.components.callout import AttractionCallouttWrapped
        return AttractionCallouttWrapped(self.test, self.test.find_element_by_css_selector(
            AttractionCallouttWrapped.selectors['self']))

    @property
    def firm_callout(self):
        """
        :return: FirmCallout
        """
        from classes.components.callout import FirmCallout
        return FirmCallout(self.test, self.test.find_element_by_css_selector(
            FirmCallout.selectors['self']))

    @property
    def marker(self):
        """
        :return: Marker
        """
        from classes.components.marker import Marker
        return Marker(self.test, self.test.find_element_by_css_selector(Marker.selectors['self']))

    def console(self, script, timeout=0):
        result = self.test.execute_script(script)
        sleep(timeout)
        return result
