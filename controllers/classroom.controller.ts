import { Request, Response } from "express";
import ClassroomModel from "../models/classroom.model";
import ShortUniqueId from "short-unique-id";

const createClassroom = async (req: Request, res: Response) => {
  try {
    const { name, teacherID, id } = req.body;

    const classroom = await ClassroomModel.create({
      name,
      teacher: teacherID,
      code: id,
    });
    return res.status(200).json({ success: true, classroom });
  } catch (error) {
    console.log(error);
  }
};

const getAllClassrooms = async (req: Request, res: Response) => {
  const classrooms = await ClassroomModel.find();

  return res.status(200).json({ success: true, classrooms });
};
export { createClassroom, getAllClassrooms };
