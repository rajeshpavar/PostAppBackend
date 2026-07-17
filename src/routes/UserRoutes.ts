import { Hono } from "hono";
import { SignupUser, SingIn } from "../controllers/UserController.js";

const route=new Hono();

route.post("/api/v1/signup",SignupUser)
route.post("/api/v1/signin",SingIn)

export default route;
