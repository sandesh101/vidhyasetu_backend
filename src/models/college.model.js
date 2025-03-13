import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        location: {
            type: String
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, // Admin who added the college
        verified: {
            type: Boolean,
            default: false
        }, // Manual verification
    },
    { timestamps: true }
);

export default mongoose.model("College", collegeSchema);
