import path = require("path");
import * as vscode from "vscode";
import * as htmlFactory from "./htmlFactory";

//Webviews -- use these for message passing.
export let overviewWebviewPanel: vscode.WebviewPanel | undefined;
export let codeMapWebviewPanel: vscode.WebviewPanel | undefined;
export let knowledgeGraphWebviewPanel: vscode.WebviewPanel | undefined;
export let commitRiskAssessmentWebviewPanel: vscode.WebviewPanel | undefined;
export let insightsWebviewPanel: vscode.WebviewPanel | undefined;

const preferredColumn: vscode.ViewColumn = vscode.ViewColumn.One;

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

    let args: Map<string, vscode.Uri> = new Map();
    args.set("css", cssUri);
    args.set("script", scriptUri);

    overviewWebviewPanel.webview.html = htmlFactory.generateOverviewHTML(args);
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

    let args: Map<string, vscode.Uri> = new Map();
    args.set("css", cssUri);
    args.set("script", scriptUri);
    args.set("d3", d3Uri);

    codeMapWebviewPanel.webview.html = htmlFactory.generateCodeMapHTML(args);
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
    const knowledgeGraphScriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/knowledgeGraph",
        "knowledgeGraphScript.js"
      )
    );
    const knowledgeGraphScriptUri =
      knowledgeGraphWebviewPanel.webview.asWebviewUri(knowledgeGraphScriptOnDiskPath);
    
    const controlPanelScriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/knowledgeGraph",
        "controlPanel.js"
      )
    );
    const controlPanelScriptUri =
      knowledgeGraphWebviewPanel.webview.asWebviewUri(controlPanelScriptOnDiskPath);

    const d3OnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "resources/d3", "d3.min.js")
    );
    const d3Uri = knowledgeGraphWebviewPanel.webview.asWebviewUri(d3OnDiskPath);

    let args: Map<string, vscode.Uri> = new Map();
    args.set("css", cssUri);
    args.set("knowledgeGraphScript", knowledgeGraphScriptUri);
    args.set("controlPanelScript", controlPanelScriptUri);
    args.set("d3", d3Uri);

    knowledgeGraphWebviewPanel.webview.html =
      htmlFactory.generateKnowledgeGraphHTML(args);
    knowledgeGraphWebviewPanel.onDidDispose(() => {
      knowledgeGraphWebviewPanel = undefined;
    });
    knowledgeGraphWebviewPanel.webview.onDidReceiveMessage((message) => {
      vscode.window.showInformationMessage("Thanks for pressing that button!");
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

    let args: Map<string, vscode.Uri> = new Map();
    args.set("css", cssUri);
    args.set("script", scriptUri);

    commitRiskAssessmentWebviewPanel.webview.html =
      htmlFactory.generateCommitRiskAssessmentHTML(args);
    commitRiskAssessmentWebviewPanel.onDidDispose(() => {
      commitRiskAssessmentWebviewPanel = undefined;
    });
  }
}

export function createOrShowInsightsPanel(
  context: vscode.ExtensionContext
): void {
  safelyDisposeAllButInsightsPanel();
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

    let args: Map<string, vscode.Uri> = new Map();
    args.set("css", cssUri);
    args.set("script", scriptUri);

    insightsWebviewPanel.webview.html = htmlFactory.generateInsightsHTML(args);
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

function safelyDisposeAllButOverview(): void {
  safelyDisposeWebviewPanel(codeMapWebviewPanel);
  safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
  safelyDisposeWebviewPanel(insightsWebviewPanel);
  safelyDisposeWebviewPanel(commitRiskAssessmentWebviewPanel);
}

function safelyDisposeAllButCodeMap(): void {
  safelyDisposeWebviewPanel(overviewWebviewPanel);
  safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
  safelyDisposeWebviewPanel(insightsWebviewPanel);
  safelyDisposeWebviewPanel(commitRiskAssessmentWebviewPanel);
}

function safelyDisposeAllButKnowledgeGraph(): void {
  safelyDisposeWebviewPanel(overviewWebviewPanel);
  safelyDisposeWebviewPanel(codeMapWebviewPanel);
  safelyDisposeWebviewPanel(insightsWebviewPanel);
  safelyDisposeWebviewPanel(commitRiskAssessmentWebviewPanel);
}

function safelyDisposeAllButCommitRiskAssessment(): void {
  safelyDisposeWebviewPanel(overviewWebviewPanel);
  safelyDisposeWebviewPanel(codeMapWebviewPanel);
  safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
  safelyDisposeWebviewPanel(insightsWebviewPanel);
}

function safelyDisposeAllButInsightsPanel(): void {
  safelyDisposeWebviewPanel(overviewWebviewPanel);
  safelyDisposeWebviewPanel(codeMapWebviewPanel);
  safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
  safelyDisposeWebviewPanel(commitRiskAssessmentWebviewPanel);
}
