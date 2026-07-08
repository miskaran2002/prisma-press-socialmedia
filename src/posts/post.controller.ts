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
    
})

const getPostById =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {
    
})

const updatePost =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {
    
})

const deletePost =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {
    
})

const getPostsStats =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {
    
})

const getMyPosts =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {
    
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
