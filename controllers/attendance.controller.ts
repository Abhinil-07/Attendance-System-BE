import { Request, Response } from "express";
import { Cumulative } from "../models/cumulative.model";

const getCumulativeAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await Cumulative.find().select("-_id -classroomId");
    return res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("Error fetching cumulative attendance:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { getCumulativeAttendance };
