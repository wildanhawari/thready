import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import VoteButton from './VoteButton';
import { showFormattedDate } from '../utils';

export default function ThreadDetail({ threadDetail, authUser, onVoteThread }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md border border-blue-100">#{threadDetail.category}</span>
        <span className="text-xs text-slate-400">{showFormattedDate(threadDetail.createdAt)}</span>
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">{threadDetail.title}</h1>
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        <img src={threadDetail.owner.avatar} alt="avatar" className="w-10 h-10 rounded-full border border-slate-200" />
        <div>
          <div className="font-semibold text-slate-800">{threadDetail.owner.name}</div>
          <div className="text-xs text-slate-500">Pembuat Diskusi</div>
        </div>
      </div>
      <div className="prose prose-blue max-w-none text-slate-700 mb-8">
        {parse(threadDetail.body)}
      </div>
      <VoteButton
        upVotes={threadDetail.upVotesBy}
        downVotes={threadDetail.downVotesBy}
        onVote={onVoteThread}
        authUserId={authUser?.id}
      />
    </div>
  );
}

ThreadDetail.propTypes = {
  threadDetail: PropTypes.object.isRequired,
  authUser: PropTypes.object,
  onVoteThread: PropTypes.func.isRequired,
};

ThreadDetail.defaultProps = { authUser: null };