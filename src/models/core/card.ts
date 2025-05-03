import path from 'node:path';
import * as vscode from 'vscode';

export class Card {

    public readonly Source : "JSON" | "PNG";
    public Name: string;

    constructor(
        public Uri : vscode.Uri,
    ) {
        this.Name = path.basename(this.Uri.path);
        
        // Determine type based on extension
        switch (path.extname(this.Uri.path).toUpperCase()) {
            case ".JSON":
                this.Source = "JSON";
                break;
            case ".PNG":
                this.Source = "PNG";
                break;
            default:
                throw new Error("Unexpected file extension: " + this.Uri.path);
        }
    }
}