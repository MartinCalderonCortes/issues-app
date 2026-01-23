import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { GithubIssue, State } from '../interfaces/issues';

interface IssueItemProp {
  issue: GithubIssue
}

export const IssueItem = ({ issue }: IssueItemProp) => {
  const navigate = useNavigate();
  const { state, title, number, user, comments } = issue;

  return (
    <div className="animate-fadeIn flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800">
      {
        state === State.Open
        ? <FiCheckCircle size={30} color="green" className="min-w-10" />
        : <FiInfo size={30} color="red" className="min-w-10" />
      }

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${number}`)}
          className="hover:underline hover:cursor-pointer"
        >
          {title}
        </a>
        <span className="text-gray-500">
          {/* TODO: days ago */}
          {`#${number} opnened by `}
          <span className="font-bold">{user?.login}</span>
        </span>
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
