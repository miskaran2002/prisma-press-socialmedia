import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utilities/catchAsync";
import { premiumServices } from "./premium.services";
import { sendResponse } from "../../utilities/sendResponse";


const getPremiumContent = catchAsync(
    async (req : Request, res : Response, next : NextFunction)=> {
        const query = req.query;
        const result = await premiumServices.getPremiumContent(query)
        
        sendResponse(res, {
            success:true,
            status : httpStatus.OK,
            message : "Premium Content Retrived Successfully",
            data : result.data,
            meta : result.meta
        })
    }
)


export const premiumController = {
    getPremiumContent
}