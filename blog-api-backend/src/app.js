const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes'));
app.get('/api', (req, res) => {
    res.send('Api is running')
})

// Export
module.exports = app;