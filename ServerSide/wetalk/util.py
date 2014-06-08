# coding: UTF-8

import string, random

def get_exception_message(e):
    return e.__str__().strip('"').strip("'")

def generate_random_string(len):
    str = ''.join([random.choice(string.ascii_letters + string.digits) \
                           for i in range(len)])
    return str


