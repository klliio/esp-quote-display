// ==UserScript==
// @name          Tumblr Scraper
// @match         https://www.tumblr.com/*
// @version       1.0
// @require       https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
  const result = {};
  let gitIndex = 0;
  let intervalIndex = 0;

  $.getJSON(
    "https://raw.githubusercontent.com/klliio/esp-quote-display/main/quotes.json",
    function (data) {
      gitIndex = Object.keys(data).length;

      let interval = setInterval(function () {
        document
          .querySelectorAll("span > .GzjsW .k31gt:only-child p")
          .forEach(function (blogNode, index) {
            const blog = {};
          	intervalIndex = index + 1;
            blog.author = location.pathname.substring(1);
            blog.text = blogNode.innerText;
            result[index + 1 + gitIndex] = blog;
          });

        if (intervalIndex >= 49) {
          clearInterval(interval);
        }
        const resultStr = JSON.stringify(result, null, 2).substring(2);
        console.log(resultStr);
      }, 8000);
    }
  );
})();