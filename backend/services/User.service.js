import httpStatus from "http-status";
import { UserModel } from "../models/index.js";
import { getToken } from "../utils/auth.js";
import jwt from "jsonwebtoken";
import { sendMil } from "./mail.service.js";
import { hashPassword } from "../utils/utils.js";


export const sendVerificationEmail = async (body) => {
  try {
    const { firstName, lastName, email, password } = body;

    // Check if user already exists
    const userExists = await UserModel.User.findOne({ email });
    if (userExists) {
      return {
        code: httpStatus.BAD_REQUEST,
        success: false,
        message: "User already exists. Please log in.",
      };
    }
  
    // Generate email verification token
    const verificationToken = jwt.sign({ firstName, lastName, email, password }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Create verification link
    const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;

    // Send email with the verification link
    const emailContent = `<p>Please verify your email by clicking <a href="${verificationLink}">here</a>.</p>`;
    await sendMil(email, "Email Verification", emailContent);

    return {
      code: httpStatus.OK,
      success: true,
      message: "Verification email sent. Please check your inbox.",
    };
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    };
  }
};


export const verifyAndRegisterUser = async (token) => {

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { firstName, lastName, email, password } = decoded;

    // Check if user is already registered
    const userExists = await UserModel.User.findOne({ email });
    if (userExists) {
      return {
        code: httpStatus.BAD_REQUEST,
        success: false,
        message: "User already exists. Please log in.",
      };
    }
    const hashedPassword = await hashPassword(password);
    // Register the user (insert into database)
    const newUser = await UserModel.User.create({
      firstName,
      lastName,
      email,
      password:hashedPassword, 
      email_verified:true
      // Remember to hash the password before storing
    });

    // Remove sensitive information
    delete newUser["password"];


    return {
      code: httpStatus.CREATED,
      success: true,
      message: "Email verified and user successfully registered.",
    };
  } catch (error) {
    return {
      code: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Invalid or expired token.",
    };
  }
};


export const loginUser = async (body) => {
  try {
    const { email, password } = body;
    const user = await UserModel.User.findOne({
      email,
    }).select("firstName lastName email");

   //if user not found 
    if (!user) {
      return {
        code: httpStatus.BAD_REQUEST,
        success: false,
        message: "invalid email or password",
        data: [],
      };
    }

    const token = getToken(user);

    delete user?.password;

    return {
      code: httpStatus.OK,
      success: true,
      token,
      data: user,
    };
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error?.message,
    };
  }
};


export const getProfile = async (id) => {
  try {
    const user = await  UserModel.User.findById(id).select('-password');
    // if user not found 
    if (!user) return {
      code: httpStatus.BAD_REQUEST,
      success: false,
      message: "no user found",
      data: [],
    };
    return {
      code: httpStatus.OK,
      success: true,
      data: user,
    };
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error?.message,
    };
  }
};
