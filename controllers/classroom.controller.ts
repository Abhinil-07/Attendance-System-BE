import { Request, Response } from "express";
import ClassroomModel from "../models/classroom.model";

const createClassroom = async (req: Request, res: Response) => {
  const { name, teacherID } = req.body;

  const classroom = await ClassroomModel.create({
    name,
    teacher: teacherID,
  });

  return res.status(200).json({ success: true, classroom });
};

export { createClassroom };
