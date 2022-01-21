import * as overview from './overview/overview';
import * as codeMap from './codeMap/codeMap';
import * as knowledgeGraph from './knowledgeGraph/knowledgeGraph';
import * as insights from './insights/insights';
import * as vscode from 'vscode';

export function generateOverviewHTML(cssUri: vscode.Uri): string {
    return overview.overviewHTML(cssUri);
}
export function generateCodeMapHTML(cssUri: vscode.Uri): string {
    return codeMap.codemapHTML(cssUri);
}
export function generateKnowledgeGraphHTML(cssUri: vscode.Uri): string {
    return knowledgeGraph.knowledgeGraphHTML(cssUri);
}
export function generateInsightsHTML(cssUri: vscode.Uri): string {
    return insights.insightsHTML(cssUri);
}