import React, { useState, useEffect } from 'react';
import './Notes.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import { FaEdit,FaCopy,FaDownload,FaTrash } from 'react-icons/fa';

const Notes = ({ backendUrl = process.env.REACT_APP_BACKEND }) => {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // e.g., 8/15/2025, 2:30:45 PM
  };
  useEffect(() => {
    fetchNotes();
        // eslint-disable-next-line
  }, []);
  

  const fetchNotes = async () => {
    try {
      const res = await fetch(`${backendUrl}/notes`);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addOrEditNote = async () => {
    if (!noteText.trim()) return;

    if (editingNoteId) {
      // Edit existing note
      const res = await fetch(`${backendUrl}/notes/${editingNoteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: noteText })
      });
      const updated = await res.json();
      setNotes(notes.map(n => (n._id === editingNoteId ? updated : n)));
      setEditingNoteId(null);
    } else {
      // Add new note
      const res = await fetch(`${backendUrl}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: noteText })
      });
      const data = await res.json();
      setNotes([data, ...notes]);
    }

    setNoteText('');
  };

  const deleteNote = async (id) => {
    await fetch(`${backendUrl}/notes/${id}`, { method: 'DELETE' });
    setNotes(notes.filter(n => n._id !== id));
  };

  const startEdit = (note) => {
    setNoteText(note.text);
    setEditingNoteId(note._id);
  };

  const downloadNote = (note) => {
    const element = document.createElement("a");
    const file = new Blob([note.text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `note-${note._id}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const shareNote = (note) => {
    navigator.clipboard.writeText(note.text);
    alert("Note text copied to clipboard!");
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

 
  return (
    <div className="parentNotes">
         <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Sidebar isOpen={isMenuOpen} />
         <div className="notes-container">
      
      <div className="add-note">
        <textarea
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
          placeholder="Write a note..."
        />
        <button onClick={addOrEditNote}>{editingNoteId ? 'Update Note' : 'Add Note'}</button>
      </div>

      <div className="notes-list">
        {notes.map(n => (
          <div key={n._id} className="note-card">
          
             <p className="note-date">{formatDate(n.createdAt)}</p>
             <p className="note-text">{n.text}</p>
    
             <div className="note-actions">
                <FaEdit className="action-icon" onClick={() => startEdit(n)} title="Edit" />
                <FaCopy className="action-icon" onClick={() => shareNote(n)} title="Share" />
                <FaDownload className="action-icon" onClick={() => downloadNote(n)} title="Download" />
                <FaTrash className="action-icon" onClick={() => deleteNote(n._id)} title="Delete" />
                </div>

          </div>
        ))}
      </div>
    </div>
    <Footer/>

    </div>
   
  );
};

export default Notes;
