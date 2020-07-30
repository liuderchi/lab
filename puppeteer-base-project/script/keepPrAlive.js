#!/usr/bin/env node

const path = require('path');
const puppeteer = require('puppeteer');

require('dotenv-safe').config({
  path: path.join(__dirname, '..', '.env'),
  example: path.join(__dirname, '../env', '.env.example'),
});

const { CHROME_ENDPOINT, SD_URL } = process.env;

const main = async () => {
  const browser = await puppeteer.connect({
    defaultViewport: null,
    browserWSEndpoint: CHROME_ENDPOINT,
  });
  const page = await browser.newPage();
  await page.goto(SD_URL, { waitUntil: 'networkidle0' }); // 'networkidle0' is very useful for SPAs.

  const action = async () => {
    const res = await page.evaluate(() => {
      const buttonDom = document.querySelector('.call-to-action button');
      if (buttonDom && (buttonDom.textContent || '').trim() === 'Restart') {
        buttonDom.click();
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
    if (res) {
      await page.waitFor(20000);
    }

    // check button wording
    const message = await page.evaluate(() => {
      const buttonDom = document.querySelector('.call-to-action button');
      if (buttonDom && (buttonDom.textContent || '').trim() === 'Stop') {
        return Promise.resolve('✅ PR build is running...');
      } else {
        return Promise.resolve('⚠️ PR build is not running...');
      }
    });
    console.log(message);
  };

  try {
    await action();
    setInterval(action, 25 * 60 * 1000);
  } catch (error) {
    console.log('⚠️  Operation Failed', error);
    process.exit(-1);
  }
};

main();
