const express = require('express');
const db = require('./db/db');

const app = express();
const port = 3001;

app.listen(port, () => console.log(`Server is listening on port ${port}`));

// To be able to extract data from req.body
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json('Welcome to the Snowcast API');
});