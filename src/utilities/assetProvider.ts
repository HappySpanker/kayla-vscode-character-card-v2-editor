import * as vscode from "vscode";

export class AssetProvider {

    constructor(
        private context: vscode.ExtensionContext
    ) {}

    /**
     * Loads an asset file as a Thenable string
     * @param path The path, a subpathof the 'asset' directory, to load
     * @returns 
     */
    public async loadText(path: string) : Promise<string> {
        // Build URI
        let uri = vscode.Uri.joinPath(
            this.context.extensionUri,
            "assets",
            path
        );

        // Use FS to read/load file
        return await vscode.workspace.fs.readFile(uri)
            .then(data => Buffer.from(data))
            .then(buffer => buffer.toString());
    }
}