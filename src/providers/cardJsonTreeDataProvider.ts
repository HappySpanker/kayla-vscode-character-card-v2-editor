import * as vscode from 'vscode';
import { CardJsonTreeItem } from '../models/cardJsonTreeItem';
import { JsonStore } from '../stores/interfaces/jsonStore';

/* Handles calling stores to fill a UI TreeView for JSON cards */
export class CardJsonTreeDataProvider implements vscode.TreeDataProvider<CardJsonTreeItem> {

    constructor(private store : JsonStore<CardJsonTreeItem>) {}

    onDidChangeTreeData?: vscode.Event<void | CardJsonTreeItem | CardJsonTreeItem[] | null | undefined> | undefined;

    getTreeItem(element: CardJsonTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: CardJsonTreeItem | undefined): vscode.ProviderResult<CardJsonTreeItem[]> {
        return this.store.retrieve();
    }

    getParent?(element: CardJsonTreeItem): vscode.ProviderResult<CardJsonTreeItem> {
        throw new Error('Method not implemented.');
    }

    resolveTreeItem?(item: vscode.TreeItem, element: CardJsonTreeItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error('Method not implemented.');
    }

}