require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const BlackListModel = require("../models/blackList.model");

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (await UserModel.findOne({ email }))
      throw new Error("email already exist!");
    if (password.length < 6)
      throw new Error("password must contain atleast 6 charactors!");
    bcrypt.hash(password, 6, async (err, hash) => {
      if (err)
        throw new Error("Something went wrong while hashing the password!");
      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password: hash,
      });
      await newUser.save();
    });
    res
      .status(201)
      .json({ message: `${firstName} has been registered successfully!` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("You need to register first!");
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw new Error("Wrong password!");
      const accessToken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: "7d" }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res
        .status(200)
        .json({ message: "Login Sucessfull", accessToken, refreshToken });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const logout = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  try {
    if (await BlackListModel.findOne({ accessToken }))
      throw new Error("You are already Logged out!");
    else {
      const blackListUser = new BlackListModel({ accessToken });
      await blackListUser.save();
      res.status(200).json({ msg: "User has been logged out!" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login, logout };
