import { prisma } from "../lib/prisma"
import { IcreatePostPayload } from "./post.interface"


const createPost = async(payload: IcreatePostPayload,userId: string)=>{
   const result = await prisma.post.create({
    data:{
        ...payload,
        authorId: userId,

    }
       
   })

   return result


    

}

const getAllPost =async()=>{
    const posts = await prisma.post.findMany({
        include:{
            author:{
                omit:{
                    password:true
                }

            },
            comments:true
    
            
        }
    })

    return posts

    
}

const getPostById =async(postId: string)=>{
  
 const post = await prisma.post.findUniqueOrThrow({
    where:{
        id:postId
    },
    include:{
        author:{
            omit:{
                password:true
            }

        },
        comments:true


    }
     
 })
 const updatedPost = await prisma.post.update({
    where:{
        id:postId
    },
    data:{
        views:{
            increment:1
        }
    },
    include:{
        author:{
            omit:{
                password:true
            }

        },
        comments:true
    }
 })


 return updatedPost
}

const updatePost =()=>{
    
}

const deletePost =()=>{
    
}
const getPostsStats =()=>{
    
}
const getMyPosts =()=>{
    
}

export const postService = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
    getPostsStats,
    getMyPosts
}