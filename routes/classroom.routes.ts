import { Router } from "express";
import {
  createClassroom,
  getAllClassrooms,
} from "../controllers/classroom.controller";

const router = Router();

router.route("/create-classroom").post(createClassroom);
router.route("all").get(getAllClassrooms);

export default router;
