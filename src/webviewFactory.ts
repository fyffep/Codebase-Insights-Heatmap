import * as vscode from 'vscode';
import * as extension from './extension';

var overviewWebviewPanel: vscode.WebviewPanel | undefined;
var codeMapWebviewPanel: vscode.WebviewPanel | undefined;
var knowledgeGraphWebviewPanel: vscode.WebviewPanel | undefined;
var insightsWebviewPanel: vscode.WebviewPanel | undefined;


export function overviewPanel(): void {
    safelyDisposeWebviewPanel(codeMapWebviewPanel);
    safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
    safelyDisposeWebviewPanel(insightsWebviewPanel);
    if (overviewWebviewPanel) {
        overviewWebviewPanel.reveal(vscode.ViewColumn.One);
    } else {
        overviewWebviewPanel = vscode.window.createWebviewPanel(
        'overviewPage',
        'Overview',
        vscode.ViewColumn.One,
        {}
        );
        overviewWebviewPanel.webview.html = ""; //This is where we will put the html content for the view later
    }
}
export function codeMapPanel(): void {
    safelyDisposeWebviewPanel(overviewWebviewPanel);
    safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
    safelyDisposeWebviewPanel(insightsWebviewPanel);
    if (codeMapWebviewPanel) {
        codeMapWebviewPanel.reveal(vscode.ViewColumn.One);
    } else {
        codeMapWebviewPanel = vscode.window.createWebviewPanel(
        'codeMapPage',
        'Code Map',
        vscode.ViewColumn.One,
        {}
        );
        codeMapWebviewPanel.webview.html = ""; //This is where we will put the html content for the view later
    }
}

export function knowledgeGraphPanel(): void {
    safelyDisposeWebviewPanel(overviewWebviewPanel);
    safelyDisposeWebviewPanel(codeMapWebviewPanel);
    safelyDisposeWebviewPanel(insightsWebviewPanel);
    if (knowledgeGraphWebviewPanel) {
        knowledgeGraphWebviewPanel.reveal(vscode.ViewColumn.One);
    } else {
        knowledgeGraphWebviewPanel = vscode.window.createWebviewPanel(
        'knowledgeGraph',
        'Knowledge Graph',
        vscode.ViewColumn.One,
        {}
        );
        knowledgeGraphWebviewPanel.webview.html = ""; //This is where we will put the html content for the view later
    }
}

export function insightsPanel(): void {
    safelyDisposeWebviewPanel(overviewWebviewPanel);
    safelyDisposeWebviewPanel(codeMapWebviewPanel);
    safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
    if (insightsWebviewPanel) {
        insightsWebviewPanel.reveal(vscode.ViewColumn.One);
    } else {
        insightsWebviewPanel = vscode.window.createWebviewPanel(
        'insights',
        'Insights',
        vscode.ViewColumn.One,
        {}
        );
        insightsWebviewPanel.webview.html = ""; //This is where we will put the html content for the view later
    }
}

function safelyDisposeWebviewPanel(webview: vscode.WebviewPanel | undefined): void {
    if (webview) {
        webview.dispose();
    }
}