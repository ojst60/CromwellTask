require("dotenv").config();
const jwt = require("jsonwebtoken");

async function checkJwt(req, res, next) {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).json({ msg: "Authorization failed" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.jwtPayload = decodedToken;
  } catch (error) {
    res.status(401).json({ msg: "Authorization failed" });
    return;
  }
  next();
}

module.exports = checkJwt;
