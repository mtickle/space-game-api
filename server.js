// server.js

// --- ADD THIS AT THE VERY TOP ---
import dotenv from 'dotenv';
dotenv.config();
// ------------------------------------

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// --- Import your models and middleware ---
import authMiddleware from './middleware/auth.js';
import { usersModel } from './models/users.js';
import { generateCompleteStarSystem } from './utils/systemUtils.js'; // Adjust the import path as necessary

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
// The MONGODB_URI variable will now be correctly populated from your .env file.
const MONGODB_URI = process.env.MONGODB_URI;
console.log('Connecting to MongoDB with URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB connected successfully!'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// --- API Endpoints ---
app.get('/api/about', (req, res) => {
    res.status(200).json({
        name: "Space Game Procedural Generation API",
        version: "1.0.0",
        description: "A backend service providing procedurally generated star systems, planets, and moons.",
        author: "Your Name/Team",
        status: "Operational",
        authentication: "API Key (x-api-key header)",
        database: "MongoDB"
    });
});

app.post('/api/register', async (req, res) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: 'Username is required.' });
        }

        const existingUser = await usersModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists.' });
        }

        const newApiKey = uuidv4();
        const newUser = new usersModel({ username, apiKey: newApiKey });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!', username, apiKey: newApiKey });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Server error during registration.' });
    }
});

app.get('/api/protected_data', authMiddleware.checkKey, (req, res) => {
    res.status(200).json({ message: 'You accessed protected data!', data: 'This is top-secret galaxy information.' });
});

app.get('/api/generateStarSystem', authMiddleware.checkKey, async (req, res) => {
    try {
        // Here's a sample star system object, which you would replace with the
        // output of your synthesizeStarSystem function once it's imported.
        // const sampleStarSystem = {
        //     starId: "f0d7b05e-5e3e-4d8b-9e0c-8c0c8b05e3e3",
        //     starName: "Orion's Belt",
        //     planets: [
        //         {
        //             planetId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        //             planetName: "Betelgeuse Prime",
        //             planetColor: "#FF8C00",
        //             planetSize: 15,
        //             moons: []
        //         },
        //         {
        //             planetId: "b2c3d4e5-f6a7-8901-2345-67890abcdeff",
        //             planetName: "Rigel Minor",
        //             planetColor: "#87CEFA",
        //             planetSize: 8,
        //             moons: [
        //                 {
        //                     moonId: "c3d4e5f6-a7b8-9012-3456-7890abcdefff",
        //                     moonName: "Orion's Tear",
        //                     moonColor: "#D3D3D3",
        //                     moonSize: 3
        //                 }
        //             ]
        //         }
        //     ]
        // };
        const fullSystem = generateCompleteStarSystem();
        //This is where you would eventually call your synthesis function:
        //const fullSystem = synthesizeStarSystem(req.query.seed || 'some_default_seed');
        console.log('Generated Star System:', fullSystem);

        res.status(200).json(fullSystem);
    } catch (error) {
        console.error('Error in /api/generate_star_system:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));