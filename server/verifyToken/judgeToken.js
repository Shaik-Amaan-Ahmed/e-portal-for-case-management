const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Judge = require("../models/judges");

const verifyUser = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.json({ message: "You are not authorised" });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        res.json({ message: "You are not authorised" });
      } else {
        req.role = data.role;
        req.email = data.email;
        next();
      }
    });
  }
};

router.get("/", verifyUser, async (req, res) => {
  const email = req.email;
  const Name = await Judge.findOne({ email: email }).select("name");
  console.log("back judge "+Name);
  res.json({ message: "success", role: req.role, email: req.email, name: Name });
});

module.exports = router;