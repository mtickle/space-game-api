import express from 'express';
import authMiddleware from '../middleware/auth.js';
import db from '../utils/db.js';
import { generateStarsForSector } from '../utils/sectorUtils.js';
import { generateStarsForSector3D } from '../utils/sectorUtils3D.js';
import { getStarSystemFromPg, saveBulkStarSystemsToPg, saveStarSystemToPg } from '../utils/storageUtils.js';
import { synthesizeStarSystem } from '../utils/synthesisUtils.js';
import { createStarData } from '../utils/systemUtils.js';

const router = express.Router();

// Test Route
router.get('/protected_data', authMiddleware.checkKey, (req, res) => {
    res.status(200).json({ message: 'You accessed protected data!', data: 'This is top-secret galaxy information.' });
});

// ==========================================
// SECTOR GENERATION
// ==========================================

router.get('/v1/sectors/stars', authMiddleware.checkKey, async (req, res) => {
    console.log("Generating stars for sector...");
    const { sectorX, sectorY } = req.query;

    if (sectorX === undefined || sectorY === undefined) {
        return res.status(400).json({ error: 'Sector coordinates (sectorX, sectorY) are required.' });
    }

    const stars = generateStarsForSector(sectorX, sectorY);
    res.status(200).json(stars);
});

router.get('/v1/sectors/stars3d', authMiddleware.checkKey, async (req, res) => {
    const { sectorX, sectorY, sectorZ } = req.query;

    if (sectorX === undefined || sectorY === undefined || sectorZ === undefined) {
        return res.status(400).json({ error: 'All three sector coordinates are required.' });
    }

    const stars = generateStarsForSector3D(sectorX, sectorY, sectorZ);
    res.status(200).json(stars);
});

// ==========================================
// SYSTEM OPERATIONS (Single)
// ==========================================

router.get('/v1/systems/:starId', authMiddleware.checkKey, async (req, res) => {
    try {
        const { starId } = req.params;
        console.log("-----------------------------------------------------------------")
        console.log(`Searching for system with starId: ${starId}`);

        const system = await getStarSystemFromPg(starId);

        if (!system) {
            // FIXED: Now properly returns a 404 so the React UI knows to generate it!
            return res.status(404).json(null);
        }

        res.status(200).json({ ...system, isNewDiscovery: false });
    } catch (error) {
        console.error(`Error in GET /api/v1/systems/:starId endpoint:`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/v1/systems', authMiddleware.checkKey, (req, res) => {
    console.log('Received request to create a new star system');
    try {
        const basicStarData = req.body;

        if (!basicStarData || !basicStarData.id) {
            return res.status(400).json({ error: 'Basic star data is required.' });
        }

        const newFullSystem = synthesizeStarSystem(basicStarData);
        res.status(201).json({ ...newFullSystem, isNewDiscovery: true });

        const saveInBackground = async () => {
            try {
                const saveSuccessful = await saveStarSystemToPg(newFullSystem);
                if (saveSuccessful) {
                    console.log(`Background save for ${newFullSystem.starName} successful.`);
                    console.log("-----------------------------------------------------------------")
                } else {
                    console.error(`BACKGROUND SAVE FAILED for system: ${newFullSystem.starName}`);
                    console.log("-----------------------------------------------------------------")
                }
            } catch (dbError) {
                console.error('CRITICAL BACKGROUND SAVE FAILED:', dbError);
            }
        };

        saveInBackground();
    } catch (error) {
        console.error('Error during initial system synthesis:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// Legacy single random generation route
router.post('/v1/systems/random', authMiddleware.checkKey, (req, res) => {
    try {
        const basicStar = createStarData();
        const fullSystem = synthesizeStarSystem(basicStar);
        res.status(201).json(fullSystem);

        saveStarSystemToPg(fullSystem).catch(dbError => {
            console.error('BACKGROUND SAVE FAILED:', dbError);
        });
    } catch (error) {
        console.error('Error during initial system generation:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// ==========================================
// BULK OPERATIONS
// ==========================================

router.post('/v1/systems/bulk', authMiddleware.checkKey, async (req, res) => {
    const count = req.body?.count ? parseInt(req.body.count, 10) : 250000;
    const batchSize = req.body?.batchSize ? parseInt(req.body.batchSize, 10) : 1000;

    if (isNaN(count) || count <= 0 || isNaN(batchSize) || batchSize <= 0) {
        return res.status(400).json({ error: 'Invalid count or batchSize. Must be positive numbers.' });
    }

    console.log(`Received request to generate ${count} systems in batches of ${batchSize}...`);
    res.status(202).json({ message: `Accepted: Starting generation of ${count} systems.` });

    const generateAndSave = async () => {
        try {
            console.log("Starting bulk generation process...");
            let totalSaved = 0;
            let systemsBatch = [];

            for (let i = 0; i < count; i++) {
                const basicStar = createStarData();
                const fullSystem = synthesizeStarSystem(basicStar);
                if (fullSystem) systemsBatch.push(fullSystem);

                if (systemsBatch.length >= batchSize || i === count - 1) {
                    if (systemsBatch.length > 0) {
                        console.log(`Attempting to save batch of ${systemsBatch.length} systems (Total processed: ${i + 1})...`);
                        const saveSuccessful = await saveBulkStarSystemsToPg(systemsBatch);
                        if (saveSuccessful) {
                            totalSaved += systemsBatch.length;
                            console.log(`Successfully saved batch. Total saved so far: ${totalSaved}`);
                        } else {
                            console.error(`Failed to save batch ending at index ${i}. Stopping bulk generation.`);
                            break;
                        }
                        systemsBatch = [];
                    }
                }
            }
            console.log(`Bulk generation finished. Total systems saved: ${totalSaved}`);
        } catch (error) {
            console.error('CRITICAL ERROR during bulk generation background process:', error);
        }
    };
    generateAndSave();
});

// Fixed: Changed to POST and renamed for RESTful compliance
router.post('/v1/systems/bulk/10k', authMiddleware.checkKey, async (req, res) => {
    try {
        console.log("Starting bulk generation of 10,000 star systems...");
        const systemsToSave = [];

        for (let i = 0; i < 5000; i++) {
            const basicStar = createStarData();
            const fullSystem = synthesizeStarSystem(basicStar);
            if (fullSystem) systemsToSave.push(fullSystem);
        }

        if (systemsToSave.length === 0) return res.status(500).json({ error: 'Failed to generate any systems.' });

        const saveSuccessful = await saveBulkStarSystemsToPg(systemsToSave);
        if (!saveSuccessful) return res.status(500).json({ error: 'Failed to save bulk systems to the database.' });

        res.status(201).json({ message: `Successfully generated and saved ${systemsToSave.length} star systems.` });
    } catch (error) {
        console.error('Error during bulk star system generation:', error);
        res.status(500).json({ error: 'Internal server error during bulk generation.' });
    }
});

// Fixed: Changed to POST and renamed for RESTful compliance
router.post('/v1/systems/bulk/1m', authMiddleware.checkKey, async (req, res) => {
    console.log("--- WARNING: Initiating bulk generation of 1,000,000 star systems. This will take a while... ---");
    try {
        const TOTAL_SYSTEMS = 1000000;
        const BATCH_SIZE = 1000;
        let systemsBatch = [];
        let totalSaved = 0;

        for (let i = 0; i < TOTAL_SYSTEMS; i++) {
            const basicStar = createStarData();
            const fullSystem = synthesizeStarSystem(basicStar);

            if (fullSystem) {
                console.log(`Generated system ${i + 1}: Star ID ${fullSystem.starId}`);
                systemsBatch.push(fullSystem);
            }

            if (systemsBatch.length === BATCH_SIZE) {
                await saveBulkStarSystemsToPg(systemsBatch);
                totalSaved += systemsBatch.length;
                systemsBatch = [];
                console.log(` -> Saved batch. Total systems saved so far: ${totalSaved}`);
            }
        }

        if (systemsBatch.length > 0) {
            await saveBulkStarSystemsToPg(systemsBatch);
            totalSaved += systemsBatch.length;
        }

        console.log(`--- Bulk generation complete! Total systems saved: ${totalSaved} ---`);
        res.status(201).json({ message: `Successfully generated and saved ${totalSaved} star systems.` });
    } catch (error) {
        console.error('Critical error during massive bulk generation:', error);
        res.status(500).json({ error: 'A critical error occurred during the bulk generation process.' });
    }
});

// ==========================================
// SYSTEM STATS
// ==========================================

router.get('/v1/stats', async (req, res) => {
    try {
        const [planetRes, starRes] = await Promise.all([
            db.query('SELECT count(*) FROM space_game.planets'),
            db.query('SELECT count(*) FROM space_game.star_systems')
        ]);

        const stats = {
            planetCount: parseInt(planetRes.rows[0].count, 10),
            starCount: parseInt(starRes.rows[0].count, 10)
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error("Error getting database stats:", error);
        res.status(500).json({ error: "Failed to fetch database statistics" });
    }
});

export default router;