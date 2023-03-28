var express = require('express')
var cors = require('cors')
var app = express()
const mysql = require('mysql2');

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'datapro'
  });



app.get('/user', function (req, res, next) {
    connection.query(
        'SELECT * FROM `admin`',
        function(err, results, fields) {
            res.json(results);
            console.log(results); // results contains rows returned by server
        }
    );
})

app.get('/user/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM `admin` WHERE `id` = ?',
        [id],
        function(err, results) {
            res.json(results);
        }
      );
})

app.post('/user', function (req, res, next) {
    connection.query(
        'INSERT INTO `admin` ( `name`, `phone`, `email`, `username`, `password`) VALUES (?, ?, ?, ?, ?);',
        [
            req.body.name,
            req.body.phone,
            req.body.email,
            req.body.username,
            req.body.password
        ],
        function(err, results) {
            res.json({data_save_success : req.body})
        }
      );
})

app.put('/user', function (req, res, next) {
    connection.query(
        'UPDATE `admin` SET `name`= ?,`phone`= ?,`email`= ?,`username`= ?,`password`=? WHERE id = ?',
        [
            req.body.name,
            req.body.phone,
            req.body.email,
            req.body.username,
            req.body.password,
            req.body.id
        ],
        function(err, results) {
            res.json({data_edit_success : req.body})
        }
      );
})

app.delete('/user', function (req, res, next) {
    connection.query(
        'DELETE FROM `admin` WHERE id = ?',
        [
            req.body.id
        ],
        function(err, results) {
            res.json({data_delete_success : req.body})
        }
      );
})

app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000')
})