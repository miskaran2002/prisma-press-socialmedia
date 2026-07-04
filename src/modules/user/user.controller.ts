import { NextFunction, Request,  Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";



const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);


    sendResponse(res, {
        success: true,
        status: httpStatus.CREATED,
        message: "User registered successfully",
        data:{ user },
    });
});

export const userController = {
    registerUser,
};