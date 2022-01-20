import * as vscode from 'vscode';
import * as webviewFactory from './webviewFactory';
import { CodebaseInsightsViewProvider } from './CodeBaseInsightsViewProvider';

//Factory methods for our webviews using the singleton pattern
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
      webviewFactory.overviewPanel();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.code-map', () => {
      // Create and show a new webview
      webviewFactory.codeMapPanel();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.knowledge-graph', () => {
      // Create and show a new webview
      webviewFactory.knowledgeGraphPanel();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.insights', () => {
      // Create and show a new webview
      webviewFactory.insightsPanel();
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
