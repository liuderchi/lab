const puppeteer = require('puppeteer');

require('dotenv').config();

// check .env
const {
  CHROME_ENDPOINT,
  OKTA_URL,
  OKTA_ACCOUNT,
  OKTA_PSD
} = process.env;
if (
  !CHROME_ENDPOINT ||
  !OKTA_URL ||
  !OKTA_ACCOUNT ||
  !OKTA_PSD
) {
  console.error('Bad .env config, please check all required values');
  process.exit(-3);
}

// check cli args
if (process.argv.length < 2) {
  console.error('Bad argv input!', process.argv);
  process.exit(-2);
}

const main = async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: CHROME_ENDPOINT,
  });

  const page = await browser.newPage();
  const pageUrl = `${OKTA_URL}`;
  await page.goto(pageUrl, {
    waitUntil: 'networkidle0', // 'networkidle0' is very useful for SPAs.
  });

  try {
    // account input
    await page.evaluate(
      () => {
        const inputDoms = document.querySelectorAll('input');
        const accountDom = [...inputDoms].filter(el => el.id === 'okta-signin-username')[0];
        if (accountDom) {
          accountDom.focus()
        } else {
          throw Error('input account failed');
        }
      },
    );
    await page.keyboard.type(OKTA_ACCOUNT);

    // password input
    await page.evaluate(
      () => {
        const inputDoms = document.querySelectorAll('input');
        const passwordDom = [...inputDoms].filter(
          el => el.id === 'okta-signin-password',
        )[0];

        if (passwordDom) {
          passwordDom.focus()
        } else {
          throw Error('input password failed');
        }
      },
    );
    // await page.keyboard.press('Tab');
    await page.keyboard.type(OKTA_PSD);

    // submit button
    await page.evaluate(
      () => {
        const inputDoms = document.querySelectorAll('input');
        const submitDom = [...inputDoms].filter(el => el.id === 'okta-signin-submit')[0];

        if (submitDom) {
          submitDom.click();
        } else {
          throw Error('input password failed');
        }
      }
    );

    // wait for push button
    await page.waitForNavigation(4000, {
      waitUntil: 'networkidle0'
    })
    if (page.url() !== 'https://oath.okta.com/signin/verify/duo/web') throw Error('url is not correct');

    // WIP

    const pushButtonQuery = 'fieldset[data-device-index="phone1"] .row-label.push-label > button.auth-button.positive'
    // await page.waitFor(pushButtonQuery, {visible: true});

    await page.evaluate(query => {
      // const pushButtonDom = [...document.querySelectorAll(query)][0];
      const pushButtonDom = [...document.querySelectorAll('button')][0];
      console.log({pushButtonDom})
      if (pushButtonDom) {
        // pushButtonDom.click();
      } else {
        throw Error('could not click push button');
      }
    }, pushButtonQuery);

  } catch (error) {
    console.log('⚠️  Login Failed', error);
    process.exit(-1);
  }
  console.log('✅  Login Success');
  process.exit();
};

main();
