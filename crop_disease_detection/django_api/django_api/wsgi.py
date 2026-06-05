# crop_disease_detection/django_api/django_api/wsgi.py

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_api.settings')

application = get_wsgi_application()
