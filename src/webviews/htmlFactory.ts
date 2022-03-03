import * as overview from "./overview/overview";
import * as codeMap from "./codeMap/codeMap";
import * as knowledgeGraph from "./knowledgeGraph/knowledgeGraph";
import * as insights from "./insights/insights";
import * as commitRiskAssessment from "./commitRiskAssessment/commitRiskAssessment";
import * as settings from "./settings/settings";
import * as vscode from "vscode";

//args maps names to external script/css files
//i.e. args.get("d3") === d3Uri: vscode.Uri
export function generateOverviewHTML(args: Map<string, vscode.Uri>): string {
  return overview.overviewHTML(args);
}
export function generateCodeMapHTML(args: Map<string, vscode.Uri>): string {
  return codeMap.codemapHTML(args);
}
export function generateCommitRiskAssessmentHTML(
  args: Map<string, vscode.Uri>
): string {
  return commitRiskAssessment.commitRiskAssessmentHTML(args);
}
export function generateKnowledgeGraphHTML(
  args: Map<string, vscode.Uri>
): string {
  return knowledgeGraph.knowledgeGraphHTML(args);
}
export function generateInsightsHTML(args: Map<string, vscode.Uri>): string {
  return insights.insightsHTML(args);
}
export function generateSettingsHTML(args: Map<string, vscode.Uri>): string {
  return settings.settingsHTML(args);
}
