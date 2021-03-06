---
title: 'The Future: Fabrication Cloud'
date: 2015-10-05T11:50:49
tags: [ "the-future", "3d-printing", "cloud", "industry" ]
layout: post
---
# The Cloud
<a data-flickr-embed="true"  href="https://www.flickr.com/photos/horiavarlan/4777129318" title="Single white cloud on a clear blue sky"><img src="https://farm5.staticflickr.com/4079/4777129318_934309e7af_b.jpg" width="1024" height="616" alt="Single white cloud on a clear blue sky"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
Given the ubiquity of "The Cloud" even in mainstream media, you might expect the readers of this blog know what it means. From my experience, that isn't true. Too many consider it a meaningless buzzword, synonym for the Internet or the act of outsourcing handling of precious personal data. It has to do with outsourcing, the Internet and definitely is used as a buzzword but yet, the Cloud is a incredible concept. Indeed, it's more a concept than anything technical. It's the idea of abstracting all the nasty details and turning computing resources into a utility without any ramp-up costs.

Before the Cloud, if you needed compute resources, you needed to build your own datacenter, figure out cooling, order racks and servers, build them together, figure out power supply, buy network gears, contract with a carrier. To make sure you can still operate, do that twice so if one datacenter explodes, you still enough resources available. To make sure you can serve customers world-wide with low latency, do this all over the world.
Cost for all that can runs in the millions and requires large teams to operate it.

Granted, even before the Cloud, there were alternatives. Colocation centers, where you get all the basic DC setup and just need to take care of servers. Or even just rent out servers. Still, you take care of ordering them, setting them up, configuring network equipment (or have the provider do that) and provisioning of those resources usually takes days. With the Cloud, if you need to run software somewhere, store data somewhere, you can do simply that in the cloud. Depending on the level of abstraction you need, you can run a container in the Cloud, use virtual machines you can customize as you want or have a provider like Heroku run your code directly. Since you share resources with other customers in a Cloud, there is no need for dedicated provisioning which leads to a very scalable cost model: If you don't require much resources, you almost pay nothing. You can get virtual machines for $5/month. A highly available stack in various regions to reach your customers with low latency is possible for ~$150/month.

The Cloud is an abstraction, hiding away the physical world so you can focus on your virtual product. It makes writing a web service (almost) as easy as writing an app.

# Fabrication Cloud
<a data-flickr-embed="true"  href="https://www.flickr.com/photos/kakissel/6165114664/" title="3D Printer at the Fab Lab"><img src="https://farm7.staticflickr.com/6165/6165114664_5fab6e38ff_b.jpg" width="1024" height="678" alt="3D Printer at the Fab Lab"></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>
I believe that in the future we'll see the same abstraction for other, physical resources and it will be huge.

One thing that comes to mind are factories. Imaging we would share factories and everyone can build whatever they have in mind via well defined interfaces without any ramp-up costs. It will not only kill some established companies, it will end "industry" as we know it. There won't be warehouses of goods and mass products. Not because all consumers start building their own products but because above the abstraction everything is just software, every company will be a software company and software can adapt to customer needs.

There are already a few companies providing some form of API around production of physical goods. Custom printed merch like T-Shirts and ball pens, cereal mix and custom chocolate bars. But you can't fabricate your own inventions beyond a custom design.

We need to come up with something more generic to build physical things from digital data. The first thing which comes to mind is 3D printing. I would argue it's doing for Fabrication Clouds what virtualization was doing for the compute Cloud: It's not necessary the only way to do it, but it makes things easier.

# How to get there
And there are already a few 3D printing services like http://www.shapeways.com and https://i.materialise.com and what they are doing is amazing. Yet, 3D printers are far from being universal machines. They have some tight restrictions. You can't (yet) 3D print your cereal mix with them.

So what will happen next? There won't be a universal factory able to build everything anytime soon, but if you don't need to dedicate a factory to a specific product, you can share those resources.
Most electronic companies already build products based on the specification of their customers. The problem are still huge ramp-up costs, lack of continuous automation and well defined APIs. 3D printing can reduce those costs for small product batch series where advancements in robotics will make assembly flexible enough so mass production isn't necessarily more efficient.

Yet, given the complexity of the physical world, compared to the simplicity of computers, I don't think somebody will flip a switch and we'll suddenly be there. It will grow over time. On the small scale end, 3D printing services will get more and more sophisticated and eventually integrate with flexible manufacturers for parts where 3D printing doesn't make sense. On the large scale end, factories will get more flexible to react to changing demands, more automation will further increase the flexibility and a growing number of startups will increase the demand in small batch series.

I'm really not an expert on factories and industrial fabrication, so there are probably tons of problems I missed, but I don't think the general idea violates any laws of physics and the impact and, it's capitalism after all, business opportunity for the pioneers in this field is huge.

Eventually everything will grow together and building a Smartphone, even a Car, will be (almost) as easy as writing an app.

PS: Oh, and we'll not only lose tons of jobs, we'll lose tons of professions and if we don't fix the system, [the pitchforks will come](http://www.politico.com/magazine/story/2014/06/the-pitchforks-are-coming-for-us-plutocrats-108014).
