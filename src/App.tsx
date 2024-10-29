import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { BallotCard } from './components/BallotCard';
import { CreateBallot } from './components/CreateBallot';
import { useStore } from './store';

function App() {
  const { currentUser, ballots } = useStore();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Login />
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ballots.map((ballot) => (
            <BallotCard key={ballot.id} ballot={ballot} />
          ))}
        </div>
        <CreateBallot />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;