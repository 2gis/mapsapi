# -*- coding: utf-8 -*-
from classes.mapsapi_base_test import MapsAPIBaseTest
from config import config
from lode_runner.dataprovider import dataprovider
from classes.util import scripts
from classes.WAPI.dataWorker import FirmData
import classes.util.misc as misc
import classes.util.link_generator as links


class FirmCallout(MapsAPIBaseTest):
    """
    Тесты на сallout фирмы
    """
    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254,
        141265770417218
    )
    ])
    def firm_name_test(self, url, lat, lng, firm_id):
        """
        Проверка заголовка фирмы
        1.Открываем калаут фирмы
        2.Проверяем заголовок
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(scripts.SetScripts.pan_to(lat, lng))
        self.page.console(scripts.SetScripts.set_zoom(17))
        self.page.map.center_click()
        self.page.build_callout.wait_present()
        self.page.build_callout.open_firm_list()
        self.page.build_callout.open_firm_by_id(firm_id)
        callout_text = self.page.firm_callout.header
        f = FirmData(firm_id)
        self.assertEqual(f.firm_name, callout_text)

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254
    )
    ])
    def firm_back_list_test(self, url, lat, lng):
        """
        Проверка кнопки назад (в здании с мн. организаций)
        1.Открываем калаут фирмы
        2.Нажимаем назад
        3.Проверяем наличие списка организаций
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(scripts.SetScripts.pan_to(lat, lng))
        self.page.console(scripts.SetScripts.set_zoom(17))
        self.page.map.center_click()
        self.page.build_callout.wait_present()
        self.page.build_callout.open_firm_list()
        self.page.build_callout.open_firm_by_index(1)
        self.page.firm_callout.back()
        self.assertTrue(self.page.firm_list.list_present())

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.987722587459736,
        82.88787066936494
    )
    ])
    def firm_back_build_test(self, url, lat, lng):
        """
        Проверка кнопки назад (к зданию)
        1.Открываем калаут фирмы
        2.Нажимаем назад
        3.Проверяем наличие колаута здания
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(scripts.SetScripts.pan_to(lat, lng))
        self.page.console(scripts.SetScripts.set_zoom(17))
        self.page.map.center_click()
        self.page.build_callout.wait_present()
        self.page.build_callout.open_firm_by_index(1)
        self.page.firm_callout.back()
        self.assertTrue(self.page.build_callout.is_visible)

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.987722587459736,
        82.88787066936494,
        17,
        ['2gis.ru', 'novosibirsk', 'center', 82.89, 54.99, 'zoom', '17',
         'routeTab', 'rsType', 'bus', 'to', 82.89, 54.99, 'Новосибирск, Ватутина, 16']
    ), (
        config.aut['local'] + u'/base.html',
        -33.44449709158904,
        -70.6516680121422,
        18,
        ['2gis.cl', 'santiago', 'center', -70.65, -33.44, 'zoom', '18',
         'routeTab', 'rsType', 'bus', 'to', -70.65, -33.44, 'Santiago, Avenida Libertador Bernardo O\'Higgins, 1112']
    )
    ])
    def firm_route_to(self, url, lat, lng, zoom, parts):
        """
        Проверка ссылки на проехать до
        1.Открываем калаут фирмы
        2.Проверяем атирибут ссылки "Проехать сюда"
        """
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(scripts.SetScripts.pan_to(lat, lng))
        self.page.console(scripts.SetScripts.set_zoom(zoom))
        self.page.map.center_click()
        self.page.build_callout.wait_present()
        self.page.build_callout.open_firm_by_index(1)
        route = self.page.firm_callout.route_link
        self.assertTrue(misc.check_route(route.get_attribute('href'), parts))

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254,
        141265770417218
    )
    ])
    def firm_photo_test(self, url, lat, lng, firm_id):
        """
        Проверка наличия фото у фирмы
        1.Открыть фирму с фото
        2.Проверить наличие ссылки
        3.Проверить url ссылки
        4.Проверить количество фото
        """
        self._open_firm(url, lat, lng, firm_id)
        photo = self.page.firm_callout.photo
        self.assertTrue(photo.is_displayed())
        f = FirmData(firm_id)
        num = misc.to_int(photo.text)
        self.assertEqual(f.photo_count(), num)
        link = links.photo_link(firm_id)
        self.assertEqual(link, photo.get_attribute('href'))

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254,
        141265771060872
    )
    ])
    def firm_rating_test(self, url, lat, lng, firm_id):
        """
        Проверка наличия рейтинга у фирмы
        1.Открыть фирму с рейтингом
        2.Проверить наличие рейтинга
        3.Проверить url ссылки
        4.Проверить количество отзывов
        """
        self._open_firm(url, lat, lng, firm_id)
        stars = self.page.firm_callout.stars
        reviews = self.page.firm_callout.reviews
        f = FirmData(firm_id)
        self.assertTrue(stars.is_displayed())
        self.assertEqual(reviews.get_attribute('href'), links.reviews_link(firm_id))
        reviews_count = misc.to_int(reviews.text)
        self.assertEqual(reviews_count, f.review_count)

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.97883,
        82.872775,
        141265769707278
    )
    ])
    def firm_address_test(self, url, lat, lng, firm_id):
        """
        Проверка наличия адреса
        1.Открыть фирму
        2.Проверить наличие адреса
        3.Проверить адрес
        """
        self._open_firm(url, lat, lng, firm_id)
        f = FirmData(firm_id)
        self.assertTrue(self.page.firm_callout.address.is_displayed())
        self.assertEqual(self.page.firm_callout.address.text, f.address_name)

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254,
        141265771060872
    )
    ])
    def firm_address_comment_test(self, url, lat, lng, firm_id):
        """
        Проверка наличия комментария к адресу
        1.Открыть фирму с комментарием
        2.Праверить наличие комментария
        """
        self._open_firm(url, lat, lng, firm_id)
        f = FirmData(firm_id)
        self.assertTrue(self.page.firm_callout.address.is_displayed())
        full_adress = misc.address_and_comment(f.address_name, f.address_comment)
        self.assertEqual(self.page.firm_callout.address.text, full_adress)

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254,
        141265771060872
    ), (
        config.aut['local'] + u'/base.html',
        54.9810307939813,
        82.87442207336427,
        141265769728580
    )
    ])
    def firm_telephone_count_test(self, url, lat, lng, firm_id):
        """
        Проверка наличия и количества телефонов
        1.Открывем фирму
        2.Получаем количество телефонов (из API)
        3.Проверяем количество телефонов
        """
        self._open_firm(url, lat, lng, firm_id)
        f = FirmData(firm_id)
        phones_wapi = f.get_phones()
        phones_num = len(phones_wapi)
        phones_callout = self.page.firm_callout.phones()
        self.assertEqual(phones_num, len(phones_callout))

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254,
        141265771060872
    )
    ])
    def firm_telephone_comment_test(self, url, lat, lng, firm_id):
        """
        Проверка наличия комментария к телефону
        1.Открываем фирму
        2.Проверяем наличия комментария к телефону
        """
        self._open_firm(url, lat, lng, firm_id)
        f = FirmData(firm_id)
        phones_wapi = f.get_phones()
        phones_callout = self.page.firm_callout.phones()
        phone_and_comment = misc.phone_and_comment(phones_wapi[0]['text'], phones_wapi[0]['comment'])
        self.assertEqual(phones_callout[0].text, phone_and_comment)

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254,
        141265770417218
    ), (
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254,
        141265770847007
    )
    ])
    def firm_website_count_test(self, url, lat, lng, firm_id):
        """
        Проверка наличия ссылки на вебсайт
        1.Открываем фирму
        2.Проверяем наличие ссылки на вебсайт
        3.Проверяем количество ссылок
        """
        self._open_firm(url, lat, lng, firm_id)
        f = FirmData(firm_id)
        websites_wapi = f.get_websites()
        websites_callout = self.page.firm_callout.websites()
        self.assertEqual(len(websites_callout), len(websites_wapi))
        self.assertEqual(websites_callout[0].text, websites_wapi[0]['text'])

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254,
        141265771881838
    )])
    def firm_email_test(self, url, lat, lng, firm_id):
        """
        Проверка наличия email
        1.Открываем фирму
        2.Проверяем наличие email
        3.Проверяем ссыль на мейл
        """
        self._open_firm(url, lat, lng, firm_id)
        f = FirmData(firm_id)
        email = self.page.firm_callout.email
        self.assertEqual(email.text, f.get_emails()[0]['text'])
        self.assertEqual(email.get_attribute('href'), "mailto:%s" % f.get_emails()[0]['value'])

    # для простого, списка и таблицы
    def firm_schedule(self):
        """
        Проверка наличия расписания
        1.Открываем фирму
        2.Проверяем наличие расписания
        3.Проверяем наличие подсказки
        """
        pass

    def firm_schedule_wrapper_list(self):
        """
        Проверка расписания-списка
        1.Открываем фирму
        2.Проверяем расписание на сегодня (для всех языков)
        3.Кликаем в врапер
        4.Проверяем наличие списка
        5.Отсутсвие посдсказки на сегодня
        """
        pass

    def firm_schedule_wrapper_table(self):
        """
        Проверка расписания-таблицы
        1.Открываем фирму
        2.Проверяем расписание на сегодня (для всех языков)
        3.Кликаем в врапер
        4.Проверяем наличие таблицы
        5.Отсутсвие посдсказки на сегодня
        """
        pass

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254,
        141265771060872
    )
    ])
    def firm_rubrics_test(self, url, lat, lng, firm_id):
        """
        Проверка рубрик
        1.Открываем фирму
        2.Проверяем количество рубрик
        3.Проверяем порядок(первая, последняя, в сеередине с учетом primary)
        """
        self._open_firm(url, lat, lng, firm_id)
        f = FirmData(firm_id)
        primary = self.page.firm_callout.primary_rubrics
        self.assertEqual(primary[0].text, f.get_rubrics_primary()[0]['name'])
        primary_last = len(f.get_rubrics_primary()) - 1
        self.assertEqual(primary[primary_last].text, f.get_rubrics_primary()[primary_last]['name'])
        additional = self.page.firm_callout.additional_rubrics
        self.assertEqual(additional[0].text, f.get_rubrics_additional()[0]['name'])
        additional_last = len(f.get_rubrics_additional()) - 1
        self.assertEqual(additional[additional_last].text,
                         f.get_rubrics_additional()[additional_last]['name'])

    @dataprovider([(
        config.aut['local'] + u'/base.html',
        54.980678320392336,
        82.89860486984254,
        141265771060872
    )
    ])
    def firm_scroll_bar_test(self, url, lat, lng, firm_id):
        """
        Проверка наличия скролл-бара
        1.Открываем фирму со скроллбаром
        2.Проверяем его наличия
        """
        self._open_firm(url, lat, lng, firm_id)
        self.assertTrue(self.page.firm_callout.scroll.is_displayed())

    def _open_firm(self, url, lat, lng, firm_id):
        self.driver.get(url)
        self.page.map.wait_init()
        self.page.console(scripts.SetScripts.pan_to(lat, lng))
        self.page.console(scripts.SetScripts.set_zoom(17))
        self.page.map.center_click()
        self.page.build_callout.wait_present()
        self.page.build_callout.open_firm_list()
        self.page.build_callout.open_firm_by_id(firm_id)
