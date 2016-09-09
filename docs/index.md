---
layout: default
title: Introduction
order: 1
---

# What is it?

GitBook Styleguide is a collection of styling, components and rules; which are being used by the GitBook team on our official websites such as [gitbook.com](https://www.gitbook.com).

This styleguide is open to criticsms and feedback, feel free to [post an issue](https://github.com/GitbookIO/styleguide) on GitHub.

# Installation

GitBook styleguide can be installed using **NPM**, the module is published as `gitbook-styleguide`.

```
$ npm install gitbook-styleguide --save-dev
```

Simply include `node_modules/gitbook-styleguide/less/main.less` in your less file.

Contents of folder `node_modules/gitbook-styleguide/assets` should be accessible from the web server. The root folder can be set using the less variable `@gb-assets-path`.

# Open Source

Available for use under the Apache 2.0 license and built with open source projects like LESS, Jekyll, Gulp, and more.
