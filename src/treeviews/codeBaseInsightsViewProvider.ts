import * as vscode from 'vscode';
import { CodeBaseInsightsView } from './codeBaseInsightsView';

export class CodebaseInsightsViewProvider
  implements vscode.TreeDataProvider<CodeBaseInsightsView>
{
  getTreeItem(element: CodeBaseInsightsView) {
    return element;
  }

  getChildren(
    element?: CodeBaseInsightsView
  ): Thenable<CodeBaseInsightsView[]> {
    return Promise.resolve(this.getViews());
  }

  private getViews(): CodeBaseInsightsView[] {
    let views = [];
    let overview = new CodeBaseInsightsView(
      'Overview',
      vscode.TreeItemCollapsibleState.None,
      'A broad overview of your codebase to get a quick peek at your project'
    );
    let map = new CodeBaseInsightsView(
      'Code Map',
      vscode.TreeItemCollapsibleState.None,
      'A configurable heatmap for viewing your codebase graphically and analyzing various metrics as a gradient'
    );
    let knowledge = new CodeBaseInsightsView(
      'Knowledge Graph',
      vscode.TreeItemCollapsibleState.None,
      'A graph showing the areas where each contributor on your project has knowledge'
    );
    let insights = new CodeBaseInsightsView(
      'Insights',
      vscode.TreeItemCollapsibleState.None,
      'Create custom queries to analyze your codebase'
    );
    views = [overview, map, knowledge, insights];
    return views;
  }
}