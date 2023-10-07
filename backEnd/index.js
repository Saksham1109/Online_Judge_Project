const express = require('express');
const app = express();
const cors = require("cors");
const { generateFile }= require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executePy } = require('./executePy');


 
//MiddleWare  used decode data from url
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());

// 1st api Home API
app.get("/signature",(req,res)=> {
    res.json({online : "Compiler",MadeBy :"Saksham Mishra"});
});

// 2nd api
app.post('/run',async (req,res)=> {

    const { language = "cpp", code } = req.body;

   if(code ===undefined || code==="")
   {
    return res.status(400).json({success : false, error :"The Code Body is empty, please enter your code!"})
   }
   
   try {

        const filePath = await generateFile(language,code);
        let output;

    if(language==="cpp") {
        output = await executeCpp(filePath);
        }
    else {
        output = await executePy(filePath);
        }
        res.json({output : output});
   }
   catch(err)
   {
    res.status(500).json(err);
   }
});


app.listen(5000, () => {
    console.log("The server is listening/setup on port 5000");
}); 
