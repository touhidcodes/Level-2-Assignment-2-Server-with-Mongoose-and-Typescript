import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./modules/user/user.route";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/users", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
