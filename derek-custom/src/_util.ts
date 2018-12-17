'use strict';

import * as vscode from 'vscode';
import * as path from 'path';

export const getYearMonthDay: (date?: Date) => [number, string, string] = (
  date = new Date(),
) => [
  date.getFullYear(),
  String(date.getMonth() + 1).padStart(2, '0'),
  String(date.getDate()).padStart(2, '0'),
];

export const getFileNameCap = (fileName: string) => {
  const regexMatch: RegExpExecArray | null = /(.*?)(?:\.[^.]+)?$/.exec(
    path.basename(fileName),
  );
  return regexMatch
    ? regexMatch[1]
        .replace(/[!-.\:-\@\[-\`\{-~]/g, ' ') // non-Word, /[\W_]/g
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Foo';
};

export const withWarningMessage = (fcn: () => any) => () => {
  try {
    fcn();
  } catch (e) {
    vscode.window.showWarningMessage(e);
  }
};

export const withActiveEditor = (f: Function) => () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) throw 'No Active Editor';
  f({ editor });
};
