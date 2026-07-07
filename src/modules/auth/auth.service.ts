import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"
import  Jwt, { JwtPayload, SignOptions }  from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utilities/jwt";

const loginUser = async (payload: ILoginUser) => {
    const { email, password } = payload;

    
    const user = await prisma.user.findUnique({
        where: { email }
    });

    
    if (!user) {
        throw new Error("User does not exist");
     }

     if(user.activeStatus === "BLOCKED"){
        throw new Error("your account is blocked, please contact admin");

               
     }
    
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Password does not match");
    }


    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,

    }

    const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, 
    config.jwt_access_expires_in as SignOptions
    );  

    const refreshToken = jwtUtils.createToken(jwtPayload, config.jwt_refresh_secret, 
        config.jwt_refresh_expires_in as SignOptions
        );
    
    


    return{
        accessToken,
        refreshToken
    } 
};


const refreshToken = async (refreshToken: string) => {
    const verifiedRefreshToken = jwtUtils.verifyToken(refreshToken, config.jwt_refresh_secret);

    if (!verifiedRefreshToken) {
        throw new Error((verifiedRefreshToken as any).error);

    }
    const {id}=verifiedRefreshToken.data as JwtPayload;

   const user= await prisma.user.findUnique({
        where:{
            id
        }
    })

    if (!user) {
    throw new Error("User not found");
    }

    if (user.activeStatus === "BLOCKED") {
    throw new Error("User not found");
    }

    const jwtPayload = {
        id,
        name: user.name,
        email: user.email,
        role: user.role,
        
    }
    const accessToken = jwtUtils.createToken(
        jwtPayload, config.jwt_access_secret,
        config.jwt_access_expires_in as SignOptions
    )

    return {
        accessToken
    }
   
    
}

export const authService = {
    loginUser,
    refreshToken
}