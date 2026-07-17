import { Hono } from 'hono'
import UserRoute from "./routes/UserRoutes.js"
import UserPostRoute from "./routes/PostRoutes.js"
import {cors} from "hono/cors"

const app = new Hono()

app.use("/*",cors())

app.route("/",UserRoute)
app.route("/",UserPostRoute)

export default app
