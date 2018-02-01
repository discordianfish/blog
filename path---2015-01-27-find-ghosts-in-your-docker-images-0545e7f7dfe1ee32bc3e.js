webpackJsonp([0x67fb272c234c],{500:function(e,t){e.exports={data:{site:{siteMetadata:{title:"5π - fish's blog",author:"Johannes 'fish' Ziemke"}},markdownRemark:{id:"/usr/src/src/pages/2015/01/27/find-ghosts-in-your-docker-images/index.md absPath of file >>> MarkdownRemark",html:'<p>A severe security vulnerability in glibc &#x3C; 2.18, nicknamed <a href="http://www.openwall.com/lists/oss-security/2015/01/27/9">GHOST</a> was just reported.\nHere is a handy one-liner (Debian/Ubuntu only though) to walk through all your Docker images and see if they include a glibc older than 2.18:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>docker images -q | while read I; do V=`docker run --rm --entrypoint apt-cache $I policy libc6 2>/dev/null | awk \' /Installed/ { print $2"\\n"2.18 }\'|sort -V|head -1`; if [ -z "$V" ]; then echo "$I not apt based" && continue; fi;  [ "$V" == "2.18" ] || echo "$I is vulnerable"; done</code></pre>\n      </div>',frontmatter:{title:"Find GHOSTs in your Docker images",date:"2015-01-27 17:30:17 +0000"}}},pathContext:{slug:"/2015/01/27/find-ghosts-in-your-docker-images/",previous:{fields:{slug:"/2015/01/26/monitor-docker-containers-with-prometheus/"},frontmatter:{title:"Monitor Docker Containers with Prometheus"}},next:{fields:{slug:"/2015/02/10/prometheus-on-raspberry-pi/"},frontmatter:{title:"Prometheus on Raspberry Pi"}}}}}});
//# sourceMappingURL=path---2015-01-27-find-ghosts-in-your-docker-images-0545e7f7dfe1ee32bc3e.js.map