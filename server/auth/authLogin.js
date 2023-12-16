const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Judge = require("../models/judges")
const Registrar = require("../models/registrars")
const ClientData = require("../models/clientData")
router.post('/judge', async (req, res) => {
    const username = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    try {
        
        const user = await Judge.findOne({ username: username });
        if(!user) return res.json({ message: "Username or password is wrong" });
        if(user.password !== password) return res.json({ message: "Username or password is wrong" });
        else{
            const accessToken = jwt.sign({ username: username, role: role}, process.env.SECRET_KEY);
            res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: true });
            return res.json({ status: "Success", role: role});
        }

    }catch(err) {
        console.log(err.message);
    }
    
});

router.post('/registrar', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    try {
        
        const user = await Registrar.findOne({ username: username });
        if(!user) return res.json({ message: "Username or password is wrong" });
        if(user.password !== password) return res.json({ message: "Username or password is wrong" });
        else{
            const accessToken = jwt.sign({ username: username, role: role}, process.env.SECRET_KEY);
            res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: true });
            return res.json({ status: "Success",role: role});
        }

    }catch(err) {
        console.log(err.message);
    }
    
});

router.post('/client', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    try {
        
        const user = await ClientData.findOne({ email: email });
        if(!user) return res.json({ message: "Username or password is required" });
        if(user.password !== password) return res.json({ message: "Username or password is wrong" });
        else{
            const accessToken = jwt.sign({ email: email, role: role}, process.env.SECRET_KEY);
            res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: true});
            return res.json({ status: "Success",role: role, email: email});
        }

    }catch(err) {
        console.log(err.message);
    }
    
});




module.exports = router;