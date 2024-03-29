const express = require('express');
const mongoose = require('mongoose');
const passport = require ('passport');
const cors =  require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const fetchRoutes = require('./routes/fetch');
const uploadRoutes = require('./routes/upload');
const openaiRoutes = require('./routes/openai');
const utilRoutes = require('./routes/util');

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'));

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/search', searchRoutes);
app.use('/fetch', fetchRoutes); 
app.use('/upload', uploadRoutes);
app.use('/openai', openaiRoutes)
app.use('/util', utilRoutes);




app.listen(process.env.PORT || 3005, () => {
  console.log(`Server listening on port ${process.env.PORT || 3005 }`)
});
