import {Router} from 'express'
import {getClients, getClient, addClient, updateClient, deleteClient} from '../database.js';

const router = Router();

router.get('/clients', async (req, res) => {
    console.log('Incoming GET request');
    console.log(req.method);
    console.log(req.url);
    const clients = await getClients();
    console.log(clients);
    res.send(clients);
});

router.get('/clients/:id', async (req, res) => {
    console.log('Incoming GET request');
    console.log(req.method);
    console.log(req.url);
    const clientId = req.params.id;
    const client = await getClient(clientId);
    if(client !== undefined) {
    console.log(client);
    res.send(client);
    } else {
        res.status(404).end(`Client ${clientId} not found`);
        console.log(client);
    }
});

router.post('/clients', async (req, res) => {
    console.log('Incoming POST request');
    const {name, city} = req.body;
    console.log(`Add client\nname: ${name}, city: ${city}`);
    const result = await addClient(name, city);
    console.log(result);
    res.send(result);
});

router.put('/clients/:id', async (req, res) => {
    console.log('Incoming PUT request');
    const clientId = req.params.id;
    const {name, city} = req.body;
    const result = await updateClient(clientId, name, city);
    console.log(result);
    res.send(result);
});


router.delete('/clients/:id', async (req, res) => {
    console.log('Incoming DELETE request');
    const clientId = req.params.id;
    const result = await deleteClient(clientId);
    console.log(result);
    res.send(result);
});

export default router;