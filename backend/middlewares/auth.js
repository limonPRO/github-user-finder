import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

export const restrictToLoggedInUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized request" });
    token = token.split(" ")[1]; // Remove Bearer from string

    if (token === "null" || !token)
      return res.status(401).json({ message: "Unauthorized request" });

    let verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifiedUser)
      return res.status(401).json({ message: "Unauthorized request" });

    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
