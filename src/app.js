import express from 'express';
import bodyParser from 'body-parser';
import clientsRoutes from './routes/clients.routes.js'

const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const welcome = 'Welcome to the test API';
    res.send(welcome);
})

app.use('/api', clientsRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong.')
});

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});