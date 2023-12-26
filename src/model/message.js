const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      text: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Messages", messageSchema);
