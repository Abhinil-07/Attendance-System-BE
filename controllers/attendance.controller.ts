import { Request, Response } from "express";
import { Cumulative } from "../models/cumulative.model";

const getCumulativeAttendance = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const entries = await Cumulative.find({ classroomId: id }).select(
      "date attendance -_id"
    );
    res.status(200).json(entries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { getCumulativeAttendance };
