
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(import.meta.env.VITE_API_URL + '/users/register', { email, password });
      alert('User registered');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mb-2 w-full" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 mb-2 w-full" />
      <button onClick={handleRegister} className="bg-green-600 text-white p-2 w-full">Register</button>
    </div>
  );
}

export default Register;
