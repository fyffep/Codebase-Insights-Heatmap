"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.CodebaseInsightsViewProvider = exports.CodeBaseInsightsView = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Codebase Insights extension activated!');
    vscode.window.registerTreeDataProvider('codebaseInsightsTree', new CodebaseInsightsViewProvider());
}
exports.activate = activate;
class CodeBaseInsightsView extends vscode.TreeItem {
    constructor(label, collapsibleState, description, cmd) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.description = description;
        this.cmd = cmd;
        this.tooltip = `${this.description}`;
        this.description = "";
        this.command = cmd;
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
        let overview = new CodeBaseInsightsView("Overview", vscode.TreeItemCollapsibleState.None, "A broad overview of your codebase to get a quick peek at your project");
        let map = new CodeBaseInsightsView("Code Map", vscode.TreeItemCollapsibleState.None, "A configurable heatmap for viewing your codebase graphically and analyzing various metrics as a gradient");
        let knowledge = new CodeBaseInsightsView("Knowledge Graph", vscode.TreeItemCollapsibleState.None, "A graph showing the areas where each contributor on your project has knowledge");
        let insights = new CodeBaseInsightsView("Insights", vscode.TreeItemCollapsibleState.None, "Create custom queries to analyze your codebase");
        views = [overview, map, knowledge, insights];
        return views;
    }
}
exports.CodebaseInsightsViewProvider = CodebaseInsightsViewProvider;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map