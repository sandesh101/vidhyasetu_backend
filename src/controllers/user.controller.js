import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklisttoken.model.js";

//Register user controller
export const registerUser = async (req, res) => {
  const { email, fullName, password, role, profilePicture } = req.body;
  try {
    //Check for empty fields
    if (!email || !fullName || !password) {
      res
        .status(400)
        .json(new ApiResponse(400, "All fields are required", false));
    }

    //Check if user with same email already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      res
        .status(409)
        .json(
          new ApiResponse(409, {}, "User with same email already exists", false)
        );
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creating user with hashed password
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      profilePicture,
    });

    await user.save();

    //Removing password field in response
    const createdUser = await User.findById(user._id).select("-password");

    //Check if user correctly created
    if (!createdUser) {
      res
        .status(500)
        .json(
          new ApiResponse(
            500,
            {},
            "something went wrong while registering user",
            false
          )
        );
    }

    const accessToken = await jwt.sign(
      {
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          mobile: user.mobile,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );

    //Check if user created or not
    if (!user) {
      res.status(500).json(new ApiResponse(500, "Something went wrong", false));
    }

    //Returning the registered user
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { token: accessToken, user: createdUser },
          "Signup successful"
        )
      );
  } catch (error) {
    console.log(error);
  }
};

//Login user controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(409)
        .json(
          new ApiResponse(
            409,
            {},
            "User with provided email does not exists",
            false
          )
        );
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      res
        .status(400)
        .json(new ApiResponse(409, {}, "Invalid email or password", false));
    } else {
      //Sign user with jwt
      const userWOPassword = await User.findById(user._id).select("-password");
      const accessToken = await jwt.sign(
        {
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            mobile: user.mobile,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { token: accessToken, user: userWOPassword },
            "Login successful"
          )
        );
    }
  } catch (err) {
    console.error(err);
    throw res
      .status(500)
      .json(new ApiResponse(200, {}, "Something went wrong"));
  }
};

//Logout user controller
export const logoutUser = async (req, res) => {
  try {
    const token = req.token;
    await BlacklistToken.create({ token });

    res.status(200).json(new ApiResponse(200, "", "Logged out successfuly"));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json(new ApiResponse(500, "Something went wrong while logout"));
  }
};

//Get current user

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
