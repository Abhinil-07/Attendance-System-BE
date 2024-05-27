import { Schema, model, Document } from "mongoose";

// TypeScript interfaces for the attendance records
interface IAttendanceRecord {
  studentId: string;
  name: string;
  present: number;
}

// TypeScript interface for the Attendance document
interface IAttendance extends Document {
  classroomId: string;
  date: Date;
  attendance: IAttendanceRecord[];
}

// Mongoose schema for the attendance records
const AttendanceRecordSchema = new Schema<IAttendanceRecord>({
  studentId: { type: String, required: true },
  name: { type: String, required: true },
  present: { type: Number, required: true },
});

// Mongoose schema for the Attendance document
const AttendanceSchema = new Schema<IAttendance>({
  classroomId: { type: String, required: true },
  date: { type: Date, required: true },
  attendance: { type: [AttendanceRecordSchema], required: true },
});

// Mongoose model for the Attendance document
const Cumulative = model<IAttendance>("Cumulative", AttendanceSchema);

export { Cumulative, IAttendance, IAttendanceRecord };
