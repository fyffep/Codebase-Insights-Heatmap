import * as vscode from "vscode";

export function getPreference(desiredPreference: string) {
  let configuration = vscode.workspace.getConfiguration("codebase-insights");
  let preference = configuration[desiredPreference];
  if (preference) {
    return preference;
  } else {
    return "";
  }
}

export async function setPreference(
  desiredPreference: string,
  value: string | number | undefined
) {
  let configuration = vscode.workspace.getConfiguration("codebase-insights");
  await configuration.update(desiredPreference, value, true);
}

export function getGitUrl(): string {
  return getPreference("repoURL");
}

export async function setGitUrl(url: string): Promise<void> {
  return setPreference("repoURL", url);
}

export function getBranchName(): string {
  return getPreference("branchName");
}

export function getGithubActionsWorkflowId(): string {
  return getPreference("githubActionsWorkflowId");
}

export async function setGithubActionsWorkflowId(
  workflowId: string
): Promise<void> {
  return setPreference("githubActionsWorkflowId", workflowId);
}

export async function setBranchName(branchName: string): Promise<void> {
  return setPreference("branchName", branchName);
}

export function getCiUsername(): string {
  return getPreference("ciUsername");
}

export async function setCiUsername(login: string): Promise<void> {
  return setPreference("ciUsername", login);
}

export function getApiKey(): string {
  return getPreference("apiKey");
}

export async function setApiKey(apiKey: string): Promise<void> {
  return setPreference("apiKey", apiKey);
}

export function getJobUrl(): string {
  return getPreference("jobUrl");
}

export async function setJobUrl(url: string): Promise<void> {
  return setPreference("jobUrl", url);
}

export function getJenkinsSettings() {
  return {
    ciUsername: getCiUsername(),
    apiKey: getApiKey(),
    jobUrl: getJobUrl(),
  };
}

export async function setAxiosUrl(url: string): Promise<void> {
  return setPreference("axiosUrl", url);
}

export function getAxiosUrl(): string {
  return getPreference("axiosUrl");
}
