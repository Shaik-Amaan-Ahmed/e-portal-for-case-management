const express = require('express');
require('dotenv').config()
const Judge = require('../models/judges');
const Registrar = require('../models/registrars');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_KEY

router.post('/judge', [
    body('username', 'Enter a valid username').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //If there are errors return bad request and errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({success, errors: result.array() });
    }
    // Check whether user with this email exists
    try {
        let user = await Judge.findOne({ username: req.body.username })
        if (user) {
            return res.status(400).json({ success, error: 'Sorry a user with this username already exists' })
        }
        // const salt = await bcrypt.genSalt(3);
        // const secPass = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await Judge.create({
            username: req.body.username,
            password: req.body.password, //secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success= true;
        res.json({ success,authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})
router.post('/registrar', [
    body('username', 'Enter a valid username').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    //If there are errors return bad request and errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({success, errors: result.array() });
    }
    // Check whether user with this email exists
    try {
        let user = await Registrar.findOne({ username: req.body.username })
        if (user) {
            return res.status(400).json({ success, error: 'Sorry a user with this username already exists' })
        }
        // const salt = await bcrypt.genSalt(3);
        // const secPass = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await Registrar.create({
            username: req.body.username,
            password: req.body.password, //secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success= true;
        res.json({ success,authToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;