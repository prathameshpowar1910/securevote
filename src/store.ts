import { create } from 'zustand';
import { Ballot, Vote, User } from './types';

interface Store {
  ballots: Ballot[];
  votes: Vote[];
  currentUser: User | null;
  addBallot: (ballot: Ballot) => void;
  addVote: (vote: Vote) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useStore = create<Store>((set) => ({
  ballots: [
    {
      id: '1',
      title: 'Best Programming Language',
      description: 'Vote for your favorite programming language',
      options: ['TypeScript', 'Python', 'Rust', 'Go'],
      endDate: new Date('2024-12-31'),
    },
  ],
  votes: [],
  currentUser: null,
  addBallot: (ballot) =>
    set((state) => ({ ballots: [...state.ballots, ballot] })),
  addVote: (vote) =>
    set((state) => ({ votes: [...state.votes, vote] })),
  login: (user) => set({ currentUser: user }),
  logout: () => set({ currentUser: null }),
}));