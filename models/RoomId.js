// backend/models/RoomId.js

const mongoose = require('mongoose');

const roomIdSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('RoomId', roomIdSchema);
