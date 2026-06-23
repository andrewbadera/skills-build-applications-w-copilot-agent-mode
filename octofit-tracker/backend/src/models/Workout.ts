import { Schema, model } from 'mongoose';

export interface WorkoutDocument {
  name: string;
  focus: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  equipment: string[];
  recommendedFor: string;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    name: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    equipment: { type: [String], required: true },
    recommendedFor: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Workout = model<WorkoutDocument>('Workout', workoutSchema);