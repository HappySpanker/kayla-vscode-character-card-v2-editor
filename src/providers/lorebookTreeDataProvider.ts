import * as vscode from 'vscode'
import { LorebookTreeItem } from '../models/lorebookTreeItem';

/* Handles calling stores to fill a UI TreeView for lorebooks */
export class LorebookTreeDataProvider implements vscode.TreeDataProvider<LorebookTreeItem> {

    onDidChangeTreeData?: vscode.Event<void | LorebookTreeItem | LorebookTreeItem[] | null | undefined> | undefined;

    getTreeItem(element: LorebookTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: LorebookTreeItem | undefined): vscode.ProviderResult<LorebookTreeItem[]> {
        return [
            new LorebookTreeItem("Sample lorebook TreeItem")
        ];
    }

    getParent?(element: LorebookTreeItem): vscode.ProviderResult<LorebookTreeItem> {
        throw new Error('Method not implemented.');
    }

    resolveTreeItem?(item: vscode.TreeItem, element: LorebookTreeItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
        throw new Error('Method not implemented.');
    }
}