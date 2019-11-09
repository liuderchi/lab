const puppeteer = require('puppeteer');
const clipboardy = require('clipboardy');

require('dotenv').config();

// check .env
const {
  CHROME_ENDPOINT,
  HIMAIL_URL,
  HIMAIL_ACCOUNT,
  HIMAIL_PWD,
  HIMAIL_INBOX_URL,
} = process.env;
if (
  !CHROME_ENDPOINT ||
  !HIMAIL_URL ||
  !HIMAIL_ACCOUNT ||
  !HIMAIL_PWD ||
  !HIMAIL_INBOX_URL
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
  const pageUrl = `${HIMAIL_URL}`;
  await page.goto(pageUrl, {
    waitUntil: 'networkidle0', // 'networkidle0' is very useful for SPAs.
  });

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
      HIMAIL_PWD,
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
