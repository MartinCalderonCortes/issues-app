import { useQuery } from "@tanstack/react-query"
import { getIssues } from "../actions/get-issues"
import { State } from "../interfaces/issues"

export const useIssues = (state: State) => {
    const issuesQuery = useQuery({
        queryKey: ['issues', state],
        queryFn: () => getIssues(state),
        staleTime: 1000 * 60
    }) 

    return {
        issuesQuery
    }
}