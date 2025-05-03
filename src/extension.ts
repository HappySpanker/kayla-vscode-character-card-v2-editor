import * as vscode from 'vscode';
import { CardTreeDataProvider } from './providers/cardTreeDataProvider';
import { LorebookTreeDataProvider } from './providers/lorebookTreeDataProvider';
import { CardStore } from './stores/cardStore';

export function activate(context: vscode.ExtensionContext) {
	
	// Build graph
	const cardStore = new CardStore();
	const cardTreeDataProvider = new CardTreeDataProvider(cardStore);

	const lorebookTreeDataProvider = new LorebookTreeDataProvider();

	vscode.window.registerTreeDataProvider("v2-editor:cards", cardTreeDataProvider);
	vscode.window.registerTreeDataProvider("v2-editor:lorebooks", lorebookTreeDataProvider);
}

export function deactivate() {}
