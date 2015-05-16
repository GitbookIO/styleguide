# Installation

GitBook stylesheets can be installed using **NPM** from `https://github.com/GitbookIO/styleguide.git`:

```
$ npm install git+https://github.com/GitbookIO/stylesheet.git#master
```

Simply include `node_modules/gitbook-styleguide/less/main.less` in your less file.

Contents of folder `node_modules/gitbook-styleguide/assets` should be accessible from the web server. The root folder can be set using the less variable `@gb-assets-path`.

