import userModel from "../models/userModel.js";

export const getUserData=async (req,res)=>{
    try {
        let userId=req.user.id

        let user= await userModel.findById(userId)

        if(!user){
            return res.json({success:false, message: 'User not found'})
        }
        res.json({
            success:true,
            userData:{
                name:user.name,
                isAccountVerified:user.isAccountVerified
            }
            })
        
    } catch (error) {
        console.log(error);
        
        res.json({success:false, message:error.message})
    }
}