#!/usr/bin/env node

const path = require('path');
const puppeteer = require('puppeteer');
const inquirer = require('inquirer');

require('dotenv-safe').config({
  path: path.join(__dirname, '..', '.env'),
  example: path.join(__dirname, '../env', 'himail.env.example'),
});

const {
  CHROME_ENDPOINT,
  HIMAIL_URL,
  HIMAIL_ACCOUNT,
  HIMAIL_INBOX_URL,
} = process.env;

const main = async () => {
  const { password = '' } = await inquirer.prompt([
    {
      type: 'password',
      message: 'Enter himail Password:',
      name: 'password',
      mask: '*',
      validate: value => !!value || 'Password is required',
    },
  ]);

  const browser = await puppeteer.connect({
    defaultViewport: null,
    browserWSEndpoint: CHROME_ENDPOINT,
  });

  const page = await browser.newPage();
  await page.goto(HIMAIL_URL, { waitUntil: 'networkidle0' });

  try {
    await page.evaluate(
      (accountValue, passwordValue) => {
        const inputDoms = document.querySelectorAll('.ctrlGroup > input');
        const accountDom = [...inputDoms].filter(el => el.id === 'idPuser')[0];
        const passwordDom = [...inputDoms].filter(
          el => el.id === 'passPuser',
        )[0];
        const submitDom = [...inputDoms].filter(el => el.id === 'OKPuser')[0];

        if (accountDom && passwordDom && submitDom) {
          console.log('will login');
          accountDom.value = accountValue;
          passwordDom.value = passwordValue;
          submitDom.click();
        } else {
          throw Error('input password failed');
        }
      },
      HIMAIL_ACCOUNT,
      password,
    );

    // wait for inbox link dom
    const inboxLinkQuery =
      '.sidebar-folder-list > ul:nth-child(2) > li:first-child > a';
    await page.waitFor(inboxLinkQuery);

    if (page.url() !== HIMAIL_INBOX_URL) throw Error('url is not correct');

    await page.evaluate(query => {
      const inboxLinkDom = [...document.querySelectorAll(query)][0];
      if (inboxLinkDom) {
        inboxLinkDom.click();
      } else {
        throw Error('could not find inbox link');
      }
    }, inboxLinkQuery);
  } catch (error) {
    console.log('⚠️  Login Failed', error);
    process.exit(-1);
  }
  console.log('✅  Login Success');
  process.exit();
};

main();
