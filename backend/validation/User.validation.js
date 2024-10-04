import { body, param } from "express-validator";

export const userRegister = [
  body("firstName")
    .isString()
    .withMessage("this field must be a string")
    .notEmpty()
    .withMessage("this field is required"),
  body("lastName")
    .isString()
    .withMessage("this field must be a string")
    .notEmpty()
    .withMessage("this field is required"),
  body("email")
    .isEmail()
    .withMessage("must be an email")
    .notEmpty()
    .withMessage("this field can not be empty"),
  body("password")
    .isString()
    .withMessage("this field must be a string")
    .notEmpty()
    .withMessage("this field is required"),
];
export const userLogin = [
  body("email")
    .isEmail()
    .withMessage("must be an email")
    .notEmpty()
    .withMessage("this field can not be empty"),
  body("password")
    .isString()
    .withMessage("this field must be a string")
    .notEmpty()
    .withMessage("this field is required"),
];
