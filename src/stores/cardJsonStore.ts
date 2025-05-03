import { CardJsonTreeItem } from "../models/cardJsonTreeItem";
import { JsonStore } from "./interfaces/jsonStore";

export class CardJsonStore implements JsonStore<CardJsonTreeItem> {

    retrieve(): CardJsonTreeItem[] | Thenable<CardJsonTreeItem[]> {
        return [ new CardJsonTreeItem("Sample CardJsonTreeItem from CardJsonStore") ];
    }

}