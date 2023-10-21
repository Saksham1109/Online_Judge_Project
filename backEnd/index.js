require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connection = require('./Database/Db');
const cors = require("cors");

const loginRegisterRoutes = require('./Routes/loginRegisterRoutes');
const problemsCrudRoutes = require('./Routes/problemsCrudRoutes');
const runOrSubmitCodeRoutes = require('./Routes/runOrSubmitCodeRoutes');
const rankingRoutes = require('./Routes/rankingRoutes');

connection();
 
//MiddleWare  used decode data from url
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());

app.use("/", loginRegisterRoutes);
app.use("/",problemsCrudRoutes);
app.use("/", runOrSubmitCodeRoutes);
app.use("/", rankingRoutes);


app.listen(5000, () => {
    console.log("The server is listening/setup on port 5000");
});
