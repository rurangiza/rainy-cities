import http, {Server, IncomingMessage, ServerResponse} from 'http';

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser'


// Configurations

const hostname: string = '127.0.0.1';
const port: number = 7999;

interface CsvData {
    id: string;
    city_name: string;
    order: string;
    timestamp: string;
}


// Routing


const server:Server = http.createServer( (request: IncomingMessage, response: ServerResponse)=> {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');

    // fs module 
    let db: CsvData[] = [];
    fs.createReadStream(path.join(__dirname, 'data', 'exemple.csv'))
        .pipe(csv())
        .on('data', (data: CsvData) => db.push(data))
        .on('end', () => {
            let cities = []
            for (let city of db) {
                cities.push(city.city_name)
            }
            response.end(`${JSON.stringify(cities)}`);
        })
        .on('error', (err) => {
            response.statusCode = 500
            response.end(JSON.stringify({error: 'Failed to read CSV file'}))
        })
});


// launch server

server.listen(port, hostname, () => {
    console.log(`Node JS Server started at http://${hostname}:${port}`)
});
