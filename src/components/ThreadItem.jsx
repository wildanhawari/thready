import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MessageSquare, Clock } from 'lucide-react';
import { showFormattedDate, stripHtml } from '../utils';
import VoteButton from './VoteButton';

export default function ThreadItem({ thread, user, authUser, onVote }) {
  return (
    <Link to={`/thread/${thread.id}`} className="block bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md border border-blue-100">#{thread.category}</span>
        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={12} /> {showFormattedDate(thread.createdAt)}</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{thread.title}</h3>
      <p className="text-slate-600 text-sm line-clamp-2 mb-4">{stripHtml(thread.body)}</p>
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
        <VoteButton
          upVotes={thread.upVotesBy}
          downVotes={thread.downVotesBy}
          onVote={(voteType) => onVote(thread.id, voteType)}
          authUserId={authUser?.id}
        />
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-1.5"><MessageSquare size={16} /><span>{thread.totalComments} balasan</span></div>
          <div className="text-slate-300">|</div>
          <div className="flex items-center gap-2">
            Dibuat oleh <img src={user?.avatar} alt={user?.name} className="w-5 h-5 rounded-full" />
            <span className="font-semibold text-slate-700">{user?.name}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  authUser: PropTypes.object,
  onVote: PropTypes.func.isRequired,
};

ThreadItem.defaultProps = { authUser: null };
