// src/context/AppContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import apiService from '../services/apiService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch Contacts
  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const fetchedContacts = await apiService.getContacts();
      setContacts(fetchedContacts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contacts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add Contact
  const addContact = async (contactData) => {
    setIsLoading(true);
    try {
      const newContact = await apiService.addContact(contactData);
      await fetchContacts(); // Refresh contacts list
      return newContact;
    } catch (err) {
      setError('Failed to add contact');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Send Message
  const sendMessage = async (remoteControlInput, contactId) => {
    setIsLoading(true);
    try {
      const messageSent = await apiService.sendMessage(remoteControlInput, contactId);
      // Optionally update messages state
      setMessages(prev => [...prev, messageSent]);
      return messageSent;
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <AppContext.Provider value={{
      contacts,
      messages,
      isLoading,
      error,
      fetchContacts,
      addContact,
      sendMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};