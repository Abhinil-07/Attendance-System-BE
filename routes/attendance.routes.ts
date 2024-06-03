import { Router } from "express";
import { getCumulativeAttendance } from "../controllers/attendance.controller";
const router = Router();

router.route("/cumulative/:id").get(getCumulativeAttendance);
export default router;
