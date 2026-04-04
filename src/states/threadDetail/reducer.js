import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    return { ...threadDetail, comments: [action.payload.comment, ...threadDetail.comments] };
  case ActionType.TOGGLE_VOTE_THREAD_DETAIL: {
    const { userId, voteType } = action.payload;
    const upVotesBy = threadDetail.upVotesBy.filter((id) => id !== userId);
    const downVotesBy = threadDetail.downVotesBy.filter((id) => id !== userId);

    if (voteType === 1) upVotesBy.push(userId);
    if (voteType === -1) downVotesBy.push(userId);
    return { ...threadDetail, upVotesBy, downVotesBy };
  }
  case ActionType.TOGGLE_VOTE_COMMENT: {
    const { commentId, userId, voteType } = action.payload;
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === commentId) {
          const upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
          const downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
          if (voteType === 1) upVotesBy.push(userId);
          if (voteType === -1) downVotesBy.push(userId);
          return { ...comment, upVotesBy, downVotesBy };
        }
        return comment;
      })
    };
  }
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;
