import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const registerController = async (req, res) => {
  try {
    let {
      fullname: { firstname, lastname },
      email,
      password,
    } = req.body;

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Enter Valid Email!" });

    let isEmailExists = await userModel.findOne({ email });
    if (isEmailExists)
      return res.status(400).json({ message: "Email Already Registered!" });

    if (password.length < 8)
      return res.status(400).json({ message: "Enter Strong Password!" });

    let hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      fullname: { firstname, lastname },
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    let isUserExists = await userModel.findOne({ email });
    if (!isUserExists)
      return res.status(401).json({ message: "User not found!" });

    let isValidPass = await bcrypt.compare(password, isUserExists.password);
    if (!isValidPass)
      return res.status(401).json({ message: "Invalid Password!" });

    let token = jwt.sign(
      { id: isUserExists._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // ✅ safer to set httpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use HTTPS in prod
      sameSite: "strict",
    });

    res.status(200).json({
      message: "Login Successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const logoutController = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    return res.status(200).json({ message: "Logged Out Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error in Logging Out!", error });
  }
};