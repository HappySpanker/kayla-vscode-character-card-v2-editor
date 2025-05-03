import * as vscode from 'vscode';
import { CardPngTreeItem } from '../models/cardPngTreeItem';

/* Handles calling stores to fill a UI TreeView for PNG cards */
export class CardPngTreeDataProvider implements vscode.TreeDataProvider<CardPngTreeItem> {

    onDidChangeTreeData?: vscode.Event<void | CardPngTreeItem | CardPngTreeItem[] | null | undefined> | undefined;

    getTreeItem(element: CardPngTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: CardPngTreeItem | undefined): vscode.ProviderResult<CardPngTreeItem[]> {
        return [
            new CardPngTreeItem("Sample card (PNG) TreeItem")
        ];
    }

    getParent?(element: CardPngTreeItem): vscode.ProviderResult<CardPngTreeItem> {
        throw new Error('Method not implemented.');
    }

    resolveTreeItem?(item: vscode.TreeItem, element: CardPngTreeItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error('Method not implemented.');
    }

}