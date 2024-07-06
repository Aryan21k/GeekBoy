// backend/routes/roomRoutes.js

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const RoomId = require('../models/RoomId'); // Import the RoomId model
const User = require('../models/User'); // Import the User model
const router = express.Router();

router.get('/generate-room-id', async (req, res) => {
    try {
        const roomId = uuidv4();

        // Save the generated room ID to MongoDB using Mongoose model
        const newRoomId = new RoomId({ roomId });
        await newRoomId.save();

        res.json({ roomId });
    } catch (error) {
        console.error('Error generating room ID:', error);
        res.status(500).json({ error: 'Failed to generate room ID' });
    }
});

router.post('/check-room-id', async (req, res) => {
    const { roomId, username } = req.body;
    try {
        const room = await RoomId.findOne({ roomId });
        const user = await User.findOne({ username });
        if (room && user) {
            res.status(200).json({ exists: true });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking room ID:', error);
        res.status(500).json({ error: 'Failed to check room ID' });
    }
});

module.exports = router;
