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
          req.email = data.email;
          next();
        }
      });
    }
  };

  router.get("/", verifyUser, async (req, res) => {
    const email = req.email;
    console.log("back registrar "+email);
    try {
      const registrar = await Registrar.findOne({ email: email }).select("name");
      if (!registrar) {
        res.json({ message: "Registrar not found" });
      } else {
        const name = registrar.name;
        console.log("back registrar " + name);
        res.json({ message: "success", role: req.role, email: req.email, name: name });
      }
    } catch (error) {
      res.json({ message: "Error occurred" });
    }
  });

module.exports = router;