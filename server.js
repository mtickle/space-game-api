// Load environment variables. This should be the very first thing.
import dotenv from 'dotenv';
dotenv.config();

// Import dependencies
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swaggerConfig.js';

// Import Routers
import catalogRoutes from './routes/catalogRoutes.js';
import systemRoutes from './routes/systemRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Import utilities
import { initializeGalacticPolitics } from './utils/politicsUtils.js';
import { seedDatabase } from './utils/seedDbs.js';

const app = express();
initializeGalacticPolitics(); //Initialize politics on server start
seedDatabase();

// --- Core Middleware ---
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// --- Swagger Documentation ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- General API Endpoints ---
/**
 * @swagger
 * /api/about:
 *   get:
 *     summary: API Information
 *     description: Returns basic information about the Space Game API, version, and status.
 *     tags: [General]
 *     responses:
 *       200:
 *         description: A JSON object containing API details.
 */
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

// --- Mount Routers ---
// The routers handle their own prefixes now!
app.use('/api/v1/catalog', catalogRoutes);
app.use('/api/v1/systems', systemRoutes);
app.use('/api/v1/admin', adminRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));