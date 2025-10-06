const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    phone: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      unique: true,
    },
    address: { type: String, trim: true, maxlength: 200 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
