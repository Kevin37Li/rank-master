from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from bson.objectid import ObjectId
from bson.errors import InvalidId
from pymongo import DESCENDING

from utils import getListCollection

import time

# `/myApp` leads to the front page (should list all categories here)
def index(request):
    return render(request, "index.html")

# `/myApp/search` is the search results page
def search(request):
    return render(request, "index.html")
    return HttpResponse("Search page. The search string/page number should be somehow extracted from the URL as http parameters")

# `/myApp/categories/<CategoryName>` shows the lists belonging to a category
def categories(request, category_name):
    return render(request, "index.html")
    # call get_object_or_404() on category
    return HttpResponse("Category page for {}".format(category_name))

# `/myApp/register` registers a user
def register(request):
    return HttpResponse("Register Page")

# `/myApp/login` allows the user to log in
def login(request):
    return HttpResponse("Login Page")

# `/myApp/user/<UserID>` is the user's profile page
def userProfile(request, user_id):
    # call get_object_or_404() on user
    return HttpResponse("User {}'s profile page".format(user_id))

# `/myApp/user/<UserID>/<ListID>` shows a list's ranking by the user with `<UserID>`
def userRanking(request, user_id, list_id):
    # call get_object_or_404() on user then on the list
    return HttpResponse("User {}'s ranking for list {}".format(user_id, list_id))

# `/myApp/lists/view/<ListID>` shows the global ranking of the list with `<ListID>`
def listView(request, list_id):
    # TODO: catch error if list_id is not a valid objectID
    listDocument = getListCollection().find_one( { "_id": ObjectId(list_id) } )
    if listDocument is None:
        return HttpResponse("The list with ID {} cannot be found.".format(list_id))
    else:
        if 'title' not in listDocument or 'items' not in listDocument or 'public' not in listDocument:
            return HttpResponse("The document for list {} is corrupted.".format(list_id))
        if not listDocument['public']:
            # TODO: handle the creator of the list viewing their own private list
            return HttpResponse("This list is not publicly available.")
        return HttpResponse("List Title = {}\nItems/Counts = {}".format(listDocument['title'], listDocument['items']))

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
    def jsonResponseWithErrorMessage(msg):
        return JsonResponse({ 'error': { 'message': msg } })
    def setPayload(payload): #payload can be either a dictionary or a list of dictionaries
        return JsonResponse({ 'payload': payload})
    pageArg = 1 # by default
    resultsPerPage = 2 # arbitrary atm, presentation value should be much higher (at least 10)
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
        # TODO: gotta figure out how to look for partial matches
        pass
    return HttpResponse("list items")

# `/myApp/lists/rank/<ListID>` allows for a ranking to be made out of a list
def listRank(request, list_id):
    return render(request, "index.html")

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
            return HttpResponse("There are multiple items with the same name.")
        if "" in items:
            return HttpResponse("The list should not have an item with empty string as name.")

        # write to database
        post_id = getListCollection().insert_one({ "title": listTitle, 
                                                   "items": { item: 0 for item in items},
                                                   "public": public,
                                                   "category": category,
                                                   "createdAt": timestamp,
                                                   "user": userId
                                                }).inserted_id
        # _id field is generated automatically
        return HttpResponse("List Title = {}\nItems = {}\nID = {}\nCategory = {}\nPublic = {}\ncreatedAt = {}\nuser = {}".format(listTitle, items, post_id, category, public, timestamp, userId))