# Introduction
[Note: This is not a fully completed skeleton project, yet; however, will work for a quicker start than from scratch! I will clean this up more in the future as I go.]

This a skeleton for a MEAN stack application (using [Clarity Design framework](https://clarity.design)) to help quick start projects in the format that I normally do. This by no means represents best practices or anything else along those lines.

This project uses
* MongoDB (via Atlas)
* ExpressJS
* Angular (w/ [Clarity Design](https://clarity.design))
* Node.js (w/ nodemon)

# Setup
Start with (obviously) cloning this repository.

```git
git clone https://github.com/rnwolfe/mean-clarity-skeleton.git
```

## Setup Backend
### To Do
1. Install node packages using `npm i`.
2. Copy `.env.template` to `.env` in the project root.
3. Configure MongoDB connection details in `./.env`. Changing the DB name will auto-create it if it doesn't exist. Mongoose will handle creation of new collections, etc. automatically when referencing them.
4. Set a unique JSON Web Token key in `./nodemon.json`.

### General Info
* Start the backend using `npm run start:server`.
* Nodemon is used to monitor for changes and auto-restart the server (it also handles environmental variables).
* The backend uses port 3000 by default, but can be changed using the `--port=PORT#` flag.

## Setup Frontend
### Steps
1. Angular will use a Node backend will be at http://localhost:3000/api when running in dev (update port as needed), but can be modified in `./src/environments/environment.ts`.
2. The Node backend URL for production needs to be set in `./src/environments/environment.prod.ts`.

### General Info
* Run the frontend using `ng serve` from project root directory.
* Frontend will run on http://localhost:4200 by default.

## Setup App
### To Do List
1. `npm run start:server`
2. `ng serve`
3. Access http://localhost:4200/settings/users and create a new user.
4. Re-enforce authentication to user API endpoints and frontend routes.

### Create First User
Once the frontend and backend are setup, you can access the app at http://localhost:4200; however, it will push you to a login page. This should be the workflow for most apps I am going to create, so this is helpful for quickstarting. Of course, the problem is that you have to create a user to access the app (which requires accessing the app). So, the skeleton has removed the authentication from the frontend and backend resources required to create a user. So, access http://localhost:4200/settings/user/ and create a new user.

### Enforce Authentication
Typically, the user creating pages would and *should* be protected by authentication. In order to kickstart this skeleton, the authentication had to be removed to create the first user and allow for login. So, the frontend and backend authentication for the user creation resources have been "opened up." Once you get a user created, you should add authentication back to them (as well as keep it on needed resources as you create them).

`./backend/routes/user.js`
```js
// Uncomment for auth enforcement (after skeleton setup/first user created)
// router.get('', checkAuth, UserController.getUsers);
// router.get('/:id', checkAuth, UserController.getUser);
// router.put('/:id', checkAuth, UserController.updateUser);
// router.delete('/:id', checkAuth, UserController.deleteUser);
router.get('', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
```

`./app/src/app-routing.module.ts`
```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'settings', redirectTo: 'settings/example', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'settings/example', component: ExampleSettingsComponent, canActivate: [AuthGuard] },
  // Uncomment these 3 lines, and comment out the following 3 lines to enforce authentication
  // (This should be done after creating your first user in the skeleton app.)
  // { path: 'settings/users', component: UserListComponent, canActivate: [AuthGuard] },
  // { path: 'settings/users/create', component: UserCreateComponent, canActivate: [AuthGuard] },
  // { path: 'settings/users/edit/:userId', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'settings/users', component: UserListComponent },
  { path: 'settings/users/create', component: UserCreateComponent },
  { path: 'settings/users/edit/:userId', component: UserCreateComponent },
];
```
# Building Off of the Skeleton
## Backend Authentication
The skeleton example backend API endpoints require authentication for any update/create operations. This means that you must be logged in and therefore have an account. The `checkAuth` middleware can be added on the route to require authentication.

## Frontend Authentication
The frontend automatically handles the addition of the `Authorization: Bearer [token]` using an HTTP Interceptor. The interceptor can be found in `./src/app/auth/auth-interceptor.ts`. This token is then used in an AuthGuard that checks, using `auth.service.ts`, if thte user is authenticated to enforce authentication for frontend routes, as well. This AuthGuard is applied on the frontend routes using `CanActivate` on the route (in `./app/src/app-routing.module.ts`):

```typescript
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'settings', redirectTo: 'settings/example', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'settings/example', component: ExampleSettingsComponent, canActivate: [AuthGuard] },
  // Uncomment these 3 lines, and comment out the following 3 lines to enforce authentication
  // (This should be done after creating your first user in the skeleton app.)
  // { path: 'settings/users', component: UserListComponent, canActivate: [AuthGuard] },
  // { path: 'settings/users/create', component: UserCreateComponent, canActivate: [AuthGuard] },
  // { path: 'settings/users/edit/:userId', component: UserCreateComponent, canActivate: [AuthGuard] },
  { path: 'settings/users', component: UserListComponent },
  { path: 'settings/users/create', component: UserCreateComponent },
  { path: 'settings/users/edit/:userId', component: UserCreateComponent },
];
```

## Add New API Routes
The general structure for routes uses

* **Controllers** for logic.
* **Routes** for directing requests (gets, posts, deletes, etc).
* **Top level routes** are put in `app.js`.

Logic should be in `./backend/controllers/[name].js`.

```js
const Post = require('../models/post');

exports.deletePost = (req, res, next) => {
Post.deleteOne({ _id: req.params.id, creator: req.userData.userId })
  .then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'Post deleted!' });
    } else {
      res.status(401).json({ message: 'Not authorized.' });
    }
  }).catch(error => {
    res.status(500).json({
      message: 'Failed to delete post!'
    })
  });
}
```

The routes file in `./backend/routes` has the specific gets, puts, posts, deletes, etc. This file should not contain logic, but the specific routes calling specific functions. Authentication can be required by adding the `checkAuth` middleware (after importing) to the route.

```js
const express = require('express');
const PostController = require('../controllers/posts');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;
```

Top level is in `./backend/app.js` specifying that all `/api/[name]` URIs should use the router model in `./backend/routes/`.

```js
const postsRoutes = require('./routes/posts');
app.use('/api/posts', postsRoutes);
```
