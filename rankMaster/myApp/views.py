from django.http import HttpResponse

def index(request):
    return HttpResponse("Front page.")

def search(request):
    return HttpResponse("Search page. The search string/page number should be somehow extracted from the URL as http parameters")

def categories(request, category_name):
    # call get_object_or_404() on category
    return HttpResponse("Category page for {}".format(category_name))

def register(request):
    return HttpResponse("Register Page")

def login(request):
    return HttpResponse("Login Page")

def userProfile(request, user_id):
    # call get_object_or_404() on user
    return HttpResponse("User {}'s profile page".format(user_id))

def userRanking(request, user_id, list_id):
    # call get_object_or_404() on user then on the list
    return HttpResponse("User {}'s ranking for list {}".format(user_id, list_id))

def listView(request, list_id):
    # call get_object_or_404() on list
    return HttpResponse("Global ranking for list {}".format(list_id))

def listRank(request, list_id):
    # call get_object_or_404() on list
    return HttpResponse("Rank the list {}".format(list_id))

def listCreate(request):
    return HttpResponse("Create a list")