import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RemoteControl from './components/RemoteControl';
import HomeScreen from './screens/HomeScreen';
import ContactsScreen from './screens/ContactsScreen';
import SendMessageScreen from './screens/SendMessageScreen';
import PredefinedMessagesScreen from './screens/PredefinedMessagesScreen';
import SettingsScreen from './screens/SettingsScreen';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-2/3 p-4">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/contacts" element={<ContactsScreen />} />
            <Route path="/send-message" element={<SendMessageScreen />} />
            <Route path="/predefined-messages" element={<PredefinedMessagesScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </div>
        <div className="w-1/3 p-4 flex justify-end">
          <RemoteControl />
        </div>
      </div>
    </Router>
  );
}

export default App;