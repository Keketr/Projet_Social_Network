
### Description

Our applicaiton has as goal to be like Facebook, it is a social media application where we can post photo and comments on our page. Like and comments posts, delete posts and can modify the profile of the user, you can add cover picture and profile picture, add a website link. We add a little functionality which is the dark mode on the navbar.

The application is working correctly when we have a user connected, it can see the stories, add a new post,like,comments, delete a post, modify their profile. The application is also reactive to any type of format and use Cookies, so you don't need to log in again

### How to run it

In our project, 'api' and 'client' are the backend and frontend

### To run backend do 
1. `cd api ` and run `npm install`
2. If it not import all dependencies, please install those :  
npm/yarn add express mysql nodemon

npm init -y (to initialise the node application)

npm add @tanstack/react-query

npm/yarn add bycryptjs to encrypt the password

npm/yarn add multer (to store file)

npm add jsonwebtoken cookie-parser cors

npm/yarn add sass (don't need to write all classes)

npm install or yarn

npm/yarn add moment (library to add date)
3. On Github you will also find a SQL file, which is the database, dowload it.
4. If you don't have MySQL 8 use this link to install it `https://dev.mysql.com/downloads/installer/` and also you have to install MySQL workbench `https://dev.mysql.com/downloads/workbench/`
5. Create an account and a password and put alll the necessary informations to link the database to the backend server
6. Make sure to have the latest version or please do an update of your MYSQL
7. With the latest version you can encounter a problem with the authentification : 
Update your MySQL client: Make sure you are using a version of the MySQL client that supports the caching_sha2_password authentication protocol. You may need to update your MySQL client library or driver.

Change the server authentication mode: If a client update is not possible, you can change the authentication mode on the MySQL server for the user account you are using. To do this, run the following command in your MySQL server:
`ALTER USER 'votre_nom_utilisateur'@'votre_hôte' IDENTIFIED WITH 'mysql_native_password' BY 'your_password';` replace it by your personnal informations.
8. If you encounter a problem like that : `(ER_NOT_SUPPORTED_AUTH_MODE)`, please use this command  on the terminal MYSQL to update the package MYSQL
`npm install mysql2 --save`

also : 
Change authentication plugin for MySQL user : 

`ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'your_passaword';
FLUSH PRIVILEGES;`

9. Run `npm start`

You can see your api in url `http://localhost:8800/`


  

#### To run frontend do
1. `cd client` and run `npm install`
2. Same here, if all dependecies has not been imported correctly please install it with those commands : 
`npm/yarn add sass` (don't need to write all classes)
`npm install or yarn`

`npm/yarn add moment` (library to add date)
3. Run `npm start`

You can see your project at `http://localhost:3000/`

























