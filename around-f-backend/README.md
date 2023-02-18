# Around the U.S. Back End  

This is a project that will teach me how to use Node.js and Express.js to create my own server and my own REST API with user authentication. 
I used MongoDB as the database.

* It contains the following routes:

  - GET /users — returns all users;
  - GET /users/:userId — returns a user by its _id;
  - POST /users — creates a new user;
  - PATCH /users/me — updates the profile;
  - PATCH /users/me/avatar — updates avatar.

  - GET /cards — returns all cards from the database;
  - POST /cards — creates a card with the name and link passed in the request body. Owner is set;
  - DELETE /cards/:cardId — deletes a card by its _id;
  - PUT /cards/:cardId/likes — likes a card;

* Custom validation with RegEx 

* Custom error handling
  
## Directories  

![Project's directories](https://pictures.s3.yandex.net/resources/Artboard_1_1600101133.png)
  
## Running the Project  
  
`npm run start` — to launch the server.  
  
`npm run dev` — to launch the server with the hot reload feature.  
