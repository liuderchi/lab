const puppeteer = require('puppeteer');
const fs = require('fs');
const clipboardy = require('clipboardy');

// input: chrome endpoint
// ipnut: ticketNum

(async () => {
  const wsChromeEndpointUrl =
    'ws://127.0.0.1:9222/devtools/browser/4231b9b2-82f1-4154-9f54-30f39387f436';
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsChromeEndpointUrl,
  });
  // const browser = await puppeteer.launch({
  //     headless: false // Puppeteer is 'headless' by default.
  // });

  const page = await browser.newPage();
  const pageUrl = 'https://jira.vzbuilders.com/browse/ECSEARCH-18644';
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
    // TODO if browser has more than one tab, close this page
    process.exit();
  } else {
    console.log('⚠️  Title Not Found');
    process.exit(-1);
  }
})();
