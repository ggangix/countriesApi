const express = require('express');
require('dotenv').config();
require('./config/db.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.route('/').get((req, res) => {
  console.log('works');
});


const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = app;
