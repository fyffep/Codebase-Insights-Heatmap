// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "codebase-insights" is now active!'
  );

  vscode.window.showInformationMessage('fdasfsfafreqw');
  vscode.window.registerTreeDataProvider('codebaseInsightsTree', new CodebaseInsightsViewProvider());
}

export class CodeBaseInsightsView extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly description: string
  ) {
    super(label, collapsibleState);
    this.tooltip = this.label;
    this.description = this.description;
  }
}

export class CodebaseInsightsViewProvider implements vscode.TreeDataProvider<CodeBaseInsightsView> {
  getTreeItem(element: CodeBaseInsightsView) {
    return element;
  }

  getChildren(element?: CodeBaseInsightsView): Thenable<CodeBaseInsightsView[]> {
    return Promise.resolve(this.getViews());
  }

  private getViews(): CodeBaseInsightsView[] {
    let views = [];
    let overview = new CodeBaseInsightsView("Overview", vscode.TreeItemCollapsibleState.None, "A broad overview of your codebase to get a quick peek at your project");
    let map = new CodeBaseInsightsView("Code Map", vscode.TreeItemCollapsibleState.None,"A configurable heatmap for viewing your codebase graphically and analyzing various metrics as a gradient");
    let knowledge = new CodeBaseInsightsView("Knowledge Graph", vscode.TreeItemCollapsibleState.None, "A graph showing the areas where each contributor on your project has knowledge");
    let insights = new CodeBaseInsightsView("Insights", vscode.TreeItemCollapsibleState.None,"Create custom queries to analyze your codebase");
    views = [overview, map, knowledge, insights];
    return views;
  }
}


// this method is called when your extension is deactivated
export function deactivate() {}