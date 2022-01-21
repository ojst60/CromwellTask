require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./routes/route");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    method: "GET, POST",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
  })
);

const MONGODB_URI = process.env.MONGODB_URI;

// route
server.use("/", route);

// Database connection
mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("mongodb is connected");
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening on port ${process.env.SERVER_PORT}`);
});
