import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

export default function CommentList({ comments, authUser, onVoteComment }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        Komentar <span className="bg-blue-100 text-blue-700 py-0.5 px-2.5 rounded-full text-sm">{comments.length}</span>
      </h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem 
            key={comment.id} 
            comment={comment} 
            authUser={authUser} 
            onVote={onVoteComment} 
          />
        ))}
      </div>
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  authUser: PropTypes.object,
  onVoteComment: PropTypes.func.isRequired,
};

CommentList.defaultProps = { authUser: null };
