"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardEntry = void 0;
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    rank: { type: Number, required: true, min: 1 },
    username: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
}, { collection: 'leaderboard', timestamps: true });
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', leaderboardEntrySchema);
