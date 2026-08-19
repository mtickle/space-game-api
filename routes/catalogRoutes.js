import express from 'express';
import db from '../utils/db.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Apply API key authentication to all catalog routes
router.use(authMiddleware.checkKey);

/**
 * Helper function to handle pagination parameters safely
 */
const getPagination = (query) => {
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 50));
    const offset = (page - 1) * limit;
    return { page, limit, offset };
};

// ==========================================
// STAR SYSTEMS
// GET /api/v1/catalog/systems
// ==========================================
router.get('/systems', async (req, res) => {
    try {
        const { page, limit, offset } = getPagination(req.query);

        const query = 'SELECT name as system_Name, star_type, description as system_desc, station_name, station_type, faction_name, total_planets, total_moons, total_settlements, * FROM space_game.vw_star_systems_extended LIMIT $1 OFFSET $2';
        const countQuery = 'SELECT count(*) FROM space_game.vw_star_systems_extended';

        const [result, countResult] = await Promise.all([
            db.query(query, [limit, offset]),
            db.query(countQuery)
        ]);

        const totalRecords = parseInt(countResult.rows[0].count, 10);

        res.status(200).json({
            data: result.rows,
            meta: { totalRecords, currentPage: page, totalPages: Math.ceil(totalRecords / limit) }
        });
    } catch (error) {
        console.error("Error fetching star systems:", error);
        res.status(500).json({ error: 'Failed to fetch star systems' });
    }
});

// ==========================================
// PLANETS
// GET /api/v1/catalog/planets?systemId=...
// ==========================================
router.get('/planets', async (req, res) => {
    try {
        const { systemId } = req.query;
        const { page, limit, offset } = getPagination(req.query);

        let query, countQuery, params, countParams;

        if (systemId) {
            query = 'SELECT * FROM space_game.vw_planets_extended WHERE system_id = $1 LIMIT $2 OFFSET $3';
            countQuery = 'SELECT count(*) FROM space_game.vw_planets_extended WHERE system_id = $1';
            params = [systemId, limit, offset];
            countParams = [systemId];
        } else {
            query = 'SELECT * FROM space_game.vw_planets_extended LIMIT $1 OFFSET $2';
            countQuery = 'SELECT count(*) FROM space_game.vw_planets_extended';
            params = [limit, offset];
            countParams = [];
        }

        const [result, countResult] = await Promise.all([
            db.query(query, params),
            db.query(countQuery, countParams)
        ]);

        const totalRecords = parseInt(countResult.rows[0].count, 10);

        res.status(200).json({
            data: result.rows,
            meta: { totalRecords, currentPage: page, totalPages: Math.ceil(totalRecords / limit) }
        });
    } catch (error) {
        console.error("Error fetching planets:", error);
        res.status(500).json({ error: 'Failed to fetch planets' });
    }
});

// ==========================================
// MOONS
// GET /api/v1/catalog/moons?planetId=...
// ==========================================
router.get('/moons', async (req, res) => {
    try {
        const { planetId } = req.query;
        const { page, limit, offset } = getPagination(req.query);

        let query, countQuery, params, countParams;

        if (planetId) {
            query = 'SELECT * FROM space_game.moons WHERE planet_id = $1 LIMIT $2 OFFSET $3';
            countQuery = 'SELECT count(*) FROM space_game.moons WHERE planet_id = $1';
            params = [planetId, limit, offset];
            countParams = [planetId];
        } else {
            query = 'SELECT * FROM space_game.moons LIMIT $1 OFFSET $2';
            countQuery = 'SELECT count(*) FROM space_game.moons';
            params = [limit, offset];
            countParams = [];
        }

        const [result, countResult] = await Promise.all([
            db.query(query, params),
            db.query(countQuery, countParams)
        ]);

        const totalRecords = parseInt(countResult.rows[0].count, 10);

        res.status(200).json({
            data: result.rows,
            meta: { totalRecords, currentPage: page, totalPages: Math.ceil(totalRecords / limit) }
        });
    } catch (error) {
        console.error("Error fetching moons:", error);
        res.status(500).json({ error: 'Failed to fetch moons' });
    }
});

// ==========================================
// SETTLEMENTS
// GET /api/v1/catalog/settlements?planetId=...
// ==========================================
router.get('/settlements', async (req, res) => {
    try {
        const { planetId } = req.query;
        const { page, limit, offset } = getPagination(req.query);

        let query, countQuery, params, countParams;

        if (planetId) {
            query = 'SELECT * FROM space_game.settlements WHERE planet_id = $1 LIMIT $2 OFFSET $3';
            countQuery = 'SELECT count(*) FROM space_game.settlements WHERE planet_id = $1';
            params = [planetId, limit, offset];
            countParams = [planetId];
        } else {
            query = 'SELECT * FROM space_game.settlements LIMIT $1 OFFSET $2';
            countQuery = 'SELECT count(*) FROM space_game.settlements';
            params = [limit, offset];
            countParams = [];
        }

        const [result, countResult] = await Promise.all([
            db.query(query, params),
            db.query(countQuery, countParams)
        ]);

        const totalRecords = parseInt(countResult.rows[0].count, 10);

        res.status(200).json({
            data: result.rows,
            meta: { totalRecords, currentPage: page, totalPages: Math.ceil(totalRecords / limit) }
        });
    } catch (error) {
        console.error("Error fetching settlements:", error);
        res.status(500).json({ error: 'Failed to fetch settlements' });
    }
});

// ==========================================
// SPECIES (Flora & Fauna)
// GET /api/v1/catalog/species?planetId=...
// ==========================================
router.get('/species', async (req, res) => {
    try {
        const { planetId } = req.query;
        const { page, limit, offset } = getPagination(req.query);

        let query, countQuery, params, countParams;

        if (planetId) {
            // Requires a JOIN with planet_inhabitants to find species on a specific planet
            query = `
                SELECT s.* 
                FROM space_game.species s
                JOIN space_game.planet_inhabitants pi ON s.id = pi.species_id
                WHERE pi.planet_id = $1 
                LIMIT $2 OFFSET $3
            `;
            countQuery = `
                SELECT count(s.id) 
                FROM space_game.species s
                JOIN space_game.planet_inhabitants pi ON s.id = pi.species_id
                WHERE pi.planet_id = $1
            `;
            params = [planetId, limit, offset];
            countParams = [planetId];
        } else {
            query = 'SELECT * FROM space_game.species LIMIT $1 OFFSET $2';
            countQuery = 'SELECT count(*) FROM space_game.species';
            params = [limit, offset];
            countParams = [];
        }

        const [result, countResult] = await Promise.all([
            db.query(query, params),
            db.query(countQuery, countParams)
        ]);

        const totalRecords = parseInt(countResult.rows[0].count, 10);

        res.status(200).json({
            data: result.rows,
            meta: { totalRecords, currentPage: page, totalPages: Math.ceil(totalRecords / limit) }
        });
    } catch (error) {
        console.error("Error fetching species:", error);
        res.status(500).json({ error: 'Failed to fetch species' });
    }
});

export default router;