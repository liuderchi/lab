## Get Started

- clone this project
- in the repo directory do `npm link`
- quit then restart your chrome app with debug protocol

```bash
$ /Applications/Google Chrome.app/Contents/MacOS/Google Chrome -remote-debugging-port=9222
```

- in cli copy first line with debug protocol url
  - e.g. `ws://127.0.0.1:9222/devtools/browser/ca123456-5d82-4b34-bb79-b1cffab1c9a5`
- in repo copy example env file: `cp env/.env.example .env`
- copy chrome debug protocol url to `.env` > `CHROME_ENDPOINT`
  - e.g. `ws://127.0.0.1:9222/devtools/browser/ca123456-5d82-4b34-bb79-b1cffab1c9a5`
- update your okta account to `.env` > `OKTA_ACCOUNT`
- now you can login okta in terminal

```bash
$ oktaLogin
? Enter Your OKTA Password: **
```


## Create Custom Command

- add `myScript.js` with starting shebang `#!/usr/bin/env node`
- add entry in `package.json` > `"bin": "path/to/myScript.js"`