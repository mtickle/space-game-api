import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

// Main API endpoint
app.get('/api', (req, res) => {
    res.status(200).json({
        message: "Welcome to the Space Game API!",
        endpoints: {
            '/api/generate_system': 'POST - Generate and save a new star system.',
            '/api/system/:starId': 'GET - Retrieve a specific star system by its ID.',
            '/api/about': 'GET - Information about this API.'
        }
    });
});

// About API endpoint
app.get('/api/about', (req, res) => {
    res.status(200).json({
        name: "Space Game API",
        version: "1.0.0",
        description: "A backend service for a procedural galaxy exploration game, built with Node.js and Express.",
        author: "Your Name",
        database: "MongoDB" // Assuming you're moving towards MongoDB
    });
});

// --- API endpoint for generating and saving a new system ---
// This block was commented out *inside* the /api/about endpoint's callback.
// It needs to be outside, as a separate app.post definition.
/*
app.post('/api/generate_system', async (req, res) => {
    try {
        const { starId, starName, ...otherStarData } = req.body;

        // Synthesize the full system based on the star data from the request body
        // You'll need to import synthesizeStarSystem here
        // const fullSystem = synthesizeStarSystem({ starId, starName, ...otherStarData });

        // if (!fullSystem) {
        //     return res.status(400).json({ error: "Failed to synthesize star system" });
        // }

        // Save the system to the database (which is also part of this API service)
        // You'll need to import saveThingsToDatabase here
        // await saveThingsToDatabase("postStarSystem", fullSystem);

        res.status(201).json({ message: "System generated and saved successfully", data: fullSystem });

    } catch (error) {
        console.error('Error in /api/generate_system:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
*/

// --- Another endpoint to retrieve a system by its ID ---
// This block was also commented out *inside* the /api/about endpoint's callback.
// It needs to be outside, as a separate app.get definition.
/*
app.get('/api/system/:starId', async (req, res) => {
    try {
        const { starId } = req.params;
        // You'll need to import getThingsFromDatabase here
        // const system = await getThingsFromDatabase("getStarSystem", starId);

        // if (!system) {
        //     return res.status(404).json({ error: "System not found" });
        // }

        res.status(200).json(system);

    } catch (error) {
        console.error('Error in /api/system:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
*/

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));