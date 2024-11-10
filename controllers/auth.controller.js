import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { username, role, password } = req.body;
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(400).json({ message: "Username taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      role,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created. Proceed to login." });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Username does not exist" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(404).json({ message: "Incorrect password" });

    user.password = undefined;

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_KEY,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    return res.status(200).json({ message: "Login successful.", user, token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
