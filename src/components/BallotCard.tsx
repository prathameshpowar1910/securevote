import React from 'react';
import { CheckCircle2, Timer } from 'lucide-react';
import { Ballot, Vote } from '../types';
import { useStore } from '../store';
import toast from 'react-hot-toast';

interface BallotCardProps {
  ballot: Ballot;
}

export function BallotCard({ ballot }: BallotCardProps) {
  const { currentUser, votes, addVote } = useStore();
  
  const hasVoted = votes.some(
    (vote) => vote.ballotId === ballot.id && vote.voterId === currentUser?.id
  );

  const isExpired = new Date(ballot.endDate) < new Date();

  const handleVote = (option: string) => {
    if (!currentUser) return;
    if (hasVoted) {
      toast.error('You have already voted on this ballot');
      return;
    }
    if (isExpired) {
      toast.error('This ballot has expired');
      return;
    }

    addVote({
      ballotId: ballot.id,
      option,
      voterId: currentUser.id,
    });
    toast.success('Vote recorded successfully!');
  };

  const getVoteCount = (option: string) => {
    return votes.filter((v) => v.ballotId === ballot.id && v.option === option).length;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{ballot.title}</h3>
          <p className="text-gray-600 mt-1">{ballot.description}</p>
        </div>
        {isExpired ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <Timer className="w-4 h-4 mr-1" />
            Expired
          </span>
        ) : hasVoted ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Voted
          </span>
        ) : null}
      </div>

      <div className="space-y-3">
        {ballot.options.map((option) => (
          <button
            key={option}
            onClick={() => handleVote(option)}
            disabled={hasVoted || isExpired}
            className={`w-full p-3 text-left rounded-lg transition-colors ${
              hasVoted
                ? 'bg-gray-100 cursor-default'
                : 'hover:bg-indigo-50 focus:bg-indigo-50'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{option}</span>
              <span className="text-sm text-gray-500">
                {getVoteCount(option)} votes
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Ends on: {new Date(ballot.endDate).toLocaleDateString()}
      </div>
    </div>
  );
}