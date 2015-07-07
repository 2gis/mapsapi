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
    def balloon(self):
        """
        :return: Callout
        """
        from classes.components.balloon import Balloon
        return Balloon(self.test, self.test.find_element_by_css_selector(Balloon.selectors['self']))

    @property
    def balloon_crossed(self):
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
        from classes.components.callout import Place
        return Place(self.test, self.test.find_element_by_css_selector(Place.selectors['self']))

    @property
    def addresed_place_callout(self):
        """
        :return: AddressPlaceCallout
        """
        from classes.components.callout import AddressPlace
        return AddressPlace(self.test, self.test.find_element_by_css_selector(AddressPlace.selectors['self']))

    @property
    def build_callout(self):
        """
        :return: BuildCallout
        """
        from classes.components.callout import Build
        return Build(self.test, self.test.find_element_by_css_selector(Build.selectors['self']))

    @property
    def attraction_callout(self):
        """
        :return: AttractionCallout
        """
        from classes.components.callout import Attraction
        return Attraction(self.test, self.test.find_element_by_css_selector(Attraction.selectors['self']))

    @property
    def attraction_callout_wrapped(self):
        """
        :return: AttractionCallout
        """
        from classes.components.callout import AttractionWrapped
        return AttractionWrapped(self.test, self.test.find_element_by_css_selector(AttractionWrapped.selectors['self']))

    @property
    def firm_callout(self):
        """
        :return: FirmCallout
        """
        from classes.components.callout import Firm
        return Firm(self.test, self.test.find_element_by_css_selector(Firm.selectors['self']))

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

    @property
    def firm_list(self):
        """
        :return: FirmList callout
        """
        from classes.components.callout import FirmList
        return FirmList(self.test, self.test.find_element_by_css_selector(FirmList.selectors['self']))

    @property
    def sources(self):
        """
        :return: Source
        """
        from classes.components.mapsapi_sources import Source
        return Source(self.test, self.test.find_element_by_css_selector(Source.selectors['loader']))
