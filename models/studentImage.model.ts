import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IStudentImage extends mongoose.Document {
  student_id: string;
  embedding: Array<Number>;
  name: string;
  code: Array<String>;
}

const studentImageSchema: Schema<IStudentImage> = new Schema({
  student_id: {
    type: String,
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
  code: {
    type: [String],
    required: true,
  },
});

const StudentImageModel = mongoose.model<IStudentImage>(
  "embeddings",
  studentImageSchema
);

export default StudentImageModel;
