import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['Student', 'Admin'],
        default: 'Student',
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

export default mongoose.model("user", userSchema);