from pymongo import MongoClient
from password import mongodbpassword
from django.http import JsonResponse
connection_string = "mongodb+srv://rank-master-dev:{}@cluster0.fws5ulv.mongodb.net/?retryWrites=true&w=majority".format(mongodbpassword)

def getListCollection():
    client = MongoClient(connection_string)
    return client["ListData"]['Lists']

def jsonResponseWithErrorMessage(msg):
    return JsonResponse({ 'error': { 'message': msg } })