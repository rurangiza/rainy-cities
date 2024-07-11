import express from 'express';

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser'
import { getCityCoordinates, getCityWeather } from './helpers'
// import dotenv from 'dotenv';


const app:express.Application = express();
const hostname: string = '127.0.0.1';
const port: number = 8000;

interface CsvData {
    id: string;
    city_name: string;
    order: string;
    timestamp: string;
}

interface WeatherData {
    id: number,
    city_name: string,
    weather_condition: string,
    timestamp: number,
    code: number
}



app.get('/', (request: express.Request, response: express.Response) => {
    console.log(process.env.WEATHER_API_KEY)
    response.status(200).send(`
        <h1 style="color: cyan;">
            Hello, world
        </h1>
    `)
    // response.json();
})



app.get('/cities', (request: express.Request, response: express.Response) => {
    response.status(200);
    let db: CsvData[] = [];
    fs.createReadStream(path.join(__dirname, 'data', 'exemple.csv'))
        .pipe(csv())
        .on('data', (data: CsvData) => db.push(data))
        .on('end', () => {
            let cities = []
            for (let city of db) {
                cities.push(city.city_name)
            }
            response.json(cities);
        })
        .on('error', (err) => {
            response.status(500)
            response.json({error: 'Failed to read CSV file'})
        })
})



function isRainy(weather_condition_code: number) {
    return weather_condition_code >= 500 && weather_condition_code < 600
}

async function getCities() {
    const filePath = path.join(__dirname, 'data', 'city.list.json')
    await fs.readFile(filePath, 'utf8', (err: any, data: any) => {
    if (err) {
        console.error(err);
        return;
    }
    try {
        const data: any = await fs.readFile(filePath, 'utf8', (err: any, data: any))
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error parsing JSON', err);
    }
    });
}

app.post('/raining_cities', async (request: express.Request, response: express.Response) => {
    response.status(200)

    // const cities: string[] = ["mons", "paris", "brussels", "porto", "amsterdam"]
    const cities: any = await getCities()
    console.log(cities)

    // let rainyCities: string[] = []

    
    // for (let city of cities) {
    //     const coord: any = await getCityCoordinates(city).then(resp => { return resp }).catch(error => {})
    //     const cityWeather: any = await getCityWeather(coord.lat, coord.lon).then(resp => { return resp }).catch(error => {console.log(error)});
    //     rainyCities.push(cityWeather)
    //     if (rainyCities.length == 10) {
    //         break
    //     }
    //     if (isRainy(cityWeather.code)) {
    //         rainyCities.push(cityWeather)
    //     }
    // }
    response.json({'message': "it's a win"})
    // const bulk_daily = `https://bulk.openweathermap.org/snapshot/daily_zip_uk.csv.gz?appid=${process.env.WEATHER_API_KEY}`
    // const bulk_daily = `https://bulk.openweathermap.org/snapshot/daily_14.json.gz?appid=${process.env.WEATHER_API_KEY}`
    
})



// delete the list
// search 10 cities where it is raining right now (or today)
//  load the CSV file with the information (ID, city name, weather condition, order number, timestamp)
// append it to the CSV file

app.put('/cities:order_number', (request: express.Request, response: express.Response) => {
    response.json()
})



app.listen(port, hostname, () => {
    console.log(`Express server started at http://${hostname}:${port}`)
})