# Kubernetes Container Runtime Evaluation


## Context



* Kubernetes deprecates support for docker
* We believe indirection of docker and docker-shim causes various hard to debug issues
* There are two options, both Apache 2.0 licensed and under CNCF umbrella
* Both use runc for low level container operations


## containerd



* Graduated
* Split out of Docker, used within Docker
* Adopted by
    * IBM
    * AWS Fargate
    * GKE (Was using Docker before)
    * Cloud Foundry
    * Azure


## cri-o



* Incubating
* Specifically developed for kubernetes
* Adopted by
    * Red Hat / Openshift as only runtime from 4. on
    * Oracle Linux
    * SUSE CaaS and Kubic


## Comparison



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: error handling inline image </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>



<p style="text-align: right">
Source: <a href="https://vesoft-inc.github.io/github-statistics">https://vesoft-inc.github.io/github-statistics</a>/</p>



<table>
  <tr>
   <td>
   </td>
   <td><strong>containerd</strong>
   </td>
   <td><strong>cri-o</strong>
   </td>
   <td>Notes
   </td>
  </tr>
  <tr>
   <td># Commits
   </td>
   <td>1.4k
   </td>
   <td>1.3k
   </td>
   <td>similar
   </td>
  </tr>
  <tr>
   <td># PRs
   </td>
   <td>4.3k
   </td>
   <td>4.3k
   </td>
   <td>similar
   </td>
  </tr>
  <tr>
   <td># Issues
   </td>
   <td>1,461
   </td>
   <td>899
   </td>
   <td>containerd: more issues due to more users?
   </td>
  </tr>
  <tr>
   <td>goreportcard
   </td>
   <td><a href="https://goreportcard.com/report/github.com/containerd/containerd">A+</a>
   </td>
   <td><a href="https://goreportcard.com/report/github.com/cri-o/cri-o">A+</a>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>License of deps
   </td>
   <td><a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fcontainerd%2Fcontainerd/refs/branch/master/f0a32c66dad1e9de716c9960af806105d691cd78/preview">Fossa.io fail</a>
   </td>
   <td><a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fcri-o%2Fcri-o/refs/branch/master/68070024cf96caaf252fa9b87265f8f20664bb06/preview">Fossa.io pass</a>
   </td>
   <td>Containerd has deeper chain of deps with more problematic licenses; but unclear how reliable scan is
   </td>
  </tr>
  <tr>
   <td>Companies contributing (past 2y)
   </td>
   <td>
<ol>

<li><a href="https://containerd.devstats.cncf.io/d/5/companies-table?orgId=1&var-period_name=Last%202%20years&var-metric=contributions">NTT Corporation: 4603</a>

<li><a href="https://containerd.devstats.cncf.io/d/5/companies-table?orgId=1&var-period_name=Last%202%20years&var-metric=contributions">IBM: 3427</a>

<li><a href="https://containerd.devstats.cncf.io/d/5/companies-table?orgId=1&var-period_name=Last%202%20years&var-metric=contributions">Docker Inc.: 2913</a>

<li><a href="https://containerd.devstats.cncf.io/d/5/companies-table?orgId=1&var-period_name=Last%202%20years&var-metric=contributions">Apple: 2090</a>

<li><a href="https://containerd.devstats.cncf.io/d/5/companies-table?orgId=1&var-period_name=Last%202%20years&var-metric=contributions">Amazon: 1620</a>
</li>
</ol>
   </td>
   <td>
<ol>

<li><a href="https://crio.devstats.cncf.io/d/5/companies-table?orgId=1&var-period_name=Last%202%20years&var-metric=contributions">Red Hat: 17390</a>

<li><a href="https://crio.devstats.cncf.io/d/5/companies-table?orgId=1&var-period_name=Last%202%20years&var-metric=contributions">SUSE LLC: 5933</a>

<li><a href="https://crio.devstats.cncf.io/d/5/companies-table?orgId=1&var-period_name=Last%202%20years&var-metric=contributions">VMware Inc.: 375</a>

<li><a href="https://crio.devstats.cncf.io/d/5/companies-table?orgId=1&var-period_name=Last%202%20years&var-metric=contributions">IBM: 240</a>

<li><a href="https://crio.devstats.cncf.io/d/5/companies-table?orgId=1&var-period_name=Last%202%20years&var-metric=contributions">Independent: 223</a>
</li>
</ol>
   </td>
   <td>cri-o mostly developed by red hat and suse, containerd mixed bag; Docker contributions dropped significantly
   </td>
  </tr>
  <tr>
   <td>Median time to close for issues created last 7 Days MA 
   </td>
   <td><a href="https://containerd.devstats.cncf.io/d/11/issues-age-by-repository-group?orgId=1&var-period=d7&var-repogroup_name=All&var-prio_name=All">1 day, 5 hours</a>
   </td>
   <td><a href="https://crio.devstats.cncf.io/d/11/issues-age-by-repository-group?orgId=1&var-period=d7&var-repogroup_name=All&var-prio_name=All">2 hours 34 minutes</a>
   </td>
   <td>crio-o much faster response to issues: due to fewer issues and/or full time support people?
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
</table>



### Performance


Containerd appears to be slightly faster and use less memory than crio-o. The difference is probably neglectable in our use cases.


## Conclusion

* There is no clear winner
* cri-o seems to
    * have more responsive developers
    * have fewer companies developing it, which could lead to
        * more focus, better ownership, quicker decision making
        * but also centralizes power and commercial interested
* containerd has less clear license situation but higher adoption
* platform providers seem to prefer containerd while software vendors / distributions prefer cri-o
