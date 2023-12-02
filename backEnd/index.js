require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connection = require('./Database/Db');
const cors = require("cors");

const loginRegisterRoutes = require('./Routes/loginRegisterRoutes');
const problemsCrudRoutes = require('./Routes/problemsCrudRoutes');
const runOrSubmitCodeRoutes = require('./Routes/runOrSubmitCodeRoutes');

connection();
 
//MiddleWare  used decode data from url
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());

app.use("/", loginRegisterRoutes);
app.use("/",problemsCrudRoutes);
app.use("/", runOrSubmitCodeRoutes);

const port = process.env.PORT || 5000;

app.get("/",(req,res)=>{
res.send("This app is running on AWS");
});

app.listen(port, () => {
    console.log('The server is listening/setup on port ',port);
});