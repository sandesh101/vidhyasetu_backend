import { ApiResponse } from "../utils/ApiResponse.js";
import College from "../models/college.model.js";
import Semester from "../models/semester.model.js";

//Creating semester
export const createSemester = async (req, res) => {
    const { name, collegeId } = req.body;
    try {
        //Checks for empty fields
        if (!name || !collegeId) {
            res.status(400).json(new ApiResponse(400, '', 'All fields are required'));
        }


        //Check for college (if exists or not)
        const isCollegeExists = await College.findById(collegeId);
        if (!isCollegeExists) {
            res.status(404).json(new ApiResponse(404, '', 'No such college found'));
        }

        const createdBy = req.user ? req.user.id : null;

        const newSemester = await Semester.create({
            name,
            collegeId,
            createdBy
        });

        if (!newSemester) {
            res.status(400).json(new ApiResponse(400, '', 'Error while creating semester'));
        }

        return res.status(200).json(new ApiResponse(200, newSemester, 'Semester created successfully'));

    } catch (error) {
        console.log(error);
        res.status(500).json(new ApiResponse(500, '', 'Something went wrong'));
    }
}

//Get semester
export const getSemester = async (req, res) => {
    const { collegeId } = req.params;

    try {
        // Find semesters where collegeId matches the provided collegeId
        const semesters = await Semester.find({ collegeId });

        // If no semesters are found
        if (!semesters || semesters.length === 0) {
            return res.status(404).json(new ApiResponse(404, '', 'Unable to find semesters for the specified college'));
        }

        // Return the found semesters
        return res.status(200).json(new ApiResponse(200, semesters, 'Success'));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(500, '', 'Error fetching semesters'));
    }
}

//Update semester
export const updateSemester = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
        //Check if field empty
        if (!name) {
            return res.status(400).json(new ApiResponse(400, "", 'Semester name is required'));
        }

        //Check if semester available
        const semester = await Semester.findById(id);
        if (!semester) {
            return res.status(404).json(new ApiResponse(404, "", 'No semester foudn'));
        }

        if (name) {
            semester.name = name;
        }
        await semester.save();
        return res.status(200).json(new ApiResponse(200, semester, 'Update Successfull'));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, "", 'Error updating'));
    }
}

//Delete semester
export const deleteSemester = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        //Find the provided semester
        const semester = await Semester.findById(id);

        if (!semester) {
            return res.status(404).json(new ApiResponse(404, '', 'Unable to find semester'));
        }

        await semester.deleteOne();
        return res.status(200).json(new ApiResponse(200, "", 'Deleting semester successfull'));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, "", 'Error deleting'));
    }
}