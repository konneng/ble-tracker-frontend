
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + '/users/login', { email, password });
      localStorage.setItem('access_token', res.data.access_token);
      navigate('/tags');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mb-2 w-full" />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 mb-2 w-full" />
      <button onClick={handleLogin} className="bg-blue-600 text-white p-2 w-full">Login</button>
      <p className="mt-4 text-sm text-center">
        Non hai un account? <Link to="/register" className="text-blue-600 underline">Registrati</Link>
      </p>
    </div>
  );
}

export default Login;
