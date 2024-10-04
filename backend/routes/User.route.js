import express from "express";
import { UserController } from "../controllers/index.js";
import { validation } from "../middlewares/validate.js";
import { UserValidation } from "../validation/index.js";
const router = express.Router();

router
  .route("/register")
  .post(UserValidation.userRegister, validation, UserController.userRegister);
  
router
  .route("/verify-email")
  .get(UserController.verifyEmailAndRegisterUser);

router
  .route("/login")
  .post(UserValidation.userLogin, validation, UserController.userLogin);

  router
  .route("/profile/:id")
  .get( UserController.getProfile);

export default router;
