---
title: 'Build securely with Github Actions and ECR using OpenID Connect'
date: 2024-02-05T00:00:00
tags: [ github, aws, ecr, docker, containers, kubernetes ]
layout: post
---

# Intro
Most companies and projects these days use some form of CI/CD to automatically build artifacts like binaries or container images when new code is pushed to a repository. Commonly this involves:

- Configuring where to push and how to name the artifacts in a config file in the repository
- Granting the build server permissions to your artifact store by configuring some secrets

To prevent a developer from modifying production artifacts, it's common to prevent them from merging changes without review. For GitHub Actions this can be achieved using [branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)

Still, users can modify the workflow in their own branch and extract the build secret or use it to overwrite e.g production artifacts, bypassing code review requirements.

While with GitHub Actions it's possible to [use environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment) to make secrets only available to certain, e.g main branches and have separate artifact stores or accounts for development and production, overwriting or creating undesired artifacts can't be prevented this way.

Fortunately, there are more secure methods that also eliminate the need for managing and rotating secrets and ensure branches can only create artifacts that adhere to a naming convention that prevents this.

When a client asked me to migrate their legacy CircleCI container build setup to GitHub Actions, we took the opportunity to implement this.

# Goals and Conventions
The goals were to use GitHub Actions with Branch Protection rules that require review of all changes to the main branch.
The container images are to be pushed to [AWS ECR](https://aws.amazon.com/ecr/) and that configuration is managed using [terraform](https://www.terraform.io/).

Beyond that, we wanted to ensure that container images will always be tagged with the git sha and no other tags are possible. My client had more nuanced tagging requirements but for the sake of simplicity let's assume this.

# Basic Setup
To implement these goals, we're using OpenID Connect to configure AWS ECR to trust GitHub's OIDC provider.

## OpenID Connect (OIDC)
OIDC is a protocol to extend OAuth 2.0 to enable applications to verify user identity. For this purpose, it uses [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) to represent "claims" between two parties.

## ECR Configuration
To configure ECR to trust GitHub's OIDC provider, we first need to configure the [OIDC identity provider](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html):

```hcl
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
  client_id_list = [
    "sts.amazonaws.com"
  ]
  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd"
  ]
}
```

The `url` configures the base URL of the OIDC provider. The standardized endpoint [`.well-known/openid-configuration`](https://token.actions.githubusercontent.com/.well-known/openid-configuration) configures the JSON Web Key Sets, a list of public keys used to verify the JWTs issued by the OIDC Provider, as well as supported claims, response and subject types.

AWS supports a [federated principal](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html) in IAM roles to allow a role to be assumed using JWTs issued by a OIDC provider:


```hcl
resource "aws_iam_role" "github-action-repo-access" {
  name = "github-ecr-access"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:org/repo:*"
          }
        }
      }
    ]
  })
}
```

The assume_role_policy here has two conditions:
- `aud`: The "Audience" claim, needs to be to set `sts.amazonaws.com` when using the [official configure-aws-credentials action](https://github.com/aws-actions/configure-aws-credentials)
- `sub`: The "Subject" claim is set by GitHub's OIDC provider to a [concatenation of metadata about the workflow](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#example-subject-claims)

In this case, the `sub` condition will ensure that this role can only be assumed when the workflow originated from a repo `org/repo`.

The remaining configuration is pretty standard:

data "aws_iam_policy_document" "github-action-repo-access" {
  statement {
    effect = "Allow"

    actions = [
      "ecr:GetAuthorizationToken"
    ]

    resources = ["*"]
  }
  statement {
    effect = "Allow"

    actions = [
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:CompleteLayerUpload",
      "ecr:GetDownloadUrlForLayer",
      "ecr:InitiateLayerUpload",
      "ecr:PutImage",
      "ecr:UploadLayerPart"
    ]

    resources = ["arn:aws:ecr:${var.aws_ecr_region}:${var.aws_ecr_account}:repo/*"]
  }
}

resource "aws_iam_policy" "github-action-repo-access" {
  policy = data.aws_iam_policy_document.github-action-repo-access.json
}

resource "aws_iam_role_policy_attachment" "github-action-repo-access" {
  role       = aws_iam_role.github-action-repo-access.name
  policy_arn = aws_iam_policy.github-action-repo-access.arn
}
```

## Configuring GitHub Action Workflow
Now you can create a GitHub Workflow that assumes the role and logs into ECR without providing any secrets to GitHub:

```hcl
name: Build and push container image
on:
  push: {}
env:
  AWS_REGION: us-east-1
  AWS_ACCOUNT_ID: <account id>
  AWS_ECR_REPO: amazonaws.com/<repo>
permissions:
  id-token: write   # This is required for requesting the JWT
  contents: read    # This is required for actions/checkout
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: configure aws credentials
        uses: aws-actions/configure-aws-credentials@v3
        with:
          role-to-assume: arn:aws:iam::${{ env.AWS_ACCOUNT_ID }}:role/github-ecr-access
          role-session-name: github-ecr
          aws-region: ${{ env.AWS_REGION }}
      - name: Login to Amazon ECR
        uses: aws-actions/amazon-ecr-login@v1
      - name: Build and push
        uses: docker/build-push-action@v3
        with:
          context: .
          push: true
          tags: |
            ${{
              format('{0}.dkr.ecr.{1}.{2}/{3}:{4}',
              env.AWS_ACCOUNT_ID,
              env.AWS_REGION,
              env.AWS_ECR_REPO,
              github.repository,
              github.sha)
            }}

```

# Hardening & Reusability
While we solved the shared secret issue, so far nothing prevents a developer from modifying the workflow in their branch and overwrite other ECR images.
To fix this and ensure consistent naming while also making our workflow reusable, we'll make the [workflow resuable](https://docs.github.com/en/actions/using-workflows/reusing-workflows) by moving it to a separate `gh-actions` repository and changing the trigger to [on workflow_call](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_call):


## Make workflow resuable
```hcl
# <org>/gh-actions/.github/workflows/build-and-push.yaml
name: Build and push container image
on:
  workflow_call: {}
env:
  AWS_REGION: us-east-1
  AWS_ACCOUNT_ID: <account id>
  AWS_ECR_REPO: amazonaws.com/<repo>
permissions:
  id-token: write   # This is required for requesting the JWT
  contents: read    # This is required for actions/checkout
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: configure aws credentials
        uses: aws-actions/configure-aws-credentials@v3
        with:
          role-to-assume: arn:aws:iam::${{ env.AWS_ACCOUNT_ID }}:role/github-ecr-access
          role-session-name: github-ecr
          aws-region: ${{ env.AWS_REGION }}
      - name: Login to Amazon ECR
        uses: aws-actions/amazon-ecr-login@v1
      - name: Build and push
        uses: docker/build-push-action@v3
        with:
          context: .
          push: true
          tags: |
            ${{
              format('{0}.dkr.ecr.{1}.{2}/{3}:{4}',
              env.AWS_ACCOUNT_ID,
              env.AWS_REGION,
              env.AWS_ECR_REPO,
              github.repository,
              github.sha)
            }}
```

"This is a minimal example. Once created, it can be extended to conditionally produce different tags for various branches, such as production, version, or release branches.

Now this workflow can be called from the source repository like this:

```hcl
name: Build and push

on:
  push: {}

jobs:
  build-and-push:
    uses: <org>/gh-actions/.github/workflows/build-and-push.yaml@main
```

The `@main` will ensure that always the workflow from the main branch is used. Enabling branch protection for the main branch in the `gh-actions` repo will prevent developers from modifying the workflow without going through code review.

This makes the workflow reusable and ensures images are always tagged the same way; however, it still doesn't prevent a developer from assuming the role and using that for arbitrary ECR actions. For this we need to change the assume role policy of the federated IAM role.

## Modify Assume Role Policy to only allow reusable workflow
During the workflow run, GitHub's OIDC provider sets the `sub` claim to the repo the workflow originates on. We used that to allow only that repo to assume the role. When using a reusable workflow, though, an additional claim called job_workflow_ref is set. Unfortunately [AWS doesn't support custom claims](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#overview) as of today. Otherwise we could simply replace our `token.actions.githubusercontent.com:sub = "repo:org/repo:*"` condition by a `job_workflow_ref` based one.
Fortunately it's possible to [modify what GitHub sets as standard `sub` claim](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#customizing-the-subject-claims-for-an-organization-or-repository).

Despite the apparent common requirement for this, there seems to be no web ui option. Instead a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) needs to be created to use the API directly:


To allow us to build conditions for other claims we're using the following:

```
{"include_claim_keys":["repo","context","job_workflow_ref"]}
```

This can be set as an org-wide default for new repositories like this:
```
curl \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-GH-PAT>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/orgs/<org>/actions/oidc/customization/sub \
  -d '{"include_claim_keys":["repo","context","job_workflow_ref"]}'
```

For existing repositories to take effect, it needs to be applied on the repo level as well:
```
curl -L \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-GH-PAT>"\
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/<org>/<repo>/actions/oidc/customization/sub \
  -d '{"use_default":false,"include_claim_keys":["repo","context","job_workflow_ref"]}'
  ```

Now the `sub` claim presented by the OIDC provider will be set to `repo:<orgName/repoName>:environment:<environmentName>:job_workflow_ref:<reusableWorkflowPath>`.

This allows us to update the Assume Role Policy as follows:
```hcl
resource "aws_iam_role" "github-action-repo-access" {
  name = "github-ecr-access"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRoleWithWebIdentity"
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:<org>/*:*:job_workflow_ref:<org>/gh-actions/.github/workflows/build-and-push.yaml@refs/heads/main"
          }
        }
      }
    ]
  })
}
```

Now the role can only be assumed by steps that are part of the the reusable workflow in the main branch and originate from a repo in `<org>`. 

# Recap
This configuration implements the desired goals:

- On push the reusable workflow is checked out
- The reusable workflow uses `configure-aws-credentials` to retrieve short-lived credentials using OIDC
- The Assume Role Policy allows only workflows using the resuable workflow to assume the role, so while a user might attempt to call `configure-aws-credentials` directly or a branch of the `gh-actions` repo that they control, the role can only be assumed by using the workflow from the `main` branch
- There are no manually configured secrets involved, once configured there is no maintainance or rotation of secrets required

# Common Issues
While granting ECR access from GitHub Actions using this approach seems to be the most sensible one, it's quite complex and it's configuration error prone,
checking AWS Cloudtrail to debug claims maching the StringLike conditions was very useful. You can find it in the AWS Console here:
- https://<region>.console.aws.amazon.com/cloudtrail/home?region=<region>#/events?EventName=AssumeRoleWithWebIdentity
