# coding: UTF-8

def get_exception_message(e):
    return e.__str__().strip('"').strip("'")

