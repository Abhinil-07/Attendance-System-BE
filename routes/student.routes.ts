import { Router } from "express";
import protectRoute from "../middlewares/auth.middleware";
import {
  getStudentClassrooms,
  loginController,
  logoutController,
  signupController,
} from "../controllers/student.controller";
import { getAllClassrooms } from "../controllers/classroom.controller";

const router = Router();

router.route("/signup").post(signupController);
router.route("/login").post(loginController);
router.route("/logout").post(protectRoute, logoutController);
router.route("/classrooms/:studentId").get(getStudentClassrooms);
export default router;
