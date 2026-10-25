const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const collection = require("./config/db");
const userRouter = require("./routes/user.routes");
const chatsRouter = require("./routes/chats.routes");
const auth = require("./middlewares/auth.middleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8080"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/chats", auth, chatsRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Mihir's AI backend" });
});

app.listen(PORT, async () => {
  try {
    await collection;
    console.log(`Server is running on port ${PORT} and db is also connected.`);
  } catch (error) {
    console.log("Something went wrong!");
  }
});
