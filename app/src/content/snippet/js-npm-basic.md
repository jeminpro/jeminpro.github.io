---
title: NPM basic scripts
category: JavaScript
description: Basic npm (Node Package Manager) commands for Windows users
publishedDate: '2025-02-23'
---

### Initialize a New Project
```sh
npm init
```
Creates a `package.json` file interactively.  
Use `npm init -y` to create it with default settings.

### Install Dependencies from package.json
```sh
npm install
```
Installs all dependencies listed in `package.json`.

### Install a Package Locally
```sh
npm install <package-name>
```
or  
```sh
npm i <package-name>
```
Example:  
```sh
npm i express
```
Installs **express** in the current project.

### Install a Package Globally
```sh
npm install -g <package-name>
```
Example:  
```sh
npm i -g nodemon
```
Installs **nodemon** globally for system-wide use.

### Uninstall a Package
```sh
npm uninstall <package-name>
```
or  
```sh
npm rm <package-name>
```
Example:  
```sh
npm uninstall express
```

### List Installed Packages
```sh
npm list
```
or for global packages:  
```sh
npm list -g --depth=0
```

### Update a Package
```sh
npm update <package-name>
```
Example:  
```sh
npm update express
```

### Check for Outdated Packages
```sh
npm outdated
```

### Clear npm Cache
```sh
npm cache clean --force
```

### Run a Script (Defined in `package.json`)  
```sh
npm run <script-name>
```
Example:  
```sh
npm run start
```


### Check npm Version
```sh
npm -v
```
Checks the installed version of npm.

### Check Node.js Version
```sh
node -v
```
Checks the installed version of Node.js.
