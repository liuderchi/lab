# [FUSUMA] PWA 網頁課程投影片 D1


<!--

# https://github.com/hakimel/reveal.js/#configuration
# https://github.com/hackmdio/hackmd/wiki/Slide-Options#customising-individual-slides
title: PWA 課程教學 D1
tags: my, 3anology, pwa, teaching, d1, 2018
robots: noindex, nofollow
slideOptions:
    theme: solarized # black|white|league|beige|sky|night|serif|simple|solarized
    transition: convex
    # controlsLayout: edges
    # progress: true
    # parallaxBackgroundImage: https://www.flaticon.com/premium-icon/icons/svg/869/869218.svg  # repeat images
    # parallaxBackgroundSize: '500px 400px'

-->


## 網頁課程投影片


  * 主題：魔法網頁動起來

  * Derek Liu, 2018 July

<!-- note
RUNDOWN = SLIDE = TEACH NOTE
  - D1 (sunnygram)
      1. intro (0.5 hr)
      2. prepare env (0.5 hr)
      3. SW 生命週期 (0.5 hr)
      4. SW 快取 (1 hr)
      5. 💡 實作, es6 (2 hr)
          - class, promise
      6. deploy, Heroku intro (1.5 hr)
-->


---

<!-- note
- 10min
- Demo top 3 features of each app
-->

## 前言

- 歡迎！
- 自我介紹
- Preview 2 apps

----

### 這門課程有什麼要注意的？

- 請多問問題 <!-- slido, gitter -->

- 多和旁邊的人聊聊 <!-- gitter -->

- 多動手做，不用擔心玩壞 <!-- git -->

---

## 投影片指南

<!-- custom img for single slide https://github.com/hackmdio/hackmd/wiki/Slide-Options#customising-individual-slides -->
- [ ] 待辦：打電話訂便當
- ⚠️ 注意！這可能是個你會踩到的地雷
- 💡 新概念：瀏覽器可以離線啟動應用
- ❓ 請複述一遍，想想該怎麼回答這個問題？


---

### 前言: 為何選擇 PWA 當作主題？

- [2018 值得期待的網頁應用開發技術](https://www.motocms.com/blog/en/web-development-trends/)
- [twitter 導入到 win 桌面應用](https://www.windowscentral.com/twitter-updates-its-windows-10-uwp-app-pwa-support-push-notifications)
- [Safari 支援重要的 Service Worker](https://webkit.org/blog/8042/release-notes-for-safari-technology-preview-46/)
- [台灣 f2e 社群熱門主題](https://www.facebook.com/groups/f2e.tw/permalink/1577535695617123/)

---

### 前言: 為何選擇 React 當作主題？

18' 8/30, [downloads of angular, react, vue]((https://www.npmtrends.com/angular-vs-react-vs-vue))

![f2e-download-trends](https://user-images.githubusercontent.com/4994705/44841106-2d8a7580-ac75-11e8-8e09-66990c474c0d.png)


---

### 前言: 為何選擇 React 當作主題？

- 主流：熱門前端函式庫

- 資源豐富：大量社群與第三方套件

- 難度：對於初學者來說有些挑戰，但學會會很有成就感

---

<!-- note
15min -->
## 💻 準備開發環境 I

- [ ] 線上帳號與服務 🍎 🐧 🏁
    - [ ] GitHub 帳號
    - [ ] 登入 [gitter chatroom](https://gitter.im/sunnygram/Lobby)
    - [ ] 將 [sunnygram](https://github.com/liuderchi/sunnygram), [chattium](https://github.com/liuderchi/chattium) 建立分支 (fork)
    - [ ] [now cli](https://github.com/zeit/now-cli)
    - [ ] [hackmd 共筆](https://hackmd.io/KcpRNtS9SOenf7aD7XcpOw)
    - [ ] [Learn JS in Jupyter](https://github.com/liuderchi/learn-js-in-jupyter)

---

<!-- note
20min
互動系統x3(問卷系統, slido, 聊天室)
github帳號, git, git-gui,
heroku, 文字編輯器
-->

## 💻 準備開發環境 II

- [ ] 本機端工具
    - [ ] docker bin/account 🍎 🐧 🏁
    - [ ] git, git-gui (推薦 gitKraken)
    - [ ] 文字編輯器 (推薦 atom, vscode)
    - [ ] 命令列工具 (powershell 🏁)
    - [ ] ssh (_optional_) (putty 🏁)
    - [ ] chrome [web server plugin](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) 🍎 🐧 🏁
    - [ ] chrome [devtool for react](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 🍎 🐧 🏁

---

<!-- note
10min

1. demo chrom web server plugin, demo editor
2. demo chrome dev tool source
3. demo git, gitKraken
-->
## Sunnygram 初探

- [ ] How many files required for this app?
- [ ] clone app
- [ ] run local server, make any changes to HTML, CSS

---

## 小練習

- [ ] 修改 header 顏色或任意調整 HTML 確保能改變畫面
- [ ] 拋錯以顯示 alert message
- [ ] 讓 `#date` 元素顯示日期，格式為 `May 12`

<!-- note
template string, functional chaining -->

---

## Promise

- link to Promise notebooks
    - 除了 jQuery 你有更好的選擇做 AJAX

<!-- await -->

---

## Quiz for Promise

- ❓Promise 可以看成是會立刻完成的 _一段 JS 程式碼_
- ❓Promise 物件會有三種狀態
- ❓使用 `Catch()`, `then()` 來處理 reject 和 resolve 狀態

---

## Fetch

- link to Fetch slides


---

## Quiz for `fetch`

- ❓fetch 著名的優點是介面簡潔，實現非同步請求
- ❓fetch 回傳的值是是字串
- ❓fetch 成功時，其 resolve 的值是個 Response 物件
- CORS issue

---

## 串接第三方 API

- [ ] 註冊 dark sky API, open weather map API
- [ ] 印出 weather api response
    - 座標
    - 現在的氣溫，降雨機率
    - 預報資訊：溫度，降雨機率，紫外線

<!-- note
- [ ] 理解 https://cors-anywhere.herokuapp.com
- async, fetch, arrow function
-->

---

## 用 chart.js 呈現資訊

- install chart.js
- API intro: Chart


---

## 重構

- 實現 `drawChart()`

<!-- note
destruction, default arg, spread
atom-prettier
-->

---

## GitHub pages

- Demo Github Pages


---

## 原生行動應用體驗 - PWA

- 希望網頁在手機上用起來能像 App 一樣
- 使用體驗的差異
    - 要先開瀏覽器
    - 網址列
    - 沒有網路的時候頁面空白

---

## 原生行動應用體驗 - manifest.json

- 讓手機可以『安裝』網頁成原生應用
  - 不用透過 App Store 就能安裝
  - 有啟動畫面
- manifest generator

---


## Service Worker 初探

- SW 常用的功能是什麼？
    - cache response of request

- 什麼時候要用到 SW ？
    - 希望離線的時候網頁也能保有功能

---

## SW 怎麼做到的？

- 獨立運作於網頁端之外
- 介於瀏覽器和伺服器之間: 客戶端代理
- 可以存取瀏覽器快取

---

## SW 特色

- HTTPS, or HTTP for localhost
- 和 Fetch, Promise 能無縫接軌搭配

---

## SW 生命週期

- TODO SW slides (install, activate, fetch)

---

## Cache API

- TODO slides for Cache API

---

## Cache Strategies

- 💡 network v.s. cache 哪個資源優先查找？
- network first with cache fallback
- cache first with network fallback

---

## Upgrade SW with cache busting

- provide versioning in sw

---

## 💡if have time:

- install Docker
- ES6
    - writing for es6 `class` as preview
    - learn ES6 class
- ES6 demo code play

<!-- note
1. 快速 demo 完成品，了解課程進行的方式
2. 確認基礎工具都具備
3. 利用第三方 API 完成一個複雜度最小的 PWA，知道 service worker 如何提升基本的用戶體驗 (App-shell, )
4. local server + PWA 主題（debug/config/生命週期/cache管理/加到桌面/push notify）
5. 進階主題 (PWA pitfall, mongo, Oauth) + CI/CD workflow experience (jest, puppeteer, REST api test, heroku, travis)

REF:
- https://kdchang.gitbooks.io/react101/content/
-->
