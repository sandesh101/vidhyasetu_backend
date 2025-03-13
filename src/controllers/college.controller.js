import { ApiResponse } from "../utils/ApiResponse.js";
import College from '../models/college.model.js';


//Creating college
export const createCollege = async (req, res) => {
    const { name, location } = req.body;
    try {

        //Check for empty fields
        if (!name || !location) {
            return res.status(400).json(new ApiResponse(400, '', "All fields are required"));
        }

        //Check if college already exists
        const isCollegeExists = await College.findOne({ name });
        if (isCollegeExists) {
            return res.status(400).json(new ApiResponse(400, '', "College with same name already exists"));
        }
        const createdBy = req.user ? req.user.id : null;

        //Creating college
        const createdCollege = await College.create({ name, location, createdBy });

        if (!createdCollege) {
            return res.status(500).json(new ApiResponse(500, '', 'Something went wrong while creating college'));
        }

        return res.status(200).json(new ApiResponse(200, createCollege, "Creating college successfull"));
    } catch (error) {
        console.log(error);
    }
}

//Get all college
export const getAllColleges = async (req, res) => {
    try {
        const fetchedColleges = await College.find();
        if (!fetchedColleges) {
            return res.status(500).json(new ApiResponse(500, '', 'Error fetching colleges'));
        }
        return res.status(200).json(new ApiResponse(500, fetchedColleges, 'College fetched successfully'));
    } catch (error) {
        return res.status(400).json(new ApiResponse(400, '', 'Error fetching college'));
    }
}


//Updating college
export const updateColelge = async (req, res) => {
    const { name, location, verified } = req.body;
    const { id } = req.params;

    try {
        //Check for empty fields
        if (!name || !location) {
            res.status(400).json(new ApiResponse(400, '', 'All fields are required'));
        }

        //Check if college exists
        const college = await College.findById(id);
        if (!college) {
            res.status(404).json(new ApiResponse(404, '', 'Unable to find college'));
        }
        if (name) {
            college.name = name;
        }
        if (location) {
            college.location = location;
        }
        if (verified !== undefined) {
            college.verified = verified;
        }

        const updatedCollege = await college.save();
        return res.status(200).json(new ApiResponse(200, updatedCollege, "College updated successfully"));
    } catch (error) {
        // console.log(error);
        return res.status(500).json(new ApiResponse(500, '', "Error updating college"));
    }

}


//Deleting college
export const deleteCollege = async (req, res) => {
    const { id } = req.params;

    try {
        const college = await College.findById(id);
        if (!college) {
            res.status(404).json(new ApiResponse(404, '', 'Unable to find college'));
        }
        await college.deleteOne();

        res.status(200).json(new ApiResponse(200, "", "College deleted successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, '', 'Error deleting college'));
    }
}