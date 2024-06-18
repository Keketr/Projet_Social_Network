# Main goal 

Our applicaiton has as goal to be like Facebook, it is a social media application where we can post photo and comments on our page. Like and comments posts, delete posts and can modify the profile of the user. We add a little functionality which is the dark mode on the navbar.

The application is working correctly when we have a user connected, it can see the stories, add a new post,like, etc.

# Getting Started with Create React App

"api" is the server, so the backend

"client" is the client side, so the frontend

# To start

Go to the client and api folder in two terminals

Add all dependencies 

npm/yarn add sass (don't need to write all classes)

Api and client : 

npm install or yarn

npm/yarn add moment (library to add date)


API part : 
npm/yarn add express mysql nodemon

npm init -y (to initialise the node application)

npm add @tanstack/react-query

npm/yarn add bycryptjs to encrypt the password

npm/yarn add multer (to store file)

npm add jsonwebtoken cookie-parser cors


# Database 

We have not used an ORM layer, so we use Mysql.
You can add user to the database by hand on Mysql Workbench

Create a database and connect it in the connect.js file, you should use this sample of database :

Note : By default a variable is null

users table : 

id INT PK NN UQ AI
username VARCHAR(45) NN
email VARCHAR(45) NN
password VARCHAR(200) NN
name VARCHAR(45) NN
coverPic VARCHAR(100)
profilePic VARCHAR(100)
city VARCHAR(45)
website VARCHAR(45)

stories table : 

id INT PK NN UQ AI
img VARCHAR(200) NN
userId INT NN

Foreign key : 

storyUserId `social`.`users` userId id CASCADE CASCADE

relationships table : 

id INT PK NN UQ AI
followerUserId INT NN
followedUserId INT NN

Foreign key : 

followedUser `social`.`ùsers` followedUser id CASCADE CASCADE
followerUser `social`.`users`followerUser id CASCADE CASCADE

posts table : 

id INT PK NN UQ AI
desc VARCHAR(200)
img VARCHAR(200)
userId INT NN
createAt DATETIME

Foreign key : 

userId `social`.`users` userId id CASCADE CASCADE

likes table : 

id INT PK NN UQ AI
userId INT NN
postId INT NN

Foreign key : 

likeeUserId `social`.`users` userId id CASCADE CASCADE
likePostId `social`.`posts` postId id CASCADE CASCADE

comments table : 

id INT PK NN UQ AI
desc VARCHAR(200) NN
createAt DATETIME
userId INT NN
postId INT NN

Foreign Key 

commentUserId `social`. `users` userId id CASCADE CASCADE

postId `social`.`posts` postId id CASCADE CASCADE





