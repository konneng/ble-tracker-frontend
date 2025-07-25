
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Tags() {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [sharedEmails, setSharedEmails] = useState('');
  const navigate = useNavigate();

  const loadTags = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + '/tags/', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
      });
      setTags(res.data);
    } catch (err) {
      alert('Failed to load tags');
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(import.meta.env.VITE_API_URL + '/tags/', {
        name, type, visibility, shared_with: sharedEmails.split(',').map(e => e.trim())
      }, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
      });
      setName('');
      setType('');
      setSharedEmails('');
      loadTags();
    } catch (err) {
      alert('Failed to create tag');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  useEffect(() => { loadTags(); }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Your Tags</h1>
        <button onClick={handleLogout} className="text-red-500 underline">Logout</button>
      </div>
      <div className="mb-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 mr-2" />
        <input value={type} onChange={e => setType(e.target.value)} placeholder="Type" className="border p-2 mr-2" />
        <select value={visibility} onChange={e => setVisibility(e.target.value)} className="border p-2 mr-2">
          <option value="private">Privato</option>
          <option value="public">Pubblico</option>
          <option value="shared">Condiviso</option>
        </select>
        {visibility === 'shared' && (
          <input
            value={sharedEmails}
            onChange={e => setSharedEmails(e.target.value)}
            placeholder="email1@example.com,email2@example.com"
            className="border p-2 mt-2 w-full"
          />
        )}
        <button onClick={handleCreate} className="bg-blue-600 text-white p-2 ml-2">Create</button>
      </div>
      <ul className="list-disc ml-4">
        {tags.map(tag => (
          <li key={tag.id}>{tag.name} ({tag.type}) - {tag.visibility}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tags;
