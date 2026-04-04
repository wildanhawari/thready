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
      let upVotesBy = threadDetail.upVotesBy.filter((id) => id !== userId);
      let downVotesBy = threadDetail.downVotesBy.filter((id) => id !== userId);
      
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
            let upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
            let downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
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
