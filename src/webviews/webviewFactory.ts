import { settings } from "cluster";
import path = require("path");
import * as vscode from "vscode";
import * as htmlFactory from "./htmlFactory";
import * as config from "../config/config";

//Webviews -- use these for message passing.
export let settingsWebviewPanel: vscode.WebviewPanel | undefined;
export let overviewWebviewPanel: vscode.WebviewPanel | undefined;
export let codeMapWebviewPanel: vscode.WebviewPanel | undefined;
export let knowledgeGraphWebviewPanel: vscode.WebviewPanel | undefined;
export let commitRiskAssessmentWebviewPanel: vscode.WebviewPanel | undefined;
export let insightsWebviewPanel: vscode.WebviewPanel | undefined;

const preferredColumn: vscode.ViewColumn = vscode.ViewColumn.One;

export function createOrShowSettingsPanel(
  context: vscode.ExtensionContext
): void {
  safelyDisposeAllButSettings();
  if (settingsWebviewPanel) {
    settingsWebviewPanel.reveal(preferredColumn);
  } else {
    settingsWebviewPanel = vscode.window.createWebviewPanel(
      "settingsPage",
      "Settings",
      preferredColumn,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(
            path.join(context.extensionPath, "src/webviews/settings")
          ),
        ],
      }
    );

    const cssOnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "src/webviews/settings", "settings.css")
    );
    const cssUri = settingsWebviewPanel.webview.asWebviewUri(cssOnDiskPath);
    const scriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/settings",
        "settingsScript.js"
      )
    );
    const scriptUri =
      settingsWebviewPanel.webview.asWebviewUri(scriptOnDiskPath);

    settingsWebviewPanel.webview.html = htmlFactory.generateSettingsHTML(
      cssUri,
      scriptUri
    );
    settingsWebviewPanel.onDidDispose(() => {
      settingsWebviewPanel = undefined;
    });
    settingsWebviewPanel.webview.onDidReceiveMessage((message) => {
      switch (message.command) {
        case "updateGitUrl":
          config.setGitUrl(message.data);
          vscode.window.showInformationMessage("Git url updated!");
          break;
        default:
          break;
      }
    });
  }
}

export function createOrShowOverviewPanel(
  context: vscode.ExtensionContext
): void {
  safelyDisposeAllButOverview();
  if (overviewWebviewPanel) {
    overviewWebviewPanel.reveal(preferredColumn);
  } else {
    overviewWebviewPanel = vscode.window.createWebviewPanel(
      "overviewPage",
      "Overview",
      preferredColumn,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(
            path.join(context.extensionPath, "src/webviews/overview")
          ),
        ],
      }
    );

    const cssOnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "src/webviews/overview", "overview.css")
    );
    const cssUri = overviewWebviewPanel.webview.asWebviewUri(cssOnDiskPath);
    const scriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/overview",
        "overviewScript.js"
      )
    );
    const scriptUri =
      overviewWebviewPanel.webview.asWebviewUri(scriptOnDiskPath);

    overviewWebviewPanel.webview.html = htmlFactory.generateOverviewHTML(
      cssUri,
      scriptUri
    );
    overviewWebviewPanel.onDidDispose(() => {
      overviewWebviewPanel = undefined;
    });
  }
}

export function createOrShowCodeMapPanel(
  context: vscode.ExtensionContext
): void {
  safelyDisposeAllButCodeMap();
  if (codeMapWebviewPanel) {
    codeMapWebviewPanel.reveal(preferredColumn);
  } else {
    codeMapWebviewPanel = vscode.window.createWebviewPanel(
      "codeMapPage",
      "Code Map",
      preferredColumn,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(
            path.join(context.extensionPath, "src/webviews/codeMap")
          ),
          vscode.Uri.file(path.join(context.extensionPath, "resources/d3")),
        ],
      }
    );

    const cssOnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "src/webviews/codeMap", "codeMap.css")
    );
    const cssUri = codeMapWebviewPanel.webview.asWebviewUri(cssOnDiskPath);
    const scriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/codeMap",
        "codeMapScript.js"
      )
    );
    const scriptUri =
      codeMapWebviewPanel.webview.asWebviewUri(scriptOnDiskPath);

    const d3OnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "resources/d3", "d3.min.js")
    );
    const d3Uri = codeMapWebviewPanel.webview.asWebviewUri(d3OnDiskPath);

    codeMapWebviewPanel.webview.html = htmlFactory.generateCodeMapHTML(
      cssUri,
      scriptUri,
      d3Uri
    );
    codeMapWebviewPanel.onDidDispose(() => {
      codeMapWebviewPanel = undefined;
    });
  }
}

export function createOrShowKnowledgeGraphPanel(
  context: vscode.ExtensionContext
): void {
  safelyDisposeAllButKnowledgeGraph();
  if (knowledgeGraphWebviewPanel) {
    knowledgeGraphWebviewPanel.reveal(preferredColumn);
  } else {
    knowledgeGraphWebviewPanel = vscode.window.createWebviewPanel(
      "knowledgeGraph",
      "Knowledge Graph",
      preferredColumn,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(
            path.join(context.extensionPath, "src/webviews/knowledgeGraph")
          ),
          vscode.Uri.file(path.join(context.extensionPath, "resources/d3")),
        ],
      }
    );

    const cssOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/knowledgeGraph",
        "knowledgeGraph.css"
      )
    );
    const cssUri =
      knowledgeGraphWebviewPanel.webview.asWebviewUri(cssOnDiskPath);
    const scriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/knowledgeGraph",
        "knowledgeGraphScript.js"
      )
    );
    const scriptUri =
      knowledgeGraphWebviewPanel.webview.asWebviewUri(scriptOnDiskPath);

    const d3OnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "resources/d3", "d3.min.js")
    );
    const d3Uri = knowledgeGraphWebviewPanel.webview.asWebviewUri(d3OnDiskPath);
    knowledgeGraphWebviewPanel.webview.html =
      htmlFactory.generateKnowledgeGraphHTML(cssUri, scriptUri, d3Uri);
    knowledgeGraphWebviewPanel.onDidDispose(() => {
      knowledgeGraphWebviewPanel = undefined;
    });
  }
}

export function createOrShowCommitRiskAssessmentPanel(
  context: vscode.ExtensionContext
): void {
  safelyDisposeAllButCommitRiskAssessment();
  if (commitRiskAssessmentWebviewPanel) {
    commitRiskAssessmentWebviewPanel.reveal(preferredColumn);
  } else {
    commitRiskAssessmentWebviewPanel = vscode.window.createWebviewPanel(
      "commitRiskAssessment",
      "Commit Risk Assessment",
      preferredColumn,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(
            path.join(
              context.extensionPath,
              "src/webviews/commitRiskAssessment"
            )
          ),
        ],
      }
    );

    const cssOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/commitRiskAssessment",
        "commitRiskAssessment.css"
      )
    );
    const cssUri =
      commitRiskAssessmentWebviewPanel.webview.asWebviewUri(cssOnDiskPath);
    const scriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/commitRiskAssessment",
        "commitRiskAssessmentScript.js"
      )
    );
    const scriptUri =
      commitRiskAssessmentWebviewPanel.webview.asWebviewUri(scriptOnDiskPath);

    commitRiskAssessmentWebviewPanel.webview.html =
      htmlFactory.generateCommitRiskAssessmentHTML(cssUri, scriptUri);
    commitRiskAssessmentWebviewPanel.onDidDispose(() => {
      commitRiskAssessmentWebviewPanel = undefined;
    });
  }
}

export function createOrShowInsightsPanel(
  context: vscode.ExtensionContext
): void {
  safelyDisposeAllButInsights();
  if (insightsWebviewPanel) {
    insightsWebviewPanel.reveal(preferredColumn);
  } else {
    insightsWebviewPanel = vscode.window.createWebviewPanel(
      "insights",
      "Insights",
      preferredColumn,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(
            path.join(context.extensionPath, "src/webviews/insights")
          ),
        ],
      }
    );

    const cssOnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "src/webviews/insights", "insights.css")
    );
    const cssUri = insightsWebviewPanel.webview.asWebviewUri(cssOnDiskPath);
    const scriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/insights",
        "insightsScript.js"
      )
    );
    const scriptUri =
      insightsWebviewPanel.webview.asWebviewUri(scriptOnDiskPath);

    insightsWebviewPanel.webview.html = htmlFactory.generateInsightsHTML(
      cssUri,
      scriptUri
    );
    insightsWebviewPanel.onDidDispose(() => {
      insightsWebviewPanel = undefined;
    });
  }
}

function safelyDisposeWebviewPanel(
  webview: vscode.WebviewPanel | undefined
): void {
  if (webview) {
    webview.dispose();
  }
}

function safelyDisposeAllButSettings(): void {
  safelyDisposeWebviewPanel(overviewWebviewPanel);
  safelyDisposeWebviewPanel(codeMapWebviewPanel);
  safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
  safelyDisposeWebviewPanel(commitRiskAssessmentWebviewPanel);
  safelyDisposeWebviewPanel(insightsWebviewPanel);
}

function safelyDisposeAllButOverview(): void {
  safelyDisposeWebviewPanel(codeMapWebviewPanel);
  safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
  safelyDisposeWebviewPanel(insightsWebviewPanel);
  safelyDisposeWebviewPanel(commitRiskAssessmentWebviewPanel);
  safelyDisposeWebviewPanel(settingsWebviewPanel);
}

function safelyDisposeAllButCodeMap(): void {
  safelyDisposeWebviewPanel(overviewWebviewPanel);
  safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
  safelyDisposeWebviewPanel(insightsWebviewPanel);
  safelyDisposeWebviewPanel(commitRiskAssessmentWebviewPanel);
  safelyDisposeWebviewPanel(settingsWebviewPanel);
}

function safelyDisposeAllButKnowledgeGraph(): void {
  safelyDisposeWebviewPanel(overviewWebviewPanel);
  safelyDisposeWebviewPanel(codeMapWebviewPanel);
  safelyDisposeWebviewPanel(insightsWebviewPanel);
  safelyDisposeWebviewPanel(commitRiskAssessmentWebviewPanel);
  safelyDisposeWebviewPanel(settingsWebviewPanel);
}

function safelyDisposeAllButCommitRiskAssessment(): void {
  safelyDisposeWebviewPanel(overviewWebviewPanel);
  safelyDisposeWebviewPanel(codeMapWebviewPanel);
  safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
  safelyDisposeWebviewPanel(insightsWebviewPanel);
  safelyDisposeWebviewPanel(settingsWebviewPanel);
}

function safelyDisposeAllButInsights(): void {
  safelyDisposeWebviewPanel(overviewWebviewPanel);
  safelyDisposeWebviewPanel(codeMapWebviewPanel);
  safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
  safelyDisposeWebviewPanel(commitRiskAssessmentWebviewPanel);
  safelyDisposeWebviewPanel(settingsWebviewPanel);
}
