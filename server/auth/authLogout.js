const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie("accessToken");
    return res.status(200).json({ message: "Logged out" });
});

module.exports = router;