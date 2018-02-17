webpackJsonp([0xf221a1d9ba74],{502:function(e,t){e.exports={data:{site:{siteMetadata:{title:"5π - fish's blog",author:"Johannes 'fish' Ziemke"}},markdownRemark:{id:"/usr/src/src/pages/2015/02/10/prometheus-on-raspberry-pi/index.md absPath of file >>> MarkdownRemark",html:'<h1>Prometheus</h1>\n<p><a href="http://prometheus.io">Prometheus</a> is a new open-source service monitoring system and time series database written in Go.</p>\n<p>Check out the <a href="https://developers.soundcloud.com/blog/prometheus-monitoring-at-soundcloud">announcement</a> and my article about <a href="/2015/01/26/monitor-docker-containers-with-prometheus">monitoring Docker Containers with Prometheus</a> if you don’t know what I’m talking about.</p>\n<h1>My Stack</h1>\n<p><img src="http://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Raspberry_Pi_Photo.jpg/800px-Raspberry_Pi_Photo.jpg" alt="RaspberryPi">\nI stopped running my own full blown server(s) a while ago. Nowadays I just have a old Raspberry Pi at home and two tiny DigitalOcean instances to host this blog and for general R&#x26;D stuff.</p>\n<p>But I still want to monitor all this and, as showed earlier, Prometheus is the way to go. So I could now spin up another DigitalOcean instance and pay another $5/Mo, but given how cheap I am, I’d rather want to run it on my Raspberry Pi.</p>\n<h1>Cross-Compiling Go</h1>\n<p>First you need to build Go with support for your target OS and architecture. If you installed Go from sources, you can do this by running:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>cd $GOROOT/src\nGOARCH=arm ./make.bash</code></pre>\n      </div>\n<p>With pure Go, cross compilation is trivial. This example:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello World")\n}</code></pre>\n      </div>\n<p>can be cross-compiling for arm with <code>GOARCH=arm go build test.go</code>.</p>\n<p>Now things get much more complicated once you use CGO, meaning Go code calling C functions.</p>\n<p>The Prometheus server uses the <a href="https://github.com/prometheus/client_golang">Prometheus Go Client Library</a> to provide metrics about itself. This client library uses <a href="https://github.com/prometheus/procfs">prometheus/procfs</a> which requires CGO to get process metrics from procfs. Cross-compiling this for Raspberry Pi is a pain. ARM != ARM, there are several variants and when I tried to cross-compiling Prometheus with CGO, it just lead to segfaults or invalid instructions. It should be possible to cross-compile it with the CGO dependency, it’s just painful and I quickly gave up.</p>\n<p>Fortunately, we found an easy way to remove the dependency on procfs if CGO is disabled: <a href="https://github.com/prometheus/client_golang/commit/93d11c8e35ffcd969fd881efe1873e715a6ef93b">https://github.com/prometheus/client_golang/commit/93d11c8e35ffcd969fd881efe1873e715a6ef93b</a>. This removes some useful process level metrics about prometheus itself, but it makes cross compiling prometheus is as easy as in the example above:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>cd $GOPATH/src/github.com/prometheus/prometheus\ngo get -u # Update your dependencies\nGOARCH=arm go build -o prometheus.arm</code></pre>\n      </div>\n<p>Since cross-compilation by default disables CGO, this builds a statically linked prometheus binary ready to be run on a Raspberry Pi. If you’re running a newer Pi, you can set GOARM to the version of your ARM processor. See <a href="https://code.google.com/p/go-wiki/wiki/GoArm#Supported_architectures">this</a> for supported architectures.</p>\n<h1>Performance</h1>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/rpi_gorouting-0c0309899e4000452ea789b5324129b0-346ce.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 70.935960591133%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAIAAACgpqunAAAACXBIWXMAAAsSAAALEgHS3X78AAACCElEQVQoz32S3W4SURDH93lsMSFKSHgbrhoJYJ+hF175Dr6BMV6JjTEaDa0KNhS10nZxoYBQlt1zds/3R52zKxWM8ZfztbMz85+ds165XK5UKqVS6f69PxSLxUKhcHebnd3CnZ3dTYs3m8183w+CYHF9HYZhtFpFESxbLMOQJujJy97jp504A2OMEPKsMZQQRqnS+ua/CO0GYK3lnAshPQG7VFzZWye7Bo7/zGKMSUkqhHDKjHPGhVKKAZxBCdpYGNzllwBsSZJuJP2NB45KSphGOxSjMkESxTLFkEySFIwiweCjBTcZihKJY5sFazLy+c8rGYWaEj670gk2gmtOLYguF4bR5OxUzGcqQTfWgCCbjsDNBUOm+LSLv5zQ6YhNRun5V5t1Li8PMkJM1D3GvQ681Sk2SpHhgI6HedmaTsZkeA6m+PNxenEGcS7UOBG5WqYX36KP78L3r1C/S/zvbD4BZzoJsrKNNpkfeG82Iz9DzZBxdfRm8eJZ3Gnjfjdsv6Yjn03HWkqnDH3OlMztCoDdPWod9z6FR2/jbjs++UD8weLweTLoC+iFkp7ZFvwba+V8yoNLuZyz8Q8aXEJT4cuh8xDllJMM7EDJGvj7ciMKl3DmjEFVEkWgY9YX7sF1PDo4eLC312g0G416A7ZmE2atVoNzvV5/uL9frVZbrRbUoXT+M6i83l8eat949cKCqQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="goroutines"\n        title=""\n        src="/static/rpi_gorouting-0c0309899e4000452ea789b5324129b0-fb8a0.png"\n        srcset="/static/rpi_gorouting-0c0309899e4000452ea789b5324129b0-1a291.png 148w,\n/static/rpi_gorouting-0c0309899e4000452ea789b5324129b0-2bc4a.png 295w,\n/static/rpi_gorouting-0c0309899e4000452ea789b5324129b0-fb8a0.png 590w,\n/static/rpi_gorouting-0c0309899e4000452ea789b5324129b0-526de.png 885w,\n/static/rpi_gorouting-0c0309899e4000452ea789b5324129b0-346ce.png 1015w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    \nI didn’t have time to benchmark it yet, but it seems to perform much better than I expected. Right now, it only scrapes itself, giving us ~250 time series. After running it for a few hours it already collected 137806 samples. Graphing a simple time series like <code>process_goroutines</code> for the past hour takes between 150-170ms. The probably most expensive operation you can do (and definitely shouldn’t do on a production system) is graphing <em>all</em> time series by executing <code>{job=~".*"}</code> this returns in about 30s on the Raspberry Pi.\n\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/rpi_all-1-41ee3e1033ec4be8cbd8b134b87fc946-7492f.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 66.40079760717846%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAAsSAAALEgHS3X78AAABy0lEQVQoz5VSWUsbURSeH1S0RqgNQUF86FtB/AG+WwWVxo2AedAHQ1SMWkrcoBEF9zSaxTXgg4gQERqUgi+aaOLMOHbmznrn3ngmrglV9GOYOZxzvvN9c+5lHA5HZWWV3W7//AR7RcUnm81WXoiSj2UfSsueZ5hsJnORTrMcx/O8IAg3/wNkkfgvsJ0cCh2KooiQhGRZkiSGUqqqqqZphmHkXgUmOd20AtM0EULQz+i6pulYNWiOvkiDCqH3ZUKJgQ1FkWEEKBPQVVQNYwwWFEWBkWYeYAc8URMfpwT/5t8Uh6xBDxpgmYEmoBFiFoE8pOCj6lhAGjaJrMpz8ZWRoD+0FwY+Q/K4m/Tkkxb8A80Dgsvry7rur1+c1T2B7neTU1m2tnGwpr6/ayBokcEzeHsjOcMK39q9Dc5et8d7fcMxj4XXybBkCBLJxOiPpsnx5qmJ7zx3ca8MtbslASg8VmsBH9YH7/ju74X5xli0IxZ1iWKGKRIpOl44Brg9kiJfCXzy9HQt6luPtG7E2rc2XJKUtcjn6bM/J0eJo/29g/jObiSyubS8Oj27OPZrZtg/5fH9dHt9HQNDzj5P03SgJRbpDAXbomEXy57dAlm/nQFJ4GwcAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="goroutines"\n        title=""\n        src="/static/rpi_all-1-41ee3e1033ec4be8cbd8b134b87fc946-fb8a0.png"\n        srcset="/static/rpi_all-1-41ee3e1033ec4be8cbd8b134b87fc946-1a291.png 148w,\n/static/rpi_all-1-41ee3e1033ec4be8cbd8b134b87fc946-2bc4a.png 295w,\n/static/rpi_all-1-41ee3e1033ec4be8cbd8b134b87fc946-fb8a0.png 590w,\n/static/rpi_all-1-41ee3e1033ec4be8cbd8b134b87fc946-526de.png 885w,\n/static/rpi_all-1-41ee3e1033ec4be8cbd8b134b87fc946-7492f.png 1003w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<h1>Downloads</h1>\n<p><strong>Update:</strong> There are now official images available:\n<a href="https://prometheus.io/download/">https://prometheus.io/download/</a></p>\n<h3>Checksums</h3>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>$ shasum prometheus.armv?.gz\ndb42a3f568bbab1d8a7d183b336d0b50dccc80b6  prometheus.armv5.gz\nb6fdd3a77e16359631a0daaf9c06cd93a9948932  prometheus.armv6.gz\n8d3e6580ee4ed3d10b93d60c13009156a5600193  prometheus.armv7.gz\n\n$  sha256sum prometheus.armv?.gz\ne206202bb07cc139eaabac4c51c07f0a332337eb331bd79f19294c558fb3de62  prometheus.armv5.gz\n99d864e4fee8ded6b0f9c117f839fdf0fa9d12fadfe27b98090bee04b88c48c0  prometheus.armv6.gz\nbaf550448174198c57f3a28e2b86d49ba523e5b15d9d4c087267021e4785299b  prometheus.armv7.gz</code></pre>\n      </div>',frontmatter:{title:"Prometheus on Raspberry Pi",date:"2015-02-10 13:18:12 +0000"}}},pathContext:{slug:"/2015/02/10/prometheus-on-raspberry-pi/",previous:{fields:{slug:"/2015/01/27/find-ghosts-in-your-docker-images/"},frontmatter:{title:"Find GHOSTs in your Docker images"}},next:{fields:{slug:"/2015/03/13/building-aws-amis-from-scratch/"},frontmatter:{title:"Building AWS AMIs from Scratch for Immutable Infrastructures"}}}}}});
//# sourceMappingURL=path---2015-02-10-prometheus-on-raspberry-pi-da1e967aa644f27497c9.js.map