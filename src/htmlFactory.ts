import * as overview from './overview';
import * as codeMap from './codeMap';
import * as knowledgeGraph from './knowledgeGraph';
import * as insights from './insights';
export function generateOverviewHTML(): string {
    return overview.overviewHTML();
}
export function generateCodeMapHTML(): string {
    return codeMap.codemapHTML();
}
export function generateKnowledgeGraphHTML(): string {
    return knowledgeGraph.knowledgeGraphHTML();
}
export function generateInsightsHTML(): string {
    return insights.insightsHTML();
}