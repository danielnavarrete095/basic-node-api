import mysql from 'mysql2'
// import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

const DB_USER = process.env.MYSQL_USER;
const DB_PASSWORD = process.env.MYSQL_PASSWORD;
const DB_DATABASE = process.env.MYSQL_DATABASE;
const DB_HOST = process.env.MYSQL_HOST;
const DB_PORT = process.env.MYSQL_PORT;

if(!DB_USER || !DB_PASSWORD) throw "Cannot get db credentials";

const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
}).promise();

export const getClients = async () => {
    const rows = await connectionPool.query(`
        SELECT * 
        FROM client
    `);
    return rows[0];
}

export const getClient = async id => {
    const row = await connectionPool.query(`
        SELECT * 
        FROM client 
        WHERE idclient = ?`, id
    );
    return row[0][0];
}

export const addClient = async (_name, _city) => {
    const result = await connectionPool.query(`
        INSERT INTO client 
        SET ?`,
        {
            name: _name,
            city: _city
        }
    );
    return getClient(result[0].insertId);
}

export const updateClient = async (id, _name=null, _city=null) => {
    const result = await connectionPool.query(`
        UPDATE client
        SET ?
        WHERE idclient=${id}`, 
        {
            name: _name, 
            city: _city
        }
    );
    return getClient(id);
}

export const deleteClient = async id => {
    const result = await connectionPool.query(`
    DELETE FROM client
    WHERE idclient=${id}`
    );
    return result;
}

// getClients().then((result) => {
//     console.log('Clients: ', result);
// });
// getClient(14).then((result) => {
//     console.log('Client with id 14: ', result);
// });
// addClient('Melissa', 'Chihuahua').then((result) => {
//     console.log('Client added: ', result);
// });
// updateClient(24, 'Dany', 'Orlando').then((result) => {
//     console.log('Client updated: ', result);
// });
// deleteClient(47).then((result) => {
//     console.log('Client with id 24 deleted');
// });