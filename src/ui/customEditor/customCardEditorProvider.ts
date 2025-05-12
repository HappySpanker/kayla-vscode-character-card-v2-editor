import * as vscode from "vscode";
import { AssetProvider } from "../../utilities/assetProvider";
import { CardStore } from "../../stores/cardStore";
import { WebViewMessage } from "../../models/messages/webViewMessage";

export class CustomCardEditorProvider implements vscode.CustomTextEditorProvider {
    
    private document?: vscode.TextDocument = undefined;
    private webviewPanel?: vscode.WebviewPanel = undefined;

    constructor(
        private assetProvider: AssetProvider,
        private cardStore: CardStore
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
            webviewPanel.webview.onDidReceiveMessage(await this.handleReceiveMessage, this);

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
        });
    }

    /**
     * Handles messages posted back to the extension from the webview
     * @param message The message from the webview
     */
    private async handleReceiveMessage(message: WebViewMessage) : Promise<void> {
        if (!this.document) {
            throw new Error("Document not set!");
        }

        let type = message?.type;

        if (!type) {
            console.warn(`Receive invalid message from from webview: ${message}`);
            return;
        }

        switch (type) {
            case "Update":
                await this.cardStore.SafeUpdate(this.document, message.card);
                break;
            default:
                console.warn(`Unable to handle message of type '${type}'`);
                break;
        }
    }
}