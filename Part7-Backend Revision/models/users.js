const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  history: [
    {
      role: {
        type: String,
        enum: ["user", "model"],
        required: true,
      },
      parts: [
        {
          text: String,
        },
      ],
    },
  ],
});
const Box = mongoose.model("Box", userSchema);
module.exports = Box;
