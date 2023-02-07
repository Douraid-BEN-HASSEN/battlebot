from django.apps import AppConfig
from subprocess import Popen
import os


class ApiAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api_app'
