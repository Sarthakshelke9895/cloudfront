import React, { useState } from 'react';
import './contact.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';

const Contact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [email, setEmail] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const handleSyncContacts = () => {
    if (typeof window.google === "undefined" || !window.google.accounts) {
      alert("Google API not loaded yet. Please refresh the page.");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address.");
      return;
    }

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: "796507353507-4g54cjrbtcrst52qbujvqhqunkfe3tt5.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/contacts.readonly",
      callback: async (tokenResponse) => {
        setLoading(true);
        try {
          const res = await fetch("https://cloud-bflt.onrender.com/sync-contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: tokenResponse.access_token }),
          });

          const data = await res.json();
          setContacts(data.contacts || []);
        } catch (err) {
          console.error(err);
          alert("Error fetching contacts");
        } finally {
          setLoading(false);
        }
      },
    });

    client.requestAccessToken();
  };

  return (
    <div className="contact-page">
      <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <Sidebar isOpen={isMenuOpen} />

      <div className="contact-container">
        <div className="contact-card">
          <h2 className="contact-title">Sync Google Contacts</h2>
          <p className="contact-subtitle">
            Enter your Gmail address below and sync your Google contacts instantly!
          </p>

          <div className="contact-input-section">
            <input
              type="email"
              placeholder="Enter your Gmail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="contact-input"
            />
            <button onClick={handleSyncContacts} className="contact-btn">
              {loading ? "Syncing..." : "Sync Contacts"}
            </button>
          </div>

          {loading && <div className="loader"></div>}

          {contacts.length > 0 && (
            <div className="contacts-section">
              <div className="contacts-header">
                <h3>Synced Contacts ({contacts.length})</h3>
              </div>
              <div className="view-toggle">
  <button
    className={viewMode === "grid" ? "active" : ""}
    onClick={() => setViewMode("grid")}
  >
    Grid View
  </button>
  <button
    className={viewMode === "list" ? "active" : ""}
    onClick={() => setViewMode("list")}
  >
    List View
  </button>
</div>

<div className={`contacts-list ${viewMode}`}>
  {contacts.map((person, idx) => (
    <div key={idx} className="contact-item">
      <strong>{person.names?.[0]?.displayName || "No Name"}</strong>
      <p>{person.phoneNumbers?.[0]?.value || "No Phone Number"}</p>
    </div>
  ))}
</div>

            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
