import * as vscode from 'vscode';
import { Card } from "../models/core/card";
import { TavernCardV2 } from '../models/core/spec';

export class CardRepository {

    /**
     * Queries the workspace for JSON and PNG files
     * @returns A Thenable ot Card[]
     */
    public List() : Thenable<Card[]> {
        return vscode.workspace.findFiles("**/*.{json,png}")
            .then(uris => uris.map(uri => new Card(uri))) // For now, ignore subdirectories
    }

    /**
     * Updates a URI with the given card data
     * @param uri The URI of the file to update
     * @param card The card data to update the file with
     */
    public async Update(uri: vscode.Uri, card: TavernCardV2) : Promise<void> {
        const json = JSON.stringify(card, null, 3);
        const encodedJson = new TextEncoder().encode(json);

        await vscode.workspace.fs.writeFile(
            uri, 
            encodedJson
        );
    }
}