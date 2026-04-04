import React from 'react';
import PropTypes from 'prop-types';

export default function LeaderboardItem({ user, score, index }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 hover:bg-slate-50">
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 flex items-center justify-center font-bold text-sm rounded-full ${index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-slate-200 text-slate-700' : index === 2 ? 'bg-orange-100 text-orange-700' : 'text-slate-400'}`}>
          {index + 1}
        </div>
        <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-slate-200" />
        <span className="font-semibold text-slate-800 text-lg">{user.name}</span>
      </div>
      <div className="text-xl font-bold text-blue-600">{score}</div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
