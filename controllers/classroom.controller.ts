import { Request, Response } from "express";
import ClassroomModel from "../models/classroom.model";
import ShortUniqueId from "short-unique-id";
import mongoose from "mongoose";
import StudentImageModel from "../models/studentImage.model";

const createClassroom = async (req: Request, res: Response) => {
  try {
    const { name, teacherID, id } = req.body;

    // console.log("Code taiyar kiya", code);
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

const getStudentClassrooms = async (req: Request, res: Response) => {
  const { studentID } = req.params;
  const student = mongoose.Types.ObjectId;
  const id = new student(studentID);
  console.log("Student ID", id);

  const classrooms = await StudentImageModel.find({ student_id: id });
  const classroomIds = classrooms.map((classroom) => classroom.classroom_id);
  console.log(classroomIds);
  const classroomList = await ClassroomModel.find({
    _id: { $in: classroomIds },
  });
  // console.log(classroom);
  return res.status(200).json({ success: true, classroomList });
};
export { createClassroom, getAllClassrooms, getStudentClassrooms };
