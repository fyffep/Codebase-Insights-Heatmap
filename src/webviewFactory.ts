import * as vscode from 'vscode';

export function overviewPanel(): void {
  const panel = vscode.window.createWebviewPanel(
    'overviewPage',
    'Overview',
    vscode.ViewColumn.One,
    {}
  );
  panel.webview.html = ""; //This is where we will put the html content for the view later
}

export function codeMapPanel(): void {
  const panel = vscode.window.createWebviewPanel(
    'codeMapPage',
    'Code Map',
    vscode.ViewColumn.One,
    {}
  );
  panel.webview.html = ""; //html for webview goes here
}

export function knowledgeGraphPanel(): void {
  const panel = vscode.window.createWebviewPanel(
    'knowledgeGraph',
    'Knowledge Graph',
    vscode.ViewColumn.One,
    {}
  );
  panel.webview.html = "";
}

export function insightsPanel(): void {
  const panel = vscode.window.createWebviewPanel(
    'insights',
    'Insights',
    vscode.ViewColumn.One,
    {}
  );
  panel.webview.html = "";
}