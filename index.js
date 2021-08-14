const express = require('express');
const mongoose = require('mongoose');
// const bodyParser  = require('body-parser'); // It's is deprecated. Now used express
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();

// Get Body
app.use(express.urlencoded({
    extended: true
  }));

app.use(express.json());

// Connect to DB

// Import Routers
const authRouter = require('./routes/auth');


// Route middlewares

app.get('/', (req, res) => {
    res.json({
        status: true,
        messaje: 'It\'s works!'
    });
});

app.use('/api/user', authRouter);

// Init Server
app.listen(PORT, ()=> { console.log(`Server is listen in http://localhost:${PORT}`);
});
