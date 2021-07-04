// import { getGreetings } from './app';

// document.body.append(getGreetings());

console.log("will start rm fbclid");

// A. https://www.michalspacek.com/using-javascript-to-modify-urls-and-hide-fbclid
// const param = "fbclid";
// if (location.search.indexOf(param + "=") !== -1) {
//   let replace = "";
//   try {
//     const url = new URL(location);
//     url.searchParams.delete(param);
//     replace = url.href;
//   } catch (ex) {
//     const regExp = new RegExp("[?&]" + param + "=.*$");
//     replace = location.search.replace(regExp, "");
//     replace = location.pathname + replace + location.hash;
//   }
//   history.replaceState(null, "", replace);
// }

// B. https://gist.github.com/leeramsay/0a8dcd00d32e38a4a4e9a6494aac1fa0#file-remove-fb-tracking-user-js
const redirectionUrl = "https://l.facebook.com/l.php";
const fix_link = function (el) {
  let isFixed = false;

  const onclick = el.getAttribute("onclick");
  if (onclick !== null && onclick.indexOf("LinkshimAsyncLink") != -1) {
    el.removeAttribute("onclick");
    el.removeAttribute("onmouseover");
    isFixed = true;
  }

  if (el.href.indexOf(redirectionUrl) > -1) {
    const href = el.href;
    let s = href.substring(href.indexOf("?") + 1);
    s = s.split("&");
    for (let i in s) {
      if (s[i].indexOf("u=") === 0) {
        s = s[i];
        el.href = decodeURIComponent(s.substring(s.indexOf("=") + 1));
        isFixed = true;
        break;
      }
    }
  }

  if (isFixed && el.textContent !== "") el.style.backgroundColor = "#FFEE22";
};
document.addEventListener(
  "DOMContentLoaded",
  function (event) {
    document.onmouseover = function (event) {
      if (event.target.tagName == "A") {
        fix_link(event.target);
      }
    };
  },
  false
);

// C. https://github.com/doggy8088/TrackingTokenStripper/blob/master/TrackingTokenStripper.user.js
const s = TrackingTokenStripper(location.href)
  .remove("fbclid")
  .remove("utm_source")
  .remove("utm_medium")
  .remove("utm_term")
  .remove("utm_campaign")
  .remove("utm_content")
  .remove("utm_cid")
  .remove("utm_reader")
  .remove("utm_referrer")
  .remove("utm_name")
  .remove("utm_social")
  .remove("utm_social-type")
  .remove("gclid")
  .remove("igshid")
  .remove("_hsenc")
  .remove("_hsmi")
  .remove("mc_cid")
  .remove("mc_eid")
  .remove("mkt_tok")
  .remove("yclid")
  .remove("_openstat")

  .remove("wt.mc_id")
  .remove("__tn__")
  .remove("gclsrc")
  .remove("itm_source")
  .remove("itm_medium")
  .remove("itm_campaign")
  .remove("mc") // sendgrid.com
  .remove("mcd") // sendgrid.com
  .remove("cvosrc") // sendgrid.com
  .remove("cr_cc") // https://blogs.microsoft.com/

  .remove("sc_channel")
  .remove("sc_campaign")
  .remove("sc_geo")
  .remove("trk")
  .remove("sc_publisher")
  .remove("trkCampaign")
  .remove("sc_outcome")
  .remove("sc_country")

  .remove("__hstc")
  .remove("__hssc")
  .remove("__hsfp")
  .remove("_gl")

  .toString();

if (s && location.href !== s) {
  location.href = s;
  // console.log(s); alert(s);
}

function TrackingTokenStripper(url) {
  return {
    remove(name) {
      let [path, ...other] = url.split("?");
      other = other.join("?");

      // use var to handle first init
      var [query, ...hash] = other ? other.split("#") : [query, ""];
      hash = hash.join("#");

      if (query) {
        let new_query = [];
        for (let param of query.split("&")) {
          let [key, val] = param.split("=", 2);
          if (key !== name) {
            new_query.push(param);
          }
        }
        query = new_query.join("&");
      }

      query = query ? (query = "?" + query) : "";
      hash = hash ? (hash = "#" + hash) : "";

      if (url.substr(url.length - 1) == "#") {
        hash = "#";
      }

      return TrackingTokenStripper(path + query + hash);
    },
    toString() {
      return url;
    },
  };
}
