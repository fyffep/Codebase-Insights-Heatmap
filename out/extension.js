"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.CodebaseInsightsViewProvider = exports.CodeBaseInsightsView = exports.activate = void 0;
const vscode = require("vscode");
//Factory methods for our webviews using the singleton pattern
function overviewPanel() {
    const panel = vscode.window.createWebviewPanel('overviewPage', 'Overview', vscode.ViewColumn.One, {});
    panel.webview.html = ""; //This is where we will put the html content for the view later
}
function codeMapPanel() {
    const panel = vscode.window.createWebviewPanel('codeMapPage', 'Code Map', vscode.ViewColumn.One, {});
    panel.webview.html = ""; //html for webview goes here
}
function knowledgeGraphPanel() {
    const panel = vscode.window.createWebviewPanel('knowledgeGraph', 'Knowledge Graph', vscode.ViewColumn.One, {});
    panel.webview.html = "";
}
function insightsPanel() {
    const panel = vscode.window.createWebviewPanel('insights', 'Insights', vscode.ViewColumn.One, {});
    panel.webview.html = "";
}
//Called when an event in package.json.activationEvents occurs
function activate(context) {
    console.log('Codebase Insights extension activated!');
    vscode.window.registerTreeDataProvider('codebaseInsightsTree', new CodebaseInsightsViewProvider());
    context.subscriptions.push(vscode.commands.registerCommand('codebase-insights.overview', () => {
        // Create and show a new webview
        overviewPanel();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('codebase-insights.code-map', () => {
        // Create and show a new webview
        codeMapPanel();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('codebase-insights.knowledge-graph', () => {
        // Create and show a new webview
        knowledgeGraphPanel();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('codebase-insights.insights', () => {
        // Create and show a new webview
        insightsPanel();
    }));
}
exports.activate = activate;
class CodeBaseInsightsView extends vscode.TreeItem {
    constructor(label, collapsibleState, description) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.description = description;
        this.tooltip = `${this.description}`;
        this.description = '';
        this.command = this.getCommand(label);
    }
    getCommand(label) {
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
exports.CodeBaseInsightsView = CodeBaseInsightsView;
class CodebaseInsightsViewProvider {
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return Promise.resolve(this.getViews());
    }
    getViews() {
        let views = [];
        let overview = new CodeBaseInsightsView('Overview', vscode.TreeItemCollapsibleState.None, 'A broad overview of your codebase to get a quick peek at your project');
        let map = new CodeBaseInsightsView('Code Map', vscode.TreeItemCollapsibleState.None, 'A configurable heatmap for viewing your codebase graphically and analyzing various metrics as a gradient');
        let knowledge = new CodeBaseInsightsView('Knowledge Graph', vscode.TreeItemCollapsibleState.None, 'A graph showing the areas where each contributor on your project has knowledge');
        let insights = new CodeBaseInsightsView('Insights', vscode.TreeItemCollapsibleState.None, 'Create custom queries to analyze your codebase');
        views = [overview, map, knowledge, insights];
        return views;
    }
}
exports.CodebaseInsightsViewProvider = CodebaseInsightsViewProvider;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map