import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import zod from "zod";
import StudentModel from "../models/student.model";
import StudentImageModel from "../models/studentImage.model";
import ClassroomModel from "../models/classroom.model";

const signupBody = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

const signupController = async (req: Request, res: Response) => {
  try {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }

    const existingUser = await StudentModel.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken",
      });
    }

    const student = await StudentModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign(
      {
        userId: student._id,
      },
      process.env.JWT_SECRET || ""
    );

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({ success: true, student, token });
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
      return res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    }

    const { email, password } = req.body;
    const user = await StudentModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET || ""
    );

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({ success: true, user, token });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

const logoutController = (req: Request, res: Response) => {
  try {
    res.cookie("token", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    console.log("Error in logging out: ", err.message);
  }
};

const getStudentClassrooms = async (req: Request, res: Response) => {
  const studentId = req.params.studentId;
  try {
    // Fetch the classroom codes for the student
    const classroomArray = await StudentImageModel.find({
      student_id: studentId,
    });

    if (!classroomArray.length) {
      return res.status(404).json({
        success: false,
        message: "No classrooms found for this student.",
      });
    }

    const codes = classroomArray[0].code;
    console.log(codes);
    // Query the classrooms collection to find the classrooms with codes in the fetched array
    const classrooms = await ClassroomModel.find({
      code: { $in: codes },
    });

    return res.status(200).json({ success: true, classrooms });
  } catch (error) {
    return res.status(500).json({ success: false, message: "noob" });
  }
};

export {
  signupController,
  loginController,
  logoutController,
  getStudentClassrooms,
};
