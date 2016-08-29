---
layout: default
title: Javascript
order: 10
---

# Javascript

JS style is enforced using Eslint. Instal the plugins for your editor (Atom, Sublime Text or emacs).

Each JS project should include eslint dependencies in the `package.json`:

```js
{
    ...
    "devDependencies": {
        "gitbook-styleguide": "*",
        "eslint": "*"
    },
    "scripts": {
        "lint": "eslint ./",
        "test": "npm run lint"
    }
}
```

and an `.eslintrc` configuration file:

```js
{
    "extends": "gitbook-styleguide/eslint"
}
```
