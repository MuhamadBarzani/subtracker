import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subRouter from "./routes/subscription.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/mongodb.js";

const app = express();

//middle wares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.get("/", (res) => {
  res.status(200).json({
    success: true,
    message: "Server is Running",
  });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subRouter);
//should
app.use(errorMiddleware);

await connectToDatabase();
app.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
});
export default app;
