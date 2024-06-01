const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    notes: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        tag: {
          type: Object,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    settings: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
