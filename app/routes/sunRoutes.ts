import { Router } from "express";
import {
  createSun,
  getAllSuns,
  getDataById,
} from "../controller/sunController.js";
const router = Router();

// Root GET route is will fetch existing data
// Or will send an API call if params are given
router.get("/", getAllSuns);

// Route to get by mongodb document id
router.get("/:id", getDataById);

// Route to post data to db with request body's content
router.post("/", createSun);

export default router;
