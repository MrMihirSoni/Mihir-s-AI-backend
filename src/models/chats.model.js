const mongoose = require("mongoose");

const userChatSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    chat: { type: Array, required: true},
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("chat", userChatSchema);

module.exports = ChatModel;
