"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    fitnessGoal: { type: String, required: true, trim: true },
    joinedAt: { type: Date, required: true },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
