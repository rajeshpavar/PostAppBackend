import { Context } from "hono"
import bcrypt from "bcryptjs"
import { getPrisma } from "../db/prisma.js";
import {sign} from   "hono/jwt"
import {singinInputs, singupInputs} from "common-rajesh-100xdevs-user-schema"

export const SignupUser=async (c:Context)=>{

const {name,email,password}=await c.req.json();

const vailidInputs=singupInputs.safeParse({name,email,password})

if(!vailidInputs.success){
   return c.json({
    success:false,
    msg:"Invailid User Inputs"
   },400)
}
const prisma=getPrisma(c.env.DATABASE_URL)
const existUser=await prisma.user.findFirst({
   where:{
    email
   }
})

if(existUser){
     return c.json({
    success:false,
    msg:"User Alread exist try singup Please"
   },403)
}

const hashedPassword=await bcrypt.hash(password,10);

const res=await prisma.user.create({
   data:{
      name,
      email,
      password:hashedPassword
   }
})

const token=await sign({userId:res.id},c.env.JWT_SECRET)

return c.json({
   success:true,
   msg:"User Created successfully",
   user:res,
   token
})

}

export const SingIn=async (c:Context)=>{

   const {email,password}=await c.req.json();

   const vailidInputs=singinInputs.safeParse({email,password})
   if(!vailidInputs.success){
      return c.json({
         success:false,
         msg:"User inputs are not vailid check your inputs"
      },400)
   }

   const prisma=getPrisma(c.env.DATABASE_URL)
   const existUser=await prisma.user.findFirst({
      where:{
         email
      }
   })

   if(!existUser){
    return  c.json({
         success:false,
         msg:"User Does not exist please Singup First"
      },403)
   }

   const passwordMatch=await bcrypt.compare(password,existUser.password);
    if(!passwordMatch){
    return  c.json({
         success:false,
         msg:"password does not match "
      },403)
   }

   const token=await sign({userId:existUser.id},c.env.JWT_SECRET)
   
   return c.json({
      msg:`hello ${existUser.name}`,
      token
   })
}