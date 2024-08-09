---
title: Github actions to deploy WordPress on google cloud
description: One of the best ways to increase productivity in a software product is to automate manual or repetitive jobs. In this blog post, we will explore how easy it is to deploy WordPress theme changes to our server, and best of all it is free with GitHub as it offers generous free tier features.
publishedDate: 2020-06-30
category: Dev Ops
---

One of the best ways to increase productivity in a software product is to automate manual or repetitive jobs. In this blog post, we will explore how easy it is to deploy WordPress theme changes to our server, and best of all it is free with GitHub as it offers generous free tier features.

In a nutshell, we will explore the Continuous Deployment (CD) process i.e. when a WordPress theme’s code is changed and committed to the GitHub repository, it will trigger GitHub actions to replace the theme folder in the server, automating the deployment.

This involves following steps assuming WordPress theme is in a GitHub repository

Establishing an SSH connection between GitHub and google cloud Ubuntu virtual instance (or any other cloud providers virtual instance)
Configuring the GitHub Actions with YAML file

## Configure server access

This is going to be the most tedious task of this process, as it involves lots of configuration to achieve the connectivity between GitHub server instance and Web Hosting server instance.

Generate the SSH Key by following [this instruction](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) in Linux and running those commands in the google cloud ubuntu virtual machine. Do not use a passphrase when generating the SSH key. Make sure to follow all the steps in the above instruction (i.e. generating SSH key, adding SSH key to ssh-agent along with adding it to GitHub account i.e. settings > SSH keys).

In your web hosting server add the public key at ~/.ssh/authorized_keys using the following command.

```shell
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

Copy the private key from your web hosting server using the below command to open the file.

```shell
cat ~/.ssh/id_rsa
```

Add it to your git repository secrets i.e. in online git repository go to Settings > Secrets > New Secret with a name, for example, DEPLOY_KEY and value as the private key starting with `-----BEGIN OPENSSH PRIVATE KEY-----`

## Configure GitHub action

In the online git repository go to the “Actions” tab, it contains several predefined workflows for various jobs, in our case to define it from scratch select “set up a workflow yourself” and replace the YML file content with below. Will explain the code briefly

```yaml
name: Deploy theme

on: [push]

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Sync my theme
        env:
          source: './myrepo/mytheme/'
          destination: 'username@12.345.67.890:/var/www/html/wordpress/wp-content/themes/mytheme/'          
        run: |
          echo "${{secrets.DEPLOY_KEY}}" > deploy_key
          chmod 600 ./deploy_key
          sudo rsync -chav --delete \
            -e 'ssh -i ./deploy_key -o StrictHostKeyChecking=no' \
            --exclude /sass \
            ${{env.source}} ${{env.destination}}
```

In the line 1 `name` we can provide a name for the workflow.

Line 3 `on` defines on what action this workflow needs to run. In our example we defined `[push]`, which means on code change pushed to the git repo trigger the workflow. We could also specify it to trigger only on a specific branch or several other conditions documented in the events that trigger workflows depending on your needs.

In section `jobs` we define what needs to be done as part of the workflow, we could implement one or more jobs that contain where it needs to run, in our case we use a virtual instance of the latest Ubuntu. And then we define what steps the job has to do.

The `steps` are the individual tasks that the job has to perform. In our case as part of the first step checking out our repo to the virtual instance by simply calling `uses: actions/checkout@v2`, which internally runs the code defined in the repo https://github.com/actions/checkout simplifying the configuration by reusing the code defined by the contributors.

The last step which is named “Sync my theme” (you could name it to anything logical) contains the main logic. In the `env` we define variables i.e. `source` contains GitHub folder path and `destination` contains the server folder path. Note that the server path is prefixed with the `username@12.345.67.890` make sure to change according to your host server. In google cloud instance, the user name part can be found by going to “VM Instance” and clicking on SSH which opens console with a user take pretext part of @ (typically it would be your Gmail user name i.e. text before @). The IP address is the VM instance external IP address.

In the `run` control we can pass commands in multiple lines bu using `|` in the beginning. In order to establish SSH connection with the host server we need to create the deploy_key file in the root with appropriate permission. echo and chmod command will do it.

In line 20 we used `rsync` command to run with sudo permission. It will take care of comparing the file between source and destination, deletes the files that are not in source and copies updated or new files. The basic syntax is `rsync [source] [destination]`. It has several different options in our case we are using following

- `-c` compares file changes by checksum (not modification time).
- `-h` outputs numbers in a more human-readable format
- `-a` retains file attributes and permissions and recursively copies files and directories
- `-v` shows status output
- `--delete` deletes files from the destination that aren’t found in the source
- `--exclude` prevents syncing specified files

## Running the GitHub action

On committing the YAML file it triggers the GitHub action workflow (depending on configuration trigger selected). You can check the status of the execution by going to the “Actions” tab in GitHub.

## Troubleshooting

You might encounter some issues when running the actions. Below are some problems and a possible solution.

Problem: Error “rsync: failed to set times on Operation not permitted”

Solution: Delete the destination folder, when rsync creates it will resolve the issue