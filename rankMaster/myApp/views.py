from django.http import HttpResponse
from django.shortcuts import render
from bson.objectid import ObjectId

from utils import getListCollection

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

# `/myApp/lists/rank/<ListID>` allows for a ranking to be made out of a list
def listRank(request, list_id):
    # call get_object_or_404() on list
    return HttpResponse("Rank the list {}".format(list_id))

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
                                                   "category": category
                                                }).inserted_id
        # TODO: add the userID field
        # _id field is generated automatically
        return HttpResponse("List Title = {}\nItems = {}\nID = {}\nCategory = {}\nPublic = {}".format(listTitle, items, post_id, category, public))