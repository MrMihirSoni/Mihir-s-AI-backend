const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
