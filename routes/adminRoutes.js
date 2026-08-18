// Internal route to rehydrate materialized views
import express from 'express';
const router = express.Router();
import db from '../utils/db.js';
router.post('/refresh-views', async (req, res) => {
    // Security: Check for a secret admin token instead of an IP address
    const cronSecret = req.headers['x-cron-secret'];

    if (!cronSecret || cronSecret !== process.env.ADMIN_CRON_SECRET) {
        console.warn(`Unauthorized view refresh attempt blocked.`);
        return res.status(403).json({ error: 'Forbidden. Invalid credentials.' });
    }

    try {
        console.log("Starting overnight material view rehydration...");

        // Running these sequentially (with await) is perfect here. 
        // It prevents spiking the database CPU all at once.
        await db.query('REFRESH MATERIALIZED VIEW space_game.mvw_galactic_flora;');
        await db.query('REFRESH MATERIALIZED VIEW space_game.mvw_galactic_fauna;');
        await db.query('REFRESH MATERIALIZED VIEW space_game.mvw_galactic_resources;');
        await db.query('REFRESH MATERIALIZED VIEW space_game.mvw_galactic_atmosphere_gases;');

        console.log("Rehydration complete.");
        res.status(200).json({ message: 'Views refreshed successfully.' });
    } catch (error) {
        console.error("Failed to refresh materialized views:", error);
        res.status(500).json({ error: 'Internal server error during refresh.' });
    }
});

export default router;