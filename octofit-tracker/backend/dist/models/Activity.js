"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    username: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    distanceMiles: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
