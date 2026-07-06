import { NextFunction, Request,  Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import config from "../../config";
import { jwtUtils } from "../../utilities/jwt";



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



const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    


    const profile = await userService. getMyProfileFromDB(req.user?.id as string);
    

   sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User profile fetched successfully",
        data:{ profile },
    });


});


const updateMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId= req.user?.id as string;
    const payload = req.body;
    const Updatedprofile = await userService.updateMyProfileFromDB(userId, payload);

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User profile updated successfully",
        data:{ Updatedprofile },
    })
    
})

export const userController = {
    registerUser,
    getMyProfile,
    updateMyProfile,

};