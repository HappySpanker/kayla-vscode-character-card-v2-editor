import * as vscode from 'vscode';
import { CardTreeItem } from '../models/cardTreeItem';
import { Store } from '../stores/interfaces/jsonStore';

/* Handles calling stores to fill a UI TreeView for cards */
export class CardTreeDataProvider implements vscode.TreeDataProvider<CardTreeItem> {

    constructor(private store : Store<CardTreeItem>) {}

    onDidChangeTreeData?: vscode.Event<void | CardTreeItem | CardTreeItem[] | null | undefined> | undefined;

    getTreeItem(element: CardTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: CardTreeItem | undefined): vscode.ProviderResult<CardTreeItem[]> {
        return this.store.retrieve();
    }

    getParent?(element: CardTreeItem): vscode.ProviderResult<CardTreeItem> {
        throw new Error('Method not implemented.');
    }

    resolveTreeItem?(item: vscode.TreeItem, element: CardTreeItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error('Method not implemented.');
    }

}