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
            .then(cards => cards.map(card => new CardTreeItem(card)))
    }
}