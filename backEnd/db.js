const mongoose = require('mongoose');

const mongoURI='mongodb+srv://sakshammishra:Saksham@cluster0.1oo9f5k.mongodb.net/?retryWrites=true&w=majority';

const connectToMongoDB=async() =>{
    await mongoose.connect(mongoURI,{useUrlParser:true},(err,result)=>{
        if(err) console.log("Error detected ",err)
        else
    {
        console.log("DataBase Connected Successfully");

    }
        
    });
}

module.exports=connectToMongoDB; 

