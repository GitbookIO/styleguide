---
layout: default
title: Guidelines
order: 10
---

# Guidelines

## HTML5 doctype

It makes use of certain HTML elements and CSS properties that require the use of the HTML5 doctype. Include it at the beginning of all your pages.

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
  ...
</html>
{% endhighlight %}

## Box-sizing

We reset `box-sizing` to `border-box` for every element. This allows us to more easily assign widths to elements that also have padding and borders.

## Less Variables

#### Format

Variables should use dash instead of uppercases. For example `@gb-hello-world` is valid, but `@gb-helloWorld` is not.

#### Prefix

All variables defined by this module should be prefixed by `@gb-`.

#### Paths

Variables that defined a path should not finish with a slash. For example `@gb-static-folder: "/static"` is valid.

## Page Layout

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
    ...
    <body>
        <div class="gb-page-wrapper">
            <div class="gb-page-header">

            </div>
            <div class="gb-page-body">

            </div>
            <div class="gb-page-footer">

            </div>
        </div>
    </body>
</html>
{% endhighlight %}
