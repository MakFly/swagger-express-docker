import { Router } from "express";
import auth from "./auth";
import users from "./users";


const indexRouter = Router();

indexRouter.use("/auth", auth);
indexRouter.use("/user", users);

export default indexRouter;