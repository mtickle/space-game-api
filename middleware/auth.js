// middleware/auth.js
import { usersModel } from "../models/users.js"; // Adjust path as needed

const checkKey = async (req, res, next) => {
    let inApiKey = req.headers["x-api-key"]; // Grab the key from x-api-key

    //--- Is there an API Key being passed in?
    if (!inApiKey) {
        return res
            .status(403)
            .json({ error: { code: 403, message: "No API Key Specified." } }); // Use .json() for consistency
    }

    try {
        // Use Mongoose's .findOne() and .exec() for Promises
        const userCount = await usersModel.countDocuments({ apiKey: inApiKey }).exec();

        if (userCount >= 1) {
            // Found a user record. Move along.
            next();
        } else {
            // No records found. Deny.
            return res.status(403).json({ error: { code: 403, message: "Invalid API Key." } });
        }
    } catch (err) {
        // Something broke during the database query
        console.error("Error verifying API Key:", err);
        return res.status(500).json({ // Use 500 for server errors
            error: {
                code: 500,
                message: "Could not verify API Key due to a server error.",
            },
        });
    }
};

export default { checkKey };