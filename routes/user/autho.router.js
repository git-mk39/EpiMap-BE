import express from "express";
import { signIn, signOut } from "../../controller/user/autho.controller.js";

const authoRouter = express.Router();

// login
authoRouter.post("/signin", signIn);

// logout
authoRouter.get("/logout", signOut);

export default authoRouter;
