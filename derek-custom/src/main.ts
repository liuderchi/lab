'use strict';

import * as vscode from 'vscode';
import markdownDisposables from './markdown';
import utilDisposables from './util';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.splice(
    0,
    0,
    ...markdownDisposables,
    ...utilDisposables,
  );
}

export function deactivate() {}
