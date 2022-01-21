require("dotenv").config();
const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const checkJwt = require("../middleware/checkJwt");

// Schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
});

const user = mongoose.model("user", userSchema);

// Routes definition

const router = Router();

// server route test
router.get("/", (req, res) => {
  res.send("The server is working");
});

// user registration

router.post("/user/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const existingEmail = await user.findOne({ email });

  // check for email duplicate
  if (existingEmail !== null) {
    return res.json({ status: 409, msg: "Email already exists" });
  }

  // passowrd hash
  const passwordHash = await bcrypt.hash(password, 12);

  // saving new user
  let newUser = new user({
    firstname,
    lastname,
    email,
    password: passwordHash,
  });

  try {
    const saveUser = await newUser.save();

    const token = jwt.sign(
      {
        id: saveUser._id,
        email: saveUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    res.cookie("session_token", token, {
      maxAge: 2592000000,
      httpOnly: false,
      secure: false,
      sameSite: false,
    });
    return res.json({
      token: token,
      msg: {
        id: saveUser._id,
        email: saveUser.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Submission has failed." });
  }
});

// Authenticating user
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  // user info validation

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    const userInfo = await user.findOne({ email: email });
    if (userInfo === null) {
      return res.status(409).json({ msg: "Email does not exist" });
    }

    // password validation
    const match = await bcrypt.compare(password, userInfo.password);

    if (!match) {
      return res.status(400).json({ msg: "Authentication has failed" });
    }
    const token = await jwt.sign(
      {
        id: userInfo._id,
        email: userInfo.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    return res
      .cookie("session_token", token, {
        maxAge: 2592000000,
        httpOnly: false,
        secure: false,
        sameSite: false,
      })
      .json({
        token: token,
        msg: {
          id: userInfo._id,
          email: userInfo.email,
        },
      });
  } catch (err) {
    console.error(err);
  }
});

//Get the current user's details
router.get("/user", checkJwt, async (req, res) => {
  const { email } = res.locals.jwtPayload;

  try {
    const info = await user.findOne({ email });
    return res.status(200).json({ firstname: info.firstname, lastname: info.lastname, email: info.email });
  } catch (err) {
    throw err;
  }
});

module.exports = router;
