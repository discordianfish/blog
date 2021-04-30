# Kubernetes at Home: Hardware
![Diagram of Rack](./rack.svg)
I've been running [Kubernetes on
OpenWrt](/2019/05/10/k8s-on-openwrt/) at home for two years now.
Although I already believed that [Kubernetes makes sense at small
scale](/2018/12/18/why-kubernetes-at-small-scale/) this was
intended as a silly experimence about whether it can be done.

But it turned out to be the most reliable and convient to manage home
infrastructure I have been running.

What started as a silly experiment turned out to be totally worth it.
There were issues for sure, but putting my efforts into building a reliable
Kubernetes infrastructure that allows to cleanly deploy and remove applications
at will was a great improvement over all a typial, manual and distribution specific homelab setup.

Beside that, it's also the ideal test bed to experiment with novel configuration
and automation strategies as well as explore Kubernetes edge cases. If something
works under the constraints of a homelab setup, it will work for your cloud
native apps on the usual platforms as well.
<p style="text-align: right; margin-left: 10em; font-style: italic">Of course we're not talking about scaling edge cases with 1k
node cluster sizes</p>

While running everything on my OpenWrt router served me well so far, I need more
disk space and want to run more applications. So I decided to double down on
my Kubernetes-At-Home setup and start a blog series about it.

This is the first part talking about the hardware and storage setup.

## Hardware
![Photo of Rack](./rack.jpg)

While I'd love to have a full rack with real network gear and servers as much as
the next nerd, I'd find that extremly wasteful. Therefor my first goal is that
this setup should use as little power as possible.

Secondly, I still live for rent in Berlin so a small physical footprint was
another consideration.



<div style="display: flex">
  <p style="width: 50%">Therefor I went with this small(ish) 19" Wall Mount Network Cabinate.
  The maximum installation depth is just 32cm though, so a extra short server case
  is needed. Unfortunately it doesn't seem to be available on US Amazon but there
  are plenty of other options like <a href="https://amzn.to/3t3uzXe">this</a>
  </p>
  <p>
  <a href="https://www.amazon.de/Good-Connections%C2%AE-Wandgeh%C3%A4use-unmontiert-tiefschwarz/dp/B08FTH3ZBJ/ref=as_li_ss_il?crid=3CV1OP8QINXMK&dchild=1&keywords=good+connections+19%22+wandgeh%C3%A4use&qid=1619774239&sprefix=good+connections+19,aps,192&sr=8-3&th=1&linkCode=li3&tag=5pi-21&linkId=3935e1373aedb1f800abbbe0bec6fe9e&language=de_DE" target="_blank"><img border="0" src="//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08FTH3ZBJ&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=5pi-21&language=de_DE" ></a><img src="https://ir-de.amazon-adsystem.com/e/ir?t=5pi-21&language=de_DE&l=li3&o=3&a=B08FTH3ZBJ" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
  </p>
</div>


<div style="display: flex">
  <p style="width: 50%">I found this server case which is just 25cm deep.
That case fits mini ITX boards only which is fine for a low power board.
Unfortunately I can't find anything similar on US Amazon. This was also the
hardest to find component. So if you have the space, just go with a bigger rack
and case</p>
  <p>
  <a href="https://www.amazon.de/gp/product/B072F4CYKP/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=5pi-21&linkId=a4bb79f1379ca883ece0bdb284260ae2&language=de_DE" target="_blank"><img border="0" src="//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B072F4CYKP&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=5pi-21&language=de_DE" ></a><img src="https://ir-de.amazon-adsystem.com/e/ir?t=5pi-21&language=de_DE&l=li3&o=3&a=B072F4CYKP" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></p>
</div>

<div style="display: flex">
  <p style="width: 50%">I've decided to use the Super Micro A2SDi-2C-HLN4F-B
has Intel Atom C3338 onboard which should be sufficent and has a TDP of just 9W.
It supports 8 SATA3 ports which allows me to connect plenty of disks.
and can power it directly from 12V,
so bought a <a href="https://amzn.to/3gR28sU">80W 12V MeanWell PSU</a> (<a href="https://amzn.to/2RafV3d">DE</a>)
  </p>
  <p>
  <a href="https://www.amazon.com/Supermicro-Motherboard-MBD-A2SDI-4C-HLN4F-B-Mini-ITX-Express/dp/B077BHMN8X?dchild=1&keywords=A2SDi-2C-HLN4F-B&qid=1619774725&sr=8-1&linkCode=li3&tag=5pi-20&linkId=59609640fb184ba633fe6353d29fea8e&language=en_US&ref_=as_li_ss_il" target="_blank"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B077BHMN8X&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=5pi-20&language=en_US" ></a><img src="https://ir-na.amazon-adsystem.com/e/ir?t=5pi-20&language=en_US&l=li3&o=1&a=B077BHMN8X" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
<br />(<a href="https://amzn.to/3nBPuzC">DE</a>)
  </p>
</div>

<div style="display: flex">
  <p style="width: 50%">To house the disks I bought a ICY BOX 8x 2.5" Backplane which fits the 2u 5.25" drive
bay, currently with 4x5TB disks and enough room for upgrades
  </p>
  <p>
  <a href="https://www.amazon.de/gp/product/B082BR71DY/ref=as_li_ss_il?ie=UTF8&linkCode=li3&tag=5pi-21&linkId=b0227785164e228e852a35fc66c69e4a&language=de_DE" target="_blank"><img border="0" src="//ws-eu.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B082BR71DY&Format=_SL250_&ID=AsinImage&MarketPlace=DE&ServiceVersion=20070822&WS=1&tag=5pi-21&language=de_DE" ></a><img src="https://ir-de.amazon-adsystem.com/e/ir?t=5pi-21&language=de_DE&l=li3&o=3&a=B082BR71DY" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
  </p>
</div>
Also bought patch panel, PDU and a tray to mount the non-rackable equipment.

Finally all my equipment is nice and tidy contained in the cabinate with just
two uplink connect, the link to the other rooms and a power input draining
typically around 60W.

## Kubernetes Storage
The Kubernetes setup hasn't changed much since my first blog article about [Kubernetes on
OpenWrt](/2019/05/10/k8s-on-openwrt/). To make use of the new 
