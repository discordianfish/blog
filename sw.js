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

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

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
    "url": "webpack-runtime-3a1e1d78c475eb8aac40.js"
  },
  {
    "url": "app-945fac91fde8a7d2ab4e.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-c21c99c04900bad79772.js"
  },
  {
    "url": "index.html",
    "revision": "d010874691b44e5db32ba7ab984e7995"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "8776c98aa6aa40ab98119288fbdc2840"
  },
  {
    "url": "1.25199b773de65b756a82.css"
  },
  {
    "url": "component---src-pages-index-js.c413379ad7614de60fb9.css"
  },
  {
    "url": "component---src-pages-index-js-34b45e050c94138c494b.js"
  },
  {
    "url": "1-4f49a78bf2ff4cc524cc.js"
  },
  {
    "url": "0-73dc4ae79c2cd624fb00.js"
  },
  {
    "url": "static/d/717/path---index-6a9-vcBHpqKAzDHysL6lWgvKisUFec.json",
    "revision": "d87048876420cf44335e25a2bd28cb7f"
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