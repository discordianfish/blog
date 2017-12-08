---
title: 'Production Grade Kubernetes'
date: Fri, 08 Dec 2017 15:08:29 +0100
tags: 
layout: post
---
<a
href="https://www.researchgate.net/304012394_fig1_Fig-1-The-seakeeping-coordinate-system"><img
src="https://www.researchgate.net/profile/Zhaolong_Yu/publication/304012394/figure/fig1/AS:373636524462081@1466093297802/Fig-1-The-seakeeping-coordinate-system.ppm"
alt="Fig. 1 The seakeeping coordinate system"/></a>

A year ago I blogged about how to build a [$15 Production Kubernetes Cluster on
DigitalOcean](/2016/11/20/15-producation-grade-kubernetes-cluster/) and
submitted it to [Hacker News](https://news.ycombinator.com/).

HN being HN, soon after these comments trickled in:

![What people call production nowadays... - pst](hn-comment.png).

Fair enough. If you only need $15 worth of resources, running a three node
Kubernetes cluster might not be the best idea. As explained in that article, I
was more referring to the way it's deployed:

- Highly available: Clustered etcd, multiple master/controller instances
- Secure: TLS for etcd clients and peers and apiserver+kubelet

Personally I built it mainly to have a Kubernetes playground. But in the
meanwhile I founded [Latency.at](https://latency.at). It's a service to measures
performance and availability of sites and services from multiple global
locations and provides the results as Prometheus metrics. And of course it's
running on Kubernetes, so I didn't have the need for a playground and migrated
this blog to [Gatsby.js](https://github.com/gatsbyjs/gatsby).

I'm also [consulting](/hire-me/) people on, among other things, how to build
production grade Kubernetes infrastructure. For this I looked into various way
to deploy Kubernetes today. There are *many* and most claimed to be "production
grade":

- https://github.com/kubernetes/kops
- https://github.com/coreos/tectonic-installer
- https://github.com/aws-quickstart/quickstart-heptio
- https://github.com/kubernetes-incubator/kube-aws
- https://github.com/kubernetes-incubator/kubespray
- https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/

### Highly available?
In my book, having a highly available cluster is a strict requirement for
production deployments. You might have specialized use case where this isn't
necessary but if you run realtime, business critical applications this is a
requirement.

While an outage of the controller components won't affect running applications,
you can't operate the cluster anymore: If your ingress controller gets restarted
during that time, it won't know about your backends. If an important pod dies,
nobody will restart it.

This requirement already rules out one of the most popular options:
[kubeadm](https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/).
At least it doesn't claim to be stable yet and everything except this looks very
promising.

The same limitation applies to projects built upon kubeadm, like
[kubicorn](https://github.com/kris-nova/kubicorn) and the [hepio cloudformation
templates](https://github.com/aws-quickstart/quickstart-heptio).


### Secure?
A Kubernetes cluster can be "(in)secure" on multiple layers. First etcd should
require peers and client certificates to be signed by a trusted CA. Next the
apiserver needs to verify that the certificate of the etcd endpoint it connects
to is signed by a trusted CA, as well as certificates of clients connecting to
the apiserver. Now the kubelet connecting to the apiserver needs to validate
that certificate too.

Beside the transport level security provided by TLS, Kubernetes supports RBAC to
limit the access pods in the cluster have to the Kubernetes API. This needs to
be enabled too.

Again, in my option all these are production requirements. Keep in mind that
just the ability to run a privileged container or mount a volume is enough to
compromise your infrastructure. This can be done on each of these layers with
different effort. Not require TLS on any connection should be consider missing
no authentication at all.

There are setups which don't require etcd TLS but limit it's reachability to
controller nodes, then using tains to prevent "untrusted" containers to get
scheduled on the masters. While this is better than nothing, it's still a risk
not worth taking.

Unfortunately none of the more light-weight options fulfill these requirements.
Frankly, there are so many 'installers' out there, I can't say this for sure but
the most popular options like kops are lacking. When running with calico
networking, it even requires etcd to be writable from all nodes without
authentication. Other options like kubespray don't support full TLS either. Not
even the tectonic-installer, which in general looks very promising, supports TLS
out the box by default.

### Conclusion
I can't claim I looked into every Kubernetes installer project and ignored
complex "enterprise" stacks like [Red Hat's Atomic](http://www.projectatomic.io)
or [Canonical Kubernetes Juju](https://jujucharms.com/canonical-kubernetes/) but
I'm surprised how many different options there are, yet how few of them provide
what I'm looking for: A simple, immutable, secure and available cluster.

As of right now, the
[tectonic-installer](https://github.com/coreos/tectonic-installer) looks like
the best option, especially if you need to deploy on bare metal or openstack.
But it's a fast moving project and it could become a drag to keep up with
upstream changes. Another thing leaving a bad taste is that the component for
automated updates is closed source and not available for free.

[kubeadm works on HA](https://github.com/kubernetes/kubeadm/issues/261) but I
wouldn't be surprised if it takes another year until this works reliably.
Fortunately you can build upon kubeadm to create secure and HA clusters. Since
this, to me, appears to be the best option, I implemented this based on
cloudformation for AWS for one of my clients. Hopefully I can share the results
as open source soon. For now you can find valuable hints on [this GitHub
issue](https://github.com/kubernetes/kubeadm/issues/546).

But should you even run your own Kubernetes cluster? Probably not! Kubernetes is
a incredibly fast moving project. As a rule of thumb, I'd say operating a
Kubernetes cluster is a full time job. Don't assume any of the installers will
free you from developing a deep understanding of Kubernetes' internals. If you
operate your own cluster, be prepared to read source code and fix bugs yourself.
This is especially true with all the managed solutions and [Google Kubernetes
Engine](https://cloud.google.com/kubernetes-engine/) now being available for
free.
