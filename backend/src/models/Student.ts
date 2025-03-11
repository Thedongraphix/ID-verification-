import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IStudent extends Document {
  user: IUser['_id'];
  studentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  program: string;
  enrollmentDate: Date;
  graduationYear?: number;
  photo: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

const studentSchema = new Schema<IStudent>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  enrollmentDate: {
    type: Date,
    required: true
  },
  graduationYear: {
    type: Number
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated', 'suspended'],
    default: 'active'
  }
}, { timestamps: true });

export default mongoose.model<IStudent>('Student', studentSchema); 