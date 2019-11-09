const puppeteer = require('puppeteer');
const clipboardy = require('clipboardy');

require('dotenv').config();

// check .env
const { CHROME_ENDPOINT, JIRA_URL_PREFIX } = process.env;
if (!CHROME_ENDPOINT || !JIRA_URL_PREFIX) {
  console.error('Bad .env config, please check all required values');
  process.exit(-3);
}

// check cli args
if (process.argv.length < 3) {
  console.error('Bad argv input!', process.argv);
  process.exit(-2);
}
// TODO support multiple nubers
const ticketNum = process.argv[2];

const main = async () => {
  /**
   * get chrome devtool protocol endpoint
   * /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
   */
  const browser = await puppeteer.connect({
    browserWSEndpoint: CHROME_ENDPOINT,
  });
  // const browser = await puppeteer.launch({
  //     headless: false // Puppeteer is 'headless' by default.
  // });

  const page = await browser.newPage();
  const pageUrl = `${JIRA_URL_PREFIX}${ticketNum}`;
  await page.goto(pageUrl, {
    waitUntil: 'networkidle0', // 'networkidle0' is very useful for SPAs.
  });

  const title = await page.evaluate(() => {
    const queries = [...document.querySelectorAll('h1#summary-val')];
    if (queries.length > 0) {
      return queries[0].textContent;
    }
    return '';
  });

  if (title) {
    clipboardy.writeSync(`[${title} - ECSEARCH-${ticketNum}](${pageUrl})`);
    console.log('✅  Title Markdown is copied to clipboard');
    console.log(`  ${title}`);
    page.close();
    process.exit();
  } else {
    console.log('⚠️  Title Not Found');
    process.exit(-1);
  }
};

main();
