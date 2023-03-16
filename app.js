const express = require('express');
const mysql = require('mysql2');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

const DB_USER = process.env.MYSQL_USER;
const DB_PASSWORD = process.env.MYSQL_PASSWORD;

if(!DB_USER || !DB_PASSWORD) throw "Cannot get db credentials";

const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'node_mysql'
});


connection.connect(error => {
    if(error) throw error;
    console.log('Database connection is OK')
})

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.get('/clients', (req, res) => {
    const sql = 'SELECT * FROM client';

    connection.query(sql, (error, result)=> {
        if(error) throw error;
        if(result.length) {
            res.json(result);
        } else {
            res.send('No clients in database');
        }
    })
})

app.get('/clients/:id', (req, res) => {
    const clientId = req.params.id;
    const sql = `SELECT * FROM client WHERE idclient=${clientId}`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        if(result.length > 0) {
            res.json(result);
        } else {
            res.send(`Client with id = ${clientId} doesn't exist in database`)
        }
    })
    // res.send(`Client ${clientId}`);
})

app.post('/add', (req, res) => {
    const clientId = req.params.id;
    const sql = 'INSERT INTO client (name, city) VALUES ("Daniel Navarrete", "Chihuahua")';
    connection.query(sql, (error, result) => {
        if(error) throw error;
        if(result.affectedRows > 0) {
            res.json(result);
        } else {
            res.send(`Error adding client ${clientId}`)
        }
    })
    // res.send('New client added');
})

app.put('/update/:id', (req, res) => {
    const clientId = req.params.id;
    res.send(`Client ${clientId} udpated`);
})


app.delete('/delete/:id', (req, res) => {
    const clientId = req.params.id;
    const sql = `DELETE FROM client WHERE idclient = ${clientId}`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        if(result.affectedRows > 0) {
            res.send(`Client with id ${clientId} deleted`)
        } else {
            res.send(`Error deleting ${clientId}`);
        }
    })
    // res.send(`Client ${clientId} deleted`);
})

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});