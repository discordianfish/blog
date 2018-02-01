webpackJsonp([48650439439500],{497:function(e,n){e.exports={data:{site:{siteMetadata:{title:"5π - fish's blog",author:"Johannes 'fish' Ziemke"}},markdownRemark:{id:"/usr/src/src/pages/2014/11/13/using-docker-run-netcontainerxx-to-debug-network-issues/index.md absPath of file >>> MarkdownRemark",html:'<p>Sharing the network namespace with a existing container is a less known feature of Docker. If you run:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>docker run --net=container:my-existing-container ...</code></pre>\n      </div>\n<p>Your container runs in the same network namespace, sharing the same network configuration as <code>my-existing-container</code>.</p>\n<p>This is very useful for debugging purposes: I just wanted to verify the current outgoing connections from a container in our infrastructure and realized that due to the network scoping that’s not easily possible. You can use <code>ip netns exec</code> but that assumes you have the namespace mounted to <code>/var/run/netns</code>. You can symlink things around but it’s ugly. Much nicer:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>docker run -t -i --net=container:my-existing-container --rm ubuntu netstat -anp</code></pre>\n      </div>',frontmatter:{title:"Using docker run --net=container:XX ... to debug network issues",date:"2014-11-13 23:04:22 +0000"}}},pathContext:{slug:"/2014/11/13/using-docker-run-netcontainerxx-to-debug-network-issues/",previous:{fields:{slug:"/2014/11/10/running-a-highly-available-load-balancer-on-docker/"},frontmatter:{title:"Running a highly available load balancer on Docker"}},next:{fields:{slug:"/2015/01/08/containerized-infrastructure/"},frontmatter:{title:"Containerize your Infrastructure"}}}}}});
//# sourceMappingURL=path---2014-11-13-using-docker-run-netcontainerxx-to-debug-network-issues-c7c76d16a2cf09764a63.js.map