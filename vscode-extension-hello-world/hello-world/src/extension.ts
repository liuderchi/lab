'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

const getYearMonthDay = (date = new Date()) => ([
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
]);

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "hello-world" is now active!');

    vscode.commands.registerCommand('extension.sayHello', () => {
        console.log('extension.sayHello');
    })

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.greet', () => {
        // The code you place here will be executed every time your command is executed

        console.log('extension.greet');
        // Display a message box to the user
        vscode.window.showInformationMessage('WoW Hello World!');
    });

    let disposable2 = vscode.commands.registerCommand('extension.wordCount', () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        let selection = editor.selection;
        let text = editor.document.getText(selection);

        // Display a message box to the user
        // vscode.window.showInformationMessage('Selected characters: ' + text.length);
        vscode.window.showInformationMessage(`Selected Chars: ${text.length}`);
    });

    let disposable3 = vscode.commands.registerCommand('extension.markdownInitTemplate', () => {
        const filenameNoExt = /(.*?)(?:\.[^.]+)?$/.exec(
            path.basename(vscode.window.activeTextEditor.document.fileName)
        )[1];
        const fileNameCap = filenameNoExt
            .replace(/[!-.\:-\@\[-\`\{-~]/g, ' ')    // non-Word, /[\W_]/g
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
        const [ year, month, day ] = getYearMonthDay();

        const template = `# ${fileNameCap}\n\n## Date\n\n- ${year}-${month}-${day}\n\n## Description\n\n-\n__WIP ${year}-${month}-${day}__`

        let editor = vscode.window.activeTextEditor;
        if (!editor) return;

        editor.edit(edit => edit.insert(new vscode.Position(0,0), template));
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable3);
}

// this method is called when your extension is deactivated
export function deactivate() {
}