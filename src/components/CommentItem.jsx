import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import VoteButton from './VoteButton';
import { showFormattedDate } from '../utils';

export default function CommentItem({ comment, authUser, onVote }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <img src={comment.owner.avatar} alt="avatar" className="w-8 h-8 rounded-full border border-slate-200" />
        <div>
          <div className="font-semibold text-sm text-slate-800">{comment.owner.name}</div>
          <div className="text-xs text-slate-400">{showFormattedDate(comment.createdAt)}</div>
        </div>
      </div>
      <div className="text-slate-700 text-sm mb-4">{parse(comment.content)}</div>
      <VoteButton 
        upVotes={comment.upVotesBy} downVotes={comment.downVotesBy} 
        onVote={(voteType) => onVote(comment.id, voteType)}
        authUserId={authUser?.id}
      />
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  authUser: PropTypes.object,
  onVote: PropTypes.func.isRequired,
};

CommentItem.defaultProps = { authUser: null };