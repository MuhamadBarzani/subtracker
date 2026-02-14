import { Router } from "express";
import authorize from "../middleware/authorize.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";
const subRouter = Router();

subRouter.get("/", (req, res) => {
  res.send("get all subs");
});
subRouter.get("/:id", authorize, getUserSubscriptions);
subRouter.post("/", authorize, createSubscription);
subRouter.put("/:id", (req, res) => {
  res.send("update sub");
});
subRouter.delete("/:id", (req, res) => {
  res.send("delete sub ");
});
subRouter.get("/user/:id", (req, res) => {
  res.send("get all user subs ");
});
subRouter.put("/upcoming-renewals", (req, res) => {
  res.send("get upcoming renewals");
});
export default subRouter;
