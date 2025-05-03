import * as vscode from 'vscode';
import { CardPngTreeDataProvider } from './providers/cardPngTreeDataProvider';
import { CardJsonTreeDataProvider } from './providers/cardJsonTreeDataProvider';
import { LorebookTreeDataProvider } from './providers/lorebookTreeDataProvider';

export function activate(context: vscode.ExtensionContext) {
	
	vscode.window.registerTreeDataProvider("v2-editor:cardJson", new CardJsonTreeDataProvider());
	vscode.window.registerTreeDataProvider("v2-editor:cardPng", new CardPngTreeDataProvider());
	vscode.window.registerTreeDataProvider("v2-editor:lorebook", new LorebookTreeDataProvider());
}

export function deactivate() {}
