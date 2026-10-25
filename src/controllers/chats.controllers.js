const ChatModel = require("../models/chats.model");
const UserModel = require("../models/user.model");

const getAllChats = async (req, res) => {
  const { userId } = req.body;
  try {
    if (await UserModel.exists({ _id: userId })) {
      const userChats = await ChatModel.find({ userId });
      if (userChats.length == 0) {
        throw new Error(
          "Chats are not available till now! You need to start a conversation first!"
        );
      }
      res.status(200).json({ chats: userChats });
    } else throw new Error("User not found!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const newChat = async (req, res) => {
  const { userId, chat } = req.body;
  try {
    if (await UserModel.exists({ _id: userId })) {
      const newChat = ChatModel({
        userId,
        chat: [chat],
      });
      newChat.save();
      res.status(200).json({ newChat });
    } else {
      throw new Error("user not found!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserChat = async (req, res) => {
  const { userId, chat } = req.body;
  try {
    const chatId = req.query.id;
    if (await UserModel.exists({ _id: userId })) {
      const updatedUserChat = await ChatModel.findOneAndUpdate(
        { _id: chatId },
        { $push: { chat: chat } },
        { new: true }
      );
      if (!updateUserChat) {
        throw new Error("Chat not found!");
      } else {
        res.status(200).json({ updatedUserChat });
      }
    } else {
      throw new Error("user not found!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllChats, newChat, updateUserChat };
