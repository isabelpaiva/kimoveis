import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { errorHandler } from "./error";
import { categoryRouter } from "./routes/category.routes";
import { loginRouter } from "./routes/login.routes";
import { userRoutes } from "./routes/user.routes";


const app = express();
app
  .use(express.json())
  .use(errorHandler)
  .use(userRoutes)
  .use(loginRouter)
  .use(categoryRouter);

export default app