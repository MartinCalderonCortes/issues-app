import { useQuery } from "@tanstack/react-query"
import { getIssue } from "../actions/get-issue"

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery({
        queryKey: ['Issue', issueNumber],
        queryFn: () => getIssue(issueNumber),
        retry: false
    })

    return {
        issueQuery
    }
}