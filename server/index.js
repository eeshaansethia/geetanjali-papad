const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();
const port = process.env.PORT;
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@papadapp.pxcscgq.mongodb.net/papadApp?retryWrites=true&w=majority`;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const papadDetails = require('./routes/papadDetails');

mongoose.set('strictQuery', false)
mongoose.connect(uri, {
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

app.use('/papadDetails', papadDetails);
app.listen(port);