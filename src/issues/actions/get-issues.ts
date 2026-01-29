import { githubApi } from "../../api/github.api"
import { sleep } from "../../helper/sleep"
import { GithubIssue, State } from "../interfaces/issues";


export const getIssues = async (state: State): Promise<GithubIssue[]> => {
    await sleep(1000);
    const querySearch = `?state=${state}`;
    const { data } = await githubApi.get<GithubIssue[]>(`/issues${querySearch}`);
    return data
}