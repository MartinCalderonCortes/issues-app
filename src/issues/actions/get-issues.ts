import { githubApi } from "../../api/github.api"
import { sleep } from "../../helper/sleep"
import { GithubIssue, State } from "../interfaces/issues";

export const getIssues = async (state: State, selectedLabels: string[]): Promise<GithubIssue[]> => {
    await sleep(1000);
    const urlParams = new URLSearchParams();
    urlParams.append('state', state)
    if( selectedLabels.length) {
        urlParams.append('labels', selectedLabels.join(','))
    }
    const { data } = await githubApi.get<GithubIssue[]>('/issues', {
        params: urlParams
    });
    return data
}