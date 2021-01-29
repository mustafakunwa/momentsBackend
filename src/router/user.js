const express = require("express");
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs')

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(201).send();
    } catch (err) {
        res.status(500).send(err);
    };
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            res.status(400).send("Email doesn't exist");

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch)
            res.status(400).send("Incorrect password");
        const token = await user.generateToken();
        return res.status(200).send({ user, token });
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token != req.token)
        await req.user.save();
        res.send();
    } catch (err) {

        res.status(500).send(err)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router;