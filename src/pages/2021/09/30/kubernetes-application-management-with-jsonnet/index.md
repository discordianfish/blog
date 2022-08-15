---
title: 'Kubernetes at Home: Hardware'
date: 2020-09-30T00:00:00
tags: [ kubernetes, jsonnet, configuration management, homelab ]
layout: post
image: dummy.jpg
---
![dummy](./dummy.jpg)

Are we all YAML engineers today?

Kubernetes YAML manifests were never intended to be written by hand. It's meant
as a *intermediate* step:

> From the configuration source, we advocate the generation of the set of
> objects you wish to be instantiated. The resulting objects should be
> represented using a simple data format syntax, such as YAML or JSON. Breaking
> this out as a discrete step has a number of advantages, such as enabling
> validation and change review. This step should be 100% reproducible from a
> given version of the configuration source and any accompanying late-bound
> information, such as parameter values.

- [Brian Grant's first draft of Kubernetes configuration
  proposal](https://github.com/kubernetes/kubernetes/blob/c7cb991987193d4ca33544137a5cb7d0292cf7df/docs/config.md)

Ideally a mechanism to configure applications on Kubernetes should support
make installing a service in a cluster as easy as install a linux package while
addressing several orthogonal intentions and constraints:

- Developer intentions
  - image, args, ports, name
  - resource requirements
  - health checks

- Cluster operator / SRE
  - scheduling constraints
  - replica factor
  - cluster scoped resources like storage class configuration

- Platform engineer
  - Label/selector taxonomy
  - namespace taxonomy


There are [dozends of application management
tools](https://docs.google.com/spreadsheets/d/1FCgqz1Ci7_VCz_wdh8vBitZ3giBtac_H8SBw4uxnrsE/edit#gid=0)
out there that vary in scope.

Many tools like [kustomize](https://kustomize.io/) help with customizing generic
manifests, for example create a specific manifest for all your development
environments. But make it's hard to use it to provide a ready to use library of
manifests and compose them into applications.

[Helm](https://helm.sh) provides a vast library of [Helm Charts]() to install
various infratructure components. But it's templated nature leads to hard to
read and maintain source and the lack of composibility on the data level makes
it impossible to extend a chart in a arbitrary way.

All this is possible by using programming language like [Starlark](https://github.com/google/starlark-go),
[CUE](https://cuelang.org), [Dhall](https://dhall-lang.org/) or bindings
for existing languages. This allows building arbitrary abstractions around
Kubernetes objects. This might work well for building a site specific DSL but
if the goal is to support all usecases the abstraction of choice is the lowest
common denominator which ends up being the unabstracted Kubernetes manifests
itself. So arguably, abstraction is the wrong way to go. It also makes all
configuration tool specific and harder to understand for someone already
familiar with Kubernetes manifests.

Therefor I believe the right solution for this problem is better solved by
using vanilla kubernetes API objects that are easy to compose for any use case
possible. This task boils down of combindin predefined, upstream structured
data and transforming it into site specific manifests which
[jsonnet](https://jsonnet.org/) was specifically built for.

To be clear, jsonnet is not a silver bullet. It's syntax is unfamilar and full
of pitfalls, the mixin style libraries quite verbose to use. It's still in my
opinion the best option we have today.

## Jsonnet and Kubernetes
While you can write manifests directly, using a library like
[k8s-libsonnet](https://github.com/jsonnet-libs/k8s-libsonnet) provides you with
functions to create all kubernetes objects. For example, this jsonnet snippet:

```
{
  local k = (import "github.com/jsonnet-libs/k8s-libsonnet/1.22/main.libsonnet"),
  foo: k.apps.v1.deployment.new(name="foo", containers=[
    k.core.v1.container.new(name="foo", image="foo/bar")
  ])
}
```

Creates this deployment manifest:
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: foo
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: name
    spec:
      containers:
        - image: foo/bar
          name: foo
```
- *from [https://jsonnet-libs.github.io/k8s-libsonnet](https://jsonnet-libs.github.io/k8s-libsonnet)*

To change the replicas, you can use a
[mixin](https://jsonnet.org/learning/tutorial.html#mixins-input):

```
{
  local k = (import "github.com/jsonnet-libs/k8s-libsonnet/1.22/main.libsonnet"),
  foo: k.apps.v1.deployment.new(name="foo", containers=[
    k.core.v1.container.new(name="foo", image="foo/bar")
  ]) + k.apps.v1.deployment.spec.withReplicas(2)
}
```

Functions and mixins can be used to create higher level jsonnet libraries. But
they are not abstractions, they are more  equal representations.

This means you can override the replicas field directly, even if there would be
no mixin to do that:

```
{
  local k = (import "github.com/jsonnet-libs/k8s-libsonnet/1.22/main.libsonnet"),
  foo: k.apps.v1.deployment.new(name="foo", containers=[
    k.core.v1.container.new(name="foo", image="foo/bar")
  ]) + {
    spec+: {
      replicas: 2,
    }
  }
}
```

Same for constructing your deployment. You could use raw json and still use the
mixins:
```
{
  "apiVersion": "apps/v1",
  "kind": "Deployment",
  "metadata": {
    "name": "foo"
  },
  "spec": {
    "replicas": 1,
    "template": {
      "metadata": {
        "labels": {
          "app": "name"
        }
      },
      "spec": {
        "containers": [
          {
            "image": "foo/bar",
            "name": "foo"
          }
        ]
      }
    }
  }
} + k.apps.v1.deployment.spec.withReplicas(2)
```

For better or worse, this gives great flexiblity to the consumers of jsonnnet
libraries. While I'm a big fan of typed languages and purpose built interfaces
in general programing, in the case of generationg kubernetes manifests this
strikes me as the best solution so far.

Therefor I started writing my own jsonnet library/package for all my personal
kubernetes infrastructure.

## Introducing: https://github.com/5pi/jsonnet-libs
The library is still in a rough shape, very much an experiment. I've been using
it for about two years now to deploy my [kubernetes at
home](https://5pi.de/2019/05/10/k8s-on-openwrt/) infrastructure.

It includes a small set of library functions and mixins to make creating the
most common types of workloads easier. This for example:

```
{
  local app = (import 'github.com/5pi/jsonnet-libs/lib/app.jsonnet'),
  app.newWebApp(
    'bar',
    'foo/bar,
    'bar.example.com',
    8080,
    namespace='web',
  )
}
```

Creates the following manifest:
```
{
   "webapp": {
      "deployment": {
         "apiVersion": "apps/v1",
         "kind": "Deployment",
         "metadata": {
            "name": "bar",
            "namespace": "web"
         },
         "spec": {
            "replicas": 1,
            "selector": {
               "matchLabels": {
                  "name": "bar"
               }
            },
            "template": {
               "metadata": {
                  "labels": {
                     "name": "bar"
                  }
               },
               "spec": {
                  "containers": [
                     {
                        "image": "foo/bar",
                        "name": "bar"
                     }
                  ]
               }
            }
         }
      },
      "ingress": {
         "apiVersion": "networking.k8s.io/v1",
         "kind": "Ingress",
         "metadata": {
            "name": "bar",
            "namespace": "web"
         },
         "spec": {
            "rules": [
               {
                  "host": "bar.example.com",
                  "http": {
                     "paths": [
                        {
                           "backend": {
                              "service": {
                                 "name": "bar",
                                 "port": {
                                    "number": 8080
                                 }
                              }
                           },
                           "path": "/",
                           "pathType": "Prefix"
                        }
                     ]
                  }
               }
            ]
         }
      },
      "service": {
         "apiVersion": "v1",
         "kind": "Service",
         "metadata": {
            "name": "bar",
            "namespace": "web"
         },
         "spec": {
            "ports": [
               {
                  "name": "http",
                  "port": 8080,
                  "targetPort": 8080
               }
            ],
            "selector": {
               "name": "bar"
            }
         }
      }
   }
}
```
