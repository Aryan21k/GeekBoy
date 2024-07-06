const express = require('express');
const router = express.Router();
const { kickUser, getUsers, addUserMessage, signup, checkUsername, login } = require('../controllers/userController');

router.post('/kick', kickUser);
router.get('/users', getUsers);
router.post('/addMessage', addUserMessage);
router.post('/signup', signup);
router.post('/check-username', checkUsername);
router.post('/login', login);

module.exports = router;
