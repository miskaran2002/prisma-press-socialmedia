import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utilities/catchAsync"
import { postService } from "./post.service";
import httpStatus from "http-status";
import { sendResponse } from "../utilities/sendResponse";


const createPost =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {

const id = req.user?.id
const payload = req.body;
const result= await postService.createPost(payload,id as string);



sendResponse(res,{
    success:true,
    status:httpStatus.CREATED,
    message:"Post created successfully",
    data:result,
    
}

)


})
const getAllPost =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {

    const result= await postService.getAllPost();
    sendResponse(res,{
        success:true,
        status:httpStatus.OK,
        message:"Post fetched successfully",
        data:result,
    })

   
    
})

const getPostById =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {
    const postId = req.params.postId;

    if(!postId){
        throw new Error("Post id is required")
    }
    const result= await postService.getPostById(postId as string);
    
    sendResponse(res,{
        success:true,
        status:httpStatus.OK,
        message:"Post fetched successfully",
        data:result,
    })
    
})

const updatePost =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {
    
})

const deletePost =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {
    
})

const getPostsStats =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {
    
})

const getMyPosts =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {
    const authorId = req.user?.id;
    const result= await postService.getMyPosts(authorId as string);

    sendResponse(res,{
        success:true,
        status:httpStatus.OK,
        message:"Post fetched successfully",
        data:result,
    })
    
})

export const postController ={
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
    getPostsStats,
    getMyPosts
}
