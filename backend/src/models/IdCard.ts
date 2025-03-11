import mongoose, { Document, Schema } from 'mongoose';
import { IStudent } from './Student';

interface ReissueHistory {
  requestDate: Date;
  reason: 'lost' | 'damaged' | 'expired' | 'other';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  notes?: string;
}

export interface IIdCard extends Document {
  student: IStudent['_id'];
  cardNumber: string;
  issueDate: Date;
  expiryDate: Date;
  qrCode: string;
  status: 'active' | 'expired' | 'lost' | 'damaged' | 'reissued';
  reissueHistory: ReissueHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const idCardSchema = new Schema<IIdCard>({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  },
  qrCode: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'lost', 'damaged', 'reissued'],
    default: 'active'
  },
  reissueHistory: [{
    requestDate: {
      type: Date
    },
    reason: {
      type: String,
      enum: ['lost', 'damaged', 'expired', 'other']
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed']
    },
    notes: String
  }]
}, { timestamps: true });

export default mongoose.model<IIdCard>('IdCard', idCardSchema); 