import express from "express";
import cors from "cors";
import morgan from "morgan";
import Routes from "./routes/index.js";
import httpStatus from "http-status";

import cookieParser from "cookie-parser";

const app = express();

// middle-wares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//routes
app.use("/api/v1", Routes);

//404 not found
app.use((req, res) => {
  res.send({
    code: httpStatus.NOT_FOUND,
    message: "not found",
    success: false,
  });
});

export default app;
