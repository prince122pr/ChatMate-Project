import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js"

async function isAuth(req, res, next) {
  let token = req.cookies.token;

  if (!token)
    return res
      .status(401)
      .json({ message: "Unauthorized User, Please Login First!" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded);

    const user = await userModel.findOne({ _id: decoded.id });
    // console.log(user);

    req.user = user; //req me user data daal do

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token, Please Login Again!",
    });
  }
}

export default isAuth;
