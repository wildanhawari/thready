import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { 
  asyncReceiveThreadDetail, 
  clearThreadDetailActionCreator, 
  asyncAddComment, 
  asyncToggleVoteThreadDetail, 
  asyncToggleVoteComment 
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
    return () => { dispatch(clearThreadDetailActionCreator()); };
  }, [dispatch, id]);

  if (!threadDetail) return <div className="text-center py-20 text-slate-500 flex justify-center"><Loader2 className="animate-spin" /></div>;

  const handleAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: threadDetail.id, content }));
  };

  const onVoteThread = (voteType) => {
    if (!authUser) return navigate('/login');
    dispatch(asyncToggleVoteThreadDetail(voteType));
  };

  const onVoteComment = (commentId, voteType) => {
    if (!authUser) return navigate('/login');
    dispatch(asyncToggleVoteComment({ commentId, voteType }));
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-6 font-medium">
        <ArrowLeft size={16} /> Kembali
      </Link>

      <ThreadDetail threadDetail={threadDetail} authUser={authUser} onVoteThread={onVoteThread} />

      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Beri Komentar</h3>
        {authUser ? (
          <CommentInput addComment={handleAddComment} />
        ) : (
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
            <p className="text-slate-600 mb-3 text-sm">Anda harus login untuk komentar thread ini.</p>
            <Link to="/login" className="inline-block bg-slate-800 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-slate-900">Login ke Akun</Link>
          </div>
        )}
      </div>

      <CommentList comments={threadDetail.comments} authUser={authUser} onVoteComment={onVoteComment} />
    </div>
  );
}
