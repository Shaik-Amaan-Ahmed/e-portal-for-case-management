const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Registrar = require("../models/registrars")
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
          next();
        }
      });
    }
  };

  router.get("/", verifyUser, async (req, res) => {
    const email = req.email;
    const Name = await Registrar.findOne({ email: email }).select("name");
    res.json({ message: "success", role: req.role , email: req.email,name:Name });
  });

module.exports = router;