var express = require('express');
var path = require('path');
var mysql = require("mysql");
var app = express();


var data = [
    {
        make: 'toyoat',
        model: 'Camry'
    },
    {
        make: 'ford',
        model: 'explorer'
    }
]

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "todolist"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;


// html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './index.html'))
})


// api data
app.get('/tasks', function (req, res) {
    connection.query("SELECT * FROM todos", function (error, results) {
        res.send(results)
    });
})
//make route "/remove/:id"

app.listen(3000);