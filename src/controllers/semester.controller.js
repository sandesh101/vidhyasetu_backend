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

}

//Update semester
export const updateSemester = async (req, res) => {

}

//Delete semester
export const deleteSemester = async (req, res) => {

}