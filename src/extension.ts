import * as vscode from 'vscode';
import { CardTreeDataProvider } from './providers/cardTreeDataProvider';
import { LorebookTreeDataProvider } from './providers/lorebookTreeDataProvider';
import { CardStore } from './stores/cardStore';
import { CardRepository } from './repositories/cardRepository';

export function activate(context: vscode.ExtensionContext) {
	
	// Build graph
	const cardRepository = new CardRepository();
	const cardStore = new CardStore(cardRepository);
	const cardTreeDataProvider = new CardTreeDataProvider(cardStore);

	const lorebookTreeDataProvider = new LorebookTreeDataProvider();

	vscode.window.registerTreeDataProvider("v2-editor:cards", cardTreeDataProvider);
	vscode.window.registerTreeDataProvider("v2-editor:lorebooks", lorebookTreeDataProvider);
}

export function deactivate() {}
