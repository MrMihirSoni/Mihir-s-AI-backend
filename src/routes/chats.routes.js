const {
  getAllChats,
  newChat,
  updateUserChat,
} = require("../controllers/chats.controllers");

const chatsRouter = require("express").Router();

chatsRouter.get("/", getAllChats);
chatsRouter.post("/new", newChat);
chatsRouter.patch("/update", updateUserChat);

module.exports = chatsRouter;
