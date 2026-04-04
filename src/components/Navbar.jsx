import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MessageSquare, Award, LogIn, LogOut } from 'lucide-react';
import { asyncUnsetAuthUser } from '../states/authUser/action';

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
          <span className="text-xl font-bold text-slate-800 hidden sm:block">Thready</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className={`flex items-center gap-2 font-medium ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}>
            <MessageSquare size={20} /> <span className="hidden sm:block">Threads</span>
          </Link>
          <Link to="/leaderboards" className={`flex items-center gap-2 font-medium ${location.pathname === '/leaderboards' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}>
            <Award size={20} /> <span className="hidden sm:block">Leaderboards</span>
          </Link>
          <div className="h-6 w-px bg-slate-200 mx-2" />
          {authUser ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src={authUser.avatar} alt={authUser.name} className="w-8 h-8 rounded-full border border-slate-200" />
                <span className="text-sm font-semibold text-slate-700 hidden sm:block">{authUser.name}</span>
              </div>
              <button type="button" onClick={() => dispatch(asyncUnsetAuthUser())} className="text-slate-500 hover:text-red-500" title="Keluar">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-blue-700">
              <LogIn size={18} /> Masuk
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
