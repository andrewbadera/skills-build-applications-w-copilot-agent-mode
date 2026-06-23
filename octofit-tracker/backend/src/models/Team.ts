import { Schema, model } from 'mongoose';

export interface TeamDocument {
  name: string;
  city: string;
  coach: string;
  memberCount: number;
  weeklyGoalMinutes: number;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    coach: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 0 },
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const Team = model<TeamDocument>('Team', teamSchema);