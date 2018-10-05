---
title: "Found severe Azure Kubernetes Bug but ain't even got a lousy T-Shirt"
date: 2018-02-17T13:19:27
tags: kubernetes
layout: post
---

About half a year ago at one of my last gigs, I built a Kubernetes Cluster on
Azure.

On Azure, the Kubernetes Volume Claims are commonly implemented by a "Virtual
Hard Disk" (VHD) file stored on the [Azure
Blob Storage
Service](https://azure.microsoft.com/en-us/services/storage/blobs/).

The Kubernetes "cloud provider intergration" takes care of allocating and
managing these disks.

While I was working on some issues we had with the cloud provider intergration,
I realized that the VHDs related error messages include a full URL like this:

```
https://abc1234.blob.core.windows.net/5678901234/example-dynamic-pvc-834987df-ffe3-12d3-9dec-feaab9e30f09.vhd
```

Curious about this API semantics, I tried it download it with curl. And it
worked.

First I though I made some mistake setting up the storage account or Kubernetes
itself, but I quickly realized that all of the dozens of VHD urls I found in
various github issues could be downloaded without any authentication!

**Turns out, all Volume Claims that were created on Azure between 1.6.0 and 1.6.5
were world readable.**

I reported the issue by following the [Kubernetes Security and
Disclosure](https://kubernetes.io/security/) guidelines. While the team was
responsive in general and the problem fixed quickly, I wasn't very happy with
how the announcement was handled. It felt like it was kept under the radar and I
never got credited, let alone qualified for a bug bounty.

Of course I'd love to get credited and get a bug bounty but I'm more
worried about what this handling means for the next person considering to
responsibly disclose similar issue.

Kubernetes is my bread and butter right now and I have high expectations towards
it. I've contributed to several components and I have high regards for the
maintainers of the project and the companies involved. I too had the impression
that Microsoft changed and takes these things serious these days, so I was
surprised how this was handled. I also was quite disappointed by not getting any
response anymore around why this didn't qualify for a bug bounty.

I'll continue to disclose issues responsibly but I fully understand people who
don't want to jump through these hoops if they don't even get credited for it.

## Timeline
#### 2017-06-15
Initial Report and first response with promising to send a
follow up later that day.

#### 2017-06-17
The issue was fixed in Kubernetes:
https://github.com/kubernetes/kubernetes/pull/47605

#### 2017-06-19
After not hearing back, I asked again about a CVE and the plans
to announce the issue. I've got a response the same day, confirming that a CVE
will be issues and that they're still working on identifying the affected
customers.

#### 2017-07-07
So far, no CVE was issues so I asked again. I also asked if they
are okay with me blogging about it.

In the response I was told that CVE was requested but not yet issued. I was also
asked to please not talk about this issue publically until they finished letting
affected customers know.

#### 2017-07-13
I've got an update, letting me know that the security team is in their final
stages. They apologize for the "clearly no acceptable" time it took to process
the issue.

#### 2017-07-20
CVE-2017-1002100 was assigned to the issue.

#### 2017-08-02
I've asked again if there will be some sort of announcement which would also
credit me and encourage people to upgrade. I was pointed to [a post in
kubernetes-security-announce](https://groups.google.com/forum/#!msg/kubernetes-security-announce/n3VBg_WJZic/-ddIqKXqAAAJ)
which I never heard about before (it only includes three posts). After
searching, I also found it was noted in the [1.6.6 notes on
kubernetes-announce](https://groups.google.com/forum/#!topic/kubernetes-announce/WodXsASu6y0).

#### 2017-08-03
I've explained that I expected an announcement with discussion of risks and need
for upgrade, as well as credit me for my finding. Apparently though this is all
the announcemnts that will be done in such situation.

I've also ask specifically if this qualifies for some of Microsoft's bug
bounties.

#### 2017-09-19
I've asked again about a bounty. Since I just launched https://latency.at, some
Azure credits would be super useful to me.

I've got the answer that "the MSRC folks didn't think it matched", but they'll
look into some startup credits.

#### 2017-09-25
I've asked why it didn't qualified for a MSRC bounty, given that there is a
[Microsoft Cloud Bounty](https://technet.microsoft.com/en-us/dn800983).

#### 2017-10-05
Asked again.

#### 2018-01-19
Asked "one last time".

#### 2018-02-17
Released this blog article
