// jay mataji
const express = require('express');
const mongoose  = require('mongoose');
const authRoute = require('./router/auth');
const postRoute = require('./router/data');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
mongoose.connect(process.env.DB_CONNECTION,() => console.log('connect db bhai'))

app.use(express.json());
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);
app.use('/api/getReviews',postRoute);
app.listen(3000, () => console.log('chalu hoo'));
