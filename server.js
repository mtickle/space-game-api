// Load environment variables. This should be the very first thing.
import dotenv from 'dotenv';
dotenv.config();

// Import dependencies
import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import StarSystem from './models/StarSystem.js';

// Import your models, routes, and middleware
import authMiddleware from './middleware/auth.js';
import { usersModel } from './models/users.js';
import { generateCompleteStarSystem } from './utils/systemUtils.js';

// --- Initialize Express App & Database Connection ---
const app = express();
connectDB(); // Connect to MongoDB using your modular function

// --- Core Middleware ---
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies


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

app.get('/api/generate10000StarSystems', authMiddleware.checkKey, async (req, res) => {
    try {
        console.log("Starting generation of 1000 star systems...");

        const systemsToSave = [];

        // 1. Generate 1000 systems and add them to an array
        for (let i = 0; i < 10000; i++) {
            const fullSystem = generateCompleteStarSystem();
            if (fullSystem) {
                systemsToSave.push(fullSystem);
            }
        }

        if (systemsToSave.length === 0) {
            return res.status(500).json({ error: 'Failed to generate any systems.' });
        }

        // 2. Use insertMany() to save all systems in a single database operation
        await StarSystem.insertMany(systemsToSave);

        console.log(`Successfully generated and saved ${systemsToSave.length} star systems.`);

        // 3. Respond with a success message
        res.status(201).json({
            message: `Successfully generated and saved ${systemsToSave.length} star systems.`
        });

    } catch (error) {
        console.error('Error during bulk star system generation:', error);
        res.status(500).json({ error: 'Internal server error during bulk generation.' });
    }
});

app.get('/api/generateStarSystem', authMiddleware.checkKey, async (req, res) => {
    try {

        //--- Generate a complete star system using the utility function.
        const fullSystem = generateCompleteStarSystem();

        //--- Save the generated star system to MongoDB
        const systemToSave = new StarSystem(fullSystem);
        const savedSystem = await systemToSave.save();

        //--- Respond with the saved star system data.
        res.status(201).json({ result: 'System created and saved.' });

    } catch (error) {
        console.error('Error while generating star system:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));