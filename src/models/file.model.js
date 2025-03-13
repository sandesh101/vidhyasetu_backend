import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        }, //"Final Exam 2023"
        type: {
            type: String,
            enum: ["Question Paper", "Notes"],
            required: true
        },
        fileUrl: {
            type: String,
            required: true
        }, // URL of the uploaded file
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        approved: {
            type: Boolean,
            default: false
        }, // Manual approval required
    },
    { timestamps: true }
);

export default mongoose.model("Content", contentSchema);
