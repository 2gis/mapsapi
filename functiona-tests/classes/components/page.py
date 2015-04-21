from contesto.basis.page import BasePage
from classes.util.decorators import catches_not_found
from classes.components.scrips import GetScripts

class Page(BasePage):
    def __init__(self, test):
        """
        :type test: InfoPortalDriver
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
    def map_container(self):
        """
        :return: MapContainer
        """
        from classes.components.container import MapContainer
        return MapContainer(self.test, self.test.find_element_by_css_selector(MapContainer.selectors['self']))

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