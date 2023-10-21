const { generateFile }= require('../generateFile');
const { executeCpp } = require('../executeCpp');
const { executePy } = require('../executePy');
const Job = require('../Models/Job');



const runProblem = async (req,res)=> {

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
};


const submitProblem = async(req,res) => {
    console.log("submit");
    
};


module.exports = { runProblem , submitProblem };