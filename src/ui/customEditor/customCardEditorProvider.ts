import path from "path/posix";
import { json, text } from "stream/consumers";
import * as vscode from "vscode";
import { workerData } from "worker_threads";
import { AssetProvider } from "../../utilities/assetProvider";

export class CustomCardEditorProvider implements vscode.CustomTextEditorProvider {

    constructor(
        private assetProvider: AssetProvider
    ) {}

    public async resolveCustomTextEditor(
        document: vscode.TextDocument, 
        webviewPanel: vscode.WebviewPanel, 
        token: vscode.CancellationToken): Promise<void> {

        // Not ideal; local function
        function updateWebView() {
            webviewPanel.webview.postMessage({
                type: "update",
                text: document.getText()
            });
        }

        webviewPanel.webview.options = {
            enableScripts: true
        };

        // Load from assets
        webviewPanel.webview.html = await this.loadHtmlFromAsset();

        // Handle updates
        const sub = vscode.workspace.onDidChangeTextDocument(
            (event) => {
                if (event.document.uri.toString() == document.uri.toString()) {
                    updateWebView();
                }
            }
        )

        // Initial refresh
        updateWebView();
    }

    /**
     * Handles loading HTML
     * @returns A Promise<string> with HTML
     */
    private async loadHtmlFromAsset() : Promise<string> {
        return await this.assetProvider.loadText("html/customCardEditor.html");
    }
}