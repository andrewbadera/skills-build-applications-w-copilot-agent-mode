"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("../models/Activity");
const LeaderboardEntry_1 = require("../models/LeaderboardEntry");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
// Seed command: npm --prefix octofit-tracker/backend run seed
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGO_URI);
    await Promise.all([
        User_1.User.deleteMany({}),
        Team_1.Team.deleteMany({}),
        Activity_1.Activity.deleteMany({}),
        LeaderboardEntry_1.LeaderboardEntry.deleteMany({}),
        Workout_1.Workout.deleteMany({}),
    ]);
    await Team_1.Team.insertMany([
        {
            name: 'Velocity Vipers',
            city: 'Seattle',
            coach: 'Morgan Lee',
            memberCount: 14,
            weeklyGoalMinutes: 3600,
        },
        {
            name: 'Core Crushers',
            city: 'Austin',
            coach: 'Priya Shah',
            memberCount: 11,
            weeklyGoalMinutes: 3000,
        },
        {
            name: 'Endurance Eagles',
            city: 'Denver',
            coach: 'Sam Rivera',
            memberCount: 16,
            weeklyGoalMinutes: 4200,
        },
    ]);
    await User_1.User.insertMany([
        {
            username: 'alexrunner',
            displayName: 'Alex Morgan',
            email: 'alex.morgan@example.com',
            teamName: 'Velocity Vipers',
            fitnessGoal: 'Run a sub-45-minute 10K',
            joinedAt: new Date('2026-01-09T15:30:00Z'),
        },
        {
            username: 'jamiecore',
            displayName: 'Jamie Chen',
            email: 'jamie.chen@example.com',
            teamName: 'Core Crushers',
            fitnessGoal: 'Build full-body strength',
            joinedAt: new Date('2026-02-14T12:00:00Z'),
        },
        {
            username: 'taylortrek',
            displayName: 'Taylor Brooks',
            email: 'taylor.brooks@example.com',
            teamName: 'Endurance Eagles',
            fitnessGoal: 'Train for a mountain relay',
            joinedAt: new Date('2026-03-03T18:45:00Z'),
        },
    ]);
    await Activity_1.Activity.insertMany([
        {
            username: 'alexrunner',
            type: 'Outdoor Run',
            durationMinutes: 42,
            distanceMiles: 5.2,
            caloriesBurned: 510,
            date: new Date('2026-06-21T13:15:00Z'),
        },
        {
            username: 'jamiecore',
            type: 'Strength Circuit',
            durationMinutes: 55,
            caloriesBurned: 430,
            date: new Date('2026-06-22T10:00:00Z'),
        },
        {
            username: 'taylortrek',
            type: 'Cycling',
            durationMinutes: 74,
            distanceMiles: 18.4,
            caloriesBurned: 690,
            date: new Date('2026-06-20T16:20:00Z'),
        },
    ]);
    await LeaderboardEntry_1.LeaderboardEntry.insertMany([
        {
            rank: 1,
            username: 'taylortrek',
            teamName: 'Endurance Eagles',
            points: 1840,
            weeklyMinutes: 310,
        },
        {
            rank: 2,
            username: 'alexrunner',
            teamName: 'Velocity Vipers',
            points: 1715,
            weeklyMinutes: 284,
        },
        {
            rank: 3,
            username: 'jamiecore',
            teamName: 'Core Crushers',
            points: 1620,
            weeklyMinutes: 255,
        },
    ]);
    await Workout_1.Workout.insertMany([
        {
            name: 'Tempo Run Builder',
            focus: 'cardio',
            difficulty: 'intermediate',
            durationMinutes: 45,
            equipment: ['running shoes'],
            recommendedFor: 'Runners improving race pace',
        },
        {
            name: 'Foundational Strength Circuit',
            focus: 'strength',
            difficulty: 'beginner',
            durationMinutes: 35,
            equipment: ['dumbbells', 'mat'],
            recommendedFor: 'Athletes building consistent strength habits',
        },
        {
            name: 'Trail Climb Intervals',
            focus: 'endurance',
            difficulty: 'advanced',
            durationMinutes: 60,
            equipment: ['bike', 'helmet'],
            recommendedFor: 'Cyclists preparing for sustained climbs',
        },
    ]);
    console.log('Seed complete');
}
seed()
    .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
