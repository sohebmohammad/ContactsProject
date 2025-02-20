import React, { useState } from 'react';

const AllContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [editingId, setEditingId] = useState(null);

    const addContact = () => {
        if (!name || !phone) return;
        const newContact = { id: Date.now(), name, phone };
        setContacts([...contacts, newContact]);
        setName('');
        setPhone('');
        setShowForm(false);
    };

    const deleteContact = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    const editContact = (id) => {
        const contactToEdit = contacts.find(contact => contact.id === id);
        setName(contactToEdit.name);
        setPhone(contactToEdit.phone);
        setEditingId(id);
        setShowForm(true);
    };

    const saveContact = () => {
        if (!name || !phone) return;
        const updatedContacts = contacts.map(contact =>
            contact.id === editingId ? { ...contact, name, phone } : contact
        );
        setContacts(updatedContacts);
        setName('');
        setPhone('');
        setEditingId(null);
        setShowForm(false);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
    );

    return (
        <div>
            <div id="contacts">
                {!showForm && <button onClick={() => setShowForm(true)}>Add Contact</button>}
                {showForm && (
                    <div id="contactForm">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            maxLength={10}  // Restrict max input length to 10 characters
                            onChange={(e) => setPhone(e.target.value.replace(/\D/, ''))}  // Ensures only numbers are entered
                        />

                        <button onClick={editingId ? saveContact : addContact}>
                            {editingId ? 'Save Contact' : 'Save New Contact'}
                        </button>
                        <button onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                )}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search contacts"
                />
            </div>

            <div id="contactList">
                {filteredContacts.length > 0 ? (
                    <ul>
                        {filteredContacts.map((contact) => (
                            <li key={contact.id}>
                                {contact.name} - {contact.phone}
                                <button onClick={() => editContact(contact.id)}>Edit</button>
                                <button onClick={() => deleteContact(contact.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No contacts available.</p>
                )}
            </div>

            <style jsx>{`
        #contacts {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: row;
          border: 2px solid #333;
          padding: 10px;
          background-color: #f4f4f4;
        }
         

        #contactForm {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        #contactForm input {
          padding: 8px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        #contactForm button {
          padding: 10px;
          font-size: 1rem;
          background-color: #4caf50;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }

        #contactForm button:hover {
          background-color: #45a049;
        }

        #contactList {
          margin-top: 20px;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          padding: 10px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 5px;
        }

        button {
          padding: 5px 10px;
          background-color: #f44336;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
          
          

        button:hover {
          background-color: #e53935;
        }
      `}</style>
        </div>
    );
};

export default AllContacts;
