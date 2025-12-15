import db from "../utils/db.js"; // Assuming a standard pg pool export

const checkKey = async (req, res, next) => {
    // 1. Handle CORS Preflight
    // Browsers send an OPTIONS request before custom headers (like x-api-key)
    // to verify permissions. We must let this pass through or the actual request fails.
    if (req.method === 'OPTIONS') {
        return next();
    }

    const inApiKey = req.headers["x-api-key"]; // Grab the key from x-api-key

    //--- Is there an API Key being passed in?
    if (!inApiKey) {
        console.warn("Auth Middleware: Blocked request - No 'x-api-key' header present.");
        return res
            .status(403)
            .json({ error: { code: 403, message: "No API Key Specified." } });
    }

    try {
        // query the space_game schema
        const query = "SELECT id FROM space_game.users WHERE api_key = $1";
        const values = [inApiKey];

        const { rows } = await db.query(query, values);

        if (rows.length > 0) {
            // Found a user record. Move along.
            next();
        } else {
            // No records found. Deny.
            console.warn(`Auth Middleware: Blocked request - Invalid API Key: ${inApiKey}`);
            return res.status(403).json({ error: { code: 403, message: "Invalid API Key." } });
        }
    } catch (err) {
        // Something broke during the database query
        console.error("Error verifying API Key:", err);
        return res.status(500).json({
            error: {
                code: 500,
                message: "Could not verify API Key due to a server error.",
            },
        });
    }
};

export default { checkKey };