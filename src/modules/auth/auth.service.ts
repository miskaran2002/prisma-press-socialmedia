import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface"

const loginUser = async (payload: ILoginUser) => {
    const { email, password } = payload;

    
    const user = await prisma.user.findUnique({
        where: { email }
    });

    
    if (!user) {
        throw new Error("User does not exist");
    }

    
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Password does not match");
    }
    return user;
};

export const authService = {
    loginUser,
}