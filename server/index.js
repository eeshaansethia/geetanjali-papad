const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();
const port = process.env.PORT;
const papadDetails = require('./routes/papadDetails');

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/geetanjaliPapad', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Geetanjali Papad',
        status: 200
    });
});

app.use(cors());
app.use('/papadDetails', papadDetails);
app.listen(port);