import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = async (req, res) => {
    //Take user input
    //Check if user have entered the value
    //Check if user already registered
    //Hash the user password and store the hashed password
    try {
        const { email, fullName, password } = req.body;

        if (!email || !fullName || !password) {
            res.status(400).json(new ApiResponse(400, "All fields are required", false));
        }
    } catch (error) {
        console.log(error);
    }
}

const loginUser = async (req, res) => {
    console.log("Login user");
}


export default registerUser;