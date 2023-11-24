import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.route";
import { OrderRoutes } from "./app/modules/order/order.route";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/users", UserRoutes);
app.use("/api/users", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
