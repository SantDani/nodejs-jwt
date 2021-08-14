const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser'); // It's is deprecated
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();

// Get Body
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Connect to DB

// Import Routers

// Route middlewares
app.get('/', (req, res) => {
    res.json({
        status: true,
        messaje: 'It\'s works!'
    });
});

// Init Server
app.listen(PORT, ()=> { console.log(`Server is listen in http://localhost:${PORT}`);
})
