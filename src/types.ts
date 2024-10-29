export interface Ballot {
  id: string;
  title: string;
  description: string;
  options: string[];
  endDate: Date;
}

export interface Vote {
  ballotId: string;
  option: string;
  voterId: string;
}

export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}