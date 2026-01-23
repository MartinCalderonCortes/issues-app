import { githubApi } from "../../api/github.api"
import { sleep } from "../../helper/sleep"
import { GithubIssue } from "../interfaces/issues";

export const getIssue = async (issueNumber: number): Promise<GithubIssue> => {
    await sleep(1000);
    const { data } = await githubApi.get<GithubIssue>(`issues/${issueNumber}`)    
    return data
}