const bcrypt = require('bcrypt');
const { db } = require('../firebase');
const { collection, deleteDoc, doc, onSnapshot, addDoc } = require('firebase/firestore');
const User = require('../models/User');

const usersRef = collection(db, 'activeUsers');

const kickUser = async (req, res) => {
  const { userId } = req.body;
  try {
    await deleteDoc(doc(db, 'activeUsers', userId));
    res.status(200).send('User kicked');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getUsers = (req, res) => {
  onSnapshot(usersRef, (snapshot) => {
    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(users);
  });
};

const addUserMessage = async (req, res) => {
  const { userId, message } = req.body;
  try {
    const user = await User.findOne({ userId }); // Assuming you have a User model
    if (!user) {
      const newUser = new User({ userId, messages: [message] });
      await newUser.save();
    } else {
      user.messages.push(message);
      await user.save();
    }
    res.status(200).send('Message added');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const signup = async (req, res) => {
  try {
      const { fullname, email, username, password } = req.body;

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance using the User model
      const newUser = new User({
          fullname,
          email,
          username,
          password, // Store original password
          hashedPassword // Store hashed password
      });

      // Save the user data to MongoDB
      await newUser.save();

      // Respond with a success message or user data
      res.status(201).json(newUser);
  } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

const checkUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
      const { username, password } = req.body;

      // Find the user by username
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ message: 'User not found. Maybe you want to signup?' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Incorrect password' });
      }

      // Password is valid, allow login
      res.status(200).json({ message: 'Login successful' });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { kickUser, getUsers, addUserMessage, signup, checkUsername, login };
