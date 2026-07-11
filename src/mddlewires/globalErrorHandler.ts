import { NextFunction, Request, Response } from "express"
import httpStatus from 'http-status'
import { Prisma } from "../../generated/prisma/client"



export const globalErrorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    console.log("Error : ",err);


    let statusCode;
    let errorMessage = err.message || "Internal Server Error";
    let errorName = err.name || "Internal Server Error";
    // let errorDetails = err.details || "Internal Server Error";

    if(err instanceof Prisma.PrismaClientInitializationError){
         statusCode= httpStatus.BAD_REQUEST;
         errorMessage = "You have provided incorrect field type or missing required field"

    }
    else if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code === "P2002"){
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "duplicate key error"
        }
        else if(err.code === "P2003"){
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "foreign key constraint failed"
            
        }else if(err.code === "P2025"){
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "record not found"
        }
        
    }else if(err instanceof Prisma.PrismaClientInitializationError){
        statusCode = httpStatus.BAD_REQUEST;
        errorMessage = "You have provided incorrect field type or missing required field"
        
    }





    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        name:errorName,
        message:errorMessage,
        error: err.stack

    })
    
}