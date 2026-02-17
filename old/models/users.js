import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
    username: {
        required: true,
        type: String,
        unique: true, // Ensure usernames are unique
    },
    apiKey: {
        required: true,
        type: String,
        unique: true, // Ensure API keys are unique
    },
    createdAt: { // Optional: Track when user was created
        type: Date,
        default: Date.now,
    },
});

export const usersModel = mongoose.model("users", usersSchema);