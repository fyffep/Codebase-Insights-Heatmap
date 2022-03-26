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

export async function setPreference(desiredPreference: string, value: string | number | undefined) {
  let configuration = vscode.workspace.getConfiguration("codebase-insights");
  await configuration.update(desiredPreference, value, true);
}

export function getGitUrl(): string {
  return getPreference("repoURL");
}

export async function setGitUrl(url: string): Promise<void> {
  return setPreference("repoURL", url);
}

export function getGithubActionsWorkflowId(): string {
  return getPreference("githubActionsWorkflowId");
}

export async function setGithubActionsWorkflowId(workflowId: string): Promise<void> {
  return setPreference("githubActionsWorkflowId", workflowId);
}

export function getJenkinsLogin(): string {
  return getPreference("jenkinsLogin");
}

export async function setJenkinsLogin(login: string): Promise<void> {
  return setPreference("jenkinsLogin", login);
}

export function getJenkinsPassword(): string {
  return getPreference("jenkinsPassword");
}

export async function setJenkinsPassword(password: string): Promise<void> {
  return setPreference("jenkinsPassword", password);
}

export function getJenkinsURL(): string {
  return getPreference("jenkinsURL");
}

export async function setJenkinsURL(url: string): Promise<void> {
  return setPreference("jenkinsURL", url);
}
export function getJenkinsSettings() {
  return {
    "login":getJenkinsLogin(),
    "password":getJenkinsPassword(),
    "url":getJenkinsURL()
  };
}