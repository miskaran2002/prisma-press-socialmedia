import { NextFunction, Request,  Response, Router } from "express";

import { userController } from "./user.controller";
import config from "../../config";
import { jwtUtils } from "../../utilities/jwt";
import { Role } from "../../../generated/prisma/client";
import httpStatus from "http-status";
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



router.get("/me",
    (req:Request, res:Response, next:NextFunction)=>{
        console.log(req.cookies);
         const {accessToken} = req.cookies;
            console.log(accessToken);
        
            const verifiedToken=jwtUtils.verifyToken(accessToken, config.jwt_access_secret);

            

        
             if(!verifiedToken || typeof verifiedToken === "string"){
                throw new Error(verifiedToken);
             }

             const {id, name, email, role} = verifiedToken  ;

            const reruiredRoles = [Role.USER, Role.ADMIN, Role.AUTHOR];
            if(!reruiredRoles.includes(role)){
               return res.status(403).json({
                success: false,
                message:"Forbidden you do not have permission to access this resource",
                status:httpStatus.FORBIDDEN,
            });
            }

            req.user = {
                id,
                name,   
                email,
                role,
            };
        next();

    }

,userController.getMyProfile);

export const userRoutes= router;


