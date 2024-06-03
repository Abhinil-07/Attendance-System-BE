import { Router } from "express";
import {
  createClassroom,
  getAllClassrooms,
  getStudentClassrooms,
} from "../controllers/classroom.controller";

const router = Router();

router.route("/create-classroom").post(createClassroom);
router.route("/all/:teacherId").get(getAllClassrooms);
router.route("/student/:studentID").get(getStudentClassrooms);

export default router;
