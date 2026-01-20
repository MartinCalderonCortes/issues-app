import { githubApi } from "../../api/github.api";
import { sleep } from "../../helper/sleep";
import { GithubLabel } from "../interfaces/label";

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1000)
  const { data } = await githubApi.get<GithubLabel[]>('/labels')
  return data
}