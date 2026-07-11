import { Request, Response } from "express";


export const notFound = (req:Request, res:Response ) => {
    res.status(500).json({
     message: "Route not found",
     path :req.originalUrl,
     date : new Date()
});
    
}