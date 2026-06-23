import { Schema, model } from 'mongoose';

export interface LeaderboardEntryDocument {
  rank: number;
  username: string;
  teamName: string;
  points: number;
  weeklyMinutes: number;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    rank: { type: Number, required: true, min: 1 },
    username: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
  },
  { collection: 'leaderboard', timestamps: true },
);

export const LeaderboardEntry = model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);