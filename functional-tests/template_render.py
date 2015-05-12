# -*- coding: utf-8 -*-
from jinja2 import Template
from templates.content import pages
import codecs
import os

if not os.path.exists('../public/pages'):
    os.mkdir('../public/pages')
page = open('templates/base_part.html', 'r')
template = Template(page.read())
page.close()
for page in pages:
    out = codecs.open("../public/pages/%s.html" % pages[page]['title'], 'w', 'utf-8')
    out.write(template.render(pages[page]))
    out.close()
