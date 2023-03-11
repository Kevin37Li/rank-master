from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404
from bson.objectid import ObjectId
from bson.errors import InvalidId
from pymongo import DESCENDING

from utils import getListCollection, jsonResponseWithErrorMessage

import time
import json
import re

# import serializers for converting between model instances and python dicts
from .serializers import UserProfileSerializer, RankSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import UserProfile, User, Rank

# `/myApp` leads to the front page (should list all categories here)
def index(request):
    return render(request, "index.html")

# `/myApp/search` is the search results page
def search(request):
    return render(request, "index.html")

# `/myApp/categories` shows all categories
def categoriesList(request):
    return render(request, "index.html")

# `/myApp/categories/<CategoryName>` shows the lists belonging to a category
def categoriesSpecific(request, category_name):
    return render(request, "index.html")

# `/myApp/register` registers a user
def register(request):
    return HttpResponse("Register Page")

# `/myApp/login` allows the user to log in
def login(request):
    return render(request, "index.html")

@api_view(['GET', 'PUT'])
def userProfile(request, username):
    @permission_classes([AllowAny if request.method == 'GET' else IsAuthenticated])
    def inner_view(request, username):
        user = get_object_or_404(User, username=username)
        profile, created = UserProfile.objects.get_or_create(user_id=user.id)
        if request.method == 'GET':
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        elif request.method == 'PUT':
            if request.user.id != user.id:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            serializer = UserProfileSerializer(profile, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    return inner_view(request, username)

# `/myApp/user/<UserID>/<ListID>` shows a list's ranking by the user with `<UserID>`
@api_view(['GET'])
def userRanking(request, username):
    user = get_object_or_404(User, username=username)
    rankings = Rank.objects.filter(user_id = user.id)

    serializer = RankSerializer(rankings, many=True, context={'request': request})
    return Response(serializer.data)

# `/myApp/lists/view/<ListID>` shows the global ranking of the list with `<ListID>`
def listView(request, list_id):
    return render(request, "index.html")

# handles GET request submitted to /get/user/<username>
def getUser(request, username):
    # fetch the username
    # 'rankings' and 'lists' **only** contains the list ID's, nothing else
    return JsonResponse({ 'username': "John Snow", 'rankings': [], 'lists': [] })

'''
handles GET request submitted to '/get/lists/<params>
params are normal GET parameters. Accepted parameters include:
- 'id': id of the list in the db. If used, this should be the only parameter in <params>
- 'category': string of the category, can be used with 'page'
- 'contains': NOT IMPLEMENTED yet, but should be used to look for titles that matches the string
- 'page': positive integer of the page number of the results, accepted only if 'category' or 'contains' are supplied
returns:
- if there is an error, the JSON would be of form:
  {
    'error': {
        'message': String // error message here
    }
  }
- if successful get with id, the returned JSON would be of form:
  {
    'payload': Object
  }
- if successful get with category or contains, the returned JSON would be of form:
  {
    'payload': Object[]
  }
'''
def getLists(request):
    def setPayload(payload): #payload can be either a dictionary or a list of dictionaries
        return JsonResponse({ 'payload': payload})
    pageArg = 1 # by default
    resultsPerPage = 10 # arbitrary atm, presentation value should be much higher (at least 10)
    # if there is only one of id, category, contains GET arguments, it's valid
    if ("id" in request.GET or "category" in request.GET or "contains" in request.GET) and len(request.GET) == 1:
        pass
    # if we have a category or contains argument, we can allow one extra arg "page" too
    elif ("category" in request.GET or "contains" in request.GET) and ("page" in request.GET) and len(request.GET) == 2:
        try:
            pageArg = int(request.GET['page'])
            if pageArg < 1:
                raise Exception
        except:
            return jsonResponseWithErrorMessage('page parameter must be a positive number')
    else:
        return jsonResponseWithErrorMessage("Invalid get query format.")
    idArg = request.GET.get("id", None)
    categoryArg = request.GET.get("category", None)
    containsArg = request.GET.get("contains", None)
    if idArg is not None: # handle id query
        try:
            objId = ObjectId(request.GET['id'])
        except InvalidId:
            return jsonResponseWithErrorMessage('This id is invalid')
        listDoc = getListCollection().find_one({"_id": objId})
        if listDoc is None:
            return jsonResponseWithErrorMessage("We can't find the list with id = {}".format(request.GET['id']))
        elif listDoc['public'] == False:
            return jsonResponseWithErrorMessage("This list is not public")
        else:
            listDoc['_id'] = str(listDoc['_id'])
            return setPayload(listDoc)
    elif categoryArg is not None:
        # should return public lists that match
        # skips results according to the page number
        cursor = getListCollection().find({"category": categoryArg, "public": True}, projection = ['title', 'createdAt', 'user'], sort = [('createdAt', DESCENDING)])
        if len(cursor.distinct("_id")) == 0:
            return jsonResponseWithErrorMessage("There are no public lists under this category yet")
        cursorLength = len(cursor.distinct("_id"))
        if cursorLength < (pageArg - 1) * resultsPerPage:
            return jsonResponseWithErrorMessage("The page argument is too large")
        elif cursorLength == 0:
            return jsonResponseWithErrorMessage("There are no public lists under this categories yet")
        cursor = cursor.skip((pageArg - 1) * resultsPerPage)
        matchedResults = []
        for match in cursor:
            if len(matchedResults) >= resultsPerPage:
                break
            match['_id'] = str(match['_id'])
            matchedResults.append(match)
        cursor.close()
        return setPayload(matchedResults)
    elif containsArg is not None:
        print(containsArg)
        # split the containsArg into words and search by these words (matches are case-insensitive)
        search_strings = containsArg.split()
        search_strings = ["(^| )" + word + "($| )" for word in search_strings]
        print('|'.join(search_strings))
        regexQuery = re.compile('|'.join(search_strings), re.IGNORECASE)
        # search in title or in username
        cursor = getListCollection().find({ "$or": [
            { 'user': regexQuery },
            { 'title': regexQuery }
        ] }, projection = ['title', 'createdAt', 'user'], sort = [('createdAt', DESCENDING)])
        if len(cursor.distinct("_id")) == 0:
            return jsonResponseWithErrorMessage("We can't find any lists that resembles the search string")
        cursorLength = len(cursor.distinct("_id"))
        if cursorLength < (pageArg - 1) * resultsPerPage:
            return jsonResponseWithErrorMessage("The page argument is too large")
        elif cursorLength == 0:
            return jsonResponseWithErrorMessage("There are no public lists under this categories yet")
        cursor = cursor.skip((pageArg - 1) * resultsPerPage)
        matchedResults = []
        for match in cursor:
            if len(matchedResults) >= resultsPerPage:
                break
            match['_id'] = str(match['_id'])
            matchedResults.append(match)
        cursor.close()
        return setPayload(matchedResults)
    return HttpResponse("list items")

# `/myApp/lists/rank/<ListID>` allows for a ranking to be made out of a list
@api_view(['GET', 'POST'])
def listRank(request, list_id):

    @permission_classes([AllowAny if request.method == 'GET' else IsAuthenticated])
    def inner_view(request, list_id):
        if request.method == 'GET':
            return render(request, "index.html")
        elif request.method == 'POST':
            payload = json.loads(request.body)
            # extracting the useful parts
            list_id = payload['_id']
            ranker_username = payload['user']
            ranking = payload['items']
            # update the global ranking vote using Borda count
            try:
                objId = ObjectId(list_id)
            except InvalidId:
                return jsonResponseWithErrorMessage('This id is invalid')
            listDoc = getListCollection().find_one({"_id": objId})
            if listDoc is None:
                return jsonResponseWithErrorMessage("We can't find the list with id = {}".format(request.GET['id']))
            if 'items' not in listDoc:
                return jsonResponseWithErrorMessage("The document of the list is corrupted (no 'items' field)")
            updatedItems = listDoc['items']
            for score, item in enumerate(list(reversed(ranking))):
                if item not in listDoc['items']:
                    return jsonResponseWithErrorMessage("The given ranking contains items not in the original list")
                updatedItems[item] += score
            # print(updatedItems)
            result = getListCollection().update_one({'_id': objId}, {'$set': { 'items': updatedItems }}) # write into the DB
            # print("matched {}, modified {}".format(result.matched_count, result.modified_count))

            # store inside sql database
            rank = Rank()
            rank.user_id = request.user.id
            rank.title = payload['title']
            rank.id_list = list_id
            rank.ranking_list = ranking
            rank.save()


            return Response('success')

            

        
    return inner_view(request, list_id)

# `/myApp/lists/create` should allow a logged-in user to create a list
def listCreate(request):
    if request.method == 'GET':
        return render(request, "index.html")
    elif request.method == 'POST':
        # TODO: there are some CSRF token things we gotta sort out: https://docs.djangoproject.com/en/dev/howto/csrf/#using-csrf
        # Without CSRF the POST request would be blocked with a 403 error
        # write to the database
        listTitle = None
        items = []
        public = False
        category = None
        userId = "defaultUserId" # TODO: update this
        timestamp = time.time_ns()
        for key, val in request.POST.items():
            if "item" in key:
                items.append(val)
            elif key == "title":
                listTitle = val
            elif key == "public":
                public = True
            elif key == "category":
                category = val
        # ensure the items have unique names 
        if len(items) != len(set(items)):
            return jsonResponseWithErrorMessage("There are multiple items with the same name.")
        if "" in items:
            return jsonResponseWithErrorMessage("The list should not have an item with empty string as name.")

        # write to database
        post_id = getListCollection().insert_one({ "title": listTitle, 
                                                   "items": { item: 0 for item in items},
                                                   "public": public,
                                                   "category": category,
                                                   "createdAt": timestamp,
                                                   "user": userId
                                                }).inserted_id
        # _id field is generated automatically
        return JsonResponse({ 'id': str(post_id) })