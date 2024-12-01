import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronUpIcon, 
  ChevronDownIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon 
} from '@radix-ui/react-icons';

const RemoteControl = () => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Contacts', path: '/contacts' },
    { label: 'Send Message', path: '/send-message' },
    { label: 'Predefined Messages', path: '/predefined-messages' },
    { label: 'Settings', path: '/settings' }
  ];

  const handleNavigation = (direction) => {
    switch(direction) {
      case 'up':
        setSelectedMenuItem(prev => 
          prev > 0 ? prev - 1 : menuItems.length - 1
        );
        break;
      case 'down':
        setSelectedMenuItem(prev => 
          prev < menuItems.length - 1 ? prev + 1 : 0
        );
        break;
      default:
        break;
    }
  };

  const handleSelect = () => {
    navigate(menuItems[selectedMenuItem].path);
  };

  return (
    <div className="bg-remote-bg text-white p-4 rounded-lg w-64 space-y-4">
      <div className="text-center font-bold mb-4">Aunt Assist Remote</div>
      
      {/* Directional Pad */}
      <div className="grid grid-cols-3 gap-2 justify-center items-center">
        <div></div>
        <button 
          onClick={() => handleNavigation('up')}
          className="bg-remote-button p-2 rounded flex justify-center items-center"
        >
          <ChevronUpIcon />
        </button>
        <div></div>
        
        <button 
          onClick={() => handleNavigation('left')}
          className="bg-remote-button p-2 rounded flex justify-center items-center"
        >
          <ChevronLeftIcon />
        </button>
        
        <button 
          onClick={handleSelect}
          className="bg-red-500 p-4 rounded-full"
        >
          SELECT
        </button>
        
        <button 
          onClick={() => handleNavigation('right')}
          className="bg-remote-button p-2 rounded flex justify-center items-center"
        >
          <ChevronRightIcon />
        </button>
        
        <div></div>
        <button 
          onClick={() => handleNavigation('down')}
          className="bg-remote-button p-2 rounded flex justify-center items-center"
        >
          <ChevronDownIcon />
        </button>
        <div></div>
      </div>
      
      {/* Additional Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button className="bg-green-500 p-2 rounded">MSG</button>
        <button className="bg-blue-500 p-2 rounded">MENU</button>
        <button className="bg-red-500 p-2 rounded">BACK</button>
      </div>
    </div>
  );
};

export default RemoteControl;