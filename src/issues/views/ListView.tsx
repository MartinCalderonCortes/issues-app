import { useState } from 'react';

import { LoadingSpinner } from '../../share/components/LoadingSpinner';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks/useIssues';
import { State } from '../interfaces/issues';

export const ListView = () => {
  const [state, setstate] = useState( State.All );  
  const { issuesQuery } = useIssues(state)

  const issues =  issuesQuery.data || []

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {
          issuesQuery.isLoading
          ? <LoadingSpinner/>
          : <IssueList issues={issues} onStateChange={setstate} state={state}/>
        }
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker />
      </div>
    </div>
  );
};
