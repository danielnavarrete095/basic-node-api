import {Router} from 'express'
import {getClients, getClient, addClient, updateClient, deleteClient} from '../database.js';

const router = Router();

router.get('/clients', async (req, res) => {
    const clients = await getClients();
    res.send(clients);
});

router.get('/clients/:id', async (req, res) => {
    const clientId = req.params.id;
    const client = await getClient(clientId);
    if(client !== undefined) {
        res.send(client);
    } else {
        res.status(404).end(`Client ${clientId} not found`);
        console.log(client);
    }
});

router.post('/clients', async (req, res) => {
    const clientId = req.params.id;
    const {name, city} = req.body;
    const result = await addClient(name, city);
    res.send(result);
    // res.send(`Error adding client ${clientId}`)
});

router.put('/clients/:id', async (req, res) => {
    const clientId = req.params.id;
    const {name, city} = req.body;
    const result = await updateClient(clientId, name, city);
    res.send(result);
    // res.send(`Client with id: ${clientId} updated`)
});


router.delete('/clients/:id', async (req, res) => {
    const clientId = req.params.id;
    const result = await deleteClient(clientId);
    res.send(result);
    // res.send(`Error deleting ${clientId}`);
});

export default router;