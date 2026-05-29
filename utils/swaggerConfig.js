import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0', // Standard OpenAPI version
        info: {
            title: 'Space Game API 🌌',
            version: '1.0.0',
            description: 'An infinite, procedurally generated sci-fi universe in a box. Generates stars, planets, civilizations, and ecology.',
            contact: {
                name: 'API Support',
                url: 'https://github.com/mtickle/space-game-api',
            },
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Local Development Server',
            },
            {
                // Render automatically populates this environment variable!
                // You can replace the fallback string with your actual Render URL if you prefer.
                url: process.env.RENDER_EXTERNAL_URL || 'https://space-game-api.onrender.com',
                description: 'Production Server (Render)',
            }
        ],
    },
    // Tells Swagger where to find your comments. 
    // It will scan server.js and any .js file in the routes folder.
    apis: ['./routes/*.js', './server.js'], components: {
        securitySchemes: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'x-api-key', // Make sure this matches what your authMiddleware expects!
                description: 'Enter your API key to access protected endpoints.',
            },
        },
    },
};

export const swaggerSpec = swaggerJsdoc(options);