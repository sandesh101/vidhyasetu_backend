import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        collegeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    { timestamps: true }
);

export default mongoose.model("Semester", semesterSchema);
