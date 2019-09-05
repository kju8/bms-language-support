import * as vscode from 'vscode';

const BMS_MODE : vscode.DocumentSelector = { scheme: 'file', language: 'bms' };

import { BMSHoverProvider } from './HoverProvider';

function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.languages.registerHoverProvider(BMS_MODE, new BMSHoverProvider()));
}

function deactivate() {
	return undefined;
}

module.exports = { activate, deactivate };