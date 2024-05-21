import { Request, Response } from "express";
import ClassroomModel from "../models/classroom.model";
import ShortUniqueId from "short-unique-id";

const createClassroom = async (req: Request, res: Response) => {
  const { name, teacherID } = req.body;
  const id = new ShortUniqueId().randomUUID(6);
  const classroom = await ClassroomModel.create({
    name,
    teacher: teacherID,
    id,
  });

  return res.status(200).json({ success: true, classroom });
};

export { createClassroom };
