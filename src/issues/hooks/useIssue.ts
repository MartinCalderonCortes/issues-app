import { useQuery } from "@tanstack/react-query"
import { getIssue } from "../actions/get-issue"
import { getIssueComments } from "../actions/get-issue-comments"

export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery({
        queryKey: ['issues', issueNumber],
        queryFn: () => getIssue(issueNumber),
        staleTime: 1000 * 60,
        retry: false
    })

    const issueQueryNumber = issueQuery.data?.number ?? 0;

    const issueCommentQuery = useQuery({
        queryKey: ['issues', issueQueryNumber, 'comments'],
        queryFn: () => getIssueComments(issueQueryNumber),
        staleTime: 1000 * 60,
        enabled: issueQueryNumber !== undefined
    })

    return {
        issueQuery,
        issueCommentQuery
    }
}