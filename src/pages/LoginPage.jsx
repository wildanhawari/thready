import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async ({ email, password }) => {
    try {
      await dispatch(asyncSetAuthUser({ email, password }));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto">T</div>
        <h1 className="text-2xl font-bold text-center text-slate-900 mb-2">Selamat Datang Kembali</h1>
        <LoginInput login={handleLogin} />
        <p className="text-center text-sm text-slate-600 mt-6">Belum punya akun? <Link to="/register" className="text-blue-600 font-semibold">Daftar sekarang</Link></p>
      </div>
    </div>
  );
}
