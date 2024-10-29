import React from 'react';
import { Vote, LogOut } from 'lucide-react';
import { useStore } from '../store';

export function Header() {
  const { currentUser, logout } = useStore();

  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Vote className="w-8 h-8" />
          <h1 className="text-2xl font-bold">SecureVote</h1>
        </div>
        {currentUser && (
          <div className="flex items-center space-x-4">
            <span>Welcome, {currentUser.name}</span>
            <button
              onClick={logout}
              className="flex items-center space-x-1 hover:text-indigo-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}