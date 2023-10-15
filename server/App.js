const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const db = require("./Database");

const app = express()

app.set("port", process.env.port || 5000);

//MIDDLEWARE

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

db();

app.listen(app.get("port")), () => {
    console.log('SERVER CONNECTED AND RUNNING IN ${app.get("port")}')
}

module.exports = app;