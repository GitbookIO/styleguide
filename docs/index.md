---
layout: default
title: Introduction
order: 1
---

# What is it?

GitBook Styleguide is a collection of styling, components and rules; which are being used by the GitBook team on our official websites such as [gitbook.com](https://www.gitbook.com).

This styleguide is open to criticsms and feedback, feel free to [post an issue](https://github.com/GitbookIO/styleguide.gitbook.com) on GitHub.

# Installation

GitBook styleguide can be installed using **NPM**, the module is published as `{{ site.data.package.name }}`, current version is **{{ site.data.package.version }}**.

```
$ npm install {{ site.data.package.name }}@{{ site.data.package.version }}
```

Simply include `node_modules/{{ site.data.package.name }}/less/main.less` in your less file.

Contents of folder `node_modules/{{ site.data.package.name }}/assets` should be accessible from the web server. The root folder can be set using the less variable `@gb-assets-path`.

