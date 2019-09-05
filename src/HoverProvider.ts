import { bmsCommand } from './types';
import * as bmsCommands from './commandList';

import * as vscode from 'vscode';
import * as path from 'path';

export class BMSHoverProvider implements vscode.HoverProvider {
	provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.Hover> {
		let fileName = process.platform === 'win32' ? document.fileName.replace(/\\/g, "/") : document.fileName;
		let obj = { path: path.dirname(fileName), fileName: path.basename(fileName) };
		let lineText = document.lineAt(position.line).text;
		if (lineText.match(/^\s*(?:[^\s#].*$|$)/g)) {
			return Promise.reject("no commands");
		}
		let commandRange = document.getWordRangeAtPosition(position, /(#[A-Z]+(?:[0-9]{2})?)(?:\s+(.*)$)?/i);
		let textMatch = lineText.match(/^\s*(#[A-Z\/]+[0-9]{0,2})(?:\s+(.*)$)?/i);
		if (textMatch !== null) { // definition commands
			let commandname = textMatch[1];
			let commandArgs = textMatch.slice(2);
			let returnValue: Promise<vscode.Hover> | undefined;
			bmsCommands.definitions.forEach(function (value: bmsCommand, key: RegExp) {
				if (commandname.match(key)) {
					let descriptionFunc = value.description;
					if (descriptionFunc !== undefined) {
						returnValue = Promise.resolve(new vscode.Hover(new vscode.MarkdownString(`## ${value.title}\n\n` +
							value.supportText +
							(value.channel ? `\n- Channel : ${value.channel} \n` : "") +
							descriptionFunc(obj, ...commandArgs) +
							value.linkText)));
					}
					else {
						returnValue = Promise.reject("no function");
					}
				}
			});
			if (returnValue) {
				return returnValue;
			}
		}
		return Promise.reject("no match");
	}
}
