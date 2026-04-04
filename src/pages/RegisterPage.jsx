import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import RegisterInput from '../components/RegisterInput';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async ({ name, email, password }) => {
    try {
      await api.register({ name, email, password });
      alert("Pendaftaran berhasil!");
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-8">Buat Akun Baru</h1>
        <RegisterInput register={handleRegister} />
        <p className="text-center text-sm text-slate-600 mt-6">Sudah punya akun? <Link to="/login" className="text-blue-600 font-semibold">Masuk di sini</Link></p>
      </div>
    </div>
  );
}