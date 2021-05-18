# Connect-in
A social network web app.

# Live Application
[CLICK HERE](https://tranquil-reaches-70983.herokuapp.com/) to visit the live application.

# Overview

A Social network Web Application, built on MERN stack.
Users can sign-up/sign-in and create and edit Profile credentials, add and edit Education and Experience credentials.
Users can view and visit the profile of all the developers on the platform.
Users can create and add posts.
Users can view posts, like, unlike and add comments by visiting that post.

# Features
- Authentication
  - User must signup and signin to verify their identity to use the application.
  - Bcryptjs and JWT used for authentication.
  - Added Private Routing.
  
- Actions

  - User Profile/Dashboard
    - Create/Edit Profile.
    - Create/Edit and Delete Education credentials.
    - Create/Edit and Delete Experience crendentials.
    - Delete Account permenantly.
  
  - All Profiles/Developers
    - List all Profiles.
    - View any single Profile.
    - Show Edit Profile button if the profile belongs to the current user.  

  - Posts
    - List all posts.
    - Create and add new Post.
    - Delete a Post.
    - Like, Unlike and add and Delete Comments.
    - Like a Post only once.
    - Cannot Unlike a Post without Liking it first.
    - View any Single Post.
    
  # Packages
  ## FrontEnd
  - [axios](https://www.npmjs.com/package/axios)
  - [uuid](https://www.npmjs.com/package/uuid)
  - [react-moment](https://www.npmjs.com/package/react-moment)
  - [react-icons](https://www.npmjs.com/package/react-icons)
  - [redux](https://www.npmjs.com/package/redux)
  - [react-redux](https://www.npmjs.com/package/react-redux)
  - [redux-thunk](https://www.npmjs.com/package/redux-thunk)
  - [react-router-dom](https://www.npmjs.com/package/react-router-dom)

  ## BackEnd
  - [bcryptjs](https://www.npmjs.com/package/bcrypt)
  - [config](https://www.npmjs.com/package/config)
  - [express-validator](https://www.npmjs.com/package/express-validator)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [nodemon](https://www.npmjs.com/package/nodemon)
  - [concurrently](https://www.npmjs.com/package/concurrently)

### Contributors
[Puneeth R](https://www.linkedin.com/in/puneeth-r-gowda/)
