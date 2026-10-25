const { register, login, logout } = require("../controllers/user.controllers");

const userRouter = require("express").Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

module.exports = userRouter;
