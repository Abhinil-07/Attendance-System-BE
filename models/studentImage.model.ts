import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IStudentImage extends mongoose.Document {
  classroom_id: mongoose.Schema.Types.ObjectId;
  student_id: mongoose.Schema.Types.ObjectId;
  embedding: Array<Number>;
  name: string;
}

const studentImageSchema: Schema<IStudentImage> = new Schema({
  classroom_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom",
    required: true,
  },
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  embedding: {
    type: [Number],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const StudentImageModel = mongoose.model<IStudentImage>(
  "student_img",
  studentImageSchema
);

export default StudentImageModel;
