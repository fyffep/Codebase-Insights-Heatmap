import * as vscode from 'vscode';
import * as htmlFactory from './htmlFactory';

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
        {
            enableScripts: true
        }
        );
        overviewWebviewPanel.webview.html = htmlFactory.generateOverviewHTML(); 
        overviewWebviewPanel.onDidDispose(
            () => {
                overviewWebviewPanel = undefined;
            }
        );
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
        {
            enableScripts:true
        }
        );
        codeMapWebviewPanel.webview.html = htmlFactory.generateCodeMapHTML(); //This is where we will put the html content for the view later
        codeMapWebviewPanel.onDidDispose( () => {
            codeMapWebviewPanel = undefined;
        });
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
        {
            enableScripts: true
        }
        );
        knowledgeGraphWebviewPanel.webview.html = htmlFactory.generateKnowledgeGraphHTML(); //This is where we will put the html content for the view later
        knowledgeGraphWebviewPanel.onDidDispose( () => {
            knowledgeGraphWebviewPanel = undefined;
        });
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
        {
            enableScripts: true
        }
        );
        insightsWebviewPanel.webview.html = htmlFactory.generateInsightsHTML(); //This is where we will put the html content for the view later
        insightsWebviewPanel.onDidDispose( () => {
            insightsWebviewPanel = undefined;
        });
    }
}

function safelyDisposeWebviewPanel(webview: vscode.WebviewPanel | undefined): void {
    if (webview) {
        webview.dispose();
    }
}