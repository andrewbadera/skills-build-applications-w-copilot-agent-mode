"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = void 0;
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
async function connectDatabase() {
    await mongoose_1.default.connect(exports.MONGO_URI);
}
