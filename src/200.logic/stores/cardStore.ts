import * as vscode from 'vscode';
import { CardTreeItem } from "../../900.shared/models/cardTreeItem";
import { CardRepository } from "../../300.persistence/repositories/cardRepository";
import { Store } from "./interfaces/store";
import { TavernCardV2 } from '../../900.shared/models/core/spec';

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
     * @returns A Promise of the newly built-up card
     */
    public async SafeUpdate(document: vscode.TextDocument, newCard: TavernCardV2) : Promise<void> {
        let card = await this.loadCardFromDocument(document);

        // Set custom extensions + map old
        newCard.data.extensions = {
            ...card.data.extensions
        };

        // Map fields:
        card.data = {...card.data, ...newCard.data};

        // Call repository
        this.cardRepository.Update(document.uri, card);
    }

    /**
     * Loads a TavernCardV2 from a vscode.TextEditor
     * @param document The VSCode TextDocument representing the TavernCardV2
     * @returns The actual TavenCardV2 instance
     */
    private async loadCardFromDocument(document: vscode.TextDocument) : Promise<TavernCardV2> {
        try {
            return Promise.resolve(
                JSON.parse(document.getText())
            );
        } catch {
            throw new Error("Unable to parse source data as JSON");
        }
    }
}