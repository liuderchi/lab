#!/usr/bin/env zx

// import 'zx/globals'
import 'dotenv/config';
import path from 'path';
import { GoogleSpreadsheet } from 'google-spreadsheet';

// 1. auth, init
const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
await doc.useServiceAccountAuth({
  client_email: process.env.CRED_CLIENT_MAIL,
  private_key: process.env.CRED_KEY,
});
await doc.loadInfo();
echo`doc: ${doc.spreadsheetId}, ${doc.title}`;

// 2. get spreadsheet
const templateTitle = '範本(5週)';
// https://theoephraim.github.io/node-google-spreadsheet/#/classes/google-spreadsheet?id=worksheets
const templateSheet = doc.sheetsByTitle[templateTitle]; // alt doc.sheetsById[], doc.sheetsByIndex[0]
echo`template sheet: ${templateSheet.sheetId}, ${templateSheet.title}`;

// 3. copy template sheet
const month = 10;
const title = `5禮拜 (2022.${month})--${Math.floor(Math.random() * 100)}`;
const resultSheet = await templateSheet.duplicate({
  title,
  index: 0,
});
echo`dupliated sheet: ${resultSheet.sheetId}, ${resultSheet.title}`;

// 4. paste values to template sheet cells
// WIP

// 5. save spreadsheet as XLSX

process.exit(0);
