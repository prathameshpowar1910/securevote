import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { useStore } from '../store';
import toast from 'react-hot-toast';

export function Login() {
  const [name, setName] = useState('');
  const login = useStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login({
        id: Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        isAdmin: false,
      });
      toast.success('Welcome to SecureVote!');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <UserCircle className="w-16 h-16 text-indigo-600 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900">Welcome to SecureVote</h2>
          <p className="text-gray-600">Please enter your name to continue</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
              placeholder="Enter your name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}