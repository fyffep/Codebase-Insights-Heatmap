import * as vscode from 'vscode';

export class CodeBaseInsightsView extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly description: string
  ) {
    super(label, collapsibleState);
    this.tooltip = `${this.description}`;
    this.description = '';
    this.command = this.getCommand(label);
  }

  getCommand(label: string) {
    switch (label) {
      case 'Overview':
        return {
          title: 'Open Codebase Insights overview page',
          command: 'codebase-insights.overview',
        };
      case 'Code Map':
        return {
          title: 'Open Codebase Insights code map page',
          command: 'codebase-insights.code-map',
        };
      case 'Knowledge Graph':
        return {
          title: 'Open Codebase Insights knowledge graph page',
          command: 'codebase-insights.knowledge-graph',
        };
      case 'Insights':
        return {
          title: 'Open Codebase Insights Insights page',
          command: 'codebase-insights.insights',
        };
      default:
      // error
    }
  }
}