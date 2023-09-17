const express = require('express')
const app = express()
const mongodb= require('./db')
mongodb();
const {generateFile}= require('./generateFile')
const { executeCpp } = require('./executeCpp')


 
//MiddleWare  used decode data from url
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// 1st api Home API
app.get("/",(req,res)=> {
    res.json({online : "Compiler",MadeBy :"Saksham"});
});

// 2nd api
app.post('/runCompilerForCplusplus',async (req,res)=> {
//    const language=req.body.language;
//    const code = req.body.code;

   const {language="cpp",code}= req.body;
   if(code ==undefined)
   {
    return res.status(404).json({success : false, error :"The Code is empty, please enter your code!"})
   }
   // create a codes folder , and save the code in the file 
   // Generating file 
   const filePath = await generateFile(language,code);

   // execute the code file 

   const output = await executeCpp(filePath);
   //console.log(language+ " -> " + code);
   res.json({language : language,code : code, filePath : filePath, output : output});
});


app.listen(5000, () => {
    console.log("The server is listening/setup on port 5000");
}); 