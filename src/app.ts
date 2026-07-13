import cookieParser from "cookie-parser";
import express, { Application,Request,Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.routes";
import { postRoutes } from "./modules/posts/post.route";
import { commentRoutes } from "./modules/comments/comment.route";
import path from "node:path";
import { notFound } from "./mddlewires/notFound";
import {globalErrorHandler } from "./mddlewires/globalErrorHandler";
import { subscriptionRoutes } from "./modules/subscription/subscription.route";







const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors(
    {
        origin: config.app_url,
        credentials: true,
    }
));


app.get("/", (req:Request, res:Response) => {
    res.send("welcome to the Prisma-press social media app");
})




app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/comments", commentRoutes);

app.use("api/subscription",subscriptionRoutes);

app.use(notFound);

app.use(globalErrorHandler);





export default app;