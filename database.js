const mysql = require('mysql2');
require('dotenv').config();

const DB_USER = process.env.MYSQL_USER;
const DB_PASSWORD = process.env.MYSQL_PASSWORD;

if(!DB_USER || !DB_PASSWORD) throw "Cannot get db credentials";

const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'node_mysql'
}).promise();

async function getClients() {
    const [rows] = await connectionPool.query("SELECT * FROM client");
    return rows;
}

async function getClient(id) {
    const [rows] = await connectionPool.query("SELECT * FROM client WHERE idclient = ?", id);
    return rows[0];
}

async function addClient(_name, _city) {
    const result = await connectionPool.query("INSERT INTO client SET ?", {name: _name, city: _city});
    return getClient(result[0].insertId);
}

async function updateClient(id, _name=null, _city=null) {
    await connectionPool.query(`UPDATE client SET ? WHERE idclient=${id}`, {name: _name, city: _city});
    return getClient(id);
}

async function deleteClient(id) {
    const result = await connectionPool.query(`DELETE FROM client WHERE idclient=${id}`);
    return result;
}

getClients().then((result) => {
    console.log('Clients: ', result);
});
getClient(14).then((result) => {
    console.log('Client with id 14: ', result);
});
addClient('Melissa', 'Chihuahua').then((result) => {
    console.log('Client added: ', result);
});
updateClient(24, 'Dany', 'Orlando').then((result) => {
    console.log('Client updated: ', result);
});
deleteClient(47).then((result) => {
    console.log('Client with id 24 deleted');
});

module.exports={getClients}