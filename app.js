import express from 'express';
import {getClients, getClient, addClient, updateClient, deleteClient} from './database.js';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.get('/clients', async (req, res) => {
    const clients = await getClients();
    res.send(clients);
})

app.get('/clients/:id', async (req, res) => {
    const clientId = req.params.id;
    const client = await getClient(clientId);
    if(client !== undefined) {
        res.send(client);
    } else {
        res.send(`Client ${clientId} doesn't exist`);
        console.log(client);
    }
})

app.post('/add', async (req, res) => {
    const clientId = req.params.id;
    const {name, city} = req.body;
    const result = await addClient(name, city);
    res.send(result);
    // res.send(`Error adding client ${clientId}`)
})

app.put('/update/:id', async (req, res) => {
    const clientId = req.params.id;
    const {name, city} = req.body;
    const result = await updateClient(clientId, name, city);
    res.send(result);
    // res.send(`Client with id: ${clientId} updated`)
})


app.delete('/delete/:id', async (req, res) => {
    const clientId = req.params.id;
    const result = await deleteClient(clientId);
    res.send(result);
    // res.send(`Error deleting ${clientId}`);
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong.')
});

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});