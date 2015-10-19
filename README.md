# GitBook Styleguide

This repository contains all stylesheets and brandings for GitBook websites. Documentation is available at [styleguide.gitbook.com](http://styleguide.gitbook.com).

How to test and build the documentation (Jekyll needs to be installed on the machine):

```
# Install node dependencies
$ npm i

# Build and test the documentation
$ npm start
```

Release a new version using:

```
# Bump version in package.json
$ git add package.json
$ git commit -m "Bump version to X.Y.Z"
$ git tag X.Y.Z
$ git push --tags

# Publish on NPM, and publish documentation
$ npm run release
```
