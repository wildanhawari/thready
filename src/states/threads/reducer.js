import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  case ActionType.TOGGLE_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id === action.payload.threadId) {
        const { userId, voteType } = action.payload;

        const upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        const downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

        if (voteType === 1) upVotesBy.push(userId);
        if (voteType === -1) downVotesBy.push(userId);

        return { ...thread, upVotesBy, downVotesBy };
      }
      return thread;
    });
  default:
    return threads;
  }
}

export default threadsReducer;