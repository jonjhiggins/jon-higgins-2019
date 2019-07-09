---
layout: post
title: Continuous deployment to S3 with Bitbucket Pipelines
description: Automatically update your S3 static-site every time you push to your Bitbucket repository.
date: 2017-12-07
category: words
tags: [development, dev-ops, git]
---

Automatically update your S3 static-site every time you push to your Bitbucket repository. Manual deployments are prone to error and a monotonous waste of time.

## Set up AWS

First we need a S3 bucket that will serve our static site and an AWS user so Bitbucket can use those credentials to upload to S3.

1.  In the AWS console, switch to S3 and create a new bucket and [configure it to work as a static site](http://docs.aws.amazon.com/AmazonS3/latest/dev/HowDoIWebsiteConfiguration.html). Make a note of the bucket's name as you will need it later.
2.  It's best to have an AWS user specifically for Bitbucket deployments. In the AWS console, switch to IAM and [create a new user](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_console). Set the username to "bitbucket-deploy" and give it an "Access Type" or "Programmatic access". For permissions, make sure the user has "AmazonS3FullAccess".
3.  One the user is created, copy the "Access key ID" and "Secret access key" to a safe place as we will need to add these to Bitbucket

## Set up Bitbucket

[Bitbucket Pipelines](https://bitbucket.org/product/features/pipelines) are configured in [YAML](http://yaml.org/) format and run tasks when a user pushes to a branch it hosts. In our example, we will use [Yarn](https://yarnpkg.com) for installing our dependencies and building. Then we will use [AWS CLI](https://aws.amazon.com/cli/) to push code up to our S3 static site.

As neither Yarn or AWS CLI are pre-installed in our Bitbucket Pipeline environment we will need to install them in our Pipeline script. AWS CLI needs credentials for the users we created earlier in order to push to S3, so we will add these as [Bitbucket environment variables](https://confluence.atlassian.com/bitbucket/environment-variables-794502608.html)

1.  Add your new AWS user's credentials as environment variables to Bitbucket. Viewing your repository on bitbucket.org, go to Settings > Environment variables. Add variables named `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with values from your AWS user you already set up (values are called "Access key ID" and "Secret access key" in AWS). Make sure `AWS_SECRET_ACCESS_KEY` is set to "Secured" using the checkbox on the right, this prevents it being output in logs.
2.  Create a `bitbucket-pipelines.yml` file in the root of your folder. Below is an example Pipelines config. If you use this config, you will need to:

* adjust the Yarn task for building your site (`yarn stage`)
* the folder your site is built locally (`dist`)
* the bucket name (`your-s3-bucket-name`)
  Once that file is committed to `master` every time a change is pushed to `master` Bitbucket will build your project and upload to S3, magic.

```yaml
image: node:6.9.4
pipelines:
  branches:
    master:
      - step:
          caches:
            - node
          script:
            # install Amazon CLI
            - apt-get update && apt-get install -y python-dev
            - curl -O https://bootstrap.pypa.io/get-pip.py
            - python get-pip.py
            - pip install awscli
            # install Yarn (for project dependencies)
            - curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.18.1
            - export PATH=$HOME/.yarn/bin:$PATH
            # get project dependencies
            - yarn install
            # build project - adjust to whatever build script you run
            - yarn stage
            # sync files in "dist" folder with Amazon S3 bucket "your-s3-bucket-name" (allow files to be publicly accessible and delete old files)
            - aws s3 sync dist s3://your-s3-bucket-name --acl public-read --delete
```
