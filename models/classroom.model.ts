import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClassroom extends Document {
  name: string;
  teacher: Types.ObjectId | string; // Assuming Teacher model's ObjectId or string
}

const classroomSchema: Schema<IClassroom> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
});

const ClassroomModel = mongoose.model<IClassroom>("Classroom", classroomSchema);
export default ClassroomModel;
