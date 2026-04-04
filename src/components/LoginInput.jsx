import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function LoginInput({ login }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-8">
      <div>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-3 rounded-lg" required />
      </div>
      <div>
        <input type="password" placeholder="Kata Sandi" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-3 rounded-lg" required />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">Masuk</button>
    </form>
  );
}

LoginInput.propTypes = { login: PropTypes.func.isRequired };