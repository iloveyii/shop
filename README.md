Shopping Test Application
=====================================

This is a small Test web application developed in React, Redux, SASS, PHP. 

### Requirements
This is an assignment where you will develop a simple application from scratch.
Please share your solution to the email johan.frick@coolstuff.com. Note that zip files are usually blocked by mail servers, so we recommend you to share the solution in some other way of your choice.
If you find a requirement unclear, you are allowed to take your own decision on how to proceed, as long as you motivate your choice when handing in the solution.
Good Luck!

### Application Requirements
These are the requirements for the application. The requirement are ordered in priority. Top one is highest priority. Solve them in order and don’t worry if you don’t manage to solve all of them. Read through all the requirements, then start from the top.

#### A simple shopping list

    1. Create an HTML form with the following text fields:
    2. Name: input for text
    3. Quantity: input for integer
    4. Category: single-selection menu with the options "Food", "Snack" and "Other"
    5. Create a form handler using PHP that saves the submitted item in a MySQL table.
    6. Add a list of previously submitted items below the HTML form.
    7. Allow the user to edit and remove previously submitted items.
    8. Allow the user to create multiple shopping lists with different names.

#### Notes

    1. No javascript is required or expected to solve this, but if it makes it easier for you, feel free to use it.
    2. Feel free to use any frameworks or libraries of your own choice, as long as you can defend why you are using them.
    3. The solution should take no longer than two hours to implement. If it takes longer, your solution is probably too detailed.
    4. Normally, commented code should be kept at a minimum, but here you can feel free to add comments to code so that we can better understand your reasoning while studying the solution.
    5. We like code quality and security :-)

### Installations

#### React app
  * Clone the repository: `git clone https://github.com/iloveyii/shopping.git`.
  * CD to directory `cd react` and then run npm install `npm install` .
  * Run the build process `npm run build`.  
  * The above command will create a directory `build` containing all the needed files i.e js, css, html.  
  * Using ftp client (e.g FileZilla) to ftp.sveasolar.com and copy all the files in build directory to /v2/calculator.  
  
#### SASS app
  * CD to directory `cd sass` and then run npm install `npm install` .
  * Run the build process `npm start`. Then if you make any change to any scss file it will be automatically compiled and copied to css directory. 
  * After making any changes and compiling using the above command, copy the latest css/style.css to React App by using:
    `npm run build`.
    
#### Server app
  * CD to directory `cd server`.
  * Run composer install composer install.
  * If you want to use MySQL then create a database at your MySQL Server, and adjust the database credentials in the config.php, and also rename db2 to db.
  * If you don't want to use MySQL database this app uses sqlite by default, the db file is database.sqlite.
  * Run migrations to create the database tables as vendor/bin/yii migrate/up --appconfig=./config.php.
  * Point your web server www directory or Create a virtual host using vh vh new login-microservice -p /path/to/login-microservice/web
  * Browse to http://login-microservice.loc/users or better use Postman.
    
### Requirements

   * You many need to install the following.
     1. node >= 10.16.0
     2. npm >= 6.9.0
     3. PHP 7
     4. Apache 2 or Nginx web server
