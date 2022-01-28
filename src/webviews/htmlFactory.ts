import * as overview from './overview/overview';
import * as codeMap from './codeMap/codeMap';
import * as knowledgeGraph from './knowledgeGraph/knowledgeGraph';
import * as insights from './insights/insights';
import * as commitRiskAssessment from './commitRiskAssessment/commitRiskAssessment';
import * as vscode from 'vscode';

export function generateOverviewHTML(cssUri: vscode.Uri, scriptUri: vscode.Uri): string {
    return overview.overviewHTML(cssUri, scriptUri);
}
export function generateCodeMapHTML(cssUri: vscode.Uri, scriptUri: vscode.Uri,  d3Uri: vscode.Uri): string {
    return codeMap.codemapHTML(cssUri, scriptUri, d3Uri);
}
export function generateCommitRiskAssessmentHTML(cssUri: vscode.Uri, scriptUri: vscode.Uri): string {
    return commitRiskAssessment.commitRiskAssessmentHTML(cssUri, scriptUri);
}
export function generateKnowledgeGraphHTML(cssUri: vscode.Uri, scriptUri: vscode.Uri): string {
    return knowledgeGraph.knowledgeGraphHTML(cssUri, scriptUri);
}
export function generateInsightsHTML(cssUri: vscode.Uri, scriptUri: vscode.Uri): string {
    return insights.insightsHTML(cssUri, scriptUri);
}