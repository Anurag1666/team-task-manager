const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};