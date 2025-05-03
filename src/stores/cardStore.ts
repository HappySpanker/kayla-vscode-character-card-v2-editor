import { CardTreeItem } from "../models/cardTreeItem";
import { Store } from "./interfaces/jsonStore";

export class CardStore implements Store<CardTreeItem> {

    retrieve(): CardTreeItem[] | Thenable<CardTreeItem[]> {
        return [ new CardTreeItem("Sample CardJsonTreeItem from CardJsonStore") ];
    }

}