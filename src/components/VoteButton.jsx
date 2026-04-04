import React from 'react';
import PropTypes from 'prop-types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function VoteButton({ upVotes, downVotes, onVote, authUserId }) {
  const isUpVoted = upVotes.includes(authUserId);
  const isDownVoted = downVotes.includes(authUserId);

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onVote(isUpVoted ? 0 : 1); }}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${isUpVoted ? 'text-green-600 bg-green-50' : 'text-slate-500 hover:bg-slate-100'}`}
      >
        <ThumbsUp size={16} className={isUpVoted ? 'fill-current' : ''} />
        <span className="text-sm font-medium">{upVotes.length}</span>
      </button>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onVote(isDownVoted ? 0 : -1); }}
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${isDownVoted ? 'text-red-600 bg-red-50' : 'text-slate-500 hover:bg-slate-100'}`}
      >
        <ThumbsDown size={16} className={isDownVoted ? 'fill-current' : ''} />
        <span className="text-sm font-medium">{downVotes.length}</span>
      </button>
    </div>
  );
}

VoteButton.propTypes = {
  upVotes: PropTypes.array.isRequired,
  downVotes: PropTypes.array.isRequired,
  onVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string,
};

VoteButton.defaultProps = {
  authUserId: null,
};
