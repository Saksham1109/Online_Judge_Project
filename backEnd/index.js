const express = require('express');
const app = express();


 
//MiddleWare 
app.use(express.urlencoded({extended : true}));
app.use(express.json());


app.get("/",(req,res)=> {
    res.json({online : "Compiler"});
});

app.post('/run',(req,res)=> {
   const language=req.body.language;
   const code = req.body.code;
   console.log(language+ " -> " + code);
   res.json({language : code});
});


app.listen(3000, () => {
    console.log("The server is listening/setup on port 3000");
});