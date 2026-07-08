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

const getAllPost =()=>{
    
}

const getPostById =()=>{
    
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