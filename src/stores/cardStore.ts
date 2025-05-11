import * as vscode from 'vscode';
import { CardTreeItem } from "../models/cardTreeItem";
import { CardRepository } from "../repositories/cardRepository";
import { Store } from "./interfaces/store";

export class CardStore implements Store<CardTreeItem> {

    constructor(
        private cardRepository: CardRepository
    ) {}

    /**
     * Lists the underlying CardReposity for cards
     * @returns A Thenable of CardTreeItems
     */
    public Retrieve(): CardTreeItem[] | Thenable<CardTreeItem[]> {
        return this.cardRepository.List()
            .then(cards => cards.sort((a, b) => a.Name.localeCompare(b.Name)))
            .then(cards => cards.map(card => new CardTreeItem(card)));
    }

    /**
     * The (safely) updates a card; ensuring extensions remain untouched as per-spect and that literal fields remain as such
     * @param document The document to update
     * @param data The new data to be merged into the updated card
     */
    public SafeUpdate(document: vscode.TextDocument, data: any) {
        // TBD: pending proper TavenCardV2 type
    }
}