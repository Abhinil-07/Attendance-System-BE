import { Request, Response } from "express";
import { Cumulative } from "../models/cumulative.model";

const getCumulativeAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const attendance = await Cumulative.find({ classroomId: id }).select(
      "attendance -_id"
    );
    if (!attendance) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No attendance records found for this classroom",
        });
    }
    return res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("Error fetching cumulative attendance:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export { getCumulativeAttendance };
