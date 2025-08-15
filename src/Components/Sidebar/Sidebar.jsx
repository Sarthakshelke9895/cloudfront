import React from 'react';
import files from '../../Assests/folder.png';
import phone from '../../Assests/phone.png';
import notes from '../../Assests/notes.png';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const fileclick = () => {
    navigate('/files');
  };
  const noteclick = () => {
    navigate('/notes');
  };

  return (
    <div className={`parentsidebar ${isOpen ? 'open' : ''}`}>
      <h4>Welcome, Sarthak</h4>
      <div className="buttonsidebar">
        <button className="button-sidebar" onClick={fileclick}>
          <img src={files} alt="Files logo" className="sidebarlogos" /> Files
        </button>
        <button className="button-sidebar">
          <img src={phone} alt="Phone logo" className="sidebarlogos" /> Contacts
        </button>
        <button className="button-sidebar" onClick={noteclick}>
          <img src={notes} alt="Notes logo" className="sidebarlogos" /> Notes
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
