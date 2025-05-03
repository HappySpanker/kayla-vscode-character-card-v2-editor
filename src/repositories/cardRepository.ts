import * as vscode from 'vscode';
import { Card } from "../models/core/card";

export class CardRepository {

    /**
     * Queries the workspace for JSON and PNG files
     * @returns A Thenable ot Card[]
     */
    public List() : Thenable<Card[]> {
        return vscode.workspace.findFiles("**/*.{json,png}")
            .then(uris => uris.map(uri => new Card(uri))) // For now, ignore subdirectories
    }
}