import path = require("path");
import * as vscode from "vscode";
import * as htmlFactory from "./htmlFactory";
import * as config from "../config/config";
import { settings } from "cluster";

//Webviews -- use these for message passing.
export let settingsWebviewPanel: vscode.WebviewPanel | undefined;
export let codeMapWebviewPanel: vscode.WebviewPanel | undefined;
export let coauthorshipNetworkWebviewPanel: vscode.WebviewPanel | undefined;
export let commitRiskAssessmentWebviewPanel: vscode.WebviewPanel | undefined;

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

    let args: Map<string, vscode.Uri> = new Map();
    args.set("css", cssUri);
    args.set("script", scriptUri);

    settingsWebviewPanel.webview.html = htmlFactory.generateSettingsHTML(args);
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

export function createOrShowCoauthorshipNetworkPanel(
  context: vscode.ExtensionContext
): void {
  safelyDisposeAllButCoauthorshipNetwork();
  if (coauthorshipNetworkWebviewPanel) {
    coauthorshipNetworkWebviewPanel.reveal(preferredColumn);
  } else {
    coauthorshipNetworkWebviewPanel = vscode.window.createWebviewPanel(
      "coauthorshipNetwork",
      "Coauthorship Network",
      preferredColumn,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(
            path.join(context.extensionPath, "src/webviews/coauthorshipNetwork")
          ),
          vscode.Uri.file(path.join(context.extensionPath, "resources/d3")),
        ],
      }
    );

    const cssOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/coauthorshipNetwork",
        "coauthorshipNetwork.css"
      )
    );
    const cssUri =
      coauthorshipNetworkWebviewPanel.webview.asWebviewUri(cssOnDiskPath);
    const coauthorshipNetworkScriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/coauthorshipNetwork",
        "coauthorshipNetworkScript.js"
      )
    );
    const coauthorshipNetworkScriptUri =
      coauthorshipNetworkWebviewPanel.webview.asWebviewUri(
        coauthorshipNetworkScriptOnDiskPath
      );

    const controlPanelScriptOnDiskPath = vscode.Uri.file(
      path.join(
        context.extensionPath,
        "src/webviews/coauthorshipNetwork",
        "controlPanel.js"
      )
    );
    const controlPanelScriptUri =
      coauthorshipNetworkWebviewPanel.webview.asWebviewUri(
        controlPanelScriptOnDiskPath
      );

    const d3OnDiskPath = vscode.Uri.file(
      path.join(context.extensionPath, "resources/d3", "d3.min.js")
    );
    const d3Uri = coauthorshipNetworkWebviewPanel.webview.asWebviewUri(d3OnDiskPath);

    let args: Map<string, vscode.Uri> = new Map();
    args.set("css", cssUri);
    args.set("coauthorshipNetworkScript", coauthorshipNetworkScriptUri);
    args.set("controlPanelScript", controlPanelScriptUri);
    args.set("d3", d3Uri);

    coauthorshipNetworkWebviewPanel.webview.html =
      htmlFactory.generateCoauthorshipNetworkHTML(args);
    coauthorshipNetworkWebviewPanel.onDidDispose(() => {
      coauthorshipNetworkWebviewPanel = undefined;
    });
    coauthorshipNetworkWebviewPanel.webview.onDidReceiveMessage((message) => {
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


function safelyDisposeWebviewPanel(
  webview: vscode.WebviewPanel | undefined
): void {
  if (webview) {
    webview.dispose();
  }
}

function safelyDisposeAllBut(panel: vscode.WebviewPanel | undefined): void {
  let panels = [
    coauthorshipNetworkWebviewPanel,
    commitRiskAssessmentWebviewPanel,
    codeMapWebviewPanel,
    settingsWebviewPanel,
  ];
  for (let i = 0; i < panels.length; i++) {
    if (panels[i] !== panel) {
      safelyDisposeWebviewPanel(panels[i]);
    }
  }
}

function safelyDisposeAllButCodeMap(): void {
  safelyDisposeAllBut(codeMapWebviewPanel);
}

function safelyDisposeAllButCoauthorshipNetwork(): void {
  safelyDisposeAllBut(coauthorshipNetworkWebviewPanel);
}

function safelyDisposeAllButCommitRiskAssessment(): void {
  safelyDisposeAllBut(commitRiskAssessmentWebviewPanel);
}

function safelyDisposeAllButSettings(): void {
  safelyDisposeAllBut(settingsWebviewPanel);
}
