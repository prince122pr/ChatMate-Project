const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const registerController = async(req, res) =>{
     try {
        let {fullname: {firstname, lastname}, email, password} = req.body;

        if(!validator.isEmail(email)) return res.status(400).json({message:'Enter Valid Email!'});

    let isEmailExists = await userModel.findOne({email});
    if(isEmailExists) return res.status(400).json({message:'Email Already Registered!'})


    if(password.length<8) return res.status(400).json({message:'Enter Strong Password!'});
    
    let hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
        fullname: {firstname, lastname},
        email,
        password: hashedPassword

    })
    
    res.status(201).json({message: "User Registered Successfully!"})

     } catch (error) {
        console.log(error);
        
     }
}

const loginController = async(req, res) => {
   try {
    let {email, password} = req.body;

   let isUserExists = await userModel.findOne({email});
   if(!isUserExists) return res.status(401).json({message: "User not found!"});

   let isValidPass = await bcrypt.compare(password, isUserExists.password);
   if(!isValidPass) return res.status(401).json({message: "Invalid Password!"});

   let token = jwt.sign({id: isUserExists._id}, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
   res.cookie("token", token);

   res.status(200).json({
    message: "Login Successfully!"
   })
   } catch (error) {
    console.log(error);
    
   }

}



module.exports = {registerController, loginController}