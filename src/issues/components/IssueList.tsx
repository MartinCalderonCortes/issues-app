import { FC } from 'react';

import { GithubIssue, State } from '../interfaces/issues';
import { IssueItem } from './IssueItem';

interface IssueListProps {
  issues: GithubIssue[],
  state: State,
  onStateChange: (state: State) => void
}

export const IssueList: FC<IssueListProps> = ({ issues, state, onStateChange }) => {

  return (
    <>
      <div className="flex gap-4">
        <button className={`btn ${state === State.All ? 'active' : '' }`} onClick={() => onStateChange(State.All)}>All</button>
        <button className={`btn ${state === State.Open ? 'active' : ''}`} onClick={() => onStateChange(State.Open)}>Open</button>
        <button className={`btn ${state === State.Closed ? 'active' : ''}`} onClick={() => onStateChange(State.Closed)}>Closed</button>
      </div>

      <div className="mt-4">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </>
  );
};
