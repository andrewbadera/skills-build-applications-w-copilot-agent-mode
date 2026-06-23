"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsRouter = void 0;
const express_1 = require("express");
const Team_1 = require("../models/Team");
exports.teamsRouter = (0, express_1.Router)();
exports.teamsRouter.get('/', async (_req, res, next) => {
    try {
        const teams = await Team_1.Team.find().sort({ name: 1 }).lean();
        res.json({ teams });
    }
    catch (error) {
        next(error);
    }
});
