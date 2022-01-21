import path = require('path');
import * as vscode from 'vscode';
import * as htmlFactory from './htmlFactory';

let overviewWebviewPanel: vscode.WebviewPanel | undefined;
let codeMapWebviewPanel: vscode.WebviewPanel | undefined;
let knowledgeGraphWebviewPanel: vscode.WebviewPanel | undefined;
let insightsWebviewPanel: vscode.WebviewPanel | undefined;

const preferredColumn: vscode.ViewColumn = vscode.ViewColumn.One;

export function createOrShowOverviewPane(context:vscode.ExtensionContext): void {
    safelyDisposeAllButOverview();
    if (overviewWebviewPanel) {
        overviewWebviewPanel.reveal(preferredColumn);
    } else {
        overviewWebviewPanel = vscode.window.createWebviewPanel(
        'overviewPage',
        'Overview',
        preferredColumn,
        {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src'))]
        }
        );

        const onDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src', 'overview.css')
            );
        const cssUri = overviewWebviewPanel.webview.asWebviewUri(onDiskPath);

        overviewWebviewPanel.webview.html = htmlFactory.generateOverviewHTML(cssUri); 
        overviewWebviewPanel.onDidDispose(
            () => {
                overviewWebviewPanel = undefined;
            }
        );
    }
}

export function createOrShowCodeMapPane(context:vscode.ExtensionContext): void {
    safelyDisposeAllButCodeMap();
    if (codeMapWebviewPanel) {
        codeMapWebviewPanel.reveal(preferredColumn);
    } else {
        codeMapWebviewPanel = vscode.window.createWebviewPanel(
        'codeMapPage',
        'Code Map',
        preferredColumn,
        {
            enableScripts:true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src'))]
        }
        );

        const onDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src', 'codeMap.css')
            );
        const cssUri = codeMapWebviewPanel.webview.asWebviewUri(onDiskPath);

        codeMapWebviewPanel.webview.html = htmlFactory.generateCodeMapHTML(cssUri); //This is where we will put the html content for the view later
        codeMapWebviewPanel.onDidDispose( () => {
            codeMapWebviewPanel = undefined;
        });
    }
}

export function createOrShowKnowledgeGraphPane(context:vscode.ExtensionContext): void {
    safelyDisposeAllButKnowledgeGraph();
    if (knowledgeGraphWebviewPanel) {
        knowledgeGraphWebviewPanel.reveal(preferredColumn);
    } else {
        knowledgeGraphWebviewPanel = vscode.window.createWebviewPanel(
        'knowledgeGraph',
        'Knowledge Graph',
        preferredColumn,
        {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src'))]
        }
        );

        const onDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src', 'knowledgeGraph.css')
            );
        const cssUri = knowledgeGraphWebviewPanel.webview.asWebviewUri(onDiskPath);

        knowledgeGraphWebviewPanel.webview.html = htmlFactory.generateKnowledgeGraphHTML(cssUri); //This is where we will put the html content for the view later
        knowledgeGraphWebviewPanel.onDidDispose( () => {
            knowledgeGraphWebviewPanel = undefined;
        });
    }
}

export function createOrShowInsightsPane(context:vscode.ExtensionContext): void {
    safelyDisposeAllButInsightsPanel();
    if (insightsWebviewPanel) {
        insightsWebviewPanel.reveal(preferredColumn);
    } else {
        insightsWebviewPanel = vscode.window.createWebviewPanel(
        'insights',
        'Insights',
        preferredColumn,
        {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src'))]
        }
        );

        const onDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src', 'insights.css')
            );
        const cssUri = insightsWebviewPanel.webview.asWebviewUri(onDiskPath);

        insightsWebviewPanel.webview.html = htmlFactory.generateInsightsHTML(cssUri); //This is where we will put the html content for the view later
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

function safelyDisposeAllButOverview(): void {
    safelyDisposeWebviewPanel(codeMapWebviewPanel);
    safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
    safelyDisposeWebviewPanel(insightsWebviewPanel);
}

function safelyDisposeAllButCodeMap(): void {
    safelyDisposeWebviewPanel(overviewWebviewPanel);
    safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
    safelyDisposeWebviewPanel(insightsWebviewPanel);
}

function safelyDisposeAllButKnowledgeGraph(): void {
    safelyDisposeWebviewPanel(overviewWebviewPanel);
    safelyDisposeWebviewPanel(codeMapWebviewPanel);
    safelyDisposeWebviewPanel(insightsWebviewPanel);
}

function safelyDisposeAllButInsightsPanel(): void {
    safelyDisposeWebviewPanel(overviewWebviewPanel);
    safelyDisposeWebviewPanel(codeMapWebviewPanel);
    safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
}
