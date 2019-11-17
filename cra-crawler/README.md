# Getting Started

1. Start A new Chrome Window with __Disabled Security__ (to disable CORS)

```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome  \
  --disable-web-security \
  --no-first-run \
  --no-default-browser-check \
  --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
```

⚠️ Never login any websites in this window!

2. Start A Static Web Server using https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related

a. Select "Choose Folder" > select `~/Downloads/cra-crawler`

b. Turn on Server with port = 8888

c. Browse `http://127.0.0.1:8888` in new Chrome Window in step 1.

3. Use the App

a. Click `Enable Chrome Notification`

b. This page may periodically fetch data or you can fetch by clicking `fetch now`
