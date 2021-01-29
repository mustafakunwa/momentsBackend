const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Moment = require('../models/moment');

router.post('/moments', auth, async (req, res) => {
    const moment = new Moment({
        ...req.body,
        owner: req.user._id
    });
    try {
        await moment.save();
        res.status(201).send(moment)
    }
    catch (err) {
        res.status(400).send(err);
    }
})

router.get('/moments', auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'moments',
        }).execPopulate();
        res.status(200).send(req.user.moments);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

router.get('/moments/:id', auth, async (req, res) => {
    try {
        const moment = await Moment.findOne({ _id: req.params.id, owner: req.user._id });
        if (!moment)
            return res.status(404).send();
        res.status(200).send(moment);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})


router.patch("/moments/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    try {
        const moment = await Moment.findOne({ _id: req.params.id, owner: req.user._id });
        if (!moment)
            return res.status(404).send();
        updates.forEach(update => moment[update] = req.body[update]);
        await moment.save();
        res.status(200).send(moment);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.delete("/moments/:id", auth, async (req, res) => {
    try {
        const moment = await Moment.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!moment)
            return res.status(404).send();
        res.status(200).send(moment);
    }
    catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;