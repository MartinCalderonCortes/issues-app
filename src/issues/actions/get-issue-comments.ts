import { githubApi } from "../../api/github.api"
import { GithubIssue } from "../interfaces/issues";


export const getIssueComments = async (issueNumber: number): Promise<GithubIssue[]> => {
    const { data } = await githubApi.get<GithubIssue[]>(`issues/${issueNumber}/comments`)
    return data;
}