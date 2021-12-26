const express = require('express');
require('dotenv').config();
require('./config/db.js');
const cors = require('cors')
const bodyParser = require('body-parser');
const auth = require('./middleware/auth.js');
const userRoutes = require('./routes/userRoutes');
const countryRoutes = require('./routes/countryRoutes.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.route('/').get((req, res) => {
  res.json({ message: 'Please use /countries' });
});

app.use(auth);

countryRoutes(app);
userRoutes(app);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = app;
