import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return { type: ActionType.RECEIVE_THREADS, payload: { threads } };
}

function addThreadActionCreator(thread) {
  return { type: ActionType.ADD_THREAD, payload: { thread } };
}

function toggleVoteThreadActionCreator({ threadId, userId, voteType }) {
  return { type: ActionType.TOGGLE_VOTE_THREAD, payload: { threadId, userId, voteType } };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      toast.error('Harus login untuk memberikan vote');
      return;
    }

    const currentThread = threads.find((thread) => thread.id === threadId);
    let previousVoteType = 0;

    if (currentThread) {
      if (currentThread.upVotesBy.includes(authUser.id)) {
        previousVoteType = 1;
      } else if (currentThread.downVotesBy.includes(authUser.id)) {
        previousVoteType = -1;
      }
    }

    dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id, voteType }));

    try {
      await api.voteThread({ threadId, voteType });
    } catch (error) {
      toast.error(error.message);
      dispatch(toggleVoteThreadActionCreator({ 
        threadId, 
        userId: authUser.id, 
        voteType: previousVoteType 
      }));
    }
  };
}

export { ActionType, receiveThreadsActionCreator, addThreadActionCreator, toggleVoteThreadActionCreator, asyncAddThread, asyncToggleVoteThread };
