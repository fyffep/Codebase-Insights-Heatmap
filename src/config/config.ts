import * as vscode from "vscode";

export function getGitUrl(): string | undefined {
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
