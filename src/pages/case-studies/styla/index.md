---
title: "Styla: Content Experience Engine"
tags: [ "case-study" ]
image: styla.png
date: 2017
index: 99
---

Advising a content commerce startup on Docker migration, AWS deployment and
DevOps strategy. Debugging a ELB/ECS based pilot deployment.

Implementation of and migration to lambda based machine learning pipeline.

<!--end-->

<blockquote class="testimonial">
  <img alt="Alexander Kong" src="alex.jpeg" />
  <code>
    We worked with Johannes on two projects and greatly benefited from his knowledge and experience.
  </code>
  <footer><cite>Alexander Kong, CTO at Styla.com</cite></footer>
</blockquote>

## About Styla
![Logo](styla.svg)
[Styla](https://www.styla.com/) offers a Content Experience Engine that
automatically designs your content and makes it shoppable, inspiring your
customers to buy more.

Styla's automation technology designs your content in real-time and enhances the
user experience on every device.

## Docker migration and AWS DevOps strategy consulting
Before they contacted me, Styla's stack consisted of Ansible managed AWS EC2
instances with their applications directly deployed to the machine ad-hoc.

When expanding their product to more markets, Styla contracted me for a day to
discuss their challenges and advise them on further and more robust automation,
with the goal of having all the infrastructure as code.

Styla already experimented with Docker and wanted to deploy on [AWS
ECS](https://aws.amazon.com/ecs/) but had severe issues with a python based data
dashboard. The application, running behind an AWS ELB, became unresponsive about
every minute. My investigations showed that their application used blocking IO
and was single threaded. Since the AWS ELB health checks didn't close the
connection, the application didn't respond to request until it timed out.
Running the application as workers under a pre-forking HTTP server solved this
problem.

After discussing the goals and specifics of the infrastructure, I recommended
using Cloudformation for the deployment of the ECS cluster and other
infrastructure. This allows to keep all stack configuration in simple JSON/YAML
documents that can be used to rollout changes to the infrastructure in a
controlled fashion. To keep the existing workflows, the template can be executed
by Ansible.

Over the course of the next months, Styla implemented the recommended
infrastructure which is powering the platform ever since.

<blockquote class="float-right">
  <img alt="Alexander Kong" src="alex.jpeg" class="float-right" />
  <code>
    We were impressed how Johannes gathered insights into our application on a system level and quickly solved our application issue.
  </code>
  <footer><cite>Alexander Kong, CTO at Styla.com</cite></footer>
</blockquote>

## Machine Learning Stack
As a data driven platform, there is a strong need for a reliable machine
learning pipeline.

After Styla successfully adopted the discussed infrastructure changes, revamping
the machine learning pipeline was the next project I was involved with.

The first step in the pipeline is structuring the data. To minimize ongoing
operational costs, we decided to use [AWS Lambda](https://aws.amazon.com/lambda)
to automatically run Styla's structuring code when new data gets written to a S3
bucket. This code uploads the results to a new bucket which triggers another
Lambda to load the structured data into various data stores.

Beside the Lambda based pipeline, the stack consist of a Spark cluster for
further processing and data stores that can be queries from Styla's backend services.

I configured and deployed the stack as Cloudformation templates wrapped in
Ansible roles, consistent with Styla's general deployment workflow.

Especially when it comes to data warehousing and analysis, security is of utmost
importance. Therefor the stack follows the security best practices by using
individual IAM roles for each Lambda and data store with tightly locked down
policies that grant only the necessary permissions.

## Conclusion
Whether you need consulting, troubleshooting or hands-on help with building your
infrastructure, [let me know](/hire-me).
