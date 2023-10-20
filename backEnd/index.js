require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const connection = require('./Db');
const cors = require("cors");
const { generateFile }= require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executePy } = require('./executePy');
const Job = require('./Models/Job');
const {user, validate, validateCredentials,User} = require("./Models/User");
const Joi = require("joi");
connection();
 
//MiddleWare  used decode data from url
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());



app.post("/register",async(req,res)=>{

    try{
        const {error} = validate(req.body);
    if(error)
    {
        return res.status(400).send({message:error.details[0].message});

    }

    const user = await User.findOne({email : req.body.email});
    if(user)
    {
        return res.status(409).send({message : "User with given email id already exists"});
    }

    const salt=await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    await new User({...req.body,password:hashPassword}).save();
    res.status(201).send({message : "User Created Successfulle, please proceed to sign in"});

    }
    catch(err)
    {

        return res.status(500).send({message : "Request Processing failed", error : err});

    }

})


app.post("/signin", async(req,res)=>{
    try{
        const { email, password } = req.body;
        
        const{error} = validateCredentials(req.body);
        if(error)
        {
            return res.status(400).send({message:error.details[0].message});
        }
        console.log("after validation");
        const user = await User.findOne({email : email});
        if(!user)
        {
            return res.status(401).send({message : "Invalid Email/email not found , please sign in if new "});
        }

        const validPassword = await bcrypt.compare(password,user.password)

        if(!validPassword)
        {
            return res.status(401).send({message : "Invalid user Id or password"});
        }

        const token = await user.generateAuthToken();
        res.status(200).send({toeken : token , message : "Logged in successfully!"});
        console.log('success');


    }
    catch (error){

        return res.status(500).send({message : "Request Processing failed", error :error});

    }
})

app.get("/status", async(req,res)=>{
    const jobId= req.query.id;
    if(jobId== undefined)
    {
        return res.status(400).json({success:false,error:"jobId is not present"}); 
    }
    try{
        const job = await Job.findById(jobId);
        if(job === undefined)
        {
            return res.status(404).json({success:false , error:"Invalid JobId"});
        }
        return res.status(200).json({  success:true , job});
    }
    catch (err)
    {
        console.log(err);
        return res.status(500).json({success:false, error: err});
    }

})

app.post('/run',async (req,res)=> {

    const { language = "cpp", code } = req.body;

   if(code ===undefined || code==="")
   {
    return res.status(400).json({success : false, error :"The Code Body is empty, please enter your code!"})
   }

   let job;
   let output;
   try {

        const filepath = await generateFile(language, code)
        job = await new Job({language:language, filepath:filepath}).save();
        const jobId= job["_id"];

        job["startedAt"]= new Date();
        if(language==="cpp") {
            output = await executeCpp(filepath);
            }
        else {
            output = await executePy(filepath);
            }

        
        job["completedAt"]= new Date();
        job["status"]= "success";
        job["output"]=JSON.stringify(output);

        job.save();
        return res.status(201).json({success:true,jobId});
   }
   catch(err)
   {
    job["completedAt"]= new Date();
    job["status"]= "error";
    job["output"] = JSON.stringify(output);
    await job.save();
    return res.status(500).json(err);
   }
});


app.listen(5000, () => {
    console.log("The server is listening/setup on port 5000");
}); 
