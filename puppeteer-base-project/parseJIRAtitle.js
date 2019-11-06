const puppeteer = require('puppeteer');
const clipboardy = require('clipboardy');

if (process.argv.length < 3) {
  console.error('Bad argv input!', process.argv);
  process.exit(-2);
}

const ticketNum = process.argv[2];

(async () => {
  /**
   * get chrome devtool protocol endpoint
   * /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
   */
  // TODO dot env
  const wsChromeEndpointUrl =
    'ws://127.0.0.1:9222/devtools/browser/e9a2e7b9-17a6-49df-94df-f11b6b32b931';
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsChromeEndpointUrl,
  });
  // const browser = await puppeteer.launch({
  //     headless: false // Puppeteer is 'headless' by default.
  // });

  const page = await browser.newPage();
  // TODO url prefix as dot env
  const pageUrl = `https://jira.vzbuilders.com/browse/ECSEARCH-${ticketNum}`;
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
    clipboardy.writeSync(title);
    console.log('✅  Title is copied to clipboard');
    console.log(`  ${title}`);
    // TODO if browser has more than one tab, close this page
    process.exit();
  } else {
    console.log('⚠️  Title Not Found');
    process.exit(-1);
  }
})();
