import { githubApi } from "../../api/github.api"
import { sleep } from "../../helper/sleep"
import { GithubIssue } from "../interfaces/issues";


export const getIssues = async (): Promise<GithubIssue[]> => {
    await sleep(1000);
    const { data } = await githubApi.get<GithubIssue[]>('/issues');
    return data
}