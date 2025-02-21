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
        <div className="p-6">
            <div id="contacts" className="flex justify-between items-center bg-gray-200 p-4 rounded-lg">
                {!showForm && <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add Contact</button>}
                {showForm && (
                    <div id="contactForm" className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            maxLength={10}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/, ''))}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <div className="flex gap-2">
                            <button onClick={editingId ? saveContact : addContact} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                                {editingId ? 'Save Contact' : 'Save New Contact'}
                            </button>
                            <button onClick={() => setShowForm(false)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search contacts"
                    className="p-2 border border-gray-300 rounded"
                />
            </div>

            <div id="contactList" className="mt-6">
                {filteredContacts.length > 0 ? (
                    <ul>
                        {filteredContacts.map((contact) => (
                            <li key={contact.id} className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-lg shadow-sm">
                                <span>{contact.name} - {contact.phone}</span>
                                <div>
                                    <button onClick={() => editContact(contact.id)} className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2">Edit</button>
                                    <button onClick={() => deleteContact(contact.id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-600">No contacts available.</p>
                )}
            </div>
        </div>
    );
};

export default AllContacts;
