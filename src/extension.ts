import * as vscode from 'vscode';
import * as webviewFactory from './webviewFactory';
import { CodebaseInsightsViewProvider } from './codeBaseInsightsViewProvider';
import path = require('path');

//This function is called when any of the events in package.json.activationEvents are thrown
export function activate(context: vscode.ExtensionContext) {
  console.log('Codebase Insights extension activated!');

  vscode.window.registerTreeDataProvider(
    'codebaseInsightsTree',
    new CodebaseInsightsViewProvider()
  );


  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.overview', () => {
      webviewFactory.createOrShowOverviewPane(context);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.code-map', () => {
      webviewFactory.createOrShowCodeMapPane(context);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.knowledge-graph', () => {
      webviewFactory.createOrShowKnowledgeGraphPane(context);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('codebase-insights.insights', () => {
      webviewFactory.createOrShowInsightsPane(context);
    })
  );
}

//If we need to close resources in the case where the user closes VSCode while our extension is running, this is where to do it
export function deactivate() {}
