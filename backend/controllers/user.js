import userModel from "../models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = await createToken(user._id);

    return res.json({ success: true, token });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const exists = await userModel.findOne({
      email,
    });

    if (exists) {
      return res.json({ success: false, message: "user already exist" });
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();

    console.log("this is the user: ", user);

    const token = await createToken(user._id);

    return res.json({ success: true, token, message: "Register api working" });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email != process.env.ADMIN_EMAIL ||
      password != process.env.ADMIN_PASSWORD
    ) {
      return res.json({ success: false, message: "invalid credentials" });
    }

    const token = jwt.sign(email + password, process.env.JWT_SECRET);

    return res.json({ success: true, token });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
