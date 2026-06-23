"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutsRouter = void 0;
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
exports.workoutsRouter = (0, express_1.Router)();
exports.workoutsRouter.get('/', async (_req, res, next) => {
    try {
        const workouts = await Workout_1.Workout.find().sort({ focus: 1, name: 1 }).lean();
        res.json({ workouts });
    }
    catch (error) {
        next(error);
    }
});
