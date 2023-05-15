import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleErros } from "./error";
import { userRoutes } from "./routes/user.routes";
import { loginRouter } from "./routes/login.routes";
import { categoryRouter } from "./routes/category.routes";
import { realEstateRouter } from "./routes/realEstate.routes";
import { schedulesRouter } from "./routes/schedules.routes";

const app = express();
app
  .use(express.json())
  .use(handleErros)
  .use(userRoutes)
  .use(loginRouter)
  .use(categoryRouter)
  .use(realEstateRouter)
  .use(schedulesRouter);

export default app;
