import express, { type Request, type Response } from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "API is running.",
    success: true,
  });
});

export default app;
