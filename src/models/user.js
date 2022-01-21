const mongoose = require("mongoose");

const userSchema = new Schema({
  fistName: { type: "string", required: true },
  lastName: { type: "string", required: true },
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
});

const user = mongoose.model("user", userSchema);
