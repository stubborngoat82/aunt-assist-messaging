import React from 'react';

const HomeScreen = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Aunt Assist Messaging</h1>
      <div className="space-y-4">
        <p className="text-lg text-gray-700">
          Welcome to Aunt Assist Messaging, a communication tool designed 
          for individuals with limited mobility.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
            <ul className="list-disc pl-5">
              <li>Send a Message</li>
              <li>View Contacts</li>
              <li>Use Predefined Messages</li>
            </ul>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Navigation</h2>
            <p>Use the remote control to navigate through different screens and features.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;