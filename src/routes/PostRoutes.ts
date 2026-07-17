import {Hono} from "hono";
import { AuthMiddlware } from "../middlwares/AuthMiddlware";
import { addPost, deleteAllPost, deletePost, getAllPost, getPost, updatePost } from "../controllers/UserPostController.js";

const route=new Hono();

route.post("/api/v1/post",AuthMiddlware,addPost)
route.get("/api/v1/post",AuthMiddlware,getAllPost)
route.get("/api/v1/post/:id",AuthMiddlware,getPost)

route.put("/api/v1/post/:id",AuthMiddlware,updatePost)
route.delete("/api/v1/post",AuthMiddlware,deleteAllPost)
route.delete("/api/v1/post/:id",AuthMiddlware,deletePost)

export default route;

