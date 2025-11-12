import type { Request, Response } from "express";
import express from "express";
import sunRoutes from "./sunRoutes.js";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: `${req.method} - Request made`,
    success: true,
  });
});

router.use("/sun", sunRoutes);

export default router;
