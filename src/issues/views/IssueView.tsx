import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { FiSkipBack } from 'react-icons/fi';
import { useIssue } from '../hooks/useIssue';

const comment2 =
  "In order to familiarize myself with react codebase, I wrote a small test that fails on this pattern. (even if it is expected so)\r\n\r\nHere is it fwiw (in `packages/react-reconciler/src/__tests__/useSyncExternalStore-test.js`):\r\n\r\n```js\r\ntest('store value is correctly stored in current hook instance even with interleaved effects occurring', async () => {\r\n    const store = createExternalStore('value:initial');\r\n\r\n    function App() {\r\n      const value = useSyncExternalStore(store.subscribe, store.getState);\r\n      const [sameValue, setSameValue] = useState(value);\r\n      if (value !== sameValue) setSameValue(value);\r\n      return <Text text={value} />;\r\n    }\r\n\r\n    const root = ReactNoop.createRoot();\r\n    act(() => {\r\n      // Start a render that reads from the store and yields value\r\n      root.render(<App />);\r\n    });\r\n    expect(Scheduler).toHaveYielded(['value:initial']);\r\n\r\n    await act(() => {\r\n      store.set('value:changed');\r\n    });\r\n    expect(Scheduler).toHaveYielded(['value:changed']);\r\n\r\n    await act(() => {\r\n      store.set('value:initial');\r\n    });\r\n    expect(Scheduler).toHaveYielded(['value:initial']); \r\n  });\r\n});\r\n```\r\n\r\nThe last assertion fails with the `setSameValue` line, and passes without.";
const comment3 =
  "What I don't understand is that in `renderWithHooks`, there is the following block:\r\n\r\n```js\r\n// Check if there was a render phase update\r\n  if (didScheduleRenderPhaseUpdateDuringThisPass) {\r\n```\r\n\r\nWhich runs if `setState` was called in render. Then, it calls again component function - but to do so, it resets the `workInProgress` state, including `updateQueue`. IIUC this discards the effects pushed by previous hooks, without flushing them?\r\n\r\nThat's why `useSyncExternalStore` effect to update store value is not run, in that case.\r\n\r\nThe fact that there is code written to manage `setState` calls in render, seem to acknowledge it is a legit use case?\r\n\r\nI must be missing something 😅 how to make sure those effects are run even if component function is called again before end of work?";

export const IssueView = () => {
  const navigate = useNavigate();
  const params = useParams();
  
  const issueNumber = Number(params.issueNumber ?? 0);
  const { issueQuery } = useIssue(issueNumber);

  if( issueQuery.isLoading ) {
    return (
      <div className='flex justify-center items-center h-52'>Loading...</div>
    )
  }

  if( !issueQuery.data ) {
    return (
      <Navigate to={'/404'}/>
    )
  }

  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:underline text-blue-400 flex items-center"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {/* Comentario de otros */}
      {/* <IssueComment body={comment2} />
      <IssueComment body={comment3} /> */}
    </div>
  );
};
