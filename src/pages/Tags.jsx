
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tags() {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');

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
      await axios.post(import.meta.env.VITE_API_URL + '/tags/', { name, type }, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') },
      });
      setName('');
      setType('');
      loadTags();
    } catch (err) {
      alert('Failed to create tag');
    }
  };

  useEffect(() => { loadTags(); }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Your Tags</h1>
      <div className="mb-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 mr-2" />
        <input value={type} onChange={e => setType(e.target.value)} placeholder="Type" className="border p-2 mr-2" />
        <button onClick={handleCreate} className="bg-blue-600 text-white p-2">Create</button>
      </div>
      <ul className="list-disc ml-4">
        {tags.map(tag => (
          <li key={tag.id}>{tag.name} ({tag.type})</li>
        ))}
      </ul>
    </div>
  );
}

export default Tags;
