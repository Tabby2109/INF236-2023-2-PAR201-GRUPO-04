const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const db = require("./Database");

const app = express();

const usersRouter = require('./Routes/users.js');
const pacientesRouter = require('./Routes/pacientes.js');
const maquinasRouter = require('./Routes/maquinas.js');
const citasRouter = require('./Routes/citas.js')
const registrarRouter = require('./Routes/registrar.js');
const loginRouter = require('./Routes/login.js');

app.set("port", process.env.port || 5000);

app.use('/users', usersRouter);
app.use('/pacientes', pacientesRouter);
app.use('/maquinas', maquinasRouter);
app.use('/citas', citasRouter);


// MIDDLEWARE

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use('/api', registrarRouter);
app.use('/api', loginRouter);

db();

app.listen(app.get("port"), () => {
    console.log(`SERVER CONNECTED AND RUNNING IN ${app.get("port")}`);
});

module.exports = app;
