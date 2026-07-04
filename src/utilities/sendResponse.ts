import {   Response } from "express";

type Tmeta={
    page: number;
    limit: number;
    total: number;

}

type TResponseData <T> = {
    success: boolean;
    status: number;
    message: string;
    data: T;
    meta?: Tmeta
    
    
    
};

 export const sendResponse = <T>(res: Response, data: TResponseData<T>) => {
    res.status(data.status).json({
        success: data.success,
        status: data.status,
        message: data.message,
        data: data.data,
        meta: data.meta,
    });
}


