# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Backend Stuff
## How to Run
1. You can check if Django is installed or not by running the following command:
```
python -m django --version
```
    As long as the Django is above 4.1 (which requires Python 3.8 and later), you should be good to go.


2. To run, simply change into the outer `rankMaster` directory then do `python manage.py runserver`. You should be able to see the URL in the output:
```
Performing system checks...

System check identified no issues (0 silenced).

You have unapplied migrations; your app may not work properly until they are applied.
Run 'python manage.py migrate' to apply them.

January 31, 2023 - 15:50:53
Django version 4.1, using settings 'mysite.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```
    In the above case, the URL is `http://127.0.0.1:8000/`.

3. Install the Python MongoDB driver PyMongo through
```
    pip install pymongo[snappy,gssapi,srv,tls]
```
## Terms
- **List**: a set of unique items to be ranked.
- **Ranking**: same as a List but the items are ordered.
## End points
- `/myApp` leads to the front page (should list all categories here)
- `/myApp/search` is the search results page
- `/myApp/categories/<CategoryName>` shows the lists belonging to a category
- `/myApp/register` registers a user
- `/myApp/login` allows the user to log in
- `/myApp/user/<UserID>` is the user's profile page
    1. If browsed by user with `UserID`, this should show and link to all the lists (see below for URL) the user has created/contributed to
    2. If browsed by the public (i.e. anyone else), this should show only the public lists of the user

- `/myApp/user/<UserID>/<ListID>` shows a list's ranking by the user with `<UserID>`
    1. If browsed by user with `UserID`, there should be options of reranking (should route to `/myApp/lists/rank/<ListID>`) or turning the ranking public/private.
    2. If browsed by the public, the aforementioned options shouldn't exist.

- `/myApp/lists/view/<ListID>` shows the global ranking of the list with `<ListID>`
    1. If a logged in user is browsing this page and they have contributed to this list before, alert them that they have ranked this before and link to their existing ranking at `/myApp/user/<UserID>/<ListID>`.
    2. In all cases, there should be a rank button that links to the rank page.
    
- `/myApp/lists/rank/<ListID>` allows for a ranking to be made out of a list
    1. At this page, the user can rank the list's items. After the ranking is completed, there should be an option of saving the ranking either as a private or a public one (requires logging in/registering as needed). There should also be an option of sharing the ranking.

- `/myApp/lists/create` should allow a logged-in user to create a list:
    1. The backend can serve the form for list creation if received a GET request. It would also handle the POST request submitted by said form. The form have yet to include the list creator's userID automatically.
- `/myApp/get/lists` is for internal use only, only sends back a JSON response. Refer to the comments for documentation.

## IMPORTANT NOTES
The CSRF Middleware is currently disabled (commented out) in `settings.py`. This **has to be enabled** when the frontend and backend is integrated.

## Database Schemes
### Lists
Each list document has the following form:
```
{
    _id: Object_Id, // generated automatically
    user: user_Id, // not implemented yet, would most likely be implemented with the user's username
    public: Boolean, // indicates if the list is public or private
    title: String, // title of the list
    items: Object, // object that maps from the name of the item to its global ranking score
    createdAt: Integer, // time of list creation in unix time
    category: String // category of the list
}
```


## Triggering pipeline

To trigger the pipeline, simply push your changes to the `master` branch. CircleCI will automatically run the `build_and_test` job, which includes building Docker images, running tests, and starting the frontend and backend services.

Make sure you have the following files in your repository:

1. `.circleci/config.yml` - Contains the CI pipeline configuration.
2. `./rankMaster/react-frontend` - Contains the Docker configuration for the frontend.
3. `./rankMaster` - Contains the Docker configuration for the backend.
4. `docker-compose.yml` - Contains the Docker Compose configuration for managing the frontend and backend services.
