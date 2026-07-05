import { catchAsync } from "../../utilities/catchAsync";
import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";


const loginResult = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const payload = req.body;
    const user = await authService.loginUser(payload);

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User logged in successfully",
        data: { user },
    }); 



});

export const authController = {
    loginResult,
};