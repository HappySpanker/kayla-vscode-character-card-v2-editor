import * as vscode from 'vscode';
import { CardPngTreeDataProvider } from './providers/cardPngTreeDataProvider';
import { CardJsonTreeDataProvider } from './providers/cardJsonTreeDataProvider';
import { LorebookTreeDataProvider } from './providers/lorebookTreeDataProvider';
import { CardJsonStore } from './stores/cardJsonStore';

export function activate(context: vscode.ExtensionContext) {
	
	// Build graph
	const cardJsonStore = new CardJsonStore();
	const cardJsonTreeDataProvider = new CardJsonTreeDataProvider(cardJsonStore);

	vscode.window.registerTreeDataProvider("v2-editor:cardJson", cardJsonTreeDataProvider);
	vscode.window.registerTreeDataProvider("v2-editor:cardPng", new CardPngTreeDataProvider());
	vscode.window.registerTreeDataProvider("v2-editor:lorebook", new LorebookTreeDataProvider());
}

export function deactivate() {}
