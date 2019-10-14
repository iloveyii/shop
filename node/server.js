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

function isAdmin(req) {
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
          AND admin=1
          ;
        `;

    async function doQuery() {
        await
            con.query(sql, (err, result) => {
                if (err) throw  err;
                console.log(result);
                return result.length > 0;
            });
    }

    return doQuery();
}

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
    console.log('Headers: ', req.headers);
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
    console.log('Headers: ', req.headers);

});

app.post('/api/v1/users', (req, res, next) => {
    const userInput = req.body.item;
    const email = userInput.email;
    const username = userInput.username;
    const password = md5(userInput.password);
    const doerIsAdmin =  1; //isAdmin(req); @TODO
    let admin =  0;
    if(userInput.admin && doerIsAdmin) {
        admin = userInput.admin;
    }

    sql = `
          INSERT INTO login (email, username, password, admin)
          VALUES ('${email}', '${username}', '${password}', ${admin});
        `;

    console.log(sql);

    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log('Result:', result);
        const response = {
            status : result.affectedRows
        }
        res.json(response);
    });

    console.log('Headers: ', req.headers);
});


app.put('/api/v1/users/:id', (req, res) => {
    console.log('PUT /api/v1/posts', req.body, req.params.id);
    const userId = req.params.id;
    const userInput = req.body;
    const {email, username, password} = userInput;
    const doerIsAdmin =  1; //isAdmin(req); @TODO
    let admin =  0;
    if(userInput.admin && doerIsAdmin) {
        admin = userInput.admin;
    }
    sql = `
          UPDATE login SET email='${email}', username='${username}', password='${password}', admin=${admin}
          WHERE id=${userId}
        `;
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log('Result:', result);
        res.json(result);
    });
});

app.delete('/api/v1/users/:id', (req, res) => {
    const userId = req.params.id;
    sql = `
          DELETE from login 
          WHERE id=${userId}
        `;

    console.log(sql);

    con.query(sql, (err, result) => {
        if (err) throw  err;
        console.log('Result:', result);
        res.json(result);
    });
});




app.listen(port, () => console.log('Server started on port ' + port));


