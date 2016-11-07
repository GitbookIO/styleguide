# GitBook Styleguide

This repository contains all stylesheets and brandings for GitBook websites. Documentation is available at [styleguide.gitbook.com](http://styleguide.gitbook.com).

How to test and build the documentation:

```
# Install node dependencies
$ npm i

# Build and test the documentation
$ npm run docs
```

### Structure

#### `src`

The `src` directory contains source for React components.

#### `less`

The `less` directory contains the source for the stylesheets, built using [less](http://lesscss.org/).

#### `pages`

The `pages` directory contains the source for the documentation, this one is build using [next](https://github.com/zeit/next.js) to provide live reloading when developing components.
