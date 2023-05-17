const express = require('express');
const mongoose = require('mongoose');
const passport = require ('passport');
const cors =  require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'));

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3005, () => {
  console.log(`Server listening on port ${process.env.PORT || 3005 }`);
});
