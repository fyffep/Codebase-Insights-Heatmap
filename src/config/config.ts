import * as vscode from "vscode";

export function getGitUrl(): string {
  let configuration = vscode.workspace.getConfiguration("codebase-insights");
  let repoUrl = configuration["repoURL"];
  if (repoUrl) {
    return repoUrl;
  } else {
    return "";
  }
}

export async function setGitUrl(url: string): Promise<void> {
  let configuration = vscode.workspace.getConfiguration("codebase-insights");
  await configuration.update("repoURL", url, true);
}

export function getJenkinsLogin(): string {
  let configuration = vscode.workspace.getConfiguration("codebase-insights");
  let jenkinsLogin = configuration["jenkinsLogin"];
  if (jenkinsLogin) {
    return jenkinsLogin;
  } else {
    return "";
  }
}

export async function setJenkinsLogin(login: string): Promise<void> {
  let configuration = vscode.workspace.getConfiguration("codebase-insights");
  await configuration.update("jenkinsLogin", login, true);
}

export function getJenkinsPassword(): string {
  let configuration = vscode.workspace.getConfiguration("codebase-insights");
  let jenkinsPassword = configuration["jenkinsPassword"];
  if (jenkinsPassword) {
    return jenkinsPassword;
  } else {
    return "";
  }
}

export async function setJenkinsPassword(login: string): Promise<void> {
  let configuration = vscode.workspace.getConfiguration("codebase-insights");
  await configuration.update("jenkinsPassword", login, true);
}