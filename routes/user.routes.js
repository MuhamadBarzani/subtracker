import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middleware/authorize.middleware.js";
const userRouter = Router();
userRouter.get("/", /*authorize,*/ getUsers);
userRouter.get("/:id", authorize, getUser);
userRouter.post("/", (req, res) => {
  res.send("create user");
});
userRouter.put("/:d", (req, res) => {
  res.send("update user");
});
userRouter.delete("/:id", (req, res) => {
  res.send("delete user");
});
export default userRouter;
