import * as vscode from 'vscode';
import { CardTreeDataProvider } from './100.ui/providers/cardTreeDataProvider';
import { LorebookTreeDataProvider } from './100.ui/providers/lorebookTreeDataProvider';
import { CardStore } from './200.logic/stores/cardStore';
import { CardRepository } from './300.persistence/repositories/cardRepository';
import { CustomCardEditorProvider } from './100.ui/customCardEditorProvider';
import { AssetProvider } from './901.utils/assetProvider';

export function activate(context: vscode.ExtensionContext) {
	
	// Build graph
	const assetProvider = new AssetProvider(context);

	const cardRepository = new CardRepository();
	const cardStore = new CardStore(cardRepository);
	const cardTreeDataProvider = new CardTreeDataProvider(cardStore);

	const lorebookTreeDataProvider = new LorebookTreeDataProvider();

	vscode.window.registerTreeDataProvider("v2-editor:cards", cardTreeDataProvider);
	vscode.window.registerTreeDataProvider("v2-editor:lorebooks", lorebookTreeDataProvider);
	vscode.window.registerCustomEditorProvider("v2-editor:main", new CustomCardEditorProvider(assetProvider, cardStore));
}

export function deactivate() {}
