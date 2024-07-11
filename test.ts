import path from 'path'
import fs from 'fs/promises'

fs.readFile(path.join(__dirname, 'data', 'city.list.json'))
  .then((data) => {
    // Do something with the data
    console.log(data)
  })
  .catch((error) => {
    // Do something if error 
  });

// const config = JSON.stringify({ ip: '1234.22.11', port: 3000});
// console.log(JSON.parse(config), typeof(JSON.parse(config)), typeof(config));