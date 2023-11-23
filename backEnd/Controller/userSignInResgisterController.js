const { validate, validateCredentials,User} = require("../Models/User");
const bcrypt = require('bcrypt');

const login = async(req,res)=>{
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
        res.status(200).send({token : token , message : "Logged in successfully!",userId :email,role:user.role});
        console.log('success');


    }
    catch (error){

        return res.status(500).send({message : "Request Processing failed", error :JSON.stringify(error)});

    }
};


const register = async(req,res)=>{

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

};

const updateRole = async(req,res)=>{
    try{
        const { email, toRole } = req.body;
        const filter = { email: email };
        const update = { role: toRole };
        console.log("after validation");
        const user = await User.findOneAndUpdate(filter,update);
        res.status(200).send({message : "Role Updated Successfully",userId :email});
        console.log('success');
    }
    catch (error){
        return res.status(500).send({message : "Request Processing failed", error :JSON.stringify(error)});
    }
};


const getUser = async(req,res)=>{
    try{
        const { email  } = req.body;
        const user = await User.findOne({email : email});
        res.status(200).send({message : "user Found",userId :email, role:user.role});
    }
    catch (error){
        return res.status(500).send({message : "Request Processing failed", error :JSON.stringify(error)});
    }
};

const getAllUsers = async(req,res)=>{

    try{
        console.log(1);
        const user = await User.find();
        console.log(user);
        res.status(200).send({message : "user Found",user:user});
    }
    catch (error){
        return res.status(500).send({message : "Request Processing failed", error :JSON.stringify(error)});
    }
};



module.exports = { login, register,updateRole ,getUser,getAllUsers};