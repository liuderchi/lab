PPT_PROJ_ROOT="$HOME/lab/puppeteer-base-project"
startNewChromeWindow() {
  # local appPath='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  # local appPath='/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
  local appPath='/Applications/Chromium.app/Contents/MacOS/Chromium'
  $appPath \
    --remote-debugging-port=9222 \
    --no-first-run \
    --no-default-browser-check \
    --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')
}
parseJiraTitle() {
  if [ -z "$1" ]; then echo 'should provide ticket number as args[1]'; return -1; fi
  (cd $PPT_PROJ_ROOT && \
      npm rum parse-jira-title -- $1
  )
}
himail() {
  (cd $PPT_PROJ_ROOT && node script/himail.js)
}