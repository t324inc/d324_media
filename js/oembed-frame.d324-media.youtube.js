/**
 * @file
 * Behaviors of Youtube player in the Default OEmbed iframe.
 */

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
}

function init() {

  ready(function () {

    var media_iframe = document.querySelector('iframe');

    if(media_iframe) {

      var tag = document.createElement('script');
      tag.src = "//www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      media_iframe.setAttribute('id', 'media-oembed-iframe');

      if (media_iframe.getAttribute('data-src')) {
        media_iframe.setAttribute('src', media_iframe.getAttribute('data-src'));
        media_iframe.removeAttribute('data-src');
      }

      var player_configured = false;
      var youtube_player;

      function actionProcessor(evt) {

        // Manage Youtube video.
        if (evt.data === "play") {
          var youtube_iframe = document.querySelector('iframe[src*="youtube.com"]');
          if (youtube_iframe !== undefined && youtube_iframe.src !== undefined) {

            if (!player_configured) {
              var youtubeURL = String(youtube_iframe.src);
              youtubeURL = youtubeURL.replace(/autoplay=0/gi, "autoplay=1");
              youtubeURL = youtubeURL.replace(/controls=0/gi, "controls=1");
              youtubeURL = youtubeURL + "&enablejsapi=1";
              youtube_iframe.src = youtubeURL;
              youtubeURL = undefined;

              youtube_player = new YT.Player(youtube_iframe.id, {
                events: {
                  'onReady': onPlayerReady
                }
              });

              function onPlayerReady(event) {
                event.target.playVideo();
              }

              player_confgured = true;
            }

          }
        }
      }
    } else {
      var div, n,
        v = document.getElementsByClassName("youtube-player");
      for (n = 0; n < v.length; n++) {
        div = document.createElement("div");
        div.setAttribute("data-id", v[n].dataset.id);
        div.innerHTML = makeThumb(v[n].dataset.id);
        div.onclick = makeIframe;
        v[n].insertBefore(div,v[n].firstChild);
      }
    }

    // Setup the event listener for messaging.
    if (window.addEventListener) {
      window.addEventListener("message", actionProcessor, false);
    }
    else {
      window.attachEvent("onmessage", actionProcessor);
    }
  });
}

function makeThumb(id) {
  var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">' +
    '<svg class="yt-button" height="100%" version="1.1" viewBox="0 0 68 48" width="100%">' +
    '<path class="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fill-opacity="0.8"></path>' +
    '<path d="M 45,24 27,14 27,34" fill="#fff"></path></svg>';
  return thumb.replace("ID", id);
}

function makeIframe() {
  var iframe = document.createElement("iframe");
  var embed = "https://www.youtube.com/embed/ID?autoplay=1";
  iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "1");
  this.parentNode.replaceChild(iframe, this);
}

window.onload = init;
