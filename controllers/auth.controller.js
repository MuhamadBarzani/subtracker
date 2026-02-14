import mongoose from "mongoose";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { jwt_expires_in, jwt_secret } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new Error("user already exists");
      error.statusCode = 401;
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create(
      {
        name,
        email,
        password: hashedPassword,
      },
      { session },
    );
    await session.commitTransaction();
    const token = jwt.sign({ id: newUser._id }, jwt_secret, {
      expiresIn: jwt_expires_in,
    });
    res.status(201).json({
      token,
      user: newUser,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const error = new Error("cant login, user doesnt exist");
      error.statusCode = 401;
      throw error;
    }
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!correctPassword) {
      const error = new Error("cant login, wrong password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ id: existingUser._id }, jwt_secret, {
      expiresIn: jwt_expires_in,
    });
    res.status(200).json({
      token,
      user: existingUser,
    });
  } catch (error) {
    next(error);
  }
};
export const signOut = async (req, res, next) => {};
