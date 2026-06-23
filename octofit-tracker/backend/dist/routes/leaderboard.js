"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardRouter = void 0;
const express_1 = require("express");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
exports.leaderboardRouter = (0, express_1.Router)();
exports.leaderboardRouter.get('/', async (_req, res, next) => {
    try {
        const leaderboard = await LeaderboardEntry_1.LeaderboardEntry.find().sort({ rank: 1 }).lean();
        res.json({ leaderboard });
    }
    catch (error) {
        next(error);
    }
});
