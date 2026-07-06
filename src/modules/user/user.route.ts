import {  Router } from "express";
import { userController } from "./user.controller";
import { Role } from "../../../generated/prisma/client";
import { auth } from "../../mddlewires/auth";


const router = Router();
router.post("/register", userController.registerUser);
router.get("/me",auth(Role.ADMIN, Role.USER, Role.AUTHOR),userController.getMyProfile);

router.put("/my-profile",auth(Role.ADMIN, Role.USER, Role.AUTHOR),userController.updateMyProfile);

export const userRoutes= router;


