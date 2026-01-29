import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GithubIssue, State } from '../interfaces/issues';
import { useQueryClient } from '@tanstack/react-query';
import { getIssue } from '../actions/get-issue';
import { getIssueComments } from '../actions/get-issue-comments';

interface IssueItemProp {
  issue: GithubIssue
}

export const IssueItem = ({ issue }: IssueItemProp) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const { state, title, number, user, comments, labels } = issue;


  const preFetch = () => {
    queryClient.prefetchQuery({
      queryKey: ['issues', number],
      queryFn: () => getIssue(number!),
      staleTime: 1000 * 60
    })

    queryClient.prefetchQuery({
      queryKey: ['issues', number, 'comments'],
      queryFn: () => getIssueComments(number!),
      staleTime: 1000 * 60
    })
  }

  const presetData = () => {
    queryClient.setQueryData(['issues', number], issue, {
      updatedAt: Date.now() + 1000 * 60
    })

    queryClient.prefetchQuery({
      queryKey: ['issues', number, 'comments'],
      queryFn: () => getIssueComments(number!),
      staleTime: 1000 * 60
    })
  }

  return (
    <div onMouseEnter={presetData} className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800">
      {
        state === State.Open
          ? <FiCheckCircle size={30} color="red" className="min-w-10" />
          : <FiInfo size={30} color="green" className="min-w-10" />
      }

      <div className="flex flex-col flex-grow px-2 gap-1">
        <a
          onClick={() => navigate(`/issues/issue/${number}`)}
          className="hover:underline hover:cursor-pointer"
        >
          {title}
        </a>
        <span className="text-gray-500">
          {/* TODO: days ago */}
          {`#${number} opened by `}
          <span className="font-bold">{user?.login}</span>
        </span>
        <div className='flex flex-wrap gap-1'>
          {
            labels?.map((label) => (
              <span
                key={label.id}
                className='text-xs text-white rounded-md px-2 py-1'
                style={{ border: `1px solid #${label.color}` }}
              >
                {label.name}
              </span>
            ))
          }
        </div>
      </div>

      <img
        src={user?.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{comments}</span>
      </div>
    </div>
  );
};
