import jwt from 'jsonwebtoken'

let userAuth= async (req, res, next) => {
    let {token}=req.cookies
    if(!token){
        return res.json({success:false, message:'Not Authorized, Login Again'})
    }

    try {
        let tokenDecode=jwt.verify(token, process.env.JWT_SECRET)

        if(tokenDecode.id){
            req.user={id:tokenDecode.id}
            next()
        }else{
            return res.json({success:false,message:'Not Authorized. Login Again'})
        }
        
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export default userAuth