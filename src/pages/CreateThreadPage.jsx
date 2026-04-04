import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';

export default function CreateThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return alert('Judul dan isi tidak boleh kosong');
    try {
      await dispatch(asyncAddThread({ title, category, body }));
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Buat Diskusi Baru</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Diskusi</label>
          <input 
            type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500" required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori (Opsional)</label>
          <input 
            type="text" value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Isi Diskusi</label>
          <textarea 
            value={body} onChange={(e) => setBody(e.target.value)}
            className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 min-h-[200px]" required
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => navigate('/')} className="px-6 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100">Batal</button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Buat Diskusi</button>
        </div>
      </form>
    </div>
  );
}
