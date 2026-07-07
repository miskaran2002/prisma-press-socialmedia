import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utilities/catchAsync"


const createPost =catchAsync (async (req: Request, res: Response,Next: NextFunction) => {


    
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
