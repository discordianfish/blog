webpackJsonp([0x9e2cb20ecbb8],{505:function(e,t){e.exports={data:{site:{siteMetadata:{title:"5π - fish's blog",author:"Johannes 'fish' Ziemke"}},markdownRemark:{id:"/usr/src/src/pages/2015/08/31/dont-manage-config-unless-you-have-to/index.md absPath of file >>> MarkdownRemark",html:'<p><a data-flickr-embed="true" data-header="false" data-footer="false" data-context="false"  href="https://www.flickr.com/photos/tuinkabouter/1884416825/in/photolist-3Sw8tg-4pYNoQ-5kuQnX-5gVeH1-sVYLE3-a3DqaD-9gzdMP-9Uspfa-2Xkkg8-8oZ8r-5aUCED-e4npy8-bn7jhK-ipQLm-4pZj1h-4xV1jk-5kuMV6-9sUBkF-b8nM3X-7tsJDh-9hY5PC-dUvDCG-4QZswm-4io4Y8-812A6f-qprAf-5ojVcV-5wUanj-9kNyLj-5GXFGx-5YFqsj-6VJnS6-dUmEaq-99qjSa-4QZsvG-4QZsuW-4QZsu7-4QZsuo-eL5jpe-4EWyKW-CXs86-etDrFm-4M5joL-jpb3gs-5knnT4-GAgoa-6d2TiA-63t6NF-7TRs3F-51XCQG" title="Jungle"><img src="https://farm3.staticflickr.com/2037/1884416825_521e525758_o.jpg" width="1024" height="576" alt="Jungle"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script></p>\n<p>At my first job, there was no code driven infrastructure at all. A nightmare from today’s perspective.</p>\n<p>The next job, there were some perl scripts to massage systems in a imperative way.</p>\n<p>Then, at SoundCloud, I used modern configuration management for the first time. SoundCloud heavily invested into Chef which was, at some point, used to drive almost every aspect of the infrastructure. A new service? Add a cookbook.</p>\n<p>Compared to a world without any proper infrastructure automation this obviously was a great step in the right direction but it was a growing pile of technical debt and constant source of bikeshedding around how to actually use it.</p>\n<p>Maybe you don’t have those problems. Maybe you have strict guidelines on how to use your configuration management or some chief architect to tame the chaos but I argue that lot of larger companies with agile and independent teams run into similar problems. If you disagree, please leave a comment.</p>\n<h3>Issues with Chef</h3>\n<p>There are several categories of problems with this setup. Some are organizational nature, like the way it was ab(used) to drive the complete infrastructure. There are also very specific issues with chef, like its internal complexity both from a operational perspective as well as from its complex interface. Things like 15 unintuitive precedence levels for node attributes to its multistep execution flow and leaky cookbook abstractions it’s often frustrating to use and accumulates a lot of technical debt due to it being hard to test and refactor without potentially breaking your infrastructure.</p>\n<h3>Alternatives - or the lack thereof</h3>\n<p>That being said, there isn’t an obvious better alternative. In the meanwhile I used ansible and salt which have their very own problems. Even though they try to be less complex than chef, they heavily depend on template driven metaprogramming and struggle with proper code reuse and testability similar to chef.</p>\n<p>Over the years I came to the conclusion that configuration management in it’s current form as used in reality has some fundamental design issues.</p>\n<h3>Design challenges</h3>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/Airplane_vortex_edit-29dd07b878f06e9e5cece16d0d7a2b39-733ee.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 81.31720430107528%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAQABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAID/9oADAMBAAIQAxAAAAGks2udCg//xAAZEAADAQEBAAAAAAAAAAAAAAABAgMAERT/2gAIAQEAAQUCazY0PfRiDpCZRIDn/8QAGREAAwADAAAAAAAAAAAAAAAAAAIDAREh/9oACAEDAQE/AaUmvENywf/EABgRAAIDAAAAAAAAAAAAAAAAAAACESJB/9oACAECAQE/AVnSx//EABoQAAIDAQEAAAAAAAAAAAAAAAARAQIhEEH/2gAIAQEABj8CyTZMGxWrD95//8QAGxAAAgIDAQAAAAAAAAAAAAAAAAEhQRExYdH/2gAIAQEAAT8hhPA3RqPqOUFZU6OuAfo1tdn/2gAMAwEAAgADAAAAEGvf/8QAGREBAAIDAAAAAAAAAAAAAAAAAQARIXGx/9oACAEDAQE/EGAN0RwF7P/EABcRAQEBAQAAAAAAAAAAAAAAAAEAIRH/2gAIAQIBAT8QD1XVt//EABwQAQACAwADAAAAAAAAAAAAAAEAESExQVGR0f/aAAgBAQABPxBaBsV1C5l4OZgoacC3mOoqaCd/JcnSqix8npqK6qCBracZ/9k=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;"\n        alt="vortex"\n        title=""\n        src="/static/Airplane_vortex_edit-29dd07b878f06e9e5cece16d0d7a2b39-f8fb9.jpg"\n        srcset="/static/Airplane_vortex_edit-29dd07b878f06e9e5cece16d0d7a2b39-e8976.jpg 148w,\n/static/Airplane_vortex_edit-29dd07b878f06e9e5cece16d0d7a2b39-63df2.jpg 295w,\n/static/Airplane_vortex_edit-29dd07b878f06e9e5cece16d0d7a2b39-f8fb9.jpg 590w,\n/static/Airplane_vortex_edit-29dd07b878f06e9e5cece16d0d7a2b39-85e3d.jpg 885w,\n/static/Airplane_vortex_edit-29dd07b878f06e9e5cece16d0d7a2b39-d1924.jpg 1180w,\n/static/Airplane_vortex_edit-29dd07b878f06e9e5cece16d0d7a2b39-9452e.jpg 1770w,\n/static/Airplane_vortex_edit-29dd07b878f06e9e5cece16d0d7a2b39-733ee.jpg 2976w"\n        sizes="(max-width: 590px) 100vw, 590px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    \nThe idea of defining a (distributed) systems state and mutating it to eventually converge to the desired state is sound but the interface the distributed systems provide is simply too complex.</p>\n<p>All the mentioned configuration management systems use some agent or ssh access to execute commands on the systems, similar to the imperative design of user interfaces: You run commands in a specific order to modify the state of the systems.\nBut since there is no unified interface to configure applications, how to achieve a specific state is highly dependent on the application.\nConfiguration management systems try to solve this by abstracting a “thing” in a system and give it a clear interface with some idempotent functions to move it into a given state like <code>installed</code>. Whether it’s called chef cookbook, salt state or (the most misleading name) ansible role.\nIf the “thing” is your web application, this might work very well but in reality you often have to configure third party applications that have subtle dependencies on specifics of other “things”. Or you have low level system configuration which affects and depends on other things installed. At this point, the abstractions usually break and you often end up introducing site specific changes to what is suppose to be reusable, generic components.</p>\n<p>The lack of a generic system configuration interface that can be used to configure every aspect of a system, imposes a lot of complexity on the configuration management.</p>\n<h3>Split configuration based on life cycle</h3>\n<p><a data-flickr-embed="true" data-header="false" data-footer="false" data-context="false"  href="https://www.flickr.com/photos/chloeophelia/6633874815/in/photolist-b7dkRZ-j6g2XM-9hrBqG-aTDRwD-99nLPX-tm1pU-bn3u8p-qHs14o-qCjhgq-4HCs5T-r9mjBJ-9MyabW-q4629m-oCKk2V-7zyviy-7HivZw-8Wzh3Y-k2UGmz-iuChmC-dKHA-qe133d-itoizS-83TM-oHsMP1-bstTCp-iY9u4G-jdRX2T-5SY4oB-7wmEBq-Cv7Z2-t2Hab-7ofMcb-99Eqbu-r5sCGR-93jB3F-qyomNx-riyS2i-dNMQsp-91DhgW-4ahpVw-qHSWG3-keBc61-5SJkro-qixdjy-dSyxEq-8nmzni-4aKkPV-f2gfQ-q96Qs1-iyGqwU" title="frozen in time"><img src="https://farm8.staticflickr.com/7142/6633874815_5d4ecf8b71_b.jpg" width="1024" height="684" alt="frozen in time"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script></p>\n<p>As long as there is configuration, there is configuration management. You will always have some form of desired state you want your infrastructure to be in. The question is not if but how to manage configuration. Since with configuration that changes rarely less things can go wrong, I believe the best way is so identify different configuration life cycles, find the right solution to manage this kind of configuration while compromising dynamically for correctness.</p>\n<h4>Build/install time configuration</h4>\n<p>If the lifetime of a single host or container image is lower than the lifetime of a configuration option, it often makes sense to move this configuration to install/build time. Since no change can happen during the life cycle of the host or container it’s easier to reason about the infrastructure since change to this set of configuration can be ruled out as reason for a given observation.</p>\n<p>Moving configuration to install time might mean making your bare metal installer preseed some configuration or building a static OS image for your cloud provider. The point is to bake in this configuration and just rebuild when changes are necessary.</p>\n<h5>Examples</h5>\n<ul>\n<li>Operating system release</li>\n<li>Partition schema</li>\n<li>Hostname</li>\n<li>Installed packages / core services</li>\n<li>OS level configuration (sysctl, ssl keys)</li>\n</ul>\n<p>All configuration that is same across all environments (dev/test/prod) should be considered to be hardcoded where environment specific configuration (credentials, URLs / service identifiers) should be passed in on runtime so you can build, test and deploy the same static artifact.</p>\n<p>What in reality gets hardcoded is a case by case decision and depends on a lot of factors. On a bare metal infrastructure where all services are deployed straight to the host, there will be a lot of configuration that is site-wide and environment agnostic but simply is changed that often that reinstallation of the whole host isn’t feasible.</p>\n<p>But in a containerized infrastructure you have host image and container image life cycles. There is little host configuration, so usually it all can be hardcoded. Even if reinstalling the host takes 20 minutes, if it only happens every few weeks and is fully automated, it’s probably fine.\nBuilding the container images in a continuous deployment pipeline might just take a minute from a change until the changes are deployed, so here again it’s feasible to bake in all suitable configuration.</p>\n<h4>Start time configuration</h4>\n<p><a data-flickr-embed="true" data-header="false" data-footer="false" data-context="false"  href="https://www.flickr.com/photos/storm-crypt/326228715/in/photolist-uQ1r2-t62c-jjzxu-pzhfMZ-7pBiCr-gKqR8Z-cqHKJS-hZsSz-522oaS-b3uw2-bXcpyw-5zdLNo-6wvjpw-nv1KL3-3aNjwL-cpBpTC-dbcLKt-4o3Qkk-9pyoHg-6dvJoB-hzvCsP-4o7SHY-aCL42j-4tGWBK-4wxATP-bX13ov-8MgTTH-cZKwvf-iKDCAd-jRyyK1-nb69S1-kvg2qy-kvdS8F-kveev8-kvdGta-kvdFzg-kvdxKi-kve2eV-bpcAmi-rbVVC-4gi4N-4rA5gu-aazkxv-o2XySp-dxnLQi-2oa9re-eC2cX3-8JA67v-8KYUaA-8JA6aB" title="Sorting Facility"><img src="https://farm1.staticflickr.com/135/326228715_dea4917fda_b.jpg" width="1024" height="768" alt="Sorting Facility"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script></p>\n<p>Especially environment specific configuration like credentials should be passed to the services by whatever deploys your application.\nEven though a lot people still deploy their applications with configuration management instead of cluster schedulers, I’m convinced that will change in the next few years. Whether you’re using <a href="https://mesosphere.github.io/marathon/">Mesos/Marathon</a>, <a href="http://kubernetes.io/">kubernetes</a> or <a href="http://eurosys2013.tudos.org/wp-content/uploads/2013/paper/Schwarzkopf.pdf">Omega</a> the high level concepts are similar: You define your application and the scheduler decides based on the available resources where to run it.\nWhether services are deployed by config management systems or the cluster scheduler, since it’s starting services, it’s the right place to pass configuration to your service. Instead of writing configuration files, <a href="http://12factor.net/config">12factor style configuration</a> is usually better suited.</p>\n<h4>Runtime configuration</h4>\n<p>Instead of configuring your systems on a regular interval with some configuration management daemon, it’s often a better pattern to have the application or a wrapper around it determine the configuration on runtime.\nInstead of making configuration management orchestrate various services or instances, it’s more robust and arguably less cognitively challenging to consider the service as it’s own independent entity.\nThis only works well if site-wide configuration is built in. Determining all this on runtime leads to similar complexity as we have with full blown configuration management today.</p>\n<h3>Conclusion</h3>\n<p><a data-flickr-embed="true" data-header="false" data-footer="false" data-context="false"  href="https://www.flickr.com/photos/ph0t0s/96911576/in/photolist-9yGrf-rf1xpg-iV3Hti-9yGuq-9mJACS-dF5fsX-4CYijn-96MGD7-4CYinT-rcHmFs-e3mfmk-7paoHV-e3rYs3-ebixTV-e3miwv-e3mehH-ebz9br-ebz6nv-9yGn2-maubuc-4eMsoq-gascSh-j448Si-bUvoKX-7tWwN9-8oTPht-fw2NWm-34Ydj3-zMTMt-9NFVNX-4q1pdk-9eX7xW-e72dfP-eb7MBt-4xMiAY-bznrxn-ze6qt-5GtxU5-bhCNRp-fw2NjN-fvMuU4-ebEQHU-fvMxdc-e3rZzd-ebiz6V-fw2Qn7-9NEtYQ-9NGKrb-u79vMN-9NGokq" title="partly random"><img src="https://farm1.staticflickr.com/36/96911576_1a57864a0b_b.jpg" width="1024" height="768" alt="partly random"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>\nIsolating change to specific points in the life cycle of systems and services reduces the complexity of runtime configuration and simplifies the mental model when reasoning about the infrastructure.</p>',frontmatter:{title:"Don't manage configuration unless you have to.",date:"2015-08-31 13:45:56 +0000"}}},pathContext:{slug:"/2015/08/31/dont-manage-config-unless-you-have-to/",previous:{fields:{slug:"/2015/04/27/cloudformation-driven-consul-in-autoscalinggroup/"},frontmatter:{title:"CloudFormation driven Consul in AutoScalingGroup"}},next:{fields:{slug:"/2015/09/02/uploaded-thousands-of-photos-to-google-photos-here-are-the-best-classification-mistakes/"},frontmatter:{title:"Uploaded thousands of Photos to Google Photos, here are the best classification mistakes"}}}}}});
//# sourceMappingURL=path---2015-08-31-dont-manage-config-unless-you-have-to-2525053a200d2ee9c1a0.js.map