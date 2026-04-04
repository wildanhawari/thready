import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function RegisterInput({ register }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div><input type="text" placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-3 rounded-lg" required /></div>
      <div><input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-3 rounded-lg" required /></div>
      <div><input type="password" placeholder="Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-3 rounded-lg" required minLength="6" /></div>
      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-slate-900">Daftar Akun</button>
    </form>
  );
}

RegisterInput.propTypes = { register: PropTypes.func.isRequired };