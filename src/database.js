import dotenv from 'dotenv'
import {PrismaClient} from '@prisma/client'

export const prisma = new PrismaClient();

const query = async () => {
    const test = await prisma.test.createMany({
        data: [
            {name: 'Daniel Navarrete', city: 'Philadelphia'},
            {name: 'Melissa Bustamante', city: 'Michigan'},
        ]
    })
    console.log(test);
    const alltest = await prisma.test.findMany();
    console.log(alltest);
    
    const onetest = await prisma.test.findUnique({
        where: {
            idclient: 3
        }
    });
    console.log(onetest);

    const updateClient = await prisma.test.update({
        where: {
            idclient: 8
        },
        data: {
            // name: 'Selena Quintanilla',
            city: 'Corpus'
        }
    });
    console.log(updateClient);

    const  deleteClient = await prisma.test.deleteMany({
        where: {
            name: {
                contains: 'Melissa',
            },
        }
    })
    console.log(deleteClient);
}

dotenv.config();

export const getClients = async () => {
    const clients = await prisma.client.findMany();
    return clients;
}

export const getClient = async _id => {
    const client = await prisma.client.findUnique({
        where: {
            id: _id,
        }
    });
    return client;
}

export const addClient = async (_name, _city) => {
    const client = await prisma.client.create({
        data: {
            name: _name,
            city: _city,
        }
    });
    return client;
}

export const updateClient = async (_id, _name=null, _city=null) => {
    let _data = {}
    if(_name) _data.name = _name;
    if(_city) _data.city = _city;
    let client = null;
    try{
        client = await prisma.client.update({
            where: {
                id: _id,
            },
            data: _data,
        });
    } catch (error) {
        console.log(error.message);
    }
    return client;
}

export const deleteClient = async _id => {
    let client = null;
    try {
        client = await prisma.client.delete({
            where: {
                id: _id,
            }
        });
    } catch (error) {
        console.log(error.message);
    }
    return client;
}