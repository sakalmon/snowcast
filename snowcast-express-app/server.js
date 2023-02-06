const express = require('express');
const db = require('./db/db');
const Resort = require('./models/resort');
const fs = require('fs');

const app = express();
const port = 3001;

app.listen(port, () => console.log(`Server is listening on port ${port}`));

// To be able to extract data from req.body
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json('Welcome to the Snowcast API');
});

// app.get('/popular_resorts', (req, res) => {
//   const popularResorts = ['Lake Louise Ski Resort'];

//   res.json(Resort.getResortSnowFall(popularResorts[0]));
// });

app.get('/sample_data', (req, res) => {
  const fileContents = fs.readFileSync('./sample_data.txt').toString();
  res.json(JSON.parse(fileContents));
});