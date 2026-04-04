import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

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
    } catch (error) {
      alert(error.message);
      throw error;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) throw new Error('Harus login untuk memberikan vote');

    dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id, voteType }));

    try {
      await api.voteThread({ threadId, voteType });
    } catch (error) {
      alert(error.message);
      dispatch(toggleVoteThreadActionCreator({ threadId, userId: authUser.id, voteType: 0 })); 
    }
  };
}

export { ActionType, receiveThreadsActionCreator, addThreadActionCreator, toggleVoteThreadActionCreator, asyncAddThread, asyncToggleVoteThread };
