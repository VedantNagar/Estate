import express from "express";
import connectDB from "./database/connectDB.js";
import { configDotenv } from "dotenv";
configDotenv();

const app = express();

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
