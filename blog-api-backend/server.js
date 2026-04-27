const app = require('./src/app');
require('dotenv').config();
const connectDB = require('./src/config/db');
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT || 5000, () => { console.log("API is running") })