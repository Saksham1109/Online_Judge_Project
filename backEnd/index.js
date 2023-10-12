const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connection = require('./Db');
const cors = require("cors");
const { generateFile }= require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executePy } = require('./executePy');
const Job = require('./Models/Job');
connection();
 
//MiddleWare  used decode data from url
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());

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
