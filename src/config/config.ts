import * as vscode from "vscode";

export function getGitUrl(): string | undefined {
  let configuration = vscode.workspace.getConfiguration("codebase-insights");
  let repoUrl = configuration["repoURL"];
  console.log("Get result:");
  console.log(repoUrl);
  console.log("Configuration from get function():");
  console.log(configuration);
  if (repoUrl) {
    return repoUrl;
  } else {
    return "";
  }
}

export async function setGitUrl(url: string): Promise<void> {
  let configuration = vscode.workspace.getConfiguration("codebase-insights");
  console.log("Before update:");
  console.log(configuration);
  await configuration.update("repoURL", url, true);
  console.log("After update:");
  console.log(configuration);
}
