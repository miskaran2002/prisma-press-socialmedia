import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utilities/catchAsync";
import { subscriptionService } from "./subscription.service";
import status from "http-status";

const createCheckoutSession= catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const userId= req.user?.id
    const result = await subscriptionService.createCheckoutSession(userId as string)
    res.status(200).json({
        success: true,
        status: status.OK,
        message: "Checkout Session Created Successfully",
        data: result,
        
    })
})

export const subscriptionController = {
    createCheckoutSession,
}