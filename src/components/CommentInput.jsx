import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CommentInput({ addComment }) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(commentText);
    setCommentText('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <textarea
        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] mb-3"
        placeholder="Tulis pendapat Anda di sini..."
        value={commentText} onChange={(e) => setCommentText(e.target.value)}
      />
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700">Kirim Komentar</button>
      </div>
    </form>
  );
}

CommentInput.propTypes = { addComment: PropTypes.func.isRequired };
