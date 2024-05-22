import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClassroom extends Document {
  name: string;
  teacher: string; // Assuming Teacher model's ObjectId or string
  code: string;
}

const classroomSchema: Schema<IClassroom> = new Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
  },
  teacher: {
    type: String,
    ref: "Teacher",
    required: true,
  },
  code: {
    type: String,
    required: true,
    // unique: true,
  },
});

const ClassroomModel = mongoose.model<IClassroom>("Classroom", classroomSchema);
export default ClassroomModel;
