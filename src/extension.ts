import * as vscode from 'vscode';

import { CodebaseInsightsViewProvider } from './CodeBaseInsightsViewProvider';

//Factory methods for our webviews using the singleton pattern
function overviewPanel(): void {
  const panel = vscode.window.createWebviewPanel(
    'overviewPage',
    'Overview',
    vscode.ViewColumn.One,
    {}
  );
  panel.webview.html = ""; //This is where we will put the html content for the view later
}

function codeMapPanel(): void {
  const panel = vscode.window.createWebviewPanel(
    'codeMapPage',
    'Code Map',
    vscode.ViewColumn.One,
    {}
  );
  panel.webview.html = ""; //html for webview goes here
}

function knowledgeGraphPanel(): void {
  const panel = vscode.window.createWebviewPanel(
    'knowledgeGraph',
    'Knowledge Graph',
    vscode.ViewColumn.One,
    {}
  );
  panel.webview.html = "";
}

function insightsPanel(): void {
  const panel = vscode.window.createWebviewPanel(
    'insights',
    'Insights',
    vscode.ViewColumn.One,
    {}
  );
  panel.webview.html = "";
}
//Called when an event in package.json.activationEvents occurs
export function activate(context: vscode.ExtensionContext) {
  console.log('Codebase Insights extension activated!');

  vscode.window.registerTreeDataProvider(
    'codebaseInsightsTree',
    new CodebaseInsightsViewProvider()
  );


  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.overview', () => {
      // Create and show a new webview
      overviewPanel();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.code-map', () => {
      // Create and show a new webview
      codeMapPanel();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.knowledge-graph', () => {
      // Create and show a new webview
      knowledgeGraphPanel();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.insights', () => {
      // Create and show a new webview
      insightsPanel();
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
