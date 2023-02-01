from django.http import HttpResponse
from django.shortcuts import render

# `/myApp` leads to the front page (should list all categories here)
def index(request):
    return HttpResponse("Front page.")

# `/myApp/search` is the search results page
def search(request):
    return HttpResponse("Search page. The search string/page number should be somehow extracted from the URL as http parameters")

# `/myApp/categories/<CategoryName>` shows the lists belonging to a category
def categories(request, category_name):
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

# `/myApp/lists/<ListID>` shows the global ranking of the list with `<ListID>`
def listView(request, list_id):
    # call get_object_or_404() on list
    return HttpResponse("Global ranking for list {}".format(list_id))

# `/myApp/lists/<ListID>/rank` allows for a ranking to be made out of a list
def listRank(request, list_id):
    # call get_object_or_404() on list
    return HttpResponse("Rank the list {}".format(list_id))

# `/myApp/lists/create` should allow a logged-in user to create a list
def listCreate(request):
    return HttpResponse("Create a list")