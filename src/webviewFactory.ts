import * as vscode from 'vscode';
import * as htmlFactory from './htmlFactory';

let overviewWebviewPanel: vscode.WebviewPanel | undefined;
let codeMapWebviewPanel: vscode.WebviewPanel | undefined;
let knowledgeGraphWebviewPanel: vscode.WebviewPanel | undefined;
let insightsWebviewPanel: vscode.WebviewPanel | undefined;

const preferredColumn: vscode.ViewColumn = vscode.ViewColumn.One;


export function overviewPanel(): void {
    safelyDisposeWebviewPanel(codeMapWebviewPanel);
    safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
    safelyDisposeWebviewPanel(insightsWebviewPanel);
    if (overviewWebviewPanel) {
        overviewWebviewPanel.reveal(preferredColumn);
    } else {
        overviewWebviewPanel = vscode.window.createWebviewPanel(
        'overviewPage',
        'Overview',
        preferredColumn,
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
        codeMapWebviewPanel.reveal(preferredColumn);
    } else {
        codeMapWebviewPanel = vscode.window.createWebviewPanel(
        'codeMapPage',
        'Code Map',
        preferredColumn,
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
        knowledgeGraphWebviewPanel.reveal(preferredColumn);
    } else {
        knowledgeGraphWebviewPanel = vscode.window.createWebviewPanel(
        'knowledgeGraph',
        'Knowledge Graph',
        preferredColumn,
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
        insightsWebviewPanel.reveal(preferredColumn);
    } else {
        insightsWebviewPanel = vscode.window.createWebviewPanel(
        'insights',
        'Insights',
        preferredColumn,
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