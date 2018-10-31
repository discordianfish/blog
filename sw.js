/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.2/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.2"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-81db2c9d56b402412fca.js"
  },
  {
    "url": "app-142eda93a7d988683b91.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-09a20a0f4b009f0d0952.js"
  },
  {
    "url": "index.html",
    "revision": "0eaa2fd6a93a07d1c7c8fff0060f40d0"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "5d015afc82223bee9ddd6bf832fcba34"
  },
  {
    "url": "1.25199b773de65b756a82.css"
  },
  {
    "url": "component---src-pages-index-js.c413379ad7614de60fb9.css"
  },
  {
    "url": "component---src-pages-index-js-d8bcddc900cb9636d7f5.js"
  },
  {
    "url": "1-7cdac8f3fb2cf05837f9.js"
  },
  {
    "url": "0-1e71b0e245e6604dc1c5.js"
  },
  {
    "url": "static/d/71/path---index-6a9-YeyiHLCajJUW2cMDsGzu92jBP7M.json",
    "revision": "0b50974c5bd78e0e568300f1e2e943cf"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});