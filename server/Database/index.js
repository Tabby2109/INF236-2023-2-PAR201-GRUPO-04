const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://juancucurella:oqHxUHKlE2eyPBMG@bd-proyectoadsw.ppsmpm5.mongodb.net/?retryWrites=true&w=majority";

const db = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URL);
        console.log("BD CONNECTED", conn.connection.host);
    } catch (error){
        console.log(error);
    }
}


module.exports = db;