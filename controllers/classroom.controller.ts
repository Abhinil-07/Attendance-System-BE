import { Request, Response } from "express";
import ClassroomModel from "../models/classroom.model";
import ShortUniqueId from "short-unique-id";

const createClassroom = async (req: Request, res: Response) => {
  const { name, teacherID } = req.body;
  const code = new ShortUniqueId().randomUUID(6);
  const classroom = await ClassroomModel.create({
    name,
    teacher: teacherID,
    code,
  });

  return res.status(200).json({ success: true, classroom });
};

const getAllClassrooms = async (req: Request, res: Response) => {
  const classrooms = await ClassroomModel.find();

  return res.status(200).json({ success: true, classrooms });
};
export { createClassroom, getAllClassrooms };
