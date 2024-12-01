require('dotenv').config();
const express = require('express');
const firebaseConfig = require('../config/firebase-config');
const AuntAssistMessaging = require('./messaging');

const app = express();
const messaging = new AuntAssistMessaging(firebaseConfig);

// Middleware
app.use(express.json());

// Routes
app.post('/contacts', async (req, res) => {
  const result = await messaging.addContact(req.body);
  res.json(result);
});

app.get('/contacts', async (req, res) => {
  const contacts = await messaging.listContacts();
  res.json(contacts);
});

app.post('/message', async (req, res) => {
  const { remoteControlInput, contactId } = req.body;
  const result = await messaging.sendMessage(remoteControlInput, contactId);
  res.json(result);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});