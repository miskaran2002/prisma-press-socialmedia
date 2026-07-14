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
import { stripe } from "./lib/stripe";







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

const endpointSecret= config.stripe_webhook_secret

app.post("/api/subscription/webhook", express.raw({ type: "application/json" }),(request, response) => {
    let event = request.body;

    console.log("webhook received", event);
    console.log(request.headers,"stripe req headers");

    if (endpointSecret){
        const signature = request.headers["stripe-signature"]!;
        try {
            // converting event buffer to a valid object
            event = stripe.webhooks.constructEvent(
                request.body, signature, endpointSecret);
        }catch(err:any){
            console.log(`webhook signature verification failed.`,err.message);
            return response.status(400).json({
                 message: err.message
                 }); 

        }
    }
    console.log("webhook event after try block", event);
    // Handle the event
   // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            break;
        }
        case 'payment_method.attached': {
            const paymentMethod = event.data.object;
            break;
        }
        default:
            // Unhandled event type
            console.log(`Unhandled event type ${event.type}`);
    }

    // switch ব্লকের বাইরে রেসপন্স পাঠান যেন সব ইভেন্টই ২০০ রেসপন্স পায়
    response.status(200).json({ received: true });

        
    

} );


app.get("/", (req:Request, res:Response) => {
    res.send("welcome to the Prisma-press social media app");
})




app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts",postRoutes);
app.use("/api/comments", commentRoutes);

app.use("/api/subscription",subscriptionRoutes);

app.use(notFound);

app.use(globalErrorHandler);





export default app;