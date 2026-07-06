import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utilities/catchAsync";
import { jwtUtils } from "../utilities/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";


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
export const  auth = (...requiredRoles: Role[]) => {return catchAsync(async( req:Request, res:Response, next:NextFunction)=>{

    const token = req.cookies.accessToken ?
     
    req.cookies.accessToken
    :
    req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization?.split(" ")[1] 
    : 
    req.headers.authorization;


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