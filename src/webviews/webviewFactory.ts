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
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src/webviews/overview'))]
        }
        );

        const cssOnDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src/webviews/overview', 'overview.css'),
            );
        const cssUri = overviewWebviewPanel.webview.asWebviewUri(cssOnDiskPath);
        const scriptOnDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src/webviews/overview', 'overviewScript.js'),
            );
        const scriptUri = overviewWebviewPanel.webview.asWebviewUri(cssOnDiskPath);

        overviewWebviewPanel.webview.html = htmlFactory.generateOverviewHTML(cssUri, scriptUri); 
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
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src/webviews/codeMap'))]
        }
        );

        const cssOnDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src/webviews/codeMap', 'codeMap.css')
            );
        const cssUri = codeMapWebviewPanel.webview.asWebviewUri(cssOnDiskPath);
        const scriptOnDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src/webviews/codeMap', 'codeMapScript.js')
            );
        const scriptUri = codeMapWebviewPanel.webview.asWebviewUri(scriptOnDiskPath);

        codeMapWebviewPanel.webview.html = htmlFactory.generateCodeMapHTML(cssUri, scriptUri); 
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
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src/webviews/knowledgeGraph'))]
        }
        );

        const cssOnDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src/webviews/knowledgeGraph', 'knowledgeGraph.css')
            );
        const cssUri = knowledgeGraphWebviewPanel.webview.asWebviewUri(cssOnDiskPath);
        const scriptOnDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src/webviews/knowledgeGraph', 'knowledgeGraphScript.js')
            );
        const scriptUri = knowledgeGraphWebviewPanel.webview.asWebviewUri(scriptOnDiskPath);

        knowledgeGraphWebviewPanel.webview.html = htmlFactory.generateKnowledgeGraphHTML(cssUri, scriptUri); 
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
            localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'src/webviews/insights'))]
        }
        );

        const cssOnDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src/webviews/insights', 'insights.css')
            );
        const cssUri = insightsWebviewPanel.webview.asWebviewUri(cssOnDiskPath);
        const scriptOnDiskPath = vscode.Uri.file(
            path.join(context.extensionPath, 'src/webviews/insights', 'insightsScript.js')
            );
        const scriptUri = insightsWebviewPanel.webview.asWebviewUri(scriptOnDiskPath);

        insightsWebviewPanel.webview.html = htmlFactory.generateInsightsHTML(cssUri, scriptUri); 
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
