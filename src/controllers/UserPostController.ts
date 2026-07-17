import { Context } from "hono"
import { postSchema } from "../schema/PostSchema";
import { getPrisma } from "../db/prisma";



export const addPost=async (c:Context)=>{

    const {title,content}=await c.req.json();

    const vailidInputs=postSchema.safeParse({title,content});

    if(!vailidInputs.success){
        return c.json({
            success:false,
            msg:"wrong inputs check inputs filds"
        },400)
    }
    const prisma=getPrisma(c.env.DATABASE_URL);

    const userId=c.get("userId");

    const res=await prisma.post.create({
       data:{
        title,
        content,
        userId
       }
    })

    return c.json({
        success:true,
        msg:"post created ",
        post:res
    })

}

export const updatePost=async function(c:Context){

    interface data{
         title?:string,
         content?:string
   }


   const body:data=await c.req.json()
   
   const postId=c.req.param("id")
   const userId=c.get("userId");

   const prima=getPrisma(c.env.DATABASE_URL)
   const res=await prima.post.update({
    where:{
        id:postId,
        userId:userId
    },data:{
       title:body.title,
       content:body.content
    }
   })

   return c.json({
    success:true,
    msg:`Post update succefully of id ${res.id}`
   })


}

export const deletePost = async (c: Context) => {
    const postId = c.req.param("id");
    const prisma = getPrisma(c.env.DATABASE_URL);
    const userId = c.get("userId");

    const res = await prisma.post.deleteMany({
        where: {
            id: postId,
            userId: userId
        }
    });

    // Check if a post was actually deleted
    if (res.count === 0) {
        return c.json({
            success: false,
            msg: "Post not found or you are not authorized to delete it"
        }, 404); // Return 404 Not Found or 403 Forbidden
    }

    return c.json({
        success: true,
        msg: `Post id ${postId} deleted successfully`
    }, 200);
}

export const getAllPost=async (c:Context)=>{

    const prisma=getPrisma(c.env.DATABASE_URL);
    const userId=c.get("userId");
    
    const res=await prisma.post.findMany({
        where:{
            userId,
            
        },
        select:{
          content:true,
          title:true,
          id:true,
          user:{
            select:{
                name:true
            }
          }
        }
    })

    return c.json({
        success:true,
        Post:res
    })
}

export const getPost=async (c:Context)=>{
     const prisma=getPrisma(c.env.DATABASE_URL);
    const userId=c.get("userId");
    const postId=c.req.param("id")
    
    const res=await prisma.post.findMany({
        where:{
            userId,
            id:postId,
            
        },select:{
            title:true,
            content:true,
            user:{
                select:{
                    name:true
                }
            }
        }
    })

    return c.json({
        success:true,
        Post:res
    })
}

export const deleteAllPost=async (c:Context)=>{
            const prisma=getPrisma(c.env.DATABASE_URL);

    const userId=c.get("userId")
    const res=await prisma.post.deleteMany({
        where:{
            userId
        }
    })

    return c.json({
        success:true,
        msg:"all post Deleted successfully ",
        res
    })

}


