webpackJsonp([0xa0cbacd50195],{514:function(e,t){e.exports={data:{site:{siteMetadata:{title:"5π - fish's blog",author:"Johannes 'fish' Ziemke"}},markdownRemark:{id:"/usr/src/src/pages/2018/02/17/found-severe-azure-kubernetes-bug-and-aint-even-got-a-lousy-t-shirt/index.md absPath of file >>> MarkdownRemark",html:'<p>About half a year ago at one of my last gigs, I built a Kubernetes Cluster on\nAzure.</p>\n<p>On Azure, the Kubernetes Volume Claims are commonly implemented by a “Virtual\nHard Disk” (VHD) file stored on the <a href="https://azure.microsoft.com/en-us/services/storage/blobs/">Azure\nBlob Storage\nService</a>.</p>\n<p>The Kubernetes “cloud provider intergration” takes care of allocating and\nmanaging these disks.</p>\n<p>While I was working on some issues we had with the cloud provider intergration,\nI realized that the VHDs related error messages include a full URL like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>https://abc1234.blob.core.windows.net/5678901234/example-dynamic-pvc-834987df-ffe3-12d3-9dec-feaab9e30f09.vhd</code></pre>\n      </div>\n<p>Curious about this API semantics, I tried it download it with curl. And it\nworked.</p>\n<p>First I though I made some mistake setting up the storage account or Kubernetes\nitself, but I quickly realized that all of the dozens of VHD urls I found in\nvarious github issues could be downloaded without any authentication!</p>\n<p><strong>Turns out, all Volume Claims that were created on Azure between 1.6.0 and 1.6.5\nwere world readable.</strong></p>\n<p>I reported the issue by following the <a href="https://kubernetes.io/security/">Kubernetes Security and\nDisclosure</a> guidelines. While the team was\nresponsive in general and the problem fixed quickly, I wasn’t very happy with\nhow the announcement was handled. It felt like it was kept under the radar and I\nnever got credited, let alone qualified for a bug bounty.</p>\n<p>Of course I’d love to get credited and get a bug bounty but I’m more\nworried about what this handling means for the next person considering to\nresponsibly disclose similar issue.</p>\n<p>Kubernetes is my bread and butter right now and I have high expectations towards\nit. I’ve contributed to several components and I have high regards for the\nmaintainers of the project and the companies involved. I too had the impression\nthat Microsoft changed and takes these things serious these days, so I was\nsurprised how this was handled. I also was quite disappointed by not getting any\nresponse anymore around why this didn’t qualify for a bug bounty.</p>\n<p>I’ll continue to disclose issues responsibly but I fully understand people who\ndon’t want to jump through these hoops if they don’t even get credited for it.</p>\n<h2>Timeline</h2>\n<h4>2017-06-15</h4>\n<p>Initial Report and first response with promising to send a\nfollow up later that day.</p>\n<h4>2017-06-17</h4>\n<p>The issue was fixed in Kubernetes:\n<a href="https://github.com/kubernetes/kubernetes/pull/47605">https://github.com/kubernetes/kubernetes/pull/47605</a></p>\n<h4>2017-06-19</h4>\n<p>After not hearing back, I asked again about a CVE and the plans\nto announce the issue. I’ve got a response the same day, confirming that a CVE\nwill be issues and that they’re still working on identifying the affected\ncustomers.</p>\n<h4>2017-07-07</h4>\n<p>So far, no CVE was issues so I asked again. I also asked if they\nare okay with me blogging about it.</p>\n<p>In the response I was told that CVE was requested but not yet issued. I was also\nasked to please not talk about this issue publically until they finished letting\naffected customers know.</p>\n<h4>2017-07-13</h4>\n<p>I’ve got an update, letting me know that the security team is in their final\nstages. They apologize for the “clearly no acceptable” time it took to process\nthe issue.</p>\n<h4>2017-07-20</h4>\n<p>CVE-2017-1002100 was assigned to the issue.</p>\n<h4>2017-08-02</h4>\n<p>I’ve asked again if there will be some sort of announcement which would also\ncredit me and encourage people to upgrade. I was pointed to <a href="https://groups.google.com/forum/#!msg/kubernetes-security-announce/n3VBg_WJZic/-ddIqKXqAAAJ">a post in\nkubernetes-security-announce</a>\nwhich I never heard about before (it only includes three posts). After\nsearching, I also found it was noted in the <a href="https://groups.google.com/forum/#!topic/kubernetes-announce/WodXsASu6y0">1.6.6 notes on\nkubernetes-announce</a>.</p>\n<h4>2017-08-03</h4>\n<p>I’ve explained that I expected an announcement with discussion of risks and need\nfor upgrade, as well as credit me for my finding. Apparently though this is all\nthe announcemnts that will be done in such situation.</p>\n<p>I’ve also ask specifically if this qualifies for some of Microsoft’s bug\nbounties.</p>\n<h4>2017-09-19</h4>\n<p>I’ve asked again about a bounty. Since I just launched <a href="https://latency.at">https://latency.at</a>, some\nAzure credits would be super useful to me.</p>\n<p>I’ve got the answer that “the MSRC folks didn’t think it matched”, but they’ll\nlook into some startup credits.</p>\n<h4>2017-09-25</h4>\n<p>I’ve asked why it didn’t qualified for a MSRC bounty, given that there is a\n<a href="https://technet.microsoft.com/en-us/dn800983">Microsoft Cloud Bounty</a>.</p>\n<h4>2017-10-05</h4>\n<p>Asked again.</p>\n<h4>2018-01-19</h4>\n<p>Asked “one last time”.</p>\n<h4>2018-02-17</h4>\n<p>Released this blog article</p>',frontmatter:{title:"Found severe Azure Kubernetes Bug but ain't even got a lousy T-Shirt",date:"2018-02-17T12:19:27.000Z"}}},pathContext:{slug:"/2018/02/17/found-severe-azure-kubernetes-bug-and-aint-even-got-a-lousy-t-shirt/",previous:{fields:{slug:"/2018/02/01/kubecfn-cloudformation-installer-for-reasonably-secure-multi-master-kubernetes-cluster/"},frontmatter:{title:"kubecfn: Cloudformation installer for reasonably secure multi-master Kubernetes Cluster"}},next:!1}}}});
//# sourceMappingURL=path---2018-02-17-found-severe-azure-kubernetes-bug-and-aint-even-got-a-lousy-t-shirt-39b40b402c3f864f47c4.js.map