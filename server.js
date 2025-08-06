// server.js

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// --- Import your models and middleware ---
import authMiddleware from './middleware/auth.js';
import { usersModel } from './models/users.js';
// Import your synthesis and DB utility functions here when ready
// import { synthesizeStarSystem } from './path/to/systemSynthesis.js';
// import { saveThingsToDatabase, getThingsFromDatabase } from './path/to/dbUtils.js';

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// In server.js

mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose connected to MongoDB!');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ Mongoose disconnected from MongoDB!');
});
// --- API Endpoints ---

// About API endpoint
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

// User Registration / API Key Generation Endpoint
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

// --- Example of a Protected Endpoint ---
// This route will require a valid API key in the 'x-api-key' header
app.get('/api/protected_data', authMiddleware.checkKey, (req, res) => {
    res.status(200).json({ message: 'You accessed protected data!', data: 'This is top-secret galaxy information.' });
});

// --- Placeholder for your actual generation and system retrieval endpoints ---
// Uncomment and integrate your synthesis and DB utility functions when ready.
/*
app.post('/api/generate_system', authMiddleware.checkKey, async (req, res) => {
    try {
        const { starId, starName, ...otherStarData } = req.body;
        const fullSystem = synthesizeStarSystem({ starId, starName, ...otherStarData });
        if (!fullSystem) {
            return res.status(400).json({ error: "Failed to synthesize star system" });
        }
        await saveThingsToDatabase("postStarSystem", fullSystem);
        res.status(201).json({ message: "System generated and saved successfully", data: fullSystem });
    } catch (error) {
        console.error('Error in /api/generate_system:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/system/:starId', authMiddleware.checkKey, async (req, res) => {
    try {
        const { starId } = req.params;
        const system = await getThingsFromDatabase("getStarSystem", starId);
        if (!system) {
            return res.status(404).json({ error: "System not found" });
        }
        res.status(200).json(system);
    } catch (error) {
        console.error('Error in /api/system:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
*/

// --- Start the server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));