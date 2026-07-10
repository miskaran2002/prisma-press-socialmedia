import { CommentStatus } from "../../generated/prisma/enums"
import { prisma } from "../lib/prisma"
import { IcreatePostPayload, IupdatePostPayload } from "./post.interface"


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
  
 
await prisma.post.update({
    where:{
        id:postId
    },
    data:{
        views:{
            increment:1
        }
    },
    
 })

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
        comments:{
            where:{
                status:CommentStatus.APPROVED
                
            },
            orderBy:{
                createdAt:"desc"
            }
        },
        _count:{
            select:{
                comments:true
                
            }
            
        }
    }
     
 })


 return post
}

const updatePost =async(postId:string,payload:IupdatePostPayload,authorId:string,
isAdmin:boolean
)=>{

    const post = await prisma.post.findUniqueOrThrow({
        where:{
            id:postId
        },
      
    })
    if(!isAdmin && post.authorId !== authorId){
        throw new Error("You are not authorized to update this post")
        
      }

      const result = await prisma.post.update({
        where:{
            id:postId
        },
        data:payload,
        include:{
            author:{
                omit:{
                    password:true
                }

            },
            comments:true
        }
        }
          
      )
      return result

    
}

const deletePost =async( postId:string,authorId:string,isAdmin:boolean)=>{
    const post = await prisma.post.findUniqueOrThrow({
        where:{
            id:postId
        },
        
    })

    if(!isAdmin && post.authorId !== authorId){
        throw new Error("You are not authorized to delete this post")
    }
    await prisma.post.delete({
        where:{
            id:postId
        }
      
    })
    

    
}

// not done yet
const getPostsStats =()=>{
    
}
const getMyPosts =async(authorId:string)=>{
    const result =await prisma.post.findMany({
        where:{
            authorId:authorId
        },
        orderBy:{
            createdAt:'desc'
        },
        include:{
            comments:true,
            author:{
                omit:{
                    password:true
                }

            },
           _count:{
               select:{
                   comments:true
               }

           }
            
        }

        
    })
    return result
    
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