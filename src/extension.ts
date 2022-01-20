// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Codebase Insights extension activated!');

  vscode.window.registerTreeDataProvider(
    'codebaseInsightsTree',
    new CodebaseInsightsViewProvider()
  );

  const overviewPanel = vscode.window.createWebviewPanel(
    'overviewPage',
    'Overview',
    vscode.ViewColumn.One,
    {}
  );

  const codemapPanel = vscode.window.createWebviewPanel(
    'codeMapPage',
    'Code Map',
    vscode.ViewColumn.One,
    {}
  );

  const knowledgeGraphPanel = vscode.window.createWebviewPanel(
    'knowledgeGraph',
    'Knowledge Graph',
    vscode.ViewColumn.One,
    {}
  );

  const insightsPanel = vscode.window.createWebviewPanel(
    'insights',
    'Insights',
    vscode.ViewColumn.One,
    {}
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.overview', () => {
      // Create and show a new webview
      overviewPanel;
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.code-map', () => {
      // Create and show a new webview
      codemapPanel;
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.knowledge-graph', () => {
      // Create and show a new webview
      knowledgeGraphPanel;
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.insights', () => {
      // Create and show a new webview
      insightsPanel;
    })
  );
}

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

// this method is called when your extension is deactivated
export function deactivate() {}
