import * as vscode from "vscode";
import { AssetProvider } from "../../utilities/assetProvider";

export class CustomCardEditorProvider implements vscode.CustomTextEditorProvider {
    
    private document?: vscode.TextDocument = undefined;
    private webviewPanel?: vscode.WebviewPanel = undefined;

    constructor(
        private assetProvider: AssetProvider
    ) {}

    public async resolveCustomTextEditor(
        document: vscode.TextDocument, 
        webviewPanel: vscode.WebviewPanel, 
        token: vscode.CancellationToken): Promise<void> {

        this.document = document;
        this.webviewPanel = webviewPanel;

        webviewPanel.webview.options = {
            enableScripts: true
        };

        // Load from assets
        webviewPanel.webview.html = 
            await this.assetProvider.loadText("html/customCardEditor.html");

        // Handle updates from other TextDocument instances in the workspace
        // TBD: dispose?
        const sub = vscode.workspace.onDidChangeTextDocument(
            (event) => {
                if (event.document.uri.toString() === document.uri.toString()) {
                    this.updateWebView();
                }
            }
        );

        // Handle updates from the webView
        const webViewMsgSub = 
            webviewPanel.webview.onDidReceiveMessage(this.handleReceiveMessage);

        // Initial refresh
        this.updateWebView();
    }

    /**
     * Handles parsing the current TextDocument as a valid TavernCardV2 type
     */
    private async parseTextDocumentAsJson() : Promise<any> {
        if (this.document === undefined) {
            throw new Error("Local document of CustomCardEditorProvider in undefined; should be set in resolveCustomTextEditor!");
        }

        // For JSON files; just feed the whole JSON to the WebView
        return Promise.resolve(
            JSON.parse(this.document.getText())
        );
    }

    /**
     * Handles sending udpates to the WebView
     */
    private async updateWebView() : Promise<void> {
        if (this.webviewPanel === undefined) {
            throw new Error("Local webViewPanel of CustomCardEditorProvider in undefined; should be set in resolveCustomTextEditor!");
        }

        // Send a message with the card to the WebView as an update
        this.webviewPanel.webview.postMessage({
            type: "update",
            card: await this.parseTextDocumentAsJson()
        })
    }

    private handleReceiveMessage(message: any) : void {
        console.debug(message);
    }
}