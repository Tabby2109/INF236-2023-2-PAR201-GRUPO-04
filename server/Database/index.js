const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env

const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`;

const db = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URL);
        console.log("Se ha conectado a la base de datos", conn.connection.host);
    } catch (error){
        console.error(error);
    }
}

module.exports = db;