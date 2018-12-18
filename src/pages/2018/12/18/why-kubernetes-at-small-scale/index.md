---
title: 'Why Kubernetes at small scale?'
date: 2018-12-18T17:00:00
tags: [ kubernetes, small scale, infrastructure ]
layout: post
image: wannabe.png
---

## Google Scale Wannabes
![Google - Wannabe](wannabe.png)
I've frequently hear people say something like this:

> The number of people who adopt complicated stuff like Kubernetes for what is
> essentially a couple of web servers and a database is too high. They're Google
> wannabies that thinks in Google's scale but forget that it is utterly
> unnecessary in their case.
>
> <cite>reacharavindh, https://news.ycombinator.com/item?id=18128235</cite>

They have a point. Kubernetes is touted as container orchestration system. You
request resources for your container and it will automatically figure out where
to run it. This is important once you have more than a handful of systems to
ensure good utilization without having a human to play tetris shuffling your
applications around. It's API and [Role-based access
control](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) allows
you to support many developer without a Ops person or team becoming the
bottleneck.

These things are certainly more important at Google's scale than in a small
shop. You might have just 4 VMs, an application and a reverse proxy. A typical
small web startup, maybe 2-3 developer. At that scale it wouldn't be a problem
to manually update the operating system, figure out where to run your
application and move it around when needed.

That's why people think introducing a complex system like Kubernetes can't be
possible worth it. I believe they miss something: Kubernetes is not only a
cluster scheduler, it's also an opinionated infrastructure framework.

## Kubernetes love
Let's get this out the way first: I love Kubernetes and these days I make most
of my money helping companies to build their infrastructure around Kubernetes.
Not primarily because it's hyped and lot of people want help migrating to it but
because it's my tool of choice after building infrastructure for a decade
without it:
I've built infrastructure in pre-config management enterprise environments, used
chef to built infrastructure serving millions of
users and dabbled in Ansible and Salt.

I concluded that robust abstractions are the key to manage large and complex
infrastructure. Making your [(virtual) machines
immutable](https://5pi.de/2015/03/13/building-aws-amis-from-scratch/) limits
change to your machines to the build time of your images. Running your
application in
[containers](https://5pi.de/2015/01/08/containerized-infrastructure/) does the
same for your application. For configuration, you can [bake
in](https://5pi.de/2015/08/31/dont-manage-config-unless-you-have-to/) site
specific config at build time to reduce what you need to worry about at runtime.

These patterns are largely deployment agnostic. While immutable machine images
are common on cloud providers, it's reasonable to do the same when provisioning
bare metal. Application images are made popular by Docker, but people used
[chroot](https://en.wikipedia.org/wiki/Chroot) based deployment long before that
to achieve similar goals.

But Kubernetes is a opinionated, vendor agnostic framework based on all the
concepts I learned to help with managing infrastructure.

## Snowflake Infrastructure
Let's stay with the small web shop example for a moment:

- 2x reverse proxies, terminating TLS and sending requests to..
- 2x webservers which connect to..
- 1x database

For the sake of the argument, let say the database is a managed service. If it's
not, even more reason to use Kubernetes. Let say you're on AWS, but that doesn't
really matter either.

### Provisioning
Without Kubernetes, you could click yourself two VMs and an ALB or ELB. Next you
configure your TLS certificates, either by purchasing them or using AWS
Certificate Manager to create one automatically.
Or use Cloudformation to manage this if you want infrastructure-as-code. Now you
can give your VMs well-known DNS names and use rsync to deploy to it. Or do you
appreciate Docker's isolation? Then build, push, pull and run your images. Maybe
write a shell script for that.

Now copy your database secrets there somehow. You probably want to monitor this
with the tool of your choice.  Where to deploy it? Maybe create a new VM. Make
sure it can reach the systems by allowing whatever protocol it uses. Hardcode
the well-known VM names into your monitoring. Or maybe use the AWS API to
automatically update this. You could write a small shell script for that. You
might also consider using configuration management at this time. Maybe you come
up with good roles/cookbooks/scripts to configure monitoring, after deciding how
to lay out your deployment. Maybe you create systemd unit, maybe you deploy
runit..

### Access, On-/Offboarding
Maybe you're the move-fast-break-things kind of person and
grant each developer full access, so they can work on their own. At this point
you probably already need an informal 'process' like: "Ping people in #infra
slack channel before deploying so we know what is going on.".

Maybe you're more paranoid and you decide there is one person which full access
acting as gatekeeper. But since you're paranoid, you worry about the [bus
factor](https://en.wikipedia.org/wiki/Bus_factor). You still need some sort of
process to make sure changes aren't conflicting.

Now an engineer leaves the company. You need to rotate all secrets. You need to
make sure you remember all the secrets that are used. At this point you have
written thousand lines of configuration management scripts that manages among
others all application secrets, managed database secrets, TLS keys. Or you have
up-to-date documentation. Or you don't and you need to think hard about all
places you might have configured secrets.

A new engineer needs onboarding. Maybe he is a senior engineer who did DevOps at
many places. If you have good, up-to-date documentation you might be able to
figure out how to contribute and deploy. With configuration management, he might
take a few days to understand how things are be done from that. Without any of
these, he'll just pair with other engineers and eventually figure out how things
are done. He needs to be careful to understand all the decisions implied by how
things are setup or risks driving development in the opposite direction.

### No Problem at small scale
You'll probably find a good way to make this work. New employees are onboarded
quickly, everyone can work distraction free without stepping on each other toes.
It's just a small team after all, especially if you're sitting all in one office
this isn't too hard.

But given all the decisions you had to make, you certainly end up with a
cloud provider specific *snowflake infrastructure*. Even in this small problem
space, there is probably not a single company out there with exactly your setup.

## Kubernetes Infrastructure
Kubernetes is an opinionated framework. Every resource in your infrastructure is
abstracted as a [Kubernetes
Object](https://kubernetes.io/docs/concepts/#kubernetes-objects). Deployable
workloads on a single system are Pods. ReplicaSets are workloads that should be
replicated across systems. Deployments are versioned, replicated workloads.
Services provide Endpoints which is how you connect to the Pods in your cluster.

All these are complex, layered but powerful abstractions. They are powerful
because from the infrastructure management perspective they cover all aspects of
all possible resources in your cluster. If an abstraction doesn't provide the
behaviour needed for your resources, you can define [Custom
Resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)
and deploy/write an [Operator](https://coreos.com/operators/) for this.

### Now how does this help with the concerns a small shop has?
Kubernetes is workload agnostic, so it allows you to deploy whatever you want on
it. That means all Kubernetes cluster is all you need. You don't need to setup
VMs, ALB/EBS or any other infrastructure beside the Kubernetes cluster itself.
There is no need to run anything outside of Kubernetes. And most cloud providers
these days provide the cluster management to you for free.

The biggest advantage though is that it's not a *snowflake infrastructure*
anymore:

- For everything in your infrastructure, you have a (ideally) version controlled
  manifest
- Ingress objects are used to configure what can be reached under which names
- The TLS certificate is referred to explicitly and easy to find
- A deployment is always an image with a version/tag.
- The API tells you what is running and what is suppose to be running
- It also allows you to configure your monitoring automatically
- You allow developers to update their application without granting them access
  to secrets
- You have access to plenty of operators should you want to operate your own
  database or want to automate and abstract message queue management
- Migrating to other cloud providers or bare metal is much easier

A new hire who is familiar with Kubernetes will understand what deployments you
have, how much resources they need, how they access other systems and how
requests are routed. They know how to deploy changes and how to debug their
application.

Since Kubernetes resources are configured entirely by YAML manifests, all
configuration management need you might have boils down to manifest generation.

## Conclusion
With Kubernetes we can build solution to infrastructure management problems that
work for everyone without having to resort to [weak abstractions that regular
infrastructure-as-code solutions
have](/2015/08/31/dont-manage-config-unless-you-have-to#issues-with-chef).
There is no such thing as free lunch but these are ramp-up costs. The patterns
you applied to solve a problem once, can be applied to all future problems. And
this goes both ways: Engineers familiar with Kubernetes will benefit from that
in all Kubernetes infrastructures. Companies that adopt Kubernetes will be able
to hire people who know how their infrastructure work before you even started
onboarding.

So should *you* run on Kubernetes? It still depends. Maybe you want to do
something more serverless. Then have a look at
[Heroku](https://www.heroku.com/) or [Google App
Engine](https://cloud.google.com/appengine/). If your service is mostly a backendless
web project, check out [netlify](https://www.netlify.com/) and use [AWS
Lambda](https://aws.amazon.com/lambda/) for the necessary logic.

But if you need to build, deploy, update, configure and monitor applications
running on servers spend time understanding what it really takes to get you
where you want and whether it's really less work than adopting Kubernetes.
