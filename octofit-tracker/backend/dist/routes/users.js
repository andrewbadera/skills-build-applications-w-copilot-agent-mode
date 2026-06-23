"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', async (_req, res, next) => {
    try {
        const users = await User_1.User.find().sort({ displayName: 1 }).lean();
        res.json({ users });
    }
    catch (error) {
        next(error);
    }
});
