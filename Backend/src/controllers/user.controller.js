import userModel from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
     try {      
        let {_id:userId} = req.user
        const user = await userModel.findById(userId).select("-password");

         if (!user) {
         return res.status(404).json({ message: "User not found" });
        }
       return res.status(200).json({
      success: true,
      user,
    })  } 
     catch (error) {
        console.log(error);
         return res.status(500).json({ message: "Server error" });
     }
     
}

