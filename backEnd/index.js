const express = require('express');
const app = express();
const cors = require("cors");
const { generateFile }= require('./generateFile');
const { executeCpp } = require('./executeCpp');


 
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
   console.log(code);
   console.log(language);
   if(code ===undefined)
   {
    return res.status(400).json({success : false, error :"The Code Body is empty, please enter your code!"})
   }
   const filePath = await generateFile(language,code);
   const output = await executeCpp(filePath);
   res.json({language : language,code : code, output : output});
});


app.listen(5000, () => {
    console.log("The server is listening/setup on port 5000");
}); 
