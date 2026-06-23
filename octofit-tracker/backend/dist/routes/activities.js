"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitiesRouter = void 0;
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
exports.activitiesRouter = (0, express_1.Router)();
exports.activitiesRouter.get('/', async (_req, res, next) => {
    try {
        const activities = await Activity_1.Activity.find().sort({ date: -1 }).lean();
        res.json({ activities });
    }
    catch (error) {
        next(error);
    }
});
