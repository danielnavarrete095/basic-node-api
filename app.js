const express = require('express');
const db = require('./database.js')

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;


const app = express();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong.')
}).use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.get('/clients', async (req, res) => {
    const clients = await db.getClients();
    res.send(clients);
})

app.get('/clients/:id', (req, res) => {
    const clientId = req.params.id;
    const sql = `SELECT * FROM client WHERE idclient=${clientId}`;
    connectionPool.query(sql, (error, result) => {
        if(error) throw error;
        if(result.length > 0) {
            res.json(result);
        } else {
            res.send(`Client with id = ${clientId} doesn't exist in database`)
        }
    })
})

app.post('/add', (req, res) => {
    const clientId = req.params.id;
    const sql = 'INSERT INTO client SET ?';
    const clientObj = {
        name: req.body.name,
        city: req.body.city
    }
    console.log(req.body);
    connectionPool.query(sql, clientObj, (error, result) => {
        if(error) throw error;
        if(result.affectedRows > 0) {
            res.json(result);
        } else {
            res.send(`Error adding client ${clientId}`)
        }
    })
})

app.put('/update/:id', (req, res) => {
    const clientId = req.params.id;
    const {name, city} = req.body;
    const sql =`UPDATE client SET name = '${name}', city = '${city}' WHERE idclient = ${clientId}`;
    connectionPool.query(sql, (error, result)=> {
        if(error) throw error;
        res.send(`Client with id: ${clientId} updated`)
    })
})


app.delete('/delete/:id', (req, res) => {
    const clientId = req.params.id;
    const sql = `DELETE FROM client WHERE idclient = ${clientId}`;
    connectionPool.query(sql, (error, result) => {
        if(error) throw error;
        if(result.affectedRows > 0) {
            res.send(`Client with id ${clientId} deleted`)
        } else {
            res.send(`Error deleting ${clientId}`);
        }
    })
})

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});