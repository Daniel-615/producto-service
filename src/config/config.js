const dotenv = require('dotenv');
dotenv.config();
const { 
  APP_PORT,HOST,USER,PASSWORD,DB,PORT,SECRET_JWT_KEY,
  FRONTEND_URL,BACKEND_URL
}= process.env;

module.exports = {
  APP_PORT,
  HOST,
  USER,
  PASSWORD,
  DB,
  PORT,
  SECRET_JWT_KEY,
  FRONTEND_URL,
  BACKEND_URL
};