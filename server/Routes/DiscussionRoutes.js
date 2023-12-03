const router = require('express').Router()
const mongoose = require('mongoose');
const requireLogin = require('../Middleware/requireLogin')
const Discussions = require("../Models/DiscussionModel")


router.post("/:classId/addDiscussions", requireLogin, async (req, res) => {
    const { classId } = req.params;
    const { userName, text } = req.body;

    try {
        let discussion = await Discussions.findOne({ classId });

        if (!discussion) {
        discussion = new Discussions({ classId, messages: [] });
        }

        discussion.messages.push({ userName, text });

        await discussion.save();

        const updatedDiscussion = await Discussions.findOne({ classId });

        res.json({Message: "Success"});
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ Error: 'Internal Server Error' });
    }
})


router.get("/:classId/discussions", requireLogin, async (req, res) => {
    const { classId } = req.params;

    try {
        let discussion = await Discussions.findOne({ classId });

        if (!discussion) {
        discussion = new Discussions({ classId, messages: [] });
        }

        const messages = discussion.messages;

        res.json({ messages });
    } catch (error) {
        console.error('Error getting message:', error);
        res.status(500).json({ Error: 'Internal Server Error' });
    }
})


module.exports = router;