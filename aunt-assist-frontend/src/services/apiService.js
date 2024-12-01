// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const apiService = {
  // Contacts API
  async getContacts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/contacts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  async addContact(contactData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/contacts`, contactData);
      return response.data;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  },

  // Messaging API
  async sendMessage(remoteControlInput, contactId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/message`, {
        remoteControlInput,
        contactId
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
};

export default apiService;