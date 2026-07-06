import { NextFunction, Request,  Response, Router } from "express";

import { userController } from "./user.controller";
import config from "../../config";
import { jwtUtils } from "../../utilities/jwt";
import { Role } from "../../../generated/prisma/client";
import httpStatus from "http-status";
import { catchAsync } from "../../utilities/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
const router = Router();

router.post("/register", userController.registerUser);

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: Role;
            };
        }

    }

};



const  auth = (...requiredRoles: Role[]) => {return catchAsync(async( req:Request, res:Response, next:NextFunction)=>{
    const token = req.cookies.accessToken 
    // || req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
    if (!token) {
        throw new Error("you are not logged in! Please log in to get access this resource.");
    }
     const verifiedToken=jwtUtils.verifyToken(token, config.jwt_access_secret);

            if(!verifiedToken.success){
                throw new Error(
                    verifiedToken.message
                )
            }

            const {id, name, email, role} = verifiedToken.data as JwtPayload  ;

            if(requiredRoles.length && !requiredRoles .includes(role)){
                throw new Error("you are not authorized to access this resource");
            }
            
           const user = await prisma.user.findUnique({
                where:{
                    id,
                    email,
                    name,
                    role
                }
            })

            if(!user){
                throw new Error("user not found");
            }
            if(user.activeStatus=== "BLOCKED"){
                throw new Error("your account is blocked, please contact admin");

               
           }
           req.user={
            id,
            name,
            email,
            role
           }

           next();
        },
       

);
}


router.get("/me",


    // (req:Request, res:Response, next:NextFunction)=>{
    //     console.log(req.cookies);
    //      const {accessToken} = req.cookies;
    //         console.log(accessToken);
        
    //         const verifiedToken=jwtUtils.verifyToken(accessToken, config.jwt_access_secret);

    //         if(!verifiedToken.success){
    //             throw new Error(
    //                 verifiedToken.message
    //             )
    //         }
            
        
            

    //          const {id, name, email, role} = verifiedToken.data as JwtPayload  ;

    //         const reruiredRoles = [Role.USER, Role.ADMIN, Role.AUTHOR];
    //         if(!reruiredRoles.includes(role)){
    //            return res.status(403).json({
    //             success: false,
    //             message:"Forbidden you do not have permission to access this resource",
    //             status:httpStatus.FORBIDDEN,
    //         });
    //         }

    //         req.user = {
    //             id,
    //             name,   
    //             email,
    //             role,
    //         };
    //     next();

    // },

    auth(Role.ADMIN, Role.USER, Role.AUTHOR),




userController.getMyProfile);

export const userRoutes= router;


