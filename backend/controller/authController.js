import { errorHandler } from "../middleware/errorHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      errorHandler("User not found", 404);
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      errorHandler("Invalid credentials", 401);
    }
    const { password: userPassword, ...rest } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ rest, token });
  } catch (error) {
    next(error);
  }
};
