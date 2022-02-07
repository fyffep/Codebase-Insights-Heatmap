
import * as vscode from "vscode";
export default class GithubOAuth {

    private static readonly deviceIdKey: string = "CODE_INSIGHTS_DEVICE_ID";
    private static readonly accessTokenKey: string = "CODE_INSIGHTS_ACCESS_TOKEN";
    private static readonly userCodeKey: string = "CODE_INSIGHTS_USER_CODE";

    private static readonly cliendId: string = "013ff78674bdb9e132c6";
    

    private static _instance: GithubOAuth;
    private constructor() {

    }

    /**
     * Get singleton instance for the Connector to Global State Storage
     */
    public static get instance(): GithubOAuth {
        if (!this._instance) {
            this._instance = new GithubOAuth();
        }
        return this._instance;
    }


    public checkOAuthStatus(context: vscode.ExtensionContext): boolean {
        return !!context.globalState.get(GithubOAuth.deviceIdKey);
    }

    public fetchDeviceAndUserCode() : { deviceCode: string, userCode: string} {
        
        return undefined;
    }


}

