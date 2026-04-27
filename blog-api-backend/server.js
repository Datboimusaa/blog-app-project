const app = require('./src/app');
require('dotenv').config();
const connectDB = require('./src/config/db');
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(5000, '0.0.0.0', () => { 
  console.log('API is running')
 })