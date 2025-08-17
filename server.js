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
import { generateStarsForSector } from './utils/sectorUtils.js';
import { generateStarsForSector3D } from './utils/sectorUtils3D.js';
import { synthesizeStarSystem } from './utils/synthesisUtils.js';
import { generateCompleteStarSystem } from './utils/systemUtils.js';

// --- Initialize Express App & Database Connection ---
const app = express();
connectDB(); // Connect to MongoDB using your modular function

// --- Core Middleware ---
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const createSeed = (str1, str2) => {
    // This is a basic way to create a numeric seed. More complex hashing can also be used.
    const combined = str1 + ',' + str2;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

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

app.get('/api/generateStars', authMiddleware.checkKey, async (req, res) => {

    const { sectorX, sectorY } = req.query;

    if (sectorX === undefined || sectorY === undefined) {
        return res.status(400).json({ error: 'Sector coordinates (sectorX, sectorY) are required.' });
    }

    // Call the dedicated function to get the stars for this sector
    const stars = generateStarsForSector(sectorX, sectorY);

    res.status(200).json(stars);
});

app.get('/api/generateStars3d', authMiddleware.checkKey, async (req, res) => {
    // Destructure all three coordinates from the query
    const { sectorX, sectorY, sectorZ } = req.query;

    // Validate that all three coordinates are provided
    if (sectorX === undefined || sectorY === undefined || sectorZ === undefined) {
        return res.status(400).json({
            error: 'All three sector coordinates (sectorX, sectorY, sectorZ) are required.'
        });
    }

    // Call the dedicated 3D generation function
    const stars = generateStarsForSector3D(sectorX, sectorY, sectorZ);

    res.status(200).json(stars);
});

app.get('/api/generate10000StarSystems', authMiddleware.checkKey, async (req, res) => {
    try {
        //console.log("Starting generation of 1000 star systems...");

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

        //console.log(`Successfully generated and saved ${systemsToSave.length} star systems.`);

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

// In server.js

app.get('/api/v1/systems/:starId', async (req, res) => {
    console.log("--- 🚀 STAR GENERATION ENDPOINT HIT! 🚀 ---");
    try {
        const { starId } = req.params;

        // --- ADD THIS LOG ---
        // This will show you the exact ID the API is trying to find.
        console.log(`Searching for system with starId: ${starId}`);

        // Find the system in the database using the starId from the URL.
        const system = await StarSystem.findOne({ starId: starId });

        if (!system) {
            // This is what's incorrectly happening right now.
            //console.log(`System not found for ID: ${starId}`);
            return res.status(404).json({ message: 'System not found.' });
        }

        // This is what SHOULD happen.
        // console.log(`System found: ${system.starName}`);
        res.status(200).json(system);

    } catch (error) {
        console.error(`Error fetching system by ID:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/v1/systems', authMiddleware.checkKey, async (req, res) => {

    console.log('Received request to create a new star system');

    try {
        // 1. The basic star data is received in the request body
        const basicStarData = req.body;

        if (!basicStarData || !basicStarData.id) {
            return res.status(400).json({ error: 'Basic star data is required.' });
        }

        // 2. Synthesize the full system USING the provided star data
        const newFullSystem = synthesizeStarSystem(basicStarData);

        // 3. Save the new, specific system to the database
        //const systemToSave = new StarSystem(newFullSystem);
        //const savedSystem = await systemToSave.save();

        const savedSystem = await StarSystem.create(newFullSystem);

        res.status(201).json(savedSystem);

    } catch (error) {
        console.error('Error creating new star system:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));