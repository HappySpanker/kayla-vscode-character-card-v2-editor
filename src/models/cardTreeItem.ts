import * as vscode from 'vscode'
import { Card } from './core/card';

export class CardTreeItem extends vscode.TreeItem {

    /**
     * Builds up a CardTreeItem for the UI
     * @param card The Card core model to use
     */
    constructor(card : Card) {
        super(card.Name);

        this.id = card.Uri.toString(true);
    }
    
}