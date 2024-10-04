import dotenv from 'dotenv';
import app from "./app.js";
import { connectDB } from './config/db.config.js';
dotenv.config();

const port = process.env.PORT || 5000;

//db connection
connectDB();

app.listen(port, () => {
    console.log("the server is listening at port: " , port);
})

app.get("/" , (req, res) => {
    res.send("server is running")
} )