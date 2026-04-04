import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

export default function ThreadList({ threads, users, authUser, onVote }) {
  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <ThreadItem 
          key={thread.id} 
          thread={thread} 
          user={users.find((u) => u.id === thread.ownerId) || {}}
          authUser={authUser}
          onVote={onVote}
        />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  authUser: PropTypes.object,
  onVote: PropTypes.func.isRequired,
};

ThreadList.defaultProps = { authUser: null };