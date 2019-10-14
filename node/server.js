// Import required packages
const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const md5 = require('md5');

app.use(
    express.static(__dirname + '/public'),
    bodyParser.urlencoded({extended: true}),
    bodyParser.json(),
    cors()
);

const port = process.env.PORT || 8090;

// Database credentials
const dbHost = 'localhost';
const dbName = 'shopping';
const dbUser = 'root';
const dbPass = 'root';

// Connect to MySQL
const con = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPass
});


con.connect(err => {
    if (err) throw err;
    console.log('MySQL connected !');

    // Select Database
    con.changeUser({database: dbName}, function (err) {
        if (err) throw err;
        console.log('Database changed to ' + dbName);
    });
});

app.get('/api/v1/login', (req, res) => {
    const userInput = req.headers;
    // const username = userInput.username ? userInput.username : 'root';
    // const password = userInput.password ? md5(userInput.password) : 'root';
    console.log('UserInput', userInput);

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    let [username, password] = credentials.split(':');
    console.log('credentials', credentials);
    password = md5(password);

    sql = `
          SELECT * 
          FROM login 
          WHERE username='${username}' 
          AND password='${password}'
          ;
        `;

    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log(result);
        const auth = {
            authenticated: false
        };
        if(result.length > 0) {
            auth.authenticated = true;
        }

        res.json(auth);
    });

    console.log(sql);
});

app.get('/api/v1/users', (req, res) => {
    sql = `
          SELECT * 
          FROM login 
          ;
        `;

    con.query(sql, (err, result) => {
        if (err) throw  err;
        res.json(result);
    });

    console.log(sql);
});

app.post('/api/v1/users', (req, res, next) => {
    const userInput = req.body.item;
    const username = userInput.username;
    const password = md5(userInput.password);
    const admin = userInput.admin ? 1 : 0;
    sql = `
          INSERT INTO login (username, password, admin)
          VALUES ('${username}', '${password}', ${admin}) 
          ;
        `;

    console.log(sql);

    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log('Result:', result);
        res.json(result);
    });
});

app.delete('/api/v1/posts/:id', (req, res) => {
    const postId = db.getPrimaryKey(req.params.id);
    db.getDb().collection(collection).findOneAndDelete(
        {_id: postId},
        (err, action) => {
            if (err) {
                console.log('Error in deleting id ' + req.params.id);
            } else {
                res.json(action)
            }
        }
    );
});




app.listen(port, () => console.log('Server started on port ' + port));


