// backend/controllers/chatController.js
const { db } = require('../firebase');
const { collection, addDoc, onSnapshot } = require('firebase/firestore');

const messagesRef = collection(db, 'messages');

const sendMessage = async (req, res) => {
  const { userId, message } = req.body;
  try {
    await addDoc(messagesRef, {
      userId,
      message,
      timestamp: new Date()
    });
    res.status(200).send('Message sent');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getMessages = (req, res) => {
  onSnapshot(messagesRef, (snapshot) => {
    const messages = [];
    snapshot.forEach(doc => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(messages);
  });
};

module.exports = { sendMessage, getMessages };
