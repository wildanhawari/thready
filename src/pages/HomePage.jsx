import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import { asyncToggleVoteThread } from '../states/threads/action';
import CategoryFilter from '../components/CategoryFilter';
import ThreadList from '../components/ThreadList';

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const isLoading = useSelector((state) => state.loadingBar.default > 0);

  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = useMemo(() => {
    const cats = new Set(threads.map((t) => t.category));
    return Array.from(cats);
  }, [threads]);

  const filteredThreads = activeCategory
    ? threads.filter((t) => t.category === activeCategory)
    : threads;

  const onVote = (threadId, voteType) => {
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk memberikan vote.');
      navigate('/login');
      return;
    }
    dispatch(asyncToggleVoteThread({ threadId, voteType }));
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      {isLoading && threads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Loader2 className="animate-spin mb-4" size={32} />
          {/* <p>Memuat Diskusi...</p> */}
        </div>
      ) : (
        <ThreadList
          threads={filteredThreads}
          users={users}
          authUser={authUser}
          onVote={onVote}
        />
      )}
      {authUser && (
        <Link to="/create" className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 hover:scale-105 transition-all">
          <Plus size={28} />
        </Link>
      )}
    </div>
  );
}
