from contesto.exceptions import BaseError


class MapsApiException(BaseError):
    pass


class ElementNotFoundException(MapsApiException):
    pass


class UnknownElementException(MapsApiException):
    pass


class WebAPIException(MapsApiException):
    pass


class CommonException(MapsApiException):
    pass


class NoPageIsSelected(MapsApiException):
    pass


class NotTransportTypeError(MapsApiException):
    pass


class NotGeoTypeError(MapsApiException):
    pass


class NotFirmTypeError(MapsApiException):
    pass
