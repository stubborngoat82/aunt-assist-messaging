import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const ContactsScreen = () => {
  const { contacts, addContact, isLoading, error } = useAppContext();
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    await addContact(newContact);
    // Reset form if successful
    setNewContact({ name: '', phone: '', email: '' });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Contacts</h1>
      
      {/* Error Handling */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      {/* Contact List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Contact List</h2>
        {isLoading ? (
          <p>Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p>No contacts found.</p>
        ) : (
          <ul className="space-y-2">
            {contacts.map(contact => (
              <li 
                key={contact.id} 
                className="p-2 border rounded hover:bg-gray-100 transition-colors"
              >
                <div className="font-semibold">{contact.name}</div>
                <div className="text-gray-600">{contact.phone}</div>
                {contact.email && <div className="text-gray-500">{contact.email}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Contact Form */}
      <form onSubmit={handleAddContact} className="space-y-4">
        <h2 className="text-xl font-semibold">Add New Contact</h2>
        <div>
          <label htmlFor="name" className="block mb-2">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2">Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={newContact.phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={newContact.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className={`
            bg-blue-500 text-white p-2 rounded 
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}
          `}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactsScreen;