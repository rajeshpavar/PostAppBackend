import {verify} from "hono/jwt"
import {Context,Next} from "hono"

export const AuthMiddlware=async (c:Context,next:Next)=>{
      

       const jwtHeader=c.req.header("Authorization") ;

       if(!jwtHeader?.startsWith("Bearer")){
         return c.json({
            success:false,
            msg:"sorry token does not start with Bearer "
         })
       }

       const token=jwtHeader.split(" ")[1];

       const decode=await verify(token,c.env.JWT_SECRET,"HS256")
      
       c.set("userId",decode.userId)
       
       await next()

}

