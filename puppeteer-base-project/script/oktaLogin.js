#!/usr/bin/env node

const path = require('path');
const puppeteer = require('puppeteer');
const inquirer = require('inquirer');

require('dotenv-safe').config({
  path: path.join(__dirname, '..', '.env'),
  example: path.join(__dirname, '../env', '.env.example'),
});

const { CHROME_ENDPOINT, OKTA_LOGIN_URL, OKTA_HOME_URL, OKTA_ACCOUNT, } = process.env;
const IFRAME_READY_TIME = 5000;
const BUTTON_Y = 130.5;
const BUTTON_HEIGHT = 38;

const main = async () => {
  const { password = '' } = await inquirer.prompt([
    {
      type: 'password',
      message: 'Enter Your OKTA Password:',
      name: 'password',
      mask: '*',
      validate: value => !!value || 'Password is required'
    }
  ])

  const browser = await puppeteer.connect({
    defaultViewport: null,
    browserWSEndpoint: CHROME_ENDPOINT,
  });
  const page = await browser.newPage();

  await page.goto(OKTA_LOGIN_URL, { waitUntil: 'networkidle0' }); // 'networkidle0' is very useful for SPAs.
  if (page.url() === OKTA_HOME_URL) {
    console.log('✅  You have already logged in');
    page.close();
    process.exit();
  }

  try {
    // account input
    await page.evaluate(() => {
      const accountDom = [...document.querySelectorAll('input')].filter(
        el => el.id === 'okta-signin-username',
      )[0];
      if (accountDom) {
        accountDom.focus();
      } else {
        throw Error('input account failed');
      }
    });
    await page.keyboard.type(OKTA_ACCOUNT);

    // password input
    await page.evaluate(() => {
      const passwordDom = [...document.querySelectorAll('input')].filter(
        el => el.id === 'okta-signin-password',
      )[0];

      if (passwordDom) {
        passwordDom.focus();
      } else {
        throw Error('input password failed');
      }
    });
    await page.keyboard.type(password);

    // submit button
    await page.evaluate(() => {
      const submitDom = [...document.querySelectorAll('input')].filter(
        el => el.id === 'okta-signin-submit',
      )[0];

      if (submitDom) {
        submitDom.click();
      } else {
        throw Error('input password failed');
      }
    });
    console.log('Logging in...')

    // wait for push notification button
    await page.waitForNavigation({ timeout: 10000, waitUntil: 'networkidle0' });
    if (page.url() !== 'https://oath.okta.com/signin/verify/duo/web') {
      throw Error('url is not correct');
    }

    await page.waitFor('iframe[title="Duo Security"]');
    await page.waitFor(IFRAME_READY_TIME);

    // click by coor since button cannot be queried by DOM API (in cross domain iframe)
    const clickCoor = await page.evaluate(
      ({ BUTTON_Y, BUTTON_HEIGHT }) => {
        const iframeDom = document.querySelectorAll(
          'iframe[title="Duo Security"]',
        )[0];
        if (iframeDom) {
          const domRect = iframeDom.getBoundingClientRect();
          return Promise.resolve({
            x: domRect.x + domRect.width / 2,
            y: domRect.y + (BUTTON_Y + BUTTON_HEIGHT / 2),
          });
        } else {
          throw Error('could not find iframe');
        }
      },
      { BUTTON_Y, BUTTON_HEIGHT },
    );
    await page.mouse.click(clickCoor.x, clickCoor.y);

    console.log('🔔  Push Notification Sent; Waiting for Your Approval...');
    await page.waitForNavigation();
    if (page.url() !== OKTA_HOME_URL) {
      throw Error('url is not correct; push notification might timeout');
    }
  } catch (error) {
    console.log('⚠️  Login Failed', error);
    process.exit(-1);
  }
  console.log('✅  Login Success');
  page.close();
  process.exit();
};

main();
