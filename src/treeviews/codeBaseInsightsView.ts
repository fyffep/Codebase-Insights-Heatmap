import * as vscode from "vscode";

export class CodeBaseInsightsView extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly description: string
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.description}`;
    this.description = "";
    this.command = this.getCommand(label);
  }

  getCommand(label: string) {
    switch (label) {
      case "Settings":
        return {
          title: "Open Codebase Insights settings page",
          command: "codebase-insights.settings",
        };
      case "Code Map":
        return {
          title: "Open Codebase Insights code map page",
          command: "codebase-insights.code-map",
        };
      case "Knowledge Graph":
        return {
          title: "Open Codebase Insights knowledge graph page",
          command: "codebase-insights.knowledge-graph",
        };
      case "Commit Risk Assessment":
        return {
          title: "Open Codebase Insights Commit Risk Assessment page",
          command: "codebase-insights.commit-risk-assessment",
        };
      case "Insights":
        return {
          title: "Open Codebase Insights Insights page",
          command: "codebase-insights.insights",
        };
      default:
        return {
          title: "Open Codebase Insights settings page",
          command: "codebase-insights.settings",
        };
    }
  }
}
