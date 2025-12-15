// Load environment variables. This should be the very first thing.
import dotenv from 'dotenv';
dotenv.config();

// Import dependencies
import cors from 'cors';
import express from 'express';


// Import your models, routes, and middleware
import authMiddleware from './middleware/auth.js';
import { initializeGalacticPolitics } from './utils/politicsUtils.js';
import { generateStarsForSector } from './utils/sectorUtils.js';
import { generateStarsForSector3D } from './utils/sectorUtils3D.js';
import { seedDatabase } from './utils/seedDbs.js';
import { getStarSystemFromPg, saveBulkStarSystemsToPg, saveStarSystemToPg } from './utils/storageUtils.js';
import { synthesizeStarSystem } from './utils/synthesisUtils.js';
import { createStarData } from './utils/systemUtils.js';

const app = express();
initializeGalacticPolitics(); //Initialize politics on server start
seedDatabase();

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
        author: "Mike Tickle",
        status: "Operational",
        authentication: "API Key (x-api-key header)",
        database: "PostgreSQL"
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
        console.log("Starting bulk generation of 10,000 star systems...");

        const systemsToSave = [];

        for (let i = 0; i < 5000; i++) {
            const basicStar = createStarData();
            const fullSystem = synthesizeStarSystem(basicStar);
            if (fullSystem) {
                systemsToSave.push(fullSystem);
            }
        }

        if (systemsToSave.length === 0) {
            return res.status(500).json({ error: 'Failed to generate any systems.' });
        }

        // --- REVISED LOGIC ---
        // Call the new function to save all systems to Postgres in one transaction.
        const saveSuccessful = await saveBulkStarSystemsToPg(systemsToSave);

        if (!saveSuccessful) {
            return res.status(500).json({ error: 'Failed to save bulk systems to the database.' });
        }

        res.status(201).json({
            message: `Successfully generated and saved ${systemsToSave.length} star systems.`
        });

    } catch (error) {
        console.error('Error during bulk star system generation:', error);
        res.status(500).json({ error: 'Internal server error during bulk generation.' });
    }
});

app.get('/api/generate1MillionStarSystems', authMiddleware.checkKey, async (req, res) => {
    console.log("--- WARNING: Initiating bulk generation of 1,000,000 star systems. This will take a while... ---");
    try {
        const TOTAL_SYSTEMS = 1000000;
        const BATCH_SIZE = 1000; // Process 1,000 systems at a time to manage memory
        let systemsBatch = [];
        let totalSaved = 0;

        for (let i = 0; i < TOTAL_SYSTEMS; i++) {
            // Generate a single, complete star system
            const basicStar = createStarData();
            const fullSystem = synthesizeStarSystem(basicStar);

            if (fullSystem) {
                console.log(`Generated system ${i + 1}: Star ID ${fullSystem.starId}`);
                systemsBatch.push(fullSystem);
            }

            // When the batch is full, save it to the database and clear the memory
            if (systemsBatch.length === BATCH_SIZE) {
                await saveBulkStarSystemsToPg(systemsBatch);
                totalSaved += systemsBatch.length;
                systemsBatch = []; // Reset the batch for the next set
                console.log(` -> Saved batch. Total systems saved so far: ${totalSaved}`);
            }
        }

        // Save any remaining systems in the final, smaller batch
        if (systemsBatch.length > 0) {
            await saveBulkStarSystemsToPg(systemsBatch);
            totalSaved += systemsBatch.length;
        }

        console.log(`--- Bulk generation complete! Total systems saved: ${totalSaved} ---`);
        res.status(201).json({
            message: `Successfully generated and saved ${totalSaved} star systems.`
        });

    } catch (error) {
        console.error('Critical error during massive bulk generation:', error);
        res.status(500).json({ error: 'A critical error occurred during the bulk generation process.' });
    }
});

app.get('/api/generateStarSystem', authMiddleware.checkKey, (req, res) => { // Note: no longer async
    try {
        const basicStar = createStarData();
        const fullSystem = synthesizeStarSystem(basicStar);

        // 1. Immediately send the response to the client.
        // The user's interface now has the data and feels instantaneous.
        res.status(201).json(fullSystem);

        // 2. "Fire and Forget" the database save.
        // We call the async save function but don't await its result.
        // The server will handle this in the background.
        saveStarSystemToPg(fullSystem).catch(dbError => {
            // If the save fails, we can't tell the client,
            // but we MUST log it on the server for debugging.
            console.error('BACKGROUND SAVE FAILED:', dbError);
        });

    } catch (error) {
        console.error('Error during initial system generation:', error);
        // Only send an error if the generation itself fails, before the response is sent.
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

app.post('/api/generateBulkSystems', authMiddleware.checkKey, async (req, res) => {
    // Check if req.body exists before accessing its properties
    const count = req.body?.count ? parseInt(req.body.count, 10) : 250000; // Default count
    const batchSize = req.body?.batchSize ? parseInt(req.body.batchSize, 10) : 1000; // Default batch size

    if (isNaN(count) || count <= 0 || isNaN(batchSize) || batchSize <= 0) {
        return res.status(400).json({ error: 'Invalid count or batchSize. Must be positive numbers.' });
    }

    console.log(`Received request to generate ${count} systems in batches of ${batchSize}...`);

    // Immediately send a 202 Accepted response
    res.status(202).json({ message: `Accepted: Starting generation of ${count} systems.` });

    // --- Perform the generation and saving in the background ---
    const generateAndSave = async () => {
        try {
            console.log("Starting bulk generation process...");
            let totalSaved = 0;
            let systemsBatch = [];

            for (let i = 0; i < count; i++) {
                const basicStar = createStarData();
                const fullSystem = synthesizeStarSystem(basicStar);
                if (fullSystem) {
                    systemsBatch.push(fullSystem);
                }

                // When the batch is full, save it and clear the array
                if (systemsBatch.length >= batchSize || i === count - 1) {
                    if (systemsBatch.length > 0) {
                        console.log(`Attempting to save batch of ${systemsBatch.length} systems (Total processed: ${i + 1})...`);
                        const saveSuccessful = await saveBulkStarSystemsToPg(systemsBatch);
                        if (saveSuccessful) {
                            totalSaved += systemsBatch.length;
                            console.log(`Successfully saved batch. Total saved so far: ${totalSaved}`);
                        } else {
                            console.error(`Failed to save batch ending at index ${i}. Stopping bulk generation.`);
                            // Optionally, break or implement retry logic
                            break;
                        }
                        systemsBatch = []; // Reset the batch
                    }
                }
            }
            console.log(`Bulk generation finished. Total systems saved: ${totalSaved}`);

        } catch (error) {
            console.error('CRITICAL ERROR during bulk generation background process:', error);
        }
    };

    // Run the generation process without awaiting it
    generateAndSave();

});

app.get('/api/v1/stats', authMiddleware.checkKey, async (req, res) => {
    try {
        // Run count queries in parallel for better performance
        const [userRes, starRes] = await Promise.all([
            db.query('SELECT count(*) FROM space_game.users'),
            db.query('SELECT count(*) FROM space_game.stars')
        ]);

        const stats = {
            userCount: parseInt(userRes.rows[0].count, 10),
            starCount: parseInt(starRes.rows[0].count, 10)
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error("Error getting database stats:", error);
        res.status(500).json({ error: "Failed to fetch database statistics" });
    }
});

app.get('/api/v1/systems/:starId', authMiddleware.checkKey, async (req, res) => {
    try {
        const { starId } = req.params;
        console.log(`Searching for system with starId: ${starId}`);

        // --- REVISED LOGIC ---
        // Call the new function to get the full system from Postgres.
        const system = await getStarSystemFromPg(starId);

        if (!system) {
            // If the function returns null, the system was not found.
            return res.status(404).json({ error: 'System not found, but that is okay, we just havent generated yet.' });
            //return res.status(200).json(null);
        }

        // System was found, return it.
        res.status(200).json(system);

    } catch (error) {
        console.error(`Error in GET /api/v1/systems/:starId endpoint:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/v1/systems', authMiddleware.checkKey, (req, res) => { // No longer async
    console.log('Received request to create a new star system');

    try {
        const basicStarData = req.body;
        // const userId = req.user?.id; // This would be used in the background save

        if (!basicStarData || !basicStarData.id) {
            return res.status(400).json({ error: 'Basic star data is required.' });
        }

        // 1. Synthesize the full system. This is fast.
        const newFullSystem = synthesizeStarSystem(basicStarData);

        // 2. Immediately send the response. The UI is now updated and feels instant.
        res.status(201).json(newFullSystem);

        // 3. "Fire and Forget" the database operations.
        // We define an async function to handle the save and discovery log.
        const saveInBackground = async () => {
            try {
                const saveSuccessful = await saveStarSystemToPg(newFullSystem);
                if (saveSuccessful) {
                    // Once the system is saved, you can log the discovery.
                    // This is where you would uncomment and use the userId.
                    // await logUserDiscovery(userId, newFullSystem.starId);
                    console.log(`Background save for ${newFullSystem.starName} successful.`);
                } else {
                    // If the primary save fails, we just log it.
                    console.error(`BACKGROUND SAVE FAILED for system: ${newFullSystem.starName}`);
                }
            } catch (dbError) {
                // This catch is crucial for logging any unexpected errors during the save.
                console.error('CRITICAL BACKGROUND SAVE FAILED:', dbError);
            }
        };

        // We call the function but don't await it. The server moves on
        // while the save happens in the background.
        saveInBackground();

    } catch (error) {
        console.error('Error during initial system synthesis:', error);
        // This will only catch errors from the synthesis part, before the response is sent.
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));