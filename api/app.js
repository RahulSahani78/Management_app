
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

// Routes
const userRoute = require('./routes/user');
const courseRoute = require('./routes/course');
const studentRoute = require('./routes/student');
const feeRoute = require('./routes/fee');

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("connected db"))
  .catch(err => console.log(err));

// Middleware
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/user', userRoute);
app.use('/course', courseRoute);
app.use('/student', studentRoute);
app.use('/fee', feeRoute);

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'bad request' });
});

module.exports = app;
