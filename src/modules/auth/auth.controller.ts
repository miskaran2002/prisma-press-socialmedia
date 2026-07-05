import { catchAsync } from "../../utilities/catchAsync";
import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";


const loginResult = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const payload = req.body;
    const {accessToken, refreshToken} = await authService.loginUser(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure:false,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        
    })


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure:false,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000 *7, // 7 day
    })




    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User logged in successfully",
        data: { accessToken, refreshToken },
    }); 



});

export const authController = {
    loginResult,
};