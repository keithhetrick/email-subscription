const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: [5, "Email must be at least 5 characters"],
      validate: {
        validator: (email) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email),
        message: (props) => `${props.value} is not a valid email!`,
      },
      unique: [true, "Email already exists"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Email", EmailSchema);
