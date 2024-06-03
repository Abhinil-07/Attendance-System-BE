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
  try {
    const teacherId = req.params.teacherId; // Get the teacher ID from the request parameters

    if (!teacherId) {
      return res
        .status(400)
        .json({ success: false, message: "Teacher ID is required" });
    }

    // Find classrooms by teacher ID
    const classrooms = await ClassroomModel.find({ teacher: teacherId });

    return res.status(200).json({ success: true, classrooms });
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getStudentClassrooms = async (req: Request, res: Response) => {
  // const { studentID } = req.params;
  // const student = mongoose.Types.ObjectId;
  // const id = new student(studentID);
  // console.log("Student ID", id);
  // const classrooms = await StudentImageModel.find({ student_id: id });
  // const classroomIds = classrooms.map((classroom) => classroom.classroom_id);
  // console.log(classroomIds);
  // const classroomList = await ClassroomModel.find({
  //   _id: { $in: classroomIds },
  // });
  // // console.log(classroom);
  // return res.status(200).json({ success: true, classroomList });
};
export { createClassroom, getAllClassrooms, getStudentClassrooms };
