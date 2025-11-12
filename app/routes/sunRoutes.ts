import { Router } from "express";
import { createSun, getAllSuns } from "../controller/sunController.js";
const router = Router();

router.get("/", getAllSuns);
router.post("/", createSun);

export default router;
