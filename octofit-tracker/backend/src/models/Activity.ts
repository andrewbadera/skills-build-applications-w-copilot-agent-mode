import { Schema, model } from 'mongoose';

export interface ActivityDocument {
  username: string;
  type: string;
  durationMinutes: number;
  distanceMiles?: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    username: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    distanceMiles: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Activity = model<ActivityDocument>('Activity', activitySchema);