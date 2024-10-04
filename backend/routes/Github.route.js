import express from "express";
import { GithubUserController } from "../controllers/index.js";
import { restrictToLoggedInUser } from "../middlewares/auth.js";


const router = express.Router();

router
  .route("/")
  .get(restrictToLoggedInUser, GithubUserController.getAllGithubUsers)


export default router;