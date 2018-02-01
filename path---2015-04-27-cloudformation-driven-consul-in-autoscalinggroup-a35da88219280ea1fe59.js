webpackJsonp([21869895544540],{504:function(e,n){e.exports={data:{site:{siteMetadata:{title:"5π - fish's blog",author:"Johannes 'fish' Ziemke"}},markdownRemark:{id:"/usr/src/src/pages/2015/04/27/cloudformation-driven-consul-in-autoscalinggroup/index.md absPath of file >>> MarkdownRemark",html:'<p style="font-size:10px">\n\n  <a class="gatsby-resp-image-link" href="/static/dreamy_consul-2-09a85130490779b28e2855643e68eb19-9b0e7.jpg" style="display: block" target="_blank" rel="noopener">\n  \n  <span class="gatsby-resp-image-wrapper" style="position: relative; display: block; ; max-width: 590px; margin-left: auto; margin-right: auto;">\n    <span class="gatsby-resp-image-background-image" style="padding-bottom: 75%; position: relative; bottom: 0; left: 0; background-image: url(&apos;data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAgP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABm5qJWpnUP//EABkQAAIDAQAAAAAAAAAAAAAAAAABAgMSBP/aAAgBAQABBQLDTcWZH2USUrqmbgf/xAAVEQEBAAAAAAAAAAAAAAAAAAAAIf/aAAgBAwEBPwFH/8QAFREBAQAAAAAAAAAAAAAAAAAAABL/2gAIAQIBAT8BpT//xAAcEAACAAcAAAAAAAAAAAAAAAAAAgEQERIhMUH/2gAIAQEABj8C1OkUYxcdP//EABwQAQACAQUAAAAAAAAAAAAAAAEAERAhMVGBsf/aAAgBAQABPyFqVDOHh5lIho7Eb9p//9oADAMBAAIAAwAAABBXL//EABcRAAMBAAAAAAAAAAAAAAAAAAABESH/2gAIAQMBAT8QUa3CD//EABYRAAMAAAAAAAAAAAAAAAAAAAEQIf/aAAgBAgEBPxCCn//EABwQAQACAwADAAAAAAAAAAAAAAEAESExUXGBsf/aAAgBAQABPxDN4NOI6715F3kiJPjVjxmHKp0L+xyRfRP/2Q==&apos;); background-size: cover; display: block;">\n      <img class="gatsby-resp-image-image" style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px white;" alt="dreamy consul 2" title="" src="/static/dreamy_consul-2-09a85130490779b28e2855643e68eb19-f8fb9.jpg" srcset="/static/dreamy_consul-2-09a85130490779b28e2855643e68eb19-e8976.jpg 148w,\n/static/dreamy_consul-2-09a85130490779b28e2855643e68eb19-63df2.jpg 295w,\n/static/dreamy_consul-2-09a85130490779b28e2855643e68eb19-f8fb9.jpg 590w,\n/static/dreamy_consul-2-09a85130490779b28e2855643e68eb19-9b0e7.jpg 600w" sizes="(max-width: 590px) 100vw, 590px">\n    </span>\n  </span>\n  \n  </a>\n    <br>\n<span>Jessie Eastland, <a href="http://commons.wikimedia.org/wiki/File:Dreamy_Twilight.jpg">&#x201E;Dreamy Twilight&#x201C;</a>, Consul Logo added</span>, <a href="http://creativecommons.org/licenses/by-sa/3.0/legalcode/">CC BY-SA 3.0</a>\n</p>\n<p>CloudFormation templates are a great way to manage AWS resources. All resources for a stack are configured in a json and CloudFormation takes care of creating or updating your stack.\nConsul is a distributed, consistent data store for Service Discovery and configuration which also features health checks and supports for distributed locks.\nConsul deployed and updated via CloudFormation provides a nice foundation for any kind of modern infrastructure.</p>\n<h1>AutoScalingGroup</h1>\n<p>If you specify instances in your stack directly by using the <code>AWS::EC2::Instance</code> resource, updating anything that requires recreation of the instance will bring up a new instance and terminate the old one. If you need more control over the recreation, the instances need to be managed via a AutoScalingGroup.</p>\n<p>By default, updating a AutoScalingGroup won’t affect the instances. You need to manually terminate them and let AutoScale spin up a new instance.\nTo automatically update the instances, you can specify a UpdatePolicy requiring at least n instances in service while doing a rolling upgrade.</p>\n<p>In the case of consul this isn’t enough. Without checking that a new consul node actually came up and connected successfully to the cluster we might lose to quorum and the cluster becomes stale.</p>\n<p>Fortunately CloudFormation offers a UpdatePolicy option WaitOnResourceSignals which can be used to signal that any new consul node coming up connects sucessfully to the cluster before the any new instance gets terminated.</p>\n<h1>UpdatePolicy</h1>\n<p>The changes to the CloudFormation template are straight forward. In the AutoScalingGroup we add a <code>UpdatePolicy</code> with <code>WaitOnResourceSignals: true</code> like this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>"UpdatePolicy" : {\n  "AutoScalingRollingUpdate" : {\n    "MinInstancesInService" : 2,\n    "PauseTime" : "PT15M",\n    "WaitOnResourceSignals" : true\n  }\n}</code></pre>\n      </div>\n<p>If <code>WaitOnResourceSignals</code> is set,</p>\n<blockquote>\n<p>AWS CloudFormation suspends the update of an Auto Scaling\ngroup after any new Amazon EC2 instances are launched into\nthe group. AWS CloudFormation must receive a signal from\neach new instance within the specified pause time before\nAWS CloudFormation continues the update.</p>\n</blockquote>\n<p>Now we simply need to make sure any new instance sends a success signal after it came up and consul connected successfully to the cluster.</p>\n<h1>Send success signal</h1>\n<p>Once a new instance starts, we need to wait for consul to join the cluster and replicate. Since we need to guarantee that a new node actually joined the cluster, not some partition of it, we need something that goes through the raft log.\nWhen looking at the consul documentation, there are a few endpoint we could use. Unfortunately the documentation doesn’t state what the consistency guarantees of status endpoints like <code>peers</code> are, so <a href="https://github.com/hashicorp/consul/issues/880">I had to ask</a>. Turns out, we can trust <code>peers</code>.\nWith that knowing, we can simply wait for consul being ready as part of the UserData script, then signal success by using the <code>cfn-signal</code> tool:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>"UserData": { "Fn::Base64" : { "Fn::Join" : ["", [\n  "IP=$(ip addr show dev eth0|awk \'/inet /{print $2}\'|cut -d/ -f1)\\n",\n  "while ! curl -s http://localhost:8500/v1/status/peers | grep -q $IP:; do echo Waiting for consul; sleep 1; done\\n",\n  "cfn-signal --resource InfraScalingGroup --stack ", {"Ref": "AWS::StackName"}, " --region ", {"Ref" : "AWS::Region"}, "\\n"\n}</code></pre>\n      </div>\n<h1>AMI</h1>\n<p>The ami runs consul on start and uses a IAM role with read-only EC2 access. Since we tagged all consul instances, this allows the init script to discover peers via the AWS API:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>URL="http://169.254.169.254/latest/"\nID=$(curl $URL/meta-data/instance-id)\nREGION=$(curl $URL/dynamic/instance-identity/document | \\\n  jq -r .region)\n\nSERVERS=$(aws --region $REGION ec2 describe-instances \\\n  --filters \\\n  "Name=tag:aws:cloudformation:stack-id,Values=$STACK_ID" \\\n  "Name=tag:role,Values=consul" \\\n  "Name=instance-state-name,Values=running" | \\\n    jq -r \'.Reservations[].Instances[].PrivateIpAddress\' \\\n)</code></pre>\n      </div>\n<p>We also need to check that SERVERS include the necessary number of peers to form a cluster. Since we’re using runit which restarts failing jobs, we just fail if we found less peers than expected and wait to get restarted:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>if [ $(echo "$SERVERS" | wc -l) -lt $BOOTSTRAP_EXPECT ]\nthen\n  echo "Not enough peers, expected $BOOTSTRAP_EXPECT nodes but got $SERVERS"\n  exit 1\nfi</code></pre>\n      </div>\n<p>Once all peers are up and running, we can start consul:</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>exec /usr/bin/consul agent -data-dir /var/lib/consul \\\n  -config-dir=/etc/consul \\\n  $(echo "$SERVERS" | sed \'s/^/ -retry-join /\' | tr -d \'\\n\')</code></pre>\n      </div>\n<h1>Updating the Stack</h1>\n<p>With all this in place you can do a fully automated rolling upgrade while keeping a quorum. Just update the stack and you should get something like this while having a fully operable cluster:</p>\n<p><img src="/output_710_280-e458b67bbb060e2f44d87934ff67c7cd.gif" alt="Update Stack Log"></p>',frontmatter:{title:"CloudFormation driven Consul in AutoScalingGroup",date:"2015-04-27 13:22:30 +0000"}}},pathContext:{slug:"/2015/04/27/cloudformation-driven-consul-in-autoscalinggroup/",previous:{fields:{slug:"/2015/04/22/scope-and-ownership-in-tech-companies/"},frontmatter:{title:"Scope and Ownership in Tech Companies"}},next:{fields:{slug:"/2015/08/31/dont-manage-config-unless-you-have-to/"},frontmatter:{title:"Don't manage configuration unless you have to."}}}}}});
//# sourceMappingURL=path---2015-04-27-cloudformation-driven-consul-in-autoscalinggroup-a35da88219280ea1fe59.js.map