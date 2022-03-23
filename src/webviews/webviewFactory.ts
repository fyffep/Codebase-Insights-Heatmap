import path = require("path");
import * as vscode from "vscode";
import * as htmlFactory from "./htmlFactory";
import * as config from "../config/config";
import GithubOAuth from "../utils/GithubOAuth";
import { postCredentials } from "../api/api";

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

    //Image paths
    const jenkinsLogoOnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "src/webviews/settings", "jenkinsLogo.png")
    );
    const jenkinsLogoUri = settingsWebviewPanel.webview.asWebviewUri(jenkinsLogoOnDiskPath);
    const githubActionsLogoOnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "src/webviews/settings", "githubActionsLogo.png")
    );
    const githubActionsLogoUri = settingsWebviewPanel.webview.asWebviewUri(githubActionsLogoOnDiskPath);
    const noCILogoOnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "src/webviews/settings", "noCILogo.png")
    );
    const noCILogoUri = settingsWebviewPanel.webview.asWebviewUri(noCILogoOnDiskPath);

    //CSS & vanilla JS
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

    let args: Map<string, vscode.Uri> = new Map();
    args.set("css", cssUri);
    args.set("script", scriptUri);
    args.set("jenkinsLogo", jenkinsLogoUri);
    args.set("githubActionsLogo", githubActionsLogoUri);
    args.set("noCILogo", noCILogoUri);

    settingsWebviewPanel.webview.html = htmlFactory.generateSettingsHTML(args);
    settingsWebviewPanel.onDidDispose(() => {
      settingsWebviewPanel = undefined;
    });
    settingsWebviewPanel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "alert":
          vscode.window.showInformationMessage(message.data);
          break;
        case "copyGitUserCode":
          GithubOAuth.instance.copyUserCodeToClipboard(); //FIXME... userCode is undefined while GitHub Oauth is broken
          vscode.window.showInformationMessage("Copied to clipboard!");
          break;
        case "submitSettingsChange":
          const payload = message.data;
          config.setGitUrl(payload["githubUrl"]); //save GitHub URL locally
          postCredentials(payload, settingsWebviewPanel);
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

    const controlPanelScriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/codeMap",
        "codeMapControlPanel.js"
      )
    );
    const controlPanelScriptUri = codeMapWebviewPanel.webview.asWebviewUri(
      controlPanelScriptOnDiskPath
    );

    const radarChartScriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/codeMap",
        "radarChartScript.js"
      )
    );
    const radarChartScriptUri = codeMapWebviewPanel.webview.asWebviewUri(
      radarChartScriptOnDiskPath
    );

    const d3OnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "resources/d3", "d3.min.js")
    );
    const d3Uri = codeMapWebviewPanel.webview.asWebviewUri(d3OnDiskPath);

    let args: Map<string, vscode.Uri> = new Map();
    args.set("css", cssUri);
    args.set("codeMapScript", scriptUri);
    args.set("controlPanel", controlPanelScriptUri);
    args.set("d3", d3Uri);
    args.set("radarChart", radarChartScriptUri);

    codeMapWebviewPanel.webview.html = htmlFactory.generateCodeMapHTML(args);
    codeMapWebviewPanel.onDidDispose(() => {
      codeMapWebviewPanel = undefined;
    });
    codeMapWebviewPanel.webview.onDidReceiveMessage((message) => {
      vscode.window.showInformationMessage(message.data);
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
      knowledgeGraphWebviewPanel.webview.asWebviewUri(
        knowledgeGraphScriptOnDiskPath
      );

    const controlPanelScriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/knowledgeGraph",
        "controlPanel.js"
      )
    );
    const controlPanelScriptUri =
      knowledgeGraphWebviewPanel.webview.asWebviewUri(
        controlPanelScriptOnDiskPath
      );

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
      vscode.window.showInformationMessage(message.data);
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

function safelyDisposeAllButSettings(): void {
  safelyDisposeWebviewPanel(overviewWebviewPanel);
  safelyDisposeWebviewPanel(codeMapWebviewPanel);
  safelyDisposeWebviewPanel(knowledgeGraphWebviewPanel);
  safelyDisposeWebviewPanel(commitRiskAssessmentWebviewPanel);
  safelyDisposeWebviewPanel(insightsWebviewPanel);
}