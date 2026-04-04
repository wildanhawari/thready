import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Award, Loader2 } from 'lucide-react';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardItem from '../components/LeaderboardItem';

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);
  const isLoading = useSelector((state) => state.loadingBar.default > 0);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3 flex items-center justify-center gap-3">
          <Award className="text-yellow-500" size={32} /> Klasemen Pengguna Aktif
        </h1>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between font-semibold text-sm text-slate-600 uppercase">
          <span>Pengguna</span><span>Skor</span>
        </div>
        {isLoading && leaderboards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-slate-500">
            <Loader2 className="animate-spin mb-4" size={24} />
            {/* <p className="text-sm">Memuat data klasemen...</p> */}
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {leaderboards.map(({ user, score }, index) => (
              <LeaderboardItem key={user.id} user={user} score={score} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}