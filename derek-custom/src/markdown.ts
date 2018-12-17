'use strict';

import * as vscode from 'vscode';
import {
  getFileNameCap,
  getYearMonthDay,
  withWarningMessage,
  withActiveEditor,
} from './_util';

const insertInitTemplate = ({ editor }: { editor: any }) => {
  const fileNameCap = getFileNameCap(editor.document.fileName);
  const [year, month, day] = getYearMonthDay();
  const template = `# ${fileNameCap}\n\n## Date\n\n- ${year}-${month}-${day}\n\n## Description\n\n-\n__WIP ${year}-${month}-${day}__\n`;
  editor.edit((edit: string) => edit.replace(editor.selection, template));
};

const insertToday = ({ editor }: { editor: any }) => {
  const [year, month, day] = getYearMonthDay();
  editor.edit((edit: string) =>
    edit.replace(editor.selection, `${year}-${month}-${day}`),
  );
};

export default [
  vscode.commands.registerCommand(
    'extension.md.insertInitTemplate',
    withWarningMessage(withActiveEditor(insertInitTemplate)),
  ),
  vscode.commands.registerCommand(
    'extension.md.insertToday',
    withWarningMessage(withActiveEditor(insertToday)),
  ),
];
